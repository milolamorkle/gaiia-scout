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
