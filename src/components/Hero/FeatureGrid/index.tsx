import type { ReactNode } from "react";
import Button from "@/components/Button";
import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";

const TECH_STACK = [
  {
    name: "Next.js",
    icon: <NextjsIcon width={ 38} height={ 38} />,
  },
  {
    name: "React",
    icon: <ReactIcon width={ 38} height={ 38} />,
  },
  {
    name: "Typescript",
    icon: <TypescriptIcon width={ 38} height={ 38} />,
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindIcon width={ 38} height={ 38} />,
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="flex min-h-[200px] flex-col justify-between rounded-xl   p-4">
        <Button className="w-fit">Open source</Button>
        <h3 className="lg:text-4xl">Want to contribute?</h3>
      </div>
      <div className="flex min-h-[200px] flex-col justify-between rounded-xl   p-4">
        <div className="flex w-full justify-between">
          <Button className="w-fit text-white" variant="outline">
            npx @sonacode/sonaui-cli
          </Button>
          <Button className="w-fit text-white">Try it!</Button>
        </div>
        <ul className="ml-auto text-right lg:text-4xl">
          <li>10 Components</li>
          <li>3 Categories</li>
        </ul>
      </div>
      <div className="flex min-h-[200px] flex-col justify-between rounded-xl   p-4">
        <Button className="w-fit">Modern Stack</Button>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 text-black">
          {TECH_STACK.map((tech) => (
            <Icon key={tech.name} text={tech.name}>
              {tech.icon}
            </Icon>
          ))}
        </div>
      </div>
    </div>
  );
}

const Icon = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      {children}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};
