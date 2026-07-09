import MeshGradientShader from "@/registry/sonaui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderMonochrome() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#111111", "#333333", "#555555", "#888888", "#cccccc"]}
      distortion={0.6}
      swirl={0.3}
      grainOverlay={0.15}
    />
  );
}
