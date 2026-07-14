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
    "An iOS-style switch for immediate binary settings with tactile press feedback.",
    ["switch", "toggle", "boolean setting"],
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
});
