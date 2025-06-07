import { type ComponentItemsPropsType } from "@/lib/types";

export const componentNavigationLinks: ComponentItemsPropsType[] = [
  {
    name: "Accordion",
    slug: "accordion",
    href: "/docs/accordion",
    type: "Components",
  },
  {
    name: "Ripple Button",
    slug: "rippleButton",
    href: "/docs/rippleButton",
    type: "Components",
  },
  {
    name: "Spinning Text",
    slug: "spinningText",
    href: "/docs/spinningText",
    type: "Text",
  },
  {
    name: "Stagger Text",
    slug: "staggerText",
    href: "/docs/staggerText",
    type: "Text",
  },
  {
    name: "Vertical Tab",
    slug: "verticalTab",
    href: "/docs/verticalTab",
    type: "Components",
  },
  {
    name: "Expandable Tabs",
    slug: "expandableTabs",
    href: "/docs/expandableTabs",
    type: "Components",
  },
  {
    name: "Magnetic Button",
    slug: "magneticButton",
    href: "/docs/magneticButton",
    type: "Effects",
  },
  {
    name: "Link Preview",
    slug: "linkPreview",
    href: "/docs/linkPreview",
    type: "Components",
  },
  {
    name: "Marquee",
    slug: "marquee",
    href: "/docs/marquee",
    type: "Effects",
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

