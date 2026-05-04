'use client'

import { useState } from 'react'
import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

export function EscalationIntro({
  onBookAppointment,
  onBack,
}: {
  onBookAppointment: () => void
  onBack: () => void
}) {
  const [phoneRevealed, setPhoneRevealed] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.bg,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BackButton onBack={onBack} />
      <EscapeHatch />

      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          transform: 'translateY(-40%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `0 ${tokens.space16}`,
        }}
      >
        <WrenchIcon />
        <h1
          style={{
            margin: `${tokens.space16} 0 0 0`,
            fontSize: 24,
            fontWeight: 700,
            color: tokens.textPrimary,
            textAlign: 'center',
          }}
        >
          Let&rsquo;s get a technician out to you.
        </h1>
        <p
          style={{
            margin: `${tokens.space12} ${tokens.space24} 0`,
            fontSize: tokens.fontBase,
            color: tokens.textSecondary,
            textAlign: 'center',
            lineHeight: 1.45,
          }}
        >
          You&rsquo;ve done everything you can from home. This one needs a professional look &mdash;
          and they&rsquo;ll already have everything we diagnosed today.
        </p>

        <button
          type="button"
          onClick={onBookAppointment}
          style={{
            marginTop: tokens.space24,
            width: `calc(100% - ${tokens.space32})`,
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
          Book an Appointment
        </button>

        <button
          type="button"
          onClick={() => setPhoneRevealed(true)}
          style={{
            marginTop: tokens.space12,
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: tokens.textSecondary,
            fontSize: 14,
            cursor: phoneRevealed ? 'default' : 'pointer',
            textAlign: 'center',
          }}
        >
          {phoneRevealed
            ? `${fixture.isp.supportLabel} · ${fixture.isp.supportPhone}`
            : `Call ${fixture.isp.supportLabel} instead`}
        </button>
      </div>
    </div>
  )
}

function WrenchIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tokens.ispPrimary}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.7 6.3a4 4 0 0 0 5.05 5.05l-9.5 9.5a2.12 2.12 0 0 1-3-3l9.5-9.5a4 4 0 0 0-2.05-2.05z" />
      <path d="M14.7 6.3l3 3" />
    </svg>
  )
}
