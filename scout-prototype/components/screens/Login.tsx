'use client'

import { useState } from 'react'
import { tokens } from '@/lib/tokens'
import { IQ_FIBER } from '@/lib/isps'
import { BackButton } from '@/components/BackButton'

type Mode = 'phone' | 'email'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  // Drop leading "1" for display formatting; only the 10-digit body is shown formatted
  const body = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  if (body.length === 0) return ''
  if (body.length <= 3) return `(${body}`
  if (body.length <= 6) return `(${body.slice(0, 3)}) ${body.slice(3)}`
  return `(${body.slice(0, 3)}) ${body.slice(3, 6)}-${body.slice(6, 10)}`
}

function isPhoneValid(raw: string): boolean {
  const digits = raw.replace(/\D/g, '')
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
}

function isEmailValid(raw: string): boolean {
  return EMAIL_REGEX.test(raw.trim())
}

export function Login({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('phone')
  const [value, setValue] = useState('')

  const valid = mode === 'phone' ? isPhoneValid(value) : isEmailValid(value)

  const switchMode = (next: Mode) => {
    if (next === mode) return
    setMode(next)
    setValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mode === 'phone') {
      setValue(formatPhoneDisplay(e.target.value))
    } else {
      setValue(e.target.value)
    }
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
      <BackButton onBack={onBack} />
      <div
        style={{
          paddingTop: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: tokens.space8,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IQ_FIBER.logoUrl}
          alt="IQ Fiber"
          style={{ width: 40, height: 40, objectFit: 'contain' }}
        />
        <div style={{ fontSize: 16, fontWeight: 600, color: tokens.textPrimary }}>IQ Fiber</div>
      </div>
      <div
        style={{
          marginTop: tokens.space16,
          fontSize: 20,
          fontWeight: 600,
          color: tokens.textPrimary,
          textAlign: 'center',
        }}
      >
        Sign in to your account
      </div>

      <div
        style={{
          margin: `${tokens.space24} ${tokens.space16} 0`,
          display: 'flex',
          gap: tokens.space8,
          backgroundColor: tokens.bgTertiary,
          borderRadius: 999,
          padding: 4,
        }}
      >
        <ToggleOption label="Phone" active={mode === 'phone'} onClick={() => switchMode('phone')} />
        <ToggleOption label="Email" active={mode === 'email'} onClick={() => switchMode('email')} />
      </div>

      <div style={{ padding: `${tokens.space20} ${tokens.space16} 0` }}>
        <input
          type={mode === 'email' ? 'email' : 'tel'}
          inputMode={mode === 'email' ? 'email' : 'tel'}
          value={value}
          onChange={handleChange}
          placeholder={mode === 'phone' ? 'Phone number' : 'Email address'}
          style={{
            width: '100%',
            height: 48,
            borderRadius: 12,
            border: `1px solid ${tokens.borderStrong}`,
            padding: `0 ${tokens.space16}`,
            fontSize: 15,
            color: tokens.textPrimary,
            backgroundColor: tokens.bg,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: `0 ${tokens.space24} ${tokens.space32}` }}>
        <button
          type="button"
          onClick={valid ? onContinue : undefined}
          disabled={!valid}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 12,
            border: 'none',
            backgroundColor: valid ? tokens.ispPrimary : tokens.bgTertiary,
            color: valid ? tokens.textInverse : tokens.textMuted,
            fontSize: 16,
            fontWeight: 600,
            cursor: valid ? 'pointer' : 'not-allowed',
          }}
        >
          Send Verification Code
        </button>
      </div>
    </div>
  )
}

function ToggleOption({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        height: 36,
        borderRadius: 999,
        border: 'none',
        backgroundColor: active ? tokens.ispPrimary : 'transparent',
        color: active ? tokens.textInverse : tokens.textSecondary,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background-color 150ms ease, color 150ms ease',
      }}
    >
      {label}
    </button>
  )
}
