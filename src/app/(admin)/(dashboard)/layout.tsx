import type { FC, ReactNode } from 'react';

import AuthProvider from '@/components/providers/AuthProvider';
import AdminNavbar from '@/components/admin/AdminNavbar';

type Props = {
  children: ReactNode;
};

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <AdminNavbar />
      <main className="flex min-h-screen flex-col bg-[#F9FBFF] px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-7xl pt-[84px] pb-12">{children}</div>
      </main>
    </AuthProvider>
  );
};

export default AdminLayout;