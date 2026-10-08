'use client';

import { useState, useEffect, useMemo, type FC, type ReactNode } from 'react';
import { type LenisOptions } from 'lenis';
import ReactLenis from 'lenis/react';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';

type Props = {
  children: ReactNode;
};

const SmoothScrollLenis: FC<Props> = ({ children }) => {
  const lenisScrollRoot = useAppSelector((state) => state.appState.lenisScrollRoot);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(window.navigator.userAgent));
  }, []);

  const options = useMemo(() => {
    return {
      lerp: 0.15,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    } as LenisOptions;
  }, []);

  // Skip Lenis on mobile — native scroll is more performant
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root={lenisScrollRoot} options={options}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollLenis;
