import { type ReactNode } from "react";

import ComponentWrapper from "@/components/Common/ComponentWrapper";
import Marquee from "../sonaui/marquee/Marquee";
import {
  NextjsIcon,
  ReactIon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";

const TECH_STACK = [
  {
    name: "Next.js",
    icon: <NextjsIcon />,
  },
  {
    name: "React",
    icon: <ReactIon />,
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
    <ComponentWrapper className="max-w-[976px]">
      <Marquee
        duration={10}
        containerClassName="md:space-x-16 lg:space-x-32"
        activeHover
      >
        <div className="flex items-center gap-x-8 md:gap-x-16 lg:gap-x-32">
          {TECH_STACK.map((tech) => (
            <Icon key={tech.name} text={tech.name}>
              {tech.icon}
            </Icon>
          ))}
        </div>
      </Marquee>
    </ComponentWrapper>
  );
}

const Icon = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="flex h-16 items-center gap-x-4">
      <span className="*:h-16 *:w-16">{children}</span>
      <span className="text-sm font-medium lg:text-lg">{text}</span>
    </div>
  );
};
