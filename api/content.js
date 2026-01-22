// Vercel Serverless Function to handle content storage
// This uses Prisma with PostgreSQL for persistent storage

import { prisma } from '../../lib/prisma.js';

const CONTENT_ID = 'portfolio';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Load content from PostgreSQL
      try {
        const portfolioContent = await prisma.portfolioContent.findUnique({
          where: { id: CONTENT_ID },
        });

        if (portfolioContent && portfolioContent.content) {
          return res.status(200).json({ 
            success: true, 
            data: portfolioContent.content 
          });
        }
        
        // Return null if no data found
        return res.status(200).json({ success: true, data: null });
      } catch (error) {
        console.error('Error reading from database:', error);
        // If database error occurs, return null
        // Client will use localStorage fallback
        return res.status(200).json({ success: true, data: null });
      }
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      // Save content to PostgreSQL
      const { data } = req.body;

      if (!data) {
        return res.status(400).json({ success: false, error: 'No data provided' });
      }

      try {
        // Upsert: create if doesn't exist, update if it does
        await prisma.portfolioContent.upsert({
          where: { id: CONTENT_ID },
          update: { content: data },
          create: { id: CONTENT_ID, content: data },
        });

        return res.status(200).json({ 
          success: true, 
          message: 'Content saved successfully' 
        });
      } catch (error) {
        console.error('Error writing to database:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to save content. Please check database configuration.' 
        });
      }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
