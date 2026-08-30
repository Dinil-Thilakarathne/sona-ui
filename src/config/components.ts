import type { ComponentItemsPropsType } from "@/lib/types";

export const componentNavigationLinks: ComponentItemsPropsType[] = [
  {
    name: "Installation",
    slug: "installation",
    href: "/docs/installation",
    type: "Getting Started",
  },
  {
    name: "Theming",
    slug: "theming",
    href: "/docs/theming",
    type: "Getting Started",
  },
  {
    name: "Changelog",
    slug: "changelog",
    href: "/docs/changelog",
    type: "Getting Started",
  },
  {
    name: "AI agents",
    slug: "ai-agents",
    href: "/docs/ai-agents",
    type: "Getting Started",
    tag: "new",
  },
  {
    name: "Skills",
    slug: "skills",
    href: "/docs/skills",
    type: "Getting Started",
    tag: "new",
  },
  {
    name: "Animated Dropdown",
    slug: "animated-dropdown",
    href: "/docs/animated-dropdown",
    type: "Navigation & Disclosure",
    tag: "new",
  },
  {
    name: "Animated Switch",
    slug: "animated-switch",
    href: "/docs/animated-switch",
    type: "Actions & Inputs",
    tag: "new",
  },
  {
    name: "Animated Dialog",
    slug: "animated-dialog",
    href: "/docs/animated-dialog",
    type: "Navigation & Disclosure",
    tag: "new",
  },
  // {
  //   name: "Lightbox",
  //   slug: "lightbox",
  //   href: "/docs/lightbox",
  //   type: "Components",
  //   tag: "new",
  // },
  // {
  //   name: "Avatar Showcase",
  //   slug: "avatar-showcase",
  //   href: "/docs/avatar-showcase",
  //   type: "Motion",
  //   tag: "new",
  // },
  {
    name: "Button",
    slug: "button",
    href: "/docs/button",
    type: "Actions & Inputs",
    tag: "new",
  },
  {
    name: "Expanding Action",
    slug: "expanding-action",
    href: "/docs/expanding-action",
    type: "Actions & Inputs",
    tag: "new",
  },
  {
    name: "Accordion",
    slug: "accordion",
    href: "/docs/accordion",
    type: "Navigation & Disclosure",
  },
  {
    name: "Ripple Button",
    slug: "ripple-button",
    href: "/docs/ripple-button",
    type: "Actions & Inputs",
  },
  {
    name: "Spinning Text",
    slug: "spinning-text",
    href: "/docs/spinning-text",
    type: "Text",
  },
  {
    name: "Stagger Text",
    slug: "stagger-text",
    href: "/docs/stagger-text",
    type: "Text",
  },
  {
    name: "Split Text",
    slug: "split-text",
    href: "/docs/split-text",
    type: "Text",
    tag: "new",
  },
  {
    name: "Fluid Tabs",
    slug: "fluid-tabs",
    href: "/docs/fluid-tabs",
    type: "Navigation & Disclosure",
    tag: "new",
  },
  {
    name: "Fluid Tooltip",
    slug: "fluid-tooltip",
    href: "/docs/fluid-tooltip",
    type: "Navigation & Disclosure",
    tag: "new",
  },
  {
    name: "Fluid Slider",
    slug: "fluid-slider",
    href: "/docs/fluid-slider",
    type: "Actions & Inputs",
    tag: "new",
  },
  // {
  //   name: "Activity Graph",
  //   slug: "activity-graph",
  //   href: "/docs/activity-graph",
  //   type: "Components",
  //   tag: "new",
  // },
  // {
  //   name: "Animated Tabs",
  //   slug: "animated-tabs",
  //   href: "/docs/animated-tabs",
  //   type: "Components",
  // },
  // {
  //   name: "Section Rail",
  //   slug: "section-rail",
  //   href: "/docs/section-rail",
  //   type: "Components",
  //   tag: "new",
  // },
  // {
  //   name: "Expandable Tabs",
  //   slug: "expandable-tabs",
  //   href: "/docs/expandable-tabs",
  //   type: "Components",
  // },
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    href: "/docs/magnetic-button",
    type: "Motion",
  },
  // {
  //   name: "Link Preview",
  //   slug: "link-preview",
  //   href: "/docs/link-preview",
  //   type: "Components",
  // },
  {
    name: "Marquee",
    slug: "marquee",
    href: "/docs/marquee",
    type: "Motion",
    tag: "updated",
  },
  {
    name: "Bubble Up Button",
    slug: "bubble-up-button",
    href: "/docs/bubble-up-button",
    type: "Actions & Inputs",
  },
  // {
  //   name: "Spotlight Card",
  //   slug: "spotlight-card",
  //   href: "/docs/spotlight-card",
  //   type: "Components",
  // },
  {
    name: "Image Trail",
    slug: "image-trail",
    href: "/docs/image-trail",
    type: "Motion",
    tag: "new",
  },
  {
    name: "Hold To Delete Button",
    slug: "hold-to-delete-button",
    href: "/docs/hold-to-delete-button",
    type: "Actions & Inputs",
  },
  // {
  //   name: "Circular Dock Menu",
  //   slug: "circular-dock-menu",
  //   href: "/docs/circular-dock-menu",
  //   type: "Components",
  // },
  // {
  //   name: "Fan View",
  //   slug: "fan-view",
  //   href: "/docs/fan-view",
  //   type: "Components",
  // },
  // {
  //   name: "Mesh Gradient",
  //   slug: "mesh-gradient-shader",
  //   href: "/docs/mesh-gradient-shader",
  //   type: "Shaders",
  // },
  // {
  //   name: "Dot Orbit",
  //   slug: "dot-orbit-shader",
  //   href: "/docs/dot-orbit-shader",
  //   type: "Shaders",
  // },
];

export const groupedComponents = componentNavigationLinks.reduce<
  Record<string, ComponentItemsPropsType[]>
>((acc, item) => {
  if (!acc[item.type]) {
    acc[item.type] = [];
  }
  acc[item.type].push(item);
  return acc;
}, {});
