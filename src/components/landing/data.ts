export type LandingCategory = "Interface" | "Text" | "Effects" | "Shaders";

export type LandingComponent = {
  name: string;
  slug: string;
  category: LandingCategory;
  description: string;
  preview:
    | "tabs"
    | "dialog"
    | "dropdown"
    | "switch"
    | "text"
    | "effect"
    | "shader";
  featured?: boolean;
};

export const landingComponents: LandingComponent[] = [
  {
    name: "Fluid Tabs",
    slug: "fluid-tabs",
    category: "Interface",
    description: "A shared-layout tab system with a physical active state.",
    preview: "tabs",
    featured: true,
  },
  {
    name: "Animated Dialog",
    slug: "animated-dialog",
    category: "Interface",
    description: "Directional dialog transitions that respect their trigger.",
    preview: "dialog",
    featured: true,
  },
  {
    name: "Animated Dropdown",
    slug: "animated-dropdown",
    category: "Interface",
    description: "A menu primitive with composed, origin-aware motion.",
    preview: "dropdown",
    featured: true,
  },
  {
    name: "Animated Switch",
    slug: "animated-switch",
    category: "Interface",
    description: "Tactile state feedback with a compact API.",
    preview: "switch",
  },
  {
    name: "Button",
    slug: "button",
    category: "Interface",
    description: "A focused button primitive for clear product actions.",
    preview: "switch",
    featured: true,
  },
  {
    name: "Accordion",
    slug: "accordion",
    category: "Interface",
    description: "Expandable content with considered disclosure states.",
    preview: "dropdown",
  },
  {
    name: "Animated Tabs",
    slug: "animated-tabs",
    category: "Interface",
    description: "Tabs with a compact animated selection treatment.",
    preview: "tabs",
  },
  {
    name: "Link Preview",
    slug: "link-preview",
    category: "Interface",
    description: "Rich link context that appears at the moment it helps.",
    preview: "dialog",
  },
  {
    name: "Expandable Tabs",
    slug: "expandable-tabs",
    category: "Interface",
    description: "Navigation that expands around the active intent.",
    preview: "tabs",
  },
  {
    name: "Ripple Button",
    slug: "ripple-button",
    category: "Interface",
    description: "Pointer feedback that makes a press feel immediate.",
    preview: "switch",
  },
  {
    name: "Bubble Up Button",
    slug: "bubble-up-button",
    category: "Interface",
    description: "A compact button treatment with a lively surface response.",
    preview: "switch",
  },
  {
    name: "Hold To Delete Button",
    slug: "hold-to-delete-button",
    category: "Interface",
    description:
      "A deliberate confirmation interaction for destructive actions.",
    preview: "switch",
  },
  {
    name: "Stagger Text",
    slug: "stagger-text",
    category: "Text",
    description: "Sequential text reveals for moments that need emphasis.",
    preview: "text",
  },
  {
    name: "Split Text",
    slug: "split-text",
    category: "Text",
    description: "Line and word-level text animation with clear control.",
    preview: "text",
    featured: true,
  },
  {
    name: "Spinning Text",
    slug: "spinning-text",
    category: "Text",
    description: "Circular typography for bounded expressive moments.",
    preview: "text",
  },
  {
    name: "Magnetic",
    slug: "magnetic-button",
    category: "Effects",
    description: "A motion wrapper that gives child controls a magnetic pull.",
    preview: "effect",
  },
  {
    name: "Marquee",
    slug: "marquee",
    category: "Effects",
    description: "A flexible scrolling track for bounded repeated content.",
    preview: "effect",
  },
  {
    name: "Image Trail",
    slug: "image-trail",
    category: "Effects",
    description: "Pointer-driven image motion for editorial interactions.",
    preview: "effect",
    featured: true,
  },
  {
    name: "Spotlight Card",
    slug: "spotlight-card",
    category: "Effects",
    description: "A focused surface treatment that follows attention.",
    preview: "effect",
  },
  {
    name: "Fan View",
    slug: "fan-view",
    category: "Effects",
    description: "A layered spatial arrangement for visual collections.",
    preview: "effect",
  },
  {
    name: "Circular Dock Menu",
    slug: "circular-dock-menu",
    category: "Effects",
    description: "A radial action surface with a deliberate interaction model.",
    preview: "effect",
  },
  {
    name: "Mesh Gradient",
    slug: "mesh-gradient-shader",
    category: "Shaders",
    description: "A configurable mesh field for bounded visual atmosphere.",
    preview: "shader",
  },
  {
    name: "Dot Orbit",
    slug: "dot-orbit-shader",
    category: "Shaders",
    description: "An orbital dot field with a static and reduced-motion path.",
    preview: "shader",
  },
];

export const featuredComponents = landingComponents.filter(
  (component) => component.featured,
);

export const landingCategories: Array<LandingCategory | "All"> = [
  "All",
  "Interface",
  "Text",
  "Effects",
  "Shaders",
];
