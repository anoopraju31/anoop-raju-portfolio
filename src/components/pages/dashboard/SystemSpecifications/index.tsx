'use client';

import type { FC } from 'react';

export const SystemSpecifications: FC = () => {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">System Specifications</h3>

      <div className="flex flex-col divide-y divide-slate-100 font-mono text-xs">
        <div className="flex justify-between py-2">
          <span className="text-slate-500">Framework</span>
          <span className="font-semibold text-slate-800">Next.js 15 (App Router)</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-slate-500">Database</span>
          <span className="font-semibold text-slate-800">MongoDB Atlas (Prisma)</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-slate-500">Editorial CMS</span>
          <span className="font-semibold text-slate-800">Sanity v3</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-slate-500">Auth Engine</span>
          <span className="font-semibold text-slate-800">Jose JWT / HttpOnly</span>
        </div>
      </div>
    </div>
  );
};

export default SystemSpecifications;
