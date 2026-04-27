"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import type { CustomRule } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

const customRule: CustomRule = {
  id: "no-username",
  label: "Does not contain 'admin' or 'user'",
  validate: (password) => !/(admin|user)/i.test(password),
};

export default function CustomRulesPage() {
  const [password, setPassword] = useState("");

  return (
    <ExamplePage
      title="Custom rules"
      description="Add synchronous or asynchronous validators. Custom rules integrate seamlessly with built-ins."
      code={`const customRule: CustomRule = {
  id: "no-username",
  label: "Does not contain 'admin' or 'user'",
  validate: (password) => !/(admin|user)/i.test(password),
};

<PasswordChecklist
  value={password}
  customRules={[customRule]}
/>`}
    >
      <PasswordField
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Enter a password..."
      />
      <PasswordChecklist value={password} customRules={[customRule]} />
    </ExamplePage>
  );
}