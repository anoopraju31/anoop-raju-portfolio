'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { FiRefreshCw, FiGlobe, FiExternalLink } from 'react-icons/fi';

import { cn } from '@/utills';

interface DashboardHeaderProps {
  userName?: string;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  userName = 'Anoop',
  isLoading,
  isRefreshing,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {userName}
          </h1>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
        </div>
        <p className="font-sans text-sm text-slate-500">
          System operational &bull; Authenticated administrative session with full privileges.
        </p>
      </div>

      {/* Header Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          disabled={isRefreshing || isLoading}
          className={cn(
            'flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900',
            (isRefreshing || isLoading) && 'cursor-wait opacity-60'
          )}
        >
          <FiRefreshCw
            className={cn(
              'text-xs',
              (isRefreshing || isLoading) && 'animate-spin text-emerald-600'
            )}
          />
          <span>Sync Telemetry</span>
        </button>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:scale-[1.02]"
        >
          <FiGlobe className="text-xs text-emerald-400" />
          <span>Live Portfolio</span>
          <FiExternalLink className="text-[10px] opacity-70" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
