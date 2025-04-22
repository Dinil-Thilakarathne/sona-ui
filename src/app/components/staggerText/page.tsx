import React from "react";

import ComponentWrapper from "@/components/Common/ComponentWrapper";
import { CodeSyntaxHighlighter } from "@/components/Common/CodeSyntaxHighlighter";
import Tabs from "@/components/Common/Tabs";
import { Metadata } from "next";
import { getComponentMetadata } from "@/hooks/metadata";
import StaggerText from "./StaggerText";

export const metadata: Metadata = getComponentMetadata("Stagger Text");

const Page = () => {

    const tabsData = [
    {
      title: "Page.tsx",
      content: (
        <CodeSyntaxHighlighter
          filePath="components/staggerText/page.txt"
          language="tsx"
          className=""
        />
      ),
    },
    {
      title: "StaggerText.tsx",
      content: (
        <CodeSyntaxHighlighter
          filePath="components/staggerText/StaggerText.txt"
          language="tsx"
          className=""
        />
      ),
    },
    ]

  return (
    <div className="space-y-8">
      <ComponentWrapper className="flex items-center justify-center">
        <StaggerText text="Hover me!" />
      </ComponentWrapper>

      <Tabs tabs={tabsData} className="" />

    </div>
  );
};

export default Page;
