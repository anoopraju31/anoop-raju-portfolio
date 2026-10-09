import type { FC, TextareaHTMLAttributes } from 'react';

import { cn } from '@/utills';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  form?: string;
  label?: string;
};

const TextareaField: FC<Props> = ({ form, label, id, className, rows = 3, ...rest }) => {
  const displayLabel = label || form;

  return (
    <div className="group relative z-0 w-full">
      <textarea
        id={id}
        placeholder=" "
        rows={rows}
        className={cn(
          'peer block w-full resize-none appearance-none border-0 border-b-2 border-white/20 bg-transparent px-0 py-3 text-base text-white transition-colors duration-300 focus:border-light-green focus:outline-none focus:ring-0 sm:text-lg',
          className || '',
        )}
        {...rest}
      />
      {displayLabel && (
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-3.5 origin-[0] -translate-y-6 scale-75 transform font-mono text-sm uppercase tracking-wider text-white/50 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-light-green sm:text-base"
        >
          {displayLabel}
        </label>
      )}
    </div>
  );
};

export default TextareaField;
