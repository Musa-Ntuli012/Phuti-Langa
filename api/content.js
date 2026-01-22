// Vercel Serverless Function to handle content storage
// This uses Upstash Redis for persistent storage
// To set up: Add Upstash Redis from Vercel Marketplace

import { Redis } from '@upstash/redis';

const CONTENT_KEY = 'portfolio_content';

// Initialize Redis client only if environment variables are available
let redis = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (error) {
    console.error('Failed to initialize Redis client:', error);
  }
}

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
      // Load content from Redis
      if (!redis) {
        return res.status(200).json({ success: true, data: null });
      }
      
      try {
        const content = await redis.get(CONTENT_KEY);
        if (content) {
          // Parse JSON if it's a string, otherwise return as-is
          const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
          return res.status(200).json({ success: true, data: parsedContent });
        }
        // Return null if no data found
        return res.status(200).json({ success: true, data: null });
      } catch (error) {
        console.error('Error reading from Redis:', error);
        // If Redis error occurs, return null
        // Client will use localStorage fallback
        return res.status(200).json({ success: true, data: null });
      }
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      // Save content to Redis
      const { data } = req.body;

      if (!data) {
        return res.status(400).json({ success: false, error: 'No data provided' });
      }

      if (!redis) {
        return res.status(503).json({ 
          success: false, 
          error: 'Storage not configured. Please set up Upstash Redis from Vercel Marketplace. See VERCEL_SETUP.md for instructions.' 
        });
      }

      try {
        await redis.set(CONTENT_KEY, JSON.stringify(data));
        return res.status(200).json({ success: true, message: 'Content saved successfully' });
      } catch (error) {
        console.error('Error writing to Redis:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to save content. Please check Upstash Redis configuration.' 
        });
      }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
