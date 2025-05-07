"use client";

import React, { useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RxArrowTopRight } from "react-icons/rx";
import useMeasure from "react-use-measure";

interface LinkPreviewProps extends React.HTMLAttributes<HTMLAnchorElement> {
  link: string;
  text: string;
  showIcon?: boolean;
}

const LinkPreview = ({
  link,
  text,
  showIcon = true,
  ...linkProps
}: LinkPreviewProps) => {
  const [previewRef, previewBounds] = useMeasure();

  const [isHover, setIsHover] = useState(false);
  

  return (
    <>
      <span
        className="relative inline-flex cursor-pointer items-center underline"
        onMouseEnter={(e) => {
          e.preventDefault();
          setIsHover(true);
        }}
        onMouseLeave={() => setIsHover(false)}
        role="button"
        tabIndex={0}
        onFocus={(e) => {
          e.preventDefault();
          setIsHover(true);
        }}
        onBlur={() => setIsHover(false)}
      >
        {text}
        {showIcon && (
          <span className="ml-1">
            <RxArrowTopRight />
          </span>
        )}
        <AnimatePresence>
          {isHover && (
            <motion.div
              ref={previewRef}
              className="absolute overflow-clip rounded-xl border border-slate-400 bg-slate-100 shadow-xl origin-center"
              style={{
                left: previewBounds.width / -2,
                top: previewBounds.height / -1,
              }}
              initial={{ opacity: 0, width: 0, height: 0 }}
              animate={{ opacity: 1, width: "auto", height: "auto" }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <motion.div className="flex flex-col gap-y-2 rounded-xl px-4 py-2">
                <div className="flex w-full justify-between text-sm">
                  External Link
                  <Link href={link}>
                    <FaArrowUpRightFromSquare />
                  </Link>
                </div>
                <Link href={link} {...linkProps} className="underline">
                  {link}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    </>
  );
};

export default LinkPreview;
