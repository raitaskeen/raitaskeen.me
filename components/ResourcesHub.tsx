"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookMarked,
  Compass,
  FileText,
  Library,
  Terminal,
  Cpu,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { curatedResources } from "@/lib/data";
import SectionHeading from "@/components/motion/SectionHeading";

type FilterCategory =
  | "All"
  | "Roadmaps"
  | "Foundational Papers"
  | "Systems Books"
  | "Compiler References"
  | "AI Engineering"
  | "Developer Tools";

const CATEGORIES: { label: FilterCategory; icon: LucideIcon }[] = [
  { label: "All", icon: Compass },
  { label: "Roadmaps", icon: BookMarked },
  { label: "Foundational Papers", icon: FileText },
  { label: "Systems Books", icon: Library },
  { label: "Compiler References", icon: Terminal },
  { label: "AI Engineering", icon: Cpu },
  { label: "Developer Tools", icon: Wrench },
];

export default function ResourcesHub() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");

  const filteredItems = curatedResources.filter((item) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Roadmaps") return item.category === "Roadmaps";
    if (selectedCategory === "Foundational Papers") return item.category === "Foundational Papers";
    if (selectedCategory === "Systems Books") return item.category === "Systems Books";
    if (selectedCategory === "Developer Tools") return item.category === "Developer Tools";
    if (selectedCategory === "Compiler References") {
      return (
        item.id === "paper-treesitter" ||
        item.id === "book-crafting-interpreters" ||
        item.id === "rm-rust"
      );
    }
    if (selectedCategory === "AI Engineering") {
      return (
        item.id === "rm-ai" ||
        item.id === "paper-transformer" ||
        item.id === "paper-react"
      );
    }
    return true;
  });

  return (
    <section style={{ marginTop: 40 }} aria-label="01 Engineering References">
      <SectionHeading index="01" title="Engineering References" />
      <div style={{ marginTop: -14, marginBottom: 20 }}>
        <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", margin: 0 }}>
          Curated archive of foundational compiler &amp; AI papers, systems roadmaps, and developer tooling.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Resource categories"
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 6,
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          const Icon = cat.icon;
          return (
            <button
              key={cat.label}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat.label)}
              style={{
                padding: "7px 14px",
                borderRadius: 6,
                fontSize: "var(--fs-8)",
                fontFamily: "monospace",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                cursor: "pointer",
                whiteSpace: "nowrap",
                border: isSelected
                  ? "1px solid var(--orange-yellow-crayola)"
                  : "1px solid hsla(0, 0%, 100%, 0.1)",
                background: isSelected
                  ? "hsla(45, 100%, 72%, 0.14)"
                  : "hsla(0, 0%, 10%, 0.6)",
                color: isSelected ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={13} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Curated Engineering Shelf Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {filteredItems.map((item, index) => {
          const typeLabel =
            item.category === "Foundational Papers"
              ? "Paper"
              : item.category === "Systems Books"
              ? "Book"
              : item.category === "Developer Tools"
              ? "Tool"
              : "Roadmap";

          const actionLabel =
            item.category === "Foundational Papers"
              ? "READ PAPER"
              : item.category === "Systems Books"
              ? "VIEW BOOK"
              : item.category === "Developer Tools"
              ? "EXPLORE TOOL"
              : "OPEN ROADMAP";

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="gradient-border-hover"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px 22px",
                borderRadius: 12,
                background: "hsla(0, 0%, 9%, 0.88)",
                backdropFilter: "blur(14px)",
                border: "1px solid hsla(0, 0%, 100%, 0.08)",
                textDecoration: "none",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                gap: 14,
              }}
            >
              <div>
                {/* Index + Type marker */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)", letterSpacing: "0.08em" }}>
                    #{String(index + 1).padStart(2, "0")}
                  </span>
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
                    }}
                  >
                    {typeLabel}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    color: "var(--white-2)",
                    fontSize: "var(--fs-4)",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>

                {/* One Short Description (Strict Spec requirement) */}
                <p
                  style={{
                    color: "var(--light-gray-70)",
                    fontSize: "var(--fs-7)",
                    lineHeight: 1.6,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  {item.summary}
                </p>
              </div>

              {/* Direct Open Link */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  borderTop: "1px solid hsla(0, 0%, 100%, 0.06)",
                }}
              >
                <span
                  style={{
                    color: "var(--orange-yellow-crayola)",
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {actionLabel} <ArrowUpRight size={13} />
                </span>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)" }}>
                  {item.tag}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
