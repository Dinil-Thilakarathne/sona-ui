"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useGitStars } from "@/hooks/useGitStars";

const StartCount = () => {
  const [starCount, setStarCount] = useState<number>(0o0);
  const { stars } = useGitStars();

  useEffect(() => {
    if (stars) {
      setStarCount(stars);
    }
  }, [stars]);

  return (
    <span className="flex relative items-center justify-center space-x-1.5 group">
      <FaGithub />
      <span className="hidden lg:block leading-3.5 sr-only">
        Star on GitHub
      </span>
      <NumberFlow value={starCount} />
    </span>
  );
};

export default StartCount;
