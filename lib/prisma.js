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
  const notInitialized = async () => {
    throw new Error('Prisma Client not initialized. Please run: npm run postinstall');
  };
  prisma = {
    portfolioContent: {
      findUnique: notInitialized,
      upsert: notInitialized,
    },
    contactMessage: {
      findMany: notInitialized,
      create: notInitialized,
      delete: notInitialized,
    },
  };
}

export { prisma };
