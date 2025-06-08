"use client";

import Image from "next/image";
import { useState, useRef } from "react";

import { motion } from "motion/react";
import { ChevronsUpDown } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import AnimatedLink from "../Common/AnimatedLink";

export default function ProfilePopover() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
    if (isOpen) setIsOpen(false);
  });
  return (
    <>
      {isOpen && (
        <motion.div
          className="bg-popover shadow-primary/20 border-secondary fixed bottom-16 left-0 mb-4 ml-2 flex w-max max-w-[300px] flex-col space-y-4 rounded-2xl border-[.5px] px-4 py-4 shadow-lg lg:px-6 lg:py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          ref={ref}
        >
          <div className="flex flex-col space-y-1">
            <h3 className="text-lg font-semibold">I hope you like SonaUI...</h3>
            <p className="text-sm text-pretty">
              Hi, I’m Dinil — the creator of this project (and a few others). If
              you find it helpful, consider sponsoring me on GitHub or connect
              with me on Linkedin.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <AnimatedLink
              href="https://github.com/sponsors/Dinil-Thilakarathne"
              variant="default"
              className="mt-2 w-full text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sponsor me on GitHub
            </AnimatedLink>
            <AnimatedLink
              variant="outline"
              href="https://www.linkedin.com/in/dinil-thilakarathne/"
              className="text-primary text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </AnimatedLink>
          </div>
        </motion.div>
      )}
      <button
        className="bg-secondary flex w-full cursor-pointer items-center justify-between rounded-lg p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="_justify-center flex items-center space-x-2">
          <Image
            src={"/profile_pic.png"}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-primary flex flex-col items-start text-sm">
            <span>Dinil Thilakarathne</span>
            <span>@sonaui</span>
          </div>
        </div>
        <span className="text-sm">
          <ChevronsUpDown />
        </span>
      </button>
    </>
  );
}
