import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware() {
    // Middleware just passes through - NextAuth handles auth check
    return undefined;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access only if token exists
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
  }
);

// Only protect /admin routes - NOT /login
export const config = {
  matcher: ['/admin/:path*'],
};
