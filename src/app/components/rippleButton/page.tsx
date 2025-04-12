import React from "react";

import ComponentWrapper from "@/components/Common/ComponentWrapper";
import RippleButton, { RippleButtonText } from "./RippleButton";
import { CodeSyntaxHighlighter } from "@/components/Common/CodeSyntaxHighlighter";
import Tabs from "@/components/Common/Tabs";

const Page = () => {

    const tabsData = [
    {
      title: "Page.tsx",
      content: (
        <CodeSyntaxHighlighter
          filePath="components/rippleButton/page.txt"
          language="tsx"
          className=""
        />
      ),
    },
    {
      title: "RippleButton.tsx",
      content: (
        <CodeSyntaxHighlighter
          filePath="components/rippleButton/RippleButton.txt"
          language="tsx"
          className=""
        />
      ),
    },
    ]

  return (
    <div className="space-y-8">
      <ComponentWrapper className="flex items-center justify-center">
        <RippleButton className="text-white">
          <RippleButtonText text="Hover me!" />
        </RippleButton>
      </ComponentWrapper>

      <Tabs tabs={tabsData} className="" />

    </div>
  );
};

export default Page;
