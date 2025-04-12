export type navLinksProps = {
  name: string;
  href: string;
  tag?: "new" | "soon";
};

export type ComponentItemsProps = {
  name: string;
  href: string;
  tag?: "new" | "soon";
  featured?: boolean;
  imgSrc?: string;
  imgAlt?: string;
  link?: string;
};
