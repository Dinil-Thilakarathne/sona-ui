import { groupedComponents } from "@/config/components";
import type { NavLinksPropsType } from "./types";

export const navLinks: NavLinksPropsType[] = [
  {
    name: "Components",
    href: groupedComponents[Object.keys(groupedComponents)[1]][0].href,
  },
];
