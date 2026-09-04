export type AgentResourceCategory =
  | "components"
  | "effects"
  | "text"
  | "shaders"
  | "foundations";

export type AgentResourceStatus = "stable" | "preview" | "deprecated";

export type AgentResourceMetadata = {
  name: string;
  title: string;
  category: AgentResourceCategory;
  status: AgentResourceStatus;
  summary: string;
  docsSlug: string;
  keywords: string[];
  useWhen: string[];
  avoidWhen: string[];
  capabilities: string[];
  accessibility: string[];
  motion: {
    purpose: string;
    reducedMotion: string;
  };
  related?: string[];
};

/**
 * The first agent-readable metadata slice. Keep this source independent from
 * generated registry artifacts so the contract can be validated before it is
 * expanded to the rest of the catalog.
 */
export const agentResourceMetadata = {
  "fluid-tabs": {
    name: "fluid-tabs",
    title: "Fluid Tabs",
    category: "components",
    status: "stable",
    summary:
      "An accessible tab selector for switching related views while preserving spatial continuity with a shared active surface.",
    docsSlug: "fluid-tabs",
    keywords: ["tabs", "navigation", "segmented content", "settings"],
    useWhen: [
      "The interface switches between a small set of related views.",
      "The active selection should feel spatially connected to the previous selection.",
    ],
    avoidWhen: [
      "The interface needs deep navigation rather than local view switching.",
      "There are too many options for a compact tab list.",
    ],
    capabilities: [
      "Base UI tab primitives",
      "Controlled and uncontrolled selection",
      "Capsule and underline variants",
      "Keyboard navigation",
    ],
    accessibility: [
      "Uses semantic tab roles and keyboard navigation through Base UI.",
      "Keep each tab label descriptive and preserve visible focus styles.",
    ],
    motion: {
      purpose:
        "Connect the previous and next selections with a shared active surface.",
      reducedMotion:
        "The active surface should switch without spatial animation.",
    },
    related: ["animated-tabs", "expandable-tabs"],
  },
  "animated-dialog": {
    name: "animated-dialog",
    title: "Animated Dialog",
    category: "components",
    status: "stable",
    summary:
      "A composable dialog for focused decisions or short tasks, with direction-aware enter and exit motion.",
    docsSlug: "animated-dialog",
    keywords: ["dialog", "modal", "confirmation", "focused task", "overlay"],
    useWhen: [
      "The user must complete or confirm a focused task without leaving the current page.",
      "The content needs an accessible modal boundary and explicit dismissal behavior.",
    ],
    avoidWhen: [
      "The content is essential to the page and should not be hidden behind an overlay.",
      "A lightweight disclosure or popover is sufficient.",
    ],
    capabilities: [
      "Base UI dialog primitives",
      "Controlled open state",
      "Direction-aware enter and exit motion",
      "Reduced-motion support",
    ],
    accessibility: [
      "Preserves dialog semantics, focus management, and keyboard dismissal through Base UI.",
      "Provide an accessible title and description for every dialog instance.",
    ],
    motion: {
      purpose: "Explain the dialog's relationship to the triggering surface.",
      reducedMotion:
        "Remove transform and opacity choreography while preserving the modal state change.",
    },
    related: ["animated-dropdown", "accordion"],
  },
  "mesh-gradient-shader": {
    name: "mesh-gradient-shader",
    title: "Mesh Gradient Shader",
    category: "shaders",
    status: "stable",
    summary:
      "A decorative animated color field for expressive backgrounds, powered by Paper Design Shaders.",
    docsSlug: "mesh-gradient-shader",
    keywords: ["shader", "background", "gradient", "hero", "decorative motion"],
    useWhen: [
      "A visual surface needs atmospheric depth behind readable foreground content.",
      "The experience can afford a WebGL-based decorative effect.",
    ],
    avoidWhen: [
      "The effect would compete with primary content or reduce text contrast.",
      "The target device or environment cannot reliably support the shader dependency.",
    ],
    capabilities: [
      "Paper Design Shaders integration",
      "Animated color spots and organic distortion",
      "Configurable visual composition",
    ],
    accessibility: [
      "Treat as decorative and keep meaningful content outside the shader canvas.",
      "Verify foreground contrast against the complete animated background.",
    ],
    motion: {
      purpose:
        "Add slow atmospheric depth without becoming the page's primary action.",
      reducedMotion:
        "Use a static composition or disable the animated shader for reduced-motion users.",
    },
  },
} satisfies Record<string, AgentResourceMetadata>;

function catalogEntry(
  name: string,
  title: string,
  category: AgentResourceCategory,
  summary: string,
  keywords: string[],
): AgentResourceMetadata {
  const decorative = category === "effects" || category === "shaders";
  return {
    name,
    title,
    category,
    status: "stable",
    summary,
    docsSlug: name,
    keywords,
    useWhen: [summary],
    avoidWhen: [
      decorative
        ? "The effect would compete with meaningful content or reduce readability."
        : "The interaction does not match the component's focused responsibility.",
    ],
    capabilities: ["Source-owned Sona UI component", "Semantic theme tokens"],
    accessibility: [
      "Preserve the component's documented semantic structure, keyboard behavior, and visible focus state.",
    ],
    motion: {
      purpose: decorative
        ? "Add restrained visual depth without competing with the primary task."
        : "Communicate state, continuity, or feedback at the point of interaction.",
      reducedMotion: decorative
        ? "Use a static or reduced visual treatment when motion is not preferred."
        : "Reduce nonessential choreography while preserving the state change and feedback.",
    },
  };
}

Object.assign(agentResourceMetadata, {
  "animated-dropdown": catalogEntry(
    "animated-dropdown",
    "Animated Dropdown",
    "components",
    "An accessible dropdown menu for choosing or revealing related actions with origin-aware enter motion.",
    ["dropdown", "menu", "actions"],
  ),
  "animated-switch": catalogEntry(
    "animated-switch",
    "Animated Switch",
    "components",
    "An iOS-inspired switch for immediate binary settings with tactile press feedback and optional thumb drag.",
    ["switch", "toggle", "boolean setting", "drag interaction"],
  ),
  button: catalogEntry(
    "button",
    "Button",
    "components",
    "A simple action button with subtle press feedback and reduced-motion support.",
    ["button", "cta", "action"],
  ),
  "dot-orbit-shader": catalogEntry(
    "dot-orbit-shader",
    "Dot Orbit Shader",
    "shaders",
    "An animated field of orbiting dots for decorative surfaces and expressive backgrounds.",
    ["shader", "dots", "background"],
  ),
  "magnetic-button": catalogEntry(
    "magnetic-button",
    "Magnetic Button",
    "effects",
    "A bounded pointer-aware wrapper that adds restrained magnetic pull around an interactive element.",
    ["magnetic", "pointer", "hover"],
  ),
  "animated-tabs": catalogEntry(
    "animated-tabs",
    "Animated Tabs",
    "components",
    "A keyboard-accessible tab selector with controlled state, disabled items, and a shared hover indicator.",
    ["tabs", "navigation", "hover"],
  ),
  "expanding-action": {
    name: "expanding-action",
    title: "Expanding Action",
    category: "components",
    status: "stable",
    summary:
      "A compact action that transforms in place to reveal two to four related choices while preserving context.",
    docsSlug: "expanding-action",
    keywords: ["action", "choices", "compact", "expanding"],
    useWhen: [
      "A compact trigger should reveal two to four closely related choices in place.",
      "The choices should remain visually connected to the action that revealed them.",
    ],
    avoidWhen: [
      "The choices perform navigation or require a long menu.",
      "The interaction contains a destructive action that needs deliberate confirmation.",
    ],
    capabilities: [
      "Controlled and uncontrolled expanded state",
      "Disabled trigger and choice support",
      "Keyboard-accessible button semantics",
      "Shared-surface transition between trigger and choices",
    ],
    accessibility: [
      "Uses button semantics and visible keyboard focus states for the trigger, back control, and choices.",
      "Keep choice labels specific enough to describe the resulting action.",
    ],
    motion: {
      purpose:
        "Preserve spatial continuity as one compact action transforms into its related choices.",
      reducedMotion:
        "Respect the user's reduced-motion preference while preserving the expanded and collapsed state change.",
    },
  },
  "activity-graph": {
    name: "activity-graph",
    title: "Activity Graph",
    category: "components",
    status: "stable",
    summary:
      "A keyboard-accessible calendar heatmap with normalized intensity levels and an interruptible shared focus surface.",
    docsSlug: "activity-graph",
    keywords: ["activity", "calendar", "heatmap", "contributions"],
    useWhen: [
      "Daily activity needs to be compared across a calendar range.",
      "People need keyboard access to individual days and their values.",
    ],
    avoidWhen: [
      "The data does not have a meaningful daily time dimension.",
      "Precise trend comparison would be clearer in a chart or table.",
    ],
    capabilities: [
      "Normalized intensity levels",
      "Controlled day selection",
      "Custom metadata and tooltip content",
      "Roving keyboard focus",
    ],
    accessibility: [
      "Supports visual-direction arrow keys, Home, End, Enter, and Space.",
      "Provides a range summary and larger targets for coarse pointers.",
    ],
    motion: {
      purpose:
        "Move a shared focus surface between days without obscuring the selected value.",
      reducedMotion:
        "Update the focus state immediately without spatial interpolation.",
    },
  },
  "avatar-showcase": {
    name: "avatar-showcase",
    title: "Avatar Showcase",
    category: "effects",
    status: "stable",
    summary:
      "A recording-friendly avatar strip with count-aware pacing, deterministic sampling, staggered lanes, and reduced-motion support.",
    docsSlug: "avatar-showcase",
    keywords: ["avatars", "community", "people", "social proof"],
    useWhen: [
      "An ordered group of people should be presented as a moving visual strip.",
      "A recent sample needs to represent a larger community count.",
    ],
    avoidWhen: [
      "Every person must remain individually readable or directly actionable.",
      "Motion would distract from the page's primary task.",
    ],
    capabilities: [
      "Count-aware pacing",
      "Deterministic avatar sampling",
      "Configurable staggered lanes",
      "Static reduced-motion presentation",
    ],
    accessibility: [
      "Provide a name for each person whenever it is available.",
      "Reduced-motion preferences show a static readable avatar group.",
    ],
    motion: {
      purpose:
        "Convey the scale and activity of a community with restrained lane movement.",
      reducedMotion:
        "Replace the moving lanes with a static readable avatar group.",
    },
  },
  "fluid-slider": {
    name: "fluid-slider",
    title: "Fluid Slider",
    category: "components",
    status: "stable",
    summary:
      "A labeled Base UI range control with direct surface selection, a draggable indicator, and restrained boundary resistance.",
    docsSlug: "fluid-slider",
    keywords: ["slider", "range", "numeric value", "input"],
    useWhen: [
      "A numeric value benefits from direct continuous adjustment.",
      "Reference marks or formatted values help explain meaningful thresholds.",
    ],
    avoidWhen: [
      "The value must be entered with exact precision more efficiently as text.",
      "The options are discrete named choices rather than a numeric range.",
    ],
    capabilities: [
      "Controlled and uncontrolled values",
      "Drag and direct track selection",
      "Reference marks and formatted values",
      "Form integration through Base UI",
    ],
    accessibility: [
      "Uses Base UI range semantics and keyboard controls.",
      "Keeps the semantic value within constraints while visual resistance remains decorative.",
    ],
    motion: {
      purpose:
        "Provide tactile feedback during direct manipulation and at range boundaries.",
      reducedMotion:
        "Keep keyboard and value updates immediate and remove nonessential resistance motion.",
    },
  },
  "fluid-tooltip": {
    name: "fluid-tooltip",
    title: "Fluid Tooltip",
    category: "components",
    status: "stable",
    summary:
      "A grouped Base UI tooltip system with a deliberate first appearance and fast directional handoffs between related controls.",
    docsSlug: "fluid-tooltip",
    keywords: ["tooltip", "toolbar", "labels", "grouped controls"],
    useWhen: [
      "A group of compact controls needs accessible supplementary labels.",
      "One tooltip surface should follow focus or pointer movement across related triggers.",
    ],
    avoidWhen: [
      "The information is essential and should remain visible without interaction.",
      "The content requires interactive controls or a persistent popover.",
    ],
    capabilities: [
      "Horizontal and vertical trigger groups",
      "Delayed first pointer appearance",
      "Immediate adjacent-trigger handoff",
      "Collision-aware Base UI positioning",
    ],
    accessibility: [
      "Uses Base UI tooltip semantics and accessible descriptions.",
      "Keyboard focus opens the relevant label immediately without directional travel.",
    ],
    motion: {
      purpose:
        "Preserve orientation as one tooltip surface moves between related controls.",
      reducedMotion:
        "Remove directional content travel while preserving the tooltip label.",
    },
  },
  lightbox: {
    name: "lightbox",
    title: "Lightbox",
    category: "components",
    status: "stable",
    summary:
      "An accessible image preview that expands from its thumbnail and returns to the same spatial origin when dismissed.",
    docsSlug: "lightbox",
    keywords: ["image", "preview", "gallery", "dialog"],
    useWhen: [
      "An image needs an inspectable full-size view without leaving the current page.",
      "The preview should retain a visible relationship to its thumbnail.",
    ],
    avoidWhen: [
      "The full image is primary page content and should remain visible.",
      "The experience needs gallery navigation that the component does not provide.",
    ],
    capabilities: [
      "Controlled and uncontrolled open state",
      "Thumbnail-to-preview spatial transition",
      "Optional caption",
      "Backdrop and preview styling hooks",
    ],
    accessibility: [
      "Uses Base UI for focus management, Escape dismissal, and scroll locking.",
      "Requires useful alternative text for the image.",
    ],
    motion: {
      purpose:
        "Explain that the full-size preview originates from and returns to its thumbnail.",
      reducedMotion:
        "Use a cross-fade instead of the thumbnail-to-preview spatial transition.",
    },
  },
  "section-rail": {
    name: "section-rail",
    title: "Section Rail",
    category: "components",
    status: "stable",
    summary:
      "A compact navigation rail that tracks progress through a long page and reveals labels or editorial context.",
    docsSlug: "section-rail",
    keywords: ["navigation", "sections", "progress", "long page"],
    useWhen: [
      "A long page, case study, or multi-step flow needs compact section navigation.",
      "Readers benefit from seeing the active section and nearby context.",
    ],
    avoidWhen: [
      "The page is too short to need persistent section navigation.",
      "The destinations lead to separate pages rather than sections in one experience.",
    ],
    capabilities: [
      "Anchor-based scroll mode",
      "Externally controlled active section",
      "Optional labels and context cards",
      "Coarse-pointer presentation",
    ],
    accessibility: [
      "Uses anchor links in scroll mode and buttons with current-state semantics in controlled mode.",
      "Shows visible labels for coarse pointers instead of relying on hover-only targets.",
    ],
    motion: {
      purpose:
        "Connect the active indicator and contextual details to the reader's current section.",
      reducedMotion:
        "Simplify indicator transitions and scrolling while preserving active-section feedback.",
    },
  },
  accordion: catalogEntry(
    "accordion",
    "Accordion",
    "components",
    "An accessible disclosure group for progressively revealing related content.",
    ["accordion", "disclosure", "collapsible"],
  ),
  "ripple-button": catalogEntry(
    "ripple-button",
    "Ripple Button",
    "components",
    "A button with localized press feedback that makes activation visible without changing the action's meaning.",
    ["button", "ripple", "press feedback"],
  ),
  marquee: catalogEntry(
    "marquee",
    "Marquee",
    "effects",
    "A continuously moving content rail for decorative or low-priority repeated content.",
    ["marquee", "loop", "scrolling content"],
  ),
  "spinning-text": catalogEntry(
    "spinning-text",
    "Spinning Text",
    "text",
    "A circular text treatment for short decorative labels and editorial accents.",
    ["text", "circular text", "typography"],
  ),
  "stagger-text": catalogEntry(
    "stagger-text",
    "Stagger Text",
    "text",
    "A text entrance treatment that reveals short content progressively while preserving readability.",
    ["text", "entrance", "stagger"],
  ),
  "link-preview": catalogEntry(
    "link-preview",
    "Link Preview",
    "components",
    "A contextual preview surface for supplied link metadata without relying on client-side scraping.",
    ["link", "preview", "metadata"],
  ),
  "bubble-up-button": catalogEntry(
    "bubble-up-button",
    "Bubble Up Button",
    "components",
    "An expressive button treatment that changes label or content with a contained upward transition.",
    ["button", "label transition", "action"],
  ),
  "expandable-tabs": catalogEntry(
    "expandable-tabs",
    "Expandable Tabs",
    "components",
    "A compact tab control that expands its selected item to expose more context.",
    ["tabs", "navigation", "expandable"],
  ),
  "split-text": catalogEntry(
    "split-text",
    "Split Text",
    "text",
    "A text animation primitive that treats words or characters as individually addressable visual units.",
    ["text", "split", "typography"],
  ),
  "image-trail": catalogEntry(
    "image-trail",
    "Image Trail",
    "effects",
    "A pointer-driven sequence of images for decorative cursor-following moments on fine pointers.",
    ["image", "cursor", "trail"],
  ),
  "spotlight-card": catalogEntry(
    "spotlight-card",
    "Spotlight Card",
    "components",
    "A card that reveals localized pointer lighting while keeping content and hierarchy stable.",
    ["card", "spotlight", "hover"],
  ),
  "hold-to-delete-button": catalogEntry(
    "hold-to-delete-button",
    "Hold To Delete Button",
    "components",
    "A deliberate destructive action that requires sustained input before completing deletion.",
    ["delete", "destructive action", "hold"],
  ),
  "circular-dock-menu": catalogEntry(
    "circular-dock-menu",
    "Circular Dock Menu",
    "components",
    "A radial action menu for a small set of spatially related actions.",
    ["menu", "radial", "dock"],
  ),
  "fan-view": catalogEntry(
    "fan-view",
    "Fan View",
    "effects",
    "A fan-like arrangement for browsing a small set of layered visual items.",
    ["gallery", "fan", "cards"],
  ),
  "smart-overflow": {
    name: "smart-overflow",
    title: "Smart Overflow",
    category: "components",
    status: "preview",
    summary:
      "A priority-first responsive action group that keeps important actions visible and moves lower-priority actions into an accessible three-dot menu.",
    docsSlug: "smart-overflow",
    keywords: ["actions", "toolbar", "overflow menu", "responsive", "priority"],
    useWhen: [
      "A compact action group has one or more actions that should stay visible as available width decreases.",
      "Secondary management actions can remain available in a three-dot menu without harming the main task.",
    ],
    avoidWhen: [
      "Every item has equal importance and needs to be scanned or compared, such as date ranges or tabs.",
      "The content is navigation, a long command list, or a full application toolbar.",
    ],
    capabilities: [
      "Composable SmartOverflowAction children",
      "Primary, secondary, and always-overflow priorities",
      "Responsive action measurement and focus recovery",
      "Base UI menu keyboard navigation",
      "Destructive action separation",
    ],
    accessibility: [
      "Visible actions retain button semantics and visible focus states.",
      "Hidden actions remain reachable through a labelled three-dot menu with Base UI focus management.",
      "Focus returns to the three-dot trigger when a focused action moves into overflow after resize.",
    ],
    motion: {
      purpose:
        "Preserve spatial continuity as actions reflow and the overflow trigger appears or disappears.",
      reducedMotion:
        "Update visible actions and the overflow trigger without layout travel or scale transitions.",
    },
    related: ["animated-dropdown", "expanding-action", "hold-to-delete-button"],
  },
  "circular-context-menu": {
    name: "circular-context-menu",
    title: "Circular Context Menu",
    category: "components",
    status: "preview",
    summary:
      "An edge-aware contextual action menu that fans a small, focused set of actions out from a selected object.",
    docsSlug: "circular-context-menu",
    keywords: ["context menu", "radial menu", "actions", "canvas", "selection"],
    useWhen: [
      "A selected canvas object, media item, or compact control needs a few immediate contextual actions.",
      "The actions are spatially related to one anchor and can be represented by concise icons or labels.",
    ],
    avoidWhen: [
      "The user needs to scan, compare, or search a long list of commands.",
      "A conventional toolbar, dropdown, or keyboard command palette would make the actions clearer.",
    ],
    capabilities: [
      "Composable Root, Anchor, Content, and Item API",
      "Controlled and uncontrolled open state",
      "Top, right, bottom, and left placements",
      "Configurable arc radius and spread",
      "Destructive action styling",
    ],
    accessibility: [
      "Uses a button anchor with expanded state and a labelled menu with menuitem actions.",
      "Arrow keys move between actions, Escape closes the menu, and focus returns to the anchor.",
      "Use concise accessible labels for icon-only actions and keep the action count small.",
    ],
    motion: {
      purpose:
        "Show that contextual actions originate from the selected object while preserving the selection's spatial relationship.",
      reducedMotion:
        "Open and close actions without spring travel, blur, hover scaling, or press scaling.",
    },
    related: ["circular-dock-menu", "animated-dropdown", "smart-overflow"],
  },
});
