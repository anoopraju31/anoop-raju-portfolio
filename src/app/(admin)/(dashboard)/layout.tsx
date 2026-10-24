import type { FC, ReactNode } from 'react';

import AuthProvider from '@/components/providers/AuthProvider';

type Props = {
  children: ReactNode
};

const AdminLayout:FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <main className="flex min-h-screen gap-4 bg-[#F9FBFF] px-4 sm:gap-6 sm:px-6 md:gap-8 md:px-8">
        
        <div className="w-full pt-[76px]">{children}</div>
      </main>
    </AuthProvider>
  );
};

export default AdminLayout;