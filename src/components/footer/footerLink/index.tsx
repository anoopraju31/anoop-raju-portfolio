'use client';

import { cn } from '@/utills';
import { FiArrowUpRight } from 'react-icons/fi';

type FooterLinkProps = {
  title: string;
  link: string;
  index?: number;
  isHovered?: boolean;
  isAnyHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

const FooterLink = ({ title, link, index, isHovered, isAnyHovered, onHoverStart, onHoverEnd }: FooterLinkProps) => {
  const formattedIndex = index !== undefined ? (index + 1).toString().padStart(2, '0') : '';

  return (
    <li className="group relative">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className={cn(
          'flex cursor-none select-none items-center justify-between py-3 transition-all duration-300 sm:py-4',
          isAnyHovered && !isHovered ? 'opacity-35' : 'opacity-100',
        )}
      >
        <div className="flex transform items-baseline gap-3 transition-transform duration-300 ease-out group-hover:translate-x-2 sm:gap-6 sm:group-hover:translate-x-4">
          {formattedIndex && (
            <span className="font-mono text-xs font-semibold text-dark-blue/50 transition-colors group-hover:text-dark-blue sm:text-sm">
              {formattedIndex}
            </span>
          )}
          <span className="text-xl font-bold uppercase tracking-tight text-dark-blue sm:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </span>
        </div>

        <div className="flex h-9 w-9 transform items-center justify-center rounded-full border border-dark-blue/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-dark-blue group-hover:bg-dark-blue group-hover:text-light-green sm:h-12 sm:w-12">
          <FiArrowUpRight className="text-lg transition-transform duration-300 sm:text-2xl" />
        </div>
      </a>
      <div className="h-[1.5px] bg-dark-blue/25 transition-colors duration-300 group-hover:bg-dark-blue" />
    </li>
  );
};

export default FooterLink;
