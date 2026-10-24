'use client';

import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import axios from 'axios';
import { format, formatDistanceToNow } from 'date-fns';
import {
  FiInbox,
  FiMail,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiX,
  FiPhone,
} from 'react-icons/fi';
import { toast } from 'sonner';

import type { ContactMessageItem } from '../../../../types';
import MessageDetailModal from './MessageDetailModal';
import { cn } from '@/utills';

const PAGE_SIZE = 10;

const ContactEnquirePage: FC = () => {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const fetchContactEnquiries = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setErrorMessage(null);

    try {
      // Primary endpoint /v1/users/contact-enquire with fallback to /v1/users/contact-response
      let response;
      try {
        response = await axios.get<ContactMessageItem[] | { data: ContactMessageItem[] }>(
          '/v1/users/contact-enquire',
          { withCredentials: true }
        );
      } catch {
        response = await axios.get<ContactMessageItem[] | { data: ContactMessageItem[] }>(
          '/v1/users/contact-response',
          { withCredentials: true }
        );
      }

      const items: ContactMessageItem[] = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

      setMessages(items);
      if (isManualRefresh) {
        toast.success('Inquiries Updated', {
          description: `Loaded ${items.length} total contact inquiries.`,
        });
      }
    } catch (err: unknown) {
      console.error('Failed to fetch contact inquiries:', err);
      const msg = 'Unable to connect to database or retrieve contact inquiries.';
      setErrorMessage(msg);
      toast.error('Data Fetch Error', { description: msg });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchContactEnquiries();
  }, [fetchContactEnquiries]);

  // Real-time Search and Filter
  const filteredMessages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = messages;

    if (q) {
      result = result.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(q);
        const emailMatch = item.email.toLowerCase().includes(q);
        const subjectMatch = item.subject.toLowerCase().includes(q);
        const phoneMatch = item.phone ? item.phone.toLowerCase().includes(q) : false;
        const messageMatch = item.message ? item.message.toLowerCase().includes(q) : false;

        return nameMatch || emailMatch || subjectMatch || phoneMatch || messageMatch;
      });
    }

    return [...result].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
  }, [messages, searchQuery, sortOrder]);

  // Pagination calculation
  const totalItems = filteredMessages.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const paginatedMessages = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredMessages.slice(start, start + PAGE_SIZE);
  }, [filteredMessages, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1); // Reset to first page upon searching
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Contact Enquiries
            </h1>
            <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 font-mono text-xs font-semibold text-white">
              {messages.length}
            </span>
          </div>
          <p className="font-sans text-sm text-slate-500">
            Review, inspect, search, and respond to incoming portfolio transmissions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-mono text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900"
            title="Toggle sort direction"
          >
            Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </button>

          <button
            onClick={() => fetchContactEnquiries(true)}
            disabled={isRefreshing || isLoading}
            className={cn(
              'flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900',
              (isRefreshing || isLoading) && 'cursor-wait opacity-60'
            )}
          >
            <FiRefreshCw className={cn('text-xs', (isRefreshing || isLoading) && 'animate-spin text-emerald-600')} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <FiSearch className="text-base" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by sender name, email, subject, or message keyword..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 font-sans text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700"
              title="Clear search"
            >
              <FiX className="text-sm" />
            </button>
          )}
        </div>

        {/* Search Stats Chip */}
        <div className="flex items-center justify-between sm:justify-end gap-3 px-1">
          <span className="font-mono text-xs text-slate-400">
            {searchQuery ? `Found ${totalItems} match${totalItems === 1 ? '' : 'es'}` : `${totalItems} total`}
          </span>
        </div>
      </div>

      {/* Main Table / Card Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Server Error Warning */}
        {errorMessage && (
          <div className="flex items-center justify-between border-b border-red-100 bg-red-50/60 p-4 text-sm text-red-700">
            <div className="flex items-center gap-2.5">
              <FiAlertCircle className="text-lg text-red-500" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => fetchContactEnquiries()}
              className="rounded-lg bg-red-100 px-3 py-1 font-sans text-xs font-semibold text-red-800 hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="divide-y divide-slate-100 p-4">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex animate-pulse items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="h-3 w-48 rounded bg-slate-100" />
                  </div>
                </div>
                <div className="hidden flex-col gap-2 md:flex">
                  <div className="h-4 w-40 rounded bg-slate-200" />
                  <div className="h-3 w-56 rounded bg-slate-100" />
                </div>
                <div className="h-4 w-24 rounded bg-slate-100" />
                <div className="h-8 w-16 rounded-lg bg-slate-100" />
              </div>
            ))}
          </div>
        ) : filteredMessages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 border border-slate-100">
              <FiInbox className="text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {searchQuery ? 'No matching inquiries found' : 'No inquiries recorded yet'}
            </h3>
            <p className="mt-1.5 max-w-sm font-sans text-sm text-slate-500">
              {searchQuery
                ? 'Try tweaking your search term or clearing the filter to see all submissions.'
                : 'When visitors submit messages through your portfolio contact form, they will appear here.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2 font-sans text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Clear Search Filter
              </button>
            )}
          </div>
        ) : (
          /* Desktop & Tablet Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-3.5">
                    Sender
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Subject & Preview
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Received
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedMessages.map((item) => {
                  const dateObj = new Date(item.createdAt);
                  const formattedDate = !isNaN(dateObj.getTime())
                    ? format(dateObj, 'MMM dd, yyyy • hh:mm a')
                    : item.createdAt;
                  const relativeTime = !isNaN(dateObj.getTime())
                    ? formatDistanceToNow(dateObj, { addSuffix: true })
                    : '';

                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedMessage(item)}
                      className="group cursor-pointer transition-colors hover:bg-slate-50/80"
                    >
                      {/* Sender Column */}
                      <td className="px-6 py-4 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {item.name}
                          </span>
                          <span className="font-mono text-xs text-slate-500">
                            {item.email}
                          </span>
                          {item.phone && (
                            <span className="mt-0.5 inline-flex w-fit items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                              <FiPhone className="text-[9px]" />
                              {item.phone}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Subject & Preview Column */}
                      <td className="px-6 py-4 align-top max-w-md">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-slate-800 line-clamp-1">
                            {item.subject}
                          </span>
                          <p className="font-sans text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {item.message || (
                              <span className="italic text-slate-400">
                                (No additional message text)
                              </span>
                            )}
                          </p>
                        </div>
                      </td>

                      {/* Date Column */}
                      <td className="px-6 py-4 align-top whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-sans text-xs font-medium text-slate-700">
                            {formattedDate}
                          </span>
                          {relativeTime && (
                            <span className="font-mono text-[11px] text-slate-400">
                              {relativeTime}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action Column */}
                      <td className="px-6 py-4 align-middle text-right whitespace-nowrap">
                        <div
                          className="flex items-center justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedMessage(item)}
                            title="Inspect details"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-sans text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900"
                          >
                            <FiEye className="text-xs text-slate-500" />
                            <span>View</span>
                          </button>

                          <a
                            href={`mailto:${item.email}?subject=${encodeURIComponent(
                              `Re: ${item.subject}`
                            )}`}
                            title="Quick reply"
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1.5 font-sans text-xs font-medium text-white shadow-sm hover:bg-slate-800"
                          >
                            <FiMail className="text-xs text-emerald-400" />
                            <span>Reply</span>
                            <FiArrowUpRight className="text-[10px] opacity-70" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {filteredMessages.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-3.5 sm:flex-row">
            <span className="font-mono text-xs text-slate-500">
              Showing {(currentPage - 1) * PAGE_SIZE + 1} to{' '}
              {Math.min(currentPage * PAGE_SIZE, totalItems)} of {totalItems} entries
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={cn(
                  'flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-sans text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50',
                  currentPage === 1 && 'cursor-not-allowed opacity-40 hover:bg-white'
                )}
              >
                <FiChevronLeft className="text-xs" />
                <span>Prev</span>
              </button>

              <span className="px-3 font-mono text-xs text-slate-600">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={cn(
                  'flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-sans text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50',
                  currentPage === totalPages && 'cursor-not-allowed opacity-40 hover:bg-white'
                )}
              >
                <span>Next</span>
                <FiChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message Inspection Modal */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
};

export default ContactEnquirePage;
