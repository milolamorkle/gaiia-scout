'use client'

import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'

export function AppointmentConfirmation({
  slotId,
  onDone,
}: {
  slotId: string
  onDone: () => void
}) {
  const slot =
    fixture.appointmentSlots.find((s) => s.id === slotId) ??
    fixture.appointmentSlots[0]
  const dateTime = `${slot.date} · ${slot.time}`

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.bgSecondary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: `64px ${tokens.space16} ${tokens.space20}`,
      }}
    >
      <div
        style={{
          backgroundColor: tokens.bg,
          borderRadius: 16,
          padding: tokens.space20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CheckCircleIcon />
        <h1
          style={{
            margin: `${tokens.space8} 0 0 0`,
            fontSize: 20,
            fontWeight: 700,
            color: tokens.textPrimary,
          }}
        >
          Appointment confirmed
        </h1>
        <div
          style={{
            marginTop: tokens.space12,
            fontSize: 16,
            fontWeight: 500,
            color: tokens.ispPrimary,
          }}
        >
          {dateTime}
        </div>

        <div
          style={{
            alignSelf: 'stretch',
            margin: `${tokens.space16} 0 0`,
            borderTop: `1px solid ${tokens.border}`,
          }}
        />

        <p
          style={{
            margin: `${tokens.space12} 0 0 0`,
            fontSize: 14,
            color: tokens.textSecondary,
          }}
        >
          Your technician will have your full diagnostic report when they arrive.
        </p>
        <div
          style={{
            marginTop: tokens.space8,
            fontSize: 13,
            color: tokens.textMuted,
          }}
        >
          {fixture.isp.supportLabel} · {fixture.isp.supportPhone}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          /* wired but inert — prototype only */
        }}
        style={{
          marginTop: tokens.space16,
          height: 48,
          borderRadius: 12,
          border: `1px solid ${tokens.ispPrimary}`,
          backgroundColor: tokens.bg,
          color: tokens.ispPrimary,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Add to Calendar
      </button>

      <button
        type="button"
        onClick={onDone}
        style={{
          marginTop: tokens.space12,
          alignSelf: 'center',
          background: 'transparent',
          border: 'none',
          padding: 0,
          color: tokens.textMuted,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Done
      </button>
    </div>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="18" fill={tokens.successLight} />
      <path
        d="M13 20.5l4.5 4.5L28 14.5"
        fill="none"
        stroke={tokens.success}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
