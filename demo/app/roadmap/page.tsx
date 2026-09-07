"use client";

import { useState } from "react";
import { DisplayCode } from "@asafarim/display-code";

type Status = "released" | "current" | "planned" | "ideation";

type Item = { version: string; date: string; status: Status; title: string; details: string[]; icon: string; proposedApi?: string };

const items: Item[] = [
  { version: "1.0.0", date: "July 2025", status: "released", title: "Initial release", icon: "✓", details: ["Built-in password rules and typed React APIs", "Default and structural-only CSS themes", "Controlled checklist component and headless validation hook"] },
  { version: "1.1.0", date: "September 2025", status: "current", title: "Expanded validation toolkit", icon: "★", details: ["Strength scoring with entropy estimates", "Async validators with pending state", "Localization, RTL, and personal-information checks"] },
  { version: "1.2.0", date: "Planned", status: "planned", title: "Form library integrations", icon: "→", details: ["First-class adapters for popular React form libraries", "Improved field-level error mapping", "Examples for accessible signup and reset flows"], proposedApi: `<PasswordChecklist control={control} name="password" />` },
  { version: "1.3.0", date: "Planned", status: "planned", title: "More customization", icon: "◇", details: ["Custom rule groups and ordering", "Additional strength scoring strategies", "More flexible checklist item rendering"], proposedApi: `<PasswordChecklist rules={rules} renderRule={renderRule} />` },
  { version: "2.0.0", date: "Ideation", status: "ideation", title: "Composable headless architecture", icon: "?", details: ["Composable rule, result, and presentation primitives", "Streamlined server-safe validation utilities", "A smaller, tree-shakable headless entry point"], proposedApi: `const { results, isValid } = usePasswordValidation({ password, rules });` },
];

export default function RoadmapPage() {
  const [view, setView] = useState<"history" | "roadmap" | "all">("all");
  const history = items.filter((item) => item.status === "released" || item.status === "current");
  const future = items.filter((item) => item.status === "planned" || item.status === "ideation");

  return (
    <div className="roadmap-page">
      <header className="guide-header">
        <p className="eyebrow">Project direction</p>
        <h1>Password checklist journey</h1>
        <p>A transparent view of what has shipped, what is being refined, and where the library is heading next.</p>
      </header>
      <div className="roadmap-toggle" role="group" aria-label="Timeline view">
        {(["history", "roadmap", "all"] as const).map((option) => (
          <button key={option} type="button" className={view === option ? "is-active" : ""} onClick={() => setView(option)}>
            {option === "history" ? "View History" : option === "roadmap" ? "View Future" : "View All"}
          </button>
        ))}
      </div>
      <div className={`roadmap-columns roadmap-columns--${view}`}>
        {view !== "roadmap" && <Timeline title="Changelog" subtitle="Shipped updates for @asafarim/password-checklist" items={history} />}
        {view !== "history" && <Timeline title="Roadmap" subtitle="Ideas and planned improvements" items={future} />}
      </div>
    </div>
  );
}

function Timeline({ title, subtitle, items }: { title: string; subtitle: string; items: Item[] }) {
  return (
    <section className="roadmap-section">
      <div className="timeline-header"><h2>{title}</h2><p>{subtitle}</p></div>
      <div className="timeline">
        {items.map((item) => (
          <article className={`timeline-item timeline-item--${item.status}`} key={item.version}>
            <div className="timeline-marker" aria-hidden="true">{item.icon}</div>
            <div className="timeline-card">
              <div className="timeline-meta"><span className="version">v{item.version}</span><span>{item.date}</span><span className={`status status--${item.status}`}>{item.status}</span></div>
              <h3>{item.title}</h3>
              <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              {item.proposedApi && (
                <div className="roadmap-api">
                  <DisplayCode code={item.proposedApi} language="tsx" theme="dark" showLineNumbers={false} showCopyButton={true} fontSize="small" />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
