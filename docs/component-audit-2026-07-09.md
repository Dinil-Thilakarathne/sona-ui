# Sona UI Component Audit — 2026-07-09

**Scope:** All library components *except* those tagged `new`/`updated` in `src/config/components.ts`.
Audited: Accordion, Ripple Button, Spinning Text, Stagger Text, Vertical Tab, Expandable Tabs, Magnetic Button, Link Preview, Bubble Up Button, Spotlight Card, Hold To Delete, Mesh Gradient Shader, Dot Orbit Shader.

**Lens:** design edge cases, user interactivity/accessibility, animation quality (Emil Kowalski design-engineering principles), and code quality. Each component scored /10.

---

## Summary Scorecard

| Component | Design | Interactivity/A11y | Animation | Code Quality | Overall |
| --- | --- | --- | --- | --- | --- |
| Spotlight Card | 8 | 7 | 8 | 9 | **8** |
| Shaders (Mesh Gradient / Dot Orbit) | 8 | 7 | 7 | 8 | **7.5** |
| Magnetic Button | 7 | 6 | 7 | 6 | **6.5** |
| Hold To Delete | 7 | 5 | 9 | 6 | **6.5** |
| Spinning Text | 7 | 7 | 6 | 6 | **6.5** |
| Bubble Up Button | 6 | 5 | 7 | 6 | **6** |
| Stagger Text | 7 | 5 | 7 | 6 | **6** |
| Ripple Button | 6 | 4 | 5 | 6 | **5.5** |
| Accordion | 6 | 3 | 5 | 5 | **5** |
| Expandable Tabs | 6 | 3 | 5 | 5 | **5** |
| Link Preview | 5 | 4 | 4 | 5 | **4.5** |
| Vertical Tab | 5 | 3 | 5 | 5 | **4.5** |

**Fix priority:**
1. Accordion padding bug + trigger → real `<button>` (user-reported issue; quick win)
2. Hold To Delete: `motion/react-m` LazyMotion requirement + hardcoded `layoutId` (breaks for registry consumers)
3. Link Preview: broken positioning + click never navigates
4. Library-wide pass: keyboard support, theme tokens, `useReducedMotion`, hover gating

---

## 1. Accordion — `src/registry/sonaui/accordion/accordion.tsx` · Score: 5/10

### 🔴 Reported bug: hidden content's top edge visible on first load — ROOT CAUSE

The collapsing container (`AccordionItemContent`, ~line 247) is:

```tsx
className="overflow-hidden px-8 py-2 text-sm transition-[height]"
initial={{ height: 0 }}
```

Motion animates `height` to `0`, but **padding is not part of `height`** — `py-2` keeps the element 16px tall (8px top + 8px bottom) even when closed, so the top sliver of the content peeks through. The `offsetHeight + 16` magic number (~line 227) compensates for the same padding.

**Fix:**

| Before | After | Why |
| --- | --- | --- |
| `px-8 py-2` on the height-animated div | Outer div: `overflow-hidden` only; move `px-8 py-2` to the inner content div | Padding survives `height: 0`, causing the visible sliver |
| `setHeight(ref.current.offsetHeight + 16)` | `setHeight(ref.current.offsetHeight)` | Padding is now measured naturally; removes magic number |
| `transition-[height]` Tailwind class | Remove | CSS transition fights Motion's height animation — double easing |
| `ease: "easeIn"` on open | Strong ease-out, e.g. `[0.23, 1, 0.32, 1]` | Entering content should start fast; ease-in feels sluggish |

### Other findings

- **Keyboard/a11y (biggest gap):** `AccordionItemTrigger` is a `div` with `onClick` — Tab/Enter/Space do nothing. `aria-expanded` sits on a non-interactive element; no `aria-controls`/`id` pairing. Render a real `<button>`.
- `animated-plus-minus-button.tsx`: decorative span has `role="button"` + permanently-true `aria-pressed` — should be `aria-hidden="true"`.
- **Closed content stays focusable:** links inside a collapsed panel remain tabbable despite `aria-hidden`. Add `inert` when closed.
- **Stale height:** measured once per toggle; content reflow on resize clips. Use `ResizeObserver` or Motion `height: "auto"`.
- **Dead code:** unused `variants` object (~line 231). Typo: `accordionWrapperVarinats`.
- **State duplication:** `openItems` Set + separate `value` string track overlapping concepts; `value` desyncs from `openItems` in `allowMultiple` mode.
- **API gaps:** no `defaultOpen`, no controlled mode, no `useReducedMotion`.
- `styles.module.css`: `outline: 1px solid` has no color (falls back to `currentColor`, likely unintended); `!important` on line 66 signals specificity fights.

---

## 2. Ripple Button — `src/registry/sonaui/ripple-button/ripple-button.tsx` · Score: 5.5/10

- **Transform clobbering:** inline `style.transform: "translate(-50%,-50%) scale(0)"` + `animate={{ scale }}` — Motion owns `transform` and drops the translate, shifting the ripple origin. Use Motion `x: "-50%", y: "-50%"` or a centered wrapper.
- `ease: "easeIn"` on an entering effect — lags exactly when the user is watching. Use ease-out.
- Redundant hover state: `onMouseEnter` + `onMouseOver` + `onMouseLeave`; `onMouseOver` re-fires across child boundaries. One enter/leave pair suffices.
- **No touch support:** ripple is hover-only. Trigger on `pointerdown` (also the correct ripple semantic — press, not hover).
- `transition-all duration-300` — specify exact properties.
- No `:active` press scale, no `useReducedMotion`.
- `RippleButtonText`: `aria-label="ripple-button-text"` is screen-reader noise; remove it and the `role="presentation"` (visible text is the label).

---

## 3. Spinning Text — `src/registry/sonaui/spinning-text/spinning-text.tsx` · Score: 6.5/10

- **Container has no intrinsic size** — all chars are `absolute` at center, so the container collapses to 0×0 and overlaps siblings unless consumer sizes it. Compute size from `radius` (e.g. `calc(2 * radius * 1ch + 1lh)`).
- **No reduced motion** — infinite rotation is the canonical `prefers-reduced-motion` case. Pause when reduced.
- Throwing in render for prop validation (line ~63) crashes the tree; TypeScript already enforces the type. Drop or `console.warn`.
- `chars.push(" ")` phantom trailing char is an undocumented spacing hack.
- Good: `sr-only` full text + `aria-hidden` chars; linear easing correct for constant motion; transform-only animation.

---

## 4. Stagger Text — `src/registry/sonaui/stagger-text/stagger-text.tsx` · Score: 6/10

- **Semantic bug:** every instance renders a `<h1 className="sr-only">` → multiple h1s per page, duplicating the `aria-label`. Remove the h1.
- **Props not forwarded:** type extends `ComponentPropsWithoutRef<T>` but only `text/className/as` are used — `id`, handlers, etc. silently dropped.
- `activeIndex` initialized to `5` (arbitrary) — first hover staggers from a never-hovered char. Set it on first enter.
- Missing `useReducedMotion` and `(hover: hover)` gating (hover-only interaction).
- Good: distance-based delay ripple; `easeInOut` for on-screen movement; exit faster than enter; `onCopy` clipboard fix for duplicated-char DOM.

---

## 5. Vertical Tab — `src/registry/sonaui/vertical-tab/vertical-tab.tsx` · Score: 4.5/10 (weakest)

- **A11y half-wired:** `role="tab"` divs all with `tabIndex={0}` (needs roving tabindex); arrow keys change `activeIndex` but not focus; no `aria-controls`/tabpanel; `aria-label={"Tab N"}` **overrides the visible title** — screen readers hear "Tab 1" instead of the name. Remove it.
- **Animating `width`/`height`** on hover indicator (layout thrash). Motion `layoutId` on a single indicator does it with transforms and deletes the `useMeasure`/`ref(null)` re-attachment machinery. `lastHoveredIndex` is effectively unused.
- `will-change-[transform_width_height]` is invalid CSS (needs commas) — silently ignored.
- `overflow-x-scroll` forces a permanent scrollbar → `overflow-x-auto`.
- **Hardcoded slate colors** instead of theme tokens; `indicatorBgColor` appended after hardcoded `bg-slate-300` — only works via tailwind-merge, fragile.
- Active-tab change has no animation while hover glides — inverted priority; the selected indicator is what users track.

---

## 6. Expandable Tabs — `src/registry/sonaui/expandable-tabs/expandable-tabs.tsx` · Score: 5/10

- **Keyboard dead-end:** `role="button"` divs with `tabIndex` but no key handler — Enter/Space do nothing. Use real `<button>`s.
- **Conflicting animation systems:** container Motion `layout` + CSS `transition-[width]` on items + variant `width: 0 → "auto"` (Motion can't tween to `"auto"` — it jumps). Pick one: Motion `layout` on the label span, drop the CSS width transition.
- `will-change-[width,_contents]` — `contents` isn't valid for will-change.
- `initial={isActive === index ? "" : "inactive"}` — empty-string variant is a silent no-op; use `false`.
- Index as key; hardcoded slate colors; no reduced motion; no tabs semantics (`aria-selected` etc.) despite visually being a tab bar.

---

## 7. Magnetic Button — `src/registry/sonaui/magnetic-button/magnetic-button.tsx` · Score: 6.5/10

- **Always-on `document` mousemove listener** per instance with `getBoundingClientRect()` every move, even when not hovered. Attach only while hovered, or early-return before the rect read.
- `parent` mode: `mouseleave` never resets `motionX/Y` — element can stay displaced until the next global mousemove. Reset explicitly like the `self` path.
- `springConfig = springConfig || SPRING_CONFIG` → use default parameter. `customClassName` breaks the `className` convention. `interactionArea` in first effect's deps does nothing.
- Spring `stiffness: 30, damping: 6` very wobbly; damping ~10–15 settles cleaner.
- Missing `useReducedMotion` (should become inert).
- Good: motion values + `useSpring`, zero re-renders — correct pattern for decorative mouse-tracking.

---

## 8. Link Preview — `src/registry/sonaui/link-preview/link-preview.tsx` · Score: 4.5/10

- **Positioning broken outside the happy path:** preview is `position: absolute` but `left/top` come from `useMeasure` (viewport-relative coords); wrong position in scrolled/nested containers, and doesn't update on scroll. Portal + `fixed` (or Base UI anchored positioner, already in the stack).
- **Click never navigates on desktop:** `onClick` preventDefaults and toggles the preview. A link that doesn't link is a UX/a11y violation — hover/focus previews, click navigates.
- **Animating `width: 0 → "fit-content"` / `height: 0 → "auto"`:** Motion can't tween keyword values (jumps), and size animation squishes text. Use `opacity + scale(0.95)` with `transform-origin` at the trigger.
- No hover-intent delay (pops on incidental mouse-over); hover gap between link and preview can drop the chain.
- `onFocus` calls `preventDefault()` (focus has no default); `linkProps` spread onto the inner preview link instead of the main link; hardcoded slate colors; no reduced motion.
- The "preview" only shows the raw URL — consider an OG-image/screenshot slot.

---

## 9. Bubble Up Button — `src/registry/sonaui/bubble-up-button/bubble-up-button.tsx` · Score: 6/10

- **Race on rapid hover in/out:** async handlers `await controls.start(...)`; the `controls.set()` reset after the leave animation can fire after a new enter began → visible flicker. Use a hovered-state + variants model (Motion retargets), or a generation counter.
- **Hardcoded black/white** (bg, focus ring, blend text) — ignores theme tokens entirely.
- Hover-only: no keyboard equivalent (bubble should mirror on `:focus-visible`); taps stick hover state on touch. Gate with `(hover: hover)`.
- Spring 200/40 slightly slow for a hover (~300/30 snaps better). No `useReducedMotion`. `aria-label` duplicating string children is redundant.
- Good: clip-path ellipse direction asymmetry (fills from bottom, drains upward) is a great spatial story; overlay is `aria-hidden`.

---

## 10. Spotlight Card — `src/registry/sonaui/spotlight-card/spotlight-card.tsx` · Score: 8/10 (best)

Reference implementation for the library: motion values + `useMotionTemplate` (zero re-renders), `pointer-events-none` overlay, `group-hover` fade, `disabled` short-circuits handler and render.

Minor polish:
- First-ever hover can flash the spotlight at `(0,0)` for a frame — initialize motion values off-canvas (e.g. `-spotlightSize`).
- 300ms opacity fade slightly slow for hover feedback (~200ms).
- Default `rgba(255,255,255,0.15)` nearly invisible on light backgrounds — theme-aware default or doc note.
- Touch: spotlight pins at last tap point — gate with `(hover: hover)`.

---

## 11. Hold To Delete — `src/registry/sonaui/hold-to-delete-button/hold-to-delete-button.tsx` · Score: 6.5/10

- **Consumer-facing bug:** imports `m` from `motion/react-m`, which requires a `<LazyMotion>` ancestor — bare registry installs crash in dev. Use plain `motion` or document the requirement in the MDX.
- **Hardcoded `layoutId="hold-to-delete-button"`** — two instances on a page share it and Motion animates between them. Use `useId()`.
- **No keyboard hold:** pointer-only. Add Space keydown/keyup (with repeat guard).
- **`pointercancel` unhandled:** touch-scroll during a hold can leave `isHolding` true until the timer *fires the destructive delete*. Cancel on `pointercancel`.
- No `aria-live` for the "Deleted!" state; no AT-visible progress; `whileHover` not touch-gated; `bg-red-400` should be a danger token.
- Excellent animation core: slow `linear` press / snappy `200ms ease-out` release (textbook asymmetric timing), clip-path (GPU-cheap), interruptible transitions, thorough timer cleanup.

---

## 12. Shaders — `mesh-gradient-shader.tsx` / `dot-orbit-shader.tsx` · Score: 7.5/10

Clean thin wrappers at the right altitude. Shared gaps:

- **No reduced motion:** constantly-animating WebGL canvases; `useReducedMotion() ? 0 : speed` is a one-line fix that matters most here.
- **No intrinsic size:** wrapper is 0-height unless consumer sizes it; inner canvas is 100% of nothing. Default a min-height or document prominently.
- No WebGL fallback — `background: colors[0]` on the wrapper is a free graceful degrade.
- Continuous GPU work while offscreen — consider `IntersectionObserver` pause (verify paper-shaders doesn't already do this internally).

---

## Library-Wide Themes (fix once, apply everywhere)

1. **Two generations of code.** The `new`-tagged components ship `useReducedMotion`, theme tokens, and real interactive elements; the older set predates those standards (hardcoded slate/black/white, div-as-button, no reduced motion). One "raise to current baseline" pass covers ~60% of findings.
2. **Keyboard support is the systemic gap** — Accordion, Vertical Tab, Expandable Tabs, Hold To Delete, Bubble Up all fail. Real `<button>` elements fix half of it for free.
3. **Hover effects aren't touch-gated** anywhere — a shared `@media (hover: hover) and (pointer: fine)` convention or `useHoverCapable` hook fixes Ripple, Bubble Up, Stagger, Spotlight, Hold To Delete at once.
4. **Layout-property animation** (width/height/left/top) in Vertical Tab, Expandable Tabs, Link Preview, Accordion — migrate to transforms / `layoutId` / measured-height patterns for both perf and simpler code.
5. **Reuse Base UI** (already a dependency via dropdown/dialog/switch): Link Preview → `PreviewCard`, Vertical Tab → `Tabs`, with Sona animations layered on top.
