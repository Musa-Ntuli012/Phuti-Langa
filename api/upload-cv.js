import { put, del, list } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const boundary = req.headers['content-type']?.split('boundary=')[1];

      if (!boundary) {
        reject(new Error('No boundary found in content-type'));
        return;
      }

      const parts = buffer.toString('binary').split(`--${boundary}`);
      for (const part of parts) {
        if (part.includes('filename=')) {
          const filenameMatch = part.match(/filename="([^"]+)"/);
          const filename = filenameMatch ? filenameMatch[1] : 'upload.pdf';
          const headerEnd = part.indexOf('\r\n\r\n') + 4;
          const bodyEnd = part.lastIndexOf('\r\n');
          const body = Buffer.from(part.slice(headerEnd, bodyEnd), 'binary');

          resolve({ filename, body });
          return;
        }
      }
      reject(new Error('No file found in upload'));
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({
      success: false,
      error: 'Blob storage not configured. Add BLOB_READ_WRITE_TOKEN to your Vercel environment variables.',
    });
  }

  try {
    if (req.method === 'POST') {
      const { filename, body } = await parseMultipart(req);

      if (!filename.toLowerCase().endsWith('.pdf')) {
        return res.status(400).json({
          success: false,
          error: 'Only PDF files are allowed.',
        });
      }

      // Delete any existing CV files first
      const existing = await list({ prefix: 'cv/' });
      for (const blob of existing.blobs) {
        await del(blob.url);
      }

      const blob = await put(`cv/${filename}`, body, {
        access: 'public',
        contentType: 'application/pdf',
      });

      return res.status(200).json({
        success: true,
        url: blob.url,
        filename: filename,
      });
    }

    if (req.method === 'GET') {
      const existing = await list({ prefix: 'cv/' });
      const cvBlob = existing.blobs[0] || null;

      return res.status(200).json({
        success: true,
        data: cvBlob
          ? { url: cvBlob.url, filename: cvBlob.pathname.replace('cv/', ''), uploadedAt: cvBlob.uploadedAt }
          : null,
      });
    }

    if (req.method === 'DELETE') {
      const existing = await list({ prefix: 'cv/' });
      for (const blob of existing.blobs) {
        await del(blob.url);
      }

      return res.status(200).json({
        success: true,
        message: 'CV deleted.',
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Upload CV API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Upload failed. Please try again.',
    });
  }
}
