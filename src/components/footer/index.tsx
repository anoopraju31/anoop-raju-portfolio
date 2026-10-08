'use client';

import { Gantari } from 'next/font/google';
import { useEffect, useRef, useState, type FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiArrowUpRight,
  FiArrowUp,
  //  FiCopy, FiCheck, FiMail
} from 'react-icons/fi';
// import { toast } from 'sonner'

import FooterScrollText from './footerScrollText';
import FooterLink from './footerLink';
import MagneticContainer from '../MagneticContainer';

import styles from './styles.module.css';

const gantari = Gantari({ weight: '400', subsets: ['latin'] });

const SOCIAL_LINKS = [
  { title: 'Linked In', link: 'https://www.linkedin.com/in/anoop-raju' },
  { title: 'GitHub', link: 'https://github.com/anoopraju31' },
  { title: 'Instagram', link: 'https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/' },
  { title: 'Email', link: 'mailto:anoop2019@iiitkottayam.ac.in' },
];

const Footer: FC = () => {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isCursorInside, setIsCursorInside] = useState(false);
  const [isInteractiveHovered, setIsInteractiveHovered] = useState(false);
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState<number | null>(null);
  // const [copiedEmail, setCopiedEmail] = useState(false)
  const [liveTime, setLiveTime] = useState('');
  const footerRef = useRef<HTMLElement | null>(null);

  // Live Bengaluru Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setLiveTime(istString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluid mouse tracking within Footer bounds
  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isCursorInside) setIsCursorInside(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer'),
      );
      setIsInteractiveHovered(isInteractive);
    };

    const handleMouseEnter = () => setIsCursorInside(true);
    const handleMouseLeave = () => {
      setIsCursorInside(false);
      setIsInteractiveHovered(false);
      setHoveredLinkIndex(null);
    };

    footerElement.addEventListener('mousemove', handleMouseMove);
    footerElement.addEventListener('mouseenter', handleMouseEnter);
    footerElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      footerElement.removeEventListener('mousemove', handleMouseMove);
      footerElement.removeEventListener('mouseenter', handleMouseEnter);
      footerElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isCursorInside]);

  // const handleCopyEmail = (e: React.MouseEvent) => {
  // 	e.preventDefault()
  // 	navigator.clipboard.writeText('anoop2019@iiitkottayam.ac.in')
  // 	setCopiedEmail(true)
  // 	toast.success('Email copied to clipboard!')
  // 	setTimeout(() => setCopiedEmail(false), 2200)
  // }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} id="footer" aria-label="footer" className={styles.footer}>
      {/* Custom Smooth Magnetic Cursor Follower */}
      {isCursorInside && (
        <>
          {/* Outer Magnetic Ring */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-50 hidden rounded-full border border-dark-blue bg-dark-blue/10 md:block"
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
            className="pointer-events-none fixed left-0 top-0 z-50 hidden rounded-full bg-dark-blue md:block"
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

      {/* Top Marquee Scrolling Banner */}
      <FooterScrollText />

      <div className={styles.divider} />

      {/* Main Content Area */}
      <div className={styles['outter-container']}>
        <div className={styles['inner-container']}>
          {/* Left Column: CTA & Quick Contact Info */}
          <div className={styles['contact-me-wrapper']}>
            <span className="font-mono text-xs uppercase tracking-widest text-dark-blue/60">
              {'//'} START A CONVERSATION
            </span>

            {/* Magnetic CTA Button */}
            <div className="w-fit">
              <MagneticContainer>
                <Link href="/contact" className={`${styles['contact-button']} group`}>
                  <span>Contact Me</span>
                  <FiArrowUpRight className="text-3xl transition-transform duration-500 group-hover:rotate-45 sm:text-5xl" />
                </Link>
              </MagneticContainer>
            </div>

            {/* Availability & Pitch Card */}
            <div className="max-w-lg rounded-2xl border border-dark-blue/20 bg-dark-blue/[0.04] p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dark-blue opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-dark-blue" />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-dark-blue">
                  Available for new opportunities
                </span>
              </div>
              <p className={`text-sm leading-relaxed text-dark-blue/80 sm:text-base ${gantari.className}`}>
                Looking to build cutting-edge web applications, interactive 3D experiences, or scale your digital
                engineering? Let&apos;s build something impactful.
              </p>
            </div>

            {/* Direct Email with Quick Copy */}
            {/* <div className='flex flex-col gap-2'>
							<span className='text-xs font-mono tracking-widest uppercase text-dark-blue/60'>
								{'//'} DIRECT INQUIRY
							</span>
							<div className='flex flex-wrap items-center gap-3'>
								<a
									href='mailto:anoop2019@iiitkottayam.ac.in'
									className='group inline-flex items-center gap-2 text-base sm:text-lg font-bold text-dark-blue underline underline-offset-4 decoration-dark-blue/40 hover:opacity-75 transition-opacity'
								>
									<FiMail className='text-dark-blue text-lg' />
									<span>anoop2019@iiitkottayam.ac.in</span>
									<FiArrowUpRight className='text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
								</a>

								<button
									type='button'
									onClick={handleCopyEmail}
									className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 border border-dark-blue/30 transition-all duration-300 ${
										copiedEmail
											? 'bg-dark-blue text-light-green font-bold'
											: 'bg-transparent text-dark-blue hover:bg-dark-blue/10'
									}`}
									title='Copy email address'
								>
									{copiedEmail ? (
										<>
											<FiCheck className='text-sm' />
											<span>COPIED!</span>
										</>
									) : (
										<>
											<FiCopy className='text-sm' />
											<span>COPY</span>
										</>
									)}
								</button>
							</div>
						</div> */}
          </div>

          {/* Right Column: Social Links */}
          <div className={styles['footer-links-container']}>
            <span className="mb-2 font-mono text-xs uppercase tracking-widest text-dark-blue/60">
              {'//'} DIRECTORY & SOCIALS
            </span>
            <ul className={`flex flex-col ${gantari.className}`}>
              {SOCIAL_LINKS.map((item, idx) => (
                <FooterLink
                  key={item.title}
                  title={item.title}
                  link={item.link}
                  index={idx}
                  isHovered={hoveredLinkIndex === idx}
                  isAnyHovered={hoveredLinkIndex !== null}
                  onHoverStart={() => setHoveredLinkIndex(idx)}
                  onHoverEnd={() => setHoveredLinkIndex(null)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Bottom Meta & Copyright Bar */}
      <div className={styles['bottom-bar']}>
        <p>© {year} ANOOP RAJU. ALL RIGHTS RESERVED.</p>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-dark-blue" />
          <span>BENGALURU, INDIA {liveTime ? `• ${liveTime} IST` : ''}</span>
        </div>

        <div className="w-fit">
          <MagneticContainer>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex cursor-none items-center gap-2 rounded-full border border-dark-blue/30 px-4 py-2 font-mono text-xs transition-all duration-300 hover:bg-dark-blue hover:text-light-green"
              title="Scroll to top"
            >
              <span>BACK TO TOP</span>
              <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </MagneticContainer>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
