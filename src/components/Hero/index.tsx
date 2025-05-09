import { type ReactNode } from "react";

import { heroContent } from "@/lib/constants";
import Fade from "../Common/Fade";
import Sidebar from "../ComponentsSidebar";
import { componentNavigationLinks } from "@/config/components";
import Button from "../Button";
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

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-75px)] flex-col overflow-clip">
      <div className="absolute top-0 left-0 lg:hidden">
        <Sidebar title="Components" items={componentNavigationLinks} />
      </div>

      <div className="container mx-auto flex h-full grow flex-col items-center space-y-4 px-4 lg:flex-row lg:space-y-0 lg:space-x-8">
        <div className="flex h-fit flex-col gap-y-6">
          <Fade preset="Fade-up" delay={0.05}>
            <div className="flex w-fit items-center justify-center space-x-2 rounded-full border-slate-800 bg-slate-50 px-4 py-2 dark:bg-slate-800">
              <heroContent.flag.icon />
              <span>{heroContent.flag.text}</span>
            </div>
          </Fade>
          <div>
            <Fade preset="Fade-up" containerClasses="  w-fit">
              <h1 className="text-4xl font-bold md:text-6xl lg:text-9xl">
                {heroContent.header}
              </h1>
            </Fade>
            <Fade
              preset="Fade-up"
              delay={0.1}
              containerClasses="  w-fit text-left"
            >
              <p className="max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
                {heroContent.description}
              </p>
            </Fade>
          </div>
          <Fade preset="Fade-up" delay={0.15}>
            <div className="flex w-fit flex-col items-center justify-center gap-4 lg:flex-row">
              <Button link="/docs" className="px-4 py-2">
                <span className="text-lg">Browse components</span>
              </Button>
            </div>
          </Fade>
          <div className="flex flex-wrap gap-4 dark:text-white">
            {TECH_STACK.map((tech, i) => (
              <Icon key={tech.name} text={tech.name} index={i}>
                {tech.icon}
              </Icon>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

const Icon = ({
  children,
  text,
  index,
}: {
  children: ReactNode;
  text: string;
  index: number;
}) => {
  return (
    <Fade preset="Fade-up" delay={0.2 + index * 0.05}>
      <div className="flex items-center gap-x-2">
        {children}
        <span className="text-sm font-medium">{text}</span>
      </div>
    </Fade>
  );
};
