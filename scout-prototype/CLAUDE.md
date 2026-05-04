@AGENTS.md
# Scout — Codebase Context

Scout is a mobile app prototype built as part of a product management assignment for gaiia, a B2B SaaS platform for internet service providers (ISPs). The prototype simulates a white-labeled subscriber diagnostic app — a product called "Scout" that ISPs would deploy to their customers.

---

## What This Prototype Is

A Next.js web app that renders inside a phone frame (390×844px, iPhone 14 dimensions) on desktop. It simulates a native iOS mobile app experience. All data is hardcoded fixture data — no real APIs, no backend, no authentication.

The prototype demonstrates one complete flow: a subscriber reporting no internet, being guided through AI-assisted diagnosis, completing a router reboot, and either resolving the issue or booking a technician appointment.

---

## Tech Stack

- **Framework:** Next.js 14, App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS (utility classes only — no custom CSS files unless absolutely necessary)
- **Animation:** Framer Motion (screen transitions, loading states, micro-interactions)
- **Fonts:** Inter (Google Fonts)
- **Deployment:** Vercel (auto-deploys on push to main)

---

## Project Structure

```
scout-prototype/
├── app/
│   ├── layout.tsx          # Root layout, Inter font, dark background
│   └── page.tsx            # Single page — all screen state lives here
├── components/
│   ├── PhoneFrame.tsx      # 390×844 phone shell with notch and status bar
│   ├── BackButton.tsx      # Left chevron + "Back", accepts onBack prop
│   ├── BottomNav.tsx       # Home/Account/Billing tabs, Home active by default
│   └── EscapeHatch.tsx     # "Talk to a person →" persistent link
├── lib/
│   ├── tokens.ts           # Design tokens — ALL color/spacing/type values
│   └── fixture.ts          # ALL hardcoded data — ISP, subscriber, CPE, invoices, etc.
└── CLAUDE.md               # This file
```

---

## Design System Rules

**Never use raw hex values in components.** Always import from `lib/tokens.ts`.

**Never use raw px values for spacing.** Use Tailwind classes or the spacing tokens from `lib/tokens.ts`.

**ISP brand color** (`tokens.ispPrimary`) is the single source of truth for all interactive elements — buttons, active states, links, badges, borders on selected items. If in doubt about what color something should be, it's ispPrimary.

**Typography:** Inter throughout. Font sizes from `tokens.fontXS` through `tokens.font2XL`. Never set font-size in raw px outside the token scale.

---

## Navigation Model

The entire app is a single page. `app/page.tsx` holds a `currentScreen` state string and renders the appropriate screen component. Framer Motion `AnimatePresence` handles transitions.

**Forward navigation:** new screen slides in from right, old exits left.
**Back navigation:** new screen slides in from left, old exits right.
**No browser history.** No Next.js routing. Everything is state.

**Screen IDs match the screen inventory document.** Use these IDs in comments when building new screens:
- `splash` → 1.1
- `isp-selection` → 1.2
- `login` → 1.3
- `otp` → 1.4
- `account-loading` → 2.0
- `home` → 2.1
- `account` → 2.2
- `billing` → 2.3
- `issue-selection` → 3.1
- `outage-check` → 4.1
- `behavioral-proxy` → 5.1
- `equipment-locator` → 5.2
- `photo-prompt` → 5.3
- `photo-analysis` → 5.4
- `ai-diagnosis` → 5.6
- `fix-step` → 5.7 (rendered 3 times with step index)
- `reconnection-wait` → 5.9
- `resolution` → 5.10
- `escalation-intro` → 5.13
- `appointment-booking` → 5.14
- `appointment-confirmation` → 5.16

---

## Fixture Data Reference

All data lives in `lib/fixture.ts`. Never hardcode strings in components — import from fixture.

Key fixture fields:
- `fixture.isp` — ISP name, brand color, support phone
- `fixture.subscriber` — subscriber name, plan, speeds
- `fixture.cpe` — CPE model name and type
- `fixture.diagnosis` — scripted LED result and interpretation
- `fixture.fixSteps` — 3-step reboot sequence (step 2 has `isWait: true` and `waitSeconds`)
- `fixture.appointmentSlots` — 3 available slots
- `fixture.confirmedAppointment` — the slot that gets confirmed
- `fixture.account` — account ID, billing dates, payment method
- `fixture.invoices` — 6 months of paid invoice history
- `fixture.techNote` — tech install note (shown on Equipment Locator screen)

---

## ISP: IQ Fiber

The prototype is built for IQ Fiber — a real gaiia customer. Brand color: verify at iqfiber.com (assumed `#5B21B6` purple). The ISP Selection screen shows 10 real ISPs; only IQ Fiber is selectable. The other 9 show a cheeky inline message by ISP name.

**Confirmed gaiia customers in the list:**
- IQ Fiber (selectable)
- Resound Networks
- Vistabeam
- Direct Communications
- Intellipop
- LilaConnect

**Non-gaiia ISPs in the list:**
- Ting Internet
- Nextlink Internet
- Crestview Networks
- Wisper Internet

---

## Simulated AI

The prototype simulates AI — no real API calls are made in the diagnostic flow. When the subscriber taps "Take Photo," a scripted 2.5-second animation plays (scanning graphic + sequential status messages), then a hardcoded result from `fixture.diagnosis` is displayed. The result is device-specific and includes an annotated image showing the WAN light location with an arrow.

---

## Global Components

**PhoneFrame:** Wraps all screens. Contains the notch, status bar ("9:41", signal icons), and scrollable content slot. Do not modify PhoneFrame unless explicitly asked.

**BackButton:** Shown on most screens except splash, login, OTP, account-loading, and confirmation screens. Always accepts an `onBack` prop — never handles navigation internally.

**BottomNav:** Shown on home, account, and billing screens. Three tabs: Home, Account, Billing. Active tab highlighted in ispPrimary. Tapping Home → home screen. Tapping Account → account screen. Tapping Billing → billing screen.

**EscapeHatch:** "Talk to a person →" shown on all diagnostic screens (issue-selection through escalation). Tapping opens an overlay styled as a phone call prompt — shows IQ Fiber support number, a green "Call" button (cosmetic, no actual call), and a dismiss option.

---

## What Is Simulated vs. Wired

| Feature | Status |
|---|---|
| ISP logo loading | Real `<img>` tags with CDN/Clearbit URLs |
| Account data | Fixture data — hardcoded |
| Outage check | Fake 2-3s loading, always resolves to "no outage" |
| Camera | Not opened — tapping Take Photo goes to scripted analysis |
| LED analysis | Scripted fixture result, 2.5s animation |
| SSID detection | Not implemented — manual "It's back on" tap |
| Appointment slots | Fixture data |
| Appointment booking | Simulated — no real calendar or dispatch |
| Phone call (EscapeHatch) | Visual prompt only — no actual call initiated |
| Logout | Routes back to ISP Selection screen |

---

## Prototype Goals

This is a PM-built weekend prototype, not a production app. The goals are:

1. Demonstrate the complete no-internet diagnostic loop end-to-end
2. Show the white-label ISP concept (IQ Fiber branding throughout)
3. Make the "AI diagnosis" moment feel real and specific (device-aware, annotated image)
4. Show the tech install note → subscriber self-service connection (Equipment Locator screen)
5. Demonstrate that Scout is a full subscriber platform (Account + Billing tabs), not just a diagnostic tool

Production concerns (performance, error handling, accessibility, real APIs) are out of scope.
```