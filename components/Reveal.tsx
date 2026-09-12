"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealVariants, spring, ease, stagger, type RevealVariant } from "@/lib/motion";

export default function Reveal({
  children,
  delay = 0,
  variant = "fade-up",
  duration,
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const variants = revealVariants[variant];

  if (reduce) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate={immediate ? "show" : undefined}
      whileInView={immediate ? undefined : "show"}
      viewport={immediate ? undefined : { once: true, margin: "-60px" }}
      variants={variants}
      transition={duration ? { duration, delay, ease: ease.out } : { ...spring.gentle, delay }}
    >
      {children}
    </motion.div>
  );
}

// Wrap a group of children to stagger their entrance. Each direct child
// should itself be a <Reveal>-style motion element using variants="show"/"hidden"
// inheritance (motion.div with no explicit initial/animate) — simplest usage
// is wrapping plain elements and letting Stagger drive them via css nth-child
// isn't reliable, so in practice we pass an array and render internally.
export function Stagger({
  children,
  gap = stagger.normal,
  variant = "fade-up",
  className,
}: {
  children: React.ReactNode[];
  gap?: number;
  variant?: RevealVariant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants = revealVariants[variant];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={variants} transition={spring.gentle}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
