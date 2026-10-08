'use client';

import { cn } from '@/utills';
import { type FC, useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import useFooterScrollOverViewport from '@/app/(portfolio)/hooks/useFooterScrollOverViewport';
import { motion, type Variants } from 'framer-motion';
import { Gantari } from 'next/font/google';
import { FiArrowUpRight, FiCopy, FiCheck, FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';
import Curve from '../Curve';
import NavLink from './NavLink';

const gantari = Gantari({ weight: '400', subsets: ['latin'] });

const NAV_ITEMS = [
  { title: 'Home', link: '/' },
  { title: 'Projects', link: '/projects' },
  { title: 'Contact', link: '/contact' },
  { title: 'Blogs', link: '/blogs' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/anoopraju31', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anoop-raju', icon: FiLinkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/', icon: FiInstagram },
];

const secondaryFadeVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const NavMenu: FC = () => {
  const pathname = usePathname();
  const isBackgroundDark = useFooterScrollOverViewport();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInteractiveHovered, setIsInteractiveHovered] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Keep Kerala (IST) live clock updated
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setLocalTime(istString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global mouse tracking across viewport and Header (hides default OS cursor while open)
  useEffect(() => {
    const originalBodyCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isCursorVisible) setIsCursorVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer'),
      );
      setIsInteractiveHovered(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
      setIsInteractiveHovered(false);
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = originalBodyCursor;
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isCursorVisible]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('anoop2019@iiitkottayam.ac.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Custom Magnetic Cursor Follower (z-[150] floats above Header and NavMenu) */}
      {isCursorVisible && (
        <>
          {/* Outer Magnetic Ring */}
          <motion.div
            className={cn(
              'pointer-events-none fixed left-0 top-0 z-[150] hidden rounded-full border md:block',
              isBackgroundDark ? 'border-light-green' : 'border-dark-blue',
            )}
            animate={{
              x: mousePos.x - (isInteractiveHovered ? 24 : 16),
              y: mousePos.y - (isInteractiveHovered ? 24 : 16),
              width: isInteractiveHovered ? 48 : 32,
              height: isInteractiveHovered ? 48 : 32,
              opacity: isInteractiveHovered ? 0.9 : 0.65,
            }}
            transition={{ type: 'spring', damping: 28, stiffness: 420, mass: 0.15 }}
          />

          {/* Precision Center Dot */}
          <motion.div
            className={cn(
              'pointer-events-none fixed left-0 top-0 z-[150] hidden rounded-full md:block',
              isBackgroundDark ? 'bg-light-green' : 'bg-dark-blue',
            )}
            animate={{
              x: mousePos.x - (isInteractiveHovered ? 4 : 3),
              y: mousePos.y - (isInteractiveHovered ? 4 : 3),
              width: isInteractiveHovered ? 8 : 6,
              height: isInteractiveHovered ? 8 : 6,
              opacity: 1,
            }}
            transition={{ type: 'spring', damping: 35, stiffness: 600, mass: 0.1 }}
          />
        </>
      )}

      {/* Top SVG Curve Transition (overflow-visible, unclipped) */}
      <Curve isBackgroundDark={isBackgroundDark} />

      {/* Ambient radial glow in dark mode */}
      {isBackgroundDark && (
        <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-light-green/5 blur-[140px]" />
      )}

      {/* Inner Scrollable Container */}
      <div className="custom-scrollbar-1 relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col justify-between overflow-y-auto overflow-x-hidden px-6 pb-8 pt-28 sm:px-12 md:px-16 md:pt-32 lg:px-24">
        {/* Top Status & Directory Bar */}
        <motion.div
          variants={secondaryFadeVariants}
          className={cn(
            'flex flex-wrap items-center justify-between gap-4 border-b pb-4 font-mono text-xs uppercase tracking-widest sm:text-sm',
            isBackgroundDark ? 'border-white/10 text-white/50' : 'border-dark-blue/15 text-dark-blue/60',
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-block h-2 w-2 rounded-full',
                isBackgroundDark ? 'bg-white/80' : 'bg-dark-blue/80',
                'animate-pulse',
              )}
            />
            <span>{'//'} NAVIGATION DIRECTORY</span>
          </div>

          <div className="flex items-center gap-4">
            <span>KERALA, IN {localTime ? `• ${localTime} IST` : ''}</span>
            <span className="hidden opacity-40 sm:inline">|</span>
            <span className="hidden sm:inline">[ 04 DESTINATIONS ]</span>
          </div>
        </motion.div>

        {/* Center Content: Two-column layout on larger screens */}
        <div className="my-auto grid grid-cols-1 items-center gap-12 py-8 md:py-12 lg:grid-cols-12 lg:gap-16">
          {/* Left / Main Column: Primary Nav Links */}
          <nav className="flex flex-col justify-center lg:col-span-7">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = item.link === '/' ? pathname === '/' : pathname.startsWith(item.link);

              return (
                <NavLink
                  key={item.link}
                  title={item.title}
                  link={item.link}
                  index={idx}
                  isActive={isActive}
                  isHovered={hoveredIndex === idx}
                  isAnyHovered={hoveredIndex !== null}
                  onHoverStart={() => {
                    setHoveredIndex(idx);
                    setIsInteractiveHovered(true);
                  }}
                  onHoverEnd={() => {
                    setHoveredIndex(null);
                    setIsInteractiveHovered(false);
                  }}
                  isBackgroundDark={isBackgroundDark}
                />
              );
            })}
          </nav>

          {/* Right Column: Editorial Contact & Social Meta */}
          <motion.div
            variants={secondaryFadeVariants}
            className="flex flex-col justify-between space-y-8 lg:col-span-5 lg:border-l lg:pl-10"
            style={{
              borderColor: isBackgroundDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 14, 22, 0.15)',
            }}
          >
            {/* Availability & Bio Card */}
            <div
              className={cn(
                'rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300',
                isBackgroundDark
                  ? 'border-white/10 bg-white/[0.03] hover:border-light-green/40'
                  : 'border-dark-blue/15 bg-dark-blue/5 hover:border-dark-blue/30',
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span
                    className={cn(
                      'absolute left-[5px] top-[5px] inline-flex h-2.5 w-2.5 animate-ping rounded-full',
                      isBackgroundDark ? 'bg-white/80' : 'bg-dark-blue/80',
                      'opacity-75',
                    )}
                  />
                  <span
                    className={cn(
                      'relative inline-flex h-2.5 w-2.5 rounded-full',
                      isBackgroundDark ? 'bg-white/80' : 'bg-dark-blue/80',
                    )}
                  />
                </span>
                <span
                  className={cn(
                    'font-mono text-xs font-semibold uppercase tracking-wider',
                    isBackgroundDark ? 'text-white/80' : 'text-dark-blue/80',
                  )}
                >
                  Available for new opportunities
                </span>
              </div>
              <p
                className={cn(
                  'text-sm leading-relaxed sm:text-base',
                  gantari.className,
                  isBackgroundDark ? 'text-white/80' : 'text-dark-blue/80',
                )}
              >
                Creative Full Stack Engineer specializing in bespoke web applications, high-performance interactive
                visuals, and resilient cloud architectures.
              </p>
            </div>

            {/* Quick Direct Inquiries */}
            <div>
              <span
                className={cn(
                  'mb-3 block font-mono text-xs uppercase tracking-widest',
                  isBackgroundDark ? 'text-white/40' : 'text-dark-blue/50',
                )}
              >
                {'//'} SAY HELLO
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:anoop2019@iiitkottayam.ac.in"
                  onMouseEnter={() => setIsInteractiveHovered(true)}
                  onMouseLeave={() => setIsInteractiveHovered(false)}
                  className={cn(
                    'group inline-flex items-center gap-2 text-base font-medium underline underline-offset-4 transition-colors duration-300 sm:text-lg',
                    isBackgroundDark
                      ? 'text-white decoration-white/30 hover:text-light-green hover:decoration-light-green'
                      : 'text-dark-blue decoration-dark-blue/30 hover:opacity-75',
                  )}
                >
                  <FiMail className="text-light-green" />
                  <span>anoop2019@iiitkottayam.ac.in</span>
                  <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                {/* Copy button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setIsInteractiveHovered(true)}
                  onMouseLeave={() => setIsInteractiveHovered(false)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-all duration-300',
                    copiedEmail
                      ? 'border-light-green bg-light-green font-bold text-dark-blue'
                      : isBackgroundDark
                        ? 'border-white/20 text-white/70 hover:border-light-green hover:text-light-green'
                        : 'border-dark-blue/30 text-dark-blue hover:bg-dark-blue/10',
                  )}
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <FiCheck className="text-sm" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="text-sm" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <span
                className={cn(
                  'mb-3 block font-mono text-xs uppercase tracking-widest',
                  isBackgroundDark ? 'text-white/40' : 'text-dark-blue/50',
                )}
              >
                {'//'} CONNECT
              </span>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setIsInteractiveHovered(true)}
                      onMouseLeave={() => setIsInteractiveHovered(false)}
                      className={cn(
                        'group inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xs transition-all duration-300 sm:text-sm',
                        isBackgroundDark
                          ? 'border-white/10 bg-white/[0.02] text-white/80 hover:-translate-y-0.5 hover:border-light-green hover:bg-light-green hover:text-dark-blue'
                          : 'border-dark-blue/20 bg-dark-blue/[0.03] text-dark-blue hover:-translate-y-0.5 hover:border-dark-blue hover:bg-dark-blue hover:text-light-green',
                      )}
                    >
                      <Icon className="text-sm" />
                      <span>{social.name}</span>
                      <FiArrowUpRight className="text-xs opacity-60 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Meta & Copyright */}
        <motion.div
          variants={secondaryFadeVariants}
          className={cn(
            'flex flex-wrap items-center justify-between gap-4 border-t pt-4 font-mono text-xs tracking-wider',
            isBackgroundDark ? 'border-white/10 text-white/40' : 'border-dark-blue/15 text-dark-blue/50',
          )}
        >
          <p>© {currentYear} ANOOP RAJU. ALL RIGHTS RESERVED.</p>
          <p className="hidden sm:block">DESIGNED & ENGINEERED FOR HIGH IMPACT</p>
        </motion.div>
      </div>
    </>
  );
};

export default NavMenu;
