import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient | null = null;

// Initialize Prisma only once and only if DATABASE_URL is available
function initializePrisma(): PrismaClient {
  if (prismaInstance) return prismaInstance;
  
  if (!process.env.DATABASE_URL) {
    // Return empty proxy object if no DATABASE_URL - prevents crashes during build
    return {} as PrismaClient;
  }

  try {
    prismaInstance = new PrismaClient({ 
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      errorFormat: 'colorless',
    });
    
    if (process.env.NODE_ENV !== 'test') {
      globalForPrisma.prisma = prismaInstance;
    }
    
    return prismaInstance;
  } catch (error) {
    // Silently fail during build - return proxy object
    console.error('[Prisma Init Error during build - ignoring]', (error as Error).message);
    return {} as PrismaClient;
  }
}

export const prisma = globalForPrisma.prisma ?? initializePrisma();
