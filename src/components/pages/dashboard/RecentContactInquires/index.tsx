'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { FiArrowRight, FiEye, FiInbox } from 'react-icons/fi';

import type { ContactMessageItem } from '../../../../../types';

interface RecentContactInquiresProps {
  messages: ContactMessageItem[];
  totalCount: number;
  isLoading: boolean;
  onSelectMessage: (message: ContactMessageItem) => void;
}

export const RecentContactInquires: FC<RecentContactInquiresProps> = ({
  messages,
  totalCount,
  isLoading,
  onSelectMessage,
}) => {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold tracking-tight text-slate-900">Recent Contact Inquiries</h2>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-600">
            {totalCount}
          </span>
        </div>

        <Link
          href="/contact-enquire"
          className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <span>View All</span>
          <FiArrowRight className="text-xs" />
        </Link>
      </div>

      {/* Table / List Body */}
      <div className="divide-y divide-slate-100">
        {isLoading ? (
          <div className="divide-y divide-slate-100 p-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex animate-pulse items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-slate-100" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-28 rounded bg-slate-200" />
                    <div className="h-3 w-40 rounded bg-slate-100" />
                  </div>
                </div>
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-400">
              <FiInbox className="text-xl" />
            </div>
            <p className="font-sans text-sm font-semibold text-slate-700">No inquiries recorded yet</p>
            <p className="mt-1 font-sans text-xs text-slate-400">
              Transmissions from the public portfolio contact form will display here.
            </p>
          </div>
        ) : (
          messages.map((item) => {
            const dateObj = new Date(item.createdAt);
            const relativeTime = !isNaN(dateObj.getTime()) ? formatDistanceToNow(dateObj, { addSuffix: true }) : '';

            return (
              <div
                key={item.id}
                onClick={() => onSelectMessage(item)}
                className="group flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-slate-50/80 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-3.5 pr-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 bg-slate-50 font-mono text-xs font-bold text-slate-600 group-hover:border-slate-300">
                    {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate font-sans text-sm font-semibold text-slate-900 transition-colors group-hover:text-emerald-700">
                      {item.name}
                    </span>
                    <span className="truncate font-sans text-xs text-slate-500">{item.subject}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  {relativeTime && <span className="font-mono text-xs text-slate-400">{relativeTime}</span>}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMessage(item);
                    }}
                    title="View details"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-800"
                  >
                    <FiEye className="text-sm" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentContactInquires;
