"use client";

import { Quote, Star } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/sona-utils";

const TILT_SPRING = { stiffness: 320, damping: 28, mass: 0.45 };

/** The optional pointer-driven depth treatment. */
export type TestimonialCardDepth = "none" | "subtle";

export interface TestimonialCardProps extends HTMLAttributes<HTMLElement> {
  /** The testimonial quote. */
  children: ReactNode;
  /** Name of the person giving the testimonial. */
  authorName: string;
  /** The person's role, company, or both. @default undefined */
  authorMeta?: string;
  /** Accessible description for the author avatar. */
  avatarAlt: string;
  /** URL of the author avatar. @default undefined */
  avatarUrl?: string;
  /** Rating shown above the quote, from 0 to 5. @default 5 */
  rating?: number;
  /** Optional label placed above the rating. @default undefined */
  eyebrow?: string;
  /** Enables shallow, fine-pointer hover depth. @default "none" */
  depth?: TestimonialCardDepth;
}

function Rating({ rating }: { rating: number }) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div aria-label={`${roundedRating} out of 5 stars`} className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "size-3.5",
            index < roundedRating
              ? "fill-foreground text-foreground"
              : "fill-transparent text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({
  children,
  authorName,
  authorMeta,
  avatarAlt,
  avatarUrl,
  rating = 5,
  eyebrow,
  depth = "none",
  className,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: TestimonialCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, TILT_SPRING);
  const rotateY = useSpring(tiltY, TILT_SPRING);
  const highlightX = useMotionValue("50%");
  const highlightY = useMotionValue("50%");
  const highlight = useMotionTemplate`radial-gradient(460px circle at ${highlightX} ${highlightY}, color-mix(in oklab, var(--foreground) 7%, transparent), transparent 64%)`;
  const isDepthEnabled = depth === "subtle" && !shouldReduceMotion;

  const resetDepth = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      className="w-full [perspective:900px]"
      style={isDepthEnabled ? { rotateX, rotateY } : undefined}
    >
      <article
        {...props}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (
            event.defaultPrevented ||
            !isDepthEnabled ||
            event.pointerType !== "mouse"
          )
            return;

          const rect = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          tiltX.set(y * -3);
          tiltY.set(x * 3);
          highlightX.set(`${(x + 0.5) * 100}%`);
          highlightY.set(`${(y + 0.5) * 100}%`);
        }}
        onPointerLeave={(event) => {
          resetDepth();
          onPointerLeave?.(event);
        }}
        style={style}
        className={cn(
          "group relative w-full max-w-xl overflow-hidden rounded-3xl bg-card p-7 text-card-foreground [transform-style:preserve-3d]",
          isDepthEnabled
            ? "smooth-shadow-ring-lg hover:smooth-shadow-ring-xl"
            : "smooth-shadow-ring-sm",
          className,
        )}
      >
        {isDepthEnabled && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: highlight }}
          />
        )}
        <div className="relative">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-3">
              {eyebrow && (
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                  {eyebrow}
                </p>
              )}
              <Rating rating={rating} />
            </div>
            <Quote
              aria-hidden="true"
              className="size-7 shrink-0 text-muted-foreground/35"
            />
          </div>
          <blockquote className="mt-8 font-medium text-2xl leading-[1.35] tracking-[-0.025em] sm:text-3xl">
            “{children}”
          </blockquote>
          <footer className="mt-8 flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={avatarAlt}
                className="size-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div
                aria-label={avatarAlt}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-sm"
              >
                {authorName.slice(0, 1)}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-medium text-sm">{authorName}</p>
              {authorMeta && (
                <p className="truncate text-muted-foreground text-sm">
                  {authorMeta}
                </p>
              )}
            </div>
          </footer>
        </div>
      </article>
    </motion.div>
  );
}
