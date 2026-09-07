"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { PasswordField } from "./PasswordField";

export function BasicRulesDemo() {
  const [password, setPassword] = useState("");

  return (
    <div className="basic-demo">
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
    </div>
  );
}
