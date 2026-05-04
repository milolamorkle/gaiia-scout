'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                backgroundColor: tokens.bg,
                borderRadius: 24,
                padding: tokens.space24,
                width: 280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <PhoneIcon />
              <div
                style={{
                  marginTop: tokens.space16,
                  fontSize: '18px',
                  fontWeight: 600,
                  color: tokens.textPrimary,
                  textAlign: 'center',
                }}
              >
                Call {fixture.isp.supportLabel}
              </div>
              <div
                style={{
                  marginTop: tokens.space8,
                  fontSize: tokens.fontXL,
                  fontWeight: 700,
                  color: tokens.ispPrimary,
                  textAlign: 'center',
                }}
              >
                {fixture.isp.supportPhone}
              </div>
              <button
                type="button"
                onClick={() => {
                  window.location.href = `tel:${fixture.isp.supportPhone.replace(/[^0-9+]/g, '')}`
                }}
                style={{
                  marginTop: tokens.space20,
                  width: '100%',
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: tokens.success,
                  color: tokens.textInverse,
                  fontSize: tokens.fontSM,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Call Now
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  marginTop: tokens.space16,
                  fontSize: tokens.fontSM,
                  color: tokens.textMuted,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function PhoneIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tokens.ispPrimary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
