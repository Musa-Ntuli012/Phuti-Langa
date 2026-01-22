// Prisma client singleton for serverless functions
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

let prisma;

try {
  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
} catch (error) {
  console.error('Failed to initialize Prisma Client:', error);
  // Create a mock prisma object that will throw helpful errors
  prisma = {
    portfolioContent: {
      findUnique: async () => {
        throw new Error('Prisma Client not initialized. Please run: npm run postinstall');
      },
      upsert: async () => {
        throw new Error('Prisma Client not initialized. Please run: npm run postinstall');
      },
    },
  };
}

export { prisma };
