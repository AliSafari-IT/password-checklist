"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import type { CustomRule } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

// Simulate a breached password check
const breachedPasswords = ["password123", "123456", "qwerty"];

const asyncRule: CustomRule = {
  id: "not-breached",
  label: "Not found in breached password database",
  validate: async (password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return !breachedPasswords.includes(password.toLowerCase());
  },
};

export default function AsyncPage() {
  const [password, setPassword] = useState("");

  return (
    <ExamplePage
      title="Async rule"
      description="Async validators show a pending state while resolving. Useful for server-side checks like breach detection."
      code={`const asyncRule: CustomRule = {
  id: "not-breached",
  label: "Not found in breached password database",
  validate: async (password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return !breachedPasswords.includes(password.toLowerCase());
  },
};

<PasswordChecklist
  value={password}
  customRules={[asyncRule]}
/>`}
    >
      <PasswordField
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Try 'password123'..."
      />
      <PasswordChecklist value={password} customRules={[asyncRule]} />
    </ExamplePage>
  );
}