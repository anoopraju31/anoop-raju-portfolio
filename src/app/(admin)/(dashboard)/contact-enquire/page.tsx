import { Suspense, type FC } from 'react';
import type { Metadata } from 'next';

import LoadingScreen from '@/components/LoadingScreen';
import ContactEnquirePage from '@/components/pages/contactEnquire/ContactEnquirePage';

export const metadata: Metadata = {
  title: 'Contact Enquiries | Admin Dashboard',
  description: 'Review, inspect, and manage visitor inquiries submitted through your portfolio.',
  robots: {
    index: false,
    follow: false,
  },
};

const Page: FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ContactEnquirePage />
    </Suspense>
  );
};

export default Page;
