"use client";

import type { VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/sonaui/button/button";

const MotionLink = motion.create(Link);

type LandingButtonLinkProps = ComponentProps<typeof MotionLink> &
  VariantProps<typeof buttonVariants>;

export function LandingButtonLink({
  className,
  variant = "default",
  size = "lg",
  ...props
}: LandingButtonLinkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionLink
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      transition={
        shouldReduceMotion ? motionTransition.reduced : motionTransition.spatial
      }
      className={cn(buttonVariants({ variant, size }), "w-fit", className)}
      {...props}
    />
  );
}
