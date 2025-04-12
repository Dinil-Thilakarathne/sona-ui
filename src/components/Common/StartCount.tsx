"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { useGitStars } from "@/hooks/useGitStars";

const StartCount = () => {
  const { stars } = useGitStars("Dinil-Thilakarathne", "sona-ui");

  return (
    <span className="flex items-center justify-center space-x-1.5 text-sm">
      <FaGithub />
      <span>Star on GitHub</span>
      <FaStar className="text-sm" />
      <span>0{stars}</span>
    </span>
  );
};

export default StartCount;
