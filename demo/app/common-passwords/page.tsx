"use client";

import { useState } from "react";
import { PasswordChecklist, DEFAULT_COMMON_PASSWORDS } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function CommonPasswordsPage() {
  const [password, setPassword] = useState("");
  const [commonPasswords, setCommonPasswords] = useState(
    DEFAULT_COMMON_PASSWORDS.slice(0, 10).join(", ")
  );

  const commonPasswordsArray = commonPasswords
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <ExamplePage
      title="Common passwords"
      description="Block commonly-used passwords. Uses a built-in list or provide your own."
      code={`<PasswordChecklist
  value={password}
  commonPasswords={["password", "123456", ...]}
  rules={["notCommon"]}
/>`}
    >
      <div className="space-y-4">
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Try 'password'..."
        />
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Common passwords (comma-separated)
          </span>
          <textarea
            value={commonPasswords}
            onChange={(e) => setCommonPasswords(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <PasswordChecklist
          value={password}
          commonPasswords={commonPasswordsArray}
          rules={["notCommon"]}
        />
      </div>
    </ExamplePage>
  );
}