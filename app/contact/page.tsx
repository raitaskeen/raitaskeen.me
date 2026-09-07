"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";
import Reveal, { Stagger } from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import SplitText from "@/components/motion/SplitText";
import ContactSignature from "@/components/motion/ContactSignature";
import { spring } from "@/lib/motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Download,
  Check,
  Loader2,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

// lucide-react has no native Bluesky glyph — small inline butterfly mark
function BlueskyIcon({ size = 20, color = "var(--light-gray-70)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 10.8C10.4 7.9 7.8 5.4 5.3 3.9c-1-.6-2.3.1-2.3 1.3v9.1c0 1 .7 1.9 1.7 2.1 3.3.7 5.8 1.7 7.3 3.7 1.5-2 4-3 7.3-3.7 1-.2 1.7-1.1 1.7-2.1V5.2c0-1.2-1.3-1.9-2.3-1.3-2.5 1.5-5.1 4-6.7 6.9Z" />
    </svg>
  );
}

const socialLinks = [
  { href: () => profile.socials.github, label: "GitHub", icon: Github },
  { href: () => profile.socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: () => profile.socials.twitter, label: "X / Twitter", icon: Twitter },
  { href: () => profile.socials.bluesky, label: "Bluesky", icon: BlueskyIcon },
  { href: () => profile.socials.reddit, label: "Reddit", icon: MessageCircle },
];

function SocialIcon({ href, label, Icon }: { href: string; label: string; Icon: React.ElementType }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="social-icon-item"
    >
      <Icon size={20} color="var(--light-gray-70)" />
      <span className="social-tooltip" aria-hidden>{label}</span>
    </a>
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
  placeholder,
  value,
  onChange,
  textarea = false,
  rows,
  disabled,
  touched,
  onTouch,
  error,
}: {
  name: FieldName;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  disabled?: boolean;
  touched: boolean;
  onTouch: () => void;
  error: string | null;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.trim().length > 0;
  const showError = touched && !!error;
  const showValid = touched && !error && value.trim().length > 0;
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className={`field-group ${active ? "active" : ""}`}>
      <span
        className="field-label"
        style={{
          color: showError
            ? "var(--bittersweet-shimmer)"
            : active
            ? "var(--orange-yellow-crayola)"
            : undefined,
        }}
      >
        {placeholder}
      </span>

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
              top: 14,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--orange-yellow-crayola)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      <Tag
        name={name}
        type={textarea ? undefined : type}
        required
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
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
      />

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
              marginTop: 6,
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
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
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
    if (status !== "idle") return;
    if (!valid) {
      setTouched({ fullname: true, email: true, message: true });
      return;
    }
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    try {
      await fetch("https://formspree.io/f/mgoggodq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
    } finally {
      setStatus("sent");
      window.setTimeout(() => setShowPanel(true), 200);
    }
  }

  return (
    <div className="page-shell">
      {/* Editorial Header */}
      <Reveal variant="fade-blur">
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
          Have a role, project, or question in mind? Send a message and I&apos;ll reply directly from {profile.email} — or schedule a technical conversation below.
        </p>
      </Reveal>

      {/* Two-Column Responsive Workspace */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 40,
          marginTop: 40,
        }}
      >
        {/* Left Column: Direct contact channels & metadata */}
        <Reveal variant="slide-right">
          <div role="list">
            <Stagger gap={0.06} variant="fade-up">
              {[
                <div
                  key="email"
                  role="listitem"
                  style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--light-gray)", marginBottom: 16 }}
                >
                  <Mail size={16} color="var(--orange-yellow-crayola)" /> {profile.email}
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
                rel="noreferrer"
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
                  placeholder="Full name"
                  value={form.fullname}
                  onChange={(v) => setForm({ ...form, fullname: v })}
                  disabled={status !== "idle"}
                  touched={touched.fullname}
                  onTouch={() => setTouched((t) => ({ ...t, fullname: true }))}
                  error={errors.fullname}
                />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  disabled={status !== "idle"}
                  touched={touched.email}
                  onTouch={() => setTouched((t) => ({ ...t, email: true }))}
                  error={errors.email}
                />
                <Field
                  name="message"
                  placeholder="Your message"
                  textarea
                  rows={5}
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  disabled={status !== "idle"}
                  touched={touched.message}
                  onTouch={() => setTouched((t) => ({ ...t, message: true }))}
                  error={errors.message}
                />

                <motion.button
                  type="submit"
                  layout
                  disabled={status === "submitting"}
                  className="shimmer-btn"
                  whileHover={valid && status === "idle" && !reduce ? { y: -2 } : undefined}
                  whileTap={valid && status === "idle" && !reduce ? { scale: 0.97 } : undefined}
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
                    cursor: valid && status === "idle" ? "pointer" : "not-allowed",
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
  background: "var(--eerie-black-1)",
  border: "1px solid hsla(0,0%,100%,0.1)",
  color: "var(--white-2)",
  padding: "12px 14px",
  borderRadius: 8,
  fontSize: "var(--fs-6)",
  fontFamily: "inherit",
  width: "100%",
  transition: "border-color 0.25s ease",
};
