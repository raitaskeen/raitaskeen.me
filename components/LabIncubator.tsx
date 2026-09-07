import { FlaskConical } from "lucide-react";

type LabProject = {
  title: string;
  problem: string;
  idea: string;
  priority?: boolean;
};

type Category = "AI & Agents" | "DevTools & Systems" | "Automation & Bots";

function getCategoryForProject(title: string): Category {
  switch (title) {
    case "StudyForge":
    case "LingoLoop":
    case "ReceiptWise":
    case "ResumeATS":
      return "AI & Agents";
    case "QueueLess":
    case "LocalGig":
    case "RentSplit":
      return "Automation & Bots";
    case "DevPulse":
    case "HabitStack":
    case "CodeReviewBot":
    case "PowerCutTracker":
    case "DevDocsAI":
    default:
      return "DevTools & Systems";
  }
}

export default function LabIncubator({ projects }: { projects: LabProject[] }) {
  const topFour = projects.slice(0, 4);

  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", display: "flex", alignItems: "center", gap: 10 }}>
          <FlaskConical size={20} color="var(--orange-yellow-crayola)" /> In The Lab (Building Toward)
        </h2>
        <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6, maxWidth: "65ch" }}>
          A research notebook of upcoming builds queued for GitHub. Items marked{" "}
          <span style={{ color: "var(--orange-yellow-crayola)", fontWeight: 600 }}>Priority</span> represent immediate implementation targets.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {topFour.map((p) => {
          const category = getCategoryForProject(p.title);
          return (
            <div
              key={p.title}
              className="gradient-border-hover"
              style={{
                padding: 22,
                position: "relative",
                border: p.priority ? "1px solid hsla(45,100%,72%,0.3)" : "1px solid hsla(0, 0%, 100%, 0.08)",
                background: "hsla(0, 0%, 9%, 0.88)",
                backdropFilter: "blur(14px)",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "hsla(0, 0%, 100%, 0.05)",
                    color: "var(--light-gray-70)",
                    letterSpacing: 0.5,
                  }}
                >
                  {category}
                </span>

                {p.priority && (
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "var(--smoky-black)",
                      background: "var(--orange-yellow-crayola)",
                      padding: "2px 8px",
                      borderRadius: 999,
                      letterSpacing: 0.5,
                      fontWeight: 600,
                    }}
                  >
                    PRIORITY
                  </span>
                )}
              </div>

              <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: 0 }}>{p.title}</h3>
              <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: "var(--orange-yellow-crayola)" }}>Problem: </strong>{p.problem}
              </p>
              <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-8)", lineHeight: 1.5, marginTop: "auto", margin: 0 }}>
                <strong style={{ color: "var(--orange-yellow-crayola)" }}>Hypothesis: </strong>{p.idea}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
