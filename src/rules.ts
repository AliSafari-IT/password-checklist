import type { ReactNode } from "react";
import type {
  BuiltInRuleId,
  PasswordChecklistConfig,
  RuleState,
  ValidatorContext,
} from "./types";
import { DEFAULT_COMMON_PASSWORDS } from "./common-passwords";

export const DEFAULT_SPECIAL_CHARS =
  "!@#$%^&*()-_=+[]{};:'\",.<>/?\\|~`";

/** Default English labels for built-in rules. */
export const DEFAULT_MESSAGES: Record<BuiltInRuleId, ReactNode> = {
  minLength: "At least {minLength} characters",
  maxLength: "No more than {maxLength} characters",
  lowercase: "At least one lowercase letter",
  capital: "At least one uppercase letter",
  number: "At least one number",
  specialChar: "At least one special character",
  letter: "At least one letter",
  notEmpty: "Password cannot be empty",
  match: "Passwords match",
  noWhitespace: "No whitespace characters",
  noRepeat: "No character repeated more than {maxRepeatedChars} times in a row",
  noSequential:
    "No sequential characters longer than {maxSequentialChars} (e.g. abcd, 1234)",
  notCommon: "Not a commonly-used password",
  notPersonalInfo: "Does not contain personal information",
};

export const DEFAULT_STRENGTH_LABELS: [
  string,
  string,
  string,
  string,
  string,
] = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];

const interpolate = (
  template: ReactNode,
  vars: Record<string, string | number | undefined>,
): ReactNode => {
  if (typeof template !== "string") return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? `{${key}}` : String(vars[key]),
  );
};

/* ------------------------------------------------------------------ */
/* Sync validators                                                     */
/* ------------------------------------------------------------------ */

const countMatches = (pwd: string, pattern: RegExp): number =>
  (pwd.match(pattern) || []).length;

const escapeRegex = (s: string): string =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const hasRepeat = (pwd: string, max: number): boolean => {
  if (max < 1) return false;
  // disallow more than `max` of the same char in a row
  const re = new RegExp(`(.)\\1{${max},}`);
  return re.test(pwd);
};

const hasSequential = (pwd: string, max: number): boolean => {
  if (max < 2 || pwd.length < max + 1) return false;
  const lower = pwd.toLowerCase();
  for (let i = 0; i <= lower.length - (max + 1); i++) {
    let asc = true;
    let desc = true;
    for (let j = 1; j <= max; j++) {
      const cur = lower.charCodeAt(i + j);
      const prev = lower.charCodeAt(i + j - 1);
      if (cur !== prev + 1) asc = false;
      if (cur !== prev - 1) desc = false;
      if (!asc && !desc) break;
    }
    if (asc || desc) return true;
  }
  return false;
};

const containsPersonalInfo = (
  pwd: string,
  personal: readonly string[],
): boolean => {
  if (!personal.length) return false;
  const lower = pwd.toLowerCase();
  return personal.some((p) => {
    const trimmed = p.trim().toLowerCase();
    return trimmed.length >= 3 && lower.includes(trimmed);
  });
};

/** Evaluate a single built-in rule synchronously. */
export const evaluateBuiltIn = (
  id: BuiltInRuleId,
  pwd: string,
  ctx: ValidatorContext,
  config: PasswordChecklistConfig,
): boolean => {
  switch (id) {
    case "minLength":
      return pwd.length >= (ctx.minLength ?? 0);
    case "maxLength":
      return ctx.maxLength == null || pwd.length <= ctx.maxLength;
    case "lowercase":
      return countMatches(pwd, /[a-z]/g) >= (config.minLowercase ?? 1);
    case "capital":
      return countMatches(pwd, /[A-Z]/g) >= (config.minCapital ?? 1);
    case "number":
      return countMatches(pwd, /[0-9]/g) >= (config.minNumber ?? 1);
    case "specialChar": {
      const chars = ctx.specialChars;
      const re = new RegExp(`[${escapeRegex(chars)}]`, "g");
      return countMatches(pwd, re) >= (config.minSpecialChar ?? 1);
    }
    case "letter":
      return /[a-zA-Z]/.test(pwd);
    case "notEmpty":
      return pwd.length > 0 && (ctx.valueAgain ?? "").length > 0
        ? true
        : pwd.length > 0;
    case "match":
      return ctx.valueAgain !== undefined && pwd.length > 0 && pwd === ctx.valueAgain;
    case "noWhitespace":
      return !/\s/.test(pwd);
    case "noRepeat":
      return !hasRepeat(pwd, config.maxRepeatedChars ?? 2);
    case "noSequential":
      return !hasSequential(pwd, config.maxSequentialChars ?? 3);
    case "notCommon": {
      const list = config.commonPasswords ?? DEFAULT_COMMON_PASSWORDS;
      return !list.some((c) => c.toLowerCase() === pwd.toLowerCase());
    }
    case "notPersonalInfo":
      return !containsPersonalInfo(pwd, ctx.personalInfo ?? []);
    default:
      return true;
  }
};

/** Resolve the label for a built-in rule (handles interpolation). */
export const resolveLabel = (
  id: BuiltInRuleId,
  config: PasswordChecklistConfig,
): ReactNode => {
  const tpl = config.messages?.[id] ?? DEFAULT_MESSAGES[id];
  return interpolate(tpl, {
    minLength: config.minLength,
    maxLength: config.maxLength,
    maxRepeatedChars: config.maxRepeatedChars ?? 2,
    maxSequentialChars: config.maxSequentialChars ?? 3,
  });
};

/** Default weight for a built-in rule contributing to the strength score. */
export const builtInWeight = (id: BuiltInRuleId): number => {
  switch (id) {
    case "minLength":
    case "specialChar":
    case "match":
      return 2;
    case "notCommon":
    case "notPersonalInfo":
      return 2;
    case "noSequential":
    case "noRepeat":
      return 1.5;
    default:
      return 1;
  }
};

/** Build the initial RuleState array (status pre-evaluated synchronously). */
export const buildRuleStates = (
  config: PasswordChecklistConfig,
  ctx: ValidatorContext,
): RuleState[] => {
  const ids = config.rules ?? [];
  const builtIn: RuleState[] = ids.map((id) => ({
    id,
    label: resolveLabel(id, config),
    status: evaluateBuiltIn(id, config.value, ctx, config) ? "valid" : "invalid",
    weight: builtInWeight(id),
  }));
  const custom: RuleState[] = (config.customRules ?? []).map((rule) => ({
    id: rule.id,
    label: rule.label,
    status: "pending", // resolved by the hook
    weight: rule.weight ?? 1,
  }));
  return [...builtIn, ...custom];
};

/** Char-class size for entropy calculation. */
const charsetSize = (pwd: string, specialChars: string): number => {
  let size = 0;
  if (/[a-z]/.test(pwd)) size += 26;
  if (/[A-Z]/.test(pwd)) size += 26;
  if (/[0-9]/.test(pwd)) size += 10;
  const specialRe = new RegExp(`[${escapeRegex(specialChars)}]`);
  if (specialRe.test(pwd)) size += specialChars.length;
  if (/\s/.test(pwd)) size += 1;
  // Treat any other unicode char as +20 (rough heuristic)
  if (/[^\x20-\x7E]/.test(pwd)) size += 20;
  return Math.max(size, 1);
};

export const estimateEntropyBits = (
  pwd: string,
  specialChars: string,
): number => {
  if (!pwd) return 0;
  const size = charsetSize(pwd, specialChars);
  return Math.round(pwd.length * Math.log2(size) * 100) / 100;
};

/** Map entropy + rule pass ratio to a 0..4 score. */
export const computeScore = (
  rulesPassedRatio: number,
  entropyBits: number,
): 0 | 1 | 2 | 3 | 4 => {
  // Two signals: rule completeness and entropy.
  const ruleScore = rulesPassedRatio >= 1 ? 4 : Math.floor(rulesPassedRatio * 4);
  let entScore: 0 | 1 | 2 | 3 | 4;
  if (entropyBits >= 80) entScore = 4;
  else if (entropyBits >= 60) entScore = 3;
  else if (entropyBits >= 40) entScore = 2;
  else if (entropyBits >= 25) entScore = 1;
  else entScore = 0;
  // Combined: cap to the lower of the two so users must satisfy both.
  return Math.min(ruleScore, entScore) as 0 | 1 | 2 | 3 | 4;
};
