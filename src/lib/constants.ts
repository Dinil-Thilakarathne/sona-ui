import type { IconType } from "react-icons";
import { BsStars } from "react-icons/bs";
import { groupedComponents } from "@/config/components";

type heroContentProps = {
  flag: {
    icon: IconType;
    text: string;
  };
  header: string;
  description: string;
  techStack: string[];
};

export const heroContent: heroContentProps = {
  flag: {
    icon: BsStars,
    text: "Let your UI shine — light or dark",
  },
  header: "Sona UI",
  description:
    "A modern UI component library built with React and TailwindCSS to help you build beautiful and accessible web applications faster.",
  techStack: ["React", "TailwindCSS", "TypeScript", "Motion"],
};

export const GIT_REP_LINK = "https://github.com/Dinil-Thilakarathne/sona-ui";

export const FEATURE_FLAG = false;

export const FIRST_COMP_LINK =
  groupedComponents[Object.keys(groupedComponents)[1]][0].href;
