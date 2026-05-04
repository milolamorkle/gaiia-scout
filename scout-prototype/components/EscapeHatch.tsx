'use client'

import { useState } from 'react'
import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'

export function EscapeHatch() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          position: 'absolute',
          top: tokens.space12,
          right: tokens.space16,
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
        Talk to a person →
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: tokens.space24,
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: tokens.bg,
              borderRadius: 16,
              padding: tokens.space24,
              width: '100%',
              maxWidth: 320,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: tokens.fontLG,
                fontWeight: 600,
                color: tokens.textPrimary,
                marginBottom: tokens.space8,
              }}
            >
              Call {fixture.isp.supportLabel}
            </div>
            <a
              href={`tel:${fixture.isp.supportPhone.replace(/[^0-9+]/g, '')}`}
              style={{
                display: 'inline-block',
                fontSize: tokens.fontXL,
                fontWeight: 600,
                color: tokens.ispPrimary,
                textDecoration: 'none',
                marginBottom: tokens.space20,
              }}
            >
              {fixture.isp.supportPhone}
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                width: '100%',
                padding: `${tokens.space12} ${tokens.space16}`,
                borderRadius: 12,
                backgroundColor: tokens.bgTertiary,
                color: tokens.textPrimary,
                fontSize: tokens.fontBase,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
