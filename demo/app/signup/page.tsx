"use client";

import { useState } from "react";
import { PasswordChecklist, usePasswordValidation } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isValid } = usePasswordValidation({
    value: password,
    valueAgain: confirmPassword,
    rules: ["minLength", "capital", "lowercase", "number", "specialChar", "match"],
    minLength: 8,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      alert("Signup successful!");
    }
  };

  return (
    <ExamplePage
      title="Signup form integration"
      description="Gate form submission on password validity. Use the hook to access isValid."
      code={`const { isValid } = usePasswordValidation({
  value: password,
  valueAgain: confirmPassword,
  rules: ["minLength", "capital", "lowercase", "number", "specialChar", "match"],
});

<form onSubmit={handleSubmit}>
  <button disabled={!isValid}>Sign up</button>
</form>`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter a password..."
        />
        <PasswordField
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Re-enter the password..."
          autoComplete="new-password"
        />
        <PasswordChecklist
          value={password}
          valueAgain={confirmPassword}
          rules={["minLength", "capital", "lowercase", "number", "specialChar", "match"]}
          minLength={8}
          onlyShowFailed
        />
        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign up
        </button>
      </form>
    </ExamplePage>
  );
}