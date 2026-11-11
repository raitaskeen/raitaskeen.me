import Image from "next/image";
import Link from "next/link";
import { intro, person } from "@/lib/content";
import { LocalTime } from "./LocalTime";

/** The identity panel: who, what, one primary action, one secondary. Sticky glass on desktop. */
export function Panel({ isHome }: { isHome: boolean }) {
  const Headline = isHome ? "h1" : "p";
  return (
    <>
      <header id="panel" className="panel glass">
        <Link href="/" className="who enter" aria-label={`${person.name}, home`}>
          <Image className="avatar" src="/avatar.png" alt="" width={48} height={48} priority />
          <span>
            <span className="who-name">{person.name}</span>
            <span className="status">
              <span className="dot" aria-hidden />
              Open for projects
            </span>
          </span>
        </Link>

        <div className="panel-main enter">
          <Headline className="headline">{person.headline}</Headline>
          <p className="lede">{intro}</p>
          <div className="actions">
            <a className="btn btn-primary" data-glow href={person.call} target="_blank" rel="noopener noreferrer">
              <span>Book a call</span>
            </a>
            <a className="btn btn-glass" data-glow href={person.resume} download>
              <span>Résumé</span>
            </a>
          </div>
        </div>

        <div className="panel-foot">
          <ul className="socials">
            {person.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="me noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LocalTime />
        </div>
      </header>

      <div id="topbar" className="topbar glass" aria-hidden>
        <Link href="/" className="who" tabIndex={-1}>
          <Image className="avatar" src="/avatar.png" alt="" width={36} height={36} />
          {person.name}
        </Link>
        <a className="btn btn-primary btn-sm" href={person.call} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
          <span>Book a call</span>
        </a>
      </div>
    </>
  );
}
