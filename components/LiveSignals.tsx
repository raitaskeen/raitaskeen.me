"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Radio,
  Clock,
} from "lucide-react";
import SectionHeading from "@/components/motion/SectionHeading";

interface SignalData {
  hackerNews: {
    title: string;
    url: string;
    source: string;
    points: number;
    timeAgo: string;
  }[];
  techUpdates: {
    company: string;
    category: string;
    headline: string;
    date: string;
    url: string;
  }[];
  marketSignals: {
    asset: string;
    name: string;
    price: string;
    change24h: string;
    positive: boolean;
  }[];
}

const STATIC_HN = [
  {
    title: "Rust 1.85 and Rust 2024 Edition are stabilized",
    url: "https://blog.rust-lang.org/",
    source: "blog.rust-lang.org",
    points: 412,
    timeAgo: "4h ago",
  },
  {
    title: "Bun 1.2: Built-in S3 client, PostgreSQL driver, and cJS compatibility",
    url: "https://bun.sh/blog/bun-v1.2",
    source: "bun.sh",
    points: 385,
    timeAgo: "6h ago",
  },
  {
    title: "Tree-sitter: Fast and robust incremental parsing",
    url: "https://tree-sitter.github.io/tree-sitter/",
    source: "github.io",
    points: 290,
    timeAgo: "8h ago",
  },
  {
    title: "Why AST-based refactoring beats generative rewriting",
    url: "https://news.ycombinator.com",
    source: "news.ycombinator.com",
    points: 247,
    timeAgo: "12h ago",
  },
];

const STATIC_TECH = [
  {
    company: "Anthropic",
    category: "AI",
    headline: "Claude 3.5 Sonnet upgrades code reasoning and computer use capabilities",
    date: "Recent",
    url: "https://www.anthropic.com/news",
  },
  {
    company: "Rust Foundation",
    category: "Systems",
    headline: "Rust 2024 Edition lands with refined lifetime rules and standard library hardening",
    date: "Recent",
    url: "https://blog.rust-lang.org",
  },
  {
    company: "Google DeepMind",
    category: "AI",
    headline: "Gemini 2.0 Flash released with real-time multimodal streaming and agentic execution",
    date: "Recent",
    url: "https://deepmind.google/technologies/gemini/",
  },
  {
    company: "Bun",
    category: "Developer Tools",
    headline: "Bun 1.2 introduces native Node-compatible Postgres and full S3 SDK integration",
    date: "Recent",
    url: "https://bun.sh/blog",
  },
  {
    company: "Linux Kernel",
    category: "Operating Systems",
    headline: "Linux 6.13 brings memory tiering optimizations and enhanced Bcachefs tooling",
    date: "Recent",
    url: "https://kernel.org",
  },
];

const STATIC_CRYPTO = [
  { asset: "BTC", name: "Bitcoin", price: "$88,450", change24h: "+2.1%", positive: true },
  { asset: "ETH", name: "Ethereum", price: "$2,690", change24h: "+1.6%", positive: true },
  { asset: "SOL", name: "Solana", price: "$176", change24h: "+3.4%", positive: true },
];

export default function LiveSignals() {
  const [data, setData] = useState<SignalData>({
    hackerNews: STATIC_HN,
    techUpdates: STATIC_TECH,
    marketSignals: STATIC_CRYPTO,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/resources/signals")
      .then((res) => {
        if (!res.ok) throw new Error("Signal fetch failed");
        return res.json();
      })
      .then((json: SignalData) => {
        if (mounted && json && json.hackerNews) {
          setData(json);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Fallback silently without throwing or blocking UI
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ marginTop: 48 }}>
      {/* 02 — WHAT'S HAPPENING NOW */}
      <section style={{ marginBottom: 52 }} aria-label="02 What's Happening Now">
        <SectionHeading index="02" title="What's Happening Now" />
        <div
          style={{
            marginTop: -14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", margin: 0, maxWidth: "62ch" }}>
            Real-time telemetry and curated signals tracking breaking systems discussions, foundational tech shifts, and macro market pulse.
          </p>
          <div>
            {isLive ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#68d391",
                  background: "hsla(120, 40%, 15%, 0.5)",
                  border: "1px solid hsla(120, 40%, 35%, 0.3)",
                  padding: "3px 8px",
                  borderRadius: 4,
                  letterSpacing: "0.08em",
                }}
              >
                <Radio size={11} color="#68d391" className="live-pulse" />
                SIGNAL · LIVE FEED
              </span>
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "var(--light-gray-70)",
                  background: "hsla(0, 0%, 15%, 0.5)",
                  border: "1px solid hsla(0, 0%, 100%, 0.1)",
                  padding: "3px 8px",
                  borderRadius: 4,
                  letterSpacing: "0.08em",
                }}
              >
                <Clock size={11} color="var(--light-gray-70)" />
                SIGNAL · CACHED / HOURLY
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 03 — HACKER NEWS */}
      <section style={{ marginBottom: 56 }} aria-label="03 Hacker News">
        <SectionHeading index="03" title="Hacker News" />
        <p
          style={{
            color: "var(--orange-yellow-crayola)",
            fontSize: 11,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: -14,
            marginBottom: 18,
          }}
        >
          HIGH-SIGNAL ENGINEERING &amp; SYSTEMS DISCUSSIONS
        </p>

        {/* Reading List Format */}
        <div style={{ borderTop: "1px solid hsla(0, 0%, 100%, 0.08)" }}>
          {data.hackerNews.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "grid",
                gridTemplateColumns: "36px 1fr auto",
                alignItems: "baseline",
                gap: 16,
                padding: "16px 8px",
                borderBottom: "1px solid hsla(0, 0%, 100%, 0.06)",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsla(0, 0%, 100%, 0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: "var(--orange-yellow-crayola)",
                  fontWeight: 600,
                  opacity: 0.85,
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <span
                  style={{
                    color: "var(--white-2)",
                    fontSize: "var(--fs-5)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    display: "inline-block",
                  }}
                >
                  {item.title}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)" }}>
                    {item.source}
                  </span>
                  <span style={{ color: "hsla(0,0%,100%,0.2)" }}>·</span>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--light-gray-70)" }}>
                    {item.points} points
                  </span>
                  <span style={{ color: "hsla(0,0%,100%,0.2)" }}>·</span>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--light-gray-70)" }}>
                    {item.timeAgo}
                  </span>
                </div>
              </div>
              <span
                style={{
                  color: "var(--light-gray-70)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  fontFamily: "monospace",
                }}
              >
                Read <ArrowUpRight size={14} color="var(--orange-yellow-crayola)" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 04 — TECH COMPANY UPDATES */}
      <section style={{ marginBottom: 56 }} aria-label="04 Tech Company Updates">
        <SectionHeading index="04" title="Tech Company Updates" />
        <p
          style={{
            color: "var(--orange-yellow-crayola)",
            fontSize: 11,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: -14,
            marginBottom: 24,
          }}
        >
          TECH COMPANY UPDATES // PRODUCT &amp; SYSTEMS RELEASES
        </p>

        {/* Editorial Timeline Format */}
        <div
          style={{
            position: "relative",
            paddingLeft: 24,
            borderLeft: "1px solid hsla(0, 0%, 100%, 0.12)",
            marginLeft: 6,
          }}
        >
          {data.techUpdates.map((update, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                marginBottom: idx === data.techUpdates.length - 1 ? 0 : 28,
              }}
            >
              {/* Timeline Node Dot */}
              <span
                style={{
                  position: "absolute",
                  left: -29,
                  top: 5,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "var(--orange-yellow-crayola)",
                  boxShadow: "0 0 8px hsla(45, 100%, 72%, 0.4)",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />

              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--orange-yellow-crayola)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {update.company}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "var(--light-gray-70)",
                    background: "hsla(0, 0%, 100%, 0.06)",
                    border: "1px solid hsla(0, 0%, 100%, 0.08)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {update.category}
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--light-gray-70)" }}>
                  {update.date}
                </span>
              </div>

              <p style={{ color: "var(--white-2)", fontSize: "var(--fs-6)", margin: "0 0 8px", lineHeight: 1.5, fontWeight: 400 }}>
                {update.headline}
              </p>

              <a
                href={update.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "var(--orange-yellow-crayola)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Release Notes <ArrowUpRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — MARKET SIGNAL */}
      <section style={{ marginBottom: 32 }} aria-label="05 Market Signal">
        <SectionHeading index="05" title="Market Signal" />
        <p
          style={{
            color: "var(--orange-yellow-crayola)",
            fontSize: 11,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: -14,
            marginBottom: 20,
          }}
        >
          MACRO LIQUIDITY &amp; CRYPTO BENCHMARKS
        </p>

        {/* Metric Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {data.marketSignals.map((sig) => (
            <div
              key={sig.asset}
              style={{
                padding: "16px 20px",
                borderRadius: 10,
                background: "hsla(0, 0%, 9%, 0.88)",
                border: "1px solid hsla(0, 0%, 100%, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "var(--white-2)" }}>
                    {sig.asset}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--light-gray-70)", fontFamily: "monospace" }}>
                    {sig.name}
                  </span>
                </div>
                <p style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 700, margin: "6px 0 0", fontFamily: "monospace" }}>
                  {sig.price}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                    fontFamily: "monospace",
                    fontSize: 11,
                    fontWeight: 600,
                    color: sig.positive ? "#48bb78" : "#f56565",
                    background: sig.positive ? "hsla(140, 45%, 25%, 0.25)" : "hsla(0, 45%, 25%, 0.25)",
                    border: sig.positive ? "1px solid hsla(140, 45%, 35%, 0.3)" : "1px solid hsla(0, 45%, 35%, 0.3)",
                    padding: "2px 7px",
                    borderRadius: 4,
                  }}
                >
                  {sig.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {sig.change24h}
                </span>
                <p style={{ fontSize: 10, color: "var(--light-gray-70)", fontFamily: "monospace", margin: "4px 0 0", opacity: 0.8 }}>
                  24H DELTA
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
