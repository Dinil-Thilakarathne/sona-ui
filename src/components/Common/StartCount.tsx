"use client";

import React from "react";

import { useGitStars } from "@/hooks/useGitStars";

const StartCount = () => {
  const { stars } = useGitStars("Dinil-Thilakarathne", "sona-ui");

  return <span className="text-sm">⭐ {stars}</span>;
};

export default StartCount;
