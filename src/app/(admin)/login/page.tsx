import type { Metadata } from 'next';
import { Suspense, type FC } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import LoginPage from '@/components/pages/login/LoginPage';

export const metadata: Metadata = {
  title: 'Admin Login | Anoop Raju',
  description: 'Administrative terminal login for Anoop Raju portfolio management.',
  robots: {
    index: false,
    follow: false,
  },
};

const Page: FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LoginPage />
    </Suspense>
  );
};

export default Page;
