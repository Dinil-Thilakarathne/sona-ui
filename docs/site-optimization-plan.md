# Sona UI site optimization plan

Date: 2026-09-05  
Status: Proposed implementation plan

## Purpose

Make Sona UI faster to load, cheaper to operate, and easier to maintain as the component collection grows. Preserve existing component APIs, installation URLs, accessibility behavior, and approved visual design.

This document focuses on site optimization. Sponsors, pricing, feedback collection, and a public roadmap are separate product initiatives. Their infrastructure should follow the principles described here without expanding the initial optimization scope.

## Evidence and limitations

The initial audit inspected source code, application routes, generated registries, assets, and CI configuration. Registry validation passed for 36 components, agent resource validation passed for 32 items, and TypeScript passed at the time of that audit.

No fresh production build, browser performance profile, or production traffic analysis was performed. The findings below identify concrete code patterns, but their download, rendering, and cost impact must be measured before claiming improvements. Source-file sizes are not equivalent to compressed browser transfer sizes.

## Desired outcomes

- Opening one component should not require the entire component collection.
- Search should use a small index instead of full documentation objects.
- Videos and optional tools should consume resources only when needed.
- Public content should remain static or cacheable wherever practical.
- Component metadata should remain consistent across docs, navigation, search, and installation resources.
- CI should catch production-build, accessibility, and payload regressions.

## 1. Establish a production baseline

**Priority:** First, before optimization changes.

Use a production build to measure the homepage, component catalog, one simple component page, and one heavier shader or animation page. Include direct entry and navigation between docs pages, with both cold and warm caches.

Record:

- Initial compressed JavaScript transfer, execution time, and route payload size.
- Requests triggered by opening search, source code, and playground controls.
- Video requests and playback when content is outside the viewport.
- Mobile LCP, INP, and CLS from available field data, supplemented by lab checks.
- Production API invocations, cache behavior, bandwidth, and upstream failures.
- Production build duration and output route classification.

Keep a dated baseline with the commit, device or emulation settings, and measurement method. Compare changes under the same conditions. Set regression budgets after collecting this baseline rather than inventing byte targets now.

**Done when:** Representative routes have reproducible measurements and the most expensive resources are identified.

## 2. Generate a lightweight search index

**Priority:** High.

**Finding:** `src/hooks/useSearch.ts` imports `allDocs` into the client search dependency graph, although search uses only titles, descriptions, tags, and slugs.

**Implementation approach:**

1. Generate search records during content generation containing only `slug`, `title`, `description`, and `tags`.
2. Preserve current searchable and navigation-visibility rules.
3. Make the client search hook consume these records instead of full docs objects.
4. Split the search dialog and search engine from the initial page bundle where practical. Keep the trigger and keyboard shortcut responsive while the dialog loads.
5. Consider loading on trigger focus or pointer intent if first-open latency needs improvement.

**Verify:** Search returns the same intended pages, hidden components remain excluded, keyboard navigation works, and full MDX/source bodies are absent from the search payload. Compare initial transfer and first-open latency against the baseline.

## 3. Split component examples and source data

**Priority:** High.

**Finding:** `src/components/docs-focus/docs-focus-shell.tsx` imports the generated example registry. `src/registry/index.ts` contains eager example imports and embedded source strings and was approximately 408 KB of source during the audit.

**Implementation approach:**

1. Update the registry generator to emit per-component modules. Do not hand-edit generated files.
2. Separate lightweight catalog metadata from example components, source strings, and playground controls.
3. Generate explicit import mappings so each component can load independently.
4. Resolve the current component at the route boundary and provide only its required data to the docs shell.
5. Defer alternate examples, source panels, and controls until needed where that improves measured performance.
6. Inspect MDX component mappings and other registry consumers so they do not accidentally restore a dependency on the full collection.

Keep a useful initial preview and stable loading dimensions. Preserve installation resources and public component APIs.

**Verify:** Loading a simple component does not load unrelated shader or animation examples. Switching examples, copying source, and opening controls still work. Run registry generation, agent-resource generation, validation, and consumer checks; review generated artifacts together with the source change.

## 4. Reduce unnecessary media and global client work

**Priority:** High for video playback; medium for optional tooling and fonts.

**Findings:** Homepage showcase cards enable autoplay without viewport gating. `GuideframeGrid` mounts in the root layout. Four font families are attached to the root layout.

**Implementation approach:**

- Gate video playback with viewport visibility and document visibility. Pause when offscreen or when the browser tab is hidden.
- Keep posters available and respect reduced-motion preferences. Avoid unnecessary video loading before the card approaches the viewport.
- Retain existing hover and keyboard-focus behavior where applicable.
- Place Guideframe behind a development-only loading boundary so its inspection code is absent from production client bundles.
- Inventory actual font usage by route. Remove unused weights or restrict font loading to the routes that use them. Preserve the approved typography.
- Correct the featured Expanding Action slug from `exapnding-action` to `expanding-action` so the registry fallback resolves.

**Verify:** Offscreen videos stop, returning to a visible card behaves correctly, reduced motion uses an appropriate static presentation, and failed videos retain a working fallback. Confirm production bundles exclude development tooling. Check typography and layout shifts after font changes.

## 5. Reduce client-side syntax-highlighting work

**Priority:** Medium, guided by profiling.

**Finding:** Client code blocks import the shared Shiki highlighter. Language loading is already on demand, which should be preserved.

**Implementation approach:**

1. Identify static code blocks that can be highlighted during build or server rendering.
2. Send rendered highlighting output to the client while retaining the raw string needed for copying.
3. Keep client highlighting for genuinely dynamic code, and load it only when needed.
4. Preserve themes, line highlighting, diff markers, focus transformations, and accessible copy feedback.

Pre-rendered markup can increase route payloads. Compare total transfer and execution cost before choosing the approach for every block.

**Verify:** Code appearance and copy output remain correct across themes. Measure route payloads and browser execution time, including the first opening of the source panel.

## 6. Strengthen caching and public endpoint behavior

**Priority:** Medium.

**Findings:** The GitHub contribution helper uses `cache: "no-store"`. The route caches successful responses at the CDN, but origin misses still reach GitHub. Source content is also available through a filesystem-backed API.

**Implementation approach:**

- Cache normalized contribution data at the server layer using a stable key and an explicit freshness policy.
- Add an upstream timeout and a bounded stale-data fallback. A last-known-good value must survive the relevant deployment/runtime lifecycle if it is intended to protect against outages.
- Avoid coupling a shared cached refresh to one visitor's request-abort signal.
- Review failure behavior so upstream outages do not cause repeated expensive retries.
- Prefer generated static source resources for new internal consumers where practical. Preserve existing endpoint contracts until their usage is understood.
- Validate source requests against known registry entries, not only string sanitization.
- Inspect actual deployed cache headers and cache hits for HTML, route payloads, registry assets, and API responses. Do not infer production caching solely from `next.config.ts`.

**Verify:** Warm requests avoid unnecessary upstream calls, concurrent requests behave sensibly, and timeout/failure cases return controlled responses. Confirm no private data enters public caches and existing source consumers continue working.

Reference: [Next.js CDN caching guidance](https://nextjs.org/docs/app/guides/cdn-caching).

## 7. Consolidate component publication metadata

**Priority:** Medium; increasingly valuable as the catalog grows.

**Finding:** Docs, navigation, search, featured cards, and sitemap generation use multiple sources. Sitemap generation includes docs independently of navigation visibility.

**Implementation approach:**

1. Define a typed catalog with stable slugs, categories, release dates, compatibility information, and explicit publication settings.
2. Keep development status separate from publication status. A component may be installable or documented while intentionally unlisted.
3. Derive navigation, search, sitemap inclusion, and catalog listings from explicit rules.
4. Validate featured-card slugs and links against this catalog.
5. Add checks for missing docs, invalid links, duplicate slugs, and contradictory publication settings.

Do not automatically publish currently hidden components. Agree on visibility rules before migrating existing entries.

**Verify:** Existing intended visibility is preserved and each public surface agrees with the catalog's rules.

## 8. Improve production and accessibility checks

**Priority:** Medium, alongside implementation.

**Finding:** The quality workflow runs registry and TypeScript checks, then accessibility checks against the development server. The accessibility script scans preview regions for a fixed set of component slugs.

**Implementation approach:**

- Add a production build check and run representative browser smoke checks against production output.
- Retain preview-level accessibility scans and add whole-page checks for the homepage, catalog, docs shell, and search.
- Test meaningful interactions: opening and closing dialogs, Escape handling, focus return, keyboard selection, and reduced motion.
- Add payload regression checks after baseline budgets are agreed.
- Keep generated registry and agent-resource checks in the release path.

Automated accessibility scans supplement manual keyboard and visual review; they do not establish complete accessibility compliance.

**Verify:** CI catches broken production builds and representative interaction regressions, with failures that identify the affected page or behavior.

## Delivery sequence

| Phase | Work | Exit condition |
| --- | --- | --- |
| 1. Baseline | Production measurements and route/resource inventory | Reproducible baseline recorded |
| 2. Immediate fixes | Featured slug, development tooling boundary, viewport-aware videos | Functional and browser checks pass |
| 3. Payload boundaries | Search index, per-component imports, source/control loading | Unrelated collection content no longer loads on representative pages |
| 4. Runtime efficiency | Highlighting strategy, caching, source-resource usage, fonts | Measured improvements without behavior regressions |
| 5. Growth safeguards | Unified publication metadata, production CI, performance budgets | Catalog consistency and regression checks enforced |

Use focused changes rather than one large rewrite. Re-measure the affected routes after each phase and retain only optimizations that improve the relevant outcome without unacceptable tradeoffs.

## Constraints for future product features

- **Sponsors and roadmap:** Start with typed repository data and static pages. Introduce a CMS only when the editing workflow warrants it.
- **Component feedback:** Load one shared modal on demand. Keep submissions dynamic while documentation remains cacheable. Require server validation, durable storage, shared rate limits, and a private moderation workflow.
- **Paid products:** Keep purchase and account infrastructure separate from public documentation rendering. Add it after the product and entitlement model are defined.
- **Analytics:** Measure useful actions without treating command copies as successful installations or raw traffic as purchase intent.

Sponsor placement, roadmap presentation, and changes to visible layouts require a separate design decision with the site owner. Most optimization work above can preserve the current layout.

## Completion criteria

The optimization effort is complete when representative production routes have before/after evidence, unnecessary collection-wide client dependencies have been removed, optional media and tools load appropriately, caching behavior is verified, and release checks protect the improvements. Report source validation, production-build validation, browser verification, and deployed verification separately.
