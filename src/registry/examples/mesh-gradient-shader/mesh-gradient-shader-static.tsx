import MeshGradientShader from "@/registry/sonaui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderStatic() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#a855f7", "#6366f1", "#3b82f6", "#06b6d4", "#10b981"]}
      distortion={0.2}
      swirl={0.05}
      speed={0}
    />
  );
}
