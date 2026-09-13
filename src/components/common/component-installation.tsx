"use client";

import { useReducedMotion } from "motion/react";
import { useState, ViewTransition } from "react";
import { TextMorph } from "torph/react";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "@/components/code-block/code-block";
import { ComponentFilePreview } from "@/components/common/component-file-preview";
import { getDependencies } from "@/components/common/dependency-registry";
import { CopyButton } from "@/components/copy-button/copy-button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/tabs";
import { cn } from "@/lib/utils";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "@/registry/sonaui/stepper/stepper";

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
  themeFiles?: Array<{
    path: string;
    content: string;
  }>;
}

export function ComponentInstallation({
  component,
  componentFiles,
  metadata,
  themeFiles,
}: ComponentInstallProps) {
  const [manualPackageManager, setManualPackageManager] = useState("npm");
  const reduceMotion = useReducedMotion();
  const dependencies = getDependencies(metadata?.dependencies ?? []);

  const cliCommand = `npx shadcn@latest add @sona-ui/${component}`;

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
    <div className="my-3 max-w-full min-w-0 w-full not-prose">
      {dependencies.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {dependencies.map((dependency) => (
            <a
              key={dependency.name}
              href={dependency.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {dependency.logo}
              {dependency.name}
            </a>
          ))}
        </div>
      )}
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
            <Stepper defaultValue={1} orientation="vertical" className="block">
              <StepperNav className="hidden">
                <StepperItem step={1}>
                  <StepperTrigger>
                    <StepperIndicator>1</StepperIndicator>
                    <StepperTitle>Dependencies</StepperTitle>
                  </StepperTrigger>
                </StepperItem>
                <StepperItem step={2}>
                  <StepperTrigger>
                    <StepperIndicator>2</StepperIndicator>
                    <StepperTitle>Component files</StepperTitle>
                  </StepperTrigger>
                </StepperItem>
                {themeFiles && themeFiles.length > 0 && (
                  <StepperItem step={3}>
                    <StepperTrigger>
                      <StepperIndicator>3</StepperIndicator>
                      <StepperTitle>Theme tokens</StepperTitle>
                    </StepperTrigger>
                  </StepperItem>
                )}
              </StepperNav>
              <StepperPanel className="relative pl-10 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-border">
                <StepperContent value={1} forceMount className="relative mb-12">
                  <span className="absolute -left-10 top-0 grid size-8 place-items-center rounded-xl bg-muted text-sm text-foreground">
                    1
                  </span>
                  <div>
                    <h3 className="mb-6 text-xl font-semibold tracking-tight">
                      Install the following dependencies
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between border-b border-border px-3 py-2">
                        <div className="flex items-center gap-1">
                          {["npm", "pnpm", "yarn", "bun"].map(
                            (packageManager) => (
                              <button
                                key={packageManager}
                                type="button"
                                onClick={() =>
                                  setManualPackageManager(packageManager)
                                }
                                className={cn(
                                  "rounded-md px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                                  manualPackageManager === packageManager &&
                                    "bg-accent text-foreground",
                                )}
                              >
                                {packageManager}
                              </button>
                            ),
                          )}
                        </div>
                        <CopyButton
                          content={getInstallCommand(manualPackageManager)}
                          className="size-7 p-0"
                        />
                      </div>
                      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm">
                        <code>
                          <TextMorph
                            as="span"
                            duration={260}
                            ease="cubic-bezier(0.22, 1, 0.36, 1)"
                            scale={false}
                            disabled={Boolean(reduceMotion)}
                          >
                            {`${manualPackageManager} ${manualPackageManager === "npm" ? "install" : "add"}`}
                          </TextMorph>{" "}
                          {metadata?.dependencies?.join(" ") ??
                            "# No dependencies required"}
                        </code>
                      </pre>
                    </div>
                  </div>
                </StepperContent>

                <StepperContent value={2} forceMount className="relative mb-12">
                  <span className="absolute -left-10 top-0 grid size-8 place-items-center rounded-xl bg-muted text-sm text-foreground">
                    2
                  </span>
                  {componentFiles && componentFiles.length > 0 ? (
                    <div>
                      <h3 className="mb-6 text-xl font-semibold tracking-tight">
                        Copy and paste the following code into your project
                      </h3>
                      <ComponentFilePreview files={componentFiles} />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No component files are available for manual installation.
                    </p>
                  )}
                </StepperContent>

                {themeFiles && themeFiles.length > 0 && (
                  <StepperContent value={3} forceMount className="relative">
                    <span className="absolute -left-10 top-0 grid size-8 place-items-center rounded-xl bg-muted text-sm text-foreground">
                      3
                    </span>
                    <div>
                      <h3 className="mb-6 text-xl font-semibold tracking-tight">
                        Add the required Sona theme tokens to your global CSS
                      </h3>
                      {themeFiles.map((file) => (
                        <CodeBlock
                          key={file.path}
                          code={file.content}
                          language="css"
                        >
                          <CodeBlockHeader filename={file.path} />
                          <CodeBlockPre>
                            <CodeBlockCode />
                          </CodeBlockPre>
                        </CodeBlock>
                      ))}
                    </div>
                  </StepperContent>
                )}
              </StepperPanel>
            </Stepper>
          </TabsContent>
        </ViewTransition>
      </Tabs>
    </div>
  );
}
