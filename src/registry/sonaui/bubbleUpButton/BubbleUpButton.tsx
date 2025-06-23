"use client";

import { motion, useAnimation } from "motion/react";

export default function BubbleUpButton() {
  const controls = useAnimation();

  const handleMouseEnter = async () => {
    console.log("Mouse entered");
    await controls.start({
      // scale: 1.1,
      clipPath: "ellipse(120% 120% at 50% 100%)",
      transition: { type: "spring", stiffness: 300, damping: 40, duration: 2 },
    });
  };

  const handleMouseLeave = async () => {
    console.log("Mouse left");
    await controls.start({
      // scale: 0,
      clipPath: "ellipse(120% 120% at 50% -120%)",
      transition: { type: "spring", stiffness: 300, damping: 40, duration: 2 },
    });
    controls.set({ clipPath: "ellipse(0% 0% at 50% 100%)" });
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-fit w-fit overflow-clip rounded-2xl border bg-black px-16 py-2"
    >
      <motion.div
        animate={controls}
        initial={{ scale: 1, clipPath: "ellipse(0% 0% at 50% 100%)" }}
        className="absolute top-0 left-0 h-full w-full bg-white"
        transition={{ duration: 2 }}
      />
      <span className="relative text-white mix-blend-difference">text</span>
    </button>
  );
}
