# Prisma + PostgreSQL Setup Guide

This guide will help you set up Prisma with PostgreSQL for persistent storage of your admin panel content.

## Prerequisites

- A PostgreSQL database (Vercel Postgres, Supabase, Neon, or any PostgreSQL provider)
- Node.js installed locally

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@prisma/client` - Prisma Client for database queries
- `prisma` - Prisma CLI (dev dependency)

### 2. Set Up PostgreSQL Database

Choose one of these options:

#### Option A: Vercel Postgres (Recommended for Vercel deployments)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Give it a name (e.g., "portfolio-db")
6. Select a region
7. Click **Create**

Vercel will automatically:
- Set the `DATABASE_URL` environment variable
- Link it to your project

#### Option B: Supabase (Free tier available)

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection string** (URI format)
5. Add it to Vercel as `DATABASE_URL` environment variable

#### Option C: Neon (Free tier available)

1. Go to [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to Vercel as `DATABASE_URL` environment variable

### 3. Set Environment Variable

In your Vercel project settings:
1. Go to **Settings** → **Environment Variables**
2. Add `DATABASE_URL` with your PostgreSQL connection string
   - Format: `postgresql://user:password@host:port/database?sslmode=require`
   - Vercel Postgres sets this automatically
   - For other providers, use their connection string

### 4. Run Database Migration

**Locally** (for development):
```bash
# Push schema to database (creates tables)
npm run db:push

# Or use migrations (recommended for production)
npm run db:migrate
```

**On Vercel** (automatic):
- The `postinstall` script runs `prisma generate` automatically
- You can run migrations via Vercel CLI or add a migration step to your build process

### 5. Deploy

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Prisma + PostgreSQL for content storage"
   git push
   ```

2. Vercel will automatically:
   - Run `npm install` (which runs `prisma generate`)
   - Deploy your API routes

### 6. Verify It Works

1. Visit your deployed site
2. Go to the admin panel (`/admin`)
3. Make a change (e.g., update contact info)
4. Check the browser console - should see "Content saved successfully to server"
5. Refresh the page - your changes should persist
6. Try from a different browser/device - changes should be visible there too

## Database Schema

The schema is defined in `prisma/schema.prisma`:

```prisma
model PortfolioContent {
  id        String   @id @default("portfolio")
  content   Json     // Stores the entire portfolio content as JSON
  updatedAt DateTime @updatedAt
}
```

This creates a single table with:
- `id`: Always "portfolio" (single record)
- `content`: JSON field storing all portfolio data
- `updatedAt`: Automatically updated timestamp

## Local Development

### Set Up Local Database

1. Create a local PostgreSQL database or use a cloud provider
2. Create a `.env` file in the root:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
   ```
3. Run migrations:
   ```bash
   npm run db:push
   ```

### Use Prisma Studio (Optional)

View and edit your database visually:
```bash
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555`

## How It Works

- **Development**: Uses `localStorage` as fallback if database isn't available
- **Production**: Saves to PostgreSQL via Prisma
- **Fallback**: If API fails, it still saves to `localStorage` as backup

## API Endpoint

The API endpoint is located at `/api/content.js` and handles:
- `GET /api/content` - Loads content from PostgreSQL
- `POST /api/content` - Saves content to PostgreSQL (upsert)

## Troubleshooting

### Database Connection Errors

1. Check `DATABASE_URL` environment variable is set correctly
2. Verify database is accessible (not blocked by firewall)
3. Check connection string format (must include `?sslmode=require` for cloud databases)

### Migration Issues

1. Make sure Prisma Client is generated: `npx prisma generate`
2. Check database permissions
3. Verify schema is correct in `prisma/schema.prisma`

### Changes Not Saving

1. Check browser console for errors
2. Check Vercel function logs in dashboard
3. Verify `DATABASE_URL` is set in Vercel environment variables
4. Test database connection with Prisma Studio

## Cost

- **Vercel Postgres**: Free tier available (256 MB storage)
- **Supabase**: Free tier (500 MB database, 2 GB bandwidth)
- **Neon**: Free tier (0.5 GB storage)

For a personal portfolio, any free tier is more than enough.

## Next Steps

- Consider adding more tables if you need separate storage for different content types
- Add database indexes if you plan to query specific fields
- Set up database backups (most providers do this automatically)
