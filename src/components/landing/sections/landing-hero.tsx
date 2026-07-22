"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
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
        className="grid w-full max-w-3xl justify-items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="inline-flex items-center gap-2 text-xs leading-tight font-semibold tracking-[0.08em] text-muted-foreground uppercase"
        >
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Open source React component system
        </motion.p>
        <motion.h1
          variants={item}
          id="landing-title"
          className="mt-5 max-w-[13ch] text-balance font-clash-display text-[clamp(2.7rem,7.2vw,6.75rem)] leading-[.92] font-semibold tracking-[-0.065em]"
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
          <Link
            href="/docs"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm leading-none font-semibold text-background transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-primary active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none"
          >
            Browse components{" "}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/docs/installation"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm leading-none font-semibold text-foreground transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-secondary active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none"
          >
            Get started
          </Link>
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
