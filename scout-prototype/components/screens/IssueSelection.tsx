'use client'

import { useEffect, useState } from 'react'
import { tokens } from '@/lib/tokens'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

type IssueKey = 'no-internet' | 'slow' | 'wifi-room' | 'other'

const ISSUES: { key: IssueKey; label: string; Icon: () => React.JSX.Element }[] = [
  { key: 'no-internet', label: 'No Internet', Icon: WifiOffIcon },
  { key: 'slow', label: 'Slow Internet', Icon: SpeedometerIcon },
  { key: 'wifi-room', label: 'Wi-Fi not reaching a room', Icon: SignalLowIcon },
  { key: 'other', label: 'Something Else', Icon: QuestionIcon },
]

export function IssueSelection({
  onSelectNoInternet,
  onBack,
}: {
  onSelectNoInternet: () => void
  onBack: () => void
}) {
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(false), 2000)
    return () => clearTimeout(id)
  }, [toast])

  const handleSelect = (key: IssueKey) => {
    if (key === 'no-internet') {
      onSelectNoInternet()
      return
    }
    setToast(true)
  }

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
            fontSize: tokens.fontXL,
            fontWeight: 600,
            color: tokens.textPrimary,
          }}
        >
          What&rsquo;s happening?
        </h1>
        <p
          style={{
            margin: `${tokens.space8} 0 0 0`,
            fontSize: tokens.fontBase,
            color: tokens.textSecondary,
          }}
        >
          Choose the option that best describes the issue.
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
        {ISSUES.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSelect(key)}
            style={{
              height: 72,
              borderRadius: 12,
              border: `1px solid ${tokens.border}`,
              backgroundColor: tokens.bg,
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                width: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: tokens.space12,
                color: tokens.ispPrimary,
                flexShrink: 0,
              }}
            >
              <Icon />
            </span>
            <span
              style={{
                fontSize: tokens.fontMD,
                color: tokens.textPrimary,
                fontWeight: 500,
                marginLeft: tokens.space8,
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {toast && (
        <div
          role="status"
          style={{
            position: 'absolute',
            left: tokens.space16,
            right: tokens.space16,
            bottom: tokens.space24,
            backgroundColor: tokens.textPrimary,
            color: tokens.textInverse,
            fontSize: tokens.fontSM,
            padding: `${tokens.space12} ${tokens.space16}`,
            borderRadius: 12,
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          }}
        >
          Coming soon in a future update
        </div>
      )}
    </div>
  )
}

function WifiOffIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
      <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76" />
      <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68" />
      <path d="M5 13a10 10 0 0 1 5.17-2.69" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}

function SpeedometerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 14a3 3 0 1 0 3-3" />
      <path d="M12 2a10 10 0 0 0-9.95 11" />
      <path d="M21.95 13A10 10 0 0 0 19 5.93" />
      <path d="M5.6 18.4A10 10 0 0 0 18.4 18.4" />
    </svg>
  )
}

function SignalLowIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="17" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="9" y="13" width="3" height="8" rx="0.5" stroke="currentColor" opacity="0.3" />
      <rect x="15" y="8" width="3" height="13" rx="0.5" stroke="currentColor" opacity="0.3" />
    </svg>
  )
}

function QuestionIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
