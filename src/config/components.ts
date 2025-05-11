import { ComponentItemsProps } from "@/lib/types";

export const componentNavigationLinks: ComponentItemsProps[] = [
  {
    name: "Accordion",
    tag: "updated",
    slug: "accordion",
    href: "/docs/accordion",
  },
  {
    name: "Ripple Button",
    slug: "rippleButton",
    href: "/docs/rippleButton",
  },
  {
    name: "Spinning Text",
    slug: "spinningText",
    href: "/docs/spinningText",
  },
  {
    name: "Stagger Text",
    slug: "staggerText",
    href: "/docs/staggerText",
  },
  {
    name: "Vertical Tab",
    slug: "verticalTab",
    href: "/docs/verticalTab",
  },
  {
    name: "Expandable Tabs",
    slug: "expandableTabs",
    href: "/docs/expandableTabs",
  },
  {
    name: "Magnetic Button",
    tag: "new",
    slug: "magneticButton",
    href: "/docs/magneticButton",
  },
  {
    name: "Link Preview",
    tag: "new",
    slug: "linkPreview",
    href: "/docs/linkPreview",
  },
];

export const sortedComponentNavigationLinks = componentNavigationLinks.sort((a, b) => {
  return a.name.localeCompare(b.name);
});
