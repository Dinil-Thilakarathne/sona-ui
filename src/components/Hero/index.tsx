import { type ReactNode } from "react";

import { heroContent } from "@/lib/constants";
import Sidebar from "../ComponentsSidebar";
import {
  NextjsIcon,
  ReactIon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";
// import HeroGrid from "./HeroGrid";
import AnimatedLink from "../Common/AnimatedLink";
import BgGradient from "../Common/BgGradient";

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
    // mobile sidebar
    <section className="relative flex min-h-[calc(100vh-75px)] flex-col overflow-clip">
      <BgGradient />
      <div className="absolute top-0 left-0 lg:hidden">
        <Sidebar />
      </div>

      <div className="relative grid h-full grow items-center space-y-4 px-4 lg:flex-row lg:space-y-0 lg:space-x-8">
        <div className="flex h-fit w-full flex-col items-center gap-y-6">
          <div className="flex w-fit items-center justify-center space-x-2 rounded-full border-slate-800 bg-slate-50 px-4 py-2 dark:bg-slate-800">
            <heroContent.flag.icon aria-label="hero-flag-img" />
            <span className="text-sm">{heroContent.flag.text}</span>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <h1 className="font-clash-display _font-roboto text-6xl font-bold uppercase lg:text-7xl 2xl:text-[20rem]">
              {heroContent.header}
            </h1>
            <p className="max-w-2xl text-center text-lg text-gray-600 md:text-xl dark:text-gray-300">
              {heroContent.description}
            </p>
          </div>
          <div className="flex w-fit flex-col items-center justify-center gap-4 lg:flex-row">
            <AnimatedLink href="/docs/accordion">
              <span>Browse components</span>
            </AnimatedLink>
          </div>
          <div className="flex flex-wrap items-center gap-4 dark:text-white">
            {TECH_STACK.map((tech) => (
              <Icon key={tech.name} text={tech.name}>
                {tech.icon}
              </Icon>
            ))}
          </div>
        </div>
        {/* <HeroGrid /> */}
      </div>
    </section>
  );
};

export default Hero;

const Icon = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      {children}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};
