type tagVariants = "new" | "soon" | "updated" | "featured" | "default";

export interface TagProps {
  text: string;
  type?: tagVariants;
  className?: string;
}

export type navLinksProps = {
  name: string;
  href: string;
  tag?: tagVariants;
};

export interface ComponentItemsProps {
  name: string;
  href: string;
  slug?: string;
  tag?: tagVariants;
  featured?: boolean;
  imgSrc?: string;
}
