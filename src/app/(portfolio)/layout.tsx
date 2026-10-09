import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

import ScrollToTopOnReload from '@/components/ScrollToTopOnReload';
import Header from '@/components/header/Header';
import Footer from '@/components/footer';

type Props = {
  children: ReactNode;
};

export default function PortfolioLayout(props: Props) {
  const { children } = props;

  return (
    <ScrollToTopOnReload>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </ScrollToTopOnReload>
  );
}
