"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tokens } from "@/lib/tokens";
import { ISP_LIST, type Isp, ispFallbackColor, ispInitials } from "@/lib/isps";

const FLASH_MS = 150;

export function IspSelection({
  onSelectIqFiber,
}: {
  onSelectIqFiber: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ISP_LIST;
    return ISP_LIST.filter((isp) => isp.name.toLowerCase().includes(q));
  }, [query]);

  const handleSelect = (isp: Isp) => {
    if (isp.selectable) {
      onSelectIqFiber();
      return;
    }
    setFlashId(isp.id);
    window.setTimeout(() => setFlashId(null), FLASH_MS);
    setActiveMessageId((prev) => (prev === isp.id ? null : isp.id));
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
      <div
        style={{
          padding: `28px ${tokens.space16} ${tokens.space12}`,
          color: tokens.gaiiaForeground,
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        Who&apos;s your internet provider?
      </div>
      <div style={{ padding: `0 ${tokens.space16} ${tokens.space12}` }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search providers…"
          style={{
            width: "100%",
            height: 44,
            borderRadius: 12,
            border: `1px solid ${tokens.gaiiaBorder}`,
            padding: `0 ${tokens.space16}`,
            fontSize: 15,
            color: tokens.gaiiaForeground,
            backgroundColor: tokens.bg,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.map((isp) => (
          <IspRow
            key={isp.id}
            isp={isp}
            flashing={flashId === isp.id}
            messageOpen={activeMessageId === isp.id}
            onSelect={() => handleSelect(isp)}
          />
        ))}
        <div
          style={{
            color: tokens.gaiiaForeground,
            fontSize: 14,
            textAlign: "center",
            margin: `${tokens.space16} 0 ${tokens.space24}`,
          }}
        >
          My provider isn&apos;t listed
        </div>
      </div>
    </div>
  );
}

function IspRow({
  isp,
  flashing,
  messageOpen,
  onSelect,
}: {
  isp: Isp;
  flashing: boolean;
  messageOpen: boolean;
  onSelect: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onSelect}
        style={{
          width: "100%",
          height: 64,
          padding: `0 ${tokens.space16}`,
          display: "flex",
          alignItems: "center",
          gap: tokens.space12,
          backgroundColor: flashing ? tokens.bgTertiary : tokens.bg,
          border: "none",
          borderBottom: `1px solid ${tokens.gaiiaBorder}`,
          textAlign: "left",
          cursor: "pointer",
          transition: `background-color ${FLASH_MS}ms ease`,
        }}
      >
        <IspLogo isp={isp} />
        <span style={{ fontSize: 15, color: tokens.gaiiaForeground }}>
          {isp.name}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {messageOpen && (
          <motion.div
            key="msg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                margin: `${tokens.space12} ${tokens.space16}`,
                padding: "12px 16px",
                backgroundColor: tokens.bg,
                border: `1px solid ${tokens.gaiiaBorder}`,
                borderRadius: 12,
                color: tokens.gaiiaForeground,
                fontSize: 14,
                lineHeight: 1.45,
              }}
            >
              Looks like you&apos;re a {isp.name} customer — this prototype was
              built for IQ Fiber, but Scout works just like this for your ISP
              too. Tap IQ Fiber to see the demo. 🙂
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IspLogo({ isp }: { isp: Isp }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: ispFallbackColor(isp.id),
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {ispInitials(isp.name)}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={isp.logoUrl}
      alt=""
      onError={() => setErrored(true)}
      style={{
        width: 40,
        height: 40,
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  );
}
