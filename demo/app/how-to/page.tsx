"use client";

import { useState } from "react";
import { DisplayCode } from "@asafarim/display-code";

const examples = [
  {
    title: "Basic checklist",
    description: "Render the ready-made checklist with the default password rules.",
    code: `import { PasswordChecklist } from "@asafarim/password-checklist";

<PasswordChecklist password={password} />`,
  },
  {
    title: "Confirm password",
    description: "Add a match rule for signup and account recovery forms.",
    code: `<PasswordChecklist
  password={password}
  rules={["minLength", "capital", "number", "match"]}
  confirmPassword={confirmPassword}
/>`,
  },
  {
    title: "Custom rules",
    description: "Compose the built-in validators with your own synchronous or async checks.",
    code: `const rules = [
  "minLength",
  { id: "company", label: "Not a company name", validate: value =>
      !value.toLowerCase().includes("acme") },
];

<PasswordChecklist password={password} rules={rules} />`,
  },
  {
    title: "Headless UI",
    description: "Use the validation hook when you need complete control over the markup.",
    code: `const { results, isValid, strength } =
  usePasswordValidation({ password, rules });

return <MyPasswordField results={results} strength={strength} />;`,
  },
];

function CodeReveal({ code, language = "tsx" }: { code: string; language?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="howto-source">
      <div className="howto-source__toolbar">
        <button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? "⌃ Hide source" : "⌄ Show source"}
        </button>
      </div>
      {open && (
        <DisplayCode
          code={code}
          language={language}
          theme="dark"
          showLineNumbers={true}
          showCopyButton={true}
          fontSize="small"
        />
      )}
    </div>
  );
}

export default function HowToPage() {
  return (
    <div className="guide-page">
      <header className="guide-header">
        <p className="eyebrow">Documentation</p>
        <h1>How to use PasswordChecklist</h1>
        <p>Install the component, choose the rules your product needs, and give users immediate feedback as they create a password.</p>
      </header>

      <section className="guide-section">
        <h2>Installation</h2>
        <p>Choose your preferred package manager and import the component into any React application.</p>
        <div className="install-code"><DisplayCode code="pnpm add @asafarim/password-checklist" language="bash" theme="dark" showLineNumbers={false} showCopyButton={true} fontSize="small" /></div>
        <div className="install-code"><DisplayCode code="npm install @asafarim/password-checklist" language="bash" theme="dark" showLineNumbers={false} showCopyButton={true} fontSize="small" /></div>
      </section>

      <section className="guide-section">
        <h2>Quick start</h2>
        <div className="guide-card">
          <p>Keep the password controlled by your form, then pass it to the checklist.</p>
          <DisplayCode
            code={`"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";

export function SignupPassword() {
  const [password, setPassword] = useState("");

  return (
    <>
      <input type="password" value={password}
        onChange={(event) => setPassword(event.target.value)} />
      <PasswordChecklist password={password} />
    </>
  );
}`}
            language="tsx"
            theme="dark"
            showLineNumbers={true}
            showCopyButton={true}
            fontSize="small"
          />
        </div>
      </section>

      <section className="guide-section">
        <h2>Common use cases</h2>
        <p>Each example below can be expanded to reveal a copyable implementation.</p>
        <div className="howto-grid">
          {examples.map((example) => (
            <article className="guide-card" key={example.title}>
              <div className="guide-card__heading"><h3>{example.title}</h3><span>Example</span></div>
              <p>{example.description}</p>
              <CodeReveal code={example.code} />
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section">
        <h2>Explore every rule</h2>
        <p>Use the demo navigation to see length bounds, special characters, strength scoring, localization, RTL, async rules, and form integration in action.</p>
      </section>
    </div>
  );
}
