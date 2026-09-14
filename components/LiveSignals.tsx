import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Radio,
} from "lucide-react";
import SectionHeading from "@/components/motion/SectionHeading";
import { getLiveSignals, type LiveSignalsPayload } from "@/lib/resources";

export function LiveSignalsSkeleton() {
  return (
    <div style={{ marginTop: 52 }} aria-label="Loading live signals">
      {/* 02 Skeleton */}
      <div style={{ marginBottom: 52 }}>
        <div style={{ width: 280, height: 28, background: "hsla(0, 0%, 100%, 0.05)", borderRadius: 6, marginBottom: 20 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          <div
            style={{
              padding: 24,
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
              minHeight: 320,
            }}
          />
          <div
            style={{
              padding: 24,
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
              minHeight: 320,
            }}
          />
        </div>
      </div>

      {/* 03 Skeleton */}
      <div>
        <div style={{ width: 180, height: 28, background: "hsla(0, 0%, 100%, 0.05)", borderRadius: 6, marginBottom: 20 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 84,
                borderRadius: 10,
                background: "hsla(0, 0%, 9%, 0.88)",
                border: "1px solid hsla(0, 0%, 100%, 0.08)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LiveSignalsView({ data }: { data: LiveSignalsPayload }) {
  return (
    <div style={{ marginTop: 52 }}>
      {/* 02 — LIVE ENGINEERING & AI SIGNALS */}
      <section style={{ marginBottom: 56 }} aria-label="02 Live Engineering and AI Signals">
        <SectionHeading index="02" title="Live Engineering & AI Signals" />
        <div
          style={{
            marginTop: -14,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", margin: 0, maxWidth: "62ch" }}>
            Real-time telemetry tracking high-signal discussions and frontier AI &amp; systems releases.
          </p>
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
            LIVE FEED · REVALIDATED 5M
          </span>
        </div>

        {/* 2-Column Responsive Layout: Hacker News & Tech Releases */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {/* Column A: Hacker News */}
          <div
            style={{
              padding: "22px 20px",
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "var(--orange-yellow-crayola)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Hacker News Discussions
              </span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)" }}>
                Top High-Signal
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {data.hackerNews.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="signal-item-link"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 10px",
                    borderRadius: 8,
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "var(--orange-yellow-crayola)",
                      fontWeight: 600,
                      marginTop: 2,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flexGrow: 1 }}>
                    <h4
                      style={{
                        color: "var(--white-2)",
                        fontSize: "var(--fs-6)",
                        fontWeight: 500,
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--orange-yellow-crayola)" }}>
                        {item.source}
                      </span>
                      <span style={{ color: "hsla(0,0%,100%,0.2)" }}>·</span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--light-gray-70)" }}>
                        {item.points} pts
                      </span>
                      <span style={{ color: "hsla(0,0%,100%,0.2)" }}>·</span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "var(--light-gray-70)" }}>
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={13} color="var(--orange-yellow-crayola)" style={{ marginTop: 3, flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Column B: Tech & AI Intelligence */}
          <div
            style={{
              padding: "22px 20px",
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "var(--orange-yellow-crayola)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Frontier Tech &amp; AI Intelligence
              </span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)" }}>
                Verified Official Feeds
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {data.techUpdates.map((update, idx) => (
                <a
                  key={idx}
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="signal-item-link"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    padding: "12px 14px",
                    borderRadius: 8,
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "var(--orange-yellow-crayola)",
                        }}
                      >
                        {update.company}
                      </span>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 9,
                          color: "var(--light-gray-70)",
                          background: "hsla(0, 0%, 100%, 0.06)",
                          padding: "1px 5px",
                          borderRadius: 3,
                        }}
                      >
                        {update.category}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          color:
                            update.freshness === "Breaking"
                              ? "#68d391"
                              : update.freshness === "Fresh"
                              ? "var(--orange-yellow-crayola)"
                              : "var(--light-gray-70)",
                          fontWeight: update.freshness === "Breaking" ? 600 : 400,
                        }}
                      >
                        {update.date}
                      </span>
                      <ArrowUpRight size={12} color="var(--orange-yellow-crayola)" />
                    </div>
                  </div>

                  <p
                    style={{
                      color: "var(--white-2)",
                      fontSize: "var(--fs-7)",
                      lineHeight: 1.45,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {update.headline}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — MARKET SIGNAL */}
      <section style={{ marginBottom: 32 }} aria-label="03 Market Signal">
        <SectionHeading index="03" title="Market Signal" />
        <p
          style={{
            color: "var(--light-gray-70)",
            fontSize: "var(--fs-7)",
            marginTop: -14,
            marginBottom: 20,
          }}
        >
          Macro liquidity &amp; decentralized systems telemetry.
        </p>

        {/* Refined Compact Metric Strip */}
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
                borderRadius: 12,
                background: "hsla(0, 0%, 9%, 0.88)",
                backdropFilter: "blur(14px)",
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
                <p
                  style={{
                    color: "var(--white-2)",
                    fontSize: "var(--fs-4)",
                    fontWeight: 700,
                    margin: "6px 0 0",
                    fontFamily: "monospace",
                  }}
                >
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

export default async function LiveSignals() {
  const data = await getLiveSignals();
  return <LiveSignalsView data={data} />;
}
