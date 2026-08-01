---
name: component-anatomy
description: Create a source-backed Inspection Board around an existing Sona UI component for social demonstrations and later documentation experiments. Use when the user asks to map, label, explain, visualize, record, or show the anatomy, parts, states, dimensions, or motion behavior of a component. Audit and propose the anatomy first, wait for approval, then build a non-invasive overlay on an isolated prototype route without changing the production component by default.
---

# Component Anatomy

Turn a real component into an inspectable explanation. Keep the component interactive and place measurements, boundaries, labels, and motion explanations in separate prototype code. Every annotation must trace to the public API, rendered DOM, source, or observed behavior.

## Required input

Require a component name or source/demo path. Locate the real component, demos, documentation, registry entry, and local dependencies with `rg --files` before proposing annotations. Ask only for information that cannot be discovered from the repository.

## Approval gate

Run the workflow in two phases:

1. Complete the anatomy audit and present the proposed board as a read-only brief.
2. Stop for explicit approval of its composition, labels, states, and motion story.
3. Build only the approved board on an isolated prototype route.

Treat label vocabulary, component framing, callout placement, dimensions, state sequence, camera framing, interaction, and motion as material design decisions. Implementation details that preserve the approved board do not need another confirmation.

## Phase 1 — Map the anatomy

### Trace the component

Inspect the implementation rather than inferring structure from its appearance. Record:

- public parts, props, callbacks, refs, defaults, and controlled state;
- rendered roles, accessible names, states, `data-*` attributes, and stable element relationships;
- internal visual parts that materially explain the component;
- interactive states such as rest, hover, focus, pressed, active, open, disabled, drag, and completion;
- dimensions or spacing that communicate an intentional constraint;
- animation ownership, `layoutId` relationships, transitions, reduced-motion behavior, and interruption where applicable.

For animated or gesture-driven components, read and apply the repository-local `apple-design` and `design-motion-principles` skills. Describe motion as a relationship or state change, not merely a duration and easing value.

### Classify annotations

Assign each proposed annotation one evidence class:

- **Public part** — a documented export, compound component, prop, or slot.
- **DOM part** — a stable rendered element, role, attribute, or state.
- **Visual part** — an internal rendered surface worth explaining.
- **Relationship** — ownership, shared layout, anchoring, containment, or state flow.
- **Measurement** — a meaningful size, gap, radius, travel distance, or hit target.

Use source terminology when it is clear. Introduce a conceptual label only when it improves understanding, and mark it as conceptual rather than presenting it as an API name.

### Choose the story

Use **Inspection Board** as the base composition: one live component on a quiet dark canvas, surrounded by restrained labels, leader lines, boundaries, and only meaningful measurements.

Choose one scope per board:

- **Structure** — parts and their hierarchy.
- **States** — the same component across a small set of meaningful states.
- **Motion** — trigger, travel or transformation, settlement, and interruption.

Prefer one legible board over combining every available fact. A component may need a short series of boards when its structural and motion stories are independently valuable.

### Present the anatomy brief

Report:

- component and demo sources inspected;
- board purpose and selected scope;
- exact labels, their evidence classes, and their source targets;
- states or motion phases to demonstrate;
- meaningful measurements;
- interaction required during capture;
- proposed prototype files and route;
- uncertainties or conceptual labels;
- visual decisions requiring approval.

**Completion criterion:** every proposed annotation names its evidence and the user can approve the board without guessing what will be built. Stop and wait for approval.

## Phase 2 — Build the Inspection Board

### Preserve the production component

Render the real component through its existing public API. Keep all board code under:

```text
src/app/prototypes/<component>-anatomy/
src/components/prototypes/component-anatomy/
```

Production component code remains unchanged by default. Compose public parts or wrap the demo when stable targets are needed. Resolve targets in this order:

1. explicit wrappers owned by the anatomy demo;
2. public roles, accessible states, or stable existing `data-*` attributes;
3. selectors scoped to the board root;
4. manually configured geometry for conceptual relationships.

If none can identify an essential target reliably, pause and explain the limitation. Propose a production marker only when it also improves the component's reusable semantics or tooling, and obtain explicit approval before editing production source.

### Keep overlays non-invasive

- Place annotations in a sibling overlay so they do not alter component layout or pointer behavior.
- Measure targets relative to one board root with `getBoundingClientRect()`.
- Recalculate after mount, resize, font load, and relevant state changes.
- Use `ResizeObserver` when target geometry can change.
- Keep labels readable and leader lines uncrossed at the approved capture size.
- Keep inspection chrome out of the accessibility tree unless it provides an intentional textual explanation.
- Respect reduced motion; labels and measurement chrome should appear immediately in that mode.
- Keep the real component keyboard- and pointer-operable beneath the overlay.

Avoid fragile positional selectors such as broad `nth-child` queries. Do not add anatomy-only props to the public component API.

### Build for capture

Make the first version screen-recordable rather than creating an export system. Provide only controls the story needs, such as reset, replay, pause, or step state. Keep controls outside the capture frame when practical.

For a motion board, ensure the initial frame communicates the component and the first interaction begins quickly. Prefer a short repeatable sequence suitable for a 5–15 second social clip.

### Verify

Run focused formatting and type checks for changed files. Inspect every target mapping after relevant state changes and confirm:

- labels remain attached at the intended capture viewport;
- overlays do not block component interaction;
- measurements update after geometry changes;
- keyboard, focus, and reduced-motion behavior still work;
- console and observer cleanup are clean;
- no production source, public API, or registry contract changed without approval.

The user owns visual browser review for Sona UI unless they explicitly request browser verification. Report static checks and rendered verification separately.

**Completion criterion:** the approved board is reachable on its isolated route, every visible annotation still maps to its declared evidence, the real component remains interactive, and verification status is reported precisely.

## Handoff

State the prototype route, capture interaction, annotation mapping, files added, checks run, and whether visual review remains. Stop after the social-ready prototype. Propose documentation integration only after the user has tried the anatomy format across multiple components; do not add it to production documentation as part of this workflow.
