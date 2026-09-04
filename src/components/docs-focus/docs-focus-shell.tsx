"use client";

import { Switch } from "@base-ui/react/switch";
import {
  BookOpenText,
  Check,
  Code2,
  Copy,
  Home,
  RotateCcw,
  Settings2,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "@/components/common/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useId, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
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
import { useDocsFocusPanelState } from "@/components/docs-layout-shell";
import { Search } from "@/components/Search";
import { BunIcon } from "@/components/svgs/bun-logo";
import { NpmIcon } from "@/components/svgs/npm-logo";
import { PnpmIcon } from "@/components/svgs/pnpm-logo";
import { YarnIcon } from "@/components/svgs/yarn-logo";
import { groupedComponents } from "@/config/components";
import { SITE_METADATA } from "@/config/site";
import { GIT_REP_LINK } from "@/lib/constants";
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
import FluidTooltip from "@/registry/sonaui/fluid-tooltip/fluid-tooltip";
import type { ComponentDocumentationData } from "./component-doc-data";
import { DescriptionPanel } from "./description-panel";
import { DesktopDocsSidebar } from "./desktop-docs-sidebar";
import type { FocusDoc, Navigation } from "./docs-focus-types";
import { SourcePanel } from "./source-panel";

type Heading = { id: string; text: string; level: number };

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;
type PackageManager = (typeof packageManagers)[number];

export function IconButton({
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
        "grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors duration-150 ease-out hover:cursor-pointer hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35",
        active && "bg-accent text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function FocusActionTooltip({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <FluidTooltip.Root id={id} side="bottom">
      <FluidTooltip.Trigger>
        <span className="inline-flex">{children}</span>
      </FluidTooltip.Trigger>
      <FluidTooltip.Content>{label}</FluidTooltip.Content>
    </FluidTooltip.Root>
  );
}

function DocsNavigation({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  return (
    <Sheet modal={false} open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="top-2! bottom-2! left-2! z-70! h-auto! w-[min(22rem,calc(100vw-1rem))] rounded-[22px] border-0! bg-focus-canvas p-0 smooth-shadow-ring-xl! data-[side=left]:border-r-0 gap-0!"
      >
        <SheetHeader className="pt-20 px-5">
          <SheetTitle>Documentation</SheetTitle>
          <SheetDescription>Browse guides and components</SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col px-5  ">
          <label className="mb-4 shrink-0">
            <span className="sr-only">Filter documentation</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter documentation..."
              className="h-10 w-full rounded-lg border border-transparent bg-focus-panel px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="relative min-h-0 flex-1 overflow-hidden pt-2">
            <nav
              className="h-full overflow-y-auto [scrollbar-color:var(--color-scrollbar)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-scrollbar [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1"
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
                    <h3 className="mb-1.5 text-sm text-muted-foreground">
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
                          onClick={(event) => {
                            onOpenChange(false);

                            if (pathname === item.href) {
                              event.preventDefault();
                            }
                          }}
                          className={cn(
                            "relative flex items-center justify-between rounded-lg py-1.5 pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground before:absolute before:top-1/2 before:left-0 before:h-4 before:w-px before:-translate-y-1/2 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity",
                            pathname === item.href &&
                              "font-medium text-foreground before:opacity-100",
                          )}
                        >
                          {item.name}
                          {item.tag && (
                            <>
                              <span className="sr-only">{item.tag}</span>
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "size-1.5 shrink-0 rounded-full",
                                  item.tag === "new" && "bg-success",
                                  item.tag === "updated" && "bg-info",
                                  !["new", "updated"].includes(item.tag) &&
                                    "bg-muted-foreground",
                                )}
                              />
                            </>
                          )}
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </nav>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-focus-canvas to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-focus-canvas to-transparent"
            />
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
  const [activeHeadingId, setActiveHeadingId] = useState<string>();

  useEffect(() => {
    if (!open || headings.length === 0) return;

    setActiveHeadingId(headings[0]?.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (activeEntry) setActiveHeadingId(activeEntry.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="z-[110]! w-[min(22rem,calc(100vw-1rem))] gap-0 border-0! bg-focus-canvas p-0 smooth-shadow-ring-lg! data-[side=left]:border-r-0"
      >
        <SheetHeader className="relative px-6 pt-7 pr-16 pb-5">
          <SheetTitle className="text-lg font-semibold tracking-tight">
            On this page
          </SheetTitle>
          <SheetDescription>Jump to a section on this page</SheetDescription>
        </SheetHeader>
        <div className="relative min-h-0 flex-1">
          <nav
            aria-label="Table of contents"
            className="grid h-full gap-1 overflow-y-auto px-3 py-3 scrollbar-thin"
          >
            {headings.map((heading) => {
              const active = activeHeadingId === heading.id;
              return (
                <button
                  type="button"
                  key={heading.id}
                  aria-current={active ? "location" : undefined}
                  onClick={() => {
                    onOpenChange(false);
                    requestAnimationFrame(() =>
                      document.getElementById(heading.id)?.scrollIntoView({
                        block: "start",
                        behavior: "smooth",
                      }),
                    );
                  }}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors duration-150 hover:bg-accent/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    heading.level > 2 && "pl-6",
                    active &&
                      "font-medium text-foreground before:absolute before:inset-y-2 before:left-0 before:w-px before:rounded-full before:bg-primary",
                  )}
                >
                  {heading.text}
                </button>
              );
            })}
          </nav>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-focus-canvas to-transparent"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FocusNavigationBar({
  open,
  onNavigate,
  className,
}: {
  open: boolean;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-auto fixed top-5 left-6 z-[80] flex min-w-0 items-center gap-1 rounded-xl bg-focus-chrome p-1 text-sm smooth-shadow-ring-sm backdrop-blur-xl lg:top-8 lg:left-10",
        className,
      )}
    >
      <IconButton
        label={
          open
            ? "Close documentation navigation"
            : "Open documentation navigation"
        }
        aria-expanded={open}
        onClick={onNavigate}
        className="hover:cursor-pointer"
      >
        <SidebarToggleIcon open={open} />
      </IconButton>
      {/*<nav
        aria-label="Breadcrumb"
        className="hidden min-w-0 items-center gap-2 pr-2 sm:flex"
      >
        <span className="text-muted-foreground">Docs</span>
        <span className="text-border">/</span>
        <strong className="max-w-44 truncate font-medium">{title}</strong>
      </nav>*/}
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

export function FocusActionsBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <FluidTooltip.Group orientation="horizontal">
      <div
        className={cn(
          "pointer-events-auto fixed top-5 right-4 z-[60] ml-auto flex max-w-[calc(100vw-4.75rem)] shrink-0 items-center gap-1 overflow-x-auto rounded-xl bg-focus-chrome p-1 smooth-shadow-ring-sm backdrop-blur-xl sm:max-w-[72vw] lg:top-8 lg:right-8",
          className,
        )}
      >
        {children}
      </div>
    </FluidTooltip.Group>
  );
}

function GuidePage({
  doc,
  copyActions,
}: {
  doc: FocusDoc;
  navigation: Navigation;
  copyActions: ReactNode;
}) {
  const { navOpen, setNavOpen, mobileMatch } = useDocsFocusPanelState();
  const [contentsOpen, setContentsOpen] = useState(false);
  const isMobile = mobileMatch === true;
  const isDesktop = mobileMatch === false;
  const reduceMotion = useReducedMotion();
  const desktopNavOpen = navOpen && isDesktop;
  const headings = useDocumentHeadings("[data-guide-document]");
  return (
    <div className="relative h-svh overflow-hidden bg-focus-canvas">
      <header className="pointer-events-none absolute inset-x-2 top-2 z-[100] flex items-center gap-2 md:inset-x-4 md:top-4">
        <FocusNavigationBar
          open={navOpen}
          onNavigate={() => setNavOpen(!navOpen)}
        />
        {!contentsOpen && (
          <FocusActionsBar>
            <Link
              href="/"
              aria-label="Home"
              title="Home"
              className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:cursor-pointer hover:bg-accent hover:text-foreground"
            >
              <Home className="size-4" />
            </Link>
            <Search compact />
            {isMobile && (
              <IconButton
                label="Open contents"
                onClick={() => setContentsOpen(true)}
              >
                <BookOpenText className="size-4" />
              </IconButton>
            )}
            <ModeToggle />
          </FocusActionsBar>
        )}
      </header>
      <main
        className={cn(
          "flex h-full min-h-0 p-2 min-[900px]:grid min-[900px]:grid-cols-[0px_minmax(0,1fr)] min-[900px]:transition-[grid-template-columns] min-[900px]:duration-500 min-[900px]:ease-[cubic-bezier(0.22,1,0.36,1)] md:p-4",
          desktopNavOpen &&
            "min-[900px]:grid-cols-[calc(clamp(16rem,24vw,18rem)+0.75rem)_minmax(0,1fr)]",
        )}
      >
        {isDesktop && (
          <div className="min-w-0 overflow-hidden bg-focus-canvas">
            <motion.div
              initial={false}
              animate={{ x: desktopNavOpen ? 0 : -340 }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: reduceMotion ? 0 : 0.48,
              }}
              aria-hidden={!desktopNavOpen}
              inert={!desktopNavOpen}
              className="h-full w-[clamp(16rem,24vw,18rem)] bg-focus-canvas will-change-transform"
            >
              <DesktopDocsSidebar />
            </motion.div>
          </div>
        )}
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto smooth-shadow-ring-sm rounded-[22px]">
          <section
            data-guide-document
            className="min-h-full w-full rounded-2xl bg-card p-5 pt-22 smooth-shadow-ring-sm md:p-10 md:pt-16 lg:p-14 lg:pt-16"
          >
            <div className="mx-auto max-w-[82ch]">
              <Mdx
                code={doc.body.code}
                className={cn(
                  "docs-guide-prose",
                  doc.slug === "changelog" && "docs-changelog-prose",
                )}
                headerActions={copyActions}
                sourceFiles={doc.sourceFiles}
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-focus-panel lg:from-background to-transparent"
            />
          </section>
        </div>
      </main>
      {isMobile && <DocsNavigation open={navOpen} onOpenChange={setNavOpen} />}
      {isMobile && (
        <ContentsSheet
          open={contentsOpen}
          onOpenChange={setContentsOpen}
          headings={headings}
        />
      )}
    </div>
  );
}

function defaultsFor(controls: Control[]) {
  return Object.fromEntries(
    controls.map((control) => [control.prop, control.default]),
  );
}

type DropdownOption = { value: string; label: string; icon?: ReactNode };
type DropdownAppearance = "compact" | "control";

function AnimatedSelectDropdown({
  label,
  labelledBy,
  value,
  options,
  onValueChange,
  triggerClassName,
  align = "end",
  appearance = "compact",
}: {
  label: string;
  labelledBy?: string;
  value: string;
  options: DropdownOption[];
  onValueChange: (value: string) => void;
  triggerClassName?: string;
  align?: "start" | "center" | "end";
  appearance?: DropdownAppearance;
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
            "h-9 max-w-32 justify-between gap-2 bg-popover/20 px-2.5 py-1 text-xs font-normal capitalize text-foreground",
            appearance === "control" &&
              "h-10 max-w-none rounded-lg border border-border bg-focus-panel px-3 text-sm normal-case hover:bg-popover data-[popup-open]:bg-muted",
            triggerClassName,
          )}
        >
          {activeOption.icon}
          <span className="truncate">{activeOption.label}</span>
          <AnimatedDropdownTriggerIndicator className="size-3.5" />
        </AnimatedDropdownTrigger>
        <AnimatedDropdownContent
          align={align}
          className={cn(
            "z-60 min-w-[var(--anchor-width)]",
            appearance === "control" &&
              "rounded-xl border-border bg-focus-overlay p-1",
          )}
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
              className={cn(
                "text-xs",
                appearance === "control" && "px-2.5 py-2 text-sm",
              )}
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
      appearance={panel ? "control" : "compact"}
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
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <span>{control.label}</span>
      </label>
      {control.type === "toggle" && (
        <Switch.Root
          id={id}
          checked={value as boolean}
          onCheckedChange={(next) => onChange(next)}
          className="flex h-6 w-10 rounded-full bg-focus-panel p-0.5 data-[checked]:bg-foreground"
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
          triggerClassName="w-full"
          align="start"
          appearance="control"
        />
      )}
      {(control.type === "text" || control.type === "color") && (
        <input
          id={id}
          type={control.type === "color" ? "color" : "text"}
          value={value as string}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 rounded-lg border border-border bg-focus-panel px-3 text-sm"
        />
      )}
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
    <div className="h-full overflow-y-auto px-4">
      <div className="mb-7 flex items-start justify-between pt-4 md:pt-32">
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
            <span className="text-sm text-muted-foreground">Demo</span>
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
    <div className="docs-zen-install-command absolute bottom-3 left-1/2 z-3 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center rounded-xl bg-focus-chrome p-1 smooth-shadow-ring-sm backdrop-blur md:bottom-5">
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
        className={cn("size-8")}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </IconButton>
    </div>
  );
}

function ComponentPage({
  doc,
  data,
  copyActions,
}: {
  doc: FocusDoc;
  navigation: Navigation;
  data: ComponentDocumentationData;
  copyActions: ReactNode;
}) {
  const {
    navOpen,
    setNavOpen,
    documentOpen,
    setDocumentOpen,
    toolDrawer,
    setToolDrawer,
    mobileMatch,
  } = useDocsFocusPanelState();
  const isMobile = mobileMatch === true;
  const isDesktop = mobileMatch === false;
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
  const selectExample = (value: string) => {
    setUsingPlayground(false);
    setActiveExampleName(value);
  };
  const desktopDocumentOpen = documentOpen && isDesktop;
  const desktopNavOpen = navOpen && isDesktop;
  const toggleControls = () => {
    if (toolDrawer === "controls") {
      setToolDrawer(null);
      return;
    }
    if (isMobile) setDocumentOpen(false);
    if (isDesktop && !documentOpen) setDocumentOpen(true);
    setToolDrawer("controls");
  };
  const toggleSource = () => {
    if (toolDrawer === "source") {
      setToolDrawer(null);
      return;
    }
    if (isMobile) setDocumentOpen(false);
    if (isDesktop && !documentOpen) setDocumentOpen(true);
    setToolDrawer("source");
  };
  const toolPanelContent =
    toolDrawer === "controls" && playground ? (
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
    ) : toolDrawer === "source" ? (
      <SourcePanel
        data={data}
        selectedFileId={selectedFile?.id ?? ""}
        activeExampleName={activeExample?.name}
        onFileChange={(file) =>
          setSelectedFileId(file ?? data.sourceFiles[0]?.id ?? "")
        }
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
    <div className="relative h-svh overflow-hidden bg-focus-canvas">
      <header className="pointer-events-none absolute inset-x-2 top-2 z-[100] flex items-center gap-2 md:inset-x-4 md:top-4">
        <FocusNavigationBar
          open={navOpen}
          onNavigate={() => setNavOpen(!navOpen)}
          className="docs-zen-sidebar-toggle"
        />
        <FocusActionsBar className="docs-zen-controls">
          <FocusActionTooltip id="focus-home" label="Home">
            <Link
              href="/"
              aria-label="Home"
              className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:cursor-pointer hover:bg-accent hover:text-foreground"
            >
              <Home className="size-4" />
            </Link>
          </FocusActionTooltip>
          <FocusActionTooltip id="focus-search" label="Search">
            <Search compact />
          </FocusActionTooltip>
          <FocusActionTooltip id="focus-github" label="View on GitHub">
            <a
              href={GIT_REP_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="View Sona UI on GitHub"
              className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors duration-150 ease-out hover:cursor-pointer hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FaGithub className="size-4" aria-hidden="true" />
            </a>
          </FocusActionTooltip>
          <FocusActionTooltip id="focus-description" label="Description">
            <IconButton
              label="Description"
              active={documentOpen && !toolDrawer}
              onClick={() => {
                if (isMobile) {
                  setToolDrawer(null);
                  setDocumentOpen(!documentOpen);
                  return;
                }
                if (documentOpen) {
                  setToolDrawer(null);
                }
                setDocumentOpen(!documentOpen);
              }}
            >
              <BookOpenText className="size-4" />
            </IconButton>
          </FocusActionTooltip>
          {data.hasPlayground && (
            <FocusActionTooltip id="focus-controls" label="Controls">
              <IconButton
                label="Controls"
                active={toolDrawer === "controls"}
                onClick={toggleControls}
              >
                <Settings2 className="size-4" />
              </IconButton>
            </FocusActionTooltip>
          )}
          <FocusActionTooltip id="focus-source" label="Source">
            <IconButton
              label="Source"
              active={toolDrawer === "source"}
              onClick={toggleSource}
            >
              <Code2 className="size-4" />
            </IconButton>
          </FocusActionTooltip>
          <FocusActionTooltip id="focus-theme" label="Toggle theme">
            <ModeToggle />
          </FocusActionTooltip>
        </FocusActionsBar>
      </header>
      <main
        className={cn(
          "flex h-full min-h-0 p-2 min-[900px]:grid min-[900px]:grid-cols-[0px_minmax(0,1fr)_0px] min-[900px]:transition-[grid-template-columns] min-[900px]:duration-500 min-[900px]:ease-[cubic-bezier(0.22,1,0.36,1)] md:p-4",
          desktopNavOpen &&
            "min-[900px]:grid-cols-[calc(clamp(16rem,24vw,18rem)+0.75rem)_minmax(0,1fr)_0px]",
          desktopDocumentOpen &&
            "min-[900px]:grid-cols-[0px_minmax(0,1fr)_calc(clamp(20rem,34vw,28rem)+0.75rem)]",
          desktopNavOpen &&
            desktopDocumentOpen &&
            "min-[900px]:grid-cols-[calc(clamp(16rem,24vw,18rem)+0.75rem)_minmax(0,1fr)_calc(clamp(20rem,34vw,28rem)+0.75rem)]",
        )}
      >
        {isDesktop && (
          <div className="min-w-0 overflow-hidden bg-focus-canvas">
            <motion.div
              initial={false}
              animate={{ x: desktopNavOpen ? 0 : -340 }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: reduceMotion ? 0 : 0.48,
              }}
              aria-hidden={!navOpen}
              inert={!navOpen}
              className="h-full w-[clamp(16rem,24vw,18rem)] bg-focus-canvas will-change-transform"
            >
              <DesktopDocsSidebar />
            </motion.div>
          </div>
        )}
        <motion.section
          layout={isDesktop && !reduceMotion}
          transition={{
            duration: reduceMotion ? 0 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative grid h-full min-h-0 min-w-0 flex-1 place-items-center overflow-hidden rounded-[22px] bg-focus-panel smooth-shadow-ring-md"
        >
          <div
            data-component-preview
            className="flex min-h-0 w-full items-center justify-center h-full"
          >
            {preview}
          </div>
          <InstallBar component={data.component} />
        </motion.section>
        {isDesktop && (
          <div className="min-w-0 overflow-hidden pl-3">
            <motion.aside
              initial={false}
              animate={{ x: desktopDocumentOpen ? 0 : 600 }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: reduceMotion ? 0 : 0.48,
              }}
              aria-hidden={!documentOpen}
              inert={!documentOpen}
              className="relative h-full w-[clamp(20rem,34vw,28rem)] overflow-hidden rounded-[22px]    will-change-transform"
            >
              <DescriptionPanel
                doc={doc}
                data={data}
                copyActions={copyActions}
              />
              <motion.div
                initial={false}
                animate={{ y: toolDrawer ? 0 : "110%" }}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: reduceMotion ? 0 : 0.32,
                }}
                aria-hidden={!toolDrawer}
                inert={!toolDrawer}
                className="absolute inset-0 z-10 overflow-y-auto bg-focus-overlay smooth-shadow-ring-md rounded-[22px]"
              >
                {toolPanelContent}
              </motion.div>
            </motion.aside>
          </div>
        )}
      </main>
      <Drawer
        open={documentOpen && isMobile}
        onOpenChange={(open) => {
          if (!open) setDocumentOpen(false);
        }}
        showSwipeHandle
        swipeDirection="down"
      >
        <DrawerContent className="inset-x-2! bottom-2! h-[min(82svh,46rem)]! max-h-[calc(100dvh-1rem)]! rounded-[22px] border-0! bg-focus-panel p-0 smooth-shadow-ring-md! sm:inset-x-4! sm:bottom-4!">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Component description</DrawerTitle>
            <DrawerDescription>
              Documentation panel for {doc.title}
            </DrawerDescription>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <DescriptionPanel doc={doc} data={data} copyActions={copyActions} />
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        modal={false}
        open={Boolean(toolDrawer && isMobile)}
        onOpenChange={(open) => {
          if (!open) setToolDrawer(null);
        }}
        showSwipeHandle
        swipeDirection="down"
      >
        <DrawerContent className="inset-x-2! bottom-2! z-[60]! h-[min(82svh,46rem)]! max-h-[calc(100dvh-1rem)]! rounded-[22px] border-0! bg-focus-overlay p-0 smooth-shadow-ring-lg! sm:inset-x-4! sm:bottom-4!">
          <DrawerHeader className="sr-only">
            <DrawerTitle>
              {toolDrawer === "source" ? "Source code" : "Component controls"}
            </DrawerTitle>
            <DrawerDescription>
              Documentation panel for {doc.title}
            </DrawerDescription>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {toolPanelContent}
          </div>
        </DrawerContent>
      </Drawer>
      {isMobile && <DocsNavigation open={navOpen} onOpenChange={setNavOpen} />}
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
