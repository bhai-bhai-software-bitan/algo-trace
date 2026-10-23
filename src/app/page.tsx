'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Code2, Layers, PlayCircle, Search } from 'lucide-react';
import { PROBLEMS } from '@/data/problems';
import ProblemMeta from '@/components/ProblemMeta';
import type { Difficulty } from '@/types/problem';

function difficultyClass(difficulty: Difficulty) {
  if (difficulty === 'Easy') return 'bg-emerald-500/15 text-emerald-400';
  if (difficulty === 'Medium') return 'bg-amber-500/15 text-amber-400';
  return 'bg-rose-500/15 text-rose-400';
}

export default function HomePage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PROBLEMS.filter(
      (problem) =>
        problem.title.toLowerCase().includes(query) ||
        problem.category.toLowerCase().includes(query) ||
        (problem.number != null && String(problem.number).includes(query)) ||
        (problem.context ?? '').toLowerCase().includes(query) ||
        (problem.companies ?? []).some((company) => company.toLowerCase().includes(query)) ||
        (problem.algorithms ?? []).some((algorithm) => algorithm.toLowerCase().includes(query)) ||
        (problem.leetcode != null &&
          (String(problem.leetcode.number).includes(query) ||
            problem.leetcode.title.toLowerCase().includes(query) ||
            (problem.leetcode.neetcode ?? '').toLowerCase().includes(query))),
    );
  }, [search]);

  const categories = Array.from(new Set(filtered.map((problem) => problem.category)));
  const neetcodeCount = PROBLEMS.filter((problem) => problem.number != null).length;
  const extraCount = PROBLEMS.length - neetcodeCount;

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-8 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/15 px-3.5 py-1 text-xs font-bold text-indigo-300">
              <Code2 className="h-4 w-4" />
              AlgoTrace • NeetCode 150 Static Visualizer
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Visualize Your Code Step-by-Step
            </h1>
            <p className="max-w-2xl text-sm text-slate-400">
              Every time you solve a NeetCode 150 / Blind 75 problem, add your solution and test cases
              to{' '}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-indigo-300">
                src/data/problems/
              </code>
              . Click any problem below to watch the AST engine animate its execution line-by-line.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 px-6 py-4">
            <div>
              <div className="text-3xl font-black text-emerald-400">{neetcodeCount} / 150</div>
              <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Problems Visualized
              </div>
              {extraCount > 0 && (
                <div className="mt-2 text-xs font-semibold text-indigo-300">{extraCount} in Extras I</div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search title, company, or LeetCode (Agoda, Grab, 739, Two Sum)..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search problems"
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 py-3.5 pr-4 pl-11 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-slate-400">No problems match that search.</p>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-extrabold tracking-wider text-indigo-400 uppercase">
                  <Layers className="h-4 w-4" />
                  {category}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filtered
                    .filter((problem) => problem.category === category)
                    .map((problem) => (
                      <Link
                        key={problem.slug}
                        href={`/problems/${problem.slug}`}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:-translate-y-1 hover:border-indigo-500/60 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/10"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-slate-400">
                              {problem.number != null ? `#${problem.number}` : 'Extra'}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${difficultyClass(problem.difficulty)}`}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300">
                            {problem.title}
                          </h2>
                          <p className="line-clamp-2 text-xs text-slate-400">{problem.description}</p>
                          <ProblemMeta problem={problem} />
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs font-semibold text-indigo-400">
                          <span>{problem.testCases.length} Clickable Test Cases</span>
                          <span className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
                            Visualize <PlayCircle className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
