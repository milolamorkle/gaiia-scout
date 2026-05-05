"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "@/lib/tokens";
import { fixture } from "@/lib/fixture";
import { IQ_FIBER } from "@/lib/isps";
import { getOutageCheckRemainingMs } from "@/lib/outageCheck";

const BOTTOM_NAV_HEIGHT = 56;

export function Home({
  onTroubleshoot,
}: {
  onTroubleshoot?: () => void;
} = {}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: tokens.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          height: 56,
          padding: `0 ${tokens.space16}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: tokens.bg,
          borderBottom: `1px solid ${tokens.border}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: tokens.space8 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IQ_FIBER.logoUrl}
            alt=""
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
          <span
            style={{ fontSize: 14, fontWeight: 500, color: tokens.textPrimary }}
          >
            IQ Fiber
          </span>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: BOTTOM_NAV_HEIGHT + 16,
        }}
      >
        <section
          style={{
            margin: tokens.space16,
            padding: tokens.space16,
            borderRadius: 12,
            backgroundColor: tokens.bgSecondary,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "2px 10px",
              borderRadius: 999,
              backgroundColor: tokens.successLight,
              color: tokens.success,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Active
          </span>
          <div
            style={{
              marginTop: tokens.space8,
              fontSize: 18,
              fontWeight: 600,
              color: tokens.textPrimary,
            }}
          >
            {fixture.subscriber.name}
          </div>
          <div
            style={{ marginTop: 2, fontSize: 14, color: tokens.textSecondary }}
          >
            {fixture.subscriber.plan}
          </div>
          <div
            style={{
              marginTop: tokens.space4,
              fontSize: 13,
              color: tokens.textMuted,
            }}
          >
            {fixture.subscriber.downloadSpeed.toLocaleString()} Mbps down /{" "}
            {fixture.subscriber.uploadSpeed.toLocaleString()} Mbps up
          </div>
        </section>

        <section
          style={{
            margin: `${tokens.space12} ${tokens.space16} 0`,
            padding: tokens.space16,
            borderRadius: 12,
            backgroundColor: tokens.bgSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: tokens.space12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                color: tokens.textMuted,
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              YOUR EQUIPMENT
            </div>
            <div
              style={{
                marginTop: tokens.space8,
                fontSize: 15,
                color: tokens.textPrimary,
                fontWeight: 500,
              }}
            >
              {fixture.cpe.model}
            </div>
            <div
              style={{ marginTop: 2, fontSize: 13, color: tokens.textMuted }}
            >
              Gateway / Router
            </div>
          </div>
          <RouterIcon />
        </section>

        <OutageStatusCard />

        <div style={{ padding: `${tokens.space20} ${tokens.space16} 0` }}>
          <button
            type="button"
            onClick={onTroubleshoot}
            style={{
              width: "100%",
              height: 56,
              borderRadius: 12,
              border: "none",
              backgroundColor: tokens.ispPrimary,
              color: tokens.textInverse,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Troubleshoot an Issue
          </button>
        </div>
      </div>
    </div>
  );
}

function OutageStatusCard() {
  const [ready, setReady] = useState(() => getOutageCheckRemainingMs() === 0);

  useEffect(() => {
    if (ready) return;
    const t = window.setTimeout(
      () => setReady(true),
      getOutageCheckRemainingMs(),
    );
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <section
      style={{
        margin: `${tokens.space12} ${tokens.space16} 0`,
        padding: tokens.space16,
        borderRadius: 12,
        backgroundColor: tokens.bgSecondary,
      }}
    >
      <div style={{ display: "grid" }}>
        <motion.div
          animate={{ opacity: ready ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            gridArea: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: tokens.space12,
            pointerEvents: ready ? "none" : "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.space8,
              minWidth: 0,
            }}
          >
            <span
              className="animate-pulse"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: tokens.ispPrimary,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 14, color: tokens.textSecondary }}>
              Checking for outages in your area…
            </span>
          </div>
          <div
            className="animate-spin"
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: `2px solid ${tokens.ispPrimaryLight}`,
              borderTopColor: tokens.ispPrimary,
              flexShrink: 0,
            }}
          />
        </motion.div>

        <motion.div
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            gridArea: "1 / 1",
            pointerEvents: ready ? "auto" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.space8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: tokens.success,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: tokens.textPrimary,
              }}
            >
              No outages in your area
            </span>
          </div>
          <div
            style={{
              marginTop: tokens.space4,
              marginLeft: 16,
              fontSize: 12,
              color: tokens.textMuted,
            }}
          >
            Last checked just now
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RouterIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke={tokens.textMuted}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <rect x="4" y="16" width="24" height="10" rx="2" />
      <path d="M10 16V9" />
      <path d="M22 16V6" />
      <circle cx="10" cy="21" r="0.8" fill={tokens.textMuted} stroke="none" />
      <circle cx="16" cy="21" r="0.8" fill={tokens.textMuted} stroke="none" />
    </svg>
  );
}
