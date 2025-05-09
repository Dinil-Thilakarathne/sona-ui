"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { useGitStars } from "@/hooks/useGitStars";

const StartCount = () => {
  const { stars } = useGitStars("Dinil-Thilakarathne", "sona-ui");

  return (
    <span className="group flex items-center justify-center space-x-1.5 text-sm">
      <FaGithub />
      <span className="leading-[14px]">Star on GitHub</span>
      <FaStar className="mb-0.5 text-[14px] group-hover:text-yellow-400" />
      <span className="leading-[14px]">0{stars}</span>
    </span>
  );
};

export default StartCount;
