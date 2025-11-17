"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import type { ReactNode } from "react";
import Button from "@/components/Button";
import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";
import { cn } from "@/lib/utils";
import { ArrowUpRight, GitPullRequest, Layers } from "lucide-react";
import InfoCard from "./InfoCard";
import Link from "next/link";
import StaggerText from "@/components/Common/StaggerText";

gsap.registerPlugin(useGSAP);

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
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.75, delay: 0.5 },
    });
    tl.from(".feature-card", {
      y: "100%",
      opacity: 0.5,
      duration: 0.25,
      stagger: 0.1,
    });
  });
  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
      <FeatureCard>
        <Button className="flex w-fit items-center gap-2">
          <span className="*:scale-75">
            <GitPullRequest />
          </span>
          Open source
        </Button>
        <Link
          href="https://github.com/Dinil-Thilakarathne/sona-ui"
          className="flex items-center gap-2 text-2xl normal-case lg:text-4xl"
        >
          <StaggerText text="Be a contributor" />
          <ArrowUpRight className="aspect-square h-full lg:scale-125" />
        </Link>
      </FeatureCard>

      <FeatureCard>
        <InfoCard />
      </FeatureCard>

      <FeatureCard>
        <Button className="flex w-fit items-center gap-2">
          <span className="*:scale-75">
            <Layers />
          </span>
          Modern Stack
        </Button>
        <div className="_text-black grid grid-cols-2 grid-rows-2 gap-4">
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
    <div className="overflow-clip">
      <div
        className={cn(
          "feature-card flex min-h-[175px] flex-col justify-between rounded-xl bg-sky-400/80 p-4 lg:min-h-[200px]",
          className,
        )}
      >
        {children}
      </div>
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
