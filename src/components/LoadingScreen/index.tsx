import type { FC } from 'react';

import { LoadingDots } from './LoadingDots';

const LoadingScreen: FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
      <LoadingDots size="lg" />
    </div>
  );
};

export default LoadingScreen;
