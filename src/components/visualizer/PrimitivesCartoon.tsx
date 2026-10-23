'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PrimitivesCartoonProps {
  primitives: Record<string, unknown>;
  changedVars: string[];
  returnValue: unknown;
  expectedValue: unknown;
}

function StringTiles({ value }: { value: string }) {
  if (value.length === 0) {
    return (
      <span className="rounded-md border border-slate-700 bg-slate-950 px-2 py-0.5 font-mono text-sm font-bold text-slate-500">
        &quot;&quot;
      </span>
    );
  }

  return (
    <span className="flex flex-wrap gap-1">
      {value.split('').map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="rounded-md border border-slate-700 bg-slate-950 px-1.5 py-0.5 font-mono text-sm font-bold text-sky-300"
        >
          {character}
        </span>
      ))}
    </span>
  );
}

export default function PrimitivesCartoon({
  primitives,
  changedVars,
  returnValue,
  expectedValue,
}: PrimitivesCartoonProps) {
  const entries = Object.entries(primitives);
  const matches = JSON.stringify(returnValue) === JSON.stringify(expectedValue);

  return (
    <div className="space-y-4">
      {entries.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {entries.map(([name, val]) => {
            const isChanged = changedVars.includes(name);
            return (
              <motion.div
                key={name}
                layout
                animate={{
                  scale: isChanged ? 1.08 : 1,
                  borderColor: isChanged ? '#38bdf8' : '#1e293b',
                }}
                className="flex flex-wrap items-center gap-2.5 rounded-xl border-2 bg-slate-900 px-4 py-2.5 shadow"
              >
                <span className="font-mono text-xs font-semibold text-slate-400">{name}:</span>
                {typeof val === 'string' ? (
                  <StringTiles value={val} />
                ) : (
                  <span className="font-mono text-base font-extrabold text-sky-300">
                    {JSON.stringify(val)}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {returnValue !== undefined && (
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 p-4 shadow-lg ${
            matches
              ? 'border-emerald-400 bg-emerald-500/15 shadow-emerald-500/10'
              : 'border-rose-400 bg-rose-500/15 shadow-rose-500/10'
          }`}
        >
          <div className="flex items-center gap-3">
            {matches ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            ) : (
              <XCircle className="h-6 w-6 text-rose-400" />
            )}
            <div>
              <div
                className={`text-xs font-bold tracking-wider uppercase ${
                  matches ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {matches ? 'Function Returned Final Output' : 'Output does not match expected'}
              </div>
              <div className="font-mono text-lg font-black break-all text-white">
                {JSON.stringify(returnValue)}
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-slate-950/70 px-3.5 py-2 font-mono text-xs break-all text-slate-300">
            Expected:{' '}
            <span className={`font-bold ${matches ? 'text-emerald-300' : 'text-rose-300'}`}>
              {JSON.stringify(expectedValue)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
