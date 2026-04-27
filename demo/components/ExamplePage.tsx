"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ExamplePageProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  code?: string;
}

export function ExamplePage({
  title,
  description,
  children,
  code,
}: ExamplePageProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (copyStatus !== "copied") return;
    const timeout = window.setTimeout(() => setCopyStatus("idle"), 2000);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <div className="example-prose space-y-6">
      <header>
        <h1>{title}</h1>
        <p className="mt-2 max-w-3xl">{description}</p>
      </header>
      <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-5 shadow-sm shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
        {children}
      </section>
      {code ? (
        <section className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="!mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">Snippet</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Copy the example to your clipboard.</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
              aria-label="Copy code snippet"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 9H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
                <path d="M9 5h10a2 2 0 0 1 2 2v10" />
                <path d="M9 15h6" />
              </svg>
              {copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Retry" : "Copy"}
            </button>
          </div>
          <div className="overflow-hidden">
            <pre className="overflow-x-auto whitespace-pre bg-transparent text-sm text-slate-900">
              <code className="block font-semibold">{code}</code>
            </pre>
          </div>
        </section>
      ) : null}
    </div>
  );
}
