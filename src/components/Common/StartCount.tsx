"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";

import { useGitStars } from "@/hooks/useGitStars";

const StartCount = () => {
  const { stars } = useGitStars("Dinil-Thilakarathne", "sona-ui");

  return (
    <span className="flex items-center justify-center space-x-1 text-sm">
      <FaGithub />
      <span>{stars}</span>
    </span>
  );
};

export default StartCount;
