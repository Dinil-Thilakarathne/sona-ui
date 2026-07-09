"use client";

import { AnimatePresence, motion } from "motion/react";
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
  const [previewRef, previewBounds] = useMeasure();
  const [containerRef, containerBounds] = useMeasure();
  const desktop = useMediaQuery("(min-width: 768px)");

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <Link
        href={link}
        className="inline-flex relative items-center underline underline-offset-3 cursor-pointer"
        onMouseEnter={(e) => {
          if (!desktop) return;
          e.preventDefault();
          setIsHover(true);
        }}
        onClick={(e) => {
          if (!desktop) return;
          e.preventDefault();
          setIsHover((prev) => !prev);
        }}
        onMouseLeave={() => {
          if (isHover) {
            setIsHover(false);
          }
        }}
        onFocus={(e) => {
          e.preventDefault();
          setIsHover(true);
        }}
        onBlur={() => setIsHover(false)}
        ref={containerRef}
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
          <motion.div
            ref={previewRef}
            className="overflow-clip absolute z-50 w-fit bg-slate-100 dark:bg-slate-600 border border-slate-400 rounded-xl shadow-xl origin-center"
            style={{
              left: containerBounds.left - previewBounds.width / 2,
              top: containerBounds.top - previewBounds.height,
            }}
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: 1, width: "fit-content", height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <motion.div className="flex flex-col gap-y-2 px-4 py-2 w-fit rounded-xl">
              <div className="flex justify-between w-full text-sm">
                External Link
                <Link href={link}>
                  <FaArrowUpRightFromSquare />
                </Link>
              </div>
              <Link
                href={link}
                className="text-nowrap underline"
                {...linkProps}
              >
                {link}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
