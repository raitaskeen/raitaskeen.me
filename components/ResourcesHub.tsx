"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookMarked,
  Compass,
  FileText,
  Library,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { curatedResources, type EngineeringReference } from "@/lib/data";

type FilterCategory = "All" | "Roadmaps" | "Papers" | "Books" | "Tools";

const CATEGORIES: { label: FilterCategory; kind?: EngineeringReference["kind"]; icon: LucideIcon }[] = [
  { label: "All", icon: Compass },
  { label: "Roadmaps", kind: "roadmap", icon: BookMarked },
  { label: "Papers", kind: "paper", icon: FileText },
  { label: "Books", kind: "book", icon: Library },
  { label: "Tools", kind: "tool", icon: Wrench },
];

export default function ResourcesHub() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");

  const filteredItems = curatedResources.filter((item) => {
    if (selectedCategory === "All") return true;
    const current = CATEGORIES.find((c) => c.label === selectedCategory);
    return current?.kind ? item.kind === current.kind : true;
  });

  return (
    <div style={{ marginTop: 24 }}>
      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter engineering library"
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 8,
          scrollbarWidth: "none",
          marginBottom: 20,
        }}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          const Icon = cat.icon;
          return (
            <button
              key={cat.label}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat.label)}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: "var(--fs-8)",
                fontFamily: "monospace",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                whiteSpace: "nowrap",
                border: isSelected
                  ? "1px solid var(--orange-yellow-crayola)"
                  : "1px solid hsla(0, 0%, 100%, 0.1)",
                background: isSelected
                  ? "hsla(45, 100%, 72%, 0.12)"
                  : "hsla(0, 0%, 10%, 0.6)",
                color: isSelected ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={12} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Engineering Reference Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: 16,
        }}
      >
        {filteredItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border-hover"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "20px 22px",
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
              textDecoration: "none",
              transition: "border-color 0.2s ease, transform 0.2s ease",
              gap: 12,
              height: "100%",
            }}
          >
            <div>
              {/* Kind & Topic badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: "var(--orange-yellow-crayola)",
                    background: "hsla(45, 100%, 72%, 0.1)",
                    border: "1px solid hsla(45, 100%, 72%, 0.2)",
                    padding: "2px 7px",
                    borderRadius: 4,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {item.kind}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    color: "var(--light-gray-70)",
                  }}
                >
                  · {item.topic}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  color: "var(--white-2)",
                  fontSize: "var(--fs-4)",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  margin: "0 0 6px",
                }}
              >
                {item.title}
              </h3>

              {/* Summary */}
              <p
                style={{
                  color: "var(--light-gray-70)",
                  fontSize: "var(--fs-7)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.summary}
              </p>
            </div>

            {/* Subtle Open link */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingTop: 10,
                borderTop: "1px solid hsla(0, 0%, 100%, 0.06)",
              }}
            >
              <span
                style={{
                  color: "var(--orange-yellow-crayola)",
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Open reference <ArrowUpRight size={13} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
