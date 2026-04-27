"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  PasswordChecklistConfig,
  PasswordStrength,
  RuleState,
  ValidationResult,
  ValidatorContext,
} from "./types";
import {
  DEFAULT_SPECIAL_CHARS,
  DEFAULT_STRENGTH_LABELS,
  buildRuleStates,
  computeScore,
  estimateEntropyBits,
} from "./rules";

const stableArr = <T,>(arr: readonly T[] | undefined): readonly T[] =>
  arr ?? EMPTY;
const EMPTY: readonly never[] = Object.freeze([]);

/**
 * Headless hook that returns the current rule states, strength, and overall
 * validity. Async custom rules transition through the `pending` status while
 * resolving and then settle to `valid` / `invalid`.
 */
export function usePasswordValidation(
  config: PasswordChecklistConfig,
): ValidationResult {
  const specialChars = config.specialCharsList ?? DEFAULT_SPECIAL_CHARS;
  const personalInfo = stableArr(config.personalInfo);

  const ctx: ValidatorContext = useMemo(
    () => ({
      valueAgain: config.valueAgain,
      personalInfo,
      specialChars,
      minLength: config.minLength,
      maxLength: config.maxLength,
    }),
    [
      config.valueAgain,
      personalInfo,
      specialChars,
      config.minLength,
      config.maxLength,
    ],
  );

  // Build the synchronous initial rule states.
  const initial = useMemo(
    () => buildRuleStates(config, ctx),
    // We intentionally re-evaluate when value or any meaningful config field changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      config.value,
      config.valueAgain,
      JSON.stringify(config.rules ?? []),
      config.minLength,
      config.maxLength,
      specialChars,
      config.minLowercase,
      config.minCapital,
      config.minNumber,
      config.minSpecialChar,
      config.maxRepeatedChars,
      config.maxSequentialChars,
      JSON.stringify(config.commonPasswords ?? null),
      JSON.stringify(personalInfo),
      // We don't include customRules here because they are resolved below.
      (config.customRules ?? []).map((r) => r.id).join("|"),
      JSON.stringify(config.messages ?? null),
    ],
  );

  const [ruleStates, setRuleStates] = useState<RuleState[]>(initial);
  // Counter to discard stale async results.
  const runRef = useRef(0);

  useEffect(() => {
    setRuleStates(initial);
  }, [initial]);

  useEffect(() => {
    const customRules = config.customRules ?? [];
    if (customRules.length === 0) return;
    const runId = ++runRef.current;
    let cancelled = false;

    customRules.forEach((rule) => {
      let outcome: boolean | Promise<boolean>;
      try {
        outcome = rule.validate(config.value, ctx);
      } catch (err) {
        // Treat thrown sync errors as invalid.
        // eslint-disable-next-line no-console
        console.error(`[password-checklist] custom rule "${rule.id}" threw`, err);
        outcome = false;
      }

      if (typeof outcome === "boolean") {
        if (cancelled || runRef.current !== runId) return;
        setRuleStates((prev) =>
          prev.map((r) =>
            r.id === rule.id
              ? { ...r, status: outcome ? "valid" : "invalid" }
              : r,
          ),
        );
        return;
      }

      // Async path: mark pending immediately, settle when promise resolves.
      setRuleStates((prev) =>
        prev.map((r) => (r.id === rule.id ? { ...r, status: "pending" } : r)),
      );
      outcome
        .then((result) => {
          if (cancelled || runRef.current !== runId) return;
          setRuleStates((prev) =>
            prev.map((r) =>
              r.id === rule.id
                ? { ...r, status: result ? "valid" : "invalid" }
                : r,
            ),
          );
        })
        .catch((err: unknown) => {
          if (cancelled || runRef.current !== runId) return;
          // eslint-disable-next-line no-console
          console.error(
            `[password-checklist] async rule "${rule.id}" rejected`,
            err,
          );
          setRuleStates((prev) =>
            prev.map((r) =>
              r.id === rule.id ? { ...r, status: "invalid" } : r,
            ),
          );
        });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.value,
    config.valueAgain,
    ctx,
    (config.customRules ?? []).map((r) => r.id).join("|"),
  ]);

  // Strength score
  const strengthLabels = config.strengthLabels ?? DEFAULT_STRENGTH_LABELS;
  const strength: PasswordStrength = useMemo(() => {
    const totalWeight = ruleStates.reduce((sum, r) => sum + r.weight, 0);
    const passedWeight = ruleStates
      .filter((r) => r.status === "valid")
      .reduce((sum, r) => sum + r.weight, 0);
    const ratio = totalWeight === 0 ? 0 : passedWeight / totalWeight;
    const entropyBits = estimateEntropyBits(config.value, specialChars);
    const score = computeScore(ratio, entropyBits);
    return {
      score,
      label: strengthLabels[score] ?? "",
      entropyBits,
      percent: Math.round(ratio * 100),
    };
  }, [ruleStates, config.value, specialChars, strengthLabels]);

  const failedRules = ruleStates.filter((r) => r.status !== "valid");
  const passedRules = ruleStates.filter((r) => r.status === "valid");
  const isValid =
    ruleStates.length > 0 && ruleStates.every((r) => r.status === "valid");

  const result: ValidationResult = {
    password: config.value,
    isValid,
    rules: ruleStates,
    failedRules,
    passedRules,
    strength,
  };

  // Stable onChange firing
  const onChangeRef = useRef(config.onChange);
  onChangeRef.current = config.onChange;
  const lastSerialized = useRef<string>("");
  useEffect(() => {
    const serialized = JSON.stringify({
      v: result.password,
      i: result.isValid,
      r: result.rules.map((r) => [r.id, r.status]),
      s: result.strength.score,
    });
    if (serialized !== lastSerialized.current) {
      lastSerialized.current = serialized;
      onChangeRef.current?.(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    result.password,
    result.isValid,
    result.strength.score,
    ruleStates.map((r) => `${r.id}:${r.status}`).join("|"),
  ]);

  return result;
}
