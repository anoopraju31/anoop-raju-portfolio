import type { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';

type Props = {
  children: ReactNode;
};

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster theme="dark" position="bottom-right" richColors />
    </>
  );
};

export default AdminLayout;
