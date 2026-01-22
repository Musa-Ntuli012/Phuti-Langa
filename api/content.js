// Vercel Serverless Function to handle content storage
// This uses Prisma with PostgreSQL for persistent storage

import { prisma } from '../lib/prisma.js';

// Check if DATABASE_URL is set
const isDatabaseConfigured = !!process.env.DATABASE_URL;

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
      if (!isDatabaseConfigured) {
        return res.status(200).json({ success: true, data: null });
      }

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
        // Log the full error for debugging
        console.error('Database error details:', {
          message: error.message,
          code: error.code,
          meta: error.meta
        });
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

      if (!isDatabaseConfigured) {
        return res.status(503).json({ 
          success: false, 
          error: 'Database not configured. Please set DATABASE_URL environment variable. See PRISMA_SETUP.md for instructions.' 
        });
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
        // Log the full error for debugging
        console.error('Database error details:', {
          message: error.message,
          code: error.code,
          meta: error.meta
        });
        
        // Return more helpful error message
        const errorMessage = error.message?.includes('P1001') || error.message?.includes('connect') || error.message?.includes('Can\'t reach database')
          ? 'Database connection failed. Please check DATABASE_URL environment variable and ensure the database is accessible.'
          : error.message?.includes('P2002') || error.message?.includes('unique')
          ? 'Database constraint error. Please try again.'
          : error.message?.includes('P1017') || error.message?.includes('connection closed')
          ? 'Database connection was closed. Please check your database connection string.'
          : 'Failed to save content. Please check database configuration.';
        
        return res.status(500).json({ 
          success: false, 
          error: errorMessage,
          // Include error code for debugging
          ...(process.env.NODE_ENV === 'development' && { 
            code: error.code,
            details: error.message 
          })
        });
      }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    // Return more detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Internal server error';
    
    return res.status(500).json({ 
      success: false, 
      error: errorMessage,
      // Include stack trace in development only
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
}
