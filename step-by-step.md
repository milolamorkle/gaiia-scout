# Scout — Prototype Build Plan

---

## How This Document Works

Each phase has two sections:

**For you:** What you're doing, why, and any decisions you need to make before handing off to AI.

**Prompt for AI:** Copy this directly into Claude Code (or Cursor). These are written to be self-contained — the AI gets all the context it needs in the prompt itself.

---

## Screens We're Building

The full app has 44 screens. We're building 16, representing the complete no-internet diagnostic loop plus the escalation path. This is the right scope — it proves the thesis without sprawling.

### Definite Builds (P0) — 16 screens

| ID | Screen Name | Notes |
|---|---|---|
| 1.1 | Splash | Scout logo, "Get Started" |
| 1.2 | ISP Selection | Search + list, ISP branding loads on select |
| 1.3 | Login | Phone/email input, "Send Code" CTA |
| 1.4 | OTP Verification | 6-digit input, auto-advance on correct entry |
| 2.1 | Home Dashboard | Subscriber name, CPE, plan, status badge, primary CTA |
| 3.1 | Issue Selection | No Internet / Slow Internet / Something Else |
| 4.1 | Outage Check Loading | Animated, "Checking your area…" |
| 4.3 | No Outage Detected | Brief, auto-advances after 1.5s |
| 5.1 | Behavioral Proxy | "Can you see your router?" Yes / No |
| 5.3 | Device Photo Prompt | "Take a photo of your Ubiquiti router" + diagram |
| 5.4 | Photo Analysis | Simulated — tap → 2s animation → scripted result |
| 5.6 | AI Diagnosis | "Your router can't find an internet connection." → Fix CTA |
| 5.7 | Fix Step (×2 screens) | Step 1: Unplug power. Step 2: Wait, then replug. |
| 5.9 | Reconnection Wait | Animated, "Give it a minute…" + manual "It's back on" |
| 5.10 | Resolution | "You're back online." + star rating |
| 5.13 | Escalation Intro | "Let's get a technician out to you." |
| 5.14 | Appointment Booking | Date/time slot picker (fixture data) |
| 5.16 | Appointment Confirmation | Confirmed slot, "Add to calendar" |

### Cut from prototype (with reason)

| Screen | Why Cut |
|---|---|
| 1.5 Permissions | Browser permissions don't work the same way — confusing to simulate |
| 4.2 Outage Confirmed | Show the "no outage" path only — cleaner demo loop |
| 5.2 Equipment Locator | P1 — the "can't find it" branch. Add if time allows |
| 5.5 Yes/No LED fallback | P1 — fallback to photo flow. Add if time allows |
| 5.8 Step Photo Validation | Camera simulation adds complexity, skip in prototype |
| 5.11–5.12 Ambiguous Steps | P1 — second outcome path. Add if time allows |
| 5.15 Diagnostic Summary | P1 — collapsed disclosure panel. Add if time allows |
| 7.x Slow Internet | P2 — separate flow, defined in screen inventory |
| 9.x Other Flow | P2 — separate flow, defined in screen inventory |

---

## Fixture Data (Shared Across All Phases)

Everything in the prototype is hardcoded. No real APIs. This is the single source of truth — every prompt references it.

```
ISP:
  name: Uplink Internet
  primaryColor: #0EA5E9
  supportPhone: 1-800-465-5465

Subscriber:
  name: Sarah Chen
  plan: Uplink Fiber 500
  downloadSpeed: 500 Mbps
  uploadSpeed: 100 Mbps
  accountStatus: Active

CPE:
  model: Ubiquiti UniFi Dream Machine
  type: Gateway/Router combo
  ports: [WAN (blue), LAN 1-4 (white), Power]

LED Diagnosis (scripted):
  result: "Your UniFi Dream Machine's WAN indicator is solid red."
  interpretation: "This means your router is connected to power but can't reach the internet. This is usually fixable."
  route: Outcome 1 (Fixable)

Fix Steps:
  Step 1: "Unplug the power cable from the back of your UniFi Dream Machine."
  Step 2: "Wait 30 seconds, then plug it back in."
  Step 3: (reconnection wait)

Appointment Slots:
  - Thursday, May 7 — 9:00 AM to 11:00 AM
  - Thursday, May 7 — 1:00 PM to 3:00 PM
  - Friday, May 8 — 10:00 AM to 12:00 PM
  Confirmed slot (fixture): Thursday, May 7 — 9:00 AM to 11:00 AM
```

---

## Phase 0 — Project Setup

### For you

This is the only phase you do entirely yourself, without AI. Takes about 20 minutes.

1. **Create a GitHub repo** called `scout-prototype`. Make it public.
2. **Bootstrap Next.js** locally:
   ```
   npx create-next-app@latest scout-prototype
   ```
   When prompted: TypeScript → Yes, Tailwind → Yes, App Router → Yes, everything else → defaults.
3. **Push to GitHub:**
   ```
   cd scout-prototype
   git add .
   git commit -m "init"
   git push origin main
   ```
4. **Connect to Vercel:**
   - Go to vercel.com, sign up or log in with GitHub
   - Click "Add New Project"
   - Select `scout-prototype` from your repos
   - Click Deploy — no config changes needed
   - You'll have a live URL in under a minute (e.g. `scout-prototype.vercel.app`)
   - Every push to `main` from here auto-deploys

5. **Install one additional dependency** you'll need:
   ```
   npm install framer-motion
   ```
   This handles screen transitions. Push the updated `package.json`.

That's it for Phase 0. You now have a live URL and automatic deploys.

---

## Phase 1 — Shell, Design System, and Fixture Data

### For you

Before Claude Code writes a single screen, it needs a design system to work within. Otherwise every screen looks different. This phase produces:
- A phone frame component that wraps the whole app
- A color/typography system
- The fixture data file
- Global layout

Open Claude Code and start a new session. Paste the prompt below. Do not ask it to build any screens yet.

---

### Prompt for Claude Code — Phase 1

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
  // ISP Brand (loaded dynamically in real app — hardcoded in prototype)
  ispPrimary: '#0EA5E9',        // Uplink Internet blue
  ispPrimaryDark: '#0284C7',
  ispPrimaryLight: '#E0F2FE',

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

  // Spacing (use these as px values in inline styles or Tailwind arbitrary values)
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
    name: 'Uplink Internet',
    primaryColor: '#0EA5E9',
    supportPhone: '1-800-465-5465',
    supportLabel: 'Uplink Support',
  },
  subscriber: {
    name: 'Sarah Chen',
    firstName: 'Sarah',
    plan: 'Uplink Fiber 500',
    downloadSpeed: 500,
    uploadSpeed: 100,
    accountStatus: 'Active' as const,
  },
  cpe: {
    model: 'Ubiquiti UniFi Dream Machine',
    shortName: 'UniFi Dream Machine',
    type: 'Gateway/Router',
  },
  diagnosis: {
    ledResult: 'Your UniFi Dream Machine\'s WAN indicator is solid red.',
    interpretation: 'This means your router is connected to power but can\'t reach the internet. This is usually fixable.',
    confidence: 'high' as const,
    outcome: 'fixable' as const,
  },
  fixSteps: [
    {
      id: 1,
      instruction: 'Unplug the power cable from the back of your UniFi Dream Machine.',
      subtext: 'The power cable is on the right side of the back panel.',
      skipLabel: 'If the cable goes into the wall and won\'t reach, tap Skip',
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

Create these small shared components. Keep them simple.

**`components/BottomNav.tsx`**
- Three tabs: Home (house icon), Account (person icon), Billing (receipt icon)
- Home tab is active (blue), Account and Billing are muted gray with no interaction
- Fixed at bottom of screen, 56px tall, white background, thin top border
- Use SVG icons inline, no icon library

**`components/EscapeHatch.tsx`**
- A small persistent link at the top of diagnostic screens: "Talk to a person →"
- Tapping shows a simple overlay: "Call Uplink Support" with the phone number from fixture data
- Styled as a small text link in ispPrimary color, positioned top-right inside the content area

**`components/BackButton.tsx`**
- Left-facing chevron + "Back" text in ispPrimary color
- Top-left of content area
- Accepts an `onBack` prop (function) — parent handles navigation logic
- Not shown on splash, login, or confirmation screens

---

When done, the app should render an empty phone frame on a dark background with the status bar visible. No screens yet — just the shell. Commit with message "phase-1: shell and design system".
```

---

## Phase 2 — Onboarding Flow (Screens 1.1 → 2.1)

### For you

Once Phase 1 is committed and deployed, start a new Claude Code session. This phase covers everything from splash through to the home dashboard — the first thing a user sees.

One decision to make: the OTP screen should have a "correct" code for the demo. Use `123456`. Any other input shows a shake animation and "Incorrect code" error. This avoids needing any backend.

---

### Prompt for Claude Code — Phase 2

```
I'm continuing work on the Scout prototype (Next.js, TypeScript, Tailwind, Framer Motion). The shell, design tokens, and fixture data are already built in Phase 1. Do not recreate those files — import from `lib/tokens.ts` and `lib/fixture.ts` wherever needed.

**Task: Build the onboarding flow — screens 1.1 through 2.1.**

---

## Navigation Model

The entire app is a single page. Use a `currentScreen` state variable in `app/page.tsx` to track which screen is showing. Transitions between screens use Framer Motion's `AnimatePresence` with a simple slide-left animation (new screen slides in from right, old screen exits to left). This creates the feel of navigating forward in a native app.

For "back" navigation, slide in the opposite direction.

---

## Screen 1.1 — Splash

- White background
- Centered vertically: Scout wordmark ("scout") in ispPrimary color, large (36px), lowercase, Inter font, font-weight 700
- Tagline below: "Internet support that actually helps." in textSecondary, 15px
- "Get Started" button at bottom: full-width, ispPrimary background, white text, 16px font, 56px tall, 12px border radius, 24px horizontal margin
- No back button, no escape hatch, no nav
- Tap "Get Started" → screen 1.2

---

## Screen 1.2 — ISP Selection

- Header: "Who's your internet provider?" in textPrimary, 24px, 28px top padding
- Search input below header: placeholder "Search providers…", border in borderStrong color, 12px radius, 44px tall
- List of ISP tiles below search (hardcoded — do not wire up search filtering):
  - Tile 1: "Uplink Internet" — show a colored square (ispPrimary) as logo placeholder, ISP name in textPrimary
  - Tile 2: "Clearwave Fiber" — gray square placeholder
  - Tile 3: "Ridgeline Wireless" — gray square placeholder
  - Tile 4: "Summit Broadband" — gray square placeholder
- Each tile: full width, 64px tall, horizontal layout (logo 40px square + name), separated by thin borders
- Tapping "Uplink Internet" → screen 1.3 (other tiles do nothing)
- Below list: small muted link — "My provider isn't listed" in textMuted color, centered, 14px

---

## Screen 1.3 — Login

- Uplink Internet branding at top: show the colored square logo (40px) + "Uplink Internet" name centered, 32px top padding
- Below branding: "Sign in to your account" in textPrimary, 20px, centered
- Toggle between Phone and Email input (two pill-shaped toggle options side by side, ispPrimary active state)
- Input field below toggle: placeholder "Phone number" or "Email address" depending on toggle
- "Send Verification Code" button: same style as splash CTA button
- Any input value is accepted — button always proceeds
- Tap "Send Verification Code" → screen 1.4
- Back button present, no escape hatch

---

## Screen 1.4 — OTP Verification

- "Check your messages" header, 22px
- Subtext: "We sent a 6-digit code to the number you entered." in textSecondary
- 6-digit code input: six individual boxes side by side, each 44px wide × 56px tall, border in borderStrong, large centered text, auto-focus first box, tab/advance on each digit entry
- Correct code: 123456
  - On correct: brief green flash on all boxes, then auto-advance to screen 2.1
- Incorrect code: boxes shake (Framer Motion), brief red border, "Incorrect code — try again" text appears below
- "Resend code" link appears after 10 seconds (shortened from 30s for demo), textMuted color, becomes active (ispPrimary) when timer expires
- Back button present

---

## Screen 2.1 — Home Dashboard

This is the "logged in" state and the most information-dense screen in the onboarding flow. Get this one right — it establishes what the product is.

**Layout (top to bottom):**

1. ISP header bar: Uplink Internet logo square + "Uplink Internet" name on left, small account avatar circle (initials "SC" for Sarah Chen) on right. Height 56px, white background, bottom border.

2. Status card: 16px horizontal margin, rounded card (12px radius), bgSecondary background, 16px padding
   - Account status badge: small pill, success green background, "Active" text in success color
   - Subscriber name: "Sarah Chen" in textPrimary, 18px, font-weight 600
   - Plan: "Uplink Fiber 500" in textSecondary, 14px
   - Speed: "500 Mbps down / 100 Mbps up" in textMuted, 13px

3. Equipment card: same margin/style as status card, below status card with 12px gap
   - Label: "Your Equipment" in textSecondary, 12px, uppercase, letter-spacing
   - Equipment name: "Ubiquiti UniFi Dream Machine" in textPrimary, 15px
   - Type: "Gateway / Router" in textMuted, 13px
   - Small router icon (SVG, keep it simple — a box with antenna lines) on the right

4. Primary CTA: "Troubleshoot an Issue" button — full width, ispPrimary background, white text, 56px tall, 16px font, 16px horizontal margin, 20px top margin. This is the most prominent element on the screen.

5. Secondary links below CTA (muted, textMuted, 14px, centered):
   - "View account details" (does nothing)
   - "Billing & payments" (does nothing)

6. Bottom nav (from BottomNav component)

No back button on this screen. EscapeHatch not shown here (only on diagnostic screens).
```

---

## Phase 3 — Diagnostic Flow (Screens 3.1 → 5.6)

### For you

This phase covers intake through AI diagnosis — the heart of the product. The "AI" in screen 5.4 is pure simulation: user taps the camera button, sees a 2-second loading animation with two sequential status messages, then gets the scripted result from fixture data. Do not wire up any real camera or AI API.

The most important screen in this phase is 5.6 (AI Diagnosis). It's the moment the product proves its value. Make sure the copy matches the fixture data exactly.

---

### Prompt for Claude Code — Phase 3

```
Continuing the Scout prototype. Phase 1 (shell) and Phase 2 (onboarding) are complete. Import from `lib/tokens.ts` and `lib/fixture.ts` as needed. Add new screens to the existing navigation model in `app/page.tsx`.

**Task: Build the diagnostic intake flow — screens 3.1 through 5.6.**

---

## Screen 3.1 — Issue Selection

- Header: "What's happening?" in textPrimary, 24px, 28px top padding, 16px horizontal padding
- Subtext: "Choose the option that best describes the issue." in textSecondary, 15px
- Four large tap targets below, stacked vertically, 16px horizontal margin, 12px gap between:
  - "No Internet" — icon: wifi with X through it
  - "Slow Internet" — icon: speedometer or turtle (simple SVG)
  - "Wi-Fi not reaching a room" — icon: signal bars low
  - "Something Else" — icon: question mark circle
- Each target: white background, 1px border in border color, 12px radius, 72px tall, horizontal layout (icon left 44px + label text left-aligned 17px textPrimary)
- Tapping "No Internet" → screen 4.1
- Tapping anything else: show a brief toast or inline text "Coming soon in a future update" — do not route anywhere
- Back button present, EscapeHatch present

---

## Screen 4.1 — Outage Check Loading

- Full screen, white background
- Centered vertically: animated pulse circle (ispPrimary color, 80px, CSS pulse animation)
- Below animation: "Checking your area for known issues…" in textSecondary, 15px, centered
- Automatically advances to screen 4.3 after 2 seconds (setTimeout)
- No user interaction on this screen
- No back button, EscapeHatch present

---

## Screen 4.3 — No Outage Detected

- Centered vertically
- Green checkmark icon (40px, success color)
- "No outages in your area" in textPrimary, 20px, centered, below icon
- Subtext: "Your service is running normally. Let's check your equipment." in textSecondary, 15px, centered
- Automatically advances to screen 5.1 after 1.5 seconds
- No user interaction
- No back button, EscapeHatch present

---

## Screen 5.1 — Behavioral Proxy

- Header: "Before we start—" in textPrimary, 22px, 28px top padding, 16px padding
- Question below: "Can you see your router or modem right now?" in textPrimary, 18px, font-weight 500
- Two large tap targets below, 16px margin, 12px gap:
  - "Yes, I can see it" — primary option, ispPrimary border, ispPrimaryLight background
  - "No, I'm not sure where it is" — secondary option, standard border
- Each tap target: 80px tall, 16px radius, centered text, 17px font
- Tapping "Yes, I can see it" → screen 5.3
- Tapping "No, I'm not sure where it is" → also route to screen 5.3 (Equipment Locator screen 5.2 is out of prototype scope — simplify the branch)
- Back button present, EscapeHatch present

---

## Screen 5.3 — Device Photo Prompt

- Header: "Take a photo of your router" in textPrimary, 22px, 24px top padding, 16px padding
- Device name below: "Ubiquiti UniFi Dream Machine" in ispPrimary, 15px, font-weight 500
- Instruction: "Point your camera at the front of your router so the indicator lights are clearly visible." in textSecondary, 15px, 16px top margin
- Diagram placeholder: a rounded rectangle (280px × 180px, bgTertiary background, dashed border in borderStrong), centered, 24px vertical margin. Inside: simple router SVG outline (just a box shape with a few light dots on front). Below diagram in textMuted 13px: "Front of device, lights visible"
- Primary CTA button: "Take Photo" — full width, ispPrimary, 56px tall, camera icon + text
- Secondary link below button: "Answer questions instead →" in textSecondary, 14px, centered — routes to screen 5.3 fallback (but in this prototype, this also routes forward to 5.4 to keep the loop clean — note in a code comment that this would normally route to the yes/no LED question flow)
- Back button present, EscapeHatch present

---

## Screen 5.4 — Photo Analysis (Simulated)

This is the AI showcase moment. The camera never actually opens. Tapping "Take Photo" on 5.3 goes directly to this screen, which simulates the analysis.

**Phase 1 of this screen (Analysis in progress):**
- Dark overlay background (#0f0f0f) — full screen
- Centered: animated scanning graphic (a rectangle outline with a moving horizontal scan line, ispPrimary color — pure CSS animation)
- Below graphic: sequential status messages that appear one at a time with a 1-second delay between:
  1. "Identifying device…" (appears immediately)
  2. "Reading indicator lights…" (appears after 1.2s)
- Each message: white text, 15px, centered, with a small spinner or checkmark when complete
- After 2.5 seconds total → transition to Phase 2 of this screen

**Phase 2 of this screen (Result):**
- White background returns
- At top: small green pill badge "Analysis complete" 
- LED result (from fixture): "Your UniFi Dream Machine's WAN indicator is solid red." in textPrimary, 17px, font-weight 500, 16px padding
- Interpretation (from fixture): "This means your router is connected to power but can't reach the internet. This is usually fixable." in textSecondary, 15px, 16px top margin
- After 1 second, a "Continue →" button fades in at bottom — full width, ispPrimary, 56px tall
- Tap "Continue" → screen 5.6
- EscapeHatch present, no back button during analysis

---

## Screen 5.6 — AI Diagnosis

This screen routes to either the fix flow or escalation. In the prototype, always route to the fix flow.

- Header: "Here's what we found" in textPrimary, 22px, 28px top, 16px padding
- Diagnosis card: white card with ispPrimary left border (4px), bgSecondary background, 16px padding, 12px radius, 16px margin
  - Title: "Connection issue detected" in textPrimary, 16px, font-weight 600
  - Body: "Your router is online but can't reach the internet. This is the most common type of home internet problem, and most people fix it in under 3 minutes." in textSecondary, 15px, 8px top margin
- Below card: "What we'll do:" label in textSecondary, 13px uppercase, 20px top margin
- Three-item checklist below (simple checkmark icons in ispPrimary):
  - "Restart your router the right way"
  - "Confirm your connection comes back"
  - "Book a tech if it doesn't"
- Primary CTA: "Let's fix it" — full width, ispPrimary, 56px tall, 20px top margin
- Secondary link: "Skip to booking a technician →" in textMuted, 14px, centered below CTA — routes to screen 5.13
- Back button present, EscapeHatch present
```

---

## Phase 4 — Fix Flow and Resolution (Screens 5.7 → 5.10)

### For you

This phase builds the guided fix sequence. Steps come directly from `fixture.fixSteps`. Step 2 has a built-in 30-second countdown (the "wait" step) — this is a high-value demo moment, don't skip it. The reconnection wait screen (5.9) should have a manual "It's back on" button since we can't actually detect Wi-Fi.

---

### Prompt for Claude Code — Phase 4

```
Continuing Scout prototype. Phases 1–3 complete. Import fixture data as needed.

**Task: Build the fix flow — screens 5.7 (×3 steps), 5.9, and 5.10.**

---

## Screen 5.7 — Fix Steps (Rendered 3 times, one per step)

Use a single `FixStep` component that accepts step data from `fixture.fixSteps` and a step index. The parent screen tracks current step.

**Layout:**
- Step counter at top: "Step [n] of 3" in textMuted, 13px, 16px padding — right-aligned
- Instruction text: large, prominent — from `fixture.fixSteps[n].instruction` — textPrimary, 22px, font-weight 600, 16px padding, 24px top margin
- Subtext: from `fixture.fixSteps[n].subtext` — textSecondary, 15px, 8px top margin

**Step 2 is special (isWait: true):**
- Show a countdown timer instead of the normal CTA
- Large centered countdown: displays "0:30" counting down to "0:00" — 56px font, ispPrimary color, font-weight 700
- Below timer: "Your router needs this time to fully reset." in textSecondary, 15px, centered
- When timer hits 0, the "Done, what's next?" button appears with a fade-in
- Timer starts automatically when this step screen mounts

**For all other steps:**
- Primary CTA: "Done, what's next?" — full width, ispPrimary, 56px tall
- Secondary: "Skip this step →" in textMuted, 14px, centered — advances same as primary

**After step 3 ("plug back in"):** → screen 5.9

Back button present on all steps, EscapeHatch present.

---

## Screen 5.9 — Reconnection Wait

- Centered vertically
- Animated pulsing ring graphic (similar to outage check loading, but ispPrimary color, slightly larger — 96px)
- "Give it a minute — your router is restarting…" in textPrimary, 18px, centered, 20px top margin
- Subtext: "This usually takes 60–90 seconds." in textSecondary, 15px, centered
- Progress dots or animated ellipsis below subtext
- "It's back on →" button: appears after 5 seconds (setTimeout), full width, success color (#22C55E) background, white text, 56px tall — routes to screen 5.10
- Below button (also after 5s): "Still not reconnecting?" link in textMuted, 14px, centered — routes to screen 5.13 (escalation)
- No back button, EscapeHatch present

---

## Screen 5.10 — Resolution

- Full-screen celebration state
- Large animated checkmark at center-top: draw animation using SVG stroke-dashoffset, success green color, 80px
- "You're back online." in textPrimary, 28px, font-weight 700, centered, 16px top margin
- Subtext: "Your UniFi Dream Machine is connected. Here's what fixed it:" in textSecondary, 15px, centered, 8px top margin
- Summary card below: bgSuccessLight background, 12px radius, 16px padding, 16px margin
  - "Restarted your router" with a checkmark — this is what resolved the issue
- Star rating: "How'd we do?" in textSecondary, 14px, centered, 24px top margin
  - 5 star icons side by side, 32px each, tapping highlights them in ispPrimary (yellow is fine too)
- "Done" button at bottom: full width, ispPrimary, 56px tall — routes back to screen 2.1 (home dashboard)
- No back button, no EscapeHatch (session is complete)
```

---

## Phase 5 — Escalation Flow (Screens 5.13 → 5.16)

### For you

The escalation path needs to feel inevitable but not defeated — "you've done everything, here's the next step" not "you failed." The appointment booking screen is the most technically interesting piece: a simple date/slot picker using fixture data, no real calendar API.

---

### Prompt for Claude Code — Phase 5

```
Continuing Scout prototype. Phases 1–4 complete.

**Task: Build the escalation flow — screens 5.13, 5.14, and 5.16.**

---

## Screen 5.13 — Escalation Intro

- Centered vertically (slight top bias — 40% from top)
- Icon: wrench or hard hat SVG, 56px, ispPrimary color
- Header: "Let's get a technician out to you." in textPrimary, 24px, font-weight 700, centered, 16px top margin
- Body: "You've done everything you can from home. This one needs a professional look — and they'll already have everything we diagnosed today." in textSecondary, 15px, centered, 12px top margin, 24px horizontal padding
- Primary CTA: "Book an Appointment" — full width, ispPrimary, 56px tall, 24px top margin, 16px horizontal margin
- Secondary: "Call Uplink Support instead" in textSecondary, 14px, centered, 12px top — displays phone number from fixture on tap (no actual call in prototype)
- Back button present, EscapeHatch present

---

## Screen 5.14 — Appointment Booking

- Header: "Choose a time" in textPrimary, 22px, 24px top, 16px padding
- Subtext: "A technician will arrive within the selected window." in textSecondary, 15px

- Appointment slots from `fixture.appointmentSlots` — rendered as selectable cards:
  - Each card: full width, 16px margin, 72px tall, 12px radius, border
  - Layout: date on left (textPrimary, 15px, font-weight 500) + time on right (textSecondary, 14px)
  - Selected state: ispPrimary border (2px), ispPrimaryLight background, checkmark icon on right
  - Slot a1 is pre-selected by default

- Urgency toggle below slots: 
  - Small card with toggle switch on right
  - Label: "This is affecting my work or essential services" in textPrimary, 14px
  - Subtext: "We'll try to prioritize your appointment." in textMuted, 13px
  - Toggle defaults to off

- Diagnostic info card at bottom of slot list:
  - Collapsed by default — shows "Your technician will have your diagnostic info ›" in textSecondary, 14px
  - Tap to expand: shows plain text summary — "Issue: No internet / Steps taken: Router restart / LED state: WAN solid red / Result: Unresolved"
  - Toggle: "Share this with my technician" — on by default

- Primary CTA: "Confirm Appointment" — full width, ispPrimary, 56px tall, fixed at bottom with 16px margin
- Back button present, EscapeHatch present

---

## Screen 5.16 — Appointment Confirmation

- Full screen, bgSecondary background
- White card (16px margin, 16px radius, 20px padding) centered with top bias:
  - Green checkmark icon, 40px, centered
  - "Appointment confirmed" in textPrimary, 20px, font-weight 700, centered, 8px top margin
  - Confirmed date/time from fixture: "Thursday, May 7 · 9:00 AM – 11:00 AM" — ispPrimary color, 16px, font-weight 500, centered, 12px top margin
  - Divider line
  - "Your technician will have your full diagnostic report when they arrive." in textSecondary, 14px, centered, 12px top margin
  - "Uplink Internet — [phone number]" in textMuted, 13px, centered, 8px top margin

- "Add to Calendar" button below card: outline style (ispPrimary border and text, white background), full width minus 32px margin, 48px tall — does nothing in prototype but tap target should be real
- "Done" link below: textMuted, 14px, centered — routes back to screen 2.1

- No back button, no EscapeHatch (booking is complete)
```

---

## Phase 6 — Polish and Deploy

### For you

This phase is done in Cursor, not Claude Code. Open the project in Cursor and work through this list manually. The goal is feel, not features.

1. **Test the full flow** start to finish: Splash → ISP Selection → Login → OTP → Home → No Internet → Outage Check → No Outage → Behavioral Proxy → Photo Prompt → Photo Analysis → Diagnosis → Fix Step 1 → Fix Step 2 (countdown) → Fix Step 3 → Reconnection Wait → Resolution. Then test the escalation branch: Diagnosis → Skip to Booking → Escalation Intro → Appointment Booking → Confirmation.

2. **Check transitions**: Every screen change should slide left on forward navigation, slide right on back. If any screen pops instead of slides, fix it.

3. **Test on your phone**: Open the Vercel URL on your iPhone in mobile Safari. Look for:
   - Tap targets smaller than 44px — make them bigger
   - Text that feels too small on the actual screen — bump it up
   - Any screen that requires scrolling when it shouldn't

4. **The AI diagnosis screen specifically**: Play through it three times. The scan animation + sequential text messages + result reveal is the moment this prototype either lands or doesn't. If the timing feels off, adjust the delays.

5. **The 30-second countdown on Fix Step 2**: Watch the whole thing once. It should feel like a feature, not a bug. If it feels too long for a demo, change `waitSeconds` in fixture.ts to 15.

6. **Fill in the prototype section of the memo**: In `resolve_customer_memo_v4.md`, replace the placeholder with something like:
   > The prototype covers the complete no-internet diagnostic loop: ISP selection, account recognition, outage check, photo-based LED diagnosis, device-specific guided fix steps, reconnection detection, and technician appointment booking. The slow internet and "something else" flows are scoped in the screen inventory but excluded from the prototype — the no-internet flow is the binary, demonstrable case that proves the diagnostic thesis. Camera integration and SSID detection are simulated; the prototype makes no real API calls.

7. **Push final commit** with message `"phase-6: polish"`. Verify the Vercel deployment URL works and loads clean.

---

## Quick Reference — Screen Flow

```
Splash (1.1)
  → ISP Selection (1.2)
    → Login (1.3)
      → OTP (1.4)
        → Home Dashboard (2.1)
          → Issue Selection (3.1)
            → [No Internet selected]
              → Outage Check Loading (4.1)
                → No Outage Detected (4.3) [auto-advance]
                  → Behavioral Proxy (5.1)
                    → Photo Prompt (5.3)
                      → Photo Analysis (5.4) [simulated]
                        → AI Diagnosis (5.6)
                          → [Let's fix it]
                            → Fix Step 1 (5.7)
                              → Fix Step 2 — countdown (5.7)
                                → Fix Step 3 (5.7)
                                  → Reconnection Wait (5.9)
                                    → Resolution (5.10) → Home
                                    → Still not working → Escalation Intro (5.13)
                          → [Skip to booking]
                            → Escalation Intro (5.13)
                              → Appointment Booking (5.14)
                                → Appointment Confirmation (5.16) → Home
```
