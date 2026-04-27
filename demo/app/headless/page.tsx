"use client";

import { useState } from "react";
import { usePasswordValidation } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function HeadlessPage() {
  const [password, setPassword] = useState("");

  const { isValid, rules, strength } = usePasswordValidation({
    value: password,
    rules: ["minLength", "capital", "lowercase", "number", "specialChar"],
    minLength: 8,
  });

  return (
    <ExamplePage
      title="Headless hook"
      description="Use usePasswordValidation() for complete control over the UI. No component rendered."
      code={`const { isValid, rules, strength } = usePasswordValidation({
  value: password,
  rules: ["minLength", "capital", "lowercase", "number", "specialChar"],
  minLength: 8,
});

// Build your own UI...`}
    >
      <PasswordField
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Enter a password..."
      />

      <div className="mt-4 space-y-2">
        <div className="text-sm">
          <strong>Strength:</strong> {strength.label} ({strength.score}/4, {strength.entropyBits.toFixed(1)} bits)
        </div>
        <div className="text-sm">
          <strong>Valid:</strong> {isValid ? "Yes" : "No"}
        </div>
        <div className="space-y-1">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-2 text-sm">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  rule.status === "valid"
                    ? "bg-green-500"
                    : rule.status === "invalid"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              />
              {rule.label}
            </div>
          ))}
        </div>
      </div>
    </ExamplePage>
  );
}