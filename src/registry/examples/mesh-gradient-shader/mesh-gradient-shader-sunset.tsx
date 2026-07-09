import MeshGradientShader from "@/registry/sonaui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderSunset() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#ff6b35", "#f7931e", "#ffcd3c", "#ff4e6a", "#c0392b"]}
      distortion={0.4}
      swirl={0.5}
    />
  );
}
