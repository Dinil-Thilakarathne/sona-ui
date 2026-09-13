"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { Mdx } from "@/components/common/mdx-components";
import { Sheet, SheetContent } from "@/components/common/sheet";
import { ComponentShowcaseCard } from "@/components/component-showcase/component-showcase-card";
import { ComponentShowcaseRegistryPreview } from "@/components/component-showcase/component-showcase-registry-preview";
import { DocsCopyPage } from "@/components/docs-copy-page/docs-copy-page";
import { ComponentFeedback } from "@/components/docs-focus/component-feedback";
import { useDocsFocusPanelState } from "@/components/docs-layout-shell";
import { componentShowcaseVideos } from "@/config/component-showcase";
import { componentNavigationLinks } from "@/config/components";
import { SITE_METADATA } from "@/config/site";
import { cn } from "@/lib/utils";
import FluidTooltip from "@/registry/sonaui/fluid-tooltip/fluid-tooltip";
import type { ComponentDocumentationData } from "./component-doc-data";
import { DescriptionPanel } from "./description-panel";
import { DesktopDocsSidebar } from "./desktop-docs-sidebar";
import type { FocusDoc, Navigation } from "./docs-focus-types";

type Heading = { id: string; text: string; level: number };

function getRelatedComponents(component: string) {
  const current = componentNavigationLinks.find(
    (item) => item.slug === component,
  );
  if (!current) return [];

  const candidates = componentNavigationLinks.filter(
    (item) =>
      item.slug &&
      item.slug !== component &&
      item.type === current.type &&
      item.type !== "Getting Started",
  );
  const fallback = componentNavigationLinks.filter(
    (item) =>
      item.slug &&
      item.slug !== component &&
      item.type !== "Getting Started" &&
      !candidates.some((candidate) => candidate.slug === item.slug),
  );

  return [...candidates, ...fallback].slice(0, 2).map((item) => ({
    name: item.name,
    slug: item.slug ?? item.name,
    href: item.href,
    category: item.type,
    tag: item.tag,
    video: item.slug ? componentShowcaseVideos[item.slug] : undefined,
  }));
}

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
          "pointer-events-auto fixed top-5 right-4 z-[60] ml-auto flex max-w-[calc(100vw-4.75rem)] shrink-0 items-center gap-1 overflow-x-auto rounded-xl bg-focus-chrome p-1 smooth-shadow-ring-sm backdrop-blur-xl sm:max-w-[72vw] min-[900px]:top-8 min-[900px]:right-8",
          className,
        )}
      >
        {children}
      </div>
    </FluidTooltip.Group>
  );
}

function DocsNavigation({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet modal={false} open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="top-2! bottom-2! left-2! z-70! h-auto! w-[min(22rem,calc(100vw-1rem))] rounded-[22px] border-0! bg-focus-canvas p-0 smooth-shadow-ring-xl! data-[side=left]:border-r-0 gap-0!"
      >
        <DesktopDocsSidebar onNavigate={() => onOpenChange(false)} />
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

function ComponentContentsRail({
  headings,
  scrollElement,
}: {
  headings: Heading[];
  scrollElement: HTMLElement | null;
}) {
  const [activeHeadingId, setActiveHeadingId] = useState<string>();

  useEffect(() => {
    if (!scrollElement || headings.length === 0) return;

    const syncActiveHeading = () => {
      const rootTop = scrollElement.getBoundingClientRect().top;
      const readingLine =
        rootTop + Math.max(88, scrollElement.clientHeight * 0.2);
      let nextActiveHeadingId = headings[0]?.id;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= readingLine) {
          nextActiveHeadingId = heading.id;
        } else {
          break;
        }
      }

      setActiveHeadingId((current) =>
        current === nextActiveHeadingId ? current : nextActiveHeadingId,
      );
    };

    syncActiveHeading();
    scrollElement.addEventListener("scroll", syncActiveHeading, {
      passive: true,
    });
    window.addEventListener("resize", syncActiveHeading);

    return () => {
      scrollElement.removeEventListener("scroll", syncActiveHeading);
      window.removeEventListener("resize", syncActiveHeading);
    };
  }, [headings, scrollElement]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden min-[1280]:block min-w-0 border-l border-border bg-focus-canvas px-5 py-28">
      <nav aria-label="Table of contents" className="sticky top-8">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          On this page
        </p>
        <div className="grid gap-1">
          {headings.map((heading) => {
            const active = activeHeadingId === heading.id;
            return (
              <button
                type="button"
                key={heading.id}
                aria-current={active ? "location" : undefined}
                onClick={() => {
                  const element = document.getElementById(heading.id);
                  if (!element || !scrollElement) return;
                  const offset =
                    element.getBoundingClientRect().top -
                    scrollElement.getBoundingClientRect().top;
                  scrollElement.scrollTo({
                    top: scrollElement.scrollTop + offset - 40,
                    behavior: "smooth",
                  });
                }}
                className={cn(
                  "relative rounded-md px-2 py-1.5 text-left text-sm leading-snug text-muted-foreground transition-colors duration-150 hover:bg-accent/70 hover:text-foreground hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  heading.level === 3 && "pl-4",
                  heading.level >= 4 && "pl-6",
                  active && "font-medium text-foreground",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="docs-toc-active-indicator"
                    className="absolute inset-0 rounded-md bg-accent/50 before:absolute before:inset-y-1.5 before:left-0 before:w-px before:rounded-full before:bg-primary"
                    transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{heading.text}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
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
        "pointer-events-auto fixed top-5 left-6 z-[80] flex min-w-0 items-center gap-1 rounded-xl bg-focus-chrome p-1 text-sm smooth-shadow-ring-sm backdrop-blur-xl min-[900px]:top-8 min-[900px]:left-10",
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

function GuidePage({
  doc,
  copyActions,
}: {
  doc: FocusDoc;
  navigation: Navigation;
  copyActions: ReactNode;
}) {
  const { navOpen, setNavOpen, mobileMatch } = useDocsFocusPanelState();
  const isMobile = mobileMatch === true;
  const isDesktop = mobileMatch === false;
  const reduceMotion = useReducedMotion();
  // Reserve the desktop sidebar column until the media query resolves so the
  // article does not shift during the first client render.
  const desktopNavOpen = isDesktop || mobileMatch === null;
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);
  const headings = useDocumentHeadings("[data-guide-document]");
  const tableOfContents =
    doc.slug === "changelog"
      ? headings.filter((heading) => heading.level === 2)
      : headings;
  useEffect(() => {
    if (isDesktop) setNavOpen(true);
  }, [isDesktop, setNavOpen]);
  return (
    <div className="relative h-full overflow-hidden bg-focus-canvas">
      <header className="pointer-events-none absolute inset-x-2 top-2 z-[100] flex items-center gap-2 md:inset-x-4 md:top-4">
        {mobileMatch !== false && (
          <FocusNavigationBar
            open={navOpen}
            onNavigate={() => setNavOpen(!navOpen)}
            className="min-[900px]:hidden !top-auto !bottom-5 !left-5 !z-[120]"
          />
        )}
      </header>
      <main
        className={cn(
          "grid h-full min-h-0 grid-cols-1 bg-focus-canvas",
          desktopNavOpen
            ? "min-[900px]:grid-cols-[17rem_minmax(0,1fr)] min-[1100px]:grid-cols-[17rem_minmax(0,1fr)_17rem]"
            : "min-[1100px]:grid-cols-[0px_minmax(0,1fr)_17rem]",
        )}
      >
        {isDesktop && (
          <div className="min-w-0 overflow-hidden border-r border-border bg-focus-canvas">
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
              className="h-full w-full bg-focus-canvas will-change-transform"
            >
              <DesktopDocsSidebar />
            </motion.div>
          </div>
        )}
        <div
          ref={setScrollElement}
          className="apple-scrollbar min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto w-full  "
        >
          <section
            data-guide-document
            className="site-grid-frame min-h-full pt-2 md:p-10 md:pt-16 lg:p-14 lg:pt-16 mobile:pb-8 max-w-(--site-grid-max-width) max-lg:mx-auto xl:mx-auto w-full  mobile:mx-0 "
          >
            <div className="site-grid-frame__content mx-auto max-w-[82ch] px-2 w-full">
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
          </section>
        </div>
        <ComponentContentsRail
          headings={tableOfContents}
          scrollElement={scrollElement}
        />
      </main>
      {isMobile && <DocsNavigation open={navOpen} onOpenChange={setNavOpen} />}
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
  const { navOpen, setNavOpen, mobileMatch } = useDocsFocusPanelState();
  const isDesktop = mobileMatch === false;
  const desktopLayoutOpen = isDesktop || mobileMatch === null;
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);
  const headings = useDocumentHeadings("[data-component-document]");
  useEffect(() => {
    if (isDesktop) setNavOpen(true);
  }, [isDesktop, setNavOpen]);
  return (
    <div className="relative h-full overflow-hidden bg-focus-canvas">
      <header className="pointer-events-none absolute inset-x-2 top-2 z-[100] flex items-center gap-2 md:inset-x-4 md:top-4">
        {mobileMatch !== false && (
          <FocusNavigationBar
            open={navOpen}
            onNavigate={() => setNavOpen(!navOpen)}
            className="docs-zen-sidebar-toggle min-[900px]:hidden !top-auto !bottom-5 !left-5 !z-[120]"
          />
        )}
      </header>
      <main
        className={cn(
          "grid h-full min-h-0 grid-cols-1 bg-focus-canvas",
          desktopLayoutOpen
            ? "min-[900px]:grid-cols-[17rem_minmax(0,1fr)] min-[1280px]:grid-cols-[17rem_minmax(0,1fr)_17rem]"
            : "min-[900px]:grid-cols-[0px_minmax(0,1fr)] min-[1100px]:grid-cols-[0px_minmax(0,1fr)_17rem]",
        )}
      >
        {(isDesktop || mobileMatch === null) && (
          <aside
            aria-hidden={!desktopLayoutOpen}
            inert={!desktopLayoutOpen}
            className={cn(
              "hidden min-w-0 overflow-hidden border-r border-border bg-focus-canvas min-[900px]:block",
              desktopLayoutOpen ? "w-full opacity-100" : "w-0 opacity-0",
            )}
          >
            <DesktopDocsSidebar />
          </aside>
        )}
        <article
          ref={setScrollElement}
          data-component-document
          className="site-grid-frame apple-scrollbar scrollbar-gutter-stable min-h-0 min-w-0 w-full overflow-x-hidden overflow-y-auto overscroll-contain bg-background lg:pt-16"
        >
          <div className="site-grid-frame__content w-full px-4 pb-16  mx-auto max-w-(--site-grid-max-width) ">
            <header
              className="site-grid-section flex flex-wrap items-center justify-between mobile:pb-4"
              data-boundary="both"
            >
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl py-2">
                {doc.title}
              </h1>
              {copyActions}
            </header>
            <DescriptionPanel
              doc={doc}
              data={data}
              copyActions={copyActions}
              embedded
              showHeader={false}
            />
            <ComponentFeedback component={data.component} title={doc.title} />
            {getRelatedComponents(data.component).length > 0 && (
              <>
                <div className="site-grid-doc-divider" aria-hidden="true">
                  <span />
                </div>
                <section className="">
                  <header
                    className="mb-5 site-grid-section py-4"
                    data-boundary="both"
                  >
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Related components
                    </h2>
                  </header>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {getRelatedComponents(data.component).map((item) => (
                      <ComponentShowcaseCard
                        key={item.slug}
                        item={item}
                        preview={
                          <ComponentShowcaseRegistryPreview slug={item.slug} />
                        }
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
            <div aria-hidden="true" className="h-[20vh]" />
          </div>
        </article>
        <ComponentContentsRail
          headings={headings}
          scrollElement={scrollElement}
        />
      </main>
      {mobileMatch === true && (
        <DocsNavigation open={navOpen} onOpenChange={setNavOpen} />
      )}
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
