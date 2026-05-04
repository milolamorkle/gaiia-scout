'use client'

import { useEffect } from 'react'
import { tokens } from '@/lib/tokens'
import { EscapeHatch } from '@/components/EscapeHatch'

export function NoOutage({ onAdvance }: { onAdvance: () => void }) {
  useEffect(() => {
    const id = setTimeout(onAdvance, 1500)
    return () => clearTimeout(id)
  }, [onAdvance])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `0 ${tokens.space24}`,
      }}
    >
      <EscapeHatch />
      <CheckCircleIcon />
      <div
        style={{
          marginTop: tokens.space12,
          fontSize: tokens.fontLG,
          fontWeight: 600,
          color: tokens.textPrimary,
          textAlign: 'center',
        }}
      >
        No outages in your area
      </div>
      <div
        style={{
          marginTop: tokens.space8,
          fontSize: tokens.fontBase,
          color: tokens.textSecondary,
          textAlign: 'center',
        }}
      >
        Your service is running normally. Let&rsquo;s check your equipment.
      </div>
    </div>
  )
}

function CheckCircleIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tokens.success}
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  )
}
