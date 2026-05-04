'use client'

import { tokens } from '@/lib/tokens'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

export function BehavioralProxy({
  onContinue,
  onUnsure,
  onBack,
}: {
  onContinue: () => void
  onUnsure: () => void
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
          Before we start&mdash;
        </h1>
        <p
          style={{
            margin: `${tokens.space16} 0 0 0`,
            fontSize: 18,
            fontWeight: 500,
            color: tokens.textPrimary,
          }}
        >
          Can you see your router or modem right now?
        </p>
      </div>

      <div
        style={{
          margin: `${tokens.space20} ${tokens.space16} 0`,
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.space12,
        }}
      >
        <button
          type="button"
          onClick={onContinue}
          style={{
            height: 80,
            borderRadius: 16,
            border: `1px solid ${tokens.ispPrimary}`,
            backgroundColor: tokens.ispPrimaryLight,
            color: tokens.textPrimary,
            fontSize: tokens.fontMD,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Yes, I can see it
        </button>
        <button
          type="button"
          onClick={onUnsure}
          style={{
            height: 80,
            borderRadius: 16,
            border: `1px solid ${tokens.border}`,
            backgroundColor: tokens.bg,
            color: tokens.textPrimary,
            fontSize: tokens.fontMD,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          No, I&rsquo;m not sure where it is
        </button>
      </div>
    </div>
  )
}
