import type { ReactNode } from "react";
import DocsLayoutShell from "@/components/docs-layout-shell";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <DocsLayoutShell>{children}</DocsLayoutShell>;
}
