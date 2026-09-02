"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { ToolDrawer } from "./docs-focus/docs-focus-types";

type DocsFocusPanelState = {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  documentOpen: boolean;
  setDocumentOpen: (open: boolean) => void;
  toolDrawer: ToolDrawer;
  setToolDrawer: (panel: ToolDrawer) => void;
  mobileMatch: boolean | null;
};

const DocsFocusPanelContext = createContext<DocsFocusPanelState | null>(null);

export function useDocsFocusPanelState() {
  const state = useContext(DocsFocusPanelContext);
  if (!state) {
    throw new Error(
      "useDocsFocusPanelState must be used within DocsLayoutShell.",
    );
  }
  return state;
}

const DocsLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);
  const [toolDrawer, setToolDrawer] = useState<ToolDrawer>(null);
  const [mobileMatch, setMobileMatch] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 899px)");
    const update = () => setMobileMatch(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <DocsFocusPanelContext
      value={{
        navOpen,
        setNavOpen,
        documentOpen,
        setDocumentOpen,
        toolDrawer,
        setToolDrawer,
        mobileMatch,
      }}
    >
      <main className="relative min-h-svh w-full [&.zen-mode_.docs-zen-sidebar-toggle]:hidden [&.zen-mode_.docs-zen-controls]:hidden [&.zen-mode_.docs-zen-install-command]:hidden">
        {children}
      </main>
    </DocsFocusPanelContext>
  );
};

export default DocsLayoutShell;
