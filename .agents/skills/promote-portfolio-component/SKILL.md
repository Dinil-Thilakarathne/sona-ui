---
name: promote-portfolio-component
description: Promote a finished Craft, experimental UI, or reusable React component from the user's portfolio into the Sona UI library through an approval-gated two-phase workflow. Use when the user supplies a portfolio component path and asks to assess, migrate, graduate, productize, publish, or add it to Sona UI. First audit readiness and propose the reusable component boundary without editing either project; after explicit approval, adapt the selected component and complete Sona UI's component, demo, docs, registry, navigation, playground, generation, and validation pipeline.
---

# Promote a Portfolio Component

Move a proven portfolio interaction into Sona UI without flattening its craft, importing portfolio-specific coupling, or silently redesigning it. Treat the portfolio as the experimental/editorial layer and Sona UI as the reusable distribution layer.

## Required input

Require a path to the source component, demo, or Craft. Resolve the real files with `rg --files` before forming a plan. Ask only for information that cannot be discovered from the supplied path and its local imports.

Do not assume that a visually finished experiment is library-ready. Do not modify or remove the portfolio source during promotion unless the user explicitly asks for that separate change.

## Non-negotiable approval gate

Run this workflow in two distinct phases.

1. Complete Phase 1 as a read-only audit.
2. Present the promotion brief and identify every material decision.
3. Stop and wait for explicit approval.
4. Begin Phase 2 only after the user approves the brief or names a revised direction.

Treat layout, hierarchy, interaction, motion, semantics, visual language, component boundaries, and public API as material decisions. Ask before changing them. Small implementation details that preserve the approved result do not require another confirmation.

## Phase 1: Audit and propose

### Trace the complete source boundary

Read the supplied file and recursively inspect its local imports. Locate:

- the reusable component and the portfolio-only demo or page shell;
- props, defaults, callbacks, refs, state ownership, and controlled/uncontrolled behavior;
- CSS modules, global styles, tokens, fonts, icons, images, and other assets;
- hooks, utilities, providers, aliases, framework APIs, and runtime packages;
- animation runtime providers and feature-loading boundaries, including whether
  `motion/react-m` components depend on an application-level `LazyMotion`
  provider;
- responsive, light/dark, keyboard, focus, reduced-motion, and cleanup behavior;
- analytics, content, route, or application-specific coupling that must not enter the library.

Inspect actual files rather than relying on the visible entry file alone. Never read, list, or modify `personal/journal/`.

### Apply the craft review

Read and use the repository-local `apple-design` and `design-motion-principles` skills. Review the component through the Emil, Jakub, and Jhey lenses, with attention to:

- immediate pointer-down and keyboard feedback;
- interruptible motion and spatial continuity;
- direct manipulation, velocity handoff, and cancellation where applicable;
- reduced motion, reduced transparency, contrast, focus, and touch behavior;
- restrained typography and visual effects;
- lifecycle cleanup, performance, and resize resilience.

Preserve expressive behavior that demonstrates craft. Propose removing or neutralizing portfolio-specific styling only when it prevents reuse, and make that an explicit approval item.

### Define the distributable contract

Separate three layers:

1. **Library component** — reusable behavior, stable API, styles, and required utilities.
2. **Sona demo** — realistic content and composition that demonstrate the component without becoming part of its API.
3. **Portfolio shell** — editorial copy, Craft layout, page navigation, analytics, and product-specific data that remain in the portfolio.

Prefer a focused API with useful composition points over a snapshot of demo-specific markup. Preserve existing props and behavior when they already form a sound public contract. Do not invent variant-only props, domain metaphors, or configuration merely to reproduce one demo.

Classify the result as one of:

- **Ready** — the reusable boundary and adaptations are clear.
- **Ready with decisions** — promotion is viable after the user chooses listed API, layout, or interaction decisions.
- **Not ready** — essential accessibility, behavior, dependency, or ownership problems should be resolved in the portfolio first.
- **Portfolio-only** — the value depends on its editorial context and would weaken as a general library component.

### Present the promotion brief

Report a concise brief containing:

- source entry and files that belong to the component boundary;
- readiness classification and evidence;
- proposed Sona component name, slug, category, and one-sentence purpose;
- proposed public API, defaults, callbacks, ref behavior, and accessibility semantics;
- dependencies and assets to carry, replace, or leave behind;
- behavior and visual details that will remain unchanged;
- proposed adaptations and why each is necessary;
- unresolved material decisions as clearly named options;
- planned Sona files and focused validation commands.

End Phase 1 by explicitly asking the user to approve or revise this brief. Do not create prototypes or production files yet.

## Phase 2: Promote into Sona UI

After approval, treat the approved brief as the contract. If implementation reveals a new material decision, pause and ask before continuing.

### Adapt without redesigning

- Copy only the approved reusable boundary; leave the portfolio source intact.
- Preserve the proven rendered hierarchy, Motion ownership, presence mode,
  `layoutId` placement, transition values, and containing-block behavior before
  adding library adaptations. Do not restructure working interaction code as a
  speculative improvement.
- Replace portfolio aliases, tokens, globals, providers, content, and framework coupling with Sona-local equivalents.
- The portfolio uses an application-level `LazyMotion` optimization, but Sona
  components must not depend on that provider. When promoted source imports
  lightweight elements from `motion/react-m`, use the self-contained `motion`
  elements from `motion/react` in Sona unless the user explicitly approves a
  different runtime contract. Otherwise `initial` styles can apply while
  `animate` features never load for consumers.
- Preserve props, defaults, callbacks, refs, accessibility, state behavior, and interaction timing unless the approved brief changes them.
- Add only the minimum API, accessibility, token, and instance-isolation changes
  required for distribution. If an adaptation would alter the working DOM or
  animation structure, treat it as a material decision and ask first.
- Keep reusable visuals neutral while retaining the approved expressive interaction.
- Keep demo content in the demo; do not bake it into the component.
- Declare every external source import in the component's exact `src/registry/registry.json` block.

### Complete the library pipeline

Read and follow the repository-local `add-sona-component` skill for the current Sona UI file structure and generation rules. Its canonical pipeline owns:

- component source and prop JSDoc;
- default and optional variant demos;
- hand-authored registry metadata and dependencies;
- MDX documentation;
- component navigation;
- playground controls and render wiring;
- generated registry and prop-type artifacts.

Use current repository examples rather than assuming paths or schemas from memory. Do not hand-edit generated files.

### Validate proportionally

At minimum, run:

```bash
bun run build:registry
bun run check:registry
bun run typecheck
```

Run focused formatting or lint checks on changed hand-authored files when available. Inspect the generated `public/r/<slug>.json` and prop table entry to confirm all source files, dependencies, and documented props are present.

Static checks are not visual proof. The user normally owns browser review for Sona UI, so do not open or run a browser preview unless explicitly requested. Report static, build, registry, type, and rendered verification separately and precisely.

## Completion report

State:

- what was promoted and what intentionally stayed portfolio-only;
- the final public API and any approved changes from the source;
- every hand-authored and generated surface added;
- validation commands and exact results;
- whether browser interaction and visual review were performed or remain for the user.

Do not call the promotion complete if the registry payload omits a required file or dependency, the public API differs without approval, or a required check fails.
