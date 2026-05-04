'use client'

import { tokens } from '@/lib/tokens'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

const STEPS = [
  'Restart your router the right way',
  'Confirm your connection comes back',
  'Book a tech if it doesn’t',
]

export function Diagnosis({
  onContinue,
  onSkipToBooking,
  onBack,
}: {
  onContinue: () => void
  onSkipToBooking: () => void
  onBack: () => void
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.bg,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <BackButton onBack={onBack} />
      <EscapeHatch />

      <div style={{ padding: `48px ${tokens.space16} 0` }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: tokens.textPrimary,
          }}
        >
          Here&rsquo;s what we found
        </h1>
      </div>

      <div
        style={{
          margin: tokens.space16,
          padding: tokens.space16,
          borderRadius: 12,
          backgroundColor: tokens.bgSecondary,
          borderLeft: `4px solid ${tokens.ispPrimary}`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: tokens.textPrimary,
          }}
        >
          Connection issue detected
        </div>
        <p
          style={{
            margin: `${tokens.space8} 0 0 0`,
            fontSize: tokens.fontBase,
            color: tokens.textSecondary,
          }}
        >
          Your router is online but can&rsquo;t reach the internet. This is the most common type of
          home internet problem, and most people fix it in under 3 minutes.
        </p>
      </div>

      <div
        style={{
          marginTop: tokens.space20,
          padding: `0 ${tokens.space16}`,
          fontSize: 12,
          color: tokens.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 600,
        }}
      >
        What we&rsquo;ll do:
      </div>

      <ul
        style={{
          margin: `${tokens.space12} 0 0 0`,
          padding: `0 ${tokens.space16}`,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {STEPS.map((step) => (
          <li
            key={step}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: tokens.space12,
              fontSize: tokens.fontBase,
              color: tokens.textSecondary,
            }}
          >
            <CheckIcon />
            <span>{step}</span>
          </li>
        ))}
      </ul>

      <div style={{ flex: 1 }} />

      <div style={{ padding: `${tokens.space20} ${tokens.space16} ${tokens.space20}` }}>
        <button
          type="button"
          onClick={onContinue}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 12,
            border: 'none',
            backgroundColor: tokens.ispPrimary,
            color: tokens.textInverse,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Let&rsquo;s fix it
        </button>
        <button
          type="button"
          onClick={onSkipToBooking}
          style={{
            display: 'block',
            margin: `${tokens.space12} auto 0`,
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: tokens.textMuted,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Skip to booking a technician &rarr;
        </button>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tokens.ispPrimary}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}
