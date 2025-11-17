import { type ReactNode } from "react";

import DocsLayoutShell from "@/components/DocsLayoutShell";

const ComponentLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <DocsLayoutShell>{children}</DocsLayoutShell>;
};

export default ComponentLayout;
