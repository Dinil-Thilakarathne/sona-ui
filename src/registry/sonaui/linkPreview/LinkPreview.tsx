"use client";

import { useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import useMeasure from "react-use-measure";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LinkPreviewProps extends React.HTMLAttributes<HTMLAnchorElement> {
  link: string;
  text: string;
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
        className="relative inline-flex cursor-pointer items-center underline underline-offset-3"
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
            className="absolute z-50 w-fit origin-center overflow-clip rounded-xl border border-slate-400 bg-slate-100 shadow-xl dark:bg-slate-600"
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
            <motion.div className="flex w-fit flex-col gap-y-2 rounded-xl px-4 py-2">
              <div className="flex w-full justify-between text-sm">
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
