"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type Token = {
  aliasOf?: string;
  kind?: "color" | "value";
  name: string;
};

type TokenGroup = {
  description: string;
  name: string;
  tokens: Token[];
};

const coreColors: TokenGroup[] = [
  {
    name: "Core surfaces and content",
    description: "The semantic colors used across the main interface.",
    tokens: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "primary",
      "primary-foreground",
      "neutral",
      "neutral-foreground",
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
      "border",
      "input",
      "ring",
      "scrollbar",
    ].map((name) => ({ name, kind: "color" })),
  },
  {
    name: "Sidebar",
    description:
      "A dedicated semantic set for documentation and application navigation.",
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ].map((name) => ({ name, kind: "color" })),
  },
  {
    name: "Tabs",
    description:
      "Dedicated surface and selected-item tokens for capsule-style tabs.",
    tokens: ["tabs-surface", "tabs-indicator", "tabs-indicator-border"].map(
      (name) => ({ name, kind: "color" }),
    ),
  },
  {
    name: "Status",
    description:
      "Feedback surfaces, readable content, and their supporting borders.",
    tokens: [
      "danger",
      "danger-foreground",
      "danger-border",
      "warning",
      "warning-foreground",
      "warning-border",
      "info",
      "info-foreground",
      "info-border",
      "success",
      "success-foreground",
      "success-border",
    ].map((name) => ({ name, kind: "color" })),
  },
];

const previewValues: Record<string, [light: string, dark: string]> = {
  background: ["oklch(0.98 0 0)", "oklch(0.19 0 0)"],
  foreground: ["oklch(0.18 0 0)", "oklch(0.94 0 0)"],
  card: ["oklch(1 0 0)", "oklch(0.21 0 0)"],
  "card-foreground": ["oklch(0.27 0 0)", "oklch(0.94 0 0)"],
  popover: ["oklch(1 0 0)", "oklch(0.21 0 0)"],
  "popover-foreground": ["oklch(0.27 0 0)", "oklch(0.94 0 0)"],
  primary: ["oklch(0.54 0.15 250)", "oklch(0.54 0.15 250)"],
  "primary-foreground": ["oklch(1 0 0)", "oklch(1 0 0)"],
  neutral: ["oklch(0.22 0 0)", "oklch(0.95 0 0)"],
  "neutral-foreground": ["oklch(0.98 0 0)", "oklch(0.13 0 0)"],
  secondary: ["oklch(0.95 0 0)", "oklch(0.28 0 0)"],
  "secondary-foreground": ["oklch(0.32 0 0)", "oklch(0.94 0 0)"],
  muted: ["oklch(0.95 0 0)", "oklch(0.26 0 0)"],
  "muted-foreground": ["oklch(0.5 0 0)", "oklch(0.73 0 0)"],
  accent: ["oklch(0.91 0 0)", "oklch(0.31 0 0)"],
  "accent-foreground": ["oklch(0.22 0 0)", "oklch(0.95 0 0)"],
  destructive: ["oklch(0.53 0.19 25)", "oklch(0.5 0.2 25)"],
  "destructive-foreground": ["oklch(0.98 0 0)", "oklch(1 0 0)"],
  border: ["oklch(0 0 0 / 8%)", "oklch(1 0 0 / 10%)"],
  input: ["oklch(0.95 0 0)", "oklch(1 0 0 / 15%)"],
  ring: ["oklch(0.55 0.2 250)", "oklch(0.55 0.2 250)"],
  scrollbar: ["oklch(0.87 0 0)", "oklch(0.7 0 0)"],
  "tabs-surface": ["oklch(0.93 0.01 250)", "oklch(0.25 0.01 250)"],
  "tabs-indicator": ["oklch(1 0 0)", "oklch(0.32 0.01 250)"],
  "tabs-indicator-border": ["oklch(0.86 0.01 250)", "oklch(0.38 0.01 250)"],
  sidebar: ["oklch(0.98 0 0)", "oklch(0.19 0 0)"],
  "sidebar-foreground": ["oklch(0.22 0 0)", "oklch(0.88 0 0)"],
  "sidebar-primary": ["oklch(0.28 0 0)", "oklch(0.95 0 0)"],
  "sidebar-primary-foreground": ["oklch(0.97 0 0)", "oklch(0.13 0 0)"],
  "sidebar-accent": ["oklch(0.92 0 0)", "oklch(0.19 0 0)"],
  "sidebar-accent-foreground": ["oklch(0.28 0 0)", "oklch(0.95 0 0)"],
  "sidebar-border": ["oklch(0.9 0 0)", "oklch(0.28 0 0)"],
  "sidebar-ring": ["oklch(0.65 0 0)", "oklch(0.83 0 0)"],
  danger: ["oklch(0.5892 0.2014 28.97)", "oklch(0.58 0.1782 28.13)"],
  "danger-foreground": ["oklch(0.98 0 0)", "oklch(0.98 0 0)"],
  "danger-border": ["oklch(0.49 0.17 28.97)", "oklch(0.7 0.14 28.13)"],
  warning: ["oklch(0.98 0.02 85)", "oklch(0.28 0.06 85)"],
  "warning-foreground": ["oklch(0.52 0.105 85)", "oklch(0.78 0.12 85)"],
  "warning-border": ["oklch(0.92 0.08 85)", "oklch(0.38 0.09 85)"],
  info: ["oklch(0.5635 0.2408 260.82)", "oklch(0.5587 0.2213 260.15)"],
  "info-foreground": ["oklch(0.98 0 0)", "oklch(0.98 0 0)"],
  "info-border": ["oklch(0.46 0.19 260.82)", "oklch(0.68 0.16 260.15)"],
  success: ["oklch(0.6922 0.2319 142.96)", "oklch(0.667165 0.219713 143.1724)"],
  "success-foreground": ["oklch(0.2 0.03 143)", "oklch(0.18 0.03 143)"],
  "success-border": ["oklch(0.57 0.19 142.96)", "oklch(0.78 0.16 143.172)"],
};

const themeAliases: TokenGroup[] = [
  {
    name: "Tailwind color aliases",
    description:
      "The generated color names used by utility classes. Each aliases a semantic CSS variable above.",
    tokens: [
      "color-background",
      "color-foreground",
      "color-ring",
      "color-input",
      "color-border",
      "color-destructive",
      "color-destructive-foreground",
      "color-accent",
      "color-accent-foreground",
      "color-muted",
      "color-muted-foreground",
      "color-secondary",
      "color-secondary-foreground",
      "color-primary",
      "color-primary-foreground",
      "color-neutral",
      "color-neutral-foreground",
      "color-popover",
      "color-popover-foreground",
      "color-card",
      "color-card-foreground",
      "color-scrollbar",
      "color-success",
      "color-success-foreground",
      "color-success-border",
      "color-info",
      "color-info-foreground",
      "color-info-border",
      "color-warning",
      "color-warning-foreground",
      "color-warning-border",
      "color-danger",
      "color-danger-foreground",
      "color-danger-border",
      "color-sidebar",
      "color-sidebar-foreground",
      "color-sidebar-primary",
      "color-sidebar-primary-foreground",
      "color-sidebar-accent",
      "color-sidebar-accent-foreground",
      "color-sidebar-border",
      "color-sidebar-ring",
    ].map((name) => ({
      name,
      kind: "color",
      aliasOf: name.replace("color-", ""),
    })),
  },
];

const foundationGroups: TokenGroup[] = [
  {
    name: "Typography",
    description:
      "The primary type system is shown below; these are the exposed font and size tokens.",
    tokens: [
      "font-sans",
      "font-mono",
      "font-rubik",
      "font-clash-display",
      "text-tiny",
    ].map((name) => ({ name })),
  },
  {
    name: "Layout and sizing",
    description:
      "Shared dimensions that keep the documentation shell and its responsive layout consistent.",
    tokens: [
      "radius",
      "sidebar-width",
      "spacing-header-height",
      "spacing-sidebar-width",
      "spacing-mobile-sidebar-height",
      "breakpoint-xs",
      "docs-flow",
    ].map((name) => ({ name })),
  },
  {
    name: "Motion",
    description:
      "Named easing curves and animation recipes. They are reference values, not an instruction to animate every interaction.",
    tokens: [
      "ease-in-cubic",
      "ease-out-cubic",
      "ease-in-out-cubic",
      "animate-fade-in-up",
      "animate-float",
    ].map((name) => ({ name })),
  },
];

function cssVariable(name: string) {
  return `--${name}`;
}

function ResolvedValue({
  name,
  prefix,
  previewValue,
}: {
  name: string;
  prefix?: string;
  previewValue?: string;
}) {
  const [value, setValue] = useState("Loading…");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setValue(
        getComputedStyle(document.documentElement)
          .getPropertyValue(cssVariable(name))
          .trim() || "Not resolved",
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [name]);

  return (
    <code className="block truncate font-mono text-[0.65rem] text-muted-foreground">
      {prefix}
      {previewValue ?? value}
    </code>
  );
}

function TokenRow({
  token,
  previewIndex,
}: {
  token: Token;
  previewIndex?: 0 | 1;
}) {
  return (
    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 border-b border-border py-3 last:border-b-0">
      {token.kind === "color" ? (
        <div
          className="size-10 rounded-md smooth-shadow-ring-xs"
          style={{
            backgroundColor: `var(${cssVariable(token.aliasOf ?? token.name)})`,
          }}
        />
      ) : (
        <div className="flex size-10 items-center justify-center rounded-md border border-border bg-muted font-mono text-[0.6rem] text-muted-foreground">
          Aa
        </div>
      )}
      <div className="min-w-0">
        <code className="block truncate font-mono text-xs font-medium text-foreground">
          {cssVariable(token.name)}
        </code>
        <ResolvedValue
          name={token.aliasOf ?? token.name}
          prefix={
            token.aliasOf ? `→ ${cssVariable(token.aliasOf)} · ` : undefined
          }
          previewValue={
            previewIndex === undefined
              ? undefined
              : previewValues[token.aliasOf ?? token.name]?.[previewIndex]
          }
        />
      </div>
    </div>
  );
}

function TokenGroupPanel({
  group,
  previewIndex,
}: {
  group: TokenGroup;
  previewIndex?: 0 | 1;
}) {
  return (
    <section className="rounded-xl bg-card p-4 text-card-foreground smooth-shadow-ring-xs">
      <h3 className="text-sm font-semibold tracking-tight">{group.name}</h3>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {group.description}
      </p>
      <div className="mt-4">
        {group.tokens.map((token) => (
          <TokenRow
            key={token.name}
            token={token}
            previewIndex={previewIndex}
          />
        ))}
      </div>
    </section>
  );
}

function ThemeColumn({ theme }: { theme: "light" | "dark" }) {
  const previewIndex = theme === "light" ? 0 : 1;
  const localThemeValues = Object.fromEntries(
    Object.entries(previewValues).map(([name, values]) => [
      cssVariable(name),
      values[previewIndex],
    ]),
  ) as CSSProperties;

  return (
    <div
      data-theme={theme}
      style={localThemeValues}
      className="rounded-2xl bg-background p-4 text-foreground smooth-shadow-ring-sm sm:p-5"
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
        <h2 className="text-base font-semibold capitalize">{theme}</h2>
        <span className="font-mono text-[0.65rem] text-muted-foreground">
          data-theme=&quot;{theme}&quot;
        </span>
      </div>
      <div className="space-y-4">
        {coreColors.map((group) => (
          <TokenGroupPanel
            key={group.name}
            group={group}
            previewIndex={previewIndex}
          />
        ))}
      </div>
    </div>
  );
}

export function DesignTokenReference() {
  return (
    <section
      className="not-prose my-8 space-y-10"
      aria-label="Design token reference"
    >
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Semantic colors
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Every color token from <code>globals.css</code>, resolved on its
              own light or dark surface.
            </p>
          </div>
          <p className="font-mono text-[0.65rem] text-muted-foreground">
            --background through --success-border
          </p>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <ThemeColumn theme="light" />
          <ThemeColumn theme="dark" />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Primary typography
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            The primary interface face, shown at practical editorial and UI
            sizes.
          </p>
        </div>
        <div className="rounded-xl bg-card p-5 text-card-foreground smooth-shadow-ring-xs sm:p-7">
          <p className="text-[0.525rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            --text-tiny · 0.525rem
          </p>
          <p className="mt-4 text-sm leading-6">
            Sona UI makes expressive interfaces feel intentional.
          </p>
          <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            The system should be easy to inspect, not difficult to decode.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            The default typeface carries interface labels, readable
            documentation, and the visual rhythm of the component library.
            Scale, weight, and leading create hierarchy without a separate
            typographic style for every surface.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Theme aliases
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            The Tailwind-facing aliases exposed from the semantic tokens.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <TokenGroupPanel group={themeAliases[0]} />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Foundations
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Every non-color token currently declared in <code>globals.css</code>
            .
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {foundationGroups.map((group) => (
            <TokenGroupPanel key={group.name} group={group} />
          ))}
        </div>
      </section>
    </section>
  );
}
