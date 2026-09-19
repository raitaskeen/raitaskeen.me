"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, ArrowRight, Download, Calendar, Smartphone } from "lucide-react";
import { ease } from "@/lib/motion";
import { profile } from "@/lib/data";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePwaInstall } from "@/components/PwaRegister";

const links = [
  { href: "/", label: "Home", num: "01" },
  { href: "/about", label: "About", num: "02" },
  { href: "/projects", label: "Projects", num: "03" },
  { href: "/resources", label: "Resources", num: "04" },
  { href: "/contact", label: "Contact", num: "05" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduce = useReducedMotion();
  const { isInstallable, isInstalled, promptInstall, openManualInstructions } = usePwaInstall();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Scroll listener to condense navbar slightly
  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close sheet when screen resizes to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
        <div>
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
              transition: "color var(--dur-hover) var(--ease-out-standard), opacity var(--dur-hover) var(--ease-out-standard)",
            }}
          >
            <span>raitaskeen</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="site-nav-links" style={{ display: "none", position: "relative" }} id="desktop-nav">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} style={{ position: "relative" }}>
                <Link
                  href={l.href}
                  className="site-nav-link"
                  style={{ position: "relative", color: active ? "var(--smoky-black)" : undefined }}
                >
                  {active && !reduce && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ duration: 0.18, ease: ease.out }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 999,
                        background: "var(--orange-yellow-crayola)",
                        zIndex: -1,
                      }}
                    />
                  )}
                  {active && reduce && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 999,
                        background: "var(--orange-yellow-crayola)",
                        zIndex: -1,
                      }}
                    />
                  )}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Accessible Navigation Trigger & Sheet Drawer */}
        <div className="md:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="nav-mobile-toggle"
                aria-label="Toggle navigation menu"
                style={{
                  minWidth: 44,
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "none",
                  color: "var(--white-2)",
                  cursor: "pointer",
                  borderRadius: 6,
                  transition: "color var(--dur-hover) var(--ease-out-standard)",
                }}
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[85vw] max-w-sm bg-[hsl(0,0%,8%)] text-[var(--white-2)] border-[hsla(0,0%,100%,0.1)]">
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--orange-yellow-crayola)]" />
                  <SheetTitle className="text-sm tracking-widest uppercase font-mono text-[var(--orange-yellow-crayola)]">
                    raitaskeen // menu
                  </SheetTitle>
                </div>
                <SheetDescription>
                  Software Engineer · Systems &amp; Compilers
                </SheetDescription>
              </SheetHeader>

              {/* Navigation Links with Active Indicator & Section Numbering */}
              <div className="flex flex-col gap-1 my-4">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-3 px-3 rounded-md transition-all text-sm font-medium"
                      style={{
                        minHeight: 44,
                        background: active ? "hsla(45, 100%, 72%, 0.12)" : "transparent",
                        color: active ? "var(--orange-yellow-crayola)" : "var(--white-2)",
                        borderLeft: active ? "2px solid var(--orange-yellow-crayola)" : "2px solid transparent",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono opacity-50">{l.num} {"//"}</span>
                        <span className="text-base font-semibold tracking-wide">{l.label}</span>
                      </div>
                      <ArrowRight
                        size={14}
                        className={`transition-transform duration-150 ${
                          active ? "translate-x-0 opacity-100 text-[var(--orange-yellow-crayola)]" : "opacity-0 group-hover:opacity-60 -translate-x-1"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              <Separator className="my-2" />

              {/* Quick Actions in Mobile Menu */}
              <div className="flex flex-col gap-2 my-2">
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="default"
                    className="w-full justify-center h-11"
                  >
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Get in touch
                    </Link>
                  </Button>
                </SheetClose>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <a
                    href={profile.resumeUrl}
                    download
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-mono text-[var(--white-2)] bg-[hsla(0,0%,100%,0.04)] border border-[hsla(0,0%,100%,0.1)] hover:border-[var(--orange-yellow-crayola)] transition-colors"
                  >
                    <Download size={12} /> Résumé
                  </a>

                  <a
                    href={profile.scheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-mono text-[var(--white-2)] bg-[hsla(0,0%,100%,0.04)] border border-[hsla(0,0%,100%,0.1)] hover:border-[var(--orange-yellow-crayola)] transition-colors"
                  >
                    <Calendar size={12} /> Schedule
                  </a>
                </div>

                {/* PWA Install Entry inside Mobile Menu */}
                {!isInstalled && (
                  <button
                    onClick={() => {
                      setOpen(false);
                      if (isInstallable) {
                        promptInstall();
                      } else {
                        openManualInstructions();
                      }
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 mt-1 rounded-md text-xs font-mono text-[var(--orange-yellow-crayola)] bg-[hsla(45,100%,72%,0.08)] border border-[hsla(45,100%,72%,0.25)] hover:bg-[hsla(45,100%,72%,0.15)] transition-colors"
                    style={{ minHeight: 40 }}
                  >
                    <Smartphone size={13} />
                    <span>Install Portfolio App</span>
                  </button>
                )}
              </div>

              <SheetFooter>
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--light-gray-70)] w-full">
                  <span>5+ YRS IN PROD</span>
                  <span>LAHORE, PK</span>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          #desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
