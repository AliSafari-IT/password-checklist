"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function RepeatSequentialPage() {
  const [password, setPassword] = useState("");
  const [maxRepeated, setMaxRepeated] = useState(2);
  const [maxSequential, setMaxSequential] = useState(3);

  return (
    <ExamplePage
      title="Repeat & sequential"
      description="Detect repeated characters (aaaa) and sequential patterns (abcd, 1234)."
      code={`<PasswordChecklist
  value={password}
  maxRepeatedChars={2}
  maxSequentialChars={3}
  rules={["noRepeat", "noSequential"]}
/>`}
    >
      <div className="space-y-4">
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Try 'aaaa' or 'abcd'..."
        />
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Max repeated chars
            </span>
            <input
              type="number"
              value={maxRepeated}
              onChange={(e) => setMaxRepeated(Number(e.target.value))}
              min="1"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Max sequential chars
            </span>
            <input
              type="number"
              value={maxSequential}
              onChange={(e) => setMaxSequential(Number(e.target.value))}
              min="1"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        </div>
        <PasswordChecklist
          value={password}
          maxRepeatedChars={maxRepeated}
          maxSequentialChars={maxSequential}
          rules={["noRepeat", "noSequential"]}
        />
      </div>
    </ExamplePage>
  );
}