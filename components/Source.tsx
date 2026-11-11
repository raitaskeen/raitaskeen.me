import type { Link } from "@/lib/content";

/** Signature detail: every hard claim carries a quiet link to where it can be checked. */
export function Source({ source }: { source: Link }) {
  return (
    <a
      className="source"
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Source: ${source.label}`}
    >
      source ↗
    </a>
  );
}
