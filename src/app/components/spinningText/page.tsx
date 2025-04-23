import ComponentWrapper from "@/components/Common/ComponentWrapper";
import { SpinningText } from "./SpinningText";
import { CodeSyntaxHighlighter } from "@/components/Common/CodeSyntaxHighlighter";
import Tabs from "@/components/Common/Tabs";
import { Metadata } from "next";
import { getComponentMetadata } from "@/hooks/metadata";

export const metadata: Metadata = getComponentMetadata("Spinning Text");


const Page = () => {
        const tabsData = [
        {
          title: "Page.tsx",
          content: (
            <CodeSyntaxHighlighter
              filePath="components/spinningText/page.txt"
              language="tsx"
              className=""
            />
          ),
        },
        {
          title: "RippleButton.tsx",
          content: (
            <CodeSyntaxHighlighter
              filePath="components/spinningText/SpinningText.txt"
              language="tsx"
              className=""
            />
          ),
        },
        ]
  return (
    <main className="space-y-8">
      <div>
        <ComponentWrapper>
          <div className="flex min-h-[320px] items-center justify-center">
            <SpinningText>This is example text!</SpinningText>
          </div>
        </ComponentWrapper>
      </div>

      <Tabs tabs={tabsData} className="" />
    </main>
  );
};

export default Page;
