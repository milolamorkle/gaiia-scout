"use client";

import { tokens } from "@/lib/tokens";
import { fixture } from "@/lib/fixture";
import { IQ_FIBER } from "@/lib/isps";

const BOTTOM_NAV_HEIGHT = 56;

export function Billing() {
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
        <h1
          style={{
            margin: 0,
            padding: `${tokens.space20} ${tokens.space16} ${tokens.space16}`,
            fontSize: 22,
            fontWeight: 700,
            color: tokens.textPrimary,
          }}
        >
          Billing
        </h1>

        <section
          style={{
            margin: `0 ${tokens.space16}`,
            padding: tokens.space16,
            borderRadius: 12,
            backgroundColor: tokens.ispPrimaryLight,
            border: `1px solid ${tokens.ispPrimary}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: tokens.ispPrimary,
              letterSpacing: "0.08em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Upcoming
          </div>
          <div
            style={{
              marginTop: tokens.space8,
              fontSize: 28,
              fontWeight: 700,
              color: tokens.textPrimary,
            }}
          >
            {fixture.account.nextBillingAmount}
          </div>
          <div
            style={{
              marginTop: tokens.space8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: tokens.space8,
            }}
          >
            <span style={{ fontSize: 14, color: tokens.textSecondary }}>
              Due {fixture.account.nextBillingDate}
            </span>
            <span
              style={{ fontSize: 13, color: tokens.success, fontWeight: 500 }}
            >
              Autopay on
            </span>
          </div>
          <div
            style={{
              marginTop: tokens.space4,
              fontSize: 13,
              color: tokens.textMuted,
            }}
          >
            {fixture.account.paymentMethod}
          </div>
        </section>

        <div style={{ margin: `${tokens.space12} ${tokens.space16} 0` }}>
          <div
            style={{
              fontSize: 11,
              color: tokens.textMuted,
              letterSpacing: "0.08em",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: tokens.space8,
            }}
          >
            Invoice History
          </div>
          <div
            style={{
              borderRadius: 12,
              backgroundColor: tokens.bgSecondary,
              overflow: "hidden",
            }}
          >
            {fixture.invoices.map((invoice, idx) => {
              const isLast = idx === fixture.invoices.length - 1;
              return (
                <div
                  key={invoice.id}
                  style={{
                    height: 56,
                    padding: `0 ${tokens.space16}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: tokens.space12,
                    borderBottom: isLast
                      ? "none"
                      : `1px solid ${tokens.border}`,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: tokens.textPrimary }}>
                      {invoice.date}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: tokens.textMuted,
                        marginTop: 2,
                      }}
                    >
                      {invoice.id}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        color: tokens.textPrimary,
                        fontWeight: 500,
                      }}
                    >
                      {invoice.amount}
                    </div>
                    <span
                      style={{
                        marginTop: 2,
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 999,
                        backgroundColor: tokens.successLight,
                        color: tokens.success,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Paid
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
