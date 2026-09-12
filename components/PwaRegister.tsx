"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { duration } from "@/lib/motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker (deferred until after window load to protect initial render)
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const registerSw = () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            // Check for sw update
            reg.onupdatefound = () => {
              const installing = reg.installing;
              if (installing) {
                installing.onstatechange = () => {
                  if (installing.state === "installed" && navigator.serviceWorker.controller) {
                    // New update available
                  }
                };
              }
            };
          })
          .catch(() => {
            // Service worker registration ignored in environments that don't support it
          });
      };

      if (document.readyState === "complete") {
        registerSw();
      } else {
        window.addEventListener("load", registerSw, { once: true });
      }
    }

    // 2. Handle beforeinstallprompt event
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      const dismissed = sessionStorage.getItem("pwa_install_dismissed");
      if (!dismissed) {
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowInstallPrompt(true);
      }
    }

    function handleAppInstalled() {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  }

  function handleDismiss() {
    setShowInstallPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pwa_install_dismissed", "1");
    }
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: duration.fast }}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 9998,
            maxWidth: 320,
            background: "hsla(0, 0%, 10%, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsla(45, 100%, 72%, 0.35)",
            borderRadius: 14,
            padding: "14px 16px",
            boxShadow: "0 10px 30px hsla(0, 0%, 0%, 0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div>
              <p style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", fontWeight: 600 }}>
                Install Portfolio App
              </p>
              <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 4, lineHeight: 1.4 }}>
                Add to your home screen or dock for fast offline access.
              </p>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss install banner"
              style={{
                background: "none",
                border: "none",
                color: "var(--light-gray-70)",
                cursor: "pointer",
                padding: 2,
                display: "flex",
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={handleInstallClick}
              className="shimmer-btn"
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 8,
                background: "var(--orange-yellow-crayola)",
                color: "var(--smoky-black)",
                fontSize: "var(--fs-8)",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              <Download size={14} />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "hsla(0, 0%, 100%, 0.08)",
                color: "var(--light-gray)",
                fontSize: "var(--fs-8)",
                border: "1px solid hsla(0, 0%, 100%, 0.1)",
                cursor: "pointer",
              }}
            >
              Not now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
