// Clean, minimal, matte, static CSS background.
// Zero JavaScript, zero motion values, zero RAF loops, pointer-events: none.
// Isolated on its own compositor layer with `contain: strict`.

export default function Background() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-dots" />
      <div className="bg-vignette" />
    </div>
  );
}
