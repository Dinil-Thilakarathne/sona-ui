"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const command = "bunx shadcn@latest add @sona-ui/fluid-tabs";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (non-secure context / older browser)
    }
  };

  return (
    <div className="mt-6 flex w-full max-w-xl items-center justify-between gap-2 overflow-hidden rounded-xl border border-border bg-card p-1.5 pl-3.5 text-left shadow-sm">
      <code className="overflow-hidden bg-transparent p-0 font-mono text-xs text-ellipsis whitespace-nowrap text-muted-foreground">
        $ {command}
      </code>
      <button
        type="button"
        onClick={copyCommand}
        className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-2 text-xs font-semibold text-background transition-transform duration-200 active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground motion-reduce:transition-none"
        aria-label={copied ? "Install command copied" : "Copy install command"}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Install command copied to clipboard" : ""}
      </span>
    </div>
  );
}
