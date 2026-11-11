import type { Work } from "@/lib/content";
import { FlowGraph } from "./FlowGraph";
import { LoopVideo } from "./LoopVideo";
import { Showcase } from "./Showcase";

/** A browser-like frame: traffic lights, address, and the real footage inside. */
export function Window({ work }: { work: Work }) {
  const m = work.media;
  return (
    <div>
      <div className="window-bar" aria-hidden>
        <span className="lights">
          <i />
          <i />
          <i />
        </span>
        <span className="window-url mono">{work.domain}</span>
      </div>
      <div
        className={m.kind === "video" ? "media" : m.kind === "graph" ? "media media-graph" : "media media-lx"}
        style={m.kind === "video" ? { aspectRatio: `${m.width} / ${m.height}` } : undefined}
      >
        {m.kind === "video" ? (
          <LoopVideo
            src={m.src}
            poster={m.poster}
            width={m.width}
            height={m.height}
            label={`Screen recording of ${work.name}`}
          />
        ) : m.kind === "showcase" ? (
          <Showcase />
        ) : (
          <FlowGraph label="A control-flow graph drawing itself, with one dynamic call marked as unproven" />
        )}
      </div>
    </div>
  );
}
