"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function SpecialCharsPage() {
  const [password, setPassword] = useState("");
  const [specialChars, setSpecialChars] = useState("!@#$%^&*");

  return (
    <ExamplePage
      title="Custom special characters"
      description="Restrict the special-character set to a custom list. Useful for systems with limited allowed characters."
      code={`<PasswordChecklist
  value={password}
  rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
  minLength={8}
  specialCharsList="!@#$%^&*"
/>`}
    >
      <div className="space-y-4">
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter a password..."
        />
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Allowed special characters
          </span>
          <input
            type="text"
            value={specialChars}
            onChange={(e) => setSpecialChars(e.target.value)}
            placeholder="!@#$%^&*"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <PasswordChecklist
          value={password}
          rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
          minLength={8}
          specialCharsList={specialChars}
        />
      </div>
    </ExamplePage>
  );
}