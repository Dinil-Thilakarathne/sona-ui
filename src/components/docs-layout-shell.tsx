"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { ToolDrawer } from "./docs-focus/docs-focus-types";

type DocsFocusPanelState = {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  documentOpen: boolean;
  setDocumentOpen: (open: boolean) => void;
  toolDrawer: ToolDrawer;
  setToolDrawer: (panel: ToolDrawer) => void;
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

  return (
    <DocsFocusPanelContext
      value={{
        navOpen,
        setNavOpen,
        documentOpen,
        setDocumentOpen,
        toolDrawer,
        setToolDrawer,
      }}
    >
      <main className="relative min-h-svh w-full">{children}</main>
    </DocsFocusPanelContext>
  );
};

export default DocsLayoutShell;
