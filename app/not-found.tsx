import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell" style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 style={{ color: "var(--white-2)", fontSize: "var(--fs-1)" }}>404 - Page Not Found</h1>
      <p style={{ color: "var(--light-gray-70)", marginTop: 12 }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="link-draw"
        style={{ color: "var(--orange-yellow-crayola)", display: "inline-block", marginTop: 24 }}
      >
        Return Home
      </Link>
    </div>
  );
}
