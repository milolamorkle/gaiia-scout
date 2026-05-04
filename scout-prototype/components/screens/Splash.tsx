'use client'

import { tokens } from '@/lib/tokens'

export function Splash({ onContinue }: { onContinue: () => void }) {
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
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.space12,
          padding: `0 ${tokens.space24}`,
        }}
      >
        <div
          style={{
            color: tokens.ispPrimary,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          scout
        </div>
        <div
          style={{
            color: tokens.textSecondary,
            fontSize: 15,
            textAlign: 'center',
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
          Get Started
        </button>
      </div>
    </div>
  )
}
