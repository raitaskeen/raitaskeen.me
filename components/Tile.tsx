import Link from "next/link";
import type { Work } from "@/lib/content";
import { Source } from "./Source";
import { Window } from "./Window";

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tile({ work, wide, index }: { work: Work; wide?: boolean; index: number }) {
  const proof = work.figure && work.proofs[0];
  return (
    <article
      className={`tile-card glass${wide ? " tile-wide" : ""}`}
      data-glow
      data-reveal
      style={{ ["--delay" as string]: `${(index % 2) * 90}ms` }}
    >
      <Link href={`/work/${work.slug}`} className="tile" aria-label={`${work.name}: ${work.what}. Read the case study`}>
        <Window work={work} />
        <div className="tile-meta">
          <div>
            <h3 className="tile-name">{work.name}</h3>
            <p className="tile-what">{work.what}</p>
          </div>
          <span className="tile-go" aria-hidden>
            <Arrow />
          </span>
        </div>
      </Link>
      <div className="tile-foot mono">
        {work.figure && proof ? (
          <p className="figure">
            <span>
              <strong>{work.figure.value}</strong> {work.figure.label}
            </span>
            <Source source={proof.source} />
          </p>
        ) : (
          <span>{work.stack.slice(0, 3).join(" · ")}</span>
        )}
        <span>{work.when}</span>
      </div>
    </article>
  );
}
