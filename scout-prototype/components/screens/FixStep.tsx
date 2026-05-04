'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

export function FixStep({
  index,
  onAdvance,
  onBack,
}: {
  index: number
  onAdvance: () => void
  onBack: () => void
}) {
  const step = fixture.fixSteps[index]
  const isWait = step.isWait === true
  const waitSeconds = step.waitSeconds ?? 30
  const [secondsLeft, setSecondsLeft] = useState(isWait ? waitSeconds : 0)

  useEffect(() => {
    if (!isWait) return
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [isWait])

  const ctaReady = !isWait || secondsLeft === 0
  const mm = Math.floor(secondsLeft / 60)
  const ss = String(secondsLeft % 60).padStart(2, '0')
  const formatted = `${mm}:${ss}`

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.bg,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <BackButton onBack={onBack} />
      <EscapeHatch />

      <div
        style={{
          padding: `48px ${tokens.space16} 0`,
          textAlign: 'right',
          fontSize: 13,
          color: tokens.textMuted,
        }}
      >
        Step {index + 1} of 3
      </div>

      <div style={{ padding: `0 ${tokens.space16}`, marginTop: tokens.space24 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: tokens.textPrimary,
            lineHeight: 1.3,
          }}
        >
          {step.instruction}
        </h1>
        {step.subtext && (
          <p
            style={{
              margin: `${tokens.space8} 0 0 0`,
              fontSize: tokens.fontBase,
              color: tokens.textSecondary,
            }}
          >
            {step.subtext}
          </p>
        )}
      </div>

      {isWait && (
        <div
          style={{
            marginTop: tokens.space32,
            padding: `0 ${tokens.space16}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: tokens.space12,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: tokens.ispPrimary,
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}
          >
            {formatted}
          </div>
          <div
            style={{
              fontSize: tokens.fontBase,
              color: tokens.textSecondary,
              textAlign: 'center',
            }}
          >
            Your router needs this time to fully reset.
          </div>
        </div>
      )}

      <div style={{ flex: 1 }} />

      <div style={{ padding: `${tokens.space20} ${tokens.space16}` }}>
        <motion.button
          type="button"
          onClick={onAdvance}
          initial={{ opacity: isWait ? 0 : 1 }}
          animate={{ opacity: ctaReady ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          disabled={!ctaReady}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 12,
            border: 'none',
            backgroundColor: tokens.ispPrimary,
            color: tokens.textInverse,
            fontSize: 16,
            fontWeight: 600,
            cursor: ctaReady ? 'pointer' : 'default',
            pointerEvents: ctaReady ? 'auto' : 'none',
          }}
        >
          Done, what&rsquo;s next?
        </motion.button>
        <button
          type="button"
          onClick={onAdvance}
          style={{
            display: 'block',
            margin: `${tokens.space12} auto 0`,
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: tokens.textMuted,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Skip this step &rarr;
        </button>
      </div>
    </div>
  )
}
