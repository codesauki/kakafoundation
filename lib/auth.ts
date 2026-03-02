import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './db';

// Rate limiting: track failed attempts per IP (simple in-memory)
const failedAttempts = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (identifier: string) => {
  const now = Date.now();
  const attempt = failedAttempts.get(identifier);
  
  if (!attempt || now > attempt.resetTime) {
    return true; // Allow
  }
  
  if (attempt.count >= 5) {
    return false; // Blocked after 5 attempts
  }
  
  return true;
};

const recordFailedAttempt = (identifier: string) => {
  const now = Date.now();
  const attempt = failedAttempts.get(identifier);
  
  if (!attempt || now > attempt.resetTime) {
    failedAttempts.set(identifier, { count: 1, resetTime: now + 15 * 60 * 1000 }); // 15 min window
  } else {
    attempt.count++;
    failedAttempts.set(identifier, attempt);
  }
};

const clearFailedAttempts = (identifier: string) => {
  failedAttempts.delete(identifier);
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        if (!adminPassword) {
          console.error('ADMIN_PASSWORD not configured');
          return null;
        }
        
        if (!credentials?.password) return null;
        
        // Rate limiting by IP
        const ip = req.headers?.['x-forwarded-for'] ?? 'unknown';
        if (!checkRateLimit(ip)) {
          console.warn(`Rate limit exceeded for IP: ${ip}`);
          return null;
        }
        
        // Simple password comparison (not bcrypt)
        if (credentials.password !== adminPassword) {
          recordFailedAttempt(ip);
          return null;
        }
        
        // Clear failed attempts on success
        clearFailedAttempts(ip);
        
        // Return admin user
        const adminUser = await prisma.adminUser.findFirst({ where: { role: 'SUPER_ADMIN' } });
        if (!adminUser) return null;
        
        return { id: adminUser.id, name: adminUser.name, email: adminUser.email, role: 'SUPER_ADMIN' };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = user.role ?? 'EDITOR'; }
      return token;
    },
    async session({ session, token }) {
      if (token) { (session.user as any).id = token.id; (session.user as any).role = token.role; }
      return session;
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};
