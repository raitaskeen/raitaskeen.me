"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { Send, X, ArrowRight, Download, ExternalLink, RefreshCw } from "lucide-react";
import { usePointerSystem } from "./PointerSystem";
import { spring, ease } from "@/lib/motion";
import { classifyIntent, extractActions, getRandomStatus, CompanionAction } from "@/lib/ai";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: CompanionAction[];
};

const SUGGESTIONS = [
  "What is LegacyExodus?",
  "What has Taskeen built?",
  "How does the compiler pipeline work?",
  "What is his engineering background?",
  "How can I contact him?",
];

type EntityState = "IDLE" | "CURIOUS" | "THINKING" | "SEARCHING" | "FOCUSED" | "READY";

/**
 * Asymmetric Computational Entity (Spec §5)
 * Inspired by OpenClaw computational creatures & Claude-like elegant intelligence.
 * - Asymmetric matte black chassis (#0c0d10) with fine architectural gold drafting contours.
 * - Dynamic central optical core with subtle state-driven aperture adjustments.
 * - States: IDLE, CURIOUS, THINKING, SEARCHING, FOCUSED, READY.
 * - Zero cartoon features, zero continuous RAF loops, pure GPU transforms.
 */
function ComputationalEntity({
  state,
  blink,
  springEyeX,
  springEyeY,
  reduce,
  size = 46,
}: {
  state: EntityState;
  blink: boolean;
  springEyeX: MotionValue<number>;
  springEyeY: MotionValue<number>;
  reduce: boolean | null;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="entityLensGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--orange-yellow-crayola)" stopOpacity="1" />
          <stop offset="60%" stopColor="var(--orange-yellow-crayola)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d49b28" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Asymmetric Chassis Outer Shell */}
      <polygon
        points="13,5 34,7 39,22 35,38 18,39 6,28 8,13"
        fill="#0c0d10"
        stroke={state === "THINKING" || state === "SEARCHING" ? "var(--orange-yellow-crayola)" : "hsla(45, 100%, 72%, 0.45)"}
        strokeWidth={state === "THINKING" ? "1.5" : "1.2"}
        strokeLinejoin="round"
      />

      {/* Internal Architectural Facet Lines */}
      <line x1="13" y1="5" x2="20" y2="15" stroke="hsla(45, 100%, 72%, 0.2)" strokeWidth="0.8" />
      <line x1="34" y1="7" x2="28" y2="15" stroke="hsla(45, 100%, 72%, 0.2)" strokeWidth="0.8" />
      <line x1="39" y1="22" x2="30" y2="25" stroke="hsla(45, 100%, 72%, 0.15)" strokeWidth="0.8" />
      <line x1="35" y1="38" x2="24" y2="33" stroke="hsla(45, 100%, 72%, 0.2)" strokeWidth="0.8" />
      <line x1="6" y1="28" x2="14" y2="26" stroke="hsla(45, 100%, 72%, 0.18)" strokeWidth="0.8" />

      {/* Recessed Optical Bay */}
      <rect
        x="12"
        y="18"
        width="20"
        height="9"
        rx="2"
        fill="#060708"
        stroke="hsla(45, 100%, 72%, 0.35)"
        strokeWidth="0.9"
      />

      {/* Optical Bay Track Guides */}
      <line x1="13" y1="22.5" x2="31" y2="22.5" stroke="hsla(45, 100%, 72%, 0.12)" strokeWidth="0.6" strokeDasharray="1 2" />

      {/* Top Telemetry Beacon & State LEDs */}
      <circle cx="33" cy="11" r="1.3" fill="var(--orange-yellow-crayola)" opacity={state === "THINKING" ? 1 : 0.6} />
      <circle cx="36" cy="13" r="1" fill="var(--orange-yellow-crayola)" opacity={state === "READY" || state === "CURIOUS" ? 0.9 : 0.35} />

      {/* Thinking / Searching Waveform Line */}
      {(state === "THINKING" || state === "SEARCHING") && !reduce && (
        <motion.line
          x1="13"
          y1="19"
          x2="31"
          y2="19"
          stroke="var(--orange-yellow-crayola)"
          strokeWidth="0.9"
          animate={{ opacity: [0.3, 1, 0.3], x: [-1, 1, -1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Central Optical Core (Gaze tracking & state micro-apertures) */}
      <motion.g
        style={{ x: reduce ? 0 : springEyeX, y: reduce ? 0 : springEyeY }}
        animate={{
          scaleY: blink ? 0.1 : state === "FOCUSED" ? 0.4 : 1,
          scaleX: state === "CURIOUS" ? 1.25 : state === "FOCUSED" ? 1.15 : 1,
        }}
        transition={{ duration: 0.08 }}
      >
        {state === "IDLE" && (
          // Calm horizontal optical slit
          <rect x="16" y="21" width="12" height="3" rx="1.5" fill="url(#entityLensGlow)" />
        )}

        {state === "CURIOUS" && (
          // Expanded focal core + subtle reticle brackets
          <>
            <circle cx="22" cy="22.5" r="3.2" fill="url(#entityLensGlow)" />
            <path d="M 17 20 L 17 19 L 18 19" stroke="var(--orange-yellow-crayola)" strokeWidth="0.8" fill="none" />
            <path d="M 27 20 L 27 19 L 26 19" stroke="var(--orange-yellow-crayola)" strokeWidth="0.8" fill="none" />
            <path d="M 17 25 L 17 26 L 18 26" stroke="var(--orange-yellow-crayola)" strokeWidth="0.8" fill="none" />
            <path d="M 27 25 L 27 26 L 26 26" stroke="var(--orange-yellow-crayola)" strokeWidth="0.8" fill="none" />
          </>
        )}

        {(state === "THINKING" || state === "SEARCHING") && (
          // Dual oscillating computational nodes
          <>
            <circle cx="17.5" cy="22.5" r="2.2" fill="url(#entityLensGlow)" />
            <circle cx="26.5" cy="22.5" r="2.2" fill="url(#entityLensGlow)" />
          </>
        )}

        {state === "FOCUSED" && (
          // Precision pinpoints
          <>
            <circle cx="18" cy="22.5" r="1.5" fill="url(#entityLensGlow)" />
            <circle cx="26" cy="22.5" r="1.5" fill="url(#entityLensGlow)" />
          </>
        )}

        {state === "READY" && (
          // Solid balanced core
          <>
            <circle cx="22" cy="22.5" r="2.6" fill="url(#entityLensGlow)" />
            <circle cx="22" cy="22.5" r="1.2" fill="#060708" />
          </>
        )}
      </motion.g>
    </svg>
  );
}

export default function PortfolioBot() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const pointer = usePointerSystem();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome in. I'm Taskeen's computational engineering companion. Ask me anything about LegacyExodus, compiler modernization, verified full-stack builds, or his systems journey!",
    },
  ]);
  const [input, setInput] = useState("");
  const [statusText, setStatusText] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [blink, setBlink] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive computational entity state (Spec §5)
  const entityState: EntityState = isStreaming
    ? "THINKING"
    : statusText
    ? "SEARCHING"
    : isInputFocused
    ? "FOCUSED"
    : isHovered
    ? "CURIOUS"
    : isOpen
    ? "READY"
    : "IDLE";

  // Keyboard Escape listener
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Tab visibility
  useEffect(() => {
    function onVisChange() {
      setIsHidden(document.hidden);
    }
    document.addEventListener("visibilitychange", onVisChange);
    return () => document.removeEventListener("visibilitychange", onVisChange);
  }, []);

  // Periodic micro blink
  useEffect(() => {
    if (reduce) return;
    function scheduleBlink() {
      if (document.hidden) return;
      setBlink(true);
      window.setTimeout(() => setBlink(false), 120);
    }
    const id = window.setInterval(scheduleBlink, 4800);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, statusText, isOpen]);

  // Optical aim tracking using PointerSystem
  const zeroVal = useMotionValue(0);
  const pxVal = pointer ? pointer.springX : zeroVal;
  const pyVal = pointer ? pointer.springY : zeroVal;

  const eyeX = useTransform(pxVal, (px) => {
    if (reduce || isTouch || !pointer || pointer.active.get() <= 0) return 0;
    const w = typeof window !== "undefined" ? window.innerWidth : 1000;
    const cx = w - 42;
    const py = pointer.springY.get();
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const cy = h - 42;
    const dx = px - cx;
    const dy = py - cy;
    const dist = Math.hypot(dx, dy) || 1;
    return (dx / dist) * 2.5;
  });

  const eyeY = useTransform(pyVal, (py) => {
    if (reduce || isTouch || !pointer || pointer.active.get() <= 0) return 0;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const cy = h - 42;
    const px = pointer.springX.get();
    const w = typeof window !== "undefined" ? window.innerWidth : 1000;
    const cx = w - 42;
    const dx = px - cx;
    const dy = py - cy;
    const dist = Math.hypot(dx, dy) || 1;
    return (dy / dist) * 2.5;
  });

  const springEyeX = useSpring(eyeX, spring.gentle);
  const springEyeY = useSpring(eyeY, spring.gentle);

  async function handleSend(queryText?: string) {
    const textToSend = (queryText ?? input).trim();
    if (!textToSend || isStreaming) return;

    setInput("");
    const userMsg: Message = {
      id: "user-" + Date.now(),
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    // Initial human-feeling status label (Spec §7)
    const { intent } = classifyIntent(textToSend);
    setStatusText(getRandomStatus(intent));

    // Dynamic status rotation if reasoning takes > 800ms
    const rotateTimer = setTimeout(() => {
      setStatusText(getRandomStatus(intent));
    }, 750);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          currentRoute: pathname,
        }),
      });

      clearTimeout(rotateTimer);

      if (!response.ok || !response.body) {
        throw new Error("Failed to connect to companion");
      }

      setStatusText(null);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantRaw = "";

      const assistantId = "assistant-" + Date.now();
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line || !line.startsWith("data: ")) continue;

          const dataStr = line.slice(6).trim();
          if (dataStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content || "";
            if (delta) {
              assistantRaw += delta;

              const { cleanContent, actions } = extractActions(assistantRaw);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: cleanContent, actions }
                    : m
                )
              );
            }
          } catch {
            // Ignore genuinely malformed records
          }
        }
      }

      if (buffer.trim().startsWith("data: ")) {
        const dataStr = buffer.trim().slice(6).trim();
        if (dataStr !== "[DONE]") {
          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content || "";
            if (delta) {
              assistantRaw += delta;
              const { cleanContent, actions } = extractActions(assistantRaw);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: cleanContent, actions }
                    : m
                )
              );
            }
          } catch {
            // Ignore malformed record
          }
        }
      }
    } catch {
      clearTimeout(rotateTimer);
      setStatusText(null);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content:
            "I ran into a temporary network bottleneck. Feel free to inspect the systems architecture directly, browse the builds, or reach out to Taskeen at raitaskeenhaider786@gmail.com!",
          actions: [{ label: "Contact Taskeen", href: "/contact", isExternal: false }],
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  function handleActionClick(action: CompanionAction) {
    if (action.isExternal || action.href.startsWith("http")) {
      window.open(action.href, "_blank", "noreferrer");
    } else if (action.isDownload || action.href.endsWith(".pdf")) {
      const a = document.createElement("a");
      a.href = action.href;
      a.download = "Taskeen_Haider_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      router.push(action.href);
      setIsOpen(false);
    }
  }

  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 9999 }}>
      {/* Companion Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.22, ease: ease.out }}
            className="portfolio-bot-panel"
            style={{
              position: "absolute",
              bottom: 56,
              right: 0,
              width: "min(400px, calc(100vw - 32px))",
              height: 520,
              maxHeight: "calc(100vh - 100px)",
              background: "hsla(0, 0%, 9%, 0.96)",
              backdropFilter: "blur(18px)",
              border: "1px solid hsla(45, 100%, 72%, 0.3)",
              borderRadius: 16,
              boxShadow: "0 24px 60px hsla(0,0%,0%,0.7), 0 0 20px hsla(45,100%,72%,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid hsla(0, 0%, 100%, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "hsla(0, 0%, 7%, 0.7)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ComputationalEntity
                    state={entityState}
                    blink={blink}
                    springEyeX={springEyeX}
                    springEyeY={springEyeY}
                    reduce={reduce}
                    size={28}
                  />
                </div>
                <div>
                  <h4
                    style={{
                      color: "var(--white-2)",
                      fontSize: "var(--fs-7)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Engineering Companion
                  </h4>
                  <p style={{ color: "var(--light-gray-70)", fontSize: 10, fontFamily: "monospace" }}>
                    COMPUTATIONAL INTELLIGENCE · @raitaskeen
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close companion"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--light-gray-70)",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Message History */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      fontSize: "var(--fs-7)",
                      lineHeight: 1.55,
                      background:
                        m.role === "user"
                          ? "var(--orange-yellow-crayola)"
                          : "hsla(240, 2%, 13%, 0.9)",
                      color:
                        m.role === "user"
                          ? "var(--smoky-black)"
                          : "var(--white-2)",
                      border:
                        m.role === "user"
                          ? "none"
                          : "1px solid hsla(0, 0%, 100%, 0.08)",
                      borderBottomRightRadius: m.role === "user" ? 2 : 12,
                      borderBottomLeftRadius: m.role === "assistant" ? 2 : 12,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {m.content}
                  </div>

                  {/* Action Buttons */}
                  {m.actions && m.actions.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                      {m.actions.map((act) => (
                        <button
                          key={act.label}
                          onClick={() => handleActionClick(act)}
                          className="shimmer-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 6,
                            background: "hsla(45, 100%, 72%, 0.14)",
                            color: "var(--orange-yellow-crayola)",
                            border: "1px solid hsla(45, 100%, 72%, 0.35)",
                            fontSize: 11,
                            fontFamily: "monospace",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          <span>{act.label}</span>
                          {act.isDownload || act.href.endsWith(".pdf") ? (
                            <Download size={11} />
                          ) : act.isExternal || act.href.startsWith("http") ? (
                            <ExternalLink size={11} />
                          ) : (
                            <ArrowRight size={11} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Natural Status Indicator (Spec §7) */}
              {statusText && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "hsla(0, 0%, 10%, 0.75)",
                    border: "1px solid hsla(45, 100%, 72%, 0.25)",
                    color: "var(--orange-yellow-crayola)",
                    fontSize: 11,
                    fontFamily: "monospace",
                  }}
                >
                  <RefreshCw size={11} className="spin-icon" style={{ animation: "spin 1.5s linear infinite" }} />
                  <span>{statusText}</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div
                style={{
                  padding: "0 14px 10px",
                  display: "flex",
                  gap: 6,
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    disabled={isStreaming}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "hsla(0, 0%, 100%, 0.05)",
                      border: "1px solid hsla(0, 0%, 100%, 0.1)",
                      color: "var(--light-gray-70)",
                      fontSize: 11,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.12s ease",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                padding: "10px 14px",
                borderTop: "1px solid hsla(0, 0%, 100%, 0.08)",
                display: "flex",
                gap: 8,
                background: "hsla(0, 0%, 6%, 0.85)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Ask about LegacyExodus, AST, projects..."
                disabled={isStreaming}
                style={{
                  flex: 1,
                  background: "hsla(0, 0%, 12%, 0.8)",
                  border: "1px solid hsla(0, 0%, 100%, 0.12)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  color: "var(--white-2)",
                  fontSize: "var(--fs-7)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                aria-label="Send query"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: input.trim() && !isStreaming ? "var(--orange-yellow-crayola)" : "hsla(0, 0%, 100%, 0.08)",
                  color: input.trim() && !isStreaming ? "var(--smoky-black)" : "var(--light-gray-70)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !isStreaming ? "pointer" : "default",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Computational Entity Trigger Button */}
      <motion.button
        type="button"
        aria-label={isOpen ? "Close engineering companion" : "Open engineering companion"}
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="portfolio-bot-button"
        style={{
          pointerEvents: "auto",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          filter: isOpen ? "drop-shadow(0 0 12px hsla(45, 100%, 72%, 0.55))" : "drop-shadow(0 8px 24px hsla(0,0%,0%,0.6))",
        }}
        animate={reduce || isHidden ? undefined : { y: [0, -2.5, 0] }}
        transition={reduce ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <ComputationalEntity
          state={entityState}
          blink={blink}
          springEyeX={springEyeX}
          springEyeY={springEyeY}
          reduce={reduce}
          size={46}
        />
      </motion.button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
