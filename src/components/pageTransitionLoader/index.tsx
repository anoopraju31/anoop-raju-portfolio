'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = { children: ReactNode };

const slotDelays = [0.65, 0.73, 0.81, 0.89, 0.97];
// const slotNumbers = ['01', '02', '03', '04', '05']
const slotTags = ['DESIGN', 'ENGINEER', 'INTERACT', 'MOTION', 'CRAFT'];

export default function PageTransitionLoader({ children }: Props) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Format the current destination route for display
  const getPageLabel = () => {
    if (!pathname || pathname === '/') return 'INDEX';
    const segment = pathname.split('/').filter(Boolean)[0];
    return segment ? segment.toUpperCase() : 'PORTFOLIO';
  };

  useEffect(() => {
    const startTime = performance.now();
    const duration = 650; // ms duration for count-up

    const update = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      // Smooth ease-out quad curve
      const eased = Math.round((1 - Math.pow(1 - p, 2)) * 100);
      setProgress(eased);
      if (p < 1) {
        requestAnimationFrame(update);
      }
    };

    const raf = requestAnimationFrame(update);
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 1900);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div>
      {!isComplete && (
        <div className="pointer-events-none fixed inset-0 z-[100000] h-screen w-full select-none overflow-hidden">
          {/* Centered Kinetic HUD Overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              transition={{ delay: 0.65, duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col items-center px-4 text-center"
            >
              {/* Top Route Status Pill */}
              <div className="mb-3 flex items-center gap-2.5 rounded-full border border-dark-blue/15 bg-dark-blue/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-dark-blue shadow-sm backdrop-blur-md sm:text-xs">
                <span className="h-2 w-2 animate-ping rounded-full bg-dark-blue" />
                <span>ANOOP RAJU &bull; {getPageLabel()}</span>
              </div>

              {/* Large Digital Percentage Counter */}
              <div className="flex items-baseline font-mono">
                <span className="text-6xl font-bold leading-none tracking-tighter text-dark-blue sm:text-8xl md:text-9xl">
                  {String(progress).padStart(2, '0')}
                </span>
                <span className="ml-1 text-2xl font-bold text-dark-blue/60 sm:text-3xl">%</span>
              </div>

              {/* Kinetic Progress Bar Track */}
              <div className="relative mt-3 h-[3px] w-44 overflow-hidden rounded-full bg-dark-blue/20 sm:w-64">
                <div
                  className="h-full rounded-full bg-dark-blue transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Micro Status Indicators */}
              <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-dark-blue/70 sm:text-xs">
                <span>INITIALIZING</span>
                <span>&bull;</span>
                <span>EXPERIENCE READY</span>
              </div>
            </motion.div>
          </div>

          {/* 5 Vertical Staggered Curtain Slots */}
          <div className="flex h-full w-full">
            {slotDelays.map((delay, index) => (
              <motion.div
                key={index}
                initial={{ y: '0%' }}
                animate={{ y: '-100%' }}
                transition={{
                  duration: 0.85,
                  delay,
                  ease: [0.76, 0, 0.24, 1],
                }}
                // shadow-[0_25px_50px_rgba(0,0,0,0.25)] border-r border-dark-blue/10 last:border-r-0
                className="relative flex h-full w-1/5 flex-col justify-between bg-light-green p-4 sm:p-6"
              >
                {/* Top Slot Index */}
                <span className="font-mono text-[11px] font-bold text-dark-blue/35 sm:text-xs">
                  {/* [{slotNumbers[index]}] */}
                </span>

                {/* Bottom Architectural Tag */}
                <span className="truncate font-mono text-[9px] font-semibold tracking-wider text-dark-blue/35 sm:text-[11px]">
                  {slotTags[index] || 'SYSTEM'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
