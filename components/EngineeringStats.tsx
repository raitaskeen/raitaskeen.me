"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

interface EngineeringStatsProps {
  gh?: {
    publicRepos: number;
    followers: number;
  } | null;
}

interface StatItem {
  id: string;
  formattedNumber: string;
  label: string;
  sub: string;
  sparklinePath: string;
}

export default function EngineeringStats({ gh }: EngineeringStatsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const reposCount = gh?.publicRepos ?? profile.stats.publicRepos;
  const followersCount = gh?.followers ?? profile.stats.githubFollowers;
  const yearsCount = profile.stats.yearsCoding;

  const stats: StatItem[] = [
    {
      id: "exp",
      formattedNumber: `${String(yearsCount).padStart(2, "0")}+`,
      label: "YEARS BUILDING",
      sub: "Full-Stack · Systems · Rust",
      sparklinePath: "M 0 16 L 15 16 L 28 11 L 42 7 L 60 3",
    },
    {
      id: "followers",
      formattedNumber: `${followersCount}+`,
      label: "GITHUB FOLLOWERS",
      sub: "Open Developer Network",
      sparklinePath: "M 0 14 L 14 14 L 22 5 L 30 17 L 38 7 L 46 14 L 60 14",
    },
    {
      id: "repos",
      formattedNumber: `${reposCount}+`,
      label: "OPEN SOURCE ARTIFACTS",
      sub: "Verified Repos & Tooling",
      sparklinePath: "M 0 15 L 16 15 L 24 9 L 36 9 L 44 4 L 60 4",
    },
  ];

  return (
    <section
      aria-label="Verified Engineering Metrics"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginTop: 32,
      }}
    >
      {stats.map((stat) => {
        const isHovered = hoveredId === stat.id;
        return (
          <div
            key={stat.id}
            onMouseEnter={() => setHoveredId(stat.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="gradient-border-hover"
            style={{
              padding: "20px 22px",
              borderRadius: 12,
              background: "hsla(0, 0%, 9%, 0.85)",
              backdropFilter: "blur(12px)",
              border: isHovered
                ? "1px solid var(--orange-yellow-crayola)"
                : "1px solid hsla(45, 100%, 72%, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 16,
              transition: "border-color 0.2s ease, transform 0.2s ease, background 0.2s ease",
              transform: isHovered ? "translateY(-2px)" : "none",
            }}
          >
            {/* Top row: Number with integrated plus sign + miniature signal graph */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div
                style={{
                  fontSize: "clamp(32px, 4vw, 40px)",
                  fontWeight: 700,
                  color: "var(--orange-yellow-crayola)",
                  fontFamily: "monospace",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  display: "inline-flex",
                  alignItems: "baseline",
                }}
              >
                <span>{stat.formattedNumber}</span>
              </div>

              {/* Miniature architectural signal indicator */}
              <div style={{ width: 60, height: 20, flexShrink: 0, opacity: isHovered ? 1 : 0.65, transition: "opacity 0.2s ease" }}>
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none" aria-hidden="true">
                  <path
                    d={stat.sparklinePath}
                    stroke={isHovered ? "var(--orange-yellow-crayola)" : "hsla(45, 100%, 72%, 0.4)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="60"
                    cy={stat.id === "exp" ? 3 : stat.id === "followers" ? 14 : 4}
                    r="2"
                    fill="var(--orange-yellow-crayola)"
                  />
                </svg>
              </div>
            </div>

            {/* Label and Context */}
            <div>
              <p
                style={{
                  color: "var(--white-2)",
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  color: "var(--light-gray-70)",
                  fontSize: "var(--fs-8)",
                  marginTop: 3,
                  lineHeight: 1.4,
                }}
              >
                {stat.sub}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
