'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Splash } from './screens/Splash'
import { IspSelection } from './screens/IspSelection'
import { Login } from './screens/Login'
import { OtpVerification } from './screens/OtpVerification'
import { Home } from './screens/Home'
import { IssueSelection } from './screens/IssueSelection'
import { OutageCheck } from './screens/OutageCheck'
import { NoOutage } from './screens/NoOutage'
import { BehavioralProxy } from './screens/BehavioralProxy'
import { DevicePhotoPrompt } from './screens/DevicePhotoPrompt'
import { PhotoAnalysis } from './screens/PhotoAnalysis'
import { Diagnosis } from './screens/Diagnosis'
import { FixStep } from './screens/FixStep'
import { ReconnectionWait } from './screens/ReconnectionWait'
import { Resolution } from './screens/Resolution'
import { EscalationIntro } from './screens/EscalationIntro'
import { AppointmentBooking } from './screens/AppointmentBooking'
import { AppointmentConfirmation } from './screens/AppointmentConfirmation'

export type Screen =
  | 'splash'
  | 'isp'
  | 'login'
  | 'otp'
  | 'home'
  | 'issue'
  | 'outage-check'
  | 'no-outage'
  | 'behavioral'
  | 'photo-prompt'
  | 'photo-analysis'
  | 'diagnosis'
  | 'fix-step'
  | 'reconnection-wait'
  | 'resolution'
  | 'escalation-intro'
  | 'appointment-booking'
  | 'appointment-confirmation'

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
  const [fixStepIndex, setFixStepIndex] = useState(0)
  const [bookedSlotId, setBookedSlotId] = useState<string>('a1')

  const go = (next: Screen, dir: Direction = 'forward') => {
    setDirection(dir)
    setScreen(next)
  }

  const startFixFlow = () => {
    setFixStepIndex(0)
    go('fix-step')
  }

  const advanceFixStep = () => {
    if (fixStepIndex < 2) {
      setDirection('forward')
      setFixStepIndex((i) => i + 1)
    } else {
      go('reconnection-wait')
    }
  }

  const backFixStep = () => {
    if (fixStepIndex > 0) {
      setDirection('back')
      setFixStepIndex((i) => i - 1)
    } else {
      go('diagnosis', 'back')
    }
  }

  const motionKey = screen === 'fix-step' ? `fix-step-${fixStepIndex}` : screen

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={motionKey}
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
          {screen === 'home' && <Home onTroubleshoot={() => go('issue')} />}
          {screen === 'issue' && (
            <IssueSelection
              onSelectNoInternet={() => go('outage-check')}
              onBack={() => go('home', 'back')}
            />
          )}
          {screen === 'outage-check' && <OutageCheck onAdvance={() => go('no-outage')} />}
          {screen === 'no-outage' && <NoOutage onAdvance={() => go('behavioral')} />}
          {screen === 'behavioral' && (
            <BehavioralProxy
              onContinue={() => go('photo-prompt')}
              onBack={() => go('issue', 'back')}
            />
          )}
          {screen === 'photo-prompt' && (
            <DevicePhotoPrompt
              onTakePhoto={() => go('photo-analysis')}
              onAnswerQuestions={() => go('photo-analysis')}
              onBack={() => go('behavioral', 'back')}
            />
          )}
          {screen === 'photo-analysis' && (
            <PhotoAnalysis onContinue={() => go('diagnosis')} />
          )}
          {screen === 'diagnosis' && (
            <Diagnosis
              onContinue={startFixFlow}
              onSkipToBooking={() => go('escalation-intro')}
              onBack={() => go('photo-prompt', 'back')}
            />
          )}
          {screen === 'fix-step' && (
            <FixStep
              index={fixStepIndex}
              onAdvance={advanceFixStep}
              onBack={backFixStep}
            />
          )}
          {screen === 'reconnection-wait' && (
            <ReconnectionWait
              onBackOnline={() => go('resolution')}
              onStillNotReconnecting={() => go('escalation-intro')}
            />
          )}
          {screen === 'resolution' && (
            <Resolution
              onDone={() => {
                setFixStepIndex(0)
                go('home')
              }}
            />
          )}
          {screen === 'escalation-intro' && (
            <EscalationIntro
              onBookAppointment={() => go('appointment-booking')}
              onBack={() => go('diagnosis', 'back')}
            />
          )}
          {screen === 'appointment-booking' && (
            <AppointmentBooking
              onConfirm={(slotId) => {
                setBookedSlotId(slotId)
                go('appointment-confirmation')
              }}
              onBack={() => go('escalation-intro', 'back')}
            />
          )}
          {screen === 'appointment-confirmation' && (
            <AppointmentConfirmation
              slotId={bookedSlotId}
              onDone={() => {
                setFixStepIndex(0)
                go('home')
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
