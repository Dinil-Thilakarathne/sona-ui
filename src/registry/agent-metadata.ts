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
