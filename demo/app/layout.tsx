import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
// Bring in the library's default theme. Swap to `styles.css` for unstyled.
import "@asafarim/password-checklist/default.css";

export const metadata: Metadata = {
  title: "@asafarim/password-checklist — demo",
  description:
    "Interactive showcase of every feature in the @asafarim/password-checklist React component.",
};

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
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-6 lg:flex-row">
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-72 lg:flex-shrink-0">
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
      </body>
    </html>
  );
}
