"use client";

import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import { ExamplePage } from "../../components/ExamplePage";
import { PasswordField } from "../../components/PasswordField";

export default function RtlPage() {
  const [password, setPassword] = useState("");

  return (
    <ExamplePage
      title="Right-to-left"
      description="The component supports RTL layouts. Add CSS to flip icons and text direction."
      code={`.rtl .pc-checklist {
  direction: rtl;
}

.rtl .pc-checklist-item::before {
  transform: scaleX(-1);
}`}
    >
      <div className="rtl space-y-4" dir="rtl">
        <PasswordField
          label="كلمة المرور"
          value={password}
          onChange={setPassword}
          placeholder="أدخل كلمة مرور..."
        />
        <PasswordChecklist
          value={password}
          rules={["minLength", "capital", "lowercase", "number", "specialChar"]}
          minLength={8}
        />
      </div>
      <style jsx>{`
        .rtl .pc-checklist {
          direction: rtl;
        }
        .rtl .pc-checklist-item::before {
          transform: scaleX(-1);
        }
      `}</style>
    </ExamplePage>
  );
}