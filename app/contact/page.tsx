"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";
import Reveal, { Stagger } from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import SplitText from "@/components/motion/SplitText";
import ContactSignature from "@/components/motion/ContactSignature";
import { spring, scaleToken } from "@/lib/motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Download,
  Check,
  Loader2,
  ArrowRight,
  CalendarDays,
  AlertCircle,
  Copy,
} from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/icons/BrandIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

// lucide-react has no native Bluesky glyph — small inline butterfly mark
function BlueskyIcon({ size = 20, color = "var(--light-gray-70)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 10.8C10.4 7.9 7.8 5.4 5.3 3.9c-1-.6-2.3.1-2.3 1.3v9.1c0 1 .7 1.9 1.7 2.1 3.3.7 5.8 1.7 7.3 3.7 1.5-2 4-3 7.3-3.7 1-.2 1.7-1.1 1.7-2.1V5.2c0-1.2-1.3-1.9-2.3-1.3-2.5 1.5-5.1 4-6.7 6.9Z" />
    </svg>
  );
}

function HuggingFaceIcon({ size = 20, color = "var(--light-gray-70)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-3.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7.6 6.8c.8 1.4 2.3 2.2 4.1 2.2 1.8 0 3.3-.8 4.1-2.2.3-.5-.1-1-.6-.8-1 .4-2.2.6-3.5.6-1.3 0-2.5-.2-3.5-.6-.5-.2-.9.3-.6.8z" />
    </svg>
  );
}

function HackerRankIcon({ size = 20, color = "var(--light-gray-70)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm2.2 16.8h-1.5v-3.7h-1.4v3.7H9.8V7.2h1.5v3.7h1.4V7.2h1.5z" />
    </svg>
  );
}

const socialLinks = [
  { href: () => profile.socials.github, label: "GitHub", icon: Github },
  { href: () => profile.socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: () => profile.socials.twitter, label: "X", icon: Twitter },
  { href: () => profile.socials.huggingface, label: "Hugging Face", icon: HuggingFaceIcon },
  { href: () => profile.socials.hackerrank, label: "HackerRank", icon: HackerRankIcon },
  { href: () => profile.scheduleUrl, label: "Cal.com", icon: CalendarDays },
  { href: () => profile.socials.bluesky, label: "Bluesky", icon: BlueskyIcon },
  { href: () => profile.socials.reddit, label: "Reddit", icon: MessageCircle },
];

function SocialIcon({ href, label, Icon }: { href: string; label: string; Icon: React.ElementType }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="social-icon-item"
    >
      <Icon size={20} color="var(--light-gray-70)" />
      <span className="social-tooltip" aria-hidden>{label}</span>
    </a>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
          style={{
            background: "none",
            border: "none",
            color: copied ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)",
            cursor: "pointer",
            padding: 4,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            transition: "color var(--dur-hover) var(--ease-out-standard)",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{copied ? "Copied to clipboard!" : "Copy email"}</span>
      </TooltipContent>
    </Tooltip>
  );
}

// ---------- Field validation ----------
type FieldName = "fullname" | "email" | "message";

function validate(name: FieldName, value: string): string | null {
  const v = value.trim();
  if (name === "fullname") {
    if (!v) return "Tell me your name.";
    if (v.length < 2) return "A little short for a name.";
    return null;
  }
  if (name === "email") {
    if (!v) return "Need an email to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "That doesn't look like a valid email.";
    return null;
  }
  if (!v) return "Say a little about what you have in mind.";
  if (v.length < 10) return "A bit more detail would help.";
  return null;
}

function Field({
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  textarea = false,
  rows,
  disabled,
  touched,
  onTouch,
  error,
  autoComplete,
}: {
  name: FieldName;
  type?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  disabled?: boolean;
  touched: boolean;
  onTouch: () => void;
  error: string | null;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const showError = touched && !!error;
  const showValid = touched && !error && value.trim().length > 0;
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className={`field-group ${focused ? "focused" : ""} ${showError ? "error" : ""}`}>
      <label
        htmlFor={name}
        className="field-label"
        style={{
          color: showError
            ? "var(--bittersweet-shimmer)"
            : focused
            ? "var(--orange-yellow-crayola)"
            : undefined,
        }}
      >
        {label}
      </label>

      <div style={{ position: "relative", width: "100%" }}>
        {/* Subtle gold focus indicator dot */}
        <AnimatePresence>
          {focused && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={spring.snap}
              style={{
                position: "absolute",
                right: 14,
                top: 15,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--orange-yellow-crayola)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          )}
        </AnimatePresence>

        <Tag
          id={name}
          name={name}
          type={textarea ? undefined : type}
          placeholder={placeholder}
          required
          autoComplete={autoComplete}
          disabled={disabled}
          rows={textarea ? rows : undefined}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onTouch();
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
          style={{
            ...inputStyle,
            borderColor: showError
              ? "var(--bittersweet-shimmer)"
              : showValid
              ? "hsla(45,100%,72%,0.4)"
              : focused
              ? "var(--orange-yellow-crayola)"
              : "hsla(0,0%,100%,0.1)",
            boxShadow: showError
              ? "0 0 0 3px hsla(0, 43%, 51%, 0.15)"
              : focused
              ? "0 0 0 3px hsla(45, 100%, 72%, 0.15)"
              : "none",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
      </div>

      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -2 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -2 }}
            transition={{ duration: 0.15 }}
            style={{
              color: "var(--bittersweet-shimmer)",
              fontSize: "var(--fs-8)",
              marginTop: 2,
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ fullname: "", email: "", message: "" });
  const [touched, setTouched] = useState({ fullname: false, email: false, message: false });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const reduce = useReducedMotion();

  const errors = {
    fullname: validate("fullname", form.fullname),
    email: validate("email", form.email),
    message: validate("message", form.message),
  };
  const valid = !errors.fullname && !errors.email && !errors.message;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "sent") return;
    if (!valid) {
      setTouched({ fullname: true, email: true, message: true });
      return;
    }
    setStatus("submitting");
    setErrorMessage(null);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://formspree.io/f/mgoggodq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        window.setTimeout(() => setShowPanel(true), 200);
      } else {
        const resData = await res.json().catch(() => null);
        const detail =
          resData?.errors?.map((err: { message?: string }) => err.message).filter(Boolean).join(", ") ||
          resData?.error ||
          "Message delivery failed. Please check your inputs or try again later.";
        setErrorMessage(detail);
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network connection error. Please verify your internet connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="page-shell">
      {/* Editorial Header */}
      <Reveal variant="fade-up">
        <p style={{ color: "var(--orange-yellow-crayola)", fontFamily: "monospace", fontSize: "var(--fs-7)" }}>
          contact/
        </p>
      </Reveal>

      <SplitText
        text="Let's build something."
        as="h1"
        delay={0.08}
        style={{
          fontSize: "clamp(34px, 6.4vw, 60px)",
          fontWeight: 600,
          color: "var(--white-2)",
          marginTop: 6,
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
        }}
      />

      <Reveal variant="fade-up" delay={0.25}>
        <p style={{ color: "var(--light-gray-70)", marginTop: 14, maxWidth: "62ch", lineHeight: 1.65 }}>
          Have a role, project, or technical problem in mind? Send a message and I&apos;ll reply directly from {profile.email} — or schedule a technical conversation below.
        </p>
      </Reveal>

      {/* Two-Column Responsive Workspace */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 40,
          marginTop: 40,
        }}
      >
        {/* Left Column: Direct contact channels & metadata */}
        <Reveal variant="slide-right">
          <TooltipProvider>
            <div role="list">
              <Stagger gap={0.06} variant="fade-up">
                {[
                  <div
                    key="email"
                    role="listitem"
                    style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--light-gray)", marginBottom: 16, flexWrap: "wrap" }}
                  >
                    <Mail size={16} color="var(--orange-yellow-crayola)" />
                    <a
                      href={`mailto:${profile.email}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {profile.email}
                    </a>
                    <CopyEmailButton email={profile.email} />
                  </div>,
                  <div
                    key="phone"
                    role="listitem"
                    style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--light-gray)", marginBottom: 16 }}
                  >
                    <Phone size={16} color="var(--orange-yellow-crayola)" /> {profile.phone}
                  </div>,
                  <div
                    key="loc"
                    role="listitem"
                    style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--light-gray)", marginBottom: 16 }}
                  >
                    <MapPin size={16} color="var(--orange-yellow-crayola)" /> {profile.location}
                  </div>,
                  <div
                    key="avail"
                    role="listitem"
                    style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--light-gray-70)", fontSize: "var(--fs-7)" }}
                  >
                    <span
                      aria-hidden
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange-yellow-crayola)" }}
                    />
                    Available for selected work
                  </div>,
                ]}
              </Stagger>
            </div>
          </TooltipProvider>

          <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
            {socialLinks.map((s) => (
              <SocialIcon key={s.label} href={s.href()} label={s.label} Icon={s.icon} />
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Magnetic strength={0.2}>
              <a
                href={profile.resumeUrl}
                download
                className="shimmer-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid hsla(45,100%,72%,0.35)",
                  color: "var(--orange-yellow-crayola)",
                  padding: "10px 20px",
                  borderRadius: 8,
                  fontSize: "var(--fs-7)",
                }}
              >
                <Download size={15} /> Download résumé
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href={profile.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid hsla(0,0%,100%,0.15)",
                  color: "var(--white-2)",
                  padding: "10px 20px",
                  borderRadius: 8,
                  fontSize: "var(--fs-7)",
                }}
              >
                <CalendarDays size={15} />
                Schedule a conversation
                <span className="project-link-arrow" aria-hidden>
                  <ArrowRight size={14} />
                </span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Right Column: Interactive Form with Formspree */}
        <Reveal variant="slide-left" delay={0.05}>
          <AnimatePresence mode="wait">
            {showPanel ? (
              <motion.div
                key="success-panel"
                initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring.gentle}
                className="gradient-border-hover"
                style={{
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 10,
                  borderRadius: 14,
                  background: "hsla(0, 0%, 9%, 0.88)",
                }}
              >
                <motion.span
                  initial={reduce ? undefined : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...spring.elastic, delay: 0.05 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "hsla(45,100%,72%,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={20} color="var(--orange-yellow-crayola)" />
                </motion.span>
                <p style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600 }}>Message sent</p>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", maxWidth: "42ch" }}>
                  Thank you for reaching out. I&apos;ll review your message and reply promptly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={false}
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <Field
                  name="fullname"
                  label="Full name"
                  placeholder="e.g. Alex Morgan"
                  autoComplete="name"
                  value={form.fullname}
                  onChange={(v) => {
                    setForm({ ...form, fullname: v });
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "submitting"}
                  touched={touched.fullname}
                  onTouch={() => setTouched((t) => ({ ...t, fullname: true }))}
                  error={errors.fullname}
                />
                <Field
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="alex@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(v) => {
                    setForm({ ...form, email: v });
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "submitting"}
                  touched={touched.email}
                  onTouch={() => setTouched((t) => ({ ...t, email: true }))}
                  error={errors.email}
                />
                <Field
                  name="message"
                  label="Your message"
                  placeholder="Tell me about your project, timeline, or idea…"
                  textarea
                  rows={5}
                  value={form.message}
                  onChange={(v) => {
                    setForm({ ...form, message: v });
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "submitting"}
                  touched={touched.message}
                  onTouch={() => setTouched((t) => ({ ...t, message: true }))}
                  error={errors.message}
                />

                {status === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Message delivery failed</AlertTitle>
                    <AlertDescription className="flex flex-col gap-2 mt-1">
                      <p className="m-0 text-sm">
                        {errorMessage || "Unable to deliver your message. Please try again or email directly."}
                      </p>
                      <div className="flex gap-3 items-center mt-1">
                        <button
                          type="button"
                          onClick={() => setStatus("idle")}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--orange-yellow-crayola)",
                            fontSize: "var(--fs-7)",
                            fontWeight: 600,
                            cursor: "pointer",
                            padding: 0,
                            textDecoration: "underline",
                          }}
                        >
                          Try again
                        </button>
                        <span style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)" }}>•</span>
                        <a
                          href={`mailto:${profile.email}`}
                          style={{
                            color: "var(--light-gray-70)",
                            fontSize: "var(--fs-7)",
                            textDecoration: "underline",
                          }}
                        >
                          Email directly
                        </a>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <motion.button
                  type="submit"
                  layout
                  disabled={status === "submitting" || (!valid && status !== "error")}
                  className="shimmer-btn"
                  whileHover={valid && status !== "submitting" && !reduce ? { y: -2 } : undefined}
                  whileTap={valid && status !== "submitting" && !reduce ? { scale: scaleToken.press } : undefined}
                  transition={spring.snap}
                  style={{
                    background:
                      status === "sent"
                        ? "hsla(45,100%,72%,0.15)"
                        : valid
                        ? "var(--orange-yellow-crayola)"
                        : "var(--jet)",
                    color:
                      status === "sent"
                        ? "var(--orange-yellow-crayola)"
                        : valid
                        ? "var(--smoky-black)"
                        : "var(--light-gray-70)",
                    padding: "12px 24px",
                    borderRadius: 8,
                    border: "none",
                    cursor: valid && status !== "submitting" ? "pointer" : "not-allowed",
                    fontSize: "var(--fs-6)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "submitting" ? (
                      <motion.span
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <motion.span
                          animate={reduce ? undefined : { rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          style={{ display: "inline-flex" }}
                        >
                          <Loader2 size={16} />
                        </motion.span>
                        Sending…
                      </motion.span>
                    ) : status === "sent" ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={spring.elastic}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <Check size={16} /> Sent
                      </motion.span>
                    ) : status === "error" ? (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        Retry sending <ArrowRight size={15} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        Send message <ArrowRight size={15} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>

      {/* Restored Large raitaskeen Monomark Treatment — Dominant Brand Moment */}
      <ContactSignature />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "hsla(0, 0%, 9%, 0.75)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid hsla(0, 0%, 100%, 0.1)",
  color: "var(--white-2)",
  padding: "12px 16px",
  borderRadius: 10,
  fontSize: "var(--fs-6)",
  fontFamily: "inherit",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};
