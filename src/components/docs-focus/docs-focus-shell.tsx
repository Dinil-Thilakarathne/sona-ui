"use client";

import { Switch } from "@base-ui/react/switch";
import {
  BookOpenText,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Home,
  RotateCcw,
  Settings2,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useId, useMemo, useState } from "react";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "@/components/code-block/code-block";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/common/drawer";
import { Mdx } from "@/components/common/mdx-components";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/common/sheet";
import { ModeToggle } from "@/components/common/theme-toggle";
import { DocsCopyPage } from "@/components/docs-copy-page/docs-copy-page";
import { Search } from "@/components/Search";
import { BunIcon } from "@/components/svgs/bun-logo";
import { NpmIcon } from "@/components/svgs/npm-logo";
import { PnpmIcon } from "@/components/svgs/pnpm-logo";
import { YarnIcon } from "@/components/svgs/yarn-logo";
import { ComponentUsage } from "@/components/usage/component-usage";
import { groupedComponents } from "@/config/components";
import { SITE_METADATA } from "@/config/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { exampleRegistry } from "@/registry/index";
import { type Control, playgroundRegistry } from "@/registry/playground";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/registry/sonaui/animated-dropdown/animated-dropdown";
import FluidSlider from "@/registry/sonaui/fluid-slider/fluid-slider";
import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";
import PropTable from "../common/prop-table";
import type { ComponentDocumentationData } from "./component-doc-data";

type DocsPanel = "description" | "source" | "controls" | null;

type FocusDoc = {
  title: string;
  slug: string;
  body: { code: string; raw: string };
  sourceFiles?: Record<string, string>;
};

type Navigation = {
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
};

type Heading = { id: string; text: string; level: number };

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;
type PackageManager = (typeof packageManagers)[number];

function IconButton({
  label,
  active,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors duration-150 ease-out hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-accent text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function DocsNavigation({
  open,
  onOpenChange,
  navigation,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigation: Navigation;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  return (
    <Sheet modal={false} open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="top-16! bottom-2! left-4! z-70! h-auto! w-[min(22rem,calc(100vw-1rem))] rounded-2xl p-0 smooth-shadow-ring-xl! data-[side=left]:border-r-0"
      >
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle>Documentation</SheetTitle>
          <SheetDescription>Browse guides and components</SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col p-4 pt-0">
          <label className="mb-4">
            <span className="sr-only">Filter documentation</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter documentation..."
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </label>
          <nav
            className="min-h-0 flex-1 overflow-y-auto pr-1"
            aria-label="Documentation pages"
          >
            {Object.entries(groupedComponents).map(([group, items]) => {
              const visible = items.filter((item) =>
                [item.name, item.href, group]
                  .join(" ")
                  .toLowerCase()
                  .includes(normalized),
              );
              if (!visible.length) return null;
              return (
                <section key={group} className="mb-5">
                  <h3 className="mb-1.5 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {group}
                  </h3>
                  <div className="grid gap-0.5">
                    {visible.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        onClick={() => onOpenChange(false)}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                          pathname === item.href && "bg-accent text-foreground",
                        )}
                      >
                        {item.name}
                        {item.tag && (
                          <span className="font-mono text-[9px] uppercase">
                            {item.tag}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </nav>
          <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
            {navigation.previous ? (
              <Link
                href={navigation.previous.href}
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <ChevronLeft className="size-4" /> {navigation.previous.title}
              </Link>
            ) : (
              <span />
            )}
            {navigation.next && (
              <Link
                href={navigation.next.href}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-end gap-2 rounded-lg px-2 py-2 text-right text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {navigation.next.title} <ChevronRight className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function useDocumentHeadings(selector: string) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(`${selector} [data-doc-heading]`),
    );
    setHeadings(
      elements
        .filter((heading) => heading.id && heading.textContent)
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent ?? "",
          level: Number(heading.tagName.slice(1)),
        })),
    );
  }, [selector]);
  return headings;
}

function ContentsSheet({
  open,
  onOpenChange,
  headings,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headings: Heading[];
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(22rem,calc(100vw-1rem))] p-0 smooth-shadow-ring-lg! data-[side=right]:border-l-0"
      >
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle>Contents</SheetTitle>
          <SheetDescription>Jump to a section on this page</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-1 overflow-y-auto p-4">
          {headings.map((heading) => (
            <button
              type="button"
              key={heading.id}
              onClick={() => {
                onOpenChange(false);
                requestAnimationFrame(() =>
                  document.getElementById(heading.id)?.scrollIntoView({
                    block: "start",
                  }),
                );
              }}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
                heading.level > 2 && "pl-6",
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function FocusNavigationBar({
  title,
  open,
  onNavigate,
}: {
  title: string;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="pointer-events-auto relative z-[80] flex min-w-0 items-center gap-1 rounded-xl bg-background/90 p-1 text-sm smooth-shadow-ring-sm backdrop-blur-xl">
      <IconButton
        label={
          open
            ? "Close documentation navigation"
            : "Open documentation navigation"
        }
        aria-expanded={open}
        onClick={onNavigate}
      >
        <SidebarToggleIcon open={open} />
      </IconButton>
      <nav
        aria-label="Breadcrumb"
        className="hidden min-w-0 items-center gap-2 pr-2 sm:flex"
      >
        <span className="text-muted-foreground">Docs</span>
        <span className="text-border">/</span>
        <strong className="max-w-44 truncate font-medium">{title}</strong>
      </nav>
    </div>
  );
}

function SidebarToggleIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        key="sidebar-open"
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="m20,3H4c-1.654,0-3,1.346-3,3v12c0,1.654,1.346,3,3,3h16c1.654,0,3-1.346,3-3V6c0-1.654-1.346-3-3-3ZM3,18V6c0-.551.449-1,1-1h11v14H4c-.551,0-1-.449-1-1Z"
          strokeWidth="0"
          fill="#7A7A7A"
        />
      </svg>
    );
  }

  return (
    <svg
      key="sidebar-closed"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <line
        x1="15"
        y1="4"
        x2="15"
        y2="20"
        fill="none"
        stroke="#7A7A7A"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        ry="2"
        transform="translate(24) rotate(90)"
        fill="none"
        stroke="#7A7A7A"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  );
}

function FocusActionsBar({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-auto relative z-[60] ml-auto flex max-w-[calc(100vw-4.75rem)] shrink-0 items-center gap-1 overflow-x-auto rounded-xl bg-background/90 p-1 smooth-shadow-ring-sm backdrop-blur-xl sm:max-w-[72vw]">
      {children}
    </div>
  );
}

function GuidePage({
  doc,
  navigation,
  copyActions,
}: {
  doc: FocusDoc;
  navigation: Navigation;
  copyActions: ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const headings = useDocumentHeadings("[data-guide-document]");
  return (
    <div className="relative flex h-svh overflow-hidden flex-col bg-background">
      <header className="relative z-[70] flex h-16 shrink-0 items-center gap-2 px-2 md:px-4">
        <FocusNavigationBar
          title={doc.title}
          open={navOpen}
          onNavigate={() => setNavOpen(!navOpen)}
        />
        <FocusActionsBar>
          <Link
            href="/"
            aria-label="Home"
            title="Home"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Home className="size-4" />
          </Link>
          <Search compact />
          <IconButton
            label="Open contents"
            onClick={() => setContentsOpen(true)}
          >
            <BookOpenText className="size-4" />
          </IconButton>
          <ModeToggle />
        </FocusActionsBar>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto p-2 pt-0 md:p-4 md:pt-0">
        <article
          data-guide-document
          className="mx-auto min-h-full max-w-[82ch] rounded-2xl bg-card p-5 smooth-shadow-ring-sm md:p-10 lg:p-14"
        >
          <Mdx
            code={doc.body.code}
            headerActions={copyActions}
            sourceFiles={doc.sourceFiles}
          />
        </article>
      </main>
      <DocsNavigation
        open={navOpen}
        onOpenChange={setNavOpen}
        navigation={navigation}
      />
      <ContentsSheet
        open={contentsOpen}
        onOpenChange={setContentsOpen}
        headings={headings}
      />
    </div>
  );
}

function defaultsFor(controls: Control[]) {
  return Object.fromEntries(
    controls.map((control) => [control.prop, control.default]),
  );
}

type DropdownOption = { value: string; label: string; icon?: ReactNode };

function AnimatedSelectDropdown({
  label,
  labelledBy,
  value,
  options,
  onValueChange,
  triggerClassName,
  align = "end",
}: {
  label: string;
  labelledBy?: string;
  value: string;
  options: DropdownOption[];
  onValueChange: (value: string) => void;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
}) {
  const generatedLabelId = useId();
  const labelId = labelledBy ?? generatedLabelId;
  const activeOption =
    options.find((option) => option.value === value) ?? options[0];

  if (!activeOption) return null;

  return (
    <div
      className={cn(
        "min-w-0",
        triggerClassName?.includes("w-full") && "w-full",
      )}
    >
      {!labelledBy && (
        <span id={generatedLabelId} className="sr-only">
          {label}
        </span>
      )}
      <AnimatedDropdown modal={false}>
        <AnimatedDropdownTrigger
          aria-labelledby={labelId}
          className={cn(
            "h-9 max-w-32 justify-between gap-2 bg-muted px-2.5 py-1 text-xs font-normal capitalize text-foreground",
            triggerClassName,
          )}
        >
          {activeOption.icon}
          <span className="truncate">{activeOption.label}</span>
          <AnimatedDropdownTriggerIndicator className="size-3.5" />
        </AnimatedDropdownTrigger>
        <AnimatedDropdownContent
          align={align}
          className="z-60 min-w-[var(--anchor-width)]"
        >
          {options.map((option) => (
            <AnimatedDropdownItem
              key={option.value}
              onClick={() => onValueChange(option.value)}
              icon={
                option.icon ??
                (option.value === activeOption.value ? (
                  <Check className="size-3.5" />
                ) : (
                  <span className="block size-3.5" />
                ))
              }
              className="text-xs"
            >
              <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <span className="truncate">{option.label}</span>
                {option.icon && option.value === activeOption.value && (
                  <Check className="size-3.5 shrink-0" />
                )}
              </span>
            </AnimatedDropdownItem>
          ))}
        </AnimatedDropdownContent>
      </AnimatedDropdown>
    </div>
  );
}

function PackageManagerLogo({ manager }: { manager: PackageManager }) {
  const className = "size-4 shrink-0";
  if (manager === "npm")
    return <NpmIcon aria-hidden="true" className={className} />;
  if (manager === "pnpm")
    return <PnpmIcon aria-hidden="true" className={className} />;
  if (manager === "yarn")
    return <YarnIcon aria-hidden="true" className={className} />;
  return <BunIcon aria-hidden="true" className={className} />;
}

function ExampleSelector({
  examples,
  value,
  onValueChange,
  panel = false,
}: {
  examples: Array<{ name: string }>;
  value: string;
  onValueChange: (value: string) => void;
  panel?: boolean;
}) {
  if (examples.length < 2) return null;

  return (
    <AnimatedSelectDropdown
      label="Preview example"
      value={value}
      options={examples.map((example) => ({
        value: example.name,
        label: example.name,
      }))}
      onValueChange={onValueChange}
      triggerClassName={panel ? "w-full max-w-none" : undefined}
      align={panel ? "start" : "end"}
    />
  );
}

function ControlField({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const id = useId();
  const labelId = `${id}-label`;

  if (control.type === "slider") {
    return (
      <FluidSlider
        label={control.label}
        value={value as number}
        onValueChange={onChange}
        min={control.min}
        max={control.max}
        step={control.step ?? 1}
      />
    );
  }
  return (
    <div className="grid gap-2">
      <label
        id={labelId}
        htmlFor={id}
        className="flex items-center justify-between text-xs font-medium text-muted-foreground"
      >
        <span>{control.label}</span>
      </label>
      {control.type === "toggle" && (
        <Switch.Root
          id={id}
          checked={value as boolean}
          onCheckedChange={(next) => onChange(next)}
          className="flex h-6 w-10 rounded-full bg-muted p-0.5 data-[checked]:bg-foreground"
        >
          <Switch.Thumb className="size-5 rounded-full bg-background transition-transform duration-150 ease-out data-[checked]:translate-x-4 motion-reduce:transition-none" />
        </Switch.Root>
      )}
      {control.type === "select" && (
        <AnimatedSelectDropdown
          label={control.label}
          labelledBy={labelId}
          value={value as string}
          options={control.options}
          onValueChange={onChange}
          triggerClassName="w-full max-w-none border border-border bg-background text-sm"
          align="start"
        />
      )}
      {(control.type === "text" || control.type === "color") && (
        <input
          id={id}
          type={control.type === "color" ? "color" : "text"}
          value={value as string}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 rounded-lg border border-border bg-background px-2 text-sm"
        />
      )}
    </div>
  );
}

function DescriptionPanel({
  doc,
  data,
  copyActions,
}: {
  doc: FocusDoc;
  data: ComponentDocumentationData;
  copyActions: ReactNode;
}) {
  const sections = ["overview", "features", "usage", "props"];
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <div className="h-full overflow-y-auto overscroll-contain p-5 md:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Component details
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            {doc.title}
          </h2>
        </div>
        {copyActions}
      </div>
      <FluidTabs
        tabs={sections.map((section) => ({
          value: section,
          title: section[0]?.toUpperCase() + section.slice(1),
        }))}
        value={activeSection}
        onValueChange={(section) => {
          setActiveSection(section);
          document.getElementById(section)?.scrollIntoView({
            block: "start",
          });
        }}
        size="sm"
        ariaLabel="Component description sections"
        className="mb-6"
      />
      <section id="overview">
        <Mdx
          code={doc.body.code}
          className="max-w-none"
          sourceFiles={doc.sourceFiles}
        />
      </section>
      <section id="usage" className="scroll-mt-16">
        <h2 className="docs-heading docs-heading-h2">Usage</h2>
        <ComponentUsage component={data.component} anatomy={data.usage} />
      </section>
      <section id="props" className="scroll-mt-16">
        <h2 className="docs-heading docs-heading-h2">Props</h2>
        <PropTable data={data.props} />
      </section>
    </div>
  );
}

function sourceFileName(path: string) {
  return path.split("/").pop() ?? path;
}

function sourceHeaderPath(path: string) {
  return path.replace(/^components\/sonaui\//, "");
}

function SourcePanel({
  data,
  selectedFileId,
  activeExampleName,
  onFileChange,
}: {
  data: ComponentDocumentationData;
  selectedFileId: string;
  activeExampleName?: string;
  onFileChange: (id: string | null) => void;
}) {
  const group =
    data.sourceFiles.find((file) => file.id === selectedFileId)?.group ??
    "component";
  const files = data.sourceFiles.filter((file) => file.group === group);
  const selected = files.find((file) => file.id === selectedFileId) ?? files[0];
  const selectGroup = (value: string) => {
    const nextFile =
      value === "example"
        ? data.sourceFiles.find(
            (file) =>
              file.group === value && file.path === `${activeExampleName}.tsx`,
          )
        : undefined;
    const firstFile =
      nextFile ?? data.sourceFiles.find((file) => file.group === value);
    if (firstFile) {
      onFileChange(
        firstFile.id === data.sourceFiles[0]?.id ? null : firstFile.id,
      );
    }
  };
  if (!selected)
    return (
      <div className="p-6 text-sm text-muted-foreground">
        No source files are available.
      </div>
    );
  return (
    <div className="flex h-full min-h-0 flex-col p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Source code
          </span>
        </div>
        <FluidTabs
          tabs={(["component", "example"] as const).map((value) => ({
            value,
            title: value[0].toUpperCase() + value.slice(1),
            disabled: !data.sourceFiles.some((file) => file.group === value),
          }))}
          value={group}
          onValueChange={selectGroup}
          size="sm"
          ariaLabel="Source groups"
        />
      </div>
      <FluidTabs
        tabs={files.map((file) => ({
          value: file.id,
          title: (
            <span className="font-mono text-[11px]">
              {sourceFileName(file.path)}
            </span>
          ),
        }))}
        value={selected.id}
        onValueChange={(fileId) =>
          onFileChange(fileId === data.sourceFiles[0]?.id ? null : fileId)
        }
        variant="underline"
        size="sm"
        ariaLabel={`${group} source files`}
        className="mb-3 w-full"
        listClassName="p-0"
      />
      <CodeBlock
        key={selected.id}
        code={selected.content}
        language={selected.language}
        className="min-h-0 flex-1"
      >
        <CodeBlockHeader filename={sourceHeaderPath(selected.target)} />
        <CodeBlockPre className=" max-h-none">
          <CodeBlockCode />
        </CodeBlockPre>
      </CodeBlock>
    </div>
  );
}

function ControlsPanel({
  controls,
  values,
  examples,
  activeExampleName,
  onExampleChange,
  setValue,
  reset,
  dirty,
}: {
  controls: Control[];
  values: Record<string, unknown>;
  examples: Array<{ name: string }>;
  activeExampleName: string;
  onExampleChange: (value: string) => void;
  setValue: (prop: string, value: unknown) => void;
  reset: () => void;
  dirty: boolean;
}) {
  return (
    <div className="h-full overflow-y-auto p-5 md:p-7">
      <div className="mb-7 flex items-start justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Live controls
          </span>
          <h2 className="mt-2 text-xl font-semibold">Tune the preview</h2>
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={!dirty}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40"
        >
          <RotateCcw className="size-3.5" /> Reset
        </button>
      </div>
      <div className="grid gap-6">
        {examples.length > 1 && (
          <div className="grid gap-2 border-b border-border pb-6">
            <span className="text-xs font-medium text-muted-foreground">
              Demo
            </span>
            <ExampleSelector
              examples={examples}
              value={activeExampleName}
              onValueChange={onExampleChange}
              panel
            />
          </div>
        )}
        {controls.map((control) => (
          <ControlField
            key={control.prop}
            control={control}
            value={values[control.prop]}
            onChange={(value) => setValue(control.prop, value)}
          />
        ))}
      </div>
    </div>
  );
}

function InstallBar({ component }: { component: string }) {
  const [manager, setManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(
      "sona-docs-package-manager",
    ) as PackageManager | null;
    if (saved && packageManagers.includes(saved)) setManager(saved);
  }, []);
  const command =
    manager === "npm"
      ? `npx shadcn@latest add @sona-ui/${component}`
      : manager === "pnpm"
        ? `pnpm dlx shadcn@latest add @sona-ui/${component}`
        : manager === "yarn"
          ? `yarn dlx shadcn@latest add @sona-ui/${component}`
          : `bunx --bun shadcn@latest add @sona-ui/${component}`;
  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="absolute bottom-3 left-1/2 z-3 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center rounded-xl bg-background/90 p-1 smooth-shadow-ring-sm backdrop-blur md:bottom-5">
      <AnimatedSelectDropdown
        label="Package manager"
        value={manager}
        options={packageManagers.map((packageManager) => ({
          value: packageManager,
          label: packageManager,
          icon: <PackageManagerLogo manager={packageManager} />,
        }))}
        onValueChange={(value) => {
          const next = value as PackageManager;
          setManager(next);
          localStorage.setItem("sona-docs-package-manager", next);
        }}
        triggerClassName="h-8 max-w-24 px-2 *:lowercase"
        align="start"
      />
      <code className="max-w-[55vw] overflow-hidden text-ellipsis whitespace-nowrap px-3 font-mono text-[11px] text-muted-foreground md:max-w-none bg-transparent">
        {command}
      </code>
      <IconButton
        label={
          copied ? "Installation command copied" : "Copy installation command"
        }
        onClick={copy}
        className={cn(
          "size-8",
          copied &&
            "bg-green-900/40 text-white hover:bg-green-900/40 focus-visible:ring-success/50",
        )}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </IconButton>
    </div>
  );
}

function ComponentPage({
  doc,
  navigation,
  data,
  copyActions,
}: {
  doc: FocusDoc;
  navigation: Navigation;
  data: ComponentDocumentationData;
  copyActions: ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const [panel, setPanel] = useState<DocsPanel>(null);
  const [renderedPanel, setRenderedPanel] =
    useState<Exclude<DocsPanel, null>>("description");
  const isMobile = useMediaQuery("(max-width: 899px)");
  const reduceMotion = useReducedMotion();
  const registryExamples = exampleRegistry[data.component] ?? [];
  const defaultExample =
    registryExamples.find((example) => example.name === "default") ??
    registryExamples[0];
  const [activeExampleName, setActiveExampleName] = useState(
    defaultExample?.name ?? "",
  );
  const activeExample =
    registryExamples.find((example) => example.name === activeExampleName) ??
    defaultExample;
  const [selectedFileId, setSelectedFileId] = useState(
    data.sourceFiles[0]?.id ?? "",
  );
  const playground = playgroundRegistry[data.component];
  const defaults = useMemo(
    () => defaultsFor(playground?.controls ?? []),
    [playground],
  );
  const [controlValues, setControlValues] =
    useState<Record<string, unknown>>(defaults);
  const [usingPlayground, setUsingPlayground] = useState(false);
  useEffect(() => {
    setControlValues(defaults);
    setUsingPlayground(false);
  }, [defaults]);
  const selectedFile =
    data.sourceFiles.find((file) => file.id === selectedFileId) ??
    data.sourceFiles[0];
  const panelForContent = panel ?? renderedPanel;
  const selectExample = (value: string) => {
    setUsingPlayground(false);
    setActiveExampleName(value);
  };
  const openPanel = (requestedPanel: DocsPanel) => {
    setPanel((current) => {
      const nextPanel = current === requestedPanel ? null : requestedPanel;
      if (nextPanel) setRenderedPanel(nextPanel);
      return nextPanel;
    });
  };
  const panelContent =
    panelForContent === "description" ? (
      <DescriptionPanel doc={doc} data={data} copyActions={copyActions} />
    ) : panelForContent === "source" ? (
      <SourcePanel
        data={data}
        selectedFileId={selectedFile?.id ?? ""}
        activeExampleName={activeExample?.name}
        onFileChange={(file) =>
          setSelectedFileId(file ?? data.sourceFiles[0]?.id ?? "")
        }
      />
    ) : panelForContent === "controls" && playground ? (
      <ControlsPanel
        controls={playground.controls}
        values={controlValues}
        examples={registryExamples}
        activeExampleName={activeExample?.name ?? ""}
        onExampleChange={selectExample}
        setValue={(prop, value) => {
          setUsingPlayground(true);
          setControlValues((current) => ({ ...current, [prop]: value }));
        }}
        reset={() => {
          setControlValues(defaults);
          setUsingPlayground(true);
        }}
        dirty={playground.controls.some(
          (control) => controlValues[control.prop] !== defaults[control.prop],
        )}
      />
    ) : null;
  const preview =
    usingPlayground && playground ? (
      playground.render(controlValues)
    ) : activeExample ? (
      <activeExample.component />
    ) : (
      <p className="text-sm text-muted-foreground">Preview unavailable.</p>
    );

  return (
    <div className="relative flex h-svh overflow-hidden flex-col bg-background">
      <header className="relative z-[70] flex h-16 shrink-0 items-center gap-2 px-2 md:px-4">
        <FocusNavigationBar
          title={doc.title}
          open={navOpen}
          onNavigate={() => setNavOpen(!navOpen)}
        />
        <FocusActionsBar>
          <Link
            href="/"
            aria-label="Home"
            title="Home"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Home className="size-4" />
          </Link>
          <Search compact />
          <IconButton
            label="Description"
            active={panel === "description"}
            onClick={() => openPanel("description")}
          >
            <BookOpenText className="size-4" />
          </IconButton>
          {data.hasPlayground && (
            <IconButton
              label="Controls"
              active={panel === "controls"}
              onClick={() => openPanel("controls")}
            >
              <Settings2 className="size-4" />
            </IconButton>
          )}
          <IconButton
            label="Source"
            active={panel === "source"}
            onClick={() => openPanel("source")}
          >
            <Code2 className="size-4" />
          </IconButton>
          <ModeToggle />
        </FocusActionsBar>
      </header>
      <main className="flex min-h-0 flex-1 p-2 pt-0 md:p-4 md:pt-0">
        <motion.section
          layout={!reduceMotion}
          transition={{
            duration: reduceMotion ? 0 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative grid h-full min-h-0 min-w-0 flex-1 place-items-center overflow-hidden rounded-2xl bg-card smooth-shadow-ring-md"
        >
          <div className="flex min-h-0 w-full items-center justify-center overflow-auto p-6 pb-20 md:p-10 md:pb-24">
            {preview}
          </div>
          <InstallBar component={data.component} />
        </motion.section>
        {!isMobile && (
          <motion.aside
            initial={false}
            animate={
              panel
                ? {
                    x: 0,
                    width: "clamp(22rem, 42vw, 34rem)",
                    marginLeft: "0.75rem",
                  }
                : { x: 16, width: 0, marginLeft: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
            aria-hidden={!panel}
            inert={!panel}
            className="h-full min-h-0 shrink-0 overflow-hidden rounded-2xl bg-card smooth-shadow-ring-md"
          >
            {panelContent}
          </motion.aside>
        )}
      </main>
      <Drawer
        open={Boolean(panel && isMobile)}
        onOpenChange={(open) => {
          if (!open) setPanel(null);
        }}
        showSwipeHandle
        swipeDirection="down"
      >
        <DrawerContent className="inset-x-2! bottom-2! h-[min(82svh,46rem)]! max-h-[calc(100dvh-1rem)]! rounded-2xl border-0! bg-card p-0 smooth-shadow-ring-md! sm:inset-x-4! sm:bottom-4!">
          <DrawerHeader className="sr-only">
            <DrawerTitle>
              {panelForContent === "source"
                ? "Source code"
                : panelForContent === "controls"
                  ? "Component controls"
                  : "Component description"}
            </DrawerTitle>
            <DrawerDescription>
              Documentation panel for {doc.title}
            </DrawerDescription>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {panelContent}
          </div>
        </DrawerContent>
      </Drawer>
      <DocsNavigation
        open={navOpen}
        onOpenChange={setNavOpen}
        navigation={navigation}
      />
    </div>
  );
}

export function DocsFocusShell({
  doc,
  navigation,
  componentData,
}: {
  doc: FocusDoc;
  navigation: Navigation;
  componentData?: ComponentDocumentationData | null;
}) {
  const url = `${SITE_METADATA.siteLink}/docs/${doc.slug}`;
  const copyActions = (
    <DocsCopyPage
      page={doc.body.raw}
      url={url}
      mdUrl={`/api/md?slug=${encodeURIComponent(doc.slug)}`}
      className="shrink-0"
    />
  );
  return componentData ? (
    <ComponentPage
      doc={doc}
      navigation={navigation}
      data={componentData}
      copyActions={copyActions}
    />
  ) : (
    <GuidePage doc={doc} navigation={navigation} copyActions={copyActions} />
  );
}
