import DotOrbitShader from "@/registry/sonaui/dot-orbit-shader/dot-orbit-shader";

export default function DotOrbitShaderPastel() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#fdf6f0"
      colors={["#f9a8d4", "#a5f3fc", "#bbf7d0", "#fde68a", "#ddd6fe"]}
      size={0.35}
      sizeRange={0.4}
      spreading={0.6}
    />
  );
}
