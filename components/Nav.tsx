"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { spring, ease } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="site-nav"
      data-compact={compact}
      style={{
        background: compact ? "hsla(0, 0%, 7%, 0.88)" : "hsla(0, 0%, 7%, 0.7)",
        boxShadow: compact ? "0 8px 30px hsla(0,0%,0%,0.35)" : "none",
        transition: "background 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div className="site-nav-inner">
        <motion.div
          animate={reduce ? undefined : { scale: compact ? 0.94 : 1 }}
          transition={spring.snap}
          style={{ transformOrigin: "left center" }}
        >
          <Link
            href="/"
            aria-label="raitaskeen home"
            style={{
              color: "var(--orange-yellow-crayola)",
              fontWeight: 400,
              fontSize: 13.5,
              letterSpacing: "0.26em",
              textTransform: "lowercase",
              fontFamily: "ui-monospace, 'JetBrains Mono', 'Space Mono', 'SF Mono', 'Roboto Mono', 'Fira Code', Menlo, Consolas, monospace",
              display: "inline-flex",
              alignItems: "center",
              transition: "color 0.2s ease, opacity 0.2s ease",
            }}
          >
            <span>raitaskeen</span>
          </Link>
        </motion.div>

        <ul className="site-nav-links" style={{ display: "none", position: "relative" }} id="desktop-nav">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} style={{ position: "relative" }}>
                <Link
                  href={l.href}
                  prefetch={true}
                  className="site-nav-link"
                  style={{ position: "relative", color: active ? "var(--smoky-black)" : undefined }}
                >
                  {active && !reduce && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={spring.lively}
                      style={{
                        position: "absolute", inset: 0, borderRadius: 999,
                        background: "var(--orange-yellow-crayola)", zIndex: -1,
                      }}
                    />
                  )}
                  {active && reduce && (
                    <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--orange-yellow-crayola)", zIndex: -1 }} />
                  )}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
          className="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {open && (
        <motion.ul
          initial={reduce ? undefined : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.14, ease: ease.out }}
          className="nav-mobile-menu"
          style={{ display: "flex", flexDirection: "column", padding: "0 24px 16px", gap: 4 }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                prefetch={true}
                onClick={() => setOpen(false)}
                className={`site-nav-link ${pathname === l.href ? "active" : ""}`}
                style={{ display: "block" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}

      <style>{`
        .nav-mobile-toggle {
          color: var(--white-2);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        @media (min-width: 768px) {
          #desktop-nav { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          #desktop-nav { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
