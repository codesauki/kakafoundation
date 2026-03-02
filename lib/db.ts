import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Only initialize Prisma if DATABASE_URL is available (runtime, not build)
let prismaInstance: PrismaClient;

if (globalForPrisma.prisma) {
  prismaInstance = globalForPrisma.prisma;
} else if (process.env.DATABASE_URL) {
  // Only create if DATABASE_URL exists
  prismaInstance = new PrismaClient({ 
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    errorFormat: 'colorless',
  });
  if (process.env.NODE_ENV !== 'test') {
    globalForPrisma.prisma = prismaInstance;
  }
} else {
  // Fallback - create lazy proxy to prevent errors during build
  prismaInstance = {} as PrismaClient;
}

export const prisma = prismaInstance;
