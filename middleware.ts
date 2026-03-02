import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware() {
    return undefined;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
  }
);

// Only protect /admin routes - /login is now outside (admin) group
export const config = {
  matcher: ['/admin/:path*'],
};
