'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import useFooterScrollOverViewport from '@/app/(portfolio)/hooks/useFooterScrollOverViewport';
import useAppSelector from '@/app/(portfolio)/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Gantari } from 'next/font/google';
import Link from 'next/link';
import { CgClose, CgMenu } from 'react-icons/cg';
import MagneticContainer from '../MagneticContainer';
import NavMenu from './navMenu/NavMenu';
import { menuSlide, slideToView } from '@/utills/animations';
import { closeMenu, toggleMenu } from '@/app/(portfolio)/features/navbarSlice';

const gantari = Gantari({ weight: '400', subsets: ['latin'] });

const Header = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const isMenuOpen = useAppSelector((state) => state.navbar.isMenuOpen);
  const dispatch = useDispatch();
  const isHeaderColorDark = useFooterScrollOverViewport();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const scrollHeight = useRef<number>(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowHeader(scrollHeight.current > latest);
    scrollHeight.current = latest;
  });

  useEffect(() => {
    dispatch(closeMenu());
  }, [pathname, dispatch]);

  const handleMenuButtonClick = () => dispatch(toggleMenu());
  const handleClose = () => dispatch(closeMenu());

  const menuStyle = () => {
    if (!isMenuOpen && !isHeaderColorDark)
      return 'bg-white hover:bg-light-green border-white hover:border-light-green text-dark-blue hover:text-dark-blue';
    if (!isMenuOpen && isHeaderColorDark)
      return 'bg-white hover:bg-light-green border-white hover:border-light-green text-dark-blue hover:text-dark-blue';
    if (isMenuOpen && !isHeaderColorDark)
      return 'bg-dark-blue hover:bg-dark-blue/80 border-dark-blue hover:border-dark-blue text-light-green';
    else return 'bg-light-green hover:bg-light-green/80 border-light-green text-dark-blue hover:text-light-green';
  };

  const logoStyle = () => {
    if (!isMenuOpen && !isHeaderColorDark) return 'text-white hover:text-light-green';
    if (!isMenuOpen && isHeaderColorDark) return 'text-white hover:text-dark-blue';
    if (isMenuOpen && !isHeaderColorDark) return 'text-dark-blue hover:text-dark-blue';
    else return 'text-light-green hover:text-light-green';
  };

  return (
    <>
      <motion.header
        variants={slideToView}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className={`fixed ${
          showHeader || isMenuOpen ? 'top-0' : '-top-40'
        } left-0 right-0 z-[100] mx-auto mt-5 flex w-full max-w-[1400px] items-center justify-between px-[25px] py-2 transition-top duration-1000 ease-in-out hover:text-opacity-10`}
      >
        <Link
          aria-label="logo"
          href="/"
          onClick={handleClose}
          className={`uppercase ${logoStyle()} drop-shadow-lg ${
            isMenuOpen ? 'cursor-none' : 'cursor-pointer'
          } text-2xl outline-none transition-colors duration-1000 md:text-3xl ${gantari.className}`}
        >
          Anoopfolio
        </Link>

        <MagneticContainer>
          <button
            type="button"
            onClick={handleMenuButtonClick}
            className={`flex items-center justify-center rounded-lg border-2 p-1.5 text-xl outline-none md:p-2 md:text-2xl ${menuStyle()} ${
              isMenuOpen ? 'cursor-none' : 'cursor-pointer'
            } backdrop-blur-lg transition-colors duration-1000 hover:border-opacity-10 hover:bg-opacity-10`}
          >
            <span className="sr-only"> Menu </span>
            {isMenuOpen ? <CgClose /> : <CgMenu />}
          </button>
        </MagneticContainer>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="nav-menu"
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`fixed inset-0 z-50 h-screen w-screen overflow-visible ${
              isHeaderColorDark ? 'bg-dark-blue text-white' : 'bg-light-green text-dark-blue'
            } transition-colors duration-500`}
          >
            <NavMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
