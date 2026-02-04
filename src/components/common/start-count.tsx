"use client";

import { FaGithub } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { useGitStars } from "@/hooks/useGitStars";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

const StartCount = () => {
  const [starCount, setStarCount] = useState<number>(0o0);
  const { stars } = useGitStars("Dinil-Thilakarathne", "sona-ui");

  useEffect(() => {
    if (stars) {
      setStarCount(stars);
    }
  }, [stars]);

  return (
    <span className="group hover:outline-b relative flex items-center justify-center space-x-1.5">
      <FaGithub />
      <span className="hidden leading-3.5 lg:block">Star on GitHub</span>
      <FaStar className="mb-0.5 text-[14px] transition-colors duration-300 group-hover:text-yellow-400" />
      <NumberFlow value={starCount} />
      <div className="bg-foreground absolute -bottom-0.5 left-0 h-0.5 w-0 transition-[width] duration-300 group-hover:w-full"></div>
    </span>
  );
};

export default StartCount;
