import type { Metadata } from 'next';
import { Suspense, type FC } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import DashboardPage from '@/components/pages/dashboard/DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard | Admin Control Center',
  description: 'Administrative operational telemetry, inquiry metrics, and portfolio control.',
  robots: {
    index: false,
    follow: false,
  },
};

const Page: FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardPage />
    </Suspense>
  );
};

export default Page;
