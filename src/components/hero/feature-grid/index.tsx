"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, GitPullRequest, Layers } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";
import Button from "@/components/button";
import StaggerText from "@/components/common/stagger-text";
import { cn } from "@/lib/utils";
import InfoCard from "./InfoCard";

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
    <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
      <FeatureCard>
        <Button className="flex gap-2 items-center w-fit">
          <span className="*:scale-75">
            <GitPullRequest />
          </span>
          Open source
        </Button>
        <Link
          href="https://github.com/Dinil-Thilakarathne/sona-ui"
          className="flex gap-2 items-center normal-case text-2xl lg:text-4xl"
        >
          <StaggerText text="Be a contributor" />
          <ArrowUpRight className="h-full lg:scale-125 aspect-square" />
        </Link>
      </FeatureCard>

      <FeatureCard>
        <InfoCard />
      </FeatureCard>

      <FeatureCard>
        <Button className="flex gap-2 items-center w-fit">
          <span className="*:scale-75">
            <Layers />
          </span>
          Modern Stack
        </Button>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 _text-black">
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
    <div className="flex gap-x-2 items-center">
      {children}
      <span className="font-medium text-sm">{text}</span>
    </div>
  );
};
