import { type ReactNode } from "react";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="font-clash-display bg-slate-200 antialiased dark:bg-slate-950">
      {children}
    </main>
  );
};

export default LayoutWrapper;
