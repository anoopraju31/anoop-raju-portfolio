'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { FiMail, FiClock, FiBookOpen, FiShield, FiArrowRight, FiExternalLink, FiCheckCircle } from 'react-icons/fi';

import type { UserAuth } from '../../../../../types';

interface DashboardStatsProps {
  totalInquiries: number;
  recentMessagesCount: number;
  blogCount: number | null;
  isLoading: boolean;
  user: UserAuth | null;
}

export const DashboardStats: FC<DashboardStatsProps> = ({
  totalInquiries,
  recentMessagesCount,
  blogCount,
  isLoading,
  user,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Contact Inquiries */}
      <Link
        href="/contact-enquire"
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-400">Total Inquiries</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-105">
            <FiMail className="text-lg" />
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {isLoading ? '...' : totalInquiries}
          </span>
          <span className="mt-1 font-sans text-xs text-slate-500">All-time portfolio transmissions</span>
        </div>
        <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600">
          <span>Inspect Inquiries</span>
          <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      {/* Card 2: Recent Messages (Last 48h) */}
      <Link
        href="/contact-enquire"
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-400">Recent (48h)</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600 transition-transform group-hover:scale-105">
            <FiClock className="text-lg" />
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {isLoading ? '...' : recentMessagesCount}
          </span>
          <span className="mt-1 font-sans text-xs text-slate-500">Awaiting review or dispatch</span>
        </div>
        <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-semibold text-amber-600">
          <span>Review Transmissions</span>
          <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      {/* Card 3: Published Blog Articles */}
      <Link
        href="/studio"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-400">Published Blogs</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600 transition-transform group-hover:scale-105">
            <FiBookOpen className="text-lg" />
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {isLoading ? '...' : blogCount !== null ? blogCount : '—'}
          </span>
          <span className="mt-1 font-sans text-xs text-slate-500">Active articles on Sanity CMS</span>
        </div>
        <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-semibold text-sky-600">
          <span>Open Studio</span>
          <FiExternalLink className="text-xs transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>

      {/* Card 4: Administrator Identity */}
      <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-400">Session Profile</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-600">
            <FiShield className="text-lg" />
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex items-center gap-2">
            <span className="truncate text-lg font-bold tracking-tight text-slate-900">
              {user ? `${user.firstName} ${user.lastName}` : 'Administrator'}
            </span>
            <span className="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-white">
              {user?.role || 'ADMIN'}
            </span>
          </div>
          <span className="mt-1 truncate font-mono text-xs text-slate-500">{user?.email || 'admin@anoopraju.xyz'}</span>
        </div>
        <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
          <FiCheckCircle className="text-emerald-500" />
          <span>SESSION: 256-BIT JWT</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
