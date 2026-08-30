export type FocusDoc = {
  title: string;
  slug: string;
  body: { code: string; raw: string };
  sourceFiles?: Record<string, string>;
};

export type ToolDrawer = "controls" | "source" | null;

export type Navigation = {
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
};
