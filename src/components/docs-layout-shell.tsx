import type { ReactNode } from "react";

const DocsLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <main className="relative min-h-svh w-full">{children}</main>;
};

export default DocsLayoutShell;
