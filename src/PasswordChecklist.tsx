"use client";

import type { CSSProperties, ReactNode } from "react";
import type {
  PasswordChecklistProps,
  RuleState,
  RuleStatus,
} from "./types";
import { usePasswordValidation } from "./usePasswordValidation";

const ROOT_CLASS = "pc-checklist";

const DefaultValidIcon = (): ReactNode => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    className="pc-icon pc-icon--valid"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M6.173 12.414 2.35 8.59l1.414-1.414 2.41 2.41 5.66-5.66 1.414 1.414-7.075 7.075z"
    />
  </svg>
);

const DefaultInvalidIcon = (): ReactNode => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    className="pc-icon pc-icon--invalid"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M11.314 3.272 8 6.586 4.686 3.272 3.272 4.686 6.586 8l-3.314 3.314 1.414 1.414L8 9.414l3.314 3.314 1.414-1.414L9.414 8l3.314-3.314z"
    />
  </svg>
);

const DefaultPendingIcon = (): ReactNode => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    className="pc-icon pc-icon--pending"
    focusable="false"
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="14 14"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const statusClass = (status: RuleStatus): string =>
  status === "valid"
    ? "pc-item--valid"
    : status === "pending"
      ? "pc-item--pending"
      : "pc-item--invalid";

/**
 * `<PasswordChecklist />` renders a live-updating list of password rule
 * statuses. Pair it with a controlled `<input type="password" />`.
 */
export function PasswordChecklist(props: PasswordChecklistProps): ReactNode {
  const {
    onlyShowFailed = false,
    showStrengthMeter = false,
    hideOnValid = false,
    validIcon,
    invalidIcon,
    pendingIcon,
    className,
    style,
    listClassName,
    itemClassName,
    rtl = false,
    ariaLive = "polite",
    ...config
  } = props;

  const result = usePasswordValidation(config);

  if (hideOnValid && result.isValid) return null;

  const visibleRules: RuleState[] = onlyShowFailed
    ? result.failedRules
    : result.rules;

  const rootClass = [
    ROOT_CLASS,
    rtl ? `${ROOT_CLASS}--rtl` : "",
    result.isValid ? `${ROOT_CLASS}--valid` : `${ROOT_CLASS}--invalid`,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const meterStyle: CSSProperties = {
    // Provide a CSS variable for theming the bar fill.
    ["--pc-meter-percent" as string]: `${result.strength.percent}%`,
    ["--pc-meter-score" as string]: result.strength.score,
  };

  return (
    <div
      className={rootClass}
      style={style}
      dir={rtl ? "rtl" : undefined}
      data-valid={result.isValid}
      data-score={result.strength.score}
    >
      {showStrengthMeter && (
        <div
          className="pc-meter"
          style={meterStyle}
          aria-label={`Password strength: ${result.strength.label}`}
        >
          <div className="pc-meter__bar">
            <div
              className={`pc-meter__fill pc-meter__fill--score-${result.strength.score}`}
            />
          </div>
          <div className="pc-meter__meta">
            <span className="pc-meter__label">{result.strength.label}</span>
            <span className="pc-meter__entropy">
              ~{result.strength.entropyBits} bits
            </span>
          </div>
        </div>
      )}

      <ul
        className={["pc-list", listClassName ?? ""].filter(Boolean).join(" ")}
        aria-live={ariaLive}
      >
        {visibleRules.map((rule) => {
          const icon =
            rule.status === "valid"
              ? (validIcon ?? <DefaultValidIcon />)
              : rule.status === "pending"
                ? (pendingIcon ?? <DefaultPendingIcon />)
                : (invalidIcon ?? <DefaultInvalidIcon />);
          return (
            <li
              key={rule.id}
              className={[
                "pc-item",
                statusClass(rule.status),
                itemClassName ?? "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-rule-id={rule.id}
              data-status={rule.status}
            >
              <span className="pc-item__icon" aria-hidden="true">
                {icon}
              </span>
              <span className="pc-item__label">{rule.label}</span>
              <span className="pc-sr-only">
                {rule.status === "valid"
                  ? " — passes"
                  : rule.status === "pending"
                    ? " — checking"
                    : " — fails"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
