"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-to", label: "How To" },
  { href: "/roadmap", label: "Roadmap" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("password-checklist-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("password-checklist-theme", next ? "dark" : "light");
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <Link href="/" className="site-nav__brand" aria-label="Password checklist home">
        <svg className="site-nav__logo" viewBox="0 0 32 32" aria-hidden="true">
          <defs>
            <linearGradient id="password-logo-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2563eb" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="8" fill="url(#password-logo-bg)" />
          <rect x="7" y="13" width="18" height="13" rx="3" fill="white" opacity=".95" />
          <path d="M11 13V10a5 5 0 0 1 10 0v3" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="m12 19 3 3 5-6" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="site-nav__name">@asafarim/password-checklist</span>
      </Link>

      <ul className={`site-nav__links${menuOpen ? " site-nav__links--open" : ""}`} role="list">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`site-nav__link${isActive(href) ? " site-nav__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="site-nav__actions">
        <button type="button" className="site-nav__theme" onClick={toggleTheme} aria-label="Toggle color theme">
          {dark ? "☀ Light" : "☾ Dark"}
        </button>
        <a href="https://github.com/AliSafari-IT/password-checklist" target="_blank" rel="noopener noreferrer" className="site-nav__external">
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/@asafarim/password-checklist" target="_blank" rel="noopener noreferrer" className="site-nav__npm">
          npm
        </a>
        <button type="button" className="site-nav__menu-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>
    </nav>
  );
}
