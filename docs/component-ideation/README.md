# Sona UI Component Idea Bank

## What Sona UI builds

Sona UI is a library of interaction upgrades for common product-interface moments. It does not compete to provide every primitive, and it does not add novelty for novelty's sake.

Every published component should make an existing, recurring interface task clearer, safer, faster, or more satisfying through better interaction design. Motion is used to explain feedback, continuity, orientation, or hierarchy.

## Admission test

An idea is ready to prototype only when it passes all of these checks:

1. **Recurring job**: at least three credible product contexts need it.
2. **Unsolved interaction**: a standard primitive alone would leave important behavior, feedback, or state transitions for each consumer to rebuild.
3. **Sona contribution**: the component has a clear interaction or information-design improvement, not only a new visual skin.
4. **Useful without motion**: the component still works and remains understandable with reduced motion.
5. **Small, ownable API**: its main behavior can be explained in one sentence and exposed through a compact, composable API.
6. **Accessible by default**: keyboard behavior, focus, labels, contrast, and touch use can be designed before implementation.
7. **Evidence before release**: it has a working demo in realistic content, documentation for when not to use it, and static, interaction, and visual validation.

Reject or defer an idea when it is merely a familiar primitive with a different animation, a one-demo visual trick, a full application pattern, or a solution for one highly specific workflow.

## Current direction

The catalog has proven that Sona is strongest where a repeated product task gains a more intentional interaction model:

- **Action safety and feedback**: Hold to Delete, Expanding Action.
- **Orientation and navigation**: Section Rail, Fluid Tabs, expandable tabs.
- **Data exploration**: Activity Graph, Fluid Tooltip.
- **Focused disclosure**: Animated Dialog, Animated Dropdown, Accordion.

New work should bias toward these product-facing interaction systems over decorative motion resources. Existing expressive components remain part of the library, but should not set the component-selection default.

## Candidates

| Priority | Idea | Repeated job | Why it belongs in Sona | Keep it narrow |
| --- | --- | --- | --- | --- |
| 1 | Inline Edit | Change a name, label, value, or short description without losing surrounding context. | Handles the text-to-editor transition, focus placement, save state, Escape recovery, and success feedback as one calm interaction. | Short, single-field edits only. Do not build a form builder. |
| 2 | Selection Toolbar | Act on selected rows, cards, files, or messages. | Keeps selection count, available actions, keyboard focus, and the toolbar's appearance and disappearance coherent. | A headless or composable toolbar, not a data table. |
| 3 | Async Action | Trigger an action with loading, success, failure, retry, and optional undo feedback. | Makes the moment after a click legible instead of leaving every product to invent its own button and toast sequence. | One action lifecycle, not a notification platform. |
| 4 | Smart Overflow | Preserve the most important actions as an action group shrinks. | Maintains priority and spatial continuity when actions move into overflow across responsive widths. | Action groups only, not general navigation. |
| 5 | Contextual Inspector | Open details for the currently selected item while retaining the collection context. | Provides a clear, reversible details surface with focus and keyboard rules. | A single inspector surface, not a full workspace shell. |
| 6 | Filter Summary | Show active filters as a readable, editable summary near results. | Turns hidden query state into visible, removable decisions with a calm transition. | Filter representation and removal, not a query-builder UI. |
| 7 | Save Status | Communicate saved, saving, offline, and error states for autosaving content. | Makes async persistence trustworthy without distracting the user. | Status and retry only, not collaborative editing. |
| 8 | Review Queue | Move through a small set of approval, moderation, or inbox decisions. | Preserves progress, orientation, and reversible decisions in a high-frequency workflow. | A focused decision surface, not a kanban system. |

## Next validation loop

For each candidate, write a one-page brief before code:

1. The user job and three credible product contexts.
2. The failure of the normal primitive or common implementation.
3. The interaction contract, including keyboard and reduced-motion behavior.
4. A deliberately small API sketch and explicit non-goals.
5. A realistic demo scenario that proves the value.
6. A decision: prototype, defer, or reject.

The first prototype should be an isolated demo with real content and realistic width. Promotion into the registry happens only after the interaction earns it.
