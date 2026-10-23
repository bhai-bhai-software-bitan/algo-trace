"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ArrayCartoonProps {
  name: string;
  items: unknown[];
  pointers: Record<string, number>;
  changed: boolean;
}

function formatCell(item: unknown) {
  if (typeof item === "string") return `"${item}"`;
  return JSON.stringify(item);
}

export default function ArrayCartoon({
  name,
  items,
  pointers,
  changed,
}: ArrayCartoonProps) {
  const pointerEntries = Object.entries(pointers);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-inner">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
          Array • {name}
        </span>
        <span className="font-mono text-xs text-slate-500">
          length: {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-xs italic text-slate-500">Empty array []</p>
      ) : (
        <div className="flex flex-wrap gap-3 pt-1 pb-2">
          {items.map((item, idx) => {
            const activePointers = pointerEntries
              .filter(([, targetIdx]) => targetIdx === idx)
              .map(([pointerName]) => pointerName);
            const isPointed = activePointers.length > 0;

            return (
              <div key={idx} className="flex flex-col items-center">
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    opacity: 1,
                    scale: isPointed ? 1.12 : changed ? 1.05 : 1,
                    y: isPointed ? -4 : 0,
                    borderColor: isPointed ? "#fbbf24" : "#334155",
                    backgroundColor: isPointed
                      ? "rgba(251, 191, 36, 0.15)"
                      : "rgba(30, 41, 59, 0.9)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="flex min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-2xl border-2 px-3 text-base font-bold text-slate-100 shadow-lg"
                >
                  {formatCell(item)}
                </motion.div>

                <span className="mt-1.5 font-mono text-[11px] text-slate-500">
                  [{idx}]
                </span>

                <AnimatePresence mode="popLayout">
                  {isPointed && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.7 }}
                      className="mt-1 rounded-full bg-amber-400 px-2.5 py-0.5 font-mono text-xs font-black text-slate-950 shadow-md shadow-amber-500/20"
                    >
                      ↑ {activePointers.join(", ")}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
