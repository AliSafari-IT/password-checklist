# @asafarim/password-checklist

A robust, fully-typed React component and headless hook to display the
success or failure of password strength rules in real time as the user
types.

Inspired by [`react-password-checklist`](https://github.com/sators/react-password-checklist),
but with:

- **More built-in rules**: repeat detection, sequential detection, common-password blacklist, no-whitespace, personal-info match, plus all the originals.
- **Strength meter** with a 0–4 score and entropy estimate.
- **Async custom rules** (e.g. server-side breach checks) — they transition through a `pending` status so the UI never blocks.
- **Headless hook** (`usePasswordValidation`) for fully custom UIs.
- **Accessible by default**: ARIA live region, semantic list, screen-reader status text.
- **Theme-able via CSS variables**, no JS styling required.

## Install

```bash
pnpm add @asafarim/password-checklist
# peer deps
pnpm add react react-dom
```

## Quick start

```tsx
"use client";
import { useState } from "react";
import { PasswordChecklist } from "@asafarim/password-checklist";
import "@asafarim/password-checklist/default.css"; // opinionated theme
// or: "@asafarim/password-checklist/styles.css"   // structural only

export default function SignUp() {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <form>
      <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <PasswordChecklist
        rules={["minLength", "capital", "lowercase", "number", "specialChar", "match"]}
        minLength={8}
        value={pwd}
        valueAgain={confirm}
        showStrengthMeter
      />
    </form>
  );
}
```

## Built-in rules

| Rule id            | What it checks                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `minLength`        | `password.length >= minLength`                                                                       |
| `maxLength`        | `password.length <= maxLength`                                                                       |
| `lowercase`        | At least `minLowercase` (default 1) lowercase letters                                                |
| `capital`          | At least `minCapital` (default 1) uppercase letters                                                  |
| `number`           | At least `minNumber` (default 1) digits                                                              |
| `specialChar`      | At least `minSpecialChar` (default 1) chars from `specialCharsList`                                  |
| `letter`           | At least one alphabetic character                                                                    |
| `notEmpty`         | Password is not empty                                                                                |
| `match`            | `password === valueAgain` (and both non-empty)                                                       |
| `noWhitespace`     | No whitespace anywhere                                                                               |
| `noRepeat`         | No character repeated more than `maxRepeatedChars` (default 2) times in a row                        |
| `noSequential`     | No `maxSequentialChars` + 1 chars in ascending or descending sequence (e.g. `abcd`, `4321`)          |
| `notCommon`        | Not in the `commonPasswords` blacklist (defaults to a small built-in list — pass your own for prod)  |
| `notPersonalInfo`  | Does not contain any string from `personalInfo` (3+ chars each, case-insensitive substring match)    |

## Custom rules

```tsx
<PasswordChecklist
  rules={["minLength", "capital", "number"]}
  minLength={10}
  value={pwd}
  customRules={[
    {
      id: "no-username",
      label: "Does not contain your username",
      validate: (p) => !p.toLowerCase().includes(username.toLowerCase()),
    },
    {
      id: "not-pwned",
      label: "Not found in known breaches",
      // Async rules show a "pending" state until they resolve.
      validate: async (p) => {
        const res = await fetch(`/api/breach-check?pw=${encodeURIComponent(p)}`);
        const { breached } = await res.json();
        return !breached;
      },
      weight: 3,
    },
  ]}
/>
```

## Headless usage

```tsx
const { isValid, rules, strength, failedRules } = usePasswordValidation({
  value: pwd,
  rules: ["minLength", "capital", "specialChar"],
  minLength: 12,
});
```

## Props

See [`types.ts`](./src/types.ts) for the complete, documented type surface.

## License

MIT
