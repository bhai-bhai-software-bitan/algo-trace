import type { TestCase } from '@/types/problem';

const STORAGE_KEY = 'algotrace.practice.v1';
const CHANGE_EVENT = 'algotrace-practice';

export type PracticeRecord = {
  source: string | null;
  cases: TestCase[];
};

type Store = Record<string, PracticeRecord>;

const cache = new Map<string, { raw: string | null; value: PracticeRecord | null }>();

function emptyRecord(): PracticeRecord {
  return { source: null, cases: [] };
}

function readStore(): Store {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Store;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store): { ok: true } | { ok: false; error: string } {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    cache.clear();
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'This browser has no room left in local storage for that solution.',
    };
  }
}

export function subscribePractice(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

export function readPractice(slug: string): PracticeRecord | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const cached = cache.get(slug);
  if (cached && cached.raw === raw) return cached.value;

  const record = readStore()[slug];
  const value = record ? normalize(record) : null;
  cache.set(slug, { raw, value });
  return value;
}

export function savePracticeSource(
  slug: string,
  source: string,
): { ok: true } | { ok: false; error: string } {
  const store = readStore();
  const current = normalize(store[slug]) ?? emptyRecord();
  store[slug] = { ...current, source };
  return writeStore(store);
}

export function clearPracticeSource(slug: string) {
  const store = readStore();
  const current = normalize(store[slug]);
  if (!current) return;
  if (current.cases.length === 0) delete store[slug];
  else store[slug] = { ...current, source: null };
  writeStore(store);
}

export function addPracticeCase(
  slug: string,
  testCase: TestCase,
): { ok: true } | { ok: false; error: string } {
  const store = readStore();
  const current = normalize(store[slug]) ?? emptyRecord();
  store[slug] = { ...current, cases: [...current.cases, testCase] };
  return writeStore(store);
}

export function removePracticeCase(slug: string, caseId: string) {
  const store = readStore();
  const current = normalize(store[slug]);
  if (!current) return;
  const cases = current.cases.filter((testCase) => testCase.id !== caseId);
  if (!current.source && cases.length === 0) delete store[slug];
  else store[slug] = { ...current, cases };
  writeStore(store);
}

function normalize(record: PracticeRecord | undefined): PracticeRecord | null {
  if (!record || typeof record !== 'object') return null;
  const source = typeof record.source === 'string' ? record.source : null;
  const cases = Array.isArray(record.cases) ? record.cases.filter(isTestCase) : [];
  if (!source && cases.length === 0) return null;
  return { source, cases };
}

function isTestCase(value: unknown): value is TestCase {
  if (!value || typeof value !== 'object') return false;
  const testCase = value as TestCase;
  return typeof testCase.id === 'string' && typeof testCase.label === 'string' && Array.isArray(testCase.args);
}
