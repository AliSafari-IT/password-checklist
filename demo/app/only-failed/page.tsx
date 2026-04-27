"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function OnlyFailedPage() {
  const [password, setPassword] = useState("");

  return (
    <ExamplePage
      title="Only show failed"
      description="Display only the rules that are currently failing, for a cleaner UI."
      code={`<PasswordChecklist
  value={password}
  rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
  minLength={8}
  onlyShowFailed
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
        onlyShowFailed
      />
    </ExamplePage>
  );
}