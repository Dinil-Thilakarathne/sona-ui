"use client";

import type { ReactElement } from "react";
import { useState } from "react";
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
}

export function ComponentInstallation({
  component,
  componentFiles,
}: ComponentInstallProps) {
  const [cliPackageManager, setCliPackageManager] = useState("npm");
  const [manualPackageManager, setManualPackageManager] = useState("npm");
  const [activeFileTab, setActiveFileTab] = useState(
    componentFiles?.[0]?.path || "",
  );

  const getCliCommand = (pm: string) => {
    // Assuming a standard install command pattern or just placeholder for now
    // The user's request showed: npx shadcn@latest add @cubby-ui/${component}
    // We should probably adapt this to the user's library context if known, or generic.
    // The user's repo is 'sona-ui', maybe 'npx sona-ui add ...'?
    // For now I'll use the user's provided reference as a base but maybe genericize or ask.
    // The prompt reference said "@cubby-ui/${component}", let's stick to a generic "npx sona-ui@latest add" for now?
    // Or just "npm install ..." if no CLI exists yet.
    // Wait, the prompt said "in cli tab the cli command need to be display we can work om this later".
    // So I will just put a placeholder or basic install command for now.

    // User said: "in cli tab the cli command need to be display we can work om this later"
    // So I will just put a placeholder.
    return `npx sona@latest add ${component}`;
  };

  const getInstallCommand = (pm: string) => {
    // We need to parse dependencies from the files?
    // Or just show a generic "install dependencies" command.
    // For manual installation, usually we list deps.
    // For now, I'll assume we don't have the deps list parsed yet, just show 'common' deps or empty.
    return `${pm} install clsx tailwind-merge framer-motion`; // Common deps for this UI lib likely
  };

  return (
    <div className="not-prose my-6 w-full max-w-full min-w-0">
      <Tabs defaultValue="cli" className="gap-6">
        <TabsList variant="underline">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli">
          <CodeBlock code={getCliCommand(cliPackageManager)} language="bash">
            <CodeBlockHeader
              tabs={[
                { value: "npm", label: "npm" },
                { value: "pnpm", label: "pnpm" },
                { value: "yarn", label: "yarn" },
                { value: "bun", label: "bun" },
              ]}
              activeTab={cliPackageManager}
              onTabChange={(value) => setCliPackageManager(value as string)}
            />
            <CodeBlockPre>
              <CodeBlockCode />
            </CodeBlockPre>
          </CodeBlock>
        </TabsContent>
        <TabsContent value="manual">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">Install dependencies:</p>
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
      </Tabs>
    </div>
  );
}
