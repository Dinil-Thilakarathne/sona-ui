"use client";

import { Button } from "@base-ui/react/button";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/components/copy-button/lib/copy-to-clipboard";
import { cn } from "@/lib/utils";

export function useCopyToClipboard(timeout: number = 2000) {
  const [copied, setCopied] = useState(false);

  // Clean up timeout on unmount or when copied changes
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [copied, timeout]);

  const copy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
    }
  };

  return { copied, copy };
}

interface CopyButtonProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "onClick" | "children" | "size" | "variant"
  > {
  content: string;
  timeout?: number;
  copyIcon?: React.ReactNode;
  checkIcon?: React.ReactNode;
  label?: React.ReactNode;
}

function CopyButton({
  content,
  timeout = 2000,
  className,
  copyIcon,
  checkIcon,
  label,
  ...props
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard(timeout);
  const reduceMotion = useReducedMotion();

  const defaultCopyIcon = (
    <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-4" />
  );
  const defaultCheckIcon = (
    <HugeiconsIcon
      icon={Tick02Icon}
      strokeWidth={2}
      className="size-4 text-green-500"
    />
  );

  return (
    <Button
      data-slot="copy-button"
      onClick={() => {
        copy(content);
      }}
      className={cn(
        "size-auto rounded-md p-1.5 text-muted-foreground [grid-template-areas:'stack'] [&>span]:grid [&>span]:place-content-center [&>span]:p-0",
        "relative",
        "flex items-center justify-center",
        "hover:cursor-pointer",
        "transition-transform duration-150 ease-out active:scale-95 motion-reduce:transition-none",
        className,
      )}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy"}
      {...props}
    >
      {label}
      <AnimatePresence initial={false} mode="sync">
        <motion.span
          key={copied ? "copied" : "copy"}
          aria-hidden="true"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0.2, scale: 0.65, filter: "blur(4px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0.2, scale: 0.65, filter: "blur(4px)" }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }
          className="absolute inset-0 flex items-center justify-center [grid-area:stack]"
        >
          {copied
            ? (checkIcon ?? defaultCheckIcon)
            : (copyIcon ?? defaultCopyIcon)}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

export { CopyButton };
