// Shared motion language. Every animated component pulls its physics from
// here instead of hard-coding its own duration/ease/spring — this is what
// keeps the whole site feeling like one coherent physical system instead of
// a pile of unrelated animations built by different people at different
// times. If a component needs a value that isn't here, that's a signal to
// add it here first, not to invent a local constant.

export const spring = {
  // Barely-there settle for ambient/background elements — smooth, controlled.
  ambient: { type: "spring" as const, stiffness: 60, damping: 18, mass: 0.9 },
  // Default UI motion — entrances, reveals, everyday transitions.
  gentle: { type: "spring" as const, stiffness: 160, damping: 22, mass: 0.7 },
  // Cursor-follow, hover states — immediate, snappy connection to input.
  responsive: { type: "spring" as const, stiffness: 240, damping: 24, mass: 0.4 },
  // Nav pills, active indicators, things that should feel eager.
  lively: { type: "spring" as const, stiffness: 300, damping: 22, mass: 0.5 },
  // Clicks, toggles, immediate feedback.
  snap: { type: "spring" as const, stiffness: 450, damping: 32, mass: 0.35 },
  // Fast tactile press/release for buttons and interactive controls.
  buttonPress: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.25 },
  // Restrained magnetic attraction with zero drag latency.
  magnetic: { type: "spring" as const, stiffness: 280, damping: 20, mass: 0.3 },
  // Success states, playful overshoot — the one place a bit of bounce earns its keep.
  elastic: { type: "spring" as const, stiffness: 320, damping: 14, mass: 0.7 },
};

export const duration = {
  instant: 0.12,
  fast: 0.2,
  normal: 0.35,
  slow: 0.6,
};

export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // premium "decelerate" curve
  inOut: [0.65, 0, 0.35, 1] as const,
};

// Conceptual tokens so every component reaches for the same vocabulary of
// "how far", "how blurred", "how scaled" instead of picking new numbers.
export const distance = {
  micro: 2,   // text nudges, icon shifts
  small: 8,   // chip/card lift, arrow travel
  medium: 24, // reveal-on-scroll offset
  large: 64,  // hero/section-level travel
} as const;

export const scaleToken = {
  press: 0.97,
  hover: 1.02,
  reveal: 0.94,
} as const;

export const blurToken = {
  subtle: "blur(4px)",
  medium: "blur(10px)",
  deep: "blur(20px)",
} as const;

// Reveal variants shared by <Reveal /> — see components/Reveal.tsx
export const revealVariants = {
  "fade-up": {
    hidden: { opacity: 0, y: distance.medium },
    show: { opacity: 1, y: 0 },
  },
  "fade-blur": {
    hidden: { opacity: 0, y: 16, filter: blurToken.medium },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "clip-up": {
    hidden: { opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: scaleToken.reveal },
    show: { opacity: 1, scale: 1 },
  },
} as const;

export type RevealVariant = keyof typeof revealVariants;

// Stagger timing for grouped children (chips, cards, badges, bullets)
export const stagger = {
  tight: 0.04,
  normal: 0.07,
  loose: 0.12,
};

// Motion hierarchy — see spec §65. Use these to sanity-check how loud a new
// animation should be relative to where it lives on the page.
export const motionLevel = {
  ambient: 1,      // background glow, particles, breathing — should be almost subconscious
  interactive: 2,   // hover, press, nav, cards — noticeable only on contact
  hero: 3,          // hero reveal, project transitions, contact success — the loud moments
} as const;
