# Scout Prototype

Scout is a Next.js prototype for a white-labeled subscriber support app that an ISP could offer to customers. This demo is branded for IQ Fiber and walks through account access, billing visibility, and a no-internet troubleshooting flow that can resolve the issue or escalate to technician booking.

## What Is Included

- Mobile-style app UI rendered inside an iPhone-sized frame.
- Hardcoded fixture data for subscriber, account, equipment, invoices, diagnosis, and appointments.
- Single-page React state navigation with animated screen transitions.
- Simulated outage check, photo analysis, guided router restart, and appointment booking.

## What Is Not Included

This is a product prototype, not a production app. It does not use real APIs, authentication, billing, camera access, AI, dispatch, persistence, or calendar integration.

## Run Locally

```bash
cd scout-prototype
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
