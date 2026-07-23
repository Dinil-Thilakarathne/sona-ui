"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { groupedComponents } from "@/config/components";
import { LandingButtonLink } from "../button-link";
import { InstallCommand } from "../install-command";

export function LandingHero() {
  const reduce = useReducedMotion();

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
      className="grid min-h-[calc(100svh-var(--spacing-header-height))] place-items-center px-4 py-[clamp(3.5rem,9svh,8rem)] text-center"
      aria-labelledby="landing-title"
    >
      <motion.div
        className="grid w-full _max-w-3xl justify-items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={item}
          id="landing-title"
          className="mt-5 text-balance font-helvetica-neue text-[clamp(2rem,7.2vw,6.75rem)] leading-[.92] font-medium tracking-tight"
        >
          Beautiful interactions,
          <br />
          owned by your codebase.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 max-w-[39rem] text-pretty text-[clamp(1rem,0.94rem+0.35vw,1.2rem)] leading-relaxed text-muted-foreground"
        >
          Carefully engineered React components, motion primitives, and visual
          effects installed directly into your project.
        </motion.p>
        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap justify-center gap-2.5"
        >
          <LandingButtonLink
            href={groupedComponents[Object.keys(groupedComponents)[1]][0].href}
            className="rounded-full px-4 text-sm font-semibold"
          >
            Browse components
            <ArrowRight className="size-4" aria-hidden="true" />
          </LandingButtonLink>
          <LandingButtonLink
            href="/docs/installation"
            variant="outlined"
            className="rounded-full px-4 text-sm font-semibold"
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
