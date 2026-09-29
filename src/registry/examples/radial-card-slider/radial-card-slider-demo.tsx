import RadialCardSlider from "@/registry/sonaui/radial-card-slider/radial-card-slider";

const items = [
  { label: "Tropical", alt: "Orange tropical drink", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85" },
  { label: "Leaf", alt: "Leaf seen from below", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85" },
  { label: "Dubai", alt: "Dubai street with palm trees", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85" },
  { label: "Yogal", alt: "Bright outdoor scene", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=85" },
  { label: "Radial", alt: "Warm architectural detail", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85" },
];

export default function RadialCardSliderDemo() {
  return <RadialCardSlider items={items} />;
}
