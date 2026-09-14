export default function ContactSignature() {
  return (
    <section
      aria-label="raitaskeen Signature Identity"
      style={{
        marginTop: 64,
        paddingTop: 32,
        paddingBottom: 24,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "clamp(55px, 15.5vw, 184px)",
          fontWeight: 700,
          fontFamily: "var(--font-poppins), 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
          letterSpacing: "clamp(-0.01em, 0.15vw, 0.01em)",
          lineHeight: 0.95,
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "1.4px hsla(45, 100%, 72%, 0.85)",
          maskImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 28%, rgba(0, 0, 0, 0.15) 60%, rgba(0, 0, 0, 0) 85%)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 28%, rgba(0, 0, 0, 0.15) 60%, rgba(0, 0, 0, 0) 85%)",
          whiteSpace: "nowrap",
          cursor: "default",
          textTransform: "lowercase",
          maxWidth: "100%",
          padding: "0 8px",
          display: "inline-block",
        }}
      >
        raitaskeen
      </span>
    </section>
  );
}
