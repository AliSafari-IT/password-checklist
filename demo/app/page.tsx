import Link from "next/link";
import { FeatureTabs } from "../components/FeatureTabs";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="eyebrow">@asafarim/password-checklist</p>
          <h1>Password feedback that feels effortless.</h1>
          <p className="home-hero__subtitle">
            A robust, fully typed React component for clear, accessible password validation. Explore the toolkit through interactive previews, then copy the implementation into your app.
          </p>
          <div className="home-hero__actions">
            <Link className="home-hero__primary" href="/how-to">Get started <span>→</span></Link>
            <a className="home-hero__secondary" href="https://github.com/AliSafari-IT/password-checklist" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>
          </div>
        </div>
        <div className="home-hero__visual" aria-hidden="true">
          <div className="home-hero__orb home-hero__orb--one" />
          <div className="home-hero__orb home-hero__orb--two" />
          <div className="home-hero__lock">✓</div>
          <div className="home-hero__float home-hero__float--top">secure by design</div>
          <div className="home-hero__float home-hero__float--bottom">real-time feedback</div>
        </div>
      </section>

      <FeatureTabs />

      <section className="home-note">
        <div><strong>Designed for real products.</strong><span>Type-safe rules, async validation, localization, RTL, and a headless hook are ready when you are.</span></div>
        <Link href="/roadmap">See the roadmap <span>→</span></Link>
      </section>
    </div>
  );
}
