'use client'

import type { ReactNode } from 'react'
import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

const locations: { icon: ReactNode; label: string }[] = [
  { icon: <TvIcon />, label: 'Near the TV or entertainment center' },
  { icon: <DoorIcon />, label: 'Near the front door' },
  { icon: <ClosetIcon />, label: 'In a utility closet or pantry' },
  { icon: <DesktopIcon />, label: 'In a home office or study' },
  { icon: <BoxIcon />, label: 'In a basement or mechanical room' },
]

export function EquipmentLocator({
  onFound,
  onCantFind,
  onBack,
}: {
  onFound: () => void
  onCantFind: () => void
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

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: `28px ${tokens.space16} 0` }}>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: tokens.textPrimary,
            }}
          >
            Let&rsquo;s find your router
          </h1>
          <p
            style={{
              margin: `${tokens.space8} 0 0 0`,
              fontSize: tokens.fontBase,
              color: tokens.textSecondary,
            }}
          >
            Your {fixture.cpe.model} is usually in one of these spots:
          </p>
        </div>

        <ul
          style={{
            listStyle: 'none',
            margin: `${tokens.space16} 0 0 0`,
            padding: 0,
          }}
        >
          {locations.map((location, i) => (
            <li
              key={i}
              style={{
                height: 52,
                padding: `0 ${tokens.space16}`,
                display: 'flex',
                alignItems: 'center',
                gap: tokens.space12,
                borderBottom: `1px solid ${tokens.border}`,
                color: tokens.textPrimary,
                fontSize: tokens.fontBase,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: tokens.textSecondary,
                  flexShrink: 0,
                }}
              >
                {location.icon}
              </span>
              {location.label}
            </li>
          ))}
        </ul>

        {fixture.techNote.exists && (
          <div
            style={{
              margin: tokens.space16,
              padding: tokens.space16,
              borderRadius: 12,
              border: `1px solid ${tokens.ispPrimary}`,
              backgroundColor: tokens.ispPrimaryLight,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.space8,
                color: tokens.ispPrimary,
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <WrenchIcon />
              Note from your installer
            </div>
            <p
              style={{
                margin: `${tokens.space8} 0 0 0`,
                fontSize: tokens.fontBase,
                color: tokens.textPrimary,
                lineHeight: 1.45,
              }}
            >
              {fixture.techNote.note}
            </p>
            <div
              style={{
                marginTop: tokens.space8,
                fontSize: 13,
                color: tokens.textSecondary,
              }}
            >
              &mdash; {fixture.techNote.techName}, installed {fixture.techNote.installDate}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: `0 ${tokens.space16} ${tokens.space20}`,
          margin: `${tokens.space16} 0 0 0`,
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.space12,
        }}
      >
        <button
          type="button"
          onClick={onFound}
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
          I think I&rsquo;ve found it
        </button>
        <button
          type="button"
          onClick={onCantFind}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 12,
            border: `1.5px solid ${tokens.ispPrimary}`,
            backgroundColor: tokens.bg,
            color: tokens.ispPrimary,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          I still can&rsquo;t find it
        </button>
      </div>
    </div>
  )
}

function TvIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )
}

function DoorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
      <path d="M4 21h16" />
      <circle cx="15" cy="13" r="0.75" fill="currentColor" />
    </svg>
  )
}

function ClosetIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M12 3v18" />
      <path d="M10 11h-1" />
      <path d="M14 11h1" />
    </svg>
  )
}

function DesktopIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6" />
      <path d="M12 16v4" />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M3 7l9 4 9-4" />
      <path d="M12 11v10" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tokens.ispPrimary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.7 6.3a4 4 0 0 0 5.05 5.05l-9.5 9.5a2.12 2.12 0 0 1-3-3l9.5-9.5a4 4 0 0 0-2.05-2.05z" />
    </svg>
  )
}
