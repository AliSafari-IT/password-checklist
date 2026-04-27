"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function StrengthPage() {
  const [password, setPassword] = useState("");

  return (
    <ExamplePage
      title="Strength meter"
      description="Display a 0–4 score with entropy estimate. Enable with showStrengthMeter."
      code={`<PasswordChecklist
  value={password}
  rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
  minLength={8}
  showStrengthMeter
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
        showStrengthMeter
      />
    </ExamplePage>
  );
}