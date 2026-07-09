import type { ReactNode } from "react";

import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";
import Marquee from "@/registry/sonaui/marquee/marquee";

const TECH_STACK = [
  {
    name: "Next.js",
    icon: <NextjsIcon />,
  },
  {
    name: "React",
    icon: <ReactIcon />,
  },
  {
    name: "Typescript",
    icon: <TypescriptIcon />,
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindIcon />,
  },
];

export default function MarqueeExample() {
  return (
    <Marquee duration={10} containerClassName="md:space-x-16 " activeHover>
      <div className="flex gap-x-8 items-center md:gap-x-16">
        {TECH_STACK.map((tech) => (
          <Icon key={tech.name} text={tech.name}>
            {tech.icon}
          </Icon>
        ))}
      </div>
    </Marquee>
  );
}

const Icon = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="flex gap-x-4 items-center shrink h-16">
      <span className="*:xl:h-16 *:xl:w-16">{children}</span>
      <span className="font-medium text-sm lg:text-lg">{text}</span>
    </div>
  );
};
