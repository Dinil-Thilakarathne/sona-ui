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
    text: "Soft launch – growing with your feedback",
  },
  header: "Sona UI",
  description:
    "A modern UI component library built with React and TailwindCSS to help you build beautiful and accessible web applications faster.",
  techStack: ["React", "TailwindCSS", "TypeScript", "Motion"],
};

export const GIT_REP_LINK = "https://github.com/Dinil-Thilakarathne/sona-ui";

export const SITE_METADATA = {
  title: "Sona UI - Modern React Component Library",
  description:
    "A modern UI component library built with React and TailwindCSS to help you build beautiful and accessible web applications faster.",
  keywords: [
    "React",
    "UI Components",
    "TailwindCSS",
    "Component Library",
    "Sona UI",
    "Modern UI",
    "Accessible Web",
  ],
  author: "Dinil Thilakarathne",
  authorGithub: "https://github.com/Dinil-Thilakarathne",
  authorTwitter: "@codebydinil",
  siteLink: "https://sona-ui.vercel.app",
  siteName: "Sona UI",
  ogImage: "https://sona-ui.vercel.app/og-image.png",
  twitterImage: "https://sona-ui.vercel.app/og-image.png",
};
