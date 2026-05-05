"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { tokens } from "@/lib/tokens";
import { BackButton } from "@/components/BackButton";

const CODE_LENGTH = 6;
const RESEND_DELAY_MS = 10_000;
const SIX_DIGIT_CODE_PATTERN = /^\d{6}$/;

type Status = "idle" | "success" | "error";

export function OtpVerification({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array(CODE_LENGTH).fill(""),
  );
  const [status, setStatus] = useState<Status>("idle");
  const [resendReady, setResendReady] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const shakeControls = useAnimationControls();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setResendReady(true), RESEND_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const validate = (next: string[]) => {
    const code = next.join("");
    if (code.length < CODE_LENGTH) return;
    if (SIX_DIGIT_CODE_PATTERN.test(code)) {
      setStatus("success");
      window.setTimeout(onSuccess, 400);
    } else {
      setStatus("error");
      shakeControls.start({
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.45 },
      });
    }
  };

  const handleChange = (index: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      if (status !== "idle") setStatus("idle");
      return;
    }
    const next = [...digits];
    // If multiple chars (paste), spread across boxes from current index
    for (let i = 0; i < cleaned.length && index + i < CODE_LENGTH; i++) {
      next[index + i] = cleaned[i];
    }
    setDigits(next);
    if (status !== "idle") setStatus("idle");
    const nextFocus = Math.min(index + cleaned.length, CODE_LENGTH - 1);
    inputsRef.current[nextFocus]?.focus();
    validate(next);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      if (status !== "idle") setStatus("idle");
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handleResend = () => {
    if (!resendReady) return;
    setDigits(Array(CODE_LENGTH).fill(""));
    setStatus("idle");
    setResendReady(false);
    inputsRef.current[0]?.focus();
    window.setTimeout(() => setResendReady(true), RESEND_DELAY_MS);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: tokens.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BackButton onBack={onBack} />

      <div style={{ padding: `${tokens.space32} ${tokens.space16} 0` }}>
        <div
          style={{
            paddingTop: tokens.space20,
            fontSize: 22,
            fontWeight: 600,
            color: tokens.textPrimary,
          }}
        >
          Check your messages
        </div>
        <div
          style={{
            marginTop: tokens.space8,
            fontSize: 15,
            color: tokens.textSecondary,
            lineHeight: 1.4,
          }}
        >
          We sent a 6-digit code to the number you entered.
        </div>
      </div>

      <motion.div
        animate={shakeControls}
        style={{
          display: "flex",
          gap: tokens.space8,
          padding: `${tokens.space24} ${tokens.space16} 0`,
          justifyContent: "space-between",
        }}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={CODE_LENGTH}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.currentTarget.select()}
            style={{
              width: 44,
              height: 56,
              borderRadius: 10,
              border: `1px solid ${otpBorderColor(status, tokens)}`,
              outline: "none",
              textAlign: "center",
              fontSize: 24,
              fontWeight: 600,
              color: tokens.textPrimary,
              backgroundColor: tokens.bg,
              boxSizing: "border-box",
              transition: "border-color 150ms ease",
            }}
          />
        ))}
      </motion.div>

      {status === "error" && (
        <div
          style={{
            color: tokens.error,
            fontSize: 14,
            padding: `${tokens.space12} ${tokens.space16} 0`,
          }}
        >
          Incorrect code — try again
        </div>
      )}

      <div
        style={{
          padding: `${tokens.space24} ${tokens.space16} 0`,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        <button
          type="button"
          onClick={handleResend}
          disabled={!resendReady}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: resendReady ? "pointer" : "default",
            color: resendReady ? tokens.ispPrimary : tokens.textMuted,
            fontWeight: resendReady ? 600 : 500,
            fontSize: 14,
          }}
        >
          Resend code
        </button>
      </div>
    </div>
  );
}

function otpBorderColor(status: Status, t: typeof tokens) {
  if (status === "success") return t.success;
  if (status === "error") return t.error;
  return t.borderStrong;
}
