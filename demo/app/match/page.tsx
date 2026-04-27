"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function MatchPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ExamplePage
      title="Confirm password"
      description="Use the match rule to ensure two passwords are identical. Pass the confirm value as valueAgain."
      code={`<PasswordChecklist
  value={password}
  valueAgain={confirmPassword}
  rules={["match"]}
/>`}
    >
      <div className="space-y-4">
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
          rules={["match"]}
        />
      </div>
    </ExamplePage>
  );
}