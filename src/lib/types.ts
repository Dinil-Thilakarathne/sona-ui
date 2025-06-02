import { type } from "arktype";

const tagVariants = type('"new" | "soon" | "updated" | "featured" | "default"');
const typeVariants = type('"Components" | "Text" | "Effects"');

export const navLinksProps = type({
  name: "string",
  href: "string",
  "tag?": tagVariants,
}).infer;

export const ComponentItemsProps = type({
  name: "string",
  href: "string",
  "slug?": "string",
  "tag?": tagVariants,
  "featured?": "boolean",
  "imgSrc?": "string",
  "type?": typeVariants,
}).infer;

export const TagProps = type({
  text: "string",
  "type?": tagVariants,
  "className?": "string",
}).infer;


export type ComponentItemsPropsType = typeof ComponentItemsProps;
export type NavLinksPropsType = typeof navLinksProps;
export type TagPropsType = typeof TagProps;