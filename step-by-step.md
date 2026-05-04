# Scout — Prototype Build Plan

---

## How This Document Works

Each phase has two sections:

**For you:** What you're doing, why, and any decisions to make before handing off to AI.

**Prompt for AI:** Copy this directly into Claude Code (or Cursor). These are written to be self-contained — the AI gets all the context it needs in the prompt itself.

---

## Screens We're Building

The full app has 44 screens. We're building 18, representing the complete no-internet diagnostic loop plus the escalation path.

### Definite Builds (P0)

| ID | Screen Name | Notes |
|---|---|---|
| 1.1 | Splash | Scout logo, "Get Started" |
| 1.2 | ISP Selection | 10 real ISPs, only IQ Fiber selectable, cheeky inline message for others |
| 1.3 | Login | Phone/email input, "Send Code" CTA |
| 1.4 | OTP Verification | 6-digit input, auto-advance on correct entry |
| 2.1 | Home Dashboard | Subscriber name, CPE, plan, status badge, primary CTA |
| 3.1 | Issue Selection | No Internet / Slow Internet / Something Else |
| 4.1 | Outage Check Loading | Animated, "Checking your area…" |
| 4.3 | No Outage Detected | Brief, auto-advances after 1.5s |
| 5.1 | Behavioral Proxy | "Can you see your router?" Yes / No |
| 5.3 | Device Photo Prompt | "Take a photo of your Ubiquiti router" + diagram |
| 5.4 | Photo Analysis | Simulated — tap → 2.5s animation → scripted result |
| 5.6 | AI Diagnosis | "Your router can't find an internet connection." → Fix CTA |
| 5.7 | Fix Steps ×3 | Step 1: Unplug. Step 2: 30s countdown. Step 3: Replug. |
| 5.9 | Reconnection Wait | Animated, "Give it a minute…" + manual "It's back on" |
| 5.10 | Resolution | "You're back online." + star rating |
| 5.13 | Escalation Intro | "Let's get a technician out to you." |
| 5.14 | Appointment Booking | Date/time slot picker (fixture data) |
| 5.16 | Appointment Confirmation | Confirmed slot, "Add to calendar" |

### Cut from prototype (with reason)

| Screen | Why Cut |
|---|---|
| 1.5 Permissions | Browser permissions work differently — confusing to simulate |
| 4.2 Outage Confirmed | Show the "no outage" path only — cleaner demo loop |
| 5.2 Equipment Locator | P1 — "can't find it" branch. Add if time allows. |
| 5.5 Yes/No LED fallback | P1 — fallback to photo flow. Add if time allows. |
| 5.8 Step Photo Validation | Camera simulation adds complexity, skip in prototype |
| 5.11–5.12 Ambiguous Steps | P1 — second outcome path. Add if time allows. |
| 5.15 Diagnostic Summary | P1 — collapsed disclosure panel. Add if time allows. |
| 7.x Slow Internet | P2 — separate flow, defined in screen inventory |
| 9.x Other Flow | P2 — separate flow, defined in screen inventory |

---

## Fixture Data (Single Source of Truth)

Everything in the prototype is hardcoded. No real APIs. All phases reference this.

```
ISP:
  name: IQ Fiber
  primaryColor: #5B21B6  ← verify at iqfiber.com before building (inspect their primary button color)
  supportPhone: 1-833-474-3237
  supportLabel: IQ Fiber Support

Subscriber:
  name: Sarah Chen
  plan: IQ Fiber Gig
  downloadSpeed: 1000 Mbps
  uploadSpeed: 1000 Mbps
  accountStatus: Active

CPE:
  model: Ubiquiti UniFi Dream Machine
  shortName: UniFi Dream Machine
  type: Gateway/Router

LED Diagnosis (scripted):
  result: "Your UniFi Dream Machine's WAN indicator is solid red."
  interpretation: "This means your router is connected to power but can't reach the internet. This is usually fixable."
  route: Outcome 1 (Fixable)

Fix Steps:
  Step 1: "Unplug the power cable from the back of your UniFi Dream Machine."
           Subtext: "The power cable is on the right side of the back panel."
  Step 2: Wait 30 seconds (countdown timer, isWait: true)
           Subtext: "This gives your router time to fully reset."
  Step 3: "Plug the power cable back in."
           Subtext: "Your router will take about 60 seconds to restart."

Appointment Slots:
  - Thursday, May 7 — 9:00 AM to 11:00 AM  [pre-selected]
  - Thursday, May 7 — 1:00 PM to 3:00 PM
  - Friday, May 8 — 10:00 AM to 12:00 PM
  Confirmed slot: Thursday, May 7 — 9:00 AM to 11:00 AM
```

---

## ISP Selection Screen — Reference

### The 10 ISPs

**6 confirmed gaiia customers** — logos from gaiia's production CDN (stable URLs, verified May 2026):

| # | Name | Logo URL |
|---|---|---|
| 1 | **IQ Fiber** ✅ selectable | `https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0c9abbccf0a51770761bc_logo-iqfiber.png` |
| 2 | Resound Networks | `https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03c0735118df0c21dc5_logo-resound.png` |
| 3 | Vistabeam | `https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03cfcd3e7bba80f5bcb_logo-vistabeam.png` |
| 4 | Direct Communications | `https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03858560196ce1215ac_logo-directcomm.png` |
| 5 | Intellipop | `https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03870c80f7c0964b6ab_logo-intellipop.png` |
| 6 | LilaConnect | `https://logo.clearbit.com/lilaconnect.com` (fallback: teal square, "LC" initials) |

**4 non-gaiia small ISPs** — via Clearbit logo API (free, no auth required):

| # | Name | Logo URL |
|---|---|---|
| 7 | Ting Internet | `https://logo.clearbit.com/ting.com` |
| 8 | Nextlink Internet | `https://logo.clearbit.com/nextlink.com` |
| 9 | Crestview Networks | `https://logo.clearbit.com/crestviewnetworks.com` |
| 10 | Wisper Internet | `https://logo.clearbit.com/wisperisp.com` |

> **Clearbit fallback:** If `logo.clearbit.com/{domain}` returns a 404, render a colored square (hash of ISP name → consistent color) with 2-letter initials. Build this into the ISP tile component.

### Cheeky message behavior
- Slides open **inline below the tapped row** — Framer Motion height animation (0 → auto, 200ms ease-out)
- Background: `#FFFBEB`, border: `1px solid #FDE68A`, radius: 12px, text: `#92400E`, 14px, 12px vertical / 16px horizontal padding
- Copy: `"Ha! Good taste — but this prototype was only built for IQ Fiber. Give that one a tap instead. 🙂"`
- Same message for all 9 non-IQ rows
- Dismisses when user taps elsewhere or taps a different row
- At most one message visible at a time

---

## Phase 0 — Project Setup

### For you

Do this entirely yourself. Takes about 20 minutes. No AI needed.

1. **Create a GitHub repo** called `scout-prototype`. Make it public.

2. **Bootstrap Next.js** locally:
   ```bash
   npx create-next-app@latest scout-prototype
   ```
   When prompted: TypeScript → Yes, Tailwind → Yes, App Router → Yes, everything else → defaults.

3. **Push to GitHub:**
   ```bash
   cd scout-prototype
   git add .
   git commit -m "init"
   git push origin main
   ```

4. **Connect to Vercel:**
   - Go to vercel.com, sign in with GitHub
   - Click "Add New Project" → select `scout-prototype`
   - Click Deploy — no config changes needed
   - Live URL in under a minute (e.g. `scout-prototype.vercel.app`)
   - Every push to `main` auto-deploys from here

5. **Install dependencies:**
   ```bash
   npm install framer-motion
   ```
   Push the updated `package.json`.

6. **Check IQ Fiber's brand color:** Open `iqfiber.com`, inspect their primary button, note the exact hex. Replace `#5B21B6` in the fixture data above if it differs. Everything inherits from that one value.

---

## Phase 1 — Shell, Design System, and Fixture Data

### For you

Phase 1 is already done. This section is kept for reference only. Do not re-run this prompt — use Phase 1.5 to make corrections.

---

### Prompt for Claude Code — Phase 1 (already run — reference only)

```
I'm building a mobile app prototype called Scout — a subscriber diagnostic app for internet service providers. The prototype will be a Next.js web app that simulates an iOS-style mobile experience inside a phone frame, viewed on desktop.

Tech stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.

**Task: Build the shell, design system, and data layer. Do not build any screens yet.**

---

## 1. Phone Frame Component

Create `components/PhoneFrame.tsx`.

- Fixed width: 390px, height: 844px (iPhone 14 dimensions)
- Centered on the page with a dark gray (#1a1a1a) background behind it
- Rounded corners: 44px
- Thin border: 1px solid #333
- Inner content area fills the frame with overflow hidden and scroll disabled (we handle scroll per-screen)
- A small notch/pill at the top center (purely cosmetic, 120px wide, 30px tall, #111 fill)
- Status bar area: 44px tall, sits below the notch, shows "9:41" on the left and signal/battery icons (SVG or Unicode) on the right, white text, font-size 12px
- Content slot below the status bar fills remaining height

The frame should feel like a real phone. Clean, not overdone.

---

## 2. Global Layout

Update `app/layout.tsx` to:
- Set background to #0f0f0f (near black)
- Center the PhoneFrame vertically and horizontally on the page
- Import Inter from Google Fonts, apply to body
- No default padding or margin on body

---

## 3. Design Tokens

Create `lib/tokens.ts` with these values. Everything in the app uses these — never raw hex values in components.

```typescript
export const tokens = {
  // ISP Brand (hardcoded in prototype — would load dynamically in production)
  ispPrimary: '#5B21B6',        // IQ Fiber purple — verify at iqfiber.com
  ispPrimaryDark: '#4C1D95',
  ispPrimaryLight: '#EDE9FE',

  // Neutrals
  bg: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  bgTertiary: '#F1F5F9',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // Status
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',

  // Typography scale
  fontXS: '11px',
  fontSM: '13px',
  fontBase: '15px',
  fontMD: '17px',
  fontLG: '20px',
  fontXL: '24px',
  font2XL: '28px',

  // Spacing
  space4: '4px',
  space8: '8px',
  space12: '12px',
  space16: '16px',
  space20: '20px',
  space24: '24px',
  space32: '32px',
  space48: '48px',
}
```

---

## 4. Fixture Data

Create `lib/fixture.ts` with this exact data:

```typescript
export const fixture = {
  isp: {
    name: 'IQ Fiber',
    primaryColor: '#5B21B6',
    supportPhone: '1-833-474-3237',
    supportLabel: 'IQ Fiber Support',
  },
  subscriber: {
    name: 'Sarah Chen',
    firstName: 'Sarah',
    plan: 'IQ Fiber Gig',
    downloadSpeed: 1000,
    uploadSpeed: 1000,
    accountStatus: 'Active' as const,
  },
  cpe: {
    model: 'Ubiquiti UniFi Dream Machine',
    shortName: 'UniFi Dream Machine',
    type: 'Gateway/Router',
  },
  diagnosis: {
    ledResult: "Your UniFi Dream Machine's WAN indicator is solid red.",
    interpretation: "This means your router is connected to power but can't reach the internet. This is usually fixable.",
    confidence: 'high' as const,
    outcome: 'fixable' as const,
  },
  fixSteps: [
    {
      id: 1,
      instruction: 'Unplug the power cable from the back of your UniFi Dream Machine.',
      subtext: 'The power cable is on the right side of the back panel.',
    },
    {
      id: 2,
      instruction: 'Wait 30 seconds.',
      subtext: 'This gives your router time to fully reset.',
      isWait: true,
      waitSeconds: 30,
    },
    {
      id: 3,
      instruction: 'Plug the power cable back in.',
      subtext: 'Your router will take about 60 seconds to restart.',
    },
  ],
  appointmentSlots: [
    { id: 'a1', date: 'Thursday, May 7', time: '9:00 AM – 11:00 AM' },
    { id: 'a2', date: 'Thursday, May 7', time: '1:00 PM – 3:00 PM' },
    { id: 'a3', date: 'Friday, May 8', time: '10:00 AM – 12:00 PM' },
  ],
  confirmedAppointment: {
    date: 'Thursday, May 7',
    time: '9:00 AM – 11:00 AM',
  },
}
```

---

## 5. Global Components

**`components/BottomNav.tsx`**
- Three tabs: Home (house icon), Account (person icon), Billing (receipt icon)
- Home tab active (ispPrimary), Account and Billing muted gray, no interaction
- Fixed at bottom, 56px tall, white background, thin top border
- SVG icons inline, no icon library

**`components/EscapeHatch.tsx`**
- Small persistent link: "Talk to a person →"
- Tapping shows overlay: "Call IQ Fiber Support" with phone number from fixture
- Styled as small text link in ispPrimary, top-right inside content area

**`components/BackButton.tsx`**
- Left-facing chevron + "Back" in ispPrimary
- Top-left of content area
- Accepts `onBack` prop — parent handles navigation
- Not shown on splash, login, OTP, or confirmation screens

When done, app renders an empty phone frame on a dark background with status bar visible. No screens yet. Commit with message "phase-1: shell and design system".
```

---

## Phase 1.5 — Brand and Fixture Corrections

### For you

Phase 1 was run with placeholder values. This phase makes two corrections before any screens are built:

1. **IQ Fiber brand color** — verify the exact hex at `iqfiber.com` (inspect their primary button). The prompt uses `#5B21B6` as the assumed value — update it if your inspection shows something different before running.
2. **Sweep for any stale values** — if Phase 1 output contained "Uplink Internet" or `#0EA5E9` anywhere, this prompt removes them.

Run this in the same Claude Code session before moving to Phase 2.

---

### Prompt for Claude Code — Phase 1.5

```
The Scout prototype shell was just built in Phase 1. Before building any screens, I need to correct the fixture data and design tokens to use the confirmed ISP values.

**Task: Update lib/fixture.ts and lib/tokens.ts only. Do not touch any other files.**

---

## Updates to lib/tokens.ts

Replace the three isp token values with:

```typescript
ispPrimary: '#5B21B6',       // IQ Fiber purple — update this hex if iqfiber.com shows a different value
ispPrimaryDark: '#4C1D95',
ispPrimaryLight: '#EDE9FE',
```

---

## Updates to lib/fixture.ts

Replace the entire `isp` object with:

```typescript
isp: {
  name: 'IQ Fiber',
  primaryColor: '#5B21B6',      // must match tokens.ispPrimary exactly
  supportPhone: '1-833-474-3237',
  supportLabel: 'IQ Fiber Support',
},
```

Replace the `subscriber` object with:

```typescript
subscriber: {
  name: 'Sarah Chen',
  firstName: 'Sarah',
  plan: 'IQ Fiber Gig',
  downloadSpeed: 1000,
  uploadSpeed: 1000,
  accountStatus: 'Active' as const,
},
```

All other fixture values (cpe, diagnosis, fixSteps, appointmentSlots, confirmedAppointment) stay unchanged.

---

## Verification

After changes:
- Search the entire codebase for "Uplink" — remove or replace any occurrences
- Search for "#0EA5E9" — replace with "#5B21B6" if found
- Confirm `fixture.isp.primaryColor` matches `tokens.ispPrimary`

Commit with message "phase-1.5: IQ Fiber brand update".
```

---

## Phase 2 — Onboarding Flow (Screens 1.1 → 2.1)

### For you

Covers splash through home dashboard. The OTP correct code is `123456` — any other input shakes and errors. No backend needed.

---

### Prompt for Claude Code — Phase 2

```
Continuing work on the Scout prototype (Next.js, TypeScript, Tailwind, Framer Motion). Shell, design tokens, and fixture data are built in Phase 1/1.5. Import from `lib/tokens.ts` and `lib/fixture.ts` — do not recreate those files.

**Task: Build the onboarding flow — screens 1.1 through 2.1.**

---

## Navigation Model

Entire app is a single page. Use `currentScreen` state in `app/page.tsx`. Transitions use Framer Motion `AnimatePresence` — forward navigation slides new screen in from right, old screen exits left. Back reverses direction.

---

## Screen 1.1 — Splash

- White background
- Centered vertically: "scout" wordmark in ispPrimary, 36px, lowercase, Inter, font-weight 700
- Tagline: "Internet support that actually helps." textSecondary, 15px, below wordmark
- "Get Started" button pinned near bottom: full-width, ispPrimary background, white text, 16px, 56px tall, 12px radius, 24px horizontal margin
- No back button, no escape hatch, no nav
- Tap → screen 1.2

---

## Screen 1.2 — ISP Selection

- Header: "Who's your internet provider?" textPrimary, 24px, 28px top, 16px horizontal padding
- Search input: placeholder "Search providers…", borderStrong border, 12px radius, 44px tall, 16px margin
  - Real-time client-side filter on ISP name, case-insensitive
- Scrollable list of 10 ISPs below search

**ISP list — hardcode in this exact order:**

```typescript
const ISP_LIST = [
  {
    id: 'iqfiber',
    name: 'IQ Fiber',
    logoUrl: 'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0c9abbccf0a51770761bc_logo-iqfiber.png',
    selectable: true,
  },
  {
    id: 'resound',
    name: 'Resound Networks',
    logoUrl: 'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03c0735118df0c21dc5_logo-resound.png',
    selectable: false,
  },
  {
    id: 'vistabeam',
    name: 'Vistabeam',
    logoUrl: 'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03cfcd3e7bba80f5bcb_logo-vistabeam.png',
    selectable: false,
  },
  {
    id: 'directcomm',
    name: 'Direct Communications',
    logoUrl: 'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03858560196ce1215ac_logo-directcomm.png',
    selectable: false,
  },
  {
    id: 'intellipop',
    name: 'Intellipop',
    logoUrl: 'https://cdn.prod.website-files.com/685d8548ff18f67e0ca8eebe/68b0b03870c80f7c0964b6ab_logo-intellipop.png',
    selectable: false,
  },
  {
    id: 'lilaconnect',
    name: 'LilaConnect',
    logoUrl: 'https://logo.clearbit.com/lilaconnect.com',
    selectable: false,
  },
  {
    id: 'ting',
    name: 'Ting Internet',
    logoUrl: 'https://logo.clearbit.com/ting.com',
    selectable: false,
  },
  {
    id: 'nextlink',
    name: 'Nextlink Internet',
    logoUrl: 'https://logo.clearbit.com/nextlink.com',
    selectable: false,
  },
  {
    id: 'crestview',
    name: 'Crestview Networks',
    logoUrl: 'https://logo.clearbit.com/crestviewnetworks.com',
    selectable: false,
  },
  {
    id: 'wisper',
    name: 'Wisper Internet',
    logoUrl: 'https://logo.clearbit.com/wisperisp.com',
    selectable: false,
  },
]
```

**Row component:**
- 64px tall, full-width tap target, 16px horizontal padding
- Logo: 40×40px left-aligned, object-fit: contain
- Logo error fallback: on `onError`, render a 40×40px colored square (use a simple hash of the ISP id to pick a consistent hue) with 2-letter initials in white, 14px, centered
- ISP name: 15px, textPrimary, 12px gap from logo
- 1px bottom border in border color

**Selection behavior:**

Tapping IQ Fiber (`selectable: true`):
- Navigate to screen 1.3

Tapping any other ISP (`selectable: false`):
- Row flashes bgTertiary, 150ms, returns to white
- Inline message slides open below the tapped row: Framer Motion `AnimatePresence`, height 0 → auto, 200ms ease-out
- Message: "Ha! Good taste — but this prototype was only built for IQ Fiber. Give that one a tap instead. 🙂"
- Message box: background `#FFFBEB`, border `1px solid #FDE68A`, radius 12px, text `#92400E`, 14px, 12px vertical / 16px horizontal padding
- State: `activeMessageId: string | null`
- Tapping elsewhere or a different row: close current message (height → 0), open new one if applicable
- Only one message visible at a time

Below list: "My provider isn't listed" textMuted, 14px, centered, 16px top margin — tapping does nothing.

---

## Screen 1.3 — Login

- IQ Fiber logo (40px, from ISP_LIST logoUrl) + "IQ Fiber" centered at top, 32px top padding
- "Sign in to your account" textPrimary, 20px, centered, 16px below branding
- Toggle: Phone / Email — two pill options side by side, ispPrimary active, bgTertiary inactive
- Input field: placeholder updates with toggle
- "Send Verification Code" button: same style as splash CTA
- Any input accepted — always advances
- Tap → screen 1.4
- Back button present, no escape hatch

---

## Screen 1.4 — OTP Verification

- "Check your messages" textPrimary, 22px, 28px top
- Subtext: "We sent a 6-digit code to the number you entered." textSecondary, 15px
- 6 individual input boxes side by side: each 44px wide × 56px tall, borderStrong border, large centered text
  - Auto-focus first box, auto-advance on each digit entry
- Correct code: `123456`
  - On correct: all boxes flash green border, advance to screen 2.1
- Incorrect code: boxes shake (Framer Motion x keyframe), red border briefly, "Incorrect code — try again" in error color below
- "Resend code" appears after 10 seconds: starts textMuted, becomes ispPrimary and tappable when timer expires
- Back button present

---

## Screen 2.1 — Home Dashboard

**Layout top to bottom:**

1. ISP header bar (56px, white, bottom border):
   - Left: IQ Fiber logo 28px + "IQ Fiber" textPrimary, 14px, font-weight 500
   - Right: circle avatar "SC", 32px, ispPrimaryLight bg, ispPrimary text

2. Status card (16px margin, 12px radius, bgSecondary, 16px padding):
   - Badge: pill, successLight bg, success text, "Active"
   - Name: "Sarah Chen" textPrimary, 18px, font-weight 600
   - Plan: "IQ Fiber Gig" textSecondary, 14px
   - Speed: "1,000 Mbps down / 1,000 Mbps up" textMuted, 13px

3. Equipment card (16px margin, 12px radius, bgSecondary, 16px padding, 12px below status card):
   - Label: "YOUR EQUIPMENT" textMuted, 11px, letter-spacing 0.08em
   - Model: "Ubiquiti UniFi Dream Machine" textPrimary, 15px
   - Type: "Gateway / Router" textMuted, 13px
   - Simple router SVG (box + two antenna lines), 32px, textMuted, right-aligned

4. Primary CTA: "Troubleshoot an Issue" — full width, ispPrimary, 56px, 16px, 16px horizontal margin, 20px top

5. Secondary links (textMuted, 14px, centered, 12px gap):
   - "View account details" — tap does nothing
   - "Billing & payments" — tap does nothing

6. BottomNav pinned at bottom
```

---

## Phase 3 — Diagnostic Flow (Screens 3.1 → 5.6)

### For you

The core of the product. Screen 5.4 is pure simulation — tapping "Take Photo" routes directly to the scripted analysis sequence. No camera opens. Screen 5.6 is the most important screen in the prototype; get the copy right.

---

### Prompt for Claude Code — Phase 3

```
Continuing the Scout prototype. Phases 1, 1.5, and 2 are complete. Import from lib/tokens.ts and lib/fixture.ts as needed. Add new screens to the existing navigation model in app/page.tsx.

**Task: Build the diagnostic intake flow — screens 3.1 through 5.6.**

---

## Screen 3.1 — Issue Selection

- Header: "What's happening?" textPrimary, 24px, 28px top, 16px padding
- Subtext: "Choose the option that best describes the issue." textSecondary, 15px
- Four tap targets, stacked, 16px margin, 12px gap:
  - "No Internet" — wifi-off icon
  - "Slow Internet" — speedometer icon
  - "Wi-Fi not reaching a room" — low signal bars icon
  - "Something Else" — question mark circle icon
- Each: white bg, 1px border, 12px radius, 72px tall, icon (44px left zone) + label (17px, textPrimary)
- Tapping "No Internet" → screen 4.1
- Tapping anything else: inline toast at bottom — "Coming soon in a future update" — dismisses after 2 seconds
- Back button, EscapeHatch present

---

## Screen 4.1 — Outage Check Loading

- Full screen white
- Centered: pulsing circle, ispPrimary, 80px, CSS animate-pulse
- Below: "Checking your area for known issues…" textSecondary, 15px, centered
- Auto-advances to screen 4.3 after 2 seconds
- No interaction, no back button, EscapeHatch present

---

## Screen 4.3 — No Outage Detected

- Centered vertically
- Green checkmark icon, 40px, success color
- "No outages in your area" textPrimary, 20px, centered, 12px below icon
- Subtext: "Your service is running normally. Let's check your equipment." textSecondary, 15px, centered
- Auto-advances to screen 5.1 after 1.5 seconds
- No interaction, no back button, EscapeHatch present

---

## Screen 5.1 — Behavioral Proxy

- "Before we start—" textPrimary, 22px, 28px top, 16px padding
- Question: "Can you see your router or modem right now?" textPrimary, 18px, font-weight 500, 16px top
- Two tap targets, 16px margin, 12px gap:
  - "Yes, I can see it" — ispPrimary border, ispPrimaryLight bg
  - "No, I'm not sure where it is" — standard border, white bg
- Each: 80px tall, 16px radius, centered text, 17px
- Both route to screen 5.3 (note in comment: "No" would normally route to Equipment Locator — out of prototype scope)
- Back button, EscapeHatch present

---

## Screen 5.3 — Device Photo Prompt

- Header: "Take a photo of your router" textPrimary, 22px, 24px top, 16px padding
- Device name: "Ubiquiti UniFi Dream Machine" ispPrimary, 15px, font-weight 500, 4px below header
- Instruction: "Point your camera at the front of your router so the indicator lights are clearly visible." textSecondary, 15px, 16px top
- Diagram: rounded rect 280×180px, bgTertiary, dashed borderStrong, centered, 24px vertical margin
  - Inside: simple SVG router outline (box + small LED dots on front)
  - Below diagram: "Front of device, lights visible" textMuted, 13px, centered
- CTA: "Take Photo" — full width, ispPrimary, 56px, camera icon + text
- Secondary: "Answer questions instead →" textSecondary, 14px, centered — routes to 5.4 in prototype (note: would normally route to yes/no LED flow)
- Back button, EscapeHatch present

---

## Screen 5.4 — Photo Analysis (Simulated)

No camera opens. Tapping "Take Photo" on 5.3 routes directly here.

**Phase 1 — Analysis in progress (0 to 2.5 seconds):**
- Background: #0f0f0f, full screen
- Centered: scanning animation — rect outline 240×160px, ispPrimary border, horizontal scan line moving top→bottom, CSS animation looping
- Sequential messages below, white text, 15px, centered:
  - "Identifying device…" — appears immediately with spinner
  - Spinner → checkmark at 1.2s
  - "Reading indicator lights…" — appears at 1.2s with spinner
  - Spinner → checkmark at 2.3s
- At 2.5s → transition to Phase 2

**Phase 2 — Result:**
- White background returns
- Green pill badge: "Analysis complete" successLight bg, success text, 13px
- LED result from fixture: "Your UniFi Dream Machine's WAN indicator is solid red." textPrimary, 17px, font-weight 500, 16px padding
- Interpretation from fixture: "This means your router is connected to power but can't reach the internet. This is usually fixable." textSecondary, 15px, 12px top
- "Continue →" fades in after 1s: full width, ispPrimary, 56px → screen 5.6
- No back button during analysis. EscapeHatch on Phase 2 only.

---

## Screen 5.6 — AI Diagnosis

- Header: "Here's what we found" textPrimary, 22px, 28px top, 16px padding
- Diagnosis card: bgSecondary, 4px ispPrimary left border, 12px radius, 16px padding, 16px margin
  - Title: "Connection issue detected" textPrimary, 16px, font-weight 600
  - Body: "Your router is online but can't reach the internet. This is the most common type of home internet problem, and most people fix it in under 3 minutes." textSecondary, 15px, 8px top
- "What we'll do:" textMuted, 12px, uppercase, letter-spacing 0.08em, 20px top, 16px padding
- Three checklist items (ispPrimary checkmark + text, 15px textSecondary, 10px gap):
  - "Restart your router the right way"
  - "Confirm your connection comes back"
  - "Book a tech if it doesn't"
- CTA: "Let's fix it" — full width, ispPrimary, 56px, 20px top, 16px margin
- Secondary: "Skip to booking a technician →" textMuted, 14px, centered, 12px below CTA → screen 5.13
- Back button, EscapeHatch present
```

---

## Phase 4 — Fix Flow and Resolution (Screens 5.7 → 5.10)

### For you

Step 2 has the 30-second countdown — the highest-value UX moment in the fix flow. Don't skip it. The reconnection wait uses a 5-second delay before showing the manual button (we can't detect real Wi-Fi).

---

### Prompt for Claude Code — Phase 4

```
Continuing Scout prototype. Phases 1–3 complete. Import fixture data as needed.

**Task: Build the fix flow — screens 5.7 (×3 steps), 5.9, and 5.10.**

---

## Screen 5.7 — Fix Steps (single component, rendered 3 times)

Build a FixStep component. Parent tracks currentStep (0, 1, 2) in app/page.tsx.

**Standard layout:**
- "Step [n] of 3" textMuted, 13px, 16px padding, right-aligned
- Instruction from fixSteps[n].instruction — textPrimary, 22px, font-weight 600, 16px padding, 24px top
- Subtext from fixSteps[n].subtext — textSecondary, 15px, 8px top
- CTA: "Done, what's next?" — full width, ispPrimary, 56px
- Secondary: "Skip this step →" textMuted, 14px, centered
- Both advance to next step. After step 3 → screen 5.9

**Step 2 only (isWait: true):**
- No CTA on mount
- Countdown: "0:30" → "0:00", 56px, ispPrimary, font-weight 700, centered
- Below: "Your router needs this time to fully reset." textSecondary, 15px, centered
- Timer starts on mount (useEffect, setInterval, 1s tick)
- At 0:00: "Done, what's next?" fades in (Framer Motion opacity 0→1, 300ms)

Back button on all steps. EscapeHatch present.

---

## Screen 5.9 — Reconnection Wait

- Centered vertically
- Pulsing ring: ispPrimary, 96px, ring expands and fades, 1.5s loop CSS animation
- "Give it a minute — your router is restarting…" textPrimary, 18px, centered, 20px top
- Subtext: "This usually takes 60–90 seconds." textSecondary, 15px, centered
- Animated ellipsis (three dots cycling)
- After 5 seconds, two elements fade in:
  - "It's back on →" button: full width, success bg, white text, 56px → screen 5.10
  - "Still not reconnecting?" textMuted, 14px, centered, 12px below → screen 5.13
- No back button. EscapeHatch present.

---

## Screen 5.10 — Resolution

- Animated SVG checkmark: stroke-dashoffset draw on mount, 80px, success color
- "You're back online." textPrimary, 28px, font-weight 700, centered, 16px top
- Subtext: "Your UniFi Dream Machine is connected. Here's what fixed it:" textSecondary, 15px, centered
- Summary card: successLight bg, 12px radius, 16px padding, 16px margin
  - Checkmark + "Restarted your router" textPrimary, 15px
- "How'd we do?" textSecondary, 14px, centered, 24px top
  - 5 star icons, 32px each, tap selects, highlights in ispPrimary
- "Done" button: full width, ispPrimary, 56px → screen 2.1
- No back button, no EscapeHatch
```

---

## Phase 5 — Escalation Flow (Screens 5.13 → 5.16)

### For you

Tone on 5.13: "you've done everything, here's the next step" — not "you failed." The appointment booking screen is where the ISP integration story lands even in a prototype. The pre-populated diagnostic summary is the point.

---

### Prompt for Claude Code — Phase 5

```
Continuing Scout prototype. Phases 1–4 complete.

**Task: Build the escalation flow — screens 5.13, 5.14, and 5.16.**

---

## Screen 5.13 — Escalation Intro

- Centered (40% from top)
- Wrench SVG icon, 56px, ispPrimary
- Header: "Let's get a technician out to you." textPrimary, 24px, font-weight 700, centered, 16px top
- Body: "You've done everything you can from home. This one needs a professional look — and they'll already have everything we diagnosed today." textSecondary, 15px, centered, 12px top, 24px horizontal padding
- CTA: "Book an Appointment" — full width, ispPrimary, 56px, 24px top, 16px margin
- Secondary: "Call IQ Fiber Support instead" textSecondary, 14px, centered, 12px below CTA
  - Tapping reveals phone number inline (no actual call)
- Back button, EscapeHatch present

---

## Screen 5.14 — Appointment Booking

- Header: "Choose a time" textPrimary, 22px, 24px top, 16px padding
- Subtext: "A technician will arrive within the selected window." textSecondary, 15px

Appointment slots from fixture.appointmentSlots:
- Cards: full width, 16px margin, 72px tall, 12px radius, border
- Date left (textPrimary, 15px, font-weight 500) / time right (textSecondary, 14px)
- Selected: 2px ispPrimary border, ispPrimaryLight bg, checkmark right
- Slot a1 pre-selected. Tap to select (single select).

Urgency toggle card below slots:
- Full width, 16px margin, border, 12px radius, 16px padding
- "This is affecting my work or essential services" textPrimary, 14px
- "We'll try to prioritize your appointment." textMuted, 13px
- Toggle switch right, defaults off

Diagnostic info disclosure below urgency card:
- "Your technician will have your diagnostic info ›" textSecondary, 14px, collapsed
- Tap to expand (Framer Motion height):
  - "Issue: No internet"
  - "Steps taken: Router restart (3 steps)"
  - "LED state: WAN indicator solid red"
  - "Result: Unresolved after restart"
  - textSecondary, 14px, 8px gap
- "Share this with my technician" toggle, defaults on

CTA: "Confirm Appointment" — full width, ispPrimary, 56px, fixed bottom, 16px margin

Back button, EscapeHatch present.

---

## Screen 5.16 — Appointment Confirmation

- bgSecondary full-screen
- White card (16px margin, 16px radius, 20px padding), centered with top bias:
  - Green checkmark icon, 40px, centered
  - "Appointment confirmed" textPrimary, 20px, font-weight 700, centered, 8px below
  - "Thursday, May 7 · 9:00 AM – 11:00 AM" ispPrimary, 16px, font-weight 500, centered, 12px below
  - Horizontal divider
  - "Your technician will have your full diagnostic report when they arrive." textSecondary, 14px, centered, 12px below
  - "IQ Fiber Support · 1-833-474-3237" textMuted, 13px, centered, 8px below
- "Add to Calendar" button below card: ispPrimary border and text, white bg, full width minus 32px, 48px — wired tap target, does nothing
- "Done" textMuted, 14px, centered, 12px below → screen 2.1
- No back button, no EscapeHatch
```

---

## Phase 6 — Polish and Deploy

### For you

Done in Cursor, not Claude Code. Goal is feel, not features.

1. **Run the full forward flow:** Splash → ISP Selection (tap a wrong ISP first, confirm the message appears, then tap IQ Fiber) → Login → OTP (try a wrong code first) → Home → No Internet → Outage Check → No Outage → Behavioral Proxy → Photo Prompt → Photo Analysis → Diagnosis → Fix Step 1 → Fix Step 2 (watch the full countdown) → Fix Step 3 → Reconnection Wait → Resolution → Home.

2. **Run the escalation branch:** Diagnosis → "Skip to booking" → Escalation Intro → Appointment Booking (toggle the diagnostic disclosure, try the urgency toggle) → Confirmation → Home.

3. **Check every transition:** Forward = slide left, back = slide right. Any screen that pops instead of slides — fix it.

4. **Test on your actual phone:** Open the Vercel URL in mobile Safari on your iPhone. Check:
   - Tap targets smaller than 44×44px
   - Text that feels too small on the real screen
   - Any screen requiring scroll when it shouldn't

5. **Photo analysis screen:** Watch the sequence three times — scan animation, sequential checkmarks, result reveal, Continue fade-in. Adjust delays if timing feels off.

6. **Fix Step 2 countdown:** Watch it once. If 30 seconds feels too long for a demo, change `waitSeconds` to 15 in `lib/fixture.ts`.

7. **Fill in the prototype section of the memo** — replace the `[PROTOTYPE PLAN]` placeholder in `resolve_customer_memo_v4.md` with:
   > The prototype covers the complete no-internet diagnostic loop: ISP selection with 10 real providers (6 confirmed gaiia customers), account recognition, outage check, photo-based LED diagnosis with simulated AI analysis, device-specific guided fix steps including a timed reboot sequence, reconnection detection, and technician appointment booking with pre-populated diagnostic context. The slow internet and "something else" flows are fully specified in the screen inventory but excluded from the prototype — the no-internet flow is the binary, demonstrable case that proves the diagnostic thesis. Camera integration and SSID detection are simulated; the prototype makes no real API calls.

8. **Push final commit:** `"phase-6: polish"`. Confirm the Vercel URL loads clean before submitting.

---

## Quick Reference — Screen Flow

```
Splash (1.1)
  → ISP Selection (1.2)
      [wrong ISP] → cheeky inline message, stays on screen
      [IQ Fiber] → Login (1.3)
        → OTP (1.4)
          → Home Dashboard (2.1)
            → Issue Selection (3.1)
              → [No Internet]
                → Outage Check Loading (4.1) [2s auto-advance]
                  → No Outage Detected (4.3) [1.5s auto-advance]
                    → Behavioral Proxy (5.1)
                      → Photo Prompt (5.3)
                        → Photo Analysis (5.4) [2.5s simulated]
                          → AI Diagnosis (5.6)
                            → [Let's fix it]
                              → Fix Step 1 (5.7)
                                → Fix Step 2 — 30s countdown (5.7)
                                  → Fix Step 3 (5.7)
                                    → Reconnection Wait (5.9) [5s delay]
                                      → Resolution (5.10) → Home (2.1)
                                      → [Still not reconnecting]
                                        → Escalation Intro (5.13)
                            → [Skip to booking]
                              → Escalation Intro (5.13)
                                → Appointment Booking (5.14)
                                  → Appointment Confirmation (5.16)
                                    → Home Dashboard (2.1)
```
