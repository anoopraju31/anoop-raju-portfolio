'use client';

import { useEffect, useState, type FC } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { FiX, FiMail, FiPhone, FiCalendar, FiUser, FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi';
import { toast } from 'sonner';

import type { ContactMessageItem } from '../../../../types';

interface MessageDetailModalProps {
  message: ContactMessageItem | null;
  onClose: () => void;
}

const MessageDetailModal: FC<MessageDetailModalProps> = ({ message, onClose }) => {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!message) return null;

  const copyToClipboard = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Copied to clipboard', { description: text });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const parsedDate = new Date(message.createdAt);
  const formattedFullDate = !isNaN(parsedDate.getTime())
    ? format(parsedDate, 'MMMM dd, yyyy • hh:mm a')
    : message.createdAt;
  const relativeDate = !isNaN(parsedDate.getTime()) ? formatDistanceToNow(parsedDate, { addSuffix: true }) : '';

  const replyMailto = `mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-subject-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-slate-200/80 bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6 sm:p-8">
          <div className="flex flex-col gap-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Inquiry Dispatch
              </span>
              {relativeDate && <span className="font-mono text-xs text-slate-400">{relativeDate}</span>}
            </div>
            <h2 id="modal-subject-title" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {message.subject}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close message view"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Sender Coordinates Card */}
          <div className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 sm:grid-cols-2">
            {/* Sender Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 bg-white text-slate-700 shadow-sm">
                <FiUser className="text-lg text-slate-600" />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Sender Name</span>
                <span className="truncate font-sans text-sm font-semibold text-slate-800">{message.name}</span>
              </div>
            </div>

            {/* Date Time */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 bg-white text-slate-700 shadow-sm">
                <FiCalendar className="text-lg text-slate-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Received At</span>
                <span className="font-sans text-xs font-medium text-slate-700">{formattedFullDate}</span>
              </div>
            </div>

            {/* Email Contact */}
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/60 bg-white p-2.5 shadow-sm">
              <div className="flex items-center gap-2.5 truncate">
                <FiMail className="shrink-0 text-slate-400" />
                <a
                  href={`mailto:${message.email}`}
                  className="truncate font-sans text-xs font-medium text-slate-800 hover:text-emerald-600 hover:underline"
                >
                  {message.email}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(message.email, 'email')}
                title="Copy Email"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                {copiedField === 'email' ? (
                  <FiCheck className="text-xs text-emerald-600" />
                ) : (
                  <FiCopy className="text-xs" />
                )}
              </button>
            </div>

            {/* Phone Contact */}
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/60 bg-white p-2.5 shadow-sm">
              <div className="flex items-center gap-2.5 truncate">
                <FiPhone className="shrink-0 text-slate-400" />
                {message.phone ? (
                  <a
                    href={`tel:${message.phone}`}
                    className="truncate font-mono text-xs font-medium text-slate-800 hover:text-emerald-600 hover:underline"
                  >
                    {message.phone}
                  </a>
                ) : (
                  <span className="font-mono text-xs italic text-slate-400">No phone provided</span>
                )}
              </div>
              {message.phone && (
                <button
                  onClick={() => copyToClipboard(message.phone!, 'phone')}
                  title="Copy Phone"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  {copiedField === 'phone' ? (
                    <FiCheck className="text-xs text-emerald-600" />
                  ) : (
                    <FiCopy className="text-xs" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Full Message Content */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Transmission Content</span>
            <div className="min-h-[140px] rounded-2xl border border-slate-200/80 bg-white p-5 font-sans text-sm leading-relaxed text-slate-800 shadow-inner sm:text-base">
              {message.message ? (
                <p className="whitespace-pre-wrap">{message.message}</p>
              ) : (
                <p className="font-mono text-sm italic text-slate-400">
                  (No additional message content provided with this inquiry)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between rounded-b-3xl border-t border-slate-100 bg-slate-50/50 px-6 py-4 sm:px-8">
          <span className="font-mono text-[11px] text-slate-400">RECORD ID: {message.id}</span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-sans text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              Close
            </button>
            <a
              href={replyMailto}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-slate-800"
            >
              <FiMail className="text-sm text-emerald-400" />
              <span>Reply via Email</span>
              <FiExternalLink className="text-xs opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailModal;
