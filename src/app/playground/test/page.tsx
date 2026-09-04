"use client";

import { BookOpenText, Code2, Home, Settings2 } from "lucide-react";
import Link from "@/components/common/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "@/components/common/theme-toggle";
import {
  FocusActionsBar,
  FocusActionTooltip,
  IconButton,
} from "@/components/docs-focus/docs-focus-shell";
import { Search } from "@/components/Search";
import { GIT_REP_LINK } from "@/lib/constants";

export default function Page() {
  const [activePanel, setActivePanel] = useState<
    "description" | "controls" | "source" | null
  >(null);

  return (
    <main className="min-h-svh bg-focus-overlay">
      <FocusActionsBar>
        <FocusActionTooltip id="test-home" label="Home">
          <Link
            href="/"
            aria-label="Home"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:cursor-pointer hover:bg-accent hover:text-foreground"
          >
            <Home className="size-4" />
          </Link>
        </FocusActionTooltip>
        <FocusActionTooltip id="test-search" label="Search">
          <Search compact />
        </FocusActionTooltip>
        <FocusActionTooltip id="test-github" label="View on GitHub">
          <a
            href={GIT_REP_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="View Sona UI on GitHub"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors duration-150 ease-out hover:cursor-pointer hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FaGithub className="size-4" aria-hidden="true" />
          </a>
        </FocusActionTooltip>
        <FocusActionTooltip id="test-description" label="Description">
          <IconButton
            label="Description"
            active={activePanel === "description"}
            onClick={() =>
              setActivePanel((panel) =>
                panel === "description" ? null : "description",
              )
            }
          >
            <BookOpenText className="size-4" />
          </IconButton>
        </FocusActionTooltip>
        <FocusActionTooltip id="test-controls" label="Controls">
          <IconButton
            label="Controls"
            active={activePanel === "controls"}
            onClick={() =>
              setActivePanel((panel) =>
                panel === "controls" ? null : "controls",
              )
            }
          >
            <Settings2 className="size-4" />
          </IconButton>
        </FocusActionTooltip>
        <FocusActionTooltip id="test-source" label="Source">
          <IconButton
            label="Source"
            active={activePanel === "source"}
            onClick={() =>
              setActivePanel((panel) => (panel === "source" ? null : "source"))
            }
          >
            <Code2 className="size-4" />
          </IconButton>
        </FocusActionTooltip>
        <FocusActionTooltip id="test-theme" label="Toggle theme">
          <ModeToggle />
        </FocusActionTooltip>
      </FocusActionsBar>
    </main>
  );
}
