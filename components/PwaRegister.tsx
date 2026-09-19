"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { Download, X, HelpCircle, Check, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { duration } from "@/lib/motion";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PwaContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<boolean>;
  openManualInstructions: () => void;
}

const PwaContext = createContext<PwaContextType>({
  isInstallable: false,
  isInstalled: false,
  promptInstall: async () => false,
  openManualInstructions: () => {},
});

export function usePwaInstall() {
  return useContext(PwaContext);
}

function getStandaloneSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function getStandaloneServerSnapshot(): boolean {
  return false;
}

function subscribeStandalone(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(display-mode: standalone)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export default function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getStandaloneSnapshot,
    getStandaloneServerSnapshot
  );
  const [appInstalledEventFired, setAppInstalledEventFired] = useState(false);
  const isInstalled = isStandalone || appInstalledEventFired;

  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker reliably across document states
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const registerSw = () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            reg.onupdatefound = () => {
              const installing = reg.installing;
              if (installing) {
                installing.onstatechange = () => {
                  if (installing.state === "installed" && navigator.serviceWorker.controller) {
                    // New update available; handled gracefully by SW lifecycle
                  }
                };
              }
            };
          })
          .catch(() => {
            // Ignored in non-supporting contexts
          });
      };

      if (document.readyState === "complete" || document.readyState === "interactive") {
        registerSw();
      } else {
        window.addEventListener("load", registerSw, { once: true });
      }
    }

    // 3. Handle beforeinstallprompt event
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      try {
        const dismissed = sessionStorage.getItem("pwa_install_dismissed");
        if (!dismissed) {
          setShowInstallBanner(true);
        }
      } catch {
        setShowInstallBanner(true);
      }
    }

    function handleAppInstalled() {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      setAppInstalledEventFired(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      setShowManualModal(true);
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowInstallBanner(false);
        setAppInstalledEventFired(true);
        return true;
      }
      return false;
    } catch {
      setShowManualModal(true);
      return false;
    }
  }, [deferredPrompt]);

  const openManualInstructions = useCallback(() => {
    setShowManualModal(true);
  }, []);

  function handleDismissBanner() {
    setShowInstallBanner(false);
    try {
      sessionStorage.setItem("pwa_install_dismissed", "1");
    } catch {
      // Storage unavailable in private browsing
    }
  }

  return (
    <PwaContext.Provider
      value={{
        isInstallable: !!deferredPrompt && !isInstalled,
        isInstalled,
        promptInstall,
        openManualInstructions,
      }}
    >
      {/* 1. Floating Non-Intrusive Banner (Only when prompt is actionable and not dismissed) */}
      <AnimatePresence>
        {showInstallBanner && !isInstalled && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: duration.fast }}
            className="bracket-card"
            style={{
              position: "fixed",
              bottom: 24,
              left: 20,
              zIndex: 9998,
              maxWidth: 320,
              background: "hsla(0, 0%, 9%, 0.96)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(45, 100%, 72%, 0.35)",
              borderRadius: 12,
              padding: "14px 16px",
              boxShadow: "0 12px 36px hsla(0, 0%, 0%, 0.6)",
            }}
          >
            <span className="corner-tick corner-tick-tl" aria-hidden="true" />
            <span className="corner-tick corner-tick-tr" aria-hidden="true" />
            <span className="corner-tick corner-tick-bl" aria-hidden="true" />
            <span className="corner-tick corner-tick-br" aria-hidden="true" />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", fontWeight: 700, textTransform: "uppercase" }}>
                  PWA // INSTALL
                </span>
                <p style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", fontWeight: 600, margin: "2px 0 0" }}>
                  Install Portfolio App
                </p>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 4, lineHeight: 1.4, margin: 0 }}>
                  Add to home screen or app dock for fast offline access.
                </p>
              </div>
              <button
                onClick={handleDismissBanner}
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
                onClick={() => promptInstall()}
                className="shimmer-btn"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 6,
                  background: "var(--orange-yellow-crayola)",
                  color: "var(--smoky-black)",
                  fontSize: "var(--fs-8)",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Download size={13} />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismissBanner}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "hsla(0, 0%, 100%, 0.06)",
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

      {/* 2. Accessible Manual Installation Guidance Modal */}
      <AnimatePresence>
        {showManualModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="manual-install-title"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "hsla(0, 0%, 0%, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={() => setShowManualModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="bracket-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 420,
                width: "100%",
                background: "hsla(0, 0%, 9%, 0.98)",
                border: "1px solid hsla(45, 100%, 72%, 0.35)",
                borderRadius: 14,
                padding: "24px 26px",
                boxShadow: "0 16px 40px hsla(0, 0%, 0%, 0.7)",
              }}
            >
              <span className="corner-tick corner-tick-tl" aria-hidden="true" />
              <span className="corner-tick corner-tick-tr" aria-hidden="true" />
              <span className="corner-tick corner-tick-bl" aria-hidden="true" />
              <span className="corner-tick corner-tick-br" aria-hidden="true" />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Smartphone size={18} color="var(--orange-yellow-crayola)" />
                  <h3 id="manual-install-title" style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: 0 }}>
                    Install Application
                  </h3>
                </div>
                <button
                  onClick={() => setShowManualModal(false)}
                  aria-label="Close installation instructions"
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--light-gray-70)",
                    cursor: "pointer",
                    padding: 4,
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: "12px 14px", borderRadius: 8, background: "hsla(0, 0%, 5%, 0.6)", border: "1px solid hsla(0, 0%, 100%, 0.08)" }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", fontWeight: 700 }}>
                    ANDROID / CHROME
                  </span>
                  <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", marginTop: 4, lineHeight: 1.5, margin: 0 }}>
                    Tap the browser menu (<strong>⋮</strong> three dots top-right) and select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                  </p>
                </div>

                <div style={{ padding: "12px 14px", borderRadius: 8, background: "hsla(0, 0%, 5%, 0.6)", border: "1px solid hsla(0, 0%, 100%, 0.08)" }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", fontWeight: 700 }}>
                    APPLE / SAFARI (iOS)
                  </span>
                  <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", marginTop: 4, lineHeight: 1.5, margin: 0 }}>
                    Tap the <strong>Share</strong> button (box with upward arrow) and select <strong>&quot;Add to Home Screen&quot;</strong>.
                  </p>
                </div>

                <div style={{ padding: "12px 14px", borderRadius: 8, background: "hsla(0, 0%, 5%, 0.6)", border: "1px solid hsla(0, 0%, 100%, 0.08)" }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", fontWeight: 700 }}>
                    DESKTOP (CHROME / EDGE)
                  </span>
                  <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", marginTop: 4, lineHeight: 1.5, margin: 0 }}>
                    Click the <strong>Install</strong> icon in the address bar (right side of URL bar).
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => setShowManualModal(false)}
                  variant="default"
                  size="sm"
                >
                  Understood
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PwaContext.Provider>
  );
}
