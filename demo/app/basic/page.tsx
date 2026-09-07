"use client";

import { ExamplePage } from "../../components/ExamplePage";
import { BasicRulesDemo } from "../../components/BasicRulesDemo";

export default function BasicPage() {
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
      <BasicRulesDemo />
    </ExamplePage>
  );
}