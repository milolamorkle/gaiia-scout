'use client'

import { tokens } from '@/lib/tokens'
import { fixture } from '@/lib/fixture'
import { BackButton } from '@/components/BackButton'
import { EscapeHatch } from '@/components/EscapeHatch'

// Note: "Answer questions instead" would normally route to a yes/no LED flow.
// In the prototype it routes directly to the simulated photo analysis (screen 5.4).

export function DevicePhotoPrompt({
  onTakePhoto,
  onAnswerQuestions,
  onBack,
}: {
  onTakePhoto: () => void
  onAnswerQuestions: () => void
  onBack: () => void
}) {
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

      <div style={{ padding: `48px ${tokens.space16} 0` }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: tokens.textPrimary,
          }}
        >
          Take a photo of your router
        </h1>
        <div
          style={{
            marginTop: tokens.space4,
            fontSize: tokens.fontBase,
            fontWeight: 500,
            color: tokens.ispPrimary,
          }}
        >
          {fixture.cpe.model}
        </div>
        <p
          style={{
            margin: `${tokens.space16} 0 0 0`,
            fontSize: tokens.fontBase,
            color: tokens.textSecondary,
          }}
        >
          Point your camera at the front of your router so the indicator lights are clearly
          visible.
        </p>
      </div>

      <div
        style={{
          margin: `${tokens.space24} auto`,
          width: 280,
          height: 180,
          borderRadius: 16,
          backgroundColor: tokens.bgTertiary,
          border: `1.5px dashed ${tokens.borderStrong}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.space8,
        }}
      >
        <RouterDiagram />
        <div
          style={{
            fontSize: tokens.fontSM,
            color: tokens.textMuted,
            textAlign: 'center',
          }}
        >
          Front of device, lights visible
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: `0 ${tokens.space16} ${tokens.space20}` }}>
        <button
          type="button"
          onClick={onTakePhoto}
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
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.space8,
          }}
        >
          <CameraIcon />
          Take Photo
        </button>
        <button
          type="button"
          onClick={onAnswerQuestions}
          style={{
            display: 'block',
            margin: `${tokens.space16} auto 0`,
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: tokens.textSecondary,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Answer questions instead &rarr;
        </button>
      </div>
    </div>
  )
}

function RouterDiagram() {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      stroke={tokens.textMuted}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="10" y="20" width="100" height="44" rx="6" />
      <circle cx="28" cy="42" r="2.5" fill={tokens.ispPrimary} stroke="none" />
      <circle cx="42" cy="42" r="2.5" fill={tokens.success} stroke="none" />
      <circle cx="56" cy="42" r="2.5" fill={tokens.textMuted} stroke="none" />
      <circle cx="70" cy="42" r="2.5" fill={tokens.textMuted} stroke="none" />
      <path d="M30 20V10" />
      <path d="M90 20V6" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  )
}
