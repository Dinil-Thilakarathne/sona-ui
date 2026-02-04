import { type ReactNode } from "react";

import DocsLayoutShell from "@/components/docs-layout-shell";

const ComponentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <DocsLayoutShell>{children}</DocsLayoutShell>;
};

export default ComponentLayout;
