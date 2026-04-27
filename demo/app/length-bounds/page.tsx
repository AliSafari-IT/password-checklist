"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function LengthBoundsPage() {
  const [password, setPassword] = useState("");
  const [minLength, setMinLength] = useState(8);
  const [maxLength, setMaxLength] = useState(20);

  return (
    <ExamplePage
      title="Length bounds"
      description="Set minimum and maximum password lengths. The component will show appropriate rules."
      code={`<PasswordChecklist
  value={password}
  minLength={8}
  maxLength={20}
/>`}
    >
      <div className="space-y-4">
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter a password..."
        />
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Min length
            </span>
            <input
              type="number"
              value={minLength}
              onChange={(e) => setMinLength(Number(e.target.value))}
              min="1"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Max length
            </span>
            <input
              type="number"
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
              min="1"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        </div>
        <PasswordChecklist
          value={password}
          rules={["minLength", "maxLength"]}
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
    </ExamplePage>
  );
}