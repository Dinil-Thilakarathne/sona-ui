import { ComponentItemsProps, navLinksProps } from "./types";

export const navLinks: navLinksProps[] = [
  { name: "Docs", href: "/docs", tag: "soon" },
  { name: "Components", href: "/components" },
  {
    name: "Feedback",
    href: "https://sonacode.notion.site/1d8b84f1ce5580f38f30ec04e9db9d78?pvs=105",
  },
];

export const ComponentItems: ComponentItemsProps[] = [
  {
    name: "Accordion",
    href: "/components/accordion",
    tag: undefined,
    featured: true,
    imgSrc: "/components/accordion/img.png",
    imgAlt: "Accordion",
    metadata: {
      title: "Accordion Component - Sona UI",
      description: "A flexible and accessible accordion component for React.",
      keywords: ["Accordion", "React", "UI Component", "Sona UI"],
      openGraphImage: "/components/accordion/img.png",
    },
  },
  {
    name: "Ripple Button",
    href: "/components/rippleButton",
    tag: undefined,
    featured: true,
    imgSrc: "/components/rippleButton/img.png",
    imgAlt: "Ripple Button",
    metadata: {
      title: "Ripple Button Component - Sona UI",
      description: "An interactive button with a ripple effect for modern UIs.",
      keywords: ["Ripple Button", "React", "UI Component", "Sona UI"],
      openGraphImage: "/components/rippleButton/img.png",
    },
  },
  {
    name: "Stagger Text",
    href: "/components/staggerText",
    tag: "new",
    featured: true,
    imgSrc: "/components/staggerText/img.png",
    imgAlt: "Stagger Text",
    metadata: {
      title: "Stagger Text Component - Sona UI",
      description: "A text component with staggered animation.",
      keywords: ["Stagger Text", "React", "UI Component", "Sona UI"],
      openGraphImage: "/components/staggerText/img.png",
    },
  },
];
