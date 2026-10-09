'use client';

import { useState, type FC, type ReactNode } from 'react';
import { toast } from 'sonner';
import { FiCopy, FiCheck, FiArrowUpRight } from 'react-icons/fi';

type Props = {
  id?: string;
  label: string;
  content: string;
  href?: string;
  icon?: ReactNode;
  copyable?: boolean;
};

const ContactWrapper: FC<Props> = ({ id, label, content, href, icon, copyable }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const contentNode = (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4 sm:gap-5">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-light-green transition-colors group-hover:border-light-green/40 group-hover:bg-light-green/10 sm:h-12 sm:w-12 sm:text-xl">
            {icon}
          </div>
        )}
        <div>
          <span className="mb-0.5 block font-mono text-xs uppercase tracking-widest text-white/40">{label}</span>
          <p className="text-base font-medium text-white transition-colors group-hover:text-light-green sm:text-lg">
            {content}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            title={`Copy ${label}`}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-light-green"
          >
            {copied ? <FiCheck className="text-light-green" /> : <FiCopy />}
          </button>
        )}

        {href && (
          <span className="p-2 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-light-green">
            <FiArrowUpRight className="text-lg" />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      id={id}
      className="group w-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md transition-all duration-300 hover:border-light-green/30 hover:bg-white/[0.04] sm:p-5"
    >
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="block w-full"
        >
          {contentNode}
        </a>
      ) : (
        contentNode
      )}
    </div>
  );
};

export default ContactWrapper;
