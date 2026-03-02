import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SettingsManager from '@/components/admin/SettingsManager';

export default async function Page() {
  const session = await getServerSession(authOptions);
  return <SettingsManager session={session} />;
}
