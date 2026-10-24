'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { FiInbox, FiBookOpen, FiGlobe, FiArrowRight, FiExternalLink } from 'react-icons/fi';

export const QuickOperations: FC = () => {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-slate-800">
        Quick Operations
      </h3>

      <div className="flex flex-col gap-2.5">
        {/* Shortcut 1: Manage Inquiries */}
        <Link
          href="/contact-enquire"
          className="group flex items-center justify-between rounded-xl border border-slate-200/70 p-3.5 transition-all hover:border-slate-300 hover:bg-slate-50/70"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <FiInbox className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold text-slate-800">
                Contact Enquiries
              </span>
              <span className="font-sans text-[11px] text-slate-400">
                Search, inspect, and reply
              </span>
            </div>
          </div>
          <FiArrowRight className="text-xs text-slate-400 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Shortcut 2: Sanity CMS Studio */}
        <Link
          href="/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-slate-200/70 p-3.5 transition-all hover:border-slate-300 hover:bg-slate-50/70"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
              <FiBookOpen className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold text-slate-800">
                Sanity Studio
              </span>
              <span className="font-sans text-[11px] text-slate-400">
                Draft & publish blog content
              </span>
            </div>
          </div>
          <FiExternalLink className="text-xs text-slate-400 transition-transform group-hover:scale-110" />
        </Link>

        {/* Shortcut 3: Public Portfolio */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-slate-200/70 p-3.5 transition-all hover:border-slate-300 hover:bg-slate-50/70"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
              <FiGlobe className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold text-slate-800">
                Public Portfolio
              </span>
              <span className="font-sans text-[11px] text-slate-400">
                Open live visitor experience
              </span>
            </div>
          </div>
          <FiExternalLink className="text-xs text-slate-400 transition-transform group-hover:scale-110" />
        </Link>
      </div>
    </div>
  );
};

export default QuickOperations;
