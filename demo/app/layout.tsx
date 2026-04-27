import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
// Bring in the library's default theme. Swap to `styles.css` for unstyled.
import "@asafarim/password-checklist/default.css";

export const metadata: Metadata = {
  title: "@asafarim/password-checklist — demo",
  description:
    "Interactive showcase of every feature in the @asafarim/password-checklist React component.",
};

const Logo = () => (
  <div className="flex items-center gap-3">
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
      <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none" aria-hidden="true">
        <rect x="12" y="22" width="40" height="28" rx="8" fill="currentColor" opacity="0.95" />
        <path d="M20 26h24v14H20z" fill="white" opacity="0.9" />
        <path d="M28 34l4 4 10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 30v-6a6 6 0 0 1 12 0v6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </span>
    <div>
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
        Password Checklist
      </p>
      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Demo playground
      </p>
    </div>
  </div>
);

const NAV: { href: string; label: string; description: string }[] = [
  { href: "/", label: "Overview", description: "Library at a glance" },
  { href: "/basic", label: "Basic", description: "Default rules" },
  {
    href: "/special-chars",
    label: "Custom special chars",
    description: "Restrict the special-character set",
  },
  {
    href: "/length-bounds",
    label: "Min / max length",
    description: "Control acceptable lengths",
  },
  { href: "/match", label: "Confirm password", description: "match rule" },
  {
    href: "/strength",
    label: "Strength meter",
    description: "0–4 score + entropy",
  },
  {
    href: "/custom-rules",
    label: "Custom rules",
    description: "Sync user-defined rules",
  },
  {
    href: "/async",
    label: "Async rule",
    description: "Pending state, breach simulation",
  },
  {
    href: "/personal-info",
    label: "Personal info",
    description: "Block name/email substrings",
  },
  {
    href: "/repeat-sequential",
    label: "Repeat & sequential",
    description: "Detect aaaa / 1234",
  },
  {
    href: "/common-passwords",
    label: "Common passwords",
    description: "Custom blacklist",
  },
  {
    href: "/i18n",
    label: "Localization",
    description: "Translated labels",
  },
  {
    href: "/headless",
    label: "Headless hook",
    description: "Bring your own UI",
  },
  {
    href: "/only-failed",
    label: "Only show failed",
    description: "Tighter UI mode",
  },
  { href: "/rtl", label: "RTL", description: "Right-to-left layout" },
  {
    href: "/signup",
    label: "Signup form",
    description: "End-to-end integration",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-7xl px-6 py-6">
          <header className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Logo />
              <nav className="flex flex-wrap items-center gap-3 text-sm">
                <Link
                  href="/"
                  className="font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400"
                >
                  Overview
                </Link>
                <Link
                  href="/basic"
                  className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  Basic
                </Link>
                <Link
                  href="https://github.com/AliSafari-IT/password-checklist"
                  className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500"
                >
                  GitHub
                </Link>
              </nav>
            </div>
          </header>

          <div className="mt-6 flex min-h-[calc(100vh-13rem)] flex-col gap-6 lg:flex-row">
            <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-7rem)] lg:w-72 lg:flex-shrink-0">
              <div className="rounded-xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 lg:h-full lg:overflow-y-auto">
                <Link href="/" className="block">
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Demo
                  </p>
                  <h1 className="mt-1 text-lg font-semibold leading-tight">
                    @asafarim/
                    <br />
                    password-checklist
                  </h1>
                </Link>
                <nav className="mt-6 space-y-1">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
            <main className="flex-1 min-w-0">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                {children}
              </div>
            </main>
          </div>

          <footer className="mt-8 rounded-3xl border border-slate-200 bg-white/80 p-5 text-sm text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Built with <span className="font-semibold text-slate-900 dark:text-slate-100">@asafarim/password-checklist</span> and deployed to GitHub Pages.
              </p>
              <Link
                href="https://github.com/AliSafari-IT/password-checklist"
                className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500"
              >
                View source on GitHub
              </Link>
            </div>
          </footer>
        </div>
        <Script
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-name="BMC-Widget"
          data-cfasync="false"
          data-id="asafarim"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
