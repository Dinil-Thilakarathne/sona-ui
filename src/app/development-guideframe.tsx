"use client";

import dynamic from "next/dynamic";

const GuideframeGrid =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () =>
          import("@guideframe/react").then((module) => module.GuideframeGrid),
        { ssr: false },
      )
    : null;

export function DevelopmentGuideframe() {
  if (!GuideframeGrid) return null;

  return (
    <GuideframeGrid
      panel
      rulers
      maxWidth={768}
      margin={8}
      columns={{ desktop: 6, tablet: 4, mobile: 3 }}
      gutter={8}
      defaultVisible={false}
    />
  );
}
