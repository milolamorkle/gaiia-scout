export const fixture = {
  isp: {
    name: 'IQ Fiber',
    primaryColor: '#5B21B6',      // must match tokens.ispPrimary exactly
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
  account: {
    id: 'IQF-00041823',
    since: 'March 12, 2023',
    nextBillingDate: 'June 1, 2026',
    nextBillingAmount: '$79.00',
    autopay: true,
    paymentMethod: 'Visa ending in 4821',
  },
  
  invoices: [
    { id: 'INV-2026-04', date: 'May 1, 2026',   amount: '$79.00', status: 'paid' },
    { id: 'INV-2026-03', date: 'April 1, 2026',  amount: '$79.00', status: 'paid' },
    { id: 'INV-2026-02', date: 'March 1, 2026',  amount: '$79.00', status: 'paid' },
    { id: 'INV-2026-01', date: 'February 1, 2026', amount: '$79.00', status: 'paid' },
    { id: 'INV-2025-12', date: 'January 1, 2026', amount: '$79.00', status: 'paid' },
    { id: 'INV-2025-11', date: 'December 1, 2025', amount: '$79.00', status: 'paid' },
  ],
  
  techNote: {
    exists: true,
    note: 'Router is mounted on the wall in the utility closet near the front door.',
    techName: 'Marcus T.',
    installDate: 'March 12, 2023',
  },
}
