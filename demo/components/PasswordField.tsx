"use client";

import { useId, useState } from "react";

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete = "new-password",
}: PasswordFieldProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-20 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-0 mr-2 my-1 rounded-md px-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
