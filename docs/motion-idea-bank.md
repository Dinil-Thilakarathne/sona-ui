# Sona UI: motion-led component idea bank

Created: 2026-09-06  
Status: research and original concepts, not approved implementations  
Scope: all 52 numbered ideas discussed in this session, plus earlier unnumbered directions below

## Purpose

Build useful product components whose interaction benefits from fluid motion, morphing, and continuous layout changes. Prioritize recognizable objects moving between meaningful states. A component must remain useful when motion is removed.

This document preserves the 20 Apple-inspired entries, 10 entries from other products, and 22 original proposals. Original means proposed in this discussion, not proven novel across the industry. Linked sources establish reference behaviors; the proposed motion sequences are Sona adaptations, not verified reproductions of every source product's animation. Sources were researched on 2026-09-05. No prototypes, runtime tests, or visual verification have been performed for this bank.

## Admission and interaction principles

1. Solve a recurring job in at least three credible product contexts.
2. Explain the Sona contribution beyond a standard primitive or visual skin.
3. Keep a stable visual identity through size, state, and position changes.
4. Make transitions interruptible. Rapid reversal should continue from the current rendered geometry, not restart or queue stale transitions.
5. Use direct manipulation while dragging; settle only after release. Precision controls must not drift after the user chooses a value.
6. Preserve readable text and media aspect ratios. Do not stretch content to fake a container morph.
7. Keep geometry ownership consistent. Agree on anchors, dimensions, collision behavior, and responsive layout before implementation.
8. Keyboard, touch, screen-reader support, visible focus, and reduced motion are part of the initial contract.
9. Under reduced motion, apply the same state changes immediately or with minimal opacity transitions. Never remove functionality or delay completion for choreography.
10. Consumer callbacks own network requests, persistence, domain validation, and actual success. Animation cannot manufacture successful outcomes.
11. Favor a small composable API with controlled state where coordination is necessary. API names below are exploratory, not public contracts.
12. Ask the user before material layout decisions. This idea bank authorizes neither a layout nor an implementation.

## How to read each brief

Each entry includes a job, three contexts, a motion sequence, a realistic demo, accessibility and edge cases, and a scope boundary. Apply the shared principles to every entry, especially reduced motion and interruption. References are inspiration, not evidence that a candidate has passed admission.

## Index

| ID | Candidate | Origin |
| --- | --- | --- |
| 01 | [Expandable Control Tile](#01-expandable-control-tile) | Apple reference |
| 02 | [Activity Capsule](#02-activity-capsule) | Apple reference |
| 03 | [Quick Preview](#03-quick-preview) | Apple reference |
| 04 | [Reaction Picker](#04-reaction-picker) | Apple reference |
| 05 | [Precision Scrubber](#05-precision-scrubber) | Apple reference |
| 06 | [Search Tokens](#06-search-tokens) | Apple reference |
| 07 | [Zoomable Collection](#07-zoomable-collection) | Apple reference |
| 08 | [Swipe Action Row](#08-swipe-action-row) | Apple reference |
| 09 | [Snap Detail Sheet](#09-snap-detail-sheet) | Apple reference |
| 10 | [Expandable Agenda](#10-expandable-agenda) | Apple reference |
| 11 | [Widget Stack](#11-widget-stack) | Apple reference |
| 12 | [Compact Player](#12-compact-player) | Apple reference |
| 13 | [Floating Viewer](#13-floating-viewer) | Apple reference |
| 14 | [Card Deck](#14-card-deck) | Apple reference |
| 15 | [Notification Group](#15-notification-group) | Apple reference |
| 16 | [Collection Stack](#16-collection-stack) | Apple reference |
| 17 | [Workspace Switcher](#17-workspace-switcher) | Apple reference |
| 18 | [Context Preview](#18-context-preview) | Apple reference |
| 19 | [Trim Selection](#19-trim-selection) | Apple reference |
| 20 | [Dockable Utility Panel](#20-dockable-utility-panel) | Apple reference |
| 21 | [Command Flow](#21-command-flow) | Other product reference |
| 22 | [Save Dock](#22-save-dock) | Other product reference |
| 23 | [Transfer Board](#23-transfer-board) | Other product reference |
| 24 | [Selection Toolbar](#24-selection-toolbar) | Other product reference |
| 25 | [Thread Reveal](#25-thread-reveal) | Other product reference |
| 26 | [Upload Surface](#26-upload-surface) | Other product reference |
| 27 | [Action Variant Button](#27-action-variant-button) | Other product reference |
| 28 | [Queue Builder](#28-queue-builder) | Other product reference |
| 29 | [Record Inspector](#29-record-inspector) | Other product reference |
| 30 | [Issue Peek](#30-issue-peek) | Other product reference |
| 31 | [Compare Tray](#31-compare-tray) | Original proposal |
| 32 | [Undo Slot](#32-undo-slot) | Original proposal |
| 33 | [Schedule Chip](#33-schedule-chip) | Original proposal |
| 34 | [Assignment Cluster](#34-assignment-cluster) | Original proposal |
| 35 | [Conflict Resolver](#35-conflict-resolver) | Original proposal |
| 36 | [Branching Form](#36-branching-form) | Original proposal |
| 37 | [Selection Lens](#37-selection-lens) | Original proposal |
| 38 | [Step Handoff](#38-step-handoff) | Original proposal |
| 39 | [Batch Merge](#39-batch-merge) | Original proposal |
| 40 | [Retry in Place](#40-retry-in-place) | Original proposal |
| 41 | [Version Lens](#41-version-lens) | Original proposal |
| 42 | [Adjustable Summary](#42-adjustable-summary) | Original proposal |
| 43 | [Dependency Reveal](#43-dependency-reveal) | Original proposal |
| 44 | [Distribution Control](#44-distribution-control) | Original proposal |
| 45 | [Split Item](#45-split-item) | Original proposal |
| 46 | [Rule Sentence](#46-rule-sentence) | Original proposal |
| 47 | [Exception Expander](#47-exception-expander) | Original proposal |
| 48 | [Before / After Ledger](#48-before-after-ledger) | Original proposal |
| 49 | [Anchor Note](#49-anchor-note) | Original proposal |
| 50 | [Alternative Shelf](#50-alternative-shelf) | Original proposal |
| 51 | [Handoff Receipt](#51-handoff-receipt) | Original proposal |
| 52 | [Pinned Comparison](#52-pinned-comparison) | Original proposal |

<a id="01-expandable-control-tile"></a>

## 01. Expandable Control Tile

**Job:** Give a frequently used control a compact state and a detailed editing state.

**Use cases:** Microphone settings; smart-home devices; camera controls.

**Interaction and motion:** Tile → expanded controls → updated tile. Keep the icon and current value anchored while secondary controls enter.

**Demo to prove the idea:** A microphone tile opens device selection, gain, and a live level meter.

**Accessibility and edge cases:** Provide an explicit expand button, label each control, and restore focus on collapse. Do not make long press the only entry.

**Scope and overlap:** One control group; no dashboard layout manager.

**Reference:** [Source interaction](https://support.apple.com/en-nz/guide/iphone/iph59095ec58/ios).

<a id="02-activity-capsule"></a>

## 02. Activity Capsule

**Job:** Track one ongoing operation without occupying a permanent large panel.

**Use cases:** Uploads; report exports; recording sessions.

**Interaction and motion:** Compact status → progress details and actions → success or failure summary. Preserve task identity across every state.

**Demo to prove the idea:** Exporting a report exposes progress and cancel; completion exposes a download action.

**Accessibility and edge cases:** Announce meaningful status changes politely, never every percentage tick. Expansion must not steal focus on background updates.

**Scope and overlap:** One operation lifecycle; not a global notification platform.

**Reference:** [Source interaction](https://developer.apple.com/design/human-interface-guidelines/live-activities).

<a id="03-quick-preview"></a>

## 03. Quick Preview

**Job:** Inspect a selected item without leaving its collection.

**Use cases:** Document browsers; CMS assets; attachments.

**Interaction and motion:** Thumbnail → preview → next preview → original collection. Adapt the surface to content without distorting media.

**Demo to prove the idea:** Preview a PDF, move to an image, then close back to the currently selected item.

**Accessibility and edge cases:** Use explicit close and next/previous actions. Restore focus to a surviving item when the original disappears.

**Scope and overlap:** Preview shell and navigation; consumers provide renderers. Overlaps Lightbox and FocusPanel.

**Reference:** [Source interaction](https://support.apple.com/en-gb/guide/mac-help/-mh14119/mac).

<a id="04-reaction-picker"></a>

## 04. Reaction Picker

**Job:** Attach a quick response to a specific piece of content.

**Use cases:** Messages; design comments; community posts.

**Interaction and motion:** Picker unfolds beside target → selected reaction becomes a badge → badges reflow as counts or membership change.

**Demo to prove the idea:** React to a design comment, change the reaction, then inspect who reacted.

**Accessibility and edge cases:** Keyboard-operable choices need names and selected states. Provide click/tap access and labelled count details.

**Scope and overlap:** Reaction selection and summary; not a messaging system.

**Reference:** [Source interaction](https://support.apple.com/en-ca/guide/iphone/iph018d3c336/ios).

<a id="05-precision-scrubber"></a>

## 05. Precision Scrubber

**Job:** Move from quick adjustment to precise manipulation without losing the current value.

**Use cases:** Canvas zoom; playback speed; image adjustments.

**Interaction and motion:** Compact value → enlarged adjustment surface → committed value. Pointer movement changes the value directly; settling must not alter it.

**Demo to prove the idea:** A 100% zoom control opens a labelled scale with common presets and exact input.

**Accessibility and edge cases:** Support arrows, Home/End where appropriate, and numeric input. Avoid momentum on precision values.

**Scope and overlap:** One bounded value. Compare with FluidSlider before creating a new primitive.

**Reference:** [Source interaction](https://support.apple.com/en-euro/guide/iphone/iph263472f78/ios).

<a id="06-search-tokens"></a>

## 06. Search Tokens

**Job:** Keep structured search decisions visible and editable.

**Use cases:** Issue search; asset filtering; contact directories.

**Interaction and motion:** Suggestion → token → editable token. Tokens and input reflow while the active insertion point remains usable.

**Demo to prove the idea:** Choose an assignee, add a status, then edit the assignee without clearing the query.

**Accessibility and edge cases:** Define Backspace, arrow, removal, and suggestion navigation behavior. Announce removals without disrupting typing.

**Scope and overlap:** Token interaction and representation; consumer owns query evaluation.

**Reference:** [Source interaction](https://developer.apple.com/documentation/uikit/uisearchtoken).

<a id="07-zoomable-collection"></a>

## 07. Zoomable Collection

**Job:** Change browsing density while preserving orientation.

**Use cases:** Photo libraries; product catalogs; design assets.

**Interaction and motion:** Dense grid → larger previews → dense grid. Keep a selected or pointer-anchored item visible through the rearrangement.

**Demo to prove the idea:** Increase thumbnail size while reviewing an asset library without losing the selected image.

**Accessibility and edge cases:** Offer density buttons alongside pinch. Keep DOM reading order and focus stable; avoid animating hundreds of offscreen items.

**Scope and overlap:** Collection density transitions; not a virtualized browser engine.

**Reference:** [Source interaction](https://support.apple.com/en-ie/guide/iphone/iph7d24753a5/ios).

<a id="08-swipe-action-row"></a>

## 08. Swipe Action Row

**Job:** Expose contextual actions through direct manipulation.

**Use cases:** Inbox triage; task lists; saved items.

**Interaction and motion:** Row follows pointer → actions reveal → cancel restores row or commit removes it and closes the gap.

**Demo to prove the idea:** Swipe to archive a message, with the same action available through a visible menu.

**Accessibility and edge cases:** Provide keyboard and button alternatives. Distinguish horizontal intention from page scroll and guard destructive commits.

**Scope and overlap:** A row interaction; no list data management.

**Reference:** [Source interaction](https://support.apple.com/en-mide/guide/iphone/iph376ef8aa3/ios).

<a id="09-snap-detail-sheet"></a>

## 09. Snap Detail Sheet

**Job:** Let people choose how much secondary information occupies the screen.

**Use cases:** Map results; delivery details; product information.

**Interaction and motion:** Summary → partial detail → full detail. Dragging tracks directly and release settles to a defined snap point.

**Demo to prove the idea:** A location summary expands to opening hours, then to the complete place details.

**Accessibility and edge cases:** Provide named expand/collapse actions. Define scroll-versus-drag ownership, focus containment, and virtual-keyboard behavior.

**Scope and overlap:** One sheet; extend the existing PeekSheet idea if the contract matches.

**Reference:** [Source interaction](https://emilkowal.ski/ui/building-a-drawer-component).

<a id="10-expandable-agenda"></a>

## 10. Expandable Agenda

**Job:** Reveal event detail while preserving date context.

**Use cases:** Booking widgets; team schedules; content calendars.

**Interaction and motion:** Compact day indicators → labelled event rows → compact summary. Keep the selected date visible.

**Demo to prove the idea:** Open a busy day to inspect three events, then return to the month summary.

**Accessibility and edge cases:** Use explicit date selection and event links. Keep selected date distinct from keyboard focus and handle empty days.

**Scope and overlap:** Date-to-agenda disclosure; not a complete calendar engine.

**Reference:** [Source interaction](https://support.apple.com/en-ph/guide/iphone/iphfd1054569/ios).

<a id="11-widget-stack"></a>

## 11. Widget Stack

**Job:** Browse related summaries within one stable footprint.

**Use cases:** Project summaries; device dashboards; personal planners.

**Interaction and motion:** Panel follows a swipe → next panel settles into the same surface. A position indicator identifies the active panel.

**Demo to prove the idea:** Switch between today’s tasks, upcoming meetings, and a project summary.

**Accessibility and edge cases:** Provide next/previous controls and panel names. Avoid automatic rotation while reading or interacting.

**Scope and overlap:** Manual stack navigation first; not an intelligent recommendation service.

**Reference:** [Source interaction](https://support.apple.com/en-euro/118610).

<a id="12-compact-player"></a>

## 12. Compact Player

**Job:** Expose deeper playback controls without interrupting media.

**Use cases:** Podcasts; recorded lessons; voice messages.

**Interaction and motion:** Mini player → full controls → queue or details → mini player. Artwork and progress retain continuity.

**Demo to prove the idea:** Expand a lesson player to seek, adjust speed, and inspect the upcoming lessons.

**Accessibility and edge cases:** Keep a single playback instance. Label seek controls, preserve focus, and keep controls available without hover.

**Scope and overlap:** Player presentation and state coordination; no streaming backend.

**Reference:** [Source interaction](https://support.apple.com/en-ca/guide/music/mus71d7dcfce/mac).

<a id="13-floating-viewer"></a>

## 13. Floating Viewer

**Job:** Keep reference media visible while working elsewhere in the page.

**Use cases:** Tutorial videos; meeting video; reference footage.

**Interaction and motion:** Embedded viewer → small floating viewer → edge position → restored viewer. Preserve media aspect ratio.

**Demo to prove the idea:** Keep a tutorial visible while completing a form alongside it.

**Accessibility and edge cases:** Offer move/restore controls without dragging. Respect viewport bounds and distinguish an in-page surface from browser Picture-in-Picture APIs.

**Scope and overlap:** One viewer surface; no general window manager.

**Reference:** [Source interaction](https://support.apple.com/en-ie/guide/iphone/iphcc3587b5d/ios).

<a id="14-card-deck"></a>

## 14. Card Deck

**Job:** Select among recognizable cards within a small collection.

**Use cases:** Tickets; memberships; saved payment methods.

**Interaction and motion:** Selected card moves forward → siblings compress → reordering opens a destination gap.

**Demo to prove the idea:** Select one ticket from a trip while keeping other journey segments reachable.

**Accessibility and edge cases:** Offer a readable list alternative and move controls. Hidden cards must not leave invisible interactive elements focusable.

**Scope and overlap:** Small collections; validate against Fan View before admission.

**Reference:** [Source interaction](https://support.apple.com/guide/iphone/organize-and-search-in-wallet-iphbea35dbc4/26/ios/26).

<a id="15-notification-group"></a>

## 15. Notification Group

**Job:** Expand a burst of related updates into individually actionable items.

**Use cases:** Project updates; review requests; system alerts.

**Interaction and motion:** Group summary → individual updates → dismissed item closes out → remaining group collapses.

**Demo to prove the idea:** Open four updates about the same document and dismiss one resolved update.

**Accessibility and edge cases:** Keep unread and expanded states separate. Preserve focused items during new arrivals and provide explicit dismissal.

**Scope and overlap:** Grouping presentation; not delivery infrastructure.

**Reference:** [Source interaction](https://support.apple.com/en-ie/108781).

<a id="16-collection-stack"></a>

## 16. Collection Stack

**Job:** Reveal the contents of a compact bundle.

**Use cases:** Document bundles; screenshots; message attachments.

**Interaction and motion:** Overlapping previews → actionable collection → previews return to stack positions.

**Demo to prove the idea:** Expand a bundle of design references and open one attachment.

**Accessibility and edge cases:** Use a labelled expand button and maintain item reading order. Touch and keyboard cannot depend on hover.

**Scope and overlap:** Collection disclosure; evaluate overlap with Fan View and List Stack.

**Reference:** [Source interaction](https://support.apple.com/en-euro/guide/mac-help/mh35846/mac).

<a id="17-workspace-switcher"></a>

## 17. Workspace Switcher

**Job:** Switch between a small set of active work contexts while recognizing each.

**Use cases:** Open documents; design canvases; research sessions.

**Interaction and motion:** Current workspace contracts into preview collection → selected workspace expands.

**Demo to prove the idea:** Switch between three open canvases while each retains its selection and zoom state.

**Accessibility and edge cases:** Use accessible workspace names and direct switching controls. Avoid copying interactive content into multiple live previews.

**Scope and overlap:** High-scope candidate. Consumer owns workspace state and layout; discuss geometry before prototype.

**Reference:** [Source interaction](https://support.apple.com/en-by/guide/iphone/iph1a1f981ad/ios).

<a id="18-context-preview"></a>

## 18. Context Preview

**Job:** Inspect a reference without losing reading position.

**Use cases:** Knowledge links; issue references; profile mentions.

**Interaction and motion:** Reference → anchored metadata preview → reference. Changing targets updates one stable surface where practical.

**Demo to prove the idea:** Inspect an issue mentioned in a document without navigating away.

**Accessibility and edge cases:** Support focus and click/tap, Escape, and safe pointer travel. Do not obscure the target or trap focus unnecessarily.

**Scope and overlap:** Extend LinkPreview with supplied metadata; no arbitrary remote-page scraping.

**Reference:** [Source interaction](https://support.apple.com/guide/iphone/browse-the-web-iph1fbef4daa/26/ios/26).

<a id="19-trim-selection"></a>

## 19. Trim Selection

**Job:** Select a precise portion of media before committing an edit.

**Use cases:** Audio clips; video excerpts; recording review.

**Interaction and motion:** Compact timeline → editing timeline → handles move selected boundaries → summary of chosen range.

**Demo to prove the idea:** Trim a voice clip with visible start, end, and duration values before saving a copy.

**Accessibility and edge cases:** Each handle needs keyboard control and a distinct name. Offer numeric boundaries and prevent invalid crossed ranges.

**Scope and overlap:** Selection UI; consumer owns media processing. Related to MediaScrubber.

**Reference:** [Source interaction](https://support.apple.com/en-ca/guide/iphone/iphc9bdaee83/ios).

<a id="20-dockable-utility-panel"></a>

## 20. Dockable Utility Panel

**Job:** Keep a utility available at an appropriate level of prominence.

**Use cases:** Inspectors; reference notes; editing tools.

**Interaction and motion:** Floating → docked → expanded. Position and size change continuously while content adapts.

**Demo to prove the idea:** Dock a properties inspector alongside a canvas instead of covering the selected object.

**Accessibility and edge cases:** Offer explicit docking controls, predictable focus order, and minimum dimensions. Avoid drag-only placement.

**Scope and overlap:** High-scope candidate; agree on geometry and host layout ownership first.

**Reference:** [Source interaction](https://support.apple.com/en-gb/125309).

<a id="21-command-flow"></a>

## 21. Command Flow

**Job:** Complete a contextual command through a small sequence of choices.

**Use cases:** Move documents; assign issues; configure exports.

**Interaction and motion:** Results → actions → required inputs → confirmation within one persistent surface.

**Demo to prove the idea:** Choose Move file, select a destination, and receive a confirmation in the same panel.

**Accessibility and edge cases:** Preserve query and selection when going back. Define Escape, submenu navigation, and field focus per step.

**Scope and overlap:** Command presentation only; not a plugin execution framework.

**Reference:** [Source interaction](https://manual.raycast.com/action-panel).

<a id="22-save-dock"></a>

## 22. Save Dock

**Job:** Make explicit unsaved changes actionable and understandable.

**Use cases:** Settings; product editing; profile forms.

**Interaction and motion:** Unsaved indicator → save/discard controls → saving → saved or recoverable error.

**Demo to prove the idea:** Edit product details, save them, and recover from a failed request without losing edits.

**Accessibility and edge cases:** Do not treat animation completion as successful persistence. Keep errors readable and avoid stealing focus when dirty state changes.

**Scope and overlap:** Explicit save flow; merge with Change Review when detailed diffs are needed.

**Reference:** [Source interaction](https://shopify.dev/docs/apps/design/app-structure).

<a id="23-transfer-board"></a>

## 23. Transfer Board

**Job:** Move items between meaningful stages while making placement clear.

**Use cases:** Task stages; publishing pipelines; candidate tracking.

**Interaction and motion:** Card lifts → target gap opens → card settles → source and destination lists update.

**Demo to prove the idea:** Move a task from In progress to Review and roll it back if persistence fails.

**Accessibility and edge cases:** Provide a Move to action and announce final stage and position. Support empty columns and page scrolling.

**Scope and overlap:** Movement between supplied lists; not an entire kanban application.

**Reference:** [Source interaction](https://atlassian.design/components/pragmatic-drag-and-drop/examples).

<a id="24-selection-toolbar"></a>

## 24. Selection Toolbar

**Job:** Expose batch actions without losing selection scope.

**Use cases:** File managers; inventory tables; inboxes.

**Interaction and motion:** Browsing toolbar → selected count and batch controls → browsing toolbar. Shared actions retain identity.

**Demo to prove the idea:** Select five files and move them together, then clear selection.

**Accessibility and edge cases:** Distinguish selected visible items from all matching items. Recover focus if the active action vanishes.

**Scope and overlap:** Selection actions only; overlaps the earlier Adaptive Toolbar and existing idea-bank candidate.

**Reference:** [Source interaction](https://carbondesignsystem.com/components/data-table/usage/).

<a id="25-thread-reveal"></a>

## 25. Thread Reveal

**Job:** Reveal a discussion while retaining its parent context.

**Use cases:** Design feedback; document comments; support discussions.

**Interaction and motion:** Reply summary → parent-anchored conversation → reply summary. New replies make room without shifting the reader unexpectedly.

**Demo to prove the idea:** Open four replies under a design comment and write a response.

**Accessibility and edge cases:** Label the discussion with its parent, preserve draft text, and avoid automatic scrolling while reading older replies.

**Scope and overlap:** Thread disclosure and layout; consumer owns messaging and persistence.

**Reference:** [Source interaction](https://slack.com/help/articles/115000769927-Use-threads-to-organize-discussions-).

<a id="26-upload-surface"></a>

## 26. Upload Surface

**Job:** Keep file selection, progress, and recovery connected.

**Use cases:** Application attachments; CMS uploads; document imports.

**Interaction and motion:** Empty drop area → selected file collection → progress → completion or inline recovery.

**Demo to prove the idea:** Upload several files, retry one failure, and remove another before submission.

**Accessibility and edge cases:** Provide a file-picker alternative to drag/drop. Expose per-file errors and cancellation without noisy progress announcements.

**Scope and overlap:** UI around consumer upload callbacks; combine with Attachment Tray or Transfer Queue.

**Reference:** [Source interaction](https://uppy.io/docs/dashboard/).

<a id="27-action-variant-button"></a>

## 27. Action Variant Button

**Job:** Choose how to perform a primary action without hiding the default.

**Use cases:** Send or send later; publish or schedule; export formats.

**Interaction and motion:** Secondary segment opens variants → selected variant updates primary label → action runs.

**Demo to prove the idea:** Choose PDF rather than CSV before triggering an export.

**Accessibility and edge cases:** Opening options must never execute the primary action. Keep menu semantics and accessible names explicit.

**Scope and overlap:** Primary action plus related variants; assess whether a composed button and menu already suffice.

**Reference:** [Source interaction](https://m3.material.io/components/split-button).

<a id="28-queue-builder"></a>

## 28. Queue Builder

**Job:** Assemble an ordered sequence while retaining a compact summary.

**Use cases:** Music queues; lesson sequences; presentation playlists.

**Interaction and motion:** Added item updates summary → queue expands → items reposition → compact summary returns.

**Demo to prove the idea:** Build a lesson sequence and move the introductory lesson to the beginning.

**Accessibility and edge cases:** Provide move-up/down or position controls, announce changes, and distinguish the current item from selected items.

**Scope and overlap:** Sequence editing; merge with Reorder Group if no additional queue-specific behavior emerges.

**Reference:** [Source interaction](https://support.spotify.com/us/article/play-queue/).

<a id="29-record-inspector"></a>

## 29. Record Inspector

**Job:** Edit secondary record properties while retaining collection context.

**Use cases:** CRM contacts; project records; asset metadata.

**Interaction and motion:** Property summary → inspector → expanded field group → updated summary.

**Demo to prove the idea:** Inspect an asset’s metadata while remaining in the asset list.

**Accessibility and edge cases:** Preserve edits during selection changes or explicitly resolve them. Label groups and maintain a predictable focus route.

**Scope and overlap:** One record inspector; related to Contextual Inspector and FocusPanel.

**Reference:** [Source interaction](https://www.notion.com/help/layouts).

<a id="30-issue-peek"></a>

## 30. Issue Peek

**Job:** Quickly inspect neighboring records during triage.

**Use cases:** Issue triage; customer records; review queues.

**Interaction and motion:** Focused row → lightweight preview → next record updates same surface → close.

**Demo to prove the idea:** Read an issue summary and move to the next issue without repeatedly opening dialogs.

**Accessibility and edge cases:** Focus and selection must remain distinct. Provide explicit open-in-full action and keyboard dismissal.

**Scope and overlap:** Treat as a Quick Preview variant unless the triage contract is distinct.

**Reference:** [Source interaction](https://linear.app/docs/peek).

<a id="31-compare-tray"></a>

## 31. Compare Tray

**Job:** Gather a few candidates and compare them without losing their origins.

**Use cases:** Products; subscription plans; file versions.

**Interaction and motion:** Item → tray thumbnail → comparison column. Removing an item redistributes available space.

**Demo to prove the idea:** Select three products and expand their thumbnails into aligned comparison columns.

**Accessibility and edge cases:** Expose selection count, removal names, and a meaningful comparison table. Limit capacity and preserve focus after removal.

**Scope and overlap:** Small comparison collection; related to CompareCards but focused on gathering candidates.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="32-undo-slot"></a>

## 32. Undo Slot

**Job:** Make a removal reversible at the location where it happened.

**Use cases:** Tasks; attachments; saved items.

**Interaction and motion:** Item → compact undo placeholder → restored item or closed gap.

**Demo to prove the idea:** Remove an attachment, inspect the undo placeholder, and restore it in the original position.

**Accessibility and edge cases:** Undo must remain reachable. Do not expire while focused; define timing explicitly and retain data until the action is final.

**Scope and overlap:** One reversible removal; consumer supplies undo semantics.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="33-schedule-chip"></a>

## 33. Schedule Chip

**Job:** Edit a schedule from its readable summary.

**Use cases:** Reminders; publishing; appointments.

**Interaction and motion:** Date summary → date/time editor → updated summary with selected values maintained.

**Demo to prove the idea:** Change Tomorrow, 9 AM to Friday afternoon without opening a full settings page.

**Accessibility and edge cases:** Name timezone, validate dates, distinguish cancel from apply, and restore focus to the chip.

**Scope and overlap:** Scheduling disclosure; compose date/time controls rather than build a calendar engine.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="34-assignment-cluster"></a>

## 34. Assignment Cluster

**Job:** Edit membership while showing who is currently responsible.

**Use cases:** Task ownership; reviewers; event participants.

**Interaction and motion:** Assignee summary → people picker → selected people join cluster → summary.

**Demo to prove the idea:** Add two reviewers, remove one, and inspect the final reviewer list.

**Accessibility and edge cases:** Provide names beyond avatars, keyboard multi-selection, and labelled removal. Define empty and overflow states.

**Scope and overlap:** Membership selection; related to PresenceStack but assignment is not online presence.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="35-conflict-resolver"></a>

## 35. Conflict Resolver

**Job:** Resolve two competing values with a visible final outcome.

**Use cases:** Import conflicts; duplicate contacts; settings synchronization.

**Interaction and motion:** Conflicting value → alternatives → chosen value occupies final field.

**Demo to prove the idea:** Choose between imported and existing phone numbers while keeping both visible until commit.

**Accessibility and edge cases:** Clearly label source and destination. Do not choose by visual position alone; permit explicit confirmation and manual editing where supported.

**Scope and overlap:** One conflict at a time; consumer defines merge and persistence rules.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="36-branching-form"></a>

## 36. Branching Form

**Job:** Show fields relevant to a selected option while preserving context.

**Use cases:** Delivery methods; report configuration; support requests.

**Interaction and motion:** Option selection → related branch opens → change option reshapes fields → submit.

**Demo to prove the idea:** Choose delivery rather than pickup and reveal the address fields.

**Accessibility and edge cases:** Define whether hidden branch values persist. Remove hidden fields from focus and validation; focus an error only after submission.

**Scope and overlap:** Conditional disclosure coordination; not a form-builder platform.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="37-selection-lens"></a>

## 37. Selection Lens

**Job:** Attach summary and actions to an explicitly selected range.

**Use cases:** Timeline clips; spreadsheet cells; chart intervals.

**Interaction and motion:** Range selection → attached summary → expanded actions → updated or cleared selection.

**Demo to prove the idea:** Select a chart interval to see its duration and aggregate values, then open export actions.

**Accessibility and edge cases:** Provide non-pointer range entry, explain selection boundaries, and avoid obstructing handles or data.

**Scope and overlap:** Consumer supplies selection geometry and statistics.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="38-step-handoff"></a>

## 38. Step Handoff

**Job:** Keep completed decisions editable as the next step opens.

**Use cases:** Checkout; onboarding; booking.

**Interaction and motion:** Active step → compact editable summary → next active step; revisiting reverses the relationship.

**Demo to prove the idea:** Confirm delivery details, inspect their summary, then choose payment.

**Accessibility and edge cases:** Use headings and explicit edit controls. Preserve data and move focus deliberately on navigation, not on every validation update.

**Scope and overlap:** Step presentation and transitions; consumer owns workflow validity.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="39-batch-merge"></a>

## 39. Batch Merge

**Job:** Group selected items while preserving their membership and order.

**Use cases:** File bundles; grouped expenses; research collections.

**Interaction and motion:** Selected items → proposed group → expanded members → ungrouped items.

**Demo to prove the idea:** Bundle selected research references under a shared title, then ungroup them later.

**Accessibility and edge cases:** Provide explicit group/ungroup actions and name the resulting group. Define original-order restoration when unrelated items change.

**Scope and overlap:** Visual grouping, not destructive merging of data.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="40-retry-in-place"></a>

## 40. Retry in Place

**Job:** Recover a failed operation without losing the failed item.

**Use cases:** Uploads; invitations; background jobs.

**Interaction and motion:** Progress item → expanded failure explanation → retry progress → result.

**Demo to prove the idea:** Retry one failed invitation while successful invitations remain unchanged.

**Accessibility and edge cases:** Errors need persistent text and a labelled retry action. Guard duplicate requests and distinguish retryable from permanent failures.

**Scope and overlap:** One item’s recovery UI; reusable within Upload Surface and Fluid Queue.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="41-version-lens"></a>

## 41. Version Lens

**Job:** Inspect revisions in a stable preview before choosing one.

**Use cases:** Document revisions; design iterations; saved configurations.

**Interaction and motion:** Version marker → history rail → previewed revision → return or explicitly restore.

**Demo to prove the idea:** Inspect three saved theme configurations and restore one only after confirming.

**Accessibility and edge cases:** Separate preview from restore. Give revisions meaningful names, keyboard navigation, and visible current-version state.

**Scope and overlap:** Version selection and preview; not diff generation or version storage.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="42-adjustable-summary"></a>

## 42. Adjustable Summary

**Job:** Edit the inputs behind a compact calculated result.

**Use cases:** Seat counts; storage allocation; order quantities.

**Interaction and motion:** Summary → determining controls → live result → updated summary.

**Demo to prove the idea:** Expand a seat total, adjust quantity, and see the recalculated amount before applying.

**Accessibility and edge cases:** Label units and calculation assumptions. Announce committed changes and avoid distracting announcements on every keystroke.

**Scope and overlap:** Small value editor with consumer-supplied calculation; no billing logic.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="43-dependency-reveal"></a>

## 43. Dependency Reveal

**Job:** Explore what an item depends on without opening an entire graph application.

**Use cases:** Task blockers; course prerequisites; automation steps.

**Interaction and motion:** Item → immediate dependencies and dependents → selected neighbor becomes center. Shared nodes move to new roles.

**Demo to prove the idea:** Inspect why a release is blocked, then focus the unfinished prerequisite.

**Accessibility and edge cases:** Offer an equivalent list with relationship labels. Support cycles, missing items, and long titles without relying on connecting lines alone.

**Scope and overlap:** One neighborhood at a time, bounded depth and count; not a graph editor.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="44-distribution-control"></a>

## 44. Distribution Control

**Job:** Redistribute a fixed total while preserving constraints.

**Use cases:** Budget allocation; time planning; capacity planning.

**Interaction and motion:** Segmented total → boundary manipulation → adjacent amounts update → valid distribution settles.

**Demo to prove the idea:** Allocate a 40-hour week across three projects while locking one project at 8 hours.

**Accessibility and edge cases:** Every amount needs numeric input and keyboard controls. Define minima, maxima, rounding, and locked segments before motion.

**Scope and overlap:** A constrained allocation control; no financial or planning engine.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="45-split-item"></a>

## 45. Split Item

**Job:** Divide one item into children while preserving a meaningful total.

**Use cases:** Expenses; tasks; shipment quantities.

**Interaction and motion:** Parent → editable children → confirmed split; merging reverses the surface relationship.

**Demo to prove the idea:** Split a shipment of 12 units into deliveries of 5 and 7.

**Accessibility and edge cases:** Explain total conservation and validation errors. Provide explicit add/remove and confirm controls, with focus moving to the new child.

**Scope and overlap:** Split interaction and totals; consumer owns domain semantics and storage.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="46-rule-sentence"></a>

## 46. Rule Sentence

**Job:** Edit a rule as a readable sentence with individually editable phrases.

**Use cases:** Alerts; automation rules; notification preferences.

**Interaction and motion:** Sentence → one phrase becomes editor → valid choice contracts into sentence → rule review.

**Demo to prove the idea:** Edit Notify me when stock falls below 10 by opening the operator and threshold phrases.

**Accessibility and edge cases:** Each phrase is an explicit labelled control. Support keyboard traversal, invalid intermediate values, and localization without assuming English word order.

**Scope and overlap:** Finite rule grammar supplied by consumer; not natural-language parsing or an automation engine.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="47-exception-expander"></a>

## 47. Exception Expander

**Job:** Focus attention on items that need intervention after a batch operation.

**Use cases:** Bulk edits; permission changes; imports.

**Interaction and motion:** Batch result summary → unresolved exceptions → individual resolution → updated summary.

**Demo to prove the idea:** An import succeeds for 24 rows and exposes three invalid rows for correction.

**Accessibility and edge cases:** Always distinguish completed, pending, and failed counts. A resolved focused row must hand focus to a predictable survivor or the summary.

**Scope and overlap:** Partial-success presentation; consumer owns retries and validation.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="48-before-after-ledger"></a>

## 48. Before / After Ledger

**Job:** Make the consequences of a proposed change inspectable before committing.

**Use cases:** Bulk renaming; configuration changes; data cleanup.

**Interaction and motion:** Proposed action → paired old/new values → new values become authoritative on confirmed success.

**Demo to prove the idea:** Preview file renames, exclude one, then apply the remaining changes.

**Accessibility and edge cases:** Old and new columns require semantic labels. Show omissions and errors; never imply success before the operation returns.

**Scope and overlap:** Change review and selection; no transformation engine.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="49-anchor-note"></a>

## 49. Anchor Note

**Job:** Keep a discussion visibly associated with the thing it describes.

**Use cases:** Chart annotations; design reviews; document feedback.

**Interaction and motion:** Marker → connected note → reply or resolved indicator → marker.

**Demo to prove the idea:** Attach a note to a chart point and open it without losing which observation it concerns.

**Accessibility and edge cases:** Markers need names and keyboard access. Provide a note list when anchors are offscreen; specify behavior when targets move or disappear.

**Scope and overlap:** Annotation presentation and target geometry; no collaboration backend.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="50-alternative-shelf"></a>

## 50. Alternative Shelf

**Job:** Try alternatives while retaining the original for immediate restoration.

**Use cases:** Theme previews; image selection; layout presets.

**Interaction and motion:** Current choice → temporary alternatives shelf → provisional choice → apply or restore original.

**Demo to prove the idea:** Preview several cover images and cancel back to the original selection.

**Accessibility and edge cases:** Make preview versus committed state explicit. Keyboard focus alone should not persist a selection; preserve original data until Apply.

**Scope and overlap:** Controlled preview transaction; not a full asset browser.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="51-handoff-receipt"></a>

## 51. Handoff Receipt

**Job:** Show where a submitted item went and what happens next.

**Use cases:** Review requests; document submissions; delegated tasks.

**Interaction and motion:** Submitted item → destination receipt → delivery or acceptance details → updated receipt.

**Demo to prove the idea:** Submit a document for review and see received, awaiting review, or delivery failure.

**Accessibility and edge cases:** State labels must distinguish sent, delivered, and accepted. Updates should not steal focus; timestamps and failure recovery remain readable.

**Scope and overlap:** Consumer-supplied lifecycle status; not delivery tracking infrastructure.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

<a id="52-pinned-comparison"></a>

## 52. Pinned Comparison

**Job:** Keep one reference stable while evaluating alternatives against it.

**Use cases:** Design revisions; equipment selection; plan comparison.

**Interaction and motion:** Reference pins → candidate changes beside it → aligned attributes update → new reference optionally pins.

**Demo to prove the idea:** Pin the current design and inspect successive revisions against it.

**Accessibility and edge cases:** Use semantic comparison labels, explicit pin/unpin controls, and stable reading order. Handle missing attributes openly.

**Scope and overlap:** One reference and one candidate at a time; related to Compare Tray but avoids a growing column set.

**Origin:** Original proposal from this discussion; novelty remains unvalidated.

## Earlier directions and consolidation

These concepts appeared before the numbered bank. Preserve their intent without treating alternate names as additional independent components.

| Earlier idea | Job and motion opportunity | Where it belongs |
| --- | --- | --- |
| Change Review / Review Dock | Summarize edits, reveal changed fields, revert individual changes, and return focus to a field. Relevant to settings, profiles, and CMS forms. | Save Dock plus Before / After Ledger. Decide whether review is necessary or a simple save state is sufficient. |
| Async Action / Progress Action | Keep pending, success, failure, and retry connected to the triggering action. Relevant to saving, exporting, and invitations. | Existing idea-bank candidate; coordinate with Expanding Action before adding another component. |
| Filter Summary | Reveal readable active filters, remove one, and let the remaining summaries reflow. Relevant to catalogs, analytics, and search. | Search Tokens when editing occurs in a query field; otherwise retain as a separate results-adjacent summary pattern. |
| Reorder List / Reorder Group | Lift an item, make space among siblings, and settle into the chosen position. Relevant to playlists, task priorities, and navigation editors. | Shared interaction behind Queue Builder and Transfer Board. A simple list remains a narrower candidate than a board. |
| Fluid Flow | One persistent surface resizes through input, review, pending, and result states. Relevant to invitations, report scheduling, and feedback. | Related to Step Handoff, but only one step is visible at a time. Reference: [Build UI Resizable Panel](https://buildui.com/recipes/resizable-panel). |
| Morphing Composer | A New action becomes the creation form, then a submitted-item summary. Relevant to tasks, calendar events, and quick notes. | Distinct from a generic dialog only if trigger-to-form continuity, cancellation, and completion are solved together. Reference: [Material transformations](https://m1.material.io/motion/transforming-material.html). |
| Fluid Queue / Transfer Queue | Items arrive, progress, fail, retry, and leave while surrounding items retain continuity. Relevant to uploads, downloads, and background jobs. | Upload Surface plus Retry in Place. Reference: [Build UI Animated Email Client](https://buildui.com/recipes/animated-email-client) for list entry and removal, not for upload behavior. |
| Adaptive Toolbar / Selection Actions | Transform browsing controls into contextual selection actions. | Selection Toolbar, entry 24. |
| Attachment Tray | An attachment affordance expands into a file collection and upload lifecycle. | Upload Surface, entry 26; consumer placement remains undecided. |
| Expandable Collection | A compact group opens into individually actionable items. | Collection Stack, entry 16. |
| Search Surface | Search expands into results, then into the selected item's preview while retaining the query. | Command Flow or Quick Preview composition. Avoid admitting a second search component without a distinct interaction contract. |

## Suggested exploration order

These are provisional judgments from this discussion, not approved priorities or scores backed by user research.

| Candidate | Why explore it | Main question before code |
| --- | --- | --- |
| Rule Sentence | A compact, readable interface with meaningful phrase-to-editor morphing. | Can a finite grammar handle three use cases and localization without becoming a query-builder framework? |
| Expandable Control Tile | Strong compact-to-detailed continuity with recognizable everyday controls. | Does expansion happen inline or in an overlay, and which element remains anchored? |
| Exception Expander | Motion can explain partial success and direct attention to unresolved work. | How do resolved items leave while keyboard focus and error context stay predictable? |
| Distribution Control | Direct manipulation expresses a constrained relationship rather than decoration. | What are the exact redistribution, locking, and rounding rules? |
| Compare Tray | Clear shared-element transitions from gathering to evaluating candidates. | How many items are supported, and how does comparison work on narrow screens? |
| Undo Slot | Small scope and a useful reversible state change. | When does removal become final, and can the placeholder remain until explicit dismissal? |
| Split Item | A meaningful reason for one surface to become several. | Which domains share a sufficiently consistent split/merge contract? |

High-scope candidates to defer until their boundaries are clearer: Workspace Switcher, Dockable Utility Panel, and unrestricted Transfer Board. Candidate extensions to review before new publication: Context Preview, Issue Peek, Snap Detail Sheet, Precision Scrubber, Card Deck, and Collection Stack.

## Deeper contracts for the latest concepts

### Dependency Reveal

- Start with immediate prerequisites and dependents, not arbitrary graph depth. Set an explicit maximum visible node count.
- Preserve identity by stable item IDs when recentering. Moving an item to the center must not duplicate its interactive controls.
- Loading another neighborhood retains the current view until data arrives. Errors leave the current item accessible with Retry.
- Consumer inputs: focused ID, items, directed relationships, and an on-focus-change callback. Geometry and navigation can be component responsibilities; graph fetching cannot.
- Prototype evidence: navigate a cycle, handle a missing dependency, use long labels, and traverse the equivalent list with a keyboard.

### Distribution Control

- Establish the invariant first: all portions sum to the configured total, subject to a documented rounding unit.
- Initial proposal: a boundary changes only its two adjacent unlocked segments. Locked segments, minimums, and maximums constrain movement. Broader redistribution is a separate decision.
- Maintain exact committed numeric values separately from decorative interpolation. A boundary must never visually imply an invalid allocation.
- Consumer inputs: total, segment IDs and values, bounds, locked state, and change/commit callbacks. Support numeric editing with the same validation rules.
- Prototype evidence: a 40-hour total, one locked segment, decimal increments, a minimum-bound collision, and keyboard-only editing.

### Split Item

- Distinguish preview children from persisted children. Editing the proposed split does not remove the original record.
- Define conservation per consumer: quantity or money can be additive; task progress is not automatically additive.
- Cancel restores the original intact. Failed commit retains proposed children and their values for correction or retry.
- Consumer inputs: original item, proposed children, validation, and confirm/cancel callbacks. Do not assume backend merge is reversible.
- Prototype evidence: split 12 units into 5 and 7, enter an invalid total, add a third child, cancel, and retry after failure.

### Rule Sentence

- Begin with one condition and one outcome, for example: Notify me when stock falls below 10. Nested AND/OR rules are out of scope initially.
- Model phrase identity separately from its displayed words. Consumer-supplied ordering and labels must support different languages.
- Only one phrase editor is active initially. Escape cancels that phrase's draft; Apply updates the sentence. Leaving an invalid editor cannot silently commit.
- Consumer inputs: phrase descriptors, allowed choices or field renderers, current values, and validation/change callbacks.
- Prototype evidence: alert threshold, notification frequency, and a simple automation trigger; test long labels and a different phrase order.

### Exception Expander

- Treat summary counts as data: total, completed, pending, and failed. Counts must reconcile and must not be inferred from the number of mounted rows.
- Open only the unresolved subset. Successful items may be inspected separately if needed, but should not flood the recovery view.
- A successful retry updates counts immediately from the confirmed result. A departing focused row transfers focus to the next unresolved row or the summary.
- Consumer inputs: summary counts, exception IDs and descriptions, pending state per item, and resolve/retry callbacks.
- Prototype evidence: three different failures, one non-retryable error, two simultaneous retries, and the final exception resolving.

### Before / After Ledger

- Each row has a stable ID, old value, proposed value, inclusion state, and operation result. Exclusion changes the proposal, not the existing data.
- Preserve alignment and labels during motion. Do not animate text character-by-character in a way that suggests intermediate values are valid.
- If a batch partially succeeds, confirmed rows become current and failed rows retain their old/proposed pair. Compose with Exception Expander where appropriate.
- Consumer inputs: paired values, selected IDs, commit callback, and per-item results. The component does not compute transformations.
- Prototype evidence: bulk rename with one excluded row, one collision, long values, and a partial failure.

### Anchor Note

- The consumer supplies target identity and geometry. Distinguish a target temporarily outside the viewport from one permanently deleted.
- Choose overlay versus inline placement with the user. Collision handling must not move the note unpredictably while someone types.
- Keep draft text across collapse. Resolution changes note state only after consumer confirmation.
- Consumer inputs: target reference or rectangle, note state/content, and open/resolve callbacks.
- Prototype evidence: scrolling target, narrow viewport, multiple adjacent markers, missing target, and keyboard navigation through a note list.

### Alternative Shelf

- Keep three states distinct: original, currently previewed, and committed. Cancel always restores the original from the current editing session.
- Preview side effects must be reversible. Do not use this pattern for operations with irreversible external consequences.
- Async previews must ignore stale responses so an earlier candidate cannot overwrite the newest choice.
- Consumer inputs: original ID, candidate IDs, preview callback, commit callback, and restore callback.
- Prototype evidence: fast candidate switching, failed preview loading, cancellation, and changing the original externally while the shelf is open.

### Handoff Receipt

- Define the lifecycle explicitly for each use case. Sent, delivered, accepted, and completed are separate states where the domain distinguishes them.
- The receipt follows confirmed events. A visual transition cannot infer acceptance from elapsed time.
- Errors expose a clear destination and recovery action. Retries must not create duplicate submissions without consumer safeguards.
- Consumer inputs: destination, current status, timestamps, details, and allowed actions.
- Prototype evidence: delayed acknowledgement, rejected handoff, retry, and a status update arriving while details are open.

### Pinned Comparison

- Keep one reference fixed while one candidate changes. Align attributes by stable keys rather than row position.
- Missing values should read as unavailable, not zero or an empty implied match.
- Pinning the candidate replaces the reference only through an explicit action. Navigating candidates does not silently change the reference.
- Consumer inputs: reference ID, candidate ID, ordered attribute definitions, values, and selection callbacks.
- Prototype evidence: different attribute coverage, long text, keyboard switching, and a narrow-screen presentation agreed with the user.

## Prototype and release evidence

For any selected idea, write a focused implementation brief before changing source:

1. Confirm the recurring job, three real demo contexts, and why an existing component cannot cover it cleanly.
2. Agree on geometry: anchor, expansion direction, inline versus overlay placement, viewport behavior, and mobile presentation.
3. Enumerate idle, open, editing, pending, success, failure, cancellation, and empty states that actually apply.
4. Specify state ownership, focus destinations, keyboard commands, screen-reader announcements, and reduced-motion behavior.
5. Test rapid reversal, changing content during motion, long labels, empty content, failed requests, and removal of the focused item.
6. Run appropriate static checks, then separately verify real keyboard, pointer, touch, responsive, and reduced-motion behavior. Static checks alone do not verify motion quality.
7. Promote only after the interaction is approved. Follow the repository's current component, registry, documentation, and agent-resource workflows at that time.

## Decisions still open

- No component from this document has been approved for implementation.
- No public component names or APIs have been finalized.
- Layout choices remain user-owned and need discussion before prototyping.
- The strongest shortlist is provisional; broad reference gathering does not establish originality or demand.
- This file is a local planning document. It was created without staging or committing changes.
