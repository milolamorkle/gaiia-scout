'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

const CTA_FOOTER_HEIGHT = 96

const DIAGNOSTIC_LINES = [
  'Issue: No internet',
  'Steps taken: Router restart (3 steps)',
  'LED state: WAN indicator solid red',
  'Result: Unresolved after restart',
]

export function AppointmentBooking({
  onConfirm,
  onBack,
}: {
  onConfirm: (slotId: string) => void
  onBack: () => void
}) {
  const [selectedId, setSelectedId] = useState<string>('a1')
  const [urgent, setUrgent] = useState(false)
  const [diagOpen, setDiagOpen] = useState(false)
  const [shareDiag, setShareDiag] = useState(true)

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

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: CTA_FOOTER_HEIGHT,
        }}
      >
        <div style={{ padding: `48px ${tokens.space16} 0` }}>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: tokens.textPrimary,
            }}
          >
            Choose a time
          </h1>
          <p
            style={{
              margin: `${tokens.space8} 0 0 0`,
              fontSize: tokens.fontBase,
              color: tokens.textSecondary,
            }}
          >
            A technician will arrive within the selected window.
          </p>
        </div>

        <div
          style={{
            marginTop: tokens.space20,
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.space12,
          }}
        >
          {fixture.appointmentSlots.map((slot) => {
            const selected = slot.id === selectedId
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedId(slot.id)}
                aria-pressed={selected}
                style={{
                  margin: `0 ${tokens.space16}`,
                  height: 72,
                  padding: `0 ${tokens.space16}`,
                  borderRadius: 12,
                  border: selected
                    ? `2px solid ${tokens.ispPrimary}`
                    : `1px solid ${tokens.border}`,
                  backgroundColor: selected ? tokens.ispPrimaryLight : tokens.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: tokens.textPrimary,
                  }}
                >
                  {slot.date}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: tokens.space8,
                    fontSize: 14,
                    color: tokens.textSecondary,
                  }}
                >
                  {slot.time}
                  {selected && <CheckmarkIcon />}
                </span>
              </button>
            )
          })}
        </div>

        <div
          style={{
            margin: `${tokens.space16} ${tokens.space16} 0`,
            padding: tokens.space16,
            border: `1px solid ${tokens.border}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: tokens.space12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                color: tokens.textPrimary,
                fontWeight: 500,
              }}
            >
              This is affecting my work or essential services
            </div>
            <div
              style={{
                marginTop: 2,
                fontSize: 13,
                color: tokens.textMuted,
              }}
            >
              We&rsquo;ll try to prioritize your appointment.
            </div>
          </div>
          <ToggleSwitch on={urgent} onChange={setUrgent} label="Urgent" />
        </div>

        <div
          style={{
            margin: `${tokens.space16} ${tokens.space16} 0`,
            border: `1px solid ${tokens.border}`,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setDiagOpen((v) => !v)}
            aria-expanded={diagOpen}
            style={{
              width: '100%',
              padding: tokens.space16,
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: 14,
              color: tokens.textSecondary,
            }}
          >
            <span>Your technician will have your diagnostic info</span>
            <Chevron open={diagOpen} />
          </button>

          <AnimatePresence initial={false}>
            {diagOpen && (
              <motion.div
                key="diag"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    padding: `0 ${tokens.space16} ${tokens.space16}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: tokens.space8,
                  }}
                >
                  {DIAGNOSTIC_LINES.map((line) => (
                    <div
                      key={line}
                      style={{ fontSize: 14, color: tokens.textSecondary }}
                    >
                      {line}
                    </div>
                  ))}
                  <div
                    style={{
                      marginTop: tokens.space8,
                      paddingTop: tokens.space12,
                      borderTop: `1px solid ${tokens.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: tokens.space12,
                    }}
                  >
                    <span style={{ fontSize: 14, color: tokens.textPrimary }}>
                      Share this with my technician
                    </span>
                    <ToggleSwitch
                      on={shareDiag}
                      onChange={setShareDiag}
                      label="Share diagnostic info"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: `${tokens.space16} ${tokens.space16} ${tokens.space20}`,
          backgroundColor: tokens.bg,
          borderTop: `1px solid ${tokens.border}`,
        }}
      >
        <button
          type="button"
          onClick={() => onConfirm(selectedId)}
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
          Confirm Appointment
        </button>
      </div>
    </div>
  )
}

function CheckmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill={tokens.ispPrimary} />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tokens.textMuted}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d="M9 6l6 6-6 6" />
    </motion.svg>
  )
}

function ToggleSwitch({
  on,
  onChange,
  label,
}: {
  on: boolean
  onChange: (next: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      style={{
        position: 'relative',
        width: 44,
        height: 26,
        flexShrink: 0,
        borderRadius: 999,
        border: 'none',
        backgroundColor: on ? tokens.ispPrimary : tokens.borderStrong,
        cursor: 'pointer',
        padding: 0,
        transition: 'background-color 0.2s',
      }}
    >
      <motion.span
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        style={{
          position: 'absolute',
          top: 2,
          left: 0,
          width: 22,
          height: 22,
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.2)',
        }}
      />
    </button>
  )
}
