'use client';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

interface Props {
  children: React.ReactNode;
  session?: any;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <AdminTopbar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
