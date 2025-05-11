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
    <span className="group flex items-center justify-center space-x-1.5 text-sm">
      <FaGithub />
      <span className="leading-[14px]">Star on GitHub</span>
      <FaStar className="mb-0.5 text-[14px] group-hover:text-yellow-400" />
      <NumberFlow value={starCount} />
    </span>
  );
};

export default StartCount;
