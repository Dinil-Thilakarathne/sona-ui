"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/tabs";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "@/components/code-block/code-block";

interface ComponentPreviewProps {
  component: React.ReactNode;
  code: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  component,
  code,
}) => {
  return (
    <Tabs defaultValue="preview" className="w-full my-3">
      <TabsList data-orientation="horizontal">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="flex min-h-[350px] items-center justify-center"
      >
        {component}
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
