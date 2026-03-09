import { Suspense } from 'react';
import { LoginForm } from './form';

export const dynamic = 'force-dynamic';

function LoginFallback() {
  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400 mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
