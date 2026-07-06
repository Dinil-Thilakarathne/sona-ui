import DotOrbitShader from "@/registry/sonaui/dot-orbit-shader/dot-orbit-shader";

export default function DotOrbitShaderDense() {
  return (
    <DotOrbitShader
      className="h-64 lg:h-72 w-full"
      colorBack="#0a0a0a"
      colors={["#ff0080", "#7928ca", "#0070f3", "#00dfd8"]}
      size={0.5}
      sizeRange={0.1}
      spreading={0.3}
      stepsPerColor={3}
    />
  );
}
