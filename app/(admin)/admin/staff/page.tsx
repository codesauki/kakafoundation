export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth'; import { authOptions } from '@/lib/auth'; import StaffManager from '@/components/admin/StaffManager';  export default async function Page() {   const session = await getServerSession(authOptions);   return <StaffManager session={session} />; }
