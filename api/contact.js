import { prisma } from '../lib/prisma.js';

const isDatabaseConfigured = !!process.env.DATABASE_URL;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!isDatabaseConfigured) {
    return res.status(503).json({
      success: false,
      error: 'Database not configured.',
    });
  }

  try {
    if (req.method === 'GET') {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json({ success: true, data: messages });
    }

    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required.',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
      }

      await prisma.contactMessage.create({
        data: { name, email, subject, message },
      });

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully.',
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Message ID is required.',
        });
      }

      await prisma.contactMessage.delete({ where: { id } });

      return res.status(200).json({
        success: true,
        message: 'Message deleted.',
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
}
