"use client";

import type { ReactElement } from "react";
import { startTransition, useState, ViewTransition } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/tabs/tabs";
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockPre,
  CodeBlockCode,
} from "@/components/code-block/code-block";

interface ComponentInstallProps {
  component: string;
  componentFiles?: Array<{
    path: string;
    type: string;
    content: string;
    target: string;
  }>;
  metadata?: {
    dependencies?: string[];
    registryDependencies?: string[];
  };
}

export function ComponentInstallation({
  component,
  componentFiles,
  metadata,
}: ComponentInstallProps) {
  const [manualPackageManager, setManualPackageManager] = useState("npm");
  const [activeFileTab, setActiveFileTab] = useState(
    componentFiles?.[0]?.path || "",
  );

  const cliCommand = `npx sona-ui@latest add ${component}`;

  const getInstallCommand = (pm: string) => {
    if (!metadata?.dependencies || metadata.dependencies.length === 0) {
      return "# No dependencies required";
    }

    const deps = metadata.dependencies.join(" ");

    switch (pm) {
      case "pnpm":
        return `pnpm add ${deps}`;
      case "yarn":
        return `yarn add ${deps}`;
      case "bun":
        return `bun add ${deps}`;
      default:
        return `npm install ${deps}`;
    }
  };

  return (
    <div className="not-prose my-3 w-full max-w-full min-w-0">
      <Tabs defaultValue="cli" className="gap-6">
        <TabsList variant="underline">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli">
          <CodeBlock code={cliCommand} language="bash">
            <CodeBlockHeader />
            <CodeBlockPre>
              <CodeBlockCode />
            </CodeBlockPre>
          </CodeBlock>
        </TabsContent>
        <ViewTransition>
          <TabsContent value="manual">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  Install dependencies:
                </p>
                <CodeBlock
                  code={getInstallCommand(manualPackageManager)}
                  language="bash"
                >
                  <CodeBlockHeader
                    tabs={[
                      { value: "npm", label: "npm" },
                      { value: "pnpm", label: "pnpm" },
                      { value: "yarn", label: "yarn" },
                      { value: "bun", label: "bun" },
                    ]}
                    activeTab={manualPackageManager}
                    onTabChange={(value) =>
                      setManualPackageManager(value as string)
                    }
                  />
                  <CodeBlockPre>
                    <CodeBlockCode />
                  </CodeBlockPre>
                </CodeBlock>
              </div>

              {componentFiles && componentFiles.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Copy and paste the component files:
                  </p>
                  {componentFiles.length === 1 ? (
                    // Single file: no tabs needed
                    <CodeBlock
                      code={componentFiles[0].content}
                      language="tsx"
                      floatingCopy
                    >
                      <CodeBlockHeader filename={componentFiles[0].path} />
                      <CodeBlockPre>
                        <CodeBlockCode />
                      </CodeBlockPre>
                    </CodeBlock>
                  ) : (
                    // Multiple files: use tabs
                    (() => {
                      const activeFile =
                        componentFiles.find((f) => f.path === activeFileTab) ||
                        componentFiles[0];

                      return (
                        <CodeBlock
                          code={activeFile.content}
                          language="tsx"
                          floatingCopy
                        >
                          <CodeBlockHeader
                            tabs={componentFiles.map((f) => ({
                              value: f.path,
                              label: f.path,
                            }))}
                            activeTab={activeFileTab}
                            onTabChange={(value) =>
                              setActiveFileTab(value as string)
                            }
                            showCopy={false}
                          />
                          <CodeBlockPre>
                            <CodeBlockCode />
                          </CodeBlockPre>
                        </CodeBlock>
                      );
                    })()
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </ViewTransition>
      </Tabs>
    </div>
  );
}
