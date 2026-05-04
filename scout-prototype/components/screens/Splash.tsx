"use client";

import { tokens } from "@/lib/tokens";

export function Splash({ onContinue }: { onContinue: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: tokens.gaiiaPrimary,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: `${tokens.space48} ${tokens.space24} 0`,
        }}
      >
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 83.03 33.03 A 24 24 0 0 1 116.97 33.03"
            stroke={tokens.gaiiaForeground}
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M 88.69 38.69 A 16 16 0 0 1 111.31 38.69"
            stroke={tokens.gaiiaForeground}
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M 94.34 44.34 A 8 8 0 0 1 105.66 44.34"
            stroke={tokens.gaiiaForeground}
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <circle cx="100" cy="50" r="2.25" fill={tokens.gaiiaForeground} />
          <path
            d="M 55 100 L 100 65 L 145 100 L 145 140 L 55 140 Z"
            stroke={tokens.gaiiaForeground}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M 88 108 L 112 108 L 112 120 Q 112 130 100 134 Q 88 130 88 120 Z"
            fill="none"
            stroke={tokens.gaiiaForeground}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 94 119.5 L 98 124 L 107 114.5"
            stroke={tokens.gaiiaForeground}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            marginTop: tokens.space24,
            color: tokens.gaiiaForeground,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          scout
        </div>
        <div
          style={{
            marginTop: tokens.space12,
            color: tokens.gaiiaForeground,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Internet support that actually helps.
        </div>
      </div>
      <div style={{ padding: `0 ${tokens.space24} ${tokens.space32}` }}>
        <button
          type="button"
          onClick={onContinue}
          style={{
            width: "100%",
            height: 56,
            borderRadius: 12,
            border: `1.5px solid ${tokens.gaiiaForeground}`,
            backgroundColor: tokens.gaiiaForeground,
            color: tokens.gaiiaPrimary,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
