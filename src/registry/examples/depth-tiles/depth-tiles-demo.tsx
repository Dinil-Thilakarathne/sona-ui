import DepthTiles from "@/registry/sonaui/depth-tiles/depth-tiles";

const items = [
  {
    id: "doodle",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85",
    alt: "Green leaf with soft natural light",
    label: "320 / Doodle",
  },
  {
    id: "edges",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
    alt: "Abstract architectural texture",
    label: "902 / Edges",
  },
  {
    id: "material",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    alt: "Soft green landscape",
    label: "114 / Material",
  },
];

export default function DepthTilesDemo() {
  return <DepthTiles items={items} />;
}
