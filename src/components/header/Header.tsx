'use client';

import { cn } from '@/utills';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import useFooterScrollOverViewport from '@/app/(portfolio)/hooks/useFooterScrollOverViewport';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Gantari } from 'next/font/google';
import Link from 'next/link';
import MagneticContainer from '../MagneticContainer';
import NavMenu from './navMenu/NavMenu';
import { menuSlide } from '@/utills/animations';
import { closeMenu, toggleMenu } from '@/app/(portfolio)/features/navbarSlice';

const gantari = Gantari({ weight: ['400', '700'], subsets: ['latin'] });

const Header = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const isMenuOpen = useAppSelector((state) => state.navbar.isMenuOpen);
  const dispatch = useDispatch();
  const isHeaderColorDark = useFooterScrollOverViewport();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const scrollHeight = useRef<number>(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Keep header visible when near the top of the viewport or scrolling up
    setShowHeader(scrollHeight.current > latest || latest < 60);
    scrollHeight.current = latest;
  });

  useEffect(() => {
    dispatch(closeMenu());
  }, [pathname, dispatch]);

  const handleMenuButtonClick = () => dispatch(toggleMenu());
  const handleClose = () => dispatch(closeMenu());

  // Determine surface contrast theme based on scroll position and menu state
  const isDarkBackground = (!isMenuOpen && !isHeaderColorDark) || (isMenuOpen && isHeaderColorDark);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: showHeader || isMenuOpen ? 0 : -90,
          opacity: showHeader || isMenuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed left-0 right-0 top-0 z-[100] mx-auto mt-4 flex w-full max-w-[1400px] items-center justify-between px-5 sm:mt-6 sm:px-8"
      >
        {/* Left: Magnetic Logo Pill */}
        <div className="pointer-events-auto">
          <MagneticContainer>
            <Link
              aria-label="logo"
              href="/"
              onClick={handleClose}
              className={cn(
                'group relative flex items-center gap-2.5 rounded-full border px-4 py-2 outline-none backdrop-blur-xl transition-all duration-300 sm:px-5 sm:py-2.5',
                isDarkBackground
                  ? 'border-white/15 bg-dark-blue/65 text-white hover:border-light-green/60 hover:shadow-[0_0_24px_rgba(76,252,15,0.25)]'
                  : 'border-dark-blue/20 bg-light-green/85 text-dark-blue hover:border-dark-blue/50 hover:bg-dark-blue hover:text-light-green hover:shadow-[0_4px_20px_rgba(11,15,25,0.15)]',
                isMenuOpen ? 'cursor-none' : 'cursor-pointer',
              )}
            >
              {/* Pulsing Status Dot */}
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                    isDarkBackground ? 'bg-light-green' : 'bg-dark-blue group-hover:bg-light-green',
                  )}
                />
                <span
                  className={cn(
                    'relative inline-flex h-2 w-2 rounded-full',
                    isDarkBackground ? 'bg-light-green' : 'bg-dark-blue group-hover:bg-light-green',
                  )}
                />
              </span>

              {/* Brand Typography */}
              <span
                className={cn(
                  'flex items-center font-mono text-xs font-bold uppercase tracking-widest sm:text-sm',
                  gantari.className,
                )}
              >
                <span>ANOOPFOLIO</span>
                <span
                  className={cn(
                    'transition-colors duration-300',
                    isDarkBackground ? 'text-light-green' : 'text-dark-blue group-hover:text-light-green',
                  )}
                >
                  .
                </span>
              </span>

              {/* Architectural Sub-Tag */}
              <span
                className={cn(
                  'hidden font-mono text-[10px] tracking-wider transition-opacity duration-300 sm:inline-block',
                  isDarkBackground
                    ? 'text-white/40 group-hover:text-light-green/80'
                    : 'text-dark-blue/50 group-hover:text-light-green/80',
                )}
              >
                [ DEV ]
              </span>
            </Link>
          </MagneticContainer>
        </div>

        {/* Right: Magnetic Menu Toggle Pill */}
        <div className="pointer-events-auto">
          <MagneticContainer>
            <button
              type="button"
              onClick={handleMenuButtonClick}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={cn(
                'group relative flex items-center gap-3 rounded-full border px-4 py-2 outline-none backdrop-blur-xl transition-all duration-300 sm:px-5 sm:py-2.5',
                isDarkBackground
                  ? 'border-white/15 bg-dark-blue/65 text-white hover:border-light-green/60 hover:text-light-green hover:shadow-[0_0_24px_rgba(76,252,15,0.25)]'
                  : 'border-dark-blue/20 bg-light-green/85 text-dark-blue hover:border-dark-blue hover:bg-dark-blue hover:text-light-green hover:shadow-[0_4px_20px_rgba(11,15,25,0.15)]',
                isMenuOpen ? 'cursor-none' : 'cursor-pointer',
              )}
            >
              {/* Menu Status Indicator */}
              <span
                className={cn(
                  'inline-block h-1.5 w-1.5 rounded-full transition-colors duration-300',
                  isMenuOpen
                    ? 'animate-pulse bg-light-green'
                    : isDarkBackground
                      ? 'bg-light-green/80 group-hover:bg-light-green'
                      : 'bg-dark-blue/80 group-hover:bg-light-green',
                )}
              />

              {/* Action Label */}
              <span className="font-mono text-xs font-bold uppercase tracking-widest sm:text-sm">
                {isMenuOpen ? 'CLOSE' : 'MENU'}
              </span>

              {/* Minimalist Animated Hamburger / Close Icon */}
              <div className="relative flex h-3.5 w-4 flex-col justify-between" aria-hidden="true">
                <span
                  className={cn(
                    'h-[1.5px] w-full transform rounded-full bg-current transition-all duration-300 ease-out',
                    isMenuOpen ? 'translate-y-[6px] rotate-45' : 'translate-y-0 rotate-0',
                  )}
                />
                <span
                  className={cn(
                    'h-[1.5px] w-full transform rounded-full bg-current transition-all duration-300 ease-out',
                    isMenuOpen ? '-translate-y-[6px] -rotate-45' : 'translate-y-0 rotate-0 group-hover:translate-x-0.5',
                  )}
                />
              </div>
            </button>
          </MagneticContainer>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="nav-menu"
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className={cn(
              'fixed inset-0 z-50 h-screen w-screen overflow-visible',
              isHeaderColorDark ? 'bg-dark-blue text-white' : 'bg-light-green text-dark-blue',
              'transition-colors duration-500',
            )}
          >
            <NavMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
