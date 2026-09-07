export default function QuietMark() {
  return (
    <div
      style={{
        marginTop: 72,
        marginBottom: 28,
        textAlign: "center",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--ff-poppins), system-ui, -apple-system, sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.26em",
          color: "hsla(0, 0%, 100%, 0.22)",
          textTransform: "lowercase",
          display: "inline-block",
          transition: "color 0.2s ease",
        }}
      >
        raitaskeen
      </span>
    </div>
  );
}
