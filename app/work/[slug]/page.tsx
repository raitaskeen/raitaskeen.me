import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Panel } from "@/components/Panel";
import { Source } from "@/components/Source";
import { Window } from "@/components/Window";
import { work } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = work.find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: w.name,
    description: `${w.what}. ${w.body}`,
    openGraph: w.media.kind === "video" ? { images: [w.media.poster] } : undefined,
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const i = work.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const w = work[i];
  const prev = work[i - 1];
  const nextWork = work[i + 1];

  return (
    <div className="shell">
      <Panel isHome={false} />
      <main id="content" className="main">
        <article className="main-inner enter enter-2">
          <div style={{ padding: "0 8px" }}>
            <Link href="/" className="btn btn-glass btn-sm back" data-glow>
              <span>← All work</span>
            </Link>
            <h1 className="case-title">{w.name}</h1>
            <p className="case-what">{w.what}</p>
          </div>

          <div className="case-window glass" data-glow>
            <Window work={w} />
          </div>

          <div className="case-grid">
            <div className="card glass" data-reveal>
              <div className="prose">
                <p>{w.body}</p>
                <p>{w.role}</p>
              </div>
              {w.proofs.length > 0 && (
                <ul className="proofs">
                  {w.proofs.map((p) => (
                    <li key={p.text}>
                      <span>{p.text}</span>
                      <Source source={p.source} />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="card glass" data-reveal style={{ ["--delay" as string]: "90ms" }}>
              <dl className="facts">
                <dt>When</dt>
                <dd className="mono">{w.when}</dd>
                <dt>Stack</dt>
                <dd>
                  <ul className="chips">
                    {w.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
                <dt>Links</dt>
                <dd className="case-links">
                  {w.links.map((l, i) => (
                    <a
                      key={l.href}
                      className={`btn btn-sm ${i === 0 ? "btn-primary" : "btn-glass"}`}
                      data-glow
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{l.label} ↗</span>
                    </a>
                  ))}
                </dd>
              </dl>
            </aside>
          </div>

          <nav className="pager" aria-label="More work">
            {prev && (
              <Link href={`/work/${prev.slug}`} className="glass" data-glow>
                <span>Previous</span>
                <strong>{prev.name}</strong>
              </Link>
            )}
            {nextWork && (
              <Link href={`/work/${nextWork.slug}`} className="glass next" data-glow>
                <span>Next</span>
                <strong>{nextWork.name}</strong>
              </Link>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}
