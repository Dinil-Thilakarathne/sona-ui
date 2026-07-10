"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import useMeasure from "react-use-measure";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LinkPreviewProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** The URL of the link to preview. */
  link: string;
  /** The text to display for the link. */
  text: string;
  /**
   * Whether to show an icon next to the link text.
   * @default true
   */
  showIcon?: boolean;
}

export default function LinkPreview({
  link,
  text,
  showIcon = true,
  ...linkProps
}: LinkPreviewProps) {
  // scroll: true keeps viewport coordinates fresh while the page scrolls
  const [containerRef, containerBounds] = useMeasure({ scroll: true });
  const desktop = useMediaQuery("(min-width: 768px)");
  const shouldReduceMotion = useReducedMotion();

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <Link
        href={link}
        className="inline-flex relative items-center underline underline-offset-3 cursor-pointer"
        onMouseEnter={() => {
          if (desktop) setIsHover(true);
        }}
        onMouseLeave={() => setIsHover(false)}
        onFocus={() => {
          if (desktop) setIsHover(true);
        }}
        onBlur={() => setIsHover(false)}
        ref={containerRef}
        {...linkProps}
      >
        {text}
        {showIcon && (
          <span className="ml-1 text-sm">
            <FaArrowUpRightFromSquare />
          </span>
        )}
      </Link>
      <AnimatePresence>
        {isHover && desktop && (
          <div
            role="presentation"
            className="fixed z-50 -translate-x-1/2 -translate-y-full pointer-events-auto"
            style={{
              left: containerBounds.left + containerBounds.width / 2,
              top: containerBounds.top - 8,
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <motion.div
              className="overflow-clip w-fit bg-popover text-popover-foreground border border-border rounded-xl shadow-xl origin-bottom"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, y: 4 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97 }
              }
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex flex-col gap-y-2 px-4 py-2 w-fit rounded-xl">
                <div className="flex justify-between gap-x-4 w-full text-sm">
                  External Link
                  <Link href={link} aria-label={`Open ${link}`}>
                    <FaArrowUpRightFromSquare />
                  </Link>
                </div>
                <Link href={link} className="text-nowrap underline">
                  {link}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
