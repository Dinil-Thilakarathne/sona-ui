const ink = "#111113";
const muted = "#71717a";
const line = "#e4e4e7";
const surface = "#fafafa";

function SonaMark() {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: 14,
      }}
    >
      <span
        style={{
          color: ink,
          fontSize: 27,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        Sona UI
      </span>
    </div>
  );
}

function InteractionPreview() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.92)",
        border: `1px solid ${line}`,
        borderRadius: 30,
        boxShadow: "0 24px 60px rgba(24,24,27,0.15)",
        display: "flex",
        flexDirection: "column",
        height: 410,
        padding: 22,
        transform: "rotate(-3deg)",
        width: 390,
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: "#f4f4f5",
          borderRadius: 17,
          display: "flex",
          height: 54,
          justifyContent: "space-between",
          padding: "0 18px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
          <div
            style={{
              background: "#a78bfa",
              borderRadius: 999,
              height: 16,
              width: 16,
            }}
          />
          <div
            style={{
              background: "#d4d4d8",
              borderRadius: 999,
              height: 11,
              width: 90,
            }}
          />
        </div>
        <div
          style={{
            alignItems: "center",
            background: ink,
            borderRadius: 999,
            display: "flex",
            height: 28,
            justifyContent: "flex-end",
            padding: 4,
            width: 58,
          }}
        >
          <div
            style={{
              background: surface,
              borderRadius: 999,
              height: 20,
              width: 20,
            }}
          />
        </div>
      </div>

      <div
        style={{
          color: muted,
          display: "flex",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.12em",
          margin: "38px 6px 14px",
          textTransform: "uppercase",
        }}
      >
        Fluid tabs
      </div>

      <div
        style={{
          alignItems: "center",
          background: "#f4f4f5",
          borderRadius: 22,
          display: "flex",
          height: 66,
          padding: 6,
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: ink,
            borderRadius: 17,
            color: surface,
            display: "flex",
            fontSize: 14,
            fontWeight: 700,
            height: 54,
            justifyContent: "center",
            width: 104,
          }}
        >
          Preview
        </div>
        <div
          style={{
            color: "#52525b",
            display: "flex",
            fontSize: 14,
            fontWeight: 500,
            justifyContent: "center",
            width: 108,
          }}
        >
          Code
        </div>
        <div
          style={{
            color: "#52525b",
            display: "flex",
            fontSize: 14,
            fontWeight: 500,
            justifyContent: "center",
            width: 108,
          }}
        >
          Install
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          background: ink,
          borderRadius: 24,
          display: "flex",
          flex: 1,
          justifyContent: "center",
          marginTop: 24,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at 70% 30%, #f9a8d4 0, transparent 46%), radial-gradient(circle at 28% 72%, #67e8f9 0, transparent 48%), #c4b5fd",
            borderRadius: 999,
            display: "flex",
            height: 112,
            opacity: 0.95,
            width: 112,
          }}
        />
        <div
          style={{
            alignItems: "center",
            background: "rgba(17,17,19,0.76)",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: 999,
            color: surface,
            display: "flex",
            fontSize: 30,
            fontWeight: 400,
            height: 60,
            justifyContent: "center",
            left: 143,
            position: "absolute",
            top: 44,
            width: 60,
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}

export function SonaSocialImage() {
  return (
    <div
      style={{
        background: surface,
        color: ink,
        display: "flex",
        fontFamily: "Helvetica Neue",
        height: "100%",
        overflow: "hidden",
        padding: "58px 64px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background:
            "radial-gradient(circle at 78% 42%, rgba(196,181,253,0.82) 0, rgba(103,232,249,0.36) 34%, rgba(250,250,250,0) 68%)",
          bottom: 0,
          display: "flex",
          left: 500,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
      <div
        style={{
          background:
            "radial-gradient(circle at 85% 12%, rgba(249,168,212,0.48) 0, rgba(250,250,250,0) 44%)",
          bottom: 0,
          display: "flex",
          left: 660,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          position: "relative",
          width: 650,
        }}
      >
        <SonaMark />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              fontWeight: 500,
              letterSpacing: "-0.055em",
              lineHeight: 0.98,
            }}
          >
            <span>Beautiful interactions,</span>
            <span>owned by your codebase.</span>
          </div>
          <div
            style={{
              color: "#52525b",
              display: "flex",
              fontSize: 20,
              lineHeight: 1.45,
              marginTop: 30,
              maxWidth: 590,
            }}
          >
            Carefully engineered React components, motion primitives, and visual
            effects installed directly into your project.
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: 10,
              marginTop: 30,
            }}
          >
            {["React components", "Motion primitives", "Source-owned"].map(
              (label, index) => (
                <div
                  key={label}
                  style={{
                    background: index === 0 ? ink : "rgba(250,250,250,0.72)",
                    border: index === 0 ? "none" : "1px solid #d4d4d8",
                    borderRadius: 999,
                    color: index === 0 ? surface : ink,
                    display: "flex",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "10px 15px",
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            color: muted,
            display: "flex",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          sona-ui.vercel.app
        </div>
      </div>

      <div
        style={{
          border: "1px solid rgba(24,24,27,0.1)",
          borderRadius: 30,
          bottom: 0,
          display: "flex",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
    </div>
  );
}
