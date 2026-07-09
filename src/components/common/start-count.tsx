"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";
import { useGitStars } from "@/hooks/useGitStars";

const StartCount = () => {
  const [starCount, setStarCount] = useState<number>(0o0);
  const { stars } = useGitStars("Dinil-Thilakarathne", "sona-ui");

  useEffect(() => {
    if (stars) {
      setStarCount(stars);
    }
  }, [stars]);

  return (
    <span className="flex relative items-center justify-center space-x-1.5 hover:outline-b group">
      <FaGithub />
      <span className="hidden lg:block leading-3.5">Star on GitHub</span>
      <FaStar className="mb-0.5 text-[14px] group-hover:text-yellow-400 duration-300 transition-colors" />
      <NumberFlow value={starCount} />
      <div className="absolute left-0 h-0.5 w-0 group-hover:w-full bg-foreground duration-300 transition-[width] -bottom-0.5"></div>
    </span>
  );
};

export default StartCount;
