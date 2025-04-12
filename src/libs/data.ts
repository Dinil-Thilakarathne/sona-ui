import { ComponentItemsProps, navLinksProps } from "./types";


export const navLinks: navLinksProps[] = [
  { name: "Docs", href: "/docs", tag: "soon" },
  { name: "Components", href: "/components" },
];

export const ComponentSidebarItems: ComponentItemsProps[] = [
  {
    name: "Accordion",
    href: "/components/accordion",
    tag: "new",
    featured: true,
    imgSrc: "/components/accordion/img.png",
    imgAlt: "Accordion",
  },
  { name: "Ripple Button", href: "/components/rippleButton", tag: "soon" },
];
