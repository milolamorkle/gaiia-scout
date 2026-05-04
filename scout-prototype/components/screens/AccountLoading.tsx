'use client'

import { useEffect, useState } from 'react'
import { tokens } from '@/lib/tokens'
import { IQ_FIBER } from '@/lib/isps'

const MESSAGES = [
  'Pulling down your account…',
  'Loading your equipment details…',
  'Almost ready…',
]

export function AccountLoading({ onAdvance }: { onAdvance: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const t1 = window.setTimeout(() => setMessageIndex(1), 1000)
    const t2 = window.setTimeout(() => setMessageIndex(2), 2000)
    const finish = window.setTimeout(onAdvance, 2500)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(finish)
    }
  }, [onAdvance])

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
      <div
        style={{
          paddingTop: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: tokens.space8,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IQ_FIBER.logoUrl}
          alt=""
          style={{ width: 28, height: 28, objectFit: 'contain' }}
        />
        <div style={{ fontSize: 14, fontWeight: 500, color: tokens.textPrimary }}>
          IQ Fiber
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.space20,
          padding: `0 ${tokens.space24}`,
        }}
      >
        <div
          className="animate-spin"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `3px solid ${tokens.ispPrimaryLight}`,
            borderTopColor: tokens.ispPrimary,
          }}
        />
        <div
          style={{
            fontSize: 15,
            color: tokens.textSecondary,
            textAlign: 'center',
          }}
        >
          {MESSAGES[messageIndex]}
        </div>
      </div>
    </div>
  )
}
