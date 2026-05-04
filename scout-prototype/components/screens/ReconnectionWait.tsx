'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { tokens } from '@/lib/tokens'
import { EscapeHatch } from '@/components/EscapeHatch'

export function ReconnectionWait({
  onBackOnline,
  onStillNotReconnecting,
}: {
  onBackOnline: () => void
  onStillNotReconnecting: () => void
}) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 5000)
    return () => clearTimeout(t)
  }, [])

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
      <EscapeHatch />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `0 ${tokens.space16}`,
        }}
      >
        <PulsingRing />
        <p
          style={{
            margin: `${tokens.space20} 0 0 0`,
            fontSize: 18,
            color: tokens.textPrimary,
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Give it a minute &mdash; your router is restarting
          <AnimatedEllipsis />
        </p>
        <p
          style={{
            margin: `${tokens.space8} 0 0 0`,
            fontSize: tokens.fontBase,
            color: tokens.textSecondary,
            textAlign: 'center',
          }}
        >
          This usually takes 60&ndash;90 seconds.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ padding: `0 ${tokens.space16} ${tokens.space20}` }}
      >
        <button
          type="button"
          onClick={onBackOnline}
          disabled={!revealed}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 12,
            border: 'none',
            backgroundColor: tokens.success,
            color: tokens.textInverse,
            fontSize: 16,
            fontWeight: 600,
            cursor: revealed ? 'pointer' : 'default',
            pointerEvents: revealed ? 'auto' : 'none',
          }}
        >
          It&rsquo;s back on &rarr;
        </button>
        <button
          type="button"
          onClick={onStillNotReconnecting}
          disabled={!revealed}
          style={{
            display: 'block',
            margin: `${tokens.space12} auto 0`,
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: tokens.textMuted,
            fontSize: 14,
            cursor: revealed ? 'pointer' : 'default',
            pointerEvents: revealed ? 'auto' : 'none',
          }}
        >
          Still not reconnecting?
        </button>
      </motion.div>
    </div>
  )
}

function PulsingRing() {
  return (
    <div
      style={{
        position: 'relative',
        width: 96,
        height: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ring delay={0} />
      <Ring delay={0.5} />
      <Ring delay={1} />
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: tokens.ispPrimary,
        }}
      />
    </div>
  )
}

function Ring({ delay }: { delay: number }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0.6, scale: 0.4 }}
      animate={{ opacity: 0, scale: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay }}
      style={{
        position: 'absolute',
        width: 96,
        height: 96,
        borderRadius: '50%',
        border: `2px solid ${tokens.ispPrimary}`,
      }}
    />
  )
}

function AnimatedEllipsis() {
  return (
    <span aria-hidden style={{ display: 'inline-block', marginLeft: 1 }}>
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </span>
  )
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ display: 'inline-block' }}
    >
      .
    </motion.span>
  )
}
