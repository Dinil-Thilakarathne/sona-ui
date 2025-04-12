import React from "react";
import ComponentWrapper from "@/components/Common/ComponentWrapper";
import { SyntaxHighlighter } from "@/components/Common/SyntaxHighlighter";

const Page = () => {
  return (
    <div className="space-y-8">
      {/* Accordion Component */}
      <ComponentWrapper
        componentPath="app/components/accordion/Accordion.tsx"
        className="mx-auto max-w-2xl"
      />

      {/* Source Code */}
      <SyntaxHighlighter
        filePath="components/accordion/Accordion.txt"
        language="tsx"
        className="mx-auto max-w-4xl"
      />
    </div>
  );
};

export default Page;
