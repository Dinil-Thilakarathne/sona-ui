import { type ComponentItemsPropsType } from "@/lib/types";

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
    name: "CLI",
    slug: "cli",
    href: "/docs/cli",
    type: "Getting Started",
  },
  {
    name: "Changelog",
    slug: "changelog",
    href: "/docs/changelog",
    type: "Getting Started",
  },
  {
    name: "Accordion",
    slug: "accordion",
    href: "/docs/accordion",
    type: "Components",
  },
  {
    name: "Ripple Button",
    slug: "ripple-button",
    href: "/docs/ripple-button",
    type: "Components",
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
    name: "Vertical Tab",
    slug: "vertical-tab",
    href: "/docs/vertical-tab",
    type: "Components",
  },
  {
    name: "Expandable Tabs",
    slug: "expandable-tabs",
    href: "/docs/expandable-tabs",
    type: "Components",
  },
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    href: "/docs/magnetic-button",
    type: "Effects",
  },
  {
    name: "Link Preview",
    slug: "link-preview",
    href: "/docs/link-preview",
    type: "Components",
  },
  {
    name: "Marquee",
    slug: "marquee",
    href: "/docs/marquee",
    type: "Effects",
  },
  {
    name: "Bubble Up Button",
    slug: "bubble-up-button",
    href: "/docs/bubble-up-button",
    type: "Components",
  },
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
