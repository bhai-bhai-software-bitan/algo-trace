import type { Company, ProblemEntry } from '@/types/problem';

const companyClass: Record<Company, string> = {
  Agoda: 'bg-rose-500/15 text-rose-300',
  Grab: 'bg-emerald-500/15 text-emerald-300',
};

export function leetCodeLabel(problem: ProblemEntry) {
  if (!problem.leetcode) return '';
  const neetcode = problem.leetcode.neetcode ? ` · NeetCode ${problem.leetcode.neetcode}` : '';
  const number = problem.leetcode.number != null ? `LeetCode ${problem.leetcode.number} ` : 'LeetCode premium · ';
  return `${number}${problem.leetcode.title}${neetcode}`;
}

export default function ProblemMeta({ problem }: { problem: ProblemEntry }) {
  if (!problem.companies?.length && !problem.leetcode && !problem.algorithms?.length) return null;

  return (
    <div className="space-y-1.5">
      {problem.companies && problem.companies.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {problem.companies.map((company) => (
            <span
              key={company}
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${companyClass[company]}`}
            >
              {company}
            </span>
          ))}
        </div>
      )}
      {problem.leetcode && (
        <p className="text-xs text-indigo-300/90">{leetCodeLabel(problem)}</p>
      )}
      {problem.algorithms && problem.algorithms.length > 0 && (
        <p className="text-[11px] text-slate-500">{problem.algorithms.join(' · ')}</p>
      )}
    </div>
  );
}
