const starPath =
  "M344.584 105.51C344.584 294.33 496.457 447.678 684.711 450.062L689.163 450.094L684.711 450.121C496.457 452.505 344.584 605.854 344.584 794.673V900.189H344.579V794.673C344.579 604.367 190.306 450.094 0 450.094L4.45232 450.062C192.707 447.679 344.579 294.331 344.579 105.51V0H344.584V105.51Z";

// Expand the supplied viewport so the canvas, rather than the SVG, crops the star.
const starImage = `data:image/svg+xml,${encodeURIComponent(
  `<svg width="770" height="980" viewBox="-40 -40 770 980" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter></defs><path d="${starPath}" fill="#D9D9D9" opacity="0.3" filter="url(#glow)"/><path d="${starPath}" fill="#D9D9D9"/></svg>`,
)}`;

type SonaSocialImageProps = {
  description?: string;
  eyebrow?: string;
  title?: string;
};

export function SonaSocialImage({
  description = "Thoughtful interactions and visual effects, with source code you own.",
  eyebrow,
  title = "Well-crafted animated React components.",
}: SonaSocialImageProps = {}) {
  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#ffffff",
        display: "flex",
        fontFamily: "Helvetica Neue",
        fontWeight: 500,
        height: "100%",
        overflow: "hidden",
        padding: "80px",
        position: "relative",
        width: "100%",
      }}
    >
      {/* The supplied star extends beyond the bottom and right canvas edges. */}
      {/* biome-ignore lint/performance/noImgElement: ImageResponse renders embedded SVG assets directly. */}
      <img
        src={starImage}
        alt=""
        width={770}
        height={980}
        style={{ position: "absolute", left: 565, top: 25 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: 650,
        }}
      >
        <div
          style={{
            color: "#b5b5b5",
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.01em",
          }}
        >
          {eyebrow ? `Sona UI  /  ${eyebrow}` : "Sona UI"}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: title.length > 34 ? 50 : 62,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            marginTop: 44,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#b5b5b5",
            display: "flex",
            flexDirection: "column",
            fontSize: 23,
            lineHeight: 1.45,
            marginTop: 36,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
