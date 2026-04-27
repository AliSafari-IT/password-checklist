"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function BasicPage() {
  const [password, setPassword] = useState("");

  return (
    <ExamplePage
      title="Basic rules"
      description="The default set of rules: minimum length, mixed case, numbers, and special characters."
      code={`<PasswordChecklist
  value={password}
  rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
  minLength={8}
/>`}
    >
      <PasswordField
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Enter a password..."
      />
      <PasswordChecklist
        value={password}
        rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
        minLength={8}
      />
    </ExamplePage>
  );
}