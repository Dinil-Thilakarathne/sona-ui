---
name: add-sona-component
description: >-
  Integrate a new component into the Sona UI library end to end — the full
  per-component pipeline of writing the component, demo, docs, registry entry,
  nav link, playground controls, regenerating the registry, and verifying it
  live. Use this whenever the user wants to add, create, scaffold, register, or
  "wire up" a new component in this repo (sona-ui), or mentions doing "the steps"
  / "the pipeline" to bring a component into the library — even if they only
  hand you the component code or just a name and an idea. Trigger it for phrases
  like "add a <name> component", "new component", "integrate this into the
  registry", "scaffold a component", or "set up the docs/playground for X".
---

# Add a component to Sona UI

This skill captures the complete pipeline for landing a new component in this
library so nothing is forgotten. The library is a shadcn-style registry: source
components live in `src/registry/`, are described in a hand-authored registry
JSON, surfaced in docs (MDX) and a live playground, and then compiled by a build
script into generated artifacts that the app and the `shadcn` CLI consume.

The golden rule: **you hand-author six things, then run one build that
regenerates everything else.** Editing a generated file directly is wasted work —
the next build overwrites it.

## The canonical reference

`spotlight-card` is the cleanest existing example of every step done correctly.
Before writing anything, read these to match the house style exactly:

- `src/registry/sonaui/spotlight-card/spotlight-card.tsx`
- `src/registry/examples/spotlight-card/spotlight-card-demo.tsx`
- `src/content/docs/spotlight-card.mdx`
- the `spotlight-card` entries in `src/registry/registry.json`,
  `src/config/components.ts`, and `src/registry/playground/index.tsx`

Mirror its structure for the new component rather than inventing a layout.

## Inputs to settle first

Pin these down before editing (ask the user only for what you can't infer):

- **Slug**: kebab-case, used everywhere as the key (`spotlight-card`). Directory
  names, registry `name`, doc filename, and every registry key must match it.
- **Display title**: Title Case (`Spotlight Card`).
- **Category**: which nav group in `components.ts` (`Components`, `Text`,
  `Effects`, …). The user's pipeline note calls for an **Effects** category — use
  it if the component is a visual effect, otherwise pick the fitting existing one.
- **Props**: name, type, default, one-line description for each — these flow into
  the generated prop table, so get them right at the source.
- **npm dependencies**: runtime packages the component imports (e.g. `motion`).

## The six hand-authored edits

Do these in order. Match formatting, the `cn` import, `"use client"`, and the
`export default` convention from the reference.

### 1. Component source — `src/registry/sonaui/<slug>/<slug>.tsx`

The real component. Export an interface named `<Pascal>Props` and **JSDoc every
prop** — the `@default` tag and the `/** … */` description are parsed verbatim
by the prop-types build into the docs table. A missing JSDoc comment means a
blank cell in the published props table, so treat the comments as user-facing.
Include `@default` on every optional prop. If the component needs extra files
(CSS module, sub-component), add them in the same folder — the build picks up
every file in the directory.

### 2. Demo — `src/registry/examples/<slug>/<slug>-demo.tsx`

The default, prop-less example shown in the docs Preview. File name
`<slug>-demo.tsx` maps to the `default` variant. For extra variants, add
`<slug>-<variant>.tsx` in the same folder (the build keys them by the suffix
after the component name; see `parseFileName` in `scripts/build-registry.ts`).

### 3. Registry entry — `src/registry/registry.json`

This is the hand-authored source of truth (a JSON **array**), NOT the root
`registry.json` or `public/r/*` — those are generated. Add an object with a real
`title`, a real `description` (a sentence about what it does, not "Component for
<slug>"), the file path(s) under `files`, and `dependencies` listing the npm
packages from step 1. Follow the exact shape of the spotlight-card entry.

### 4. Docs — `src/content/docs/<slug>.mdx`

Copy the spotlight-card MDX skeleton: frontmatter (`title`, `slug`, `tags`), an
intro, a `## Features` list, then the standard MDX component blocks in this
order — `<ComponentPreview component="<slug>" name="default" />`,
`## Playground` + `<ComponentPlayground component="<slug>" />`,
`## Installation` + `<ComponentInstallation component="<slug>" />`,
`## Usage` + `<ComponentUsage component="<slug>" />`,
`## Props` + `<PropTable component="<slug>" />`. The prop table is **derived** —
don't hand-write prop rows in the MDX.

### 5. Nav entry — `src/config/components.ts`

Add one object to `componentNavigationLinks`: `name` (Title), `slug`,
`href: "/docs/<slug>"`, and `type` set to the chosen category. If the category
is new (e.g. first **Effects** entry didn't exist yet) just use the string — the
nav groups by `type` automatically.

### 6. Playground controls — `src/registry/playground/index.tsx`

Import the component at the top, then add one entry to `playgroundRegistry` keyed
by slug: a `controls` array (slider / text / toggle / select — see the `Control`
union at the top of the file) for the props worth exposing, and a `render` that
instantiates the real component with the live values cast to their types. This
file is intentionally hand-authored and decoupled from the generated example
registry.

## Then build — regenerate everything else

```bash
bun run build:registry
```

This runs three scripts in sequence and regenerates:

- `src/registry/index.ts` (the example registry + code strings)
- root `registry.json` and `public/r/*.json` (shadcn CLI registry)
- `src/registry/prop-types.ts` (the props table data, parsed from your JSDoc)

All three are **generated — never edit them by hand.** If a prop is missing or a
description is wrong in the output, fix the JSDoc in step 1 and rebuild.

After building, sanity-check that the new slug appears in `src/registry/prop-types.ts`
with all expected props, and that `public/r/<slug>.json` was created.

## Finally — verify live in the preview

The component isn't "done" until you've seen it work. Use the preview tools (not
a manual hand-off):

1. Start the dev server (`preview_start`) if one isn't running.
2. Navigate to `/docs/<slug>` and `preview_snapshot` to confirm the page renders
   with Preview, Playground, Installation, Usage, and the Props table populated.
3. Exercise the actual interaction (hover, drag, type into a playground control)
   with `preview_click` / `preview_fill` / `preview_eval`, then re-snapshot or
   `preview_screenshot` to prove the effect and the playground controls work.
4. Check `preview_console_logs` for errors.

Report what you verified with a screenshot or snapshot, and call out anything the
user still needs to decide (e.g. extra variants, copy tweaks).

## Quick checklist

- [ ] `src/registry/sonaui/<slug>/<slug>.tsx` — component + JSDoc'd `<Pascal>Props`
- [ ] `src/registry/examples/<slug>/<slug>-demo.tsx` — default demo (+ variants)
- [ ] `src/registry/registry.json` — entry with real title/description/dependencies
- [ ] `src/content/docs/<slug>.mdx` — Preview · Playground · Installation · Usage · PropTable
- [ ] `src/config/components.ts` — nav entry under the right category
- [ ] `src/registry/playground/index.tsx` — import + controls/render entry
- [ ] `bun run build:registry` — regenerates index.ts, public/r/*.json, prop-types.ts
- [ ] Verified live in preview (DOM + interaction)
