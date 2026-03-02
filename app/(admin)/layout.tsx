import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  // Redirect to /login (outside admin route) if not authenticated
  if (!session) redirect('/login');
  return <>{children}</>;
}
