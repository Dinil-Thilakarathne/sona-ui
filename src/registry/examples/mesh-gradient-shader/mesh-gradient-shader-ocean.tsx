import MeshGradientShader from "@/registry/sonaui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderOcean() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#006994", "#0099cc", "#00b4d8", "#48cae4", "#90e0ef"]}
      distortion={0.5}
      swirl={0.1}
    />
  );
}
