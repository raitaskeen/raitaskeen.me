import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="main" style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p className="mono" style={{ color: "var(--text-3)" }}>
          404 · no edge to this node
        </p>
        <h1 className="headline" style={{ marginTop: 12 }}>
          This page doesn&apos;t exist
        </h1>
        <div className="actions" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/">
            Back to the work
          </Link>
        </div>
      </div>
    </main>
  );
}
