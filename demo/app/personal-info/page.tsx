"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function PersonalInfoPage() {
  const [password, setPassword] = useState("");
  const [personalInfo, setPersonalInfo] = useState("john,doe,john@example.com");

  const personalInfoArray = personalInfo
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <ExamplePage
      title="Personal info"
      description="Block passwords containing personal information like names or email addresses."
      code={`<PasswordChecklist
  value={password}
  personalInfo={["john", "doe", "john@example.com"]}
  rules={["notPersonalInfo"]}
/>`}
    >
      <div className="space-y-4">
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Try including 'john'..."
        />
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Personal info (comma-separated)
          </span>
          <input
            type="text"
            value={personalInfo}
            onChange={(e) => setPersonalInfo(e.target.value)}
            placeholder="john,doe,john@example.com"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <PasswordChecklist
          value={password}
          personalInfo={personalInfoArray}
          rules={["notPersonalInfo"]}
        />
      </div>
    </ExamplePage>
  );
}