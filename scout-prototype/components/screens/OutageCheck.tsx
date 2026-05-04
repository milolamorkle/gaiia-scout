"use client";

import { useEffect } from "react";
import { tokens } from "@/lib/tokens";
import { EscapeHatch } from "@/components/EscapeHatch";

const OUTAGE_CHECK_DELAY_MS = 3500;

export function OutageCheck({ onAdvance }: { onAdvance: () => void }) {
  useEffect(() => {
    const id = setTimeout(onAdvance, OUTAGE_CHECK_DELAY_MS);
    return () => clearTimeout(id);
  }, [onAdvance]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: tokens.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: tokens.space20,
      }}
    >
      <EscapeHatch />
      <div
        className="animate-pulse"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: tokens.ispPrimary,
        }}
      />
      <div
        style={{
          fontSize: tokens.fontBase,
          color: tokens.textSecondary,
          textAlign: "center",
          padding: `0 ${tokens.space24}`,
        }}
      >
        Double-checking there&rsquo;s no outage in your area…
      </div>
    </div>
  );
}
