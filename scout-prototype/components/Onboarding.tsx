"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Splash } from "./screens/Splash";
import { IspSelection } from "./screens/IspSelection";
import { Login } from "./screens/Login";
import { OtpVerification } from "./screens/OtpVerification";
import { AccountLoading } from "./screens/AccountLoading";
import { Home } from "./screens/Home";
import { Account } from "./screens/Account";
import { Billing } from "./screens/Billing";
import { startOutageCheck } from "@/lib/outageCheck";
import { BottomNav, type Tab } from "@/components/BottomNav";
import { IssueSelection } from "./screens/IssueSelection";
import { OutageCheck } from "./screens/OutageCheck";
import { BehavioralProxy } from "./screens/BehavioralProxy";
import { EquipmentLocator } from "./screens/EquipmentLocator";
import { DevicePhotoPrompt } from "./screens/DevicePhotoPrompt";
import { PhotoAnalysis } from "./screens/PhotoAnalysis";
import { Diagnosis } from "./screens/Diagnosis";
import { FixStep } from "./screens/FixStep";
import { ReconnectionWait } from "./screens/ReconnectionWait";
import { Resolution } from "./screens/Resolution";
import { EscalationIntro } from "./screens/EscalationIntro";
import { AppointmentBooking } from "./screens/AppointmentBooking";
import { AppointmentConfirmation } from "./screens/AppointmentConfirmation";

export type Screen =
  | "splash"
  | "isp"
  | "login"
  | "otp"
  | "account-loading"
  | "home"
  | "account"
  | "billing"
  | "issue"
  | "outage-check"
  | "behavioral"
  | "equipment-locator"
  | "photo-prompt"
  | "photo-analysis"
  | "diagnosis"
  | "fix-step"
  | "reconnection-wait"
  | "resolution"
  | "escalation-intro"
  | "appointment-booking"
  | "appointment-confirmation";

type Direction = "forward" | "back" | "none";

const variants = {
  enter: (direction: Direction) => ({
    x: direction === "none" ? 0 : direction === "forward" ? "100%" : "-100%",
  }),
  center: { x: 0 },
  exit: (direction: Direction) => ({
    x: direction === "none" ? 0 : direction === "forward" ? "-100%" : "100%",
  }),
};

export function Onboarding() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [direction, setDirection] = useState<Direction>("forward");
  const [fixStepIndex, setFixStepIndex] = useState(0);
  const [bookedSlotId, setBookedSlotId] = useState<string>("a1");
  const [photoPromptBackTarget, setPhotoPromptBackTarget] =
    useState<Screen>("behavioral");
  const [escalationBackTarget, setEscalationBackTarget] =
    useState<Screen>("diagnosis");

  const go = (next: Screen, dir: Direction = "forward") => {
    setDirection(dir);
    setScreen(next);
  };

  const navigateTab = (tab: Tab) => {
    if (screen !== tab) {
      go(tab, "none");
    }
  };

  const logout = () => {
    setFixStepIndex(0);
    setBookedSlotId("a1");
    go("isp", "back");
  };

  const startFixFlow = () => {
    setFixStepIndex(0);
    go("fix-step");
  };

  const goPhotoPrompt = (from: Screen) => {
    setPhotoPromptBackTarget(from);
    go("photo-prompt");
  };

  const goEscalationIntro = (from: Screen) => {
    setEscalationBackTarget(from);
    go("escalation-intro");
  };

  const advanceFixStep = () => {
    if (fixStepIndex < 2) {
      setDirection("forward");
      setFixStepIndex((i) => i + 1);
    } else {
      go("reconnection-wait");
    }
  };

  const backFixStep = () => {
    if (fixStepIndex > 0) {
      setDirection("back");
      setFixStepIndex((i) => i - 1);
    } else {
      go("diagnosis", "back");
    }
  };

  const motionKey = screen === "fix-step" ? `fix-step-${fixStepIndex}` : screen;
  const activeTab: Tab | null =
    screen === "home" || screen === "account" || screen === "billing"
      ? screen
      : null;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={motionKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            ease: [0.32, 0.72, 0, 1],
            duration: direction === "none" ? 0 : 0.32,
          }}
          style={{ position: "absolute", inset: 0, backgroundColor: "#FFFFFF" }}
        >
          {screen === "splash" && <Splash onContinue={() => go("isp")} />}
          {screen === "isp" && (
            <IspSelection onSelectIqFiber={() => go("login")} />
          )}
          {screen === "login" && (
            <Login
              onContinue={() => go("otp")}
              onBack={() => go("isp", "back")}
            />
          )}
          {screen === "otp" && (
            <OtpVerification
              onSuccess={() => {
                startOutageCheck();
                go("account-loading");
              }}
              onBack={() => go("login", "back")}
            />
          )}
          {screen === "account-loading" && (
            <AccountLoading onAdvance={() => go("home")} />
          )}
          {screen === "home" && <Home onTroubleshoot={() => go("issue")} />}
          {screen === "account" && <Account onLogout={logout} />}
          {screen === "billing" && <Billing />}
          {screen === "issue" && (
            <IssueSelection
              onSelectNoInternet={() => go("outage-check")}
              onBack={() => go("home", "back")}
            />
          )}
          {screen === "outage-check" && (
            <OutageCheck onAdvance={() => go("behavioral")} />
          )}
          {screen === "behavioral" && (
            <BehavioralProxy
              onContinue={() => goPhotoPrompt("behavioral")}
              onUnsure={() => go("equipment-locator")}
              onBack={() => go("issue", "back")}
            />
          )}
          {screen === "equipment-locator" && (
            <EquipmentLocator
              onFound={() => goPhotoPrompt("equipment-locator")}
              onCantFind={() => goEscalationIntro("equipment-locator")}
              onBack={() => go("behavioral", "back")}
            />
          )}
          {screen === "photo-prompt" && (
            <DevicePhotoPrompt
              onTakePhoto={() => go("photo-analysis")}
              onAnswerQuestions={() => go("photo-analysis")}
              onBack={() => go(photoPromptBackTarget, "back")}
            />
          )}
          {screen === "photo-analysis" && (
            <PhotoAnalysis onContinue={() => go("diagnosis")} />
          )}
          {screen === "diagnosis" && (
            <Diagnosis
              onContinue={startFixFlow}
              onSkipToBooking={() => goEscalationIntro("diagnosis")}
              onBack={() => go("photo-prompt", "back")}
            />
          )}
          {screen === "fix-step" && (
            <FixStep
              index={fixStepIndex}
              onAdvance={advanceFixStep}
              onBack={backFixStep}
            />
          )}
          {screen === "reconnection-wait" && (
            <ReconnectionWait
              onBackOnline={() => go("resolution")}
              onStillNotReconnecting={() =>
                goEscalationIntro("reconnection-wait")
              }
            />
          )}
          {screen === "resolution" && (
            <Resolution
              onDone={() => {
                setFixStepIndex(0);
                go("home");
              }}
            />
          )}
          {screen === "escalation-intro" && (
            <EscalationIntro
              onBookAppointment={() => go("appointment-booking")}
              onBack={() => go(escalationBackTarget, "back")}
            />
          )}
          {screen === "appointment-booking" && (
            <AppointmentBooking
              onConfirm={(slotId) => {
                setBookedSlotId(slotId);
                go("appointment-confirmation");
              }}
              onBack={() => go("escalation-intro", "back")}
            />
          )}
          {screen === "appointment-confirmation" && (
            <AppointmentConfirmation
              slotId={bookedSlotId}
              onDone={() => {
                setFixStepIndex(0);
                go("home");
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
      {activeTab && <BottomNav active={activeTab} onSelect={navigateTab} />}
    </div>
  );
}
