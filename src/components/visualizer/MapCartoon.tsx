'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface MapCartoonProps {
  name: string;
  data: Record<string, unknown>;
  changed: boolean;
}

export default function MapCartoon({ name, data, changed }: MapCartoonProps) {
  const entries = Object.entries(data);

  return (
    <motion.div
      animate={{
        borderColor: changed ? 'rgba(16, 185, 129, 0.6)' : 'rgba(30, 41, 59, 1)',
      }}
      className="rounded-2xl border bg-slate-900/60 p-4 shadow-inner"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
          HashMap / Object • {name}
        </span>
        <span className="font-mono text-xs text-slate-500">keys: {entries.length}</span>
      </div>

      <div className="flex min-h-[4.5rem] flex-wrap items-center gap-3 rounded-xl border border-dashed border-slate-800 bg-slate-950/50 p-3">
        {entries.length === 0 ? (
          <span className="text-xs text-slate-500 italic">Empty Map {'{ }'}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            {entries.map(([key, val]) => (
              <motion.div
                key={key}
                layout
                initial={{ scale: 0.5, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-2 shadow-md"
              >
                <span className="font-mono text-sm font-bold text-emerald-300">
                  {key === '' ? '""' : key}
                </span>
                <span className="text-xs text-slate-400">→</span>
                {Array.isArray(val) ? (
                  <div className="flex flex-wrap gap-1">
                    {val.map((item, index) => (
                      <span
                        key={`${key}-${index}`}
                        className="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-xs font-semibold text-amber-300"
                      >
                        {JSON.stringify(item)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="rounded-md bg-slate-900 px-2.5 py-0.5 font-mono text-sm font-bold text-amber-300">
                    {JSON.stringify(val)}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
