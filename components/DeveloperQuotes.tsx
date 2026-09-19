"use client";

import { useState } from "react";
import { Quote, Shuffle } from "lucide-react";
import { developerQuotes, type DeveloperQuote } from "@/lib/data";

function getRandomQuotes(all: DeveloperQuote[], count = 3): DeveloperQuote[] {
  const pool = [...all];
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export default function DeveloperQuotes() {
  // Deterministic SSR: first 3 quotes are always rendered initially to prevent hydration mismatch
  const [displayedQuotes, setDisplayedQuotes] = useState<DeveloperQuote[]>(() =>
    developerQuotes.slice(0, 3)
  );
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    const newQuotes = getRandomQuotes(developerQuotes, 3);
    setDisplayedQuotes(newQuotes);
    setTimeout(() => setIsShuffling(false), 300);
  };

  return (
    <section style={{ marginTop: 56 }} aria-label="Developer Wisdom and Humor">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              color: "var(--white-2)",
              fontSize: "var(--fs-2)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: 0,
            }}
          >
            <Quote size={20} color="var(--orange-yellow-crayola)" />
            Developer Wisdom // Runtime Humor
          </h2>
          <p
            style={{
              color: "var(--light-gray-70)",
              fontSize: "var(--fs-7)",
              marginTop: 6,
              maxWidth: "65ch",
              margin: "6px 0 0",
            }}
          >
            Hard-won engineering axioms and production folklore from the trenches.
          </p>
        </div>

        <button
          type="button"
          onClick={handleShuffle}
          className="shimmer-btn"
          aria-label="Shuffle quotes"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 8,
            background: "hsla(0, 0%, 100%, 0.05)",
            border: "1px solid hsla(45, 100%, 72%, 0.25)",
            color: "var(--orange-yellow-crayola)",
            fontSize: "var(--fs-7)",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "hsla(45, 100%, 72%, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "hsla(0, 0%, 100%, 0.05)";
          }}
        >
          <Shuffle
            size={15}
            style={{
              transform: isShuffling ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
          <span>Shuffle quotes</span>
        </button>
      </div>

      <div
        className="developer-quotes-grid"
        aria-live="polite"
        aria-atomic="true"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 16,
        }}
      >
        {displayedQuotes.map((quote) => (
          <div
            key={quote.id}
            className="gradient-border-hover"
            style={{
              padding: 22,
              position: "relative",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 16,
              height: "100%",
            }}
          >
            <div style={{ position: "relative" }}>
              <Quote
                size={24}
                style={{
                  color: "hsla(45, 100%, 72%, 0.2)",
                  marginBottom: 8,
                  display: "block",
                }}
              />
              <p
                style={{
                  color: "var(--white-2)",
                  fontSize: "var(--fs-6)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                &ldquo;{quote.text}&rdquo;
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 12,
                borderTop: "1px solid hsla(0, 0%, 100%, 0.06)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--fs-8)",
                  fontFamily: "monospace",
                  color: "var(--orange-yellow-crayola)",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                — {quote.author}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "var(--light-gray-70)",
                  opacity: 0.6,
                }}
              >
                {quote.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
