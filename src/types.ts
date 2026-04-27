import type { ReactNode } from "react";

/** Built-in rule identifiers. */
export type BuiltInRuleId =
  | "minLength"
  | "maxLength"
  | "lowercase"
  | "capital"
  | "number"
  | "specialChar"
  | "letter"
  | "notEmpty"
  | "match"
  | "noWhitespace"
  | "noRepeat"
  | "noSequential"
  | "notCommon"
  | "notPersonalInfo";

/** A rule id is either built-in or a user-defined string. */
export type RuleId = BuiltInRuleId | (string & {});

/** Status of a single rule for the current password. */
export type RuleStatus = "valid" | "invalid" | "pending";

/**
 * A custom rule supplied by the consumer. The `validate` callback may be
 * synchronous or return a Promise; promise-based rules transition through
 * the `pending` status while resolving.
 */
export interface CustomRule {
  id: string;
  /** Label shown in the checklist for this rule. */
  label: ReactNode;
  /** Sync or async validator. Returns true when the rule passes. */
  validate: (
    password: string,
    context: ValidatorContext,
  ) => boolean | Promise<boolean>;
  /** Optional weight contributed to the strength score (default: 1). */
  weight?: number;
}

/** Context passed to every validator. */
export interface ValidatorContext {
  /** The other password to match against (if any). */
  valueAgain?: string;
  /** Personal info that the password must not contain. */
  personalInfo?: readonly string[];
  /** The user-configured special-character set. */
  specialChars: string;
  /** The minimum length config (if any). */
  minLength?: number;
  /** The maximum length config (if any). */
  maxLength?: number;
}

/** State for a single rule after evaluation. */
export interface RuleState {
  id: RuleId;
  label: ReactNode;
  status: RuleStatus;
  weight: number;
}

/** Strength result derived from rule outcomes + entropy. */
export interface PasswordStrength {
  /** 0–4 score: 0 very weak, 4 very strong. */
  score: 0 | 1 | 2 | 3 | 4;
  /** Localized label (default: English). */
  label: string;
  /** Approximate entropy in bits. */
  entropyBits: number;
  /** Percentage 0–100, derived from rules passed weighted. */
  percent: number;
}

/** Result emitted by the validator each render. */
export interface ValidationResult {
  password: string;
  isValid: boolean;
  rules: RuleState[];
  failedRules: RuleState[];
  passedRules: RuleState[];
  strength: PasswordStrength;
}

/**
 * Configuration accepted by both the headless hook and the component.
 * Every field is optional except `value`.
 */
export interface PasswordChecklistConfig {
  /** Current password value (controlled). */
  value: string;
  /** Confirm-password value, required when `match` is enabled. */
  valueAgain?: string;

  /** Which built-in rules to evaluate, in render order. */
  rules?: BuiltInRuleId[];

  /** Length bounds. */
  minLength?: number;
  maxLength?: number;

  /** Special character set. Default: `!@#$%^&*()-_=+[]{};:'\",.<>/?\\|~\`` */
  specialCharsList?: string;

  /** Minimum required count for character class rules. Default: 1. */
  minLowercase?: number;
  minCapital?: number;
  minNumber?: number;
  minSpecialChar?: number;

  /** Repeat / sequential / common-word options. */
  maxRepeatedChars?: number;
  maxSequentialChars?: number;
  commonPasswords?: readonly string[];

  /** Personal info the password must not contain (case-insensitive). */
  personalInfo?: readonly string[];

  /** User-defined custom rules, evaluated alongside built-ins. */
  customRules?: CustomRule[];

  /** Localized labels for built-in rules. */
  messages?: Partial<Record<BuiltInRuleId, ReactNode>>;

  /** Localized strength labels (score 0..4). */
  strengthLabels?: [string, string, string, string, string];

  /** Called every time the result changes. */
  onChange?: (result: ValidationResult) => void;
}

/** Component-only props (extends the config). */
export interface PasswordChecklistProps extends PasswordChecklistConfig {
  /** Show only the rules that are currently failing. Default: false. */
  onlyShowFailed?: boolean;

  /** Show the strength meter at the top. Default: false. */
  showStrengthMeter?: boolean;

  /** Hide the entire checklist when every rule passes. Default: false. */
  hideOnValid?: boolean;

  /** Custom icon node for valid rules. */
  validIcon?: ReactNode;
  /** Custom icon node for invalid rules. */
  invalidIcon?: ReactNode;
  /** Custom icon node for pending (async) rules. */
  pendingIcon?: ReactNode;

  /** Override the root className. */
  className?: string;
  /** Inline style on the root element. */
  style?: React.CSSProperties;
  /** Override the className applied to the rule list. */
  listClassName?: string;
  /** Override the className applied to each rule item. */
  itemClassName?: string;

  /**
   * RTL flag — adds `dir="rtl"` and a flag class. Default: false.
   */
  rtl?: boolean;

  /**
   * ARIA live politeness for status announcements. Default: "polite".
   */
  ariaLive?: "polite" | "assertive" | "off";
}
