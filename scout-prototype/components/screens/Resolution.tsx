'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'

export function Resolution({ onDone }: { onDone: () => void }) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [feedbackFocused, setFeedbackFocused] = useState(false)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const trimmedFeedback = feedback.trim()
  const submitGrayed = trimmedFeedback.length === 0
  const submitTappable = !submitGrayed && !feedbackSent

  const handleSubmitFeedback = () => {
    if (!submitTappable) return
    setFeedbackSent(true)
    setTimeout(() => setFeedbackSent(false), 1500)
  }

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
      <div
        style={{
          padding: `48px ${tokens.space16} 0`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AnimatedCheckmark />
        <h1
          style={{
            margin: `${tokens.space16} 0 0 0`,
            fontSize: 28,
            fontWeight: 700,
            color: tokens.textPrimary,
            textAlign: 'center',
          }}
        >
          You&rsquo;re back online.
        </h1>
        <p
          style={{
            margin: `${tokens.space8} 0 0 0`,
            fontSize: tokens.fontBase,
            color: tokens.textSecondary,
            textAlign: 'center',
          }}
        >
          Your {fixture.cpe.shortName}{' '}is connected. Here&rsquo;s what fixed it:
        </p>
      </div>

      <div
        style={{
          margin: tokens.space16,
          padding: tokens.space16,
          borderRadius: 12,
          backgroundColor: tokens.successLight,
          display: 'flex',
          alignItems: 'center',
          gap: tokens.space12,
        }}
      >
        <SmallCheck />
        <span style={{ fontSize: tokens.fontBase, color: tokens.textPrimary }}>
          Restarted your router
        </span>
      </div>

      <div
        style={{
          marginTop: tokens.space24,
          padding: `0 ${tokens.space16}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 14, color: tokens.textSecondary }}>How&rsquo;d we do?</span>
        <div style={{ marginTop: tokens.space12, display: 'flex', gap: tokens.space8 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`${n} star${n === 1 ? '' : 's'}`}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                lineHeight: 0,
              }}
            >
              <StarIcon filled={n <= rating} />
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: tokens.space20,
          padding: `0 ${tokens.space16}`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <label
          htmlFor="resolution-feedback"
          style={{
            fontSize: 14,
            color: tokens.textSecondary,
            textAlign: 'left',
          }}
        >
          Anything we could have explained better?
        </label>
        <textarea
          id="resolution-feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          onFocus={() => setFeedbackFocused(true)}
          onBlur={() => setFeedbackFocused(false)}
          placeholder="Optional — your feedback helps us improve the instructions."
          style={{
            marginTop: tokens.space8,
            width: '100%',
            height: 80,
            padding: tokens.space12,
            borderRadius: 12,
            border: `1px solid ${feedbackFocused ? tokens.ispPrimary : tokens.borderStrong}`,
            outline: 'none',
            boxShadow: feedbackFocused ? `0 0 0 3px ${tokens.ispPrimaryLight}` : 'none',
            fontSize: 14,
            fontFamily: 'inherit',
            color: tokens.textPrimary,
            backgroundColor: tokens.bg,
            resize: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 120ms ease, box-shadow 120ms ease',
          }}
        />
        <div
          style={{
            marginTop: tokens.space12,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={handleSubmitFeedback}
            disabled={!submitTappable}
            style={{
              height: 36,
              padding: `0 ${tokens.space16}`,
              borderRadius: 8,
              border: `1px solid ${submitGrayed ? tokens.borderStrong : tokens.ispPrimary}`,
              backgroundColor: tokens.bg,
              color: submitGrayed ? tokens.textMuted : tokens.ispPrimary,
              fontSize: 14,
              fontWeight: 600,
              cursor: submitTappable ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
            }}
          >
            {feedbackSent ? '✓ Sent' : 'Submit feedback'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: tokens.space20 }} />

      <div style={{ padding: `${tokens.space20} ${tokens.space16}` }}>
        <button
          type="button"
          onClick={onDone}
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
          Done
        </button>
      </div>
    </div>
  )
}

function AnimatedCheckmark() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
      <circle cx="40" cy="40" r="36" fill={tokens.successLight} />
      <motion.path
        d="M24 42 L36 54 L58 30"
        fill="none"
        stroke={tokens.success}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      />
    </svg>
  )
}

function SmallCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill={tokens.success} />
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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={filled ? tokens.ispPrimary : 'none'}
      stroke={filled ? tokens.ispPrimary : tokens.textMuted}
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2.5l2.93 6.43 6.57.62-4.95 4.46 1.43 6.49L12 17l-5.98 3.5 1.43-6.49L2.5 9.55l6.57-.62L12 2.5z" />
    </svg>
  )
}
