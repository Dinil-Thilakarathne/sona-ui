import type { ReactNode } from "react";
import Button from "@/components/Button";
import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";
import {
  componentNavigationLinks,
  groupedComponents,
} from "@/config/components";
import { cn } from "@/lib/utils";
import { Copy, GitPullRequest, Layers } from "lucide-react";
import Link from "next/link";

const TECH_STACK = [
  {
    name: "Next.js",
    icon: <NextjsIcon width={38} height={38} />,
  },
  {
    name: "React",
    icon: <ReactIcon width={38} height={38} />,
  },
  {
    name: "Typescript",
    icon: <TypescriptIcon width={38} height={38} />,
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindIcon width={38} height={38} />,
  },
];

export default function FeatureGrid() {
  const componentCount = componentNavigationLinks.length;
  const categoryCount = Object.keys(groupedComponents).length;

  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
      <FeatureCard>
        <Button className="flex w-fit items-center gap-2">
          <span className="*:scale-75">
            <GitPullRequest />
          </span>
          Open source
        </Button>
        <h3 className="text-2xl lg:text-4xl">Want to contribute?</h3>
      </FeatureCard>

      <FeatureCard>
        <div className="flex w-full justify-between">
          <Button
            className="flex w-fit items-center gap-2 text-white"
            variant="outline"
          >
            npx @sonacode/sonaui-cli
            <span className="*:scale-75">
              <Copy />
            </span>
          </Button>
          <Button className="w-fit text-black">
            <Link href={"/docs/accordion"}>Try it!</Link>
          </Button>
        </div>
        <ul className="ml-auto text-right text-2xl lg:text-4xl">
          <li>{componentCount} Components</li>
          <li>{categoryCount} Categories</li>
        </ul>
      </FeatureCard>

      <FeatureCard>
        <Button className="flex w-fit items-center gap-2">
          <span className="*:scale-75">
            <Layers />
          </span>
          Modern Stack
        </Button>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 text-black">
          {TECH_STACK.map((tech) => (
            <Icon key={tech.name} text={tech.name}>
              {tech.icon}
            </Icon>
          ))}
        </div>
      </FeatureCard>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex min-h-[175px] flex-col justify-between rounded-xl bg-sky-400/80 p-4 lg:min-h-[200px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Icon = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      {children}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};
