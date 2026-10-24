'use client';

import { Gantari } from 'next/font/google';
import { useEffect, type FC } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiShield, FiLock, FiCpu } from 'react-icons/fi';

import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAddDispatch';
import { AUTH_IDLE, AUTH_SUCCESS } from '@/constants/auth';
import { fetchUserAuth } from '@/redux/features/userAuth';
import { cn } from '@/utills';
import { Particles } from '@/components/Particles';
import { LoadingDots } from '@/components/LoadingScreen/LoadingDots';
import LoginForm from './LoginForm';

const gantari = Gantari({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

const LoginPage: FC = () => {
  const { user, status } = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (status === AUTH_IDLE && !user) {
      dispatch(fetchUserAuth());
    }
  }, [dispatch, status, user]);

  useEffect(() => {
    if (user && status === AUTH_SUCCESS) {
      router.replace(redirectUrl);
    }
  }, [user, status, router, redirectUrl]);

  // If already authenticated, display quick redirect screen
  if (user && status === AUTH_SUCCESS) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-dark-blue px-4 text-white">
        <Particles className="pointer-events-auto fixed inset-0 z-0 h-screen" color="#4cfc0f" quantity={40} />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-light-green/40 bg-light-green/10 text-light-green shadow-[0_0_30px_rgba(76,252,15,0.3)]">
            <FiShield className="text-2xl" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">Session Active</h2>
          <p className="font-mono text-sm text-white/60">Welcome back, {user.firstName}. Redirecting to dashboard...</p>
          <LoadingDots size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative min-h-screen w-full overflow-hidden bg-dark-blue text-white selection:bg-light-green selection:text-dark-blue',
        gantari.className,
      )}
    >
      {/* High-tech Interactive Particles Background */}
      <Particles
        className="pointer-events-auto fixed inset-0 z-0 h-screen"
        color="#4cfc0f"
        quantity={65}
        staticity={40}
        ease={40}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none fixed -left-40 top-1/4 z-0 h-96 w-96 rounded-full bg-light-green/[0.04] blur-[150px]" />
      <div className="pointer-events-none fixed -right-40 bottom-1/4 z-0 h-96 w-96 rounded-full bg-light-green/[0.05] blur-[160px]" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-green/[0.02] blur-[180px]" />

      {/* Main Wrapper */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-4 py-6 sm:px-8 sm:py-8 md:px-12">
        {/* Top Header Bar */}
        <header className="flex w-full items-center justify-between">
          {/* Back to Portfolio Link */}
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-white/70 backdrop-blur-md transition-all duration-300 hover:border-light-green hover:bg-light-green/10 hover:text-white sm:text-sm"
          >
            <FiArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Portfolio</span>
          </Link>

          {/* System Status Pill */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-light-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-light-green" />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-light-green sm:text-xs">
              SECURE NODE // ONLINE
            </span>
          </div>
        </header>

        {/* Center Card Container */}
        <main className="my-auto flex w-full flex-col items-center justify-center py-10">
          <div className="relative w-full max-w-md sm:max-w-lg">
            {/* Background Glow under Card */}
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-b from-light-green/20 via-transparent to-transparent opacity-50 blur-xl transition-all duration-500" />

            {/* Glassmorphic Auth Card */}
            <div className="relative rounded-3xl border border-white/10 bg-[#0c131f]/80 p-7 shadow-2xl backdrop-blur-2xl transition-all sm:p-10">
              {/* Card Header */}
              <div className="mb-8 flex flex-col items-center text-center">
                {/* Security Badge Monogram */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-light-green/30 bg-light-green/10 text-light-green shadow-[0_0_25px_rgba(76,252,15,0.25)]">
                  <FiLock className="text-2xl" />
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <FiCpu className="text-xs text-light-green" />
                  <span className="font-mono text-xs uppercase tracking-widest text-light-green">
                    SYSTEM CONTROL ACCESS
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Command Center</h1>

                <p className="mt-2.5 max-w-sm text-sm text-white/60 sm:text-base">
                  Authenticate credentials to manage dispatches, inquiries, and portfolio settings.
                </p>
              </div>

              {/* Login Form */}
              <LoginForm />

              {/* Card Footer Details */}
              <div className="mt-8 border-t border-white/10 pt-6 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                    RESTRICTED ADMINISTRATIVE ENCLAVE
                  </p>
                  <p className="font-mono text-[10px] text-white/30">
                    SESSION TOKENS ENCRYPTED WITH JOSE JWT &middot; HTTPONLY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Bar Footer */}
        <footer className="flex flex-col items-center justify-between gap-2 border-t border-white/5 py-4 font-mono text-[11px] text-white/40 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} ANOOP RAJU. ALL RIGHTS RESERVED.</span>
          <span className="text-light-green/60">ANOOP-RAJU-OS &middot; v2.4.0</span>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
