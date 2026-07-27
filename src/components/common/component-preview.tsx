"use client";

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "@/components/code-block/code-block";
import ComponentWrapper from "@/components/common/component-wrapper";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/tabs";

interface ComponentPreviewProps {
  component: React.ReactNode;
  code: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  component,
  code,
}) => {
  return (
    <Tabs defaultValue="preview" className="my-3 w-full">
      <TabsList data-orientation="horizontal">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="flex items-center justify-center min-h-[350px]"
      >
        <ComponentWrapper>{component}</ComponentWrapper>
      </TabsContent>
      <TabsContent value="code" className="">
        <CodeBlock language="tsx" code={code}>
          <CodeBlockHeader />
          <CodeBlockPre>
            <CodeBlockCode />
          </CodeBlockPre>
        </CodeBlock>
      </TabsContent>
    </Tabs>
  );
};

export default ComponentPreview;
