"use client";

import { tokens } from "@/lib/tokens";
import { fixture } from "@/lib/fixture";
import { IQ_FIBER } from "@/lib/isps";
import { BottomNav, type Tab } from "@/components/BottomNav";

const BOTTOM_NAV_HEIGHT = 56;

export function Account({
  onNavigate,
  onLogout,
}: {
  onNavigate?: (tab: Tab) => void;
  onLogout?: () => void;
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
          justifyContent: "space-between",
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
        <button
          type="button"
          onClick={onLogout}
          style={{
            border: "none",
            background: "transparent",
            color: tokens.ispPrimary,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            padding: `${tokens.space8} 0`,
          }}
        >
          Log out
        </button>
      </header>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: BOTTOM_NAV_HEIGHT + 16,
        }}
      >
        <h1
          style={{
            margin: 0,
            padding: `${tokens.space20} ${tokens.space16} ${tokens.space16}`,
            fontSize: 22,
            fontWeight: 700,
            color: tokens.textPrimary,
          }}
        >
          Account
        </h1>

        <section
          style={{
            margin: `0 ${tokens.space16}`,
            padding: tokens.space16,
            borderRadius: 12,
            backgroundColor: tokens.bgSecondary,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: tokens.textMuted,
              letterSpacing: "0.08em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Subscriber
          </div>
          <div
            style={{
              marginTop: tokens.space8,
              fontSize: 20,
              fontWeight: 700,
              color: tokens.textPrimary,
            }}
          >
            {fixture.subscriber.name}
          </div>
          <div
            style={{
              marginTop: tokens.space4,
              fontSize: 14,
              color: tokens.textSecondary,
            }}
          >
            Account {fixture.account.id}
          </div>
          <div
            style={{
              marginTop: tokens.space4,
              fontSize: 13,
              color: tokens.textMuted,
            }}
          >
            Customer since {fixture.account.since}
          </div>
        </section>

        <section
          style={{
            margin: `${tokens.space12} ${tokens.space16} 0`,
            padding: tokens.space16,
            borderRadius: 12,
            backgroundColor: tokens.bgSecondary,
          }}
        >
          <AccountRow label="Status" value={fixture.subscriber.accountStatus} />
          <AccountRow label="Plan" value={fixture.subscriber.plan} />
          <AccountRow
            label="Speed"
            value={`${fixture.subscriber.downloadSpeed.toLocaleString()} / ${fixture.subscriber.uploadSpeed.toLocaleString()} Mbps`}
          />
          <AccountRow label="Equipment" value={fixture.cpe.shortName} isLast />
        </section>

        <section
          style={{
            margin: `${tokens.space12} ${tokens.space16} 0`,
            padding: tokens.space16,
            borderRadius: 12,
            backgroundColor: tokens.bgSecondary,
          }}
        >
          <AccountRow
            label="Next bill"
            value={fixture.account.nextBillingAmount}
          />
          <AccountRow
            label="Due date"
            value={fixture.account.nextBillingDate}
          />
          <AccountRow
            label="Payment"
            value={fixture.account.paymentMethod}
            isLast
          />
        </section>
      </div>

      <BottomNav active="account" onSelect={onNavigate} />
    </div>
  );
}

function AccountRow({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        padding: isLast ? "0" : `0 0 ${tokens.space12}`,
        marginBottom: isLast ? 0 : tokens.space12,
        borderBottom: isLast ? "none" : `1px solid ${tokens.border}`,
        display: "flex",
        justifyContent: "space-between",
        gap: tokens.space16,
      }}
    >
      <span style={{ fontSize: 14, color: tokens.textSecondary }}>{label}</span>
      <span
        style={{
          fontSize: 14,
          color: tokens.textPrimary,
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}
