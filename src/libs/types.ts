export type navLinksProps = {
  name: string;
  href: string;
  tag?: "new" | "soon";
};

export interface ComponentItemsProps {
  name: string;
  href: string;
  tag?: "new" | "soon";
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
