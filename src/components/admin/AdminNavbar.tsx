'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiGrid, FiMail, FiExternalLink, FiLogOut, FiMenu, FiX, FiShield, FiGlobe } from 'react-icons/fi';
import { toast } from 'sonner';

import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAddDispatch';
import { fetchUserLogout, setLogout } from '@/redux/features/userAuth';
import { cn } from '@/utills';

const AdminNavbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userAuth);

  const handleLogout = async () => {
    try {
      await dispatch(fetchUserLogout()).unwrap();
      dispatch(setLogout());
      toast.success('Signed Out', { description: 'Your administrative session has ended.' });
      router.push('/login');
    } catch {
      // Fallback: manually force redirect
      dispatch(setLogout());
      router.push('/login');
    }
  };

  const navLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: FiGrid,
      active: pathname === '/dashboard',
    },
    {
      name: 'Contact Enquiries',
      href: '/contact-enquire',
      icon: FiMail,
      active: pathname === '/contact-enquire',
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[68px] border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform group-hover:scale-105">
              <FiShield className="text-base text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold tracking-tight text-slate-900">ANOOP RAJU</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">CONTROL CENTER</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-3.5 py-2 font-sans text-sm font-medium transition-colors',
                    link.active
                      ? 'bg-slate-100 font-semibold text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                  )}
                >
                  <Icon className={cn('text-base', link.active ? 'text-slate-900' : 'text-slate-400')} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: External Links + User Profile + Logout */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Quick shortcuts */}
          <div className="flex items-center gap-2 border-r border-slate-200 pr-3">
            <Link
              href="/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-sans text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <span>Sanity Studio</span>
              <FiExternalLink className="text-xs text-slate-400" />
            </Link>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-sans text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <FiGlobe className="text-xs text-slate-400" />
              <span>View Site</span>
            </Link>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-mono text-xs font-bold text-emerald-800">
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="hidden flex-col lg:flex">
              <span className="font-sans text-xs font-semibold text-slate-800">
                {user ? `${user.firstName} ${user.lastName}` : 'Administrator'}
              </span>
              <span className="font-mono text-[10px] text-slate-400">{user?.email || 'admin@anoopraju.xyz'}</span>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            title="End Session"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-sans text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut className="text-xs" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium',
                    link.active
                      ? 'bg-slate-100 font-semibold text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                  )}
                >
                  <Icon className={cn('text-base', link.active ? 'text-slate-900' : 'text-slate-400')} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="my-2 border-t border-slate-100 pt-2">
              <Link
                href="/studio"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3.5 py-2 font-sans text-sm text-slate-600 hover:bg-slate-50"
              >
                <span>Sanity Studio</span>
                <FiExternalLink className="text-xs text-slate-400" />
              </Link>
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3.5 py-2 font-sans text-sm text-slate-600 hover:bg-slate-50"
              >
                <span>View Public Site</span>
                <FiExternalLink className="text-xs text-slate-400" />
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="mb-3 flex items-center gap-2 px-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 font-mono text-xs font-bold text-emerald-800">
                  {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-slate-800">
                    {user ? `${user.firstName} ${user.lastName}` : 'Administrator'}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{user?.email || 'admin@anoopraju.xyz'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 font-sans text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                <FiLogOut className="text-base" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;
