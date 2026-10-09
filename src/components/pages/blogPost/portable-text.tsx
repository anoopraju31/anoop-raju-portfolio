'use client';

/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import { useEffect } from 'react';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';
import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity';
import Prism from 'prismjs';

import { cn } from '@/utills';

import 'prismjs/themes/prism-tomorrow.css';

interface TableRow {
  _key: string;
  cells: string[];
}

interface TableValue {
  rows: TableRow[];
}

export default function CustomPortableText({ className, value }: { className?: string; value: PortableTextBlock[] }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  const components: PortableTextComponents = {
    list: {
      bullet: ({ children }) => {
        return <ul className="marker:text-grey-950 text-grey-950 list-inside list-disc px-0 pe-0 ps-0">{children}</ul>;
      },
      number: ({ children }) => {
        return (
          <ol className="marker:text-grey-950 text-grey-950 list-inside list-decimal px-0 pe-0 ps-0">{children}</ol>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1
          // @ts-expect-error - children array might be empty or props may be null
          id={`${children[0].props?.text
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            // @ts-expect-error - children array might be empty or props may be null
            .toLowerCase()}-${children[0].key}`}
          className="leading-120 text-grey-950 lg:text-40 mb-5 mt-5 w-full text-[28px] font-semibold sm:mb-6 sm:mt-6 sm:text-[32px] md:mb-7 md:mt-7 md:text-[36px] lg:mb-8 lg:mt-8"
        >
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2
          // @ts-expect-error - children array might be empty or props may be null
          id={`${children[0].props?.text
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            // @ts-expect-error - children array might be empty or props may be null
            .toLowerCase()}-${children[0].key}`}
          className="leading-120 text-grey-950 mb-4 mt-4 w-full text-[24px] font-semibold sm:mb-5 sm:mt-5 sm:text-[28px] md:mb-6 md:mt-6 md:text-[32px] lg:mb-7 lg:mt-7 lg:text-[35px]"
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          // @ts-expect-error - children array might be empty or props may be null
          id={`${children[0].props?.text
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            // @ts-expect-error - children array might be empty or props may be null
            .toLowerCase()}-${children[0].key}`}
          className="leading-120 text-grey-950 mb-4 mt-4 w-full text-[22px] font-semibold sm:mb-5 sm:mt-5 sm:text-[26px] md:mb-6 md:mt-6 md:text-[30px] lg:mb-7 lg:mt-7 lg:text-[32px]"
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4
          // @ts-expect-error - children array might be empty or props may be null
          id={`${children[0].props?.text
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            // @ts-expect-error - children array might be empty or props may be null
            .toLowerCase()}-${children[0].key}`}
          className="leading-120 text-grey-950 md:-text-[28px] mb-3 mt-3 w-full text-[20px] font-semibold sm:mb-4 sm:mt-4 sm:text-[24px] md:mb-5 md:mt-5 lg:mb-6 lg:mt-6 lg:text-[30px]"
        >
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5
          // @ts-expect-error - children array might be empty or props may be null
          id={`${children[0].props?.text
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            // @ts-expect-error - children array might be empty or props may be null
            .toLowerCase()}-${children[0].key}`}
          className="text-grey-950 mb-3 mt-3 w-full text-lg font-semibold sm:mb-4 sm:mt-4 sm:text-[22px] md:mb-5 md:mt-5 md:text-[26px] lg:mb-6 lg:mt-6 lg:text-[28px]"
        >
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6
          // @ts-expect-error - children array might be empty or props may be null
          id={`${children[0].props?.text
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            // @ts-expect-error - children array might be empty or props may be null
            .toLowerCase()}-${children[0].key}`}
          className="text-grey-950 md:text[24px] mb-2 mt-2 w-full text-base font-semibold sm:mb-3 sm:mt-3 sm:text-xl md:mb-4 md:mt-4 lg:mb-5 lg:mt-5 lg:text-[26px]"
        >
          {children}
        </h6>
      ),
      normal: ({ children }) => (
        <p className="text-grey-950 mb-2 mt-2 text-body font-light sm:mb-3 sm:mt-3 md:mb-4 md:mt-4 lg:mb-5 lg:mt-5">
          {children}
        </p>
      ),
    },
    types: {
      image: ({ value }) => {
        return (
          <div className="relative w-full">
            <figure>
              <Image
                className={cn('w-full object-contain')}
                alt={value?.alt || ''}
                src={urlForImage(value)?.url() as string}
                priority={true}
                quality={100}
                width={800}
                height={450}
                // fill
              />
              {value.caption && <figcaption className="text-center text-sm font-light">{value.caption}</figcaption>}
            </figure>
          </div>
        );
      },
      code: ({ value }) => {
        const lang = value.language || 'javascript';
        return (
          <pre className={cn('language-', lang, 'my-4 overflow-auto rounded-md !bg-gray-900 p-4 text-white')}>
            <code className={cn('language-', lang)}>{value.code}</code>
          </pre>
        );
      },
      table: ({ value }: { value: TableValue }) => {
        if (!value || !value.rows) return null;

        return (
          <table className="border-grey-950 w-full border-collapse border">
            <tbody>
              {value.rows.map((row, idx) => (
                <tr key={row._key}>
                  {row.cells.map((cell, index) => (
                    <td
                      key={index}
                      className={cn(
                        'border-grey-950 text-grey-950 border p-2',
                        idx === 0 ? 'font-semibold' : 'font-light',
                        'text-base',
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      },
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      span: ({ children }) => <span className="text-grey-950">{children}</span>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => {
        return (
          <a
            href={value?.href}
            rel="noreferrer noopener"
            className="text-infinity-blue w-full font-medium no-underline hover:underline"
          >
            {children}
          </a>
        );
      },
    },
    listItem: {
      bullet: ({ children }) => <li className="text-grey-950 pe-0 pl-0 ps-0 font-light"> {children}</li>,
      number: ({ children }) => <li className="text-grey-950 !pe-0 !ps-0 pl-0 font-light"> {children}</li>,
      checkmarks: ({ children }) => <li className="text-grey-950 !pe-0 !ps-0 pl-0 font-light"> {children}</li>,
    },
  };

  return (
    <div className={['prose', className].filter(Boolean).join(' ')} style={{ width: '100%' }}>
      <PortableText components={components} value={value} />
    </div>
  );
}
