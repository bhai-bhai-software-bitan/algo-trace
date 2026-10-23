import { notFound } from 'next/navigation';
import ProblemVisualizerClient from '@/components/workspace/ProblemVisualizerClient';
import { PROBLEMS } from '@/data/problems';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROBLEMS.map((problem) => ({
    slug: problem.slug,
  }));
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = PROBLEMS.find((entry) => entry.slug === slug);

  if (!problem) {
    notFound();
  }

  return <ProblemVisualizerClient problem={problem} />;
}
