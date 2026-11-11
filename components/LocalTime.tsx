"use client";

import { useEffect, useState } from "react";
import { person } from "@/lib/content";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: person.timeZone,
});

/** Lahore local time, so visitors know when a reply is likely. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="clock">
      <span>Lahore</span>
      <span className="mono" style={{ minWidth: "5ch" }} suppressHydrationWarning>
        {now ?? "--:--"}
      </span>
      <span className="mono">PKT, UTC+5</span>
    </p>
  );
}
