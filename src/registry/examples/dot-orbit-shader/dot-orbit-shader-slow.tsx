import DotOrbitShader from "@/registry/sonaui/dot-orbit-shader/dot-orbit-shader";

export default function DotOrbitShaderSlow() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#111827"
      colors={["#34d399", "#059669", "#065f46"]}
      size={0.45}
      sizeRange={0.5}
      spreading={0.8}
      speed={0.2}
    />
  );
}
