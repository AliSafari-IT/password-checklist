"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function I18nPage() {
  const [password, setPassword] = useState("");

  const messages = {
    minLength: "Au moins {minLength} caractères",
    capital: "Au moins une lettre majuscule",
    lowercase: "Au moins une lettre minuscule",
    number: "Au moins un chiffre",
    specialChar: "Au moins un caractère spécial",
  };

  const strengthLabels: [string, string, string, string, string] = ["Très faible", "Faible", "Moyen", "Fort", "Très fort"];

  return (
    <ExamplePage
      title="Localization"
      description="Override rule messages and strength labels for internationalization."
      code={`const messages = {
  minLength: "Au moins {minLength} caractères",
  capital: "Au moins une lettre majuscule",
  // ...
};

<PasswordChecklist
  value={password}
  rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
  minLength={8}
  messages={messages}
  strengthLabels={strengthLabels}
  showStrengthMeter
/>`}
    >
      <PasswordField
        label="Mot de passe"
        value={password}
        onChange={setPassword}
        placeholder="Entrez un mot de passe..."
      />
      <PasswordChecklist
        value={password}
        rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
        minLength={8}
        messages={messages}
        strengthLabels={strengthLabels}
        showStrengthMeter
      />
    </ExamplePage>
  );
}