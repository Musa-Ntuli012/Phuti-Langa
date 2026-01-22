# Vercel Setup Guide for Persistent Admin Storage

This guide will help you set up persistent storage for the admin panel so that changes are saved permanently and immediately on your Vercel deployment.

## Problem

Previously, admin changes were only saved to `localStorage`, which is browser-specific and doesn't persist across:
- Different browsers/devices
- Site rebuilds
- Other users viewing the site

## Solution

We've implemented a solution using:
- **Vercel Serverless Functions** (API routes) - `/api/content.js`
- **Upstash Redis** (via Vercel Marketplace) - For persistent data storage

> **Note**: Vercel KV was deprecated in December 2024 and migrated to Upstash Redis. This implementation uses Upstash Redis.

## Setup Steps

### 1. Install Dependencies

The `@upstash/redis` package is already added to `package.json`. Install it:

```bash
npm install
```

### 2. Set Up Upstash Redis

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to the **Storage** tab (or **Integrations** → **Marketplace**)
4. Search for **Upstash Redis** or go to **Marketplace** → **Databases**
5. Click on **Upstash Redis**
6. Click **Add Integration** or **Create Database**
7. Give it a name (e.g., "portfolio-redis")
8. Select a region close to your users
9. Click **Create** or **Add**

### 3. Link Redis to Your Project

Vercel will automatically:
- Link the Redis database to your project
- Set environment variables (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`)
- Make them available to your serverless functions

### 4. Deploy

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add persistent storage for admin panel"
   git push
   ```

2. Vercel will automatically deploy your changes

### 5. Verify It Works

1. Visit your deployed site
2. Go to the admin panel (`/admin`)
3. Make a change (e.g., update contact info)
4. Check the browser console - you should see "Content saved successfully to server"
5. Refresh the page - your changes should persist
6. Try from a different browser/device - changes should be visible there too

## How It Works

- **Development**: Uses `localStorage` as a fallback (since serverless functions need Vercel's dev server)
- **Production**: Saves to Upstash Redis via the `/api/content` endpoint
- **Fallback**: If API fails, it still saves to `localStorage` as backup

## API Endpoint

The API endpoint is located at `/api/content.js` and handles:
- `GET /api/content` - Loads content from Redis
- `POST /api/content` - Saves content to Redis

## Troubleshooting

### Changes Not Saving

1. Check browser console for errors
2. Verify Upstash Redis is set up in your Vercel dashboard
3. Check that environment variables are set:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   (Vercel sets these automatically when you add the integration)
4. Look at Vercel function logs in the dashboard

### Still Using localStorage

- In development mode, the app uses `localStorage` by default
- In production (on Vercel), it automatically uses the API
- Make sure you're testing on the deployed site, not localhost

## Alternative Storage Options

### Edge Config (Read-Heavy)
- **Best for**: Content that changes infrequently, read-heavy workloads
- **Not ideal for**: Frequent admin updates (writes are slower, limited updates)
- **Use case**: If you update content rarely and want ultra-fast reads globally

### Blob Storage
- **Best for**: File storage (images, documents, large files)
- **Not ideal for**: JSON data, frequent updates
- **Use case**: Storing images, PDFs, or other files

### Upstash Redis (Current Implementation)
- **Best for**: Frequent reads and writes, real-time updates
- **Perfect for**: Admin panels with frequent content updates
- **Use case**: ✅ This is what we're using - perfect for your admin panel

### Other Options
If you prefer a different database solution, you can modify `/api/content.js` to use:
- Supabase
- MongoDB
- PostgreSQL
- Any other database with a Node.js client

Just replace the `@upstash/redis` import and usage with your preferred database client.

## Cost

Upstash Redis has a generous free tier:
- Free tier: 10,000 commands/day, 256 MB storage
- Perfect for personal portfolio sites with admin panels

For a personal portfolio, this is more than enough.
