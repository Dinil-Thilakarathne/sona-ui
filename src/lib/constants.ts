import { IconType } from "react-icons";
import { BsStars } from "react-icons/bs";

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
