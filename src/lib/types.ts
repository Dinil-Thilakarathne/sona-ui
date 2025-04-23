type tagVariants = "new" | "soon" | "updated" | "featured";

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
  tag?: tagVariants;
  featured?: boolean;
  imgSrc?: string;
  imgAlt?: string;
  metadata?: {
    title: string;
    description: string;
    keywords: string[];
    openGraphImage: string;
  };
}
