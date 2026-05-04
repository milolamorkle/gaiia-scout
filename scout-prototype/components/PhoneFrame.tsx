import type { ReactNode } from 'react'
import { tokens } from '@/lib/tokens'

const FRAME_WIDTH = 390
const FRAME_HEIGHT = 844
const NOTCH_WIDTH = 120
const NOTCH_HEIGHT = 30
const STATUS_BAR_HEIGHT = 44

export function PhoneFrame({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        backgroundColor: tokens.bg,
        borderRadius: 44,
        border: '1px solid #333',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: STATUS_BAR_HEIGHT + NOTCH_HEIGHT / 2,
          backgroundColor: '#000',
          zIndex: 10,
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: NOTCH_WIDTH,
            height: NOTCH_HEIGHT,
            backgroundColor: '#111',
            borderRadius: NOTCH_HEIGHT / 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: NOTCH_HEIGHT,
            left: 0,
            right: 0,
            height: STATUS_BAR_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span>9:41</span>
          <StatusBarIcons />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: STATUS_BAR_HEIGHT + NOTCH_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function StatusBarIcons() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
        <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
        <rect x="5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
        <rect x="10" y="2" width="3" height="9" rx="0.5" fill="currentColor" />
        <rect x="15" y="0" width="2" height="11" rx="0.5" fill="currentColor" opacity="0.4" />
      </svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
        <path
          d="M1 4.5C1 2.567 2.567 1 4.5 1H10.5C12.433 1 14 2.567 14 4.5V6.5C14 8.433 12.433 10 10.5 10H4.5C2.567 10 1 8.433 1 6.5V4.5Z"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        <rect x="2" y="2" width="9" height="7" rx="1.5" fill="currentColor" />
      </svg>
    </span>
  )
}
