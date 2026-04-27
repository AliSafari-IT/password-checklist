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
  return (
    <div className="example-prose space-y-6">
      <header>
        <h1>{title}</h1>
        <p className="mt-2 max-w-3xl">{description}</p>
      </header>
      <section className="rounded-lg border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/40">
        {children}
      </section>
      {code ? (
        <section>
          <h2 className="!mt-2">Snippet</h2>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100 dark:bg-slate-950">
            <code>{code}</code>
          </pre>
        </section>
      ) : null}
    </div>
  );
}
