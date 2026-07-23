"use client";

import { ChevronsUpDown } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import AnimatedLink from "../common/animated-link";

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
          className="flex fixed bottom-16 left-4 flex-col mb-4 px-4 py-4 space-y-4 max-w-[300px] w-[calc(100%-2rem)] bg-popover border-[.5px] border-secondary rounded-2xl shadow-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          ref={ref}
        >
          <div className="flex flex-col space-y-1">
            <h3 className="font-semibold text-lg">I hope you like SonaUI...</h3>
            <p className="text-pretty text-sm">
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
              className="text-center text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </AnimatedLink>
          </div>
        </motion.div>
      )}
      <button
        className="flex items-center justify-between p-2 w-full bg-secondary rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2 _justify-center">
          <Image
            src={"/profile_pic.png"}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col items-start text-sm">
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
