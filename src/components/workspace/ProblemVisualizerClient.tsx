"use client";

import ProblemMeta from "@/components/ProblemMeta";
import ArrayCartoon from "@/components/visualizer/ArrayCartoon";
import MapCartoon from "@/components/visualizer/MapCartoon";
import PrimitivesCartoon from "@/components/visualizer/PrimitivesCartoon";
import { runAndTrace } from "@/lib/engine/tracer";
import {
  addPracticeCase,
  clearPracticeSource,
  readPractice,
  removePracticeCase,
  savePracticeSource,
  subscribePractice,
} from "@/lib/scripts/storage";
import {
  inspectSolution,
  javascriptFileError,
  parsePracticeCase,
} from "@/lib/scripts/validate";
import type { ProblemEntry } from "@/types/problem";
import {
  ArrowLeft,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

function difficultyClass(difficulty: ProblemEntry["difficulty"]) {
  if (difficulty === "Easy") return "bg-emerald-500/15 text-emerald-400";
  if (difficulty === "Medium") return "bg-amber-500/15 text-amber-400";
  return "bg-rose-500/15 text-rose-400";
}

export default function ProblemVisualizerClient({
  problem,
}: {
  problem: ProblemEntry;
}) {
  const [activeTestCaseId, setActiveTestCaseId] = useState(
    problem.testCases[0].id,
  );
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(700);
  const [draftOverride, setDraftOverride] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [caseLabel, setCaseLabel] = useState("");
  const [caseArgs, setCaseArgs] = useState("");
  const [caseExpected, setCaseExpected] = useState("");

  const practice = useSyncExternalStore(
    subscribePractice,
    () => readPractice(problem.slug),
    () => null,
  );
  const practiceView = useMemo(() => {
    const source = practice?.source ?? null;
    const inspected = source
      ? inspectSolution(source, problem.functionName)
      : null;
    const using = Boolean(source && inspected?.ok);
    const code = using && source ? source : problem.code;
    const tracked =
      using && inspected?.ok
        ? inspected.inspection.trackedVariables
        : problem.trackedVariables;
    const pointers =
      using && inspected?.ok
        ? inspected.inspection.pointerVariables
        : problem.pointerVariables;
    const allCases = [...problem.testCases, ...(practice?.cases ?? [])];
    const selected =
      allCases.find((testCase) => testCase.id === activeTestCaseId) ??
      allCases[0];
    return {
      cases: allCases,
      selected,
      using,
      code,
      pointers,
      traced: runAndTrace(
        code,
        problem.functionName,
        selected.args,
        tracked,
        pointers,
      ),
    };
  }, [activeTestCaseId, practice, problem]);
  const {
    cases,
    selected: activeTestCase,
    using: usingSaved,
    code: activeCode,
    pointers: pointerVariables,
    traced,
  } = practiceView;
  const timeline = traced.timeline;
  const error = traced.error ?? null;

  const draft = draftOverride ?? practice?.source ?? "";

  if (!cases.some((testCase) => testCase.id === activeTestCaseId)) {
    setActiveTestCaseId(cases[0].id);
  }

  const traceKey = `${problem.slug}:${activeTestCase.id}:${usingSaved ? activeCode : "builtin"}`;
  const [seenTraceKey, setSeenTraceKey] = useState(traceKey);
  if (seenTraceKey !== traceKey) {
    setSeenTraceKey(traceKey);
    setStepIdx(0);
    setIsPlaying(false);
  }

  const lastStep = Math.max(0, timeline.length - 1);

  const stepForward = useCallback(() => {
    const next = Math.min(stepIdx + 1, lastStep);
    setStepIdx(next);
    if (next >= lastStep) setIsPlaying(false);
  }, [lastStep, stepIdx]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setStepIdx((current) => Math.max(0, current - 1));
  }, []);

  const togglePlayback = useCallback(() => {
    if (timeline.length <= 1) return;
    if (stepIdx >= lastStep) {
      setStepIdx(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((playing) => !playing);
  }, [lastStep, stepIdx, timeline.length]);

  useEffect(() => {
    if (!isPlaying || stepIdx >= lastStep) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(stepIdx + 1, lastStep);
      setStepIdx(next);
      if (next >= lastStep) setIsPlaying(false);
    }, speedMs);
    return () => window.clearTimeout(timer);
  }, [isPlaying, lastStep, speedMs, stepIdx]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepForward();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepBackward();
      } else if (event.key === " ") {
        event.preventDefault();
        togglePlayback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stepBackward, stepForward, togglePlayback]);

  const currentSnapshot = timeline[stepIdx];
  const codeLines = activeCode.split("\n");

  const activePointers: Record<string, number> = {};
  if (currentSnapshot && pointerVariables) {
    for (const pointerName of pointerVariables) {
      const value = currentSnapshot.variables[pointerName];
      if (typeof value === "number") {
        activePointers[pointerName] = value;
      }
    }
  }

  const arrayVars: Record<string, unknown[]> = {};
  const mapVars: Record<string, Record<string, unknown>> = {};
  const primitiveVars: Record<string, unknown> = {};

  if (currentSnapshot) {
    for (const [key, value] of Object.entries(currentSnapshot.variables)) {
      if (Array.isArray(value)) {
        arrayVars[key] = value;
      } else if (typeof value === "object" && value !== null) {
        mapVars[key] = value as Record<string, unknown>;
      } else {
        primitiveVars[key] = value;
      }
    }
  }

  function saveDraft(source: string) {
    const result = inspectSolution(source, problem.functionName);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    const saved = savePracticeSource(problem.slug, source);
    if (!saved.ok) {
      setFormError(saved.error);
      return;
    }
    setDraftOverride(null);
    setFormError(null);
  }

  function saveUploadedFile(file: File) {
    const extensionError = javascriptFileError(file.name);
    if (extensionError) {
      setFormError(extensionError);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      saveDraft(String(reader.result ?? ""));
    };
    reader.readAsText(file);
  }

  function saveCase() {
    const parsed = parsePracticeCase(caseLabel, caseArgs, caseExpected);
    if (!parsed.ok) {
      setFormError(parsed.error);
      return;
    }
    const testCase = {
      id: `user-${Date.now()}`,
      label: parsed.label,
      inputSummary: parsed.inputSummary,
      args: parsed.args,
      expected: parsed.expected,
    };
    const saved = addPracticeCase(problem.slug, testCase);
    if (!saved.ok) {
      setFormError(saved.error);
      return;
    }
    setCaseLabel("");
    setCaseArgs("");
    setCaseExpected("");
    setFormError(null);
    setActiveTestCaseId(testCase.id);
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 lg:flex-row lg:items-center">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
                href="/"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All 150 Problems
              </Link>
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
                {problem.number != null ? `#${problem.number} • ` : ""}
                {problem.category}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${difficultyClass(problem.difficulty)}`}
              >
                {problem.difficulty}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {problem.title}
            </h1>
            <p className="max-w-3xl text-sm text-slate-400">
              {problem.description}
            </p>
            <ProblemMeta problem={problem} />
            {problem.context && (
              <p className="max-w-3xl text-sm text-slate-500">
                {problem.context}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Click a Test Case to Visualize Execution:
            </div>
            <div className="flex flex-wrap gap-2">
              {cases.map((testCase) => {
                const isSelected = testCase.id === activeTestCaseId;
                const isCustom = testCase.id.startsWith("user-");
                return (
                  <div key={testCase.id} className="flex items-stretch">
                    <button
                      type="button"
                      onClick={() => setActiveTestCaseId(testCase.id)}
                      className={`flex flex-col items-start rounded-xl border px-4 py-2 text-left transition-all ${
                        isCustom ? "rounded-r-none" : ""
                      } ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-600/20 text-white shadow-lg shadow-indigo-500/20"
                          : "border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-xs font-bold text-indigo-300">
                        {testCase.label}
                      </span>
                      <span className="font-mono text-xs text-slate-300">
                        {testCase.inputSummary}
                      </span>
                    </button>
                    {isCustom && (
                      <button
                        type="button"
                        aria-label={`Delete ${testCase.label}`}
                        onClick={() =>
                          removePracticeCase(problem.slug, testCase.id)
                        }
                        className="rounded-r-xl border border-l-0 border-slate-800 bg-slate-900 px-2 text-xs text-slate-400 hover:text-rose-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Your JavaScript
              </h2>
              <p className="text-xs text-slate-400">
                Paste a function named{" "}
                <span className="font-mono text-indigo-300">
                  {problem.functionName}
                </span>{" "}
                or choose a .js file. It is saved in this browser and played
                with the test cases.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {usingSaved && (
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                  Visualizing your solution
                </span>
              )}
              {practice?.source && (
                <button
                  type="button"
                  onClick={() => {
                    clearPracticeSource(problem.slug);
                    setDraftOverride(null);
                  }}
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Use built-in solution
                </button>
              )}
            </div>
          </div>
          <textarea
            value={draft}
            onChange={(event) => setDraftOverride(event.target.value)}
            spellCheck={false}
            placeholder={`function ${problem.functionName}(...) {\n  \n}`}
            aria-label="Paste JavaScript solution"
            className="h-36 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-100 outline-none focus:border-indigo-500"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => saveDraft(draft)}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
            >
              Visualize pasted code
            </button>
            <label className="cursor-pointer rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800">
              Upload .js
              <input
                type="file"
                accept=".js,text/javascript"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (file) saveUploadedFile(file);
                }}
              />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_1.4fr_1fr_auto]">
            <input
              value={caseLabel}
              onChange={(event) => setCaseLabel(event.target.value)}
              placeholder="Case label"
              aria-label="Case label"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
            />
            <input
              value={caseArgs}
              onChange={(event) => setCaseArgs(event.target.value)}
              placeholder="Arguments JSON, e.g. [[2,7], 9]"
              aria-label="Case arguments JSON"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-100 outline-none focus:border-indigo-500"
            />
            <input
              value={caseExpected}
              onChange={(event) => setCaseExpected(event.target.value)}
              placeholder="Expected JSON, e.g. [0, 1]"
              aria-label="Expected JSON"
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-100 outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={saveCase}
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-bold text-slate-100 hover:bg-slate-700"
            >
              Save case
            </button>
          </div>
          {formError && <p className="text-sm text-rose-300">{formError}</p>}
        </section>

        {error && (
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm text-rose-200">
            Execution Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-5 lg:col-span-5">
            <div>
              <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                  <Terminal className="h-4 w-4 text-indigo-400" />
                  JavaScript Execution Trace
                </div>
                <span className="shrink-0 rounded-md bg-slate-800 px-2.5 py-1 font-mono text-xs font-semibold whitespace-nowrap text-amber-300">
                  Line {currentSnapshot?.line ?? "-"} • Step{" "}
                  {timeline.length === 0 ? 0 : stepIdx + 1}/
                  {timeline.length || 1}
                </span>
              </div>

              <pre className="overflow-x-auto font-mono text-xs leading-7 sm:text-sm">
                {codeLines.map((lineText, idx) => {
                  const lineNumber = idx + 1;
                  const isActive = currentSnapshot?.line === lineNumber;
                  return (
                    <div
                      key={lineNumber}
                      className={`flex items-center rounded-lg px-2.5 transition-all ${
                        isActive
                          ? "bg-amber-400/20 font-bold text-amber-200 ring-1 ring-amber-400/50"
                          : "text-slate-300"
                      }`}
                    >
                      <span className="w-7 shrink-0 text-xs text-slate-600 select-none">
                        {lineNumber}
                      </span>
                      <span className="whitespace-pre">{lineText}</span>
                    </div>
                  );
                })}
              </pre>
            </div>

            <div className="mt-6 space-y-4 border-t border-slate-800 pt-4">
              <input
                type="range"
                min={0}
                max={Math.max(0, timeline.length - 1)}
                value={timeline.length === 0 ? 0 : stepIdx}
                aria-label="Execution step"
                onChange={(event) => {
                  setIsPlaying(false);
                  setStepIdx(Number(event.target.value));
                }}
                className="w-full cursor-pointer accent-indigo-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setStepIdx(0);
                    }}
                    title="Reset"
                    className="rounded-xl bg-slate-800 p-2.5 text-slate-300 hover:bg-slate-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={stepBackward}
                    title="Step Back (Left Arrow)"
                    className="rounded-xl bg-slate-800 p-2.5 text-slate-300 hover:bg-slate-700"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={togglePlayback}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button
                    type="button"
                    onClick={stepForward}
                    title="Step Forward (Right Arrow)"
                    className="rounded-xl bg-slate-800 p-2.5 text-slate-300 hover:bg-slate-700"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 p-1">
                  {[
                    { label: "0.5x", ms: 1200 },
                    { label: "1x", ms: 700 },
                    { label: "2x", ms: 320 },
                  ].map((speed) => (
                    <button
                      key={speed.label}
                      type="button"
                      onClick={() => setSpeedMs(speed.ms)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                        speedMs === speed.ms
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {speed.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-center text-[11px] text-slate-500">
                Tip: Use{" "}
                <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
                  ←
                </kbd>{" "}
                <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
                  →
                </kbd>{" "}
                arrow keys to step through execution, or{" "}
                <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
                  Space
                </kbd>{" "}
                to Play/Pause.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400 uppercase">
                <Sparkles className="h-4 w-4" />
                Live Memory & Data Structure Stage
              </div>
              <span className="font-mono text-xs break-all text-slate-400">
                Expected Output: {JSON.stringify(activeTestCase.expected)}
              </span>
            </div>

            {currentSnapshot ? (
              <div className="space-y-5">
                {Object.entries(arrayVars).map(([name, items]) => {
                  const pointers: Record<string, number> = {};
                  const allowed = usingSaved
                    ? undefined
                    : problem.pointerTargets?.[name];
                  const source = allowed
                    ? allowed
                    : usingSaved || !problem.pointerTargets
                      ? Object.keys(activePointers)
                      : [];
                  for (const pointerName of source) {
                    if (typeof activePointers[pointerName] === "number") {
                      pointers[pointerName] = activePointers[pointerName];
                    }
                  }
                  return (
                    <ArrayCartoon
                      key={name}
                      name={name}
                      items={items}
                      pointers={pointers}
                      changed={currentSnapshot.changedVars.includes(name)}
                    />
                  );
                })}

                {Object.entries(mapVars).map(([name, mapObj]) => (
                  <MapCartoon
                    key={name}
                    name={name}
                    data={mapObj}
                    changed={currentSnapshot.changedVars.includes(name)}
                  />
                ))}

                <PrimitivesCartoon
                  primitives={primitiveVars}
                  changedVars={currentSnapshot.changedVars}
                  returnValue={currentSnapshot.returnValue}
                  expectedValue={activeTestCase.expected}
                />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                Select a test case to initialize visualization...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
