'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Splash } from './screens/Splash'
import { IspSelection } from './screens/IspSelection'
import { Login } from './screens/Login'
import { OtpVerification } from './screens/OtpVerification'
import { Home } from './screens/Home'

export type Screen = 'splash' | 'isp' | 'login' | 'otp' | 'home'

type Direction = 'forward' | 'back'

const variants = {
  enter: (direction: Direction) => ({
    x: direction === 'forward' ? '100%' : '-100%',
  }),
  center: { x: 0 },
  exit: (direction: Direction) => ({
    x: direction === 'forward' ? '-100%' : '100%',
  }),
}

export function Onboarding() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [direction, setDirection] = useState<Direction>('forward')

  const go = (next: Screen, dir: Direction = 'forward') => {
    setDirection(dir)
    setScreen(next)
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={screen}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.32 }}
          style={{ position: 'absolute', inset: 0, backgroundColor: '#FFFFFF' }}
        >
          {screen === 'splash' && <Splash onContinue={() => go('isp')} />}
          {screen === 'isp' && <IspSelection onSelectIqFiber={() => go('login')} />}
          {screen === 'login' && (
            <Login onContinue={() => go('otp')} onBack={() => go('isp', 'back')} />
          )}
          {screen === 'otp' && (
            <OtpVerification onSuccess={() => go('home')} onBack={() => go('login', 'back')} />
          )}
          {screen === 'home' && <Home />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
