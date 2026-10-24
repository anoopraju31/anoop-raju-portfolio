import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/utills';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  form?: string;
  label?: string;
  error?: string;
};

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ form, label, id, className, error, ...rest }, ref) => {
    const displayLabel = label || form;

    return (
      <div className="group relative z-0 w-full">
        <input
          ref={ref}
          id={id}
          placeholder=" "
          className={cn(
            'peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-3 text-base text-white transition-colors duration-300 focus:outline-none focus:ring-0 sm:text-lg',
            error
              ? 'border-red-500/80 focus:border-red-400'
              : 'border-white/20 focus:border-light-green',
            className || '',
          )}
          {...rest}
        />
        {displayLabel && (
          <label
            htmlFor={id}
            className={cn(
              'pointer-events-none absolute top-3.5 origin-[0] -translate-y-6 scale-75 transform font-mono text-sm uppercase tracking-wider duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 sm:text-base',
              error ? 'text-red-400 peer-focus:text-red-400' : 'text-white/50 peer-focus:text-light-green',
            )}
          >
            {displayLabel}
          </label>
        )}
        {error && (
          <p className="mt-1.5 font-mono text-xs tracking-wide text-red-400 transition-opacity duration-200">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
