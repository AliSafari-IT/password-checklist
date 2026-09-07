"use client";

import Link from "next/link";
import { useState } from "react";
import { PasswordChecklist, usePasswordValidation } from "@asafarim/password-checklist";
import type { CustomRule } from "@asafarim/password-checklist";
import { BasicRulesDemo } from "./BasicRulesDemo";
import { PasswordField } from "./PasswordField";

type Feature = {
  id: string;
  title: string;
  shortTitle: string;
  body: string;
  href: string;
  eyebrow: string;
};

const FEATURES: Feature[] = [
  { id: "basic", shortTitle: "Basic rules", title: "Built-in password rules", eyebrow: "Start here", body: "Give users immediate feedback as they meet the minimum length, mixed case, number, and special-character requirements.", href: "/basic" },
  { id: "special-chars", shortTitle: "Special characters", title: "Choose your special characters", eyebrow: "Customization", body: "Restrict accepted symbols to your product's requirements, including custom and Unicode character sets.", href: "/special-chars" },
  { id: "strength", shortTitle: "Strength meter", title: "Show password strength", eyebrow: "Feedback", body: "Add a 0–4 strength score and entropy estimate so users can understand the quality of their password.", href: "/strength" },
  { id: "custom-rules", shortTitle: "Custom rules", title: "Add your own validators", eyebrow: "Extensible", body: "Combine built-in rules with synchronous or asynchronous validators for product-specific requirements.", href: "/custom-rules" },
  { id: "async", shortTitle: "Async checks", title: "Validate against live data", eyebrow: "Async ready", body: "Plug in breach or server checks without blocking the rest of the password experience.", href: "/async" },
  { id: "i18n", shortTitle: "Localization & RTL", title: "Make it yours", eyebrow: "Global-ready", body: "Translate labels, customize strength messages, and render the checklist right-to-left.", href: "/i18n" },
  { id: "headless", shortTitle: "Headless hook", title: "Bring your own UI", eyebrow: "Advanced", body: "Use usePasswordValidation() to build a completely bespoke password experience.", href: "/headless" },
  { id: "signup", shortTitle: "Signup integration", title: "Gate form submission", eyebrow: "Production", body: "See a complete registration flow that only submits when every password rule is valid.", href: "/signup" },
];

const standardRules = ["minLength", "capital", "lowercase", "number", "specialChar"] as const;

function SpecialCharsPreview() {
  const [password, setPassword] = useState("");
  const [specialChars, setSpecialChars] = useState("!@#$%^&*");
  return <div className="preview-stack">
    <PasswordField label="Password" value={password} onChange={setPassword} placeholder="Enter a password..." />
    <label className="preview-label">Allowed special characters<input className="preview-input" value={specialChars} onChange={(event) => setSpecialChars(event.target.value)} /></label>
    <PasswordChecklist value={password} rules={[...standardRules]} minLength={8} specialCharsList={specialChars} />
  </div>;
}

function StrengthPreview() {
  const [password, setPassword] = useState("");
  return <div className="preview-stack"><PasswordField label="Password" value={password} onChange={setPassword} placeholder="Try a longer password..." /><PasswordChecklist value={password} rules={[...standardRules]} minLength={8} showStrengthMeter /></div>;
}

const customRule: CustomRule = { id: "no-username", label: "Does not contain 'admin' or 'user'", validate: (password) => !/(admin|user)/i.test(password) };
function CustomRulesPreview() {
  const [password, setPassword] = useState("");
  return <div className="preview-stack"><PasswordField label="Password" value={password} onChange={setPassword} placeholder="Try typing admin..." /><PasswordChecklist value={password} customRules={[customRule]} /></div>;
}

const asyncRule: CustomRule = { id: "not-breached", label: "Not found in breached password database", validate: async (password) => { await new Promise((resolve) => setTimeout(resolve, 700)); return !["password123", "123456", "qwerty"].includes(password.toLowerCase()); } };
function AsyncPreview() {
  const [password, setPassword] = useState("");
  return <div className="preview-stack"><PasswordField label="Password" value={password} onChange={setPassword} placeholder="Try password123..." /><PasswordChecklist value={password} customRules={[asyncRule]} /></div>;
}

function I18nPreview() {
  const [password, setPassword] = useState("");
  const messages = { minLength: "Au moins {minLength} caractères", capital: "Au moins une lettre majuscule", lowercase: "Au moins une lettre minuscule", number: "Au moins un chiffre", specialChar: "Au moins un caractère spécial" };
  return <div className="preview-stack"><PasswordField label="Mot de passe" value={password} onChange={setPassword} placeholder="Entrez un mot de passe..." /><PasswordChecklist value={password} rules={[...standardRules]} minLength={8} messages={messages} strengthLabels={["Très faible", "Faible", "Moyen", "Fort", "Très fort"]} showStrengthMeter /></div>;
}

function HeadlessPreview() {
  const [password, setPassword] = useState("");
  const { isValid, rules, strength } = usePasswordValidation({ value: password, rules: [...standardRules], minLength: 8 });
  return <div className="preview-stack"><PasswordField label="Password" value={password} onChange={setPassword} placeholder="Build your own UI..." /><div className="headless-result"><div><strong>Strength</strong><span>{strength.label} ({strength.score}/4)</span></div><div><strong>Valid</strong><span>{isValid ? "Yes" : "No"}</span></div>{rules.map((rule) => <div key={rule.id}><span className={`rule-dot rule-dot--${rule.status}`} />{rule.label}</div>)}</div></div>;
}

function SignupPreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isValid } = usePasswordValidation({ value: password, valueAgain: confirmPassword, rules: [...standardRules, "match"], minLength: 8 });
  return <form className="preview-stack" onSubmit={(event) => event.preventDefault()}><label className="preview-label">Email<input className="preview-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><PasswordField label="Password" value={password} onChange={setPassword} placeholder="Enter a password..." /><PasswordField label="Confirm password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter the password..." /><PasswordChecklist value={password} valueAgain={confirmPassword} rules={[...standardRules, "match"]} minLength={8} onlyShowFailed /><button className="preview-submit" type="submit" disabled={!isValid}>Create account</button></form>;
}

function FeaturePreview({ id }: { id: string }) {
  switch (id) {
    case "basic": return <BasicRulesDemo />;
    case "special-chars": return <SpecialCharsPreview />;
    case "strength": return <StrengthPreview />;
    case "custom-rules": return <CustomRulesPreview />;
    case "async": return <AsyncPreview />;
    case "i18n": return <I18nPreview />;
    case "headless": return <HeadlessPreview />;
    case "signup": return <SignupPreview />;
    default: return null;
  }
}

export function FeatureTabs() {
  const [activeId, setActiveId] = useState("basic");
  const active = FEATURES.find((feature) => feature.id === activeId) ?? FEATURES[0]!;

  return (
    <section className="feature-showcase" aria-label="Feature showcase">
      <div className="feature-showcase__intro">
        <div>
          <p className="eyebrow">Explore the toolkit</p>
          <h2>Everything you need for better passwords.</h2>
        </div>
        <p>Choose a feature to preview it here. Open the full demo when you want to experiment with every option.</p>
      </div>

      <div className="feature-tabs" role="tablist" aria-label="Password checklist features">
        <div className="feature-tabs__list">
          {FEATURES.map((feature, index) => (
            <button
              key={feature.id}
              type="button"
              role="tab"
              aria-selected={active.id === feature.id}
              aria-controls={`feature-panel-${feature.id}`}
              className={`feature-tab${active.id === feature.id ? " feature-tab--active" : ""}`}
              onClick={() => setActiveId(feature.id)}
            >
              <span className="feature-tab__number">{String(index + 1).padStart(2, "0")}</span>
              <span>{feature.shortTitle}</span>
              <span className="feature-tab__arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>

        <div className="feature-panel" id={`feature-panel-${active.id}`} role="tabpanel">
          <div className="feature-panel__glow" aria-hidden="true" />
          <div className="feature-panel__header">
            <div>
              <p className="feature-panel__eyebrow">{active.eyebrow}</p>
              <h3>{active.title}</h3>
            </div>
            <span className="feature-panel__status"><span /> Live preview</span>
          </div>
          <p className="feature-panel__description">{active.body}</p>
          <div className="feature-panel__demo"><FeaturePreview id={active.id} /></div>
          <Link className="feature-panel__link" href={active.href}>Open full {active.shortTitle.toLowerCase()} demo <span>↗</span></Link>
        </div>
      </div>
    </section>
  );
}
