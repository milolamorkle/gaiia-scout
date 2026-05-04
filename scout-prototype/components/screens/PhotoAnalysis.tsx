'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'
import { EscapeHatch } from '@/components/EscapeHatch'

type Phase = 'analyzing' | 'result'

export function PhotoAnalysis({ onContinue }: { onContinue: () => void }) {
  const [phase, setPhase] = useState<Phase>('analyzing')
  const [step1Done, setStep1Done] = useState(false)
  const [showStep2, setShowStep2] = useState(false)
  const [step2Done, setStep2Done] = useState(false)
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setStep1Done(true), 1200)
    const t2 = setTimeout(() => setShowStep2(true), 1200)
    const t3 = setTimeout(() => setStep2Done(true), 2300)
    const t4 = setTimeout(() => setPhase('result'), 2500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'result') return
    const t = setTimeout(() => setShowContinue(true), 1000)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'analyzing') {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0f0f0f',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.space24,
        }}
      >
        <ScanningFrame />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.space12,
            color: '#fff',
            fontSize: tokens.fontBase,
            alignItems: 'center',
          }}
        >
          <ProgressLine label="Identifying device…" done={step1Done} />
          {showStep2 && (
            <ProgressLine label="Reading indicator lights…" done={step2Done} />
          )}
        </div>
      </div>
    )
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
      <EscapeHatch />
      <div style={{ padding: `48px ${tokens.space16} 0` }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: 999,
            backgroundColor: tokens.successLight,
            color: tokens.success,
            fontSize: tokens.fontSM,
            fontWeight: 600,
          }}
        >
          Analysis complete
        </span>
        <p
          style={{
            margin: `${tokens.space16} 0 0 0`,
            fontSize: tokens.fontMD,
            fontWeight: 500,
            color: tokens.textPrimary,
          }}
        >
          {fixture.diagnosis.ledResult}
        </p>
        <p
          style={{
            margin: `${tokens.space12} 0 0 0`,
            fontSize: tokens.fontBase,
            color: tokens.textSecondary,
          }}
        >
          {fixture.diagnosis.interpretation}
        </p>
        <RouterDiagram />
      </div>

      <div style={{ flex: 1 }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContinue ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ padding: `0 ${tokens.space16} ${tokens.space20}` }}
      >
        <button
          type="button"
          onClick={onContinue}
          disabled={!showContinue}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 12,
            border: 'none',
            backgroundColor: tokens.ispPrimary,
            color: tokens.textInverse,
            fontSize: 16,
            fontWeight: 600,
            cursor: showContinue ? 'pointer' : 'default',
          }}
        >
          Continue &rarr;
        </button>
      </motion.div>
    </div>
  )
}

function RouterDiagram() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <svg
        width="280"
        height="160"
        viewBox="0 0 280 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Router front face with WAN indicator highlighted"
      >
        <defs>
          <marker
            id="wan-arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={tokens.error} />
          </marker>
        </defs>

        <rect x="30" y="50" width="170" height="70" rx="8" fill="#1e293b" />

        <circle cx="79" cy="68" r="6" fill="#166534" />
        <circle cx="103" cy="68" r="6" fill={tokens.error} />
        <circle cx="127" cy="68" r="6" fill="#166534" />
        <circle cx="151" cy="68" r="6" fill="#166534" />

        <text x="79" y="90" fontSize="9" textAnchor="middle" fill="#FFFFFF">
          Power
        </text>
        <text x="103" y="90" fontSize="9" textAnchor="middle" fill="#FFFFFF">
          WAN
        </text>
        <text x="127" y="90" fontSize="9" textAnchor="middle" fill="#FFFFFF">
          LAN
        </text>
        <text x="151" y="90" fontSize="9" textAnchor="middle" fill="#FFFFFF">
          Wi-Fi
        </text>

        <path
          d="M 235 38 Q 180 12 110 60"
          stroke={tokens.error}
          strokeWidth="2"
          fill="none"
          markerEnd="url(#wan-arrowhead)"
        />

        <text
          x="270"
          y="30"
          fontSize="11"
          textAnchor="end"
          fontWeight="600"
          fill={tokens.error}
        >
          WAN indicator
        </text>
      </svg>
      <p
        style={{
          margin: `${tokens.space8} 0 0 0`,
          fontSize: tokens.fontSM,
          color: tokens.textMuted,
          textAlign: 'center',
        }}
      >
        This is the light we&rsquo;re diagnosing.
      </p>
    </div>
  )
}

function ScanningFrame() {
  return (
    <div
      style={{
        position: 'relative',
        width: 240,
        height: 160,
        border: `2px solid ${tokens.ispPrimary}`,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: `0 0 24px ${tokens.ispPrimary}33`,
      }}
    >
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 156 }}
        transition={{ duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${tokens.ispPrimary}, transparent)`,
          boxShadow: `0 0 12px ${tokens.ispPrimary}`,
        }}
      />
    </div>
  )
}

function CornerBracket({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 14
  const thickness = 2
  const inset = 4
  const styles: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 0,
  }
  if (position === 'tl') {
    Object.assign(styles, {
      top: inset,
      left: inset,
      borderTopWidth: thickness,
      borderLeftWidth: thickness,
    })
  } else if (position === 'tr') {
    Object.assign(styles, {
      top: inset,
      right: inset,
      borderTopWidth: thickness,
      borderRightWidth: thickness,
    })
  } else if (position === 'bl') {
    Object.assign(styles, {
      bottom: inset,
      left: inset,
      borderBottomWidth: thickness,
      borderLeftWidth: thickness,
    })
  } else {
    Object.assign(styles, {
      bottom: inset,
      right: inset,
      borderBottomWidth: thickness,
      borderRightWidth: thickness,
    })
  }
  return <span aria-hidden style={styles} />
}

function ProgressLine({ label, done }: { label: string; done: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.space12,
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? <Checkmark /> : <Spinner />}
      </span>
      <span>{label}</span>
    </div>
  )
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: `2px solid rgba(255,255,255,0.25)`,
        borderTopColor: tokens.ispPrimary,
        boxSizing: 'border-box',
        display: 'inline-block',
      }}
    />
  )
}

function Checkmark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tokens.success}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}
