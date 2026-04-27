import Link from "next/link";

const FEATURES: { title: string; body: string; href: string }[] = [
  {
    title: "Built-in rules",
    body: "minLength, maxLength, capital, lowercase, number, specialChar, letter, match, noWhitespace, noRepeat, noSequential, notCommon, notPersonalInfo.",
    href: "/basic",
  },
  {
    title: "Custom special-char set",
    body: "Pass your own list — even unicode glyphs — to specialCharsList.",
    href: "/special-chars",
  },
  {
    title: "Strength meter",
    body: "0–4 score with entropy estimate, fully theme-able.",
    href: "/strength",
  },
  {
    title: "Custom rules",
    body: "Add any sync or async validator. Async rules show a pending state.",
    href: "/custom-rules",
  },
  {
    title: "Async breach check",
    body: "Plug in HIBP-style server checks without blocking the UI.",
    href: "/async",
  },
  {
    title: "Localization & RTL",
    body: "Override every label, swap strength labels, render right-to-left.",
    href: "/i18n",
  },
  {
    title: "Headless hook",
    body: "Use usePasswordValidation() for a totally bespoke UI.",
    href: "/headless",
  },
  {
    title: "Signup form integration",
    body: "Real registration form gating submission on isValid.",
    href: "/signup",
  },
];

export default function HomePage() {
  return (
    <div className="example-prose space-y-8">
      <header>
        <p className="text-xs uppercase tracking-widest text-brand-600">
          @asafarim/password-checklist
        </p>
        <h1>Live demo &amp; feature showcase</h1>
        <p className="mt-2 max-w-3xl">
          A robust, fully-typed React component to display the success or
          failure of password strength rules in real time. Browse the navigation
          to try every feature, or jump to a highlight below.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group rounded-lg border border-slate-200 p-5 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
          >
            <h2 className="!mt-0 text-base font-semibold group-hover:text-brand-600">
              {feature.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {feature.body}
            </p>
          </Link>
        ))}
      </div>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-200">
        <strong>Tip:</strong> the library ships two CSS files — import{" "}
        <code>@asafarim/password-checklist/default.css</code> for the opinionated
        look used here, or <code>@asafarim/password-checklist/styles.css</code>{" "}
        for structural-only styles you can theme yourself.
      </section>
    </div>
  );
}
