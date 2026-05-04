'use client'

import { tokens } from '@/lib/tokens'

export function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        position: 'absolute',
        top: tokens.space12,
        left: tokens.space16,
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.space4,
        color: tokens.ispPrimary,
        fontSize: tokens.fontSM,
        fontWeight: 500,
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        zIndex: 5,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M15 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </button>
  )
}
