"use client";

import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import type { PointerEvent } from "react";
import { groupedComponents } from "@/config/components";
import { LandingButtonLink } from "../button-link";
import { HeroMeshBackground } from "../hero-mesh-background";
import { InstallCommand } from "../install-command";

export function LandingHero() {
  const reduce = useReducedMotion();
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);
  const lightOpacity = useMotionValue(0);
  const meshX = useMotionValue(0);
  const meshY = useMotionValue(0);

  const springMeshX = useSpring(meshX, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  });
  const springMeshY = useSpring(meshY, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  });

  const moveLight = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    lightX.set(event.clientX - bounds.left - 288);
    lightY.set(event.clientY - bounds.top - 288);
    lightOpacity.set(0.08);
    meshX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
    meshY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 14);
  };

  const hideLight = () => {
    lightOpacity.set(0);
    meshX.set(0);
    meshY.set(0);
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="relative isolate grid min-h-[calc(100svh-var(--spacing-header-height))] place-items-center overflow-hidden px-4 py-[clamp(3.5rem,9svh,8rem)] text-center"
      aria-labelledby="landing-title"
      onPointerEnter={moveLight}
      onPointerMove={moveLight}
      onPointerLeave={hideLight}
    >
      {/*<HeroMeshBackground meshX={springMeshX} meshY={springMeshY} />*/}
      <motion.div
        className="relative z-10 grid gap-4 lg:gap-8 w-full _max-w-3xl justify-items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={item}
          id="landing-title"
          className=" text-balance font-helvetica-neue text-[clamp(2rem,7.2vw,6.75rem)] leading-[.92] font-medium tracking-tight"
        >
          Beautiful interactions,
          <br />
          owned by your codebase.
        </motion.h1>
        <motion.p
          variants={item}
          className=" max-w-[39rem] text-pretty text-[clamp(1rem,0.94rem+0.35vw,1.2rem)] leading-relaxed text-muted-foreground"
        >
          Carefully engineered React components, motion primitives, and visual
          effects installed directly into your project.
        </motion.p>
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-2.5"
        >
          <LandingButtonLink
            href={groupedComponents[Object.keys(groupedComponents)[1]][0].href}
            className="rounded-full bg-primary pr-4 pl-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:bg-primary/80"
          >
            Browse components
            <ArrowRight className="size-4" aria-hidden="true" />
          </LandingButtonLink>
          <LandingButtonLink
            href="/docs/installation"
            variant="outlined"
            className="rounded-full px-4 text-sm font-semibold mobile:hidden"
          >
            Get started
          </LandingButtonLink>
        </motion.div>
        <motion.div
          variants={item}
          className="grid w-full justify-items-center"
        >
          <InstallCommand />
        </motion.div>
      </motion.div>
    </section>
  );
}
