import { tokens } from '@/lib/tokens'

type Tab = 'home' | 'account' | 'billing'

const TABS: { key: Tab; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'account', label: 'Account' },
  { key: 'billing', label: 'Billing' },
]

export function BottomNav({ active = 'home' as Tab }: { active?: Tab } = {}) {
  return (
    <nav
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        backgroundColor: tokens.bg,
        borderTop: `1px solid ${tokens.border}`,
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active
        return (
          <div
            key={tab.key}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              color: isActive ? tokens.ispPrimary : tokens.textMuted,
              fontSize: tokens.fontXS,
              fontWeight: isActive ? 600 : 500,
            }}
          >
            <TabIcon tab={tab.key} />
            <span>{tab.label}</span>
          </div>
        )
      })}
    </nav>
  )
}

function TabIcon({ tab }: { tab: Tab }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (tab === 'home') {
    return (
      <svg {...common} aria-hidden>
        <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />
      </svg>
    )
  }
  if (tab === 'account') {
    return (
      <svg {...common} aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
      </svg>
    )
  }
  return (
    <svg {...common} aria-hidden>
      <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  )
}
