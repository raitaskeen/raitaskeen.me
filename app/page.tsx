import { Panel } from "@/components/Panel";
import { Tile } from "@/components/Tile";
import { education, experience, next, openSource, person, research, work } from "@/lib/content";

export default function Home() {
  return (
    <div className="shell">
      <Panel isHome />
      <main id="content" className="main">
        <div className="main-inner">
          <div className="wall-head enter enter-2">
            <h2 className="eyebrow">Selected work</h2>
            <span className="section-note mono">{String(work.length).padStart(2, "0")} projects</span>
          </div>
          <div className="wall enter enter-2">
            {work.map((w, i) => (
              <Tile key={w.slug} index={i} work={w} wide={i === 0 || i === work.length - 1} />
            ))}
          </div>

          <section className="section card glass" data-reveal aria-labelledby="experience">
            <div className="section-head">
              <h2 id="experience" className="section-title">
                Experience
              </h2>
              <span className="section-note mono">3+ years professional</span>
            </div>
            <ol className="rows">
              {experience.map((e) => (
                <li key={e.org}>
                  <p className="row-title">
                    {e.role} <span>· {e.org}</span>
                  </p>
                  <p className="row-when mono">{e.when}</p>
                  <p className="row-note">{e.note}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="two-col">
            <section className="section card glass" data-reveal aria-labelledby="research">
              <div className="section-head">
                <h2 id="research" className="section-title">
                  Research
                </h2>
              </div>
              <ul className="plain-list">
                {research.map((r) => (
                  <li key={r}>{r}</li>
                ))}
                <li>
                  <strong>{next.name}</strong> · {next.what}
                </li>
              </ul>
            </section>

            <section
              className="section card glass"
              data-reveal
              style={{ ["--delay" as string]: "90ms" }}
              aria-labelledby="open-source"
            >
              <div className="section-head">
                <h2 id="open-source" className="section-title">
                  Open source
                </h2>
              </div>
              <ul className="plain-list">
                {openSource.map((o) => (
                  <li key={o.href} className="link-row">
                    <span>
                      <strong>{o.name}</strong> · {o.detail}
                    </span>
                    <a
                      className="source"
                      href={o.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source: ${o.name} pull request`}
                    >
                      source ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="section card glass" data-reveal aria-labelledby="education">
            <div className="section-head">
              <h2 id="education" className="section-title">
                Education
              </h2>
            </div>
            <ul className="rows">
              <li>
                <p className="row-title">
                  {education.degree} <span>· {education.school}</span>
                </p>
                <p className="row-when mono">{education.when}</p>
                <p className="row-note">{education.languages}</p>
              </li>
            </ul>
          </section>

          <section id="contact" className="contact glass" data-reveal aria-labelledby="contact-title">
            <span className="warm" aria-hidden />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 id="contact-title" className="headline">
                Websites, web apps and JS/TS codebase audits, for teams anywhere
              </h2>
              <div className="actions">
                <a className="btn btn-primary" data-glow href={person.call} target="_blank" rel="noopener noreferrer">
                  <span>Book a call</span>
                </a>
                <a className="btn btn-glass" data-glow href={`mailto:${person.email}`}>
                  <span>Email me</span>
                </a>
              </div>
              <a className="contact-email mono text-link" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </div>
          </section>

          <footer className="site-foot">
            <span>© 2026 {person.name}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
