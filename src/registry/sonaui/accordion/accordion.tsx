"use client";

import { Accordion } from "@base-ui/react/accordion";
import { cva } from "class-variance-authority";
import { createContext, type ReactNode, useContext } from "react";

import { cn } from "@/lib/sona-utils";
import AnimatedPlusMinusButton from "./animated-plus-minus-button";
import styles from "./styles.module.css";

export type AccordionVariant = "default" | "outlined" | "splitted" | "animated";

export interface AccordionProps
  extends Omit<Accordion.Root.Props<string>, "className" | "multiple"> {
  /** The accordion items. */
  children: ReactNode;
  /** Allows multiple accordion items to be open simultaneously. @default false */
  allowMultiple?: boolean;
  /** Controlled values of the currently open items. */
  value?: string[];
  /** Values of the initially open items for uncontrolled usage. */
  defaultValue?: string[];
  /** Called when the set of open item values changes. */
  onValueChange?: Accordion.Root.Props<string>["onValueChange"];
  /** Whether the entire accordion ignores interaction. @default false */
  disabled?: boolean;
  /** Keeps closed panels mounted in the DOM. @default false */
  keepMounted?: boolean;
  /** Allows browser find-in-page to reveal matching panel content. @default false */
  hiddenUntilFound?: boolean;
  /** Additional classes for the accordion root. */
  className?: string;
  /** Visual style of the accordion. @default "default" */
  variant?: AccordionVariant;
}

const accordionWrapperVariants = cva(
  "flex w-full flex-col items-stretch overflow-clip rounded-2xl",
  {
    variants: {
      variant: {
        default: "overflow-clip rounded-2xl",
        outlined: "overflow-clip rounded-2xl",
        splitted: "overflow-clip rounded-2xl",
        animated: styles.wrapper,
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const accordionItemVariants = cva(
  "relative w-full min-w-0 overflow-hidden bg-background text-foreground transition-[transform,border-radius] duration-300",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        outlined:
          "border-foreground border-t border-x last:border-b first:rounded-t-2xl last:rounded-b-2xl",
        splitted: "rounded-2xl",
        animated: styles.animated,
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const AccordionContext = createContext<{ variant: AccordionVariant } | null>(
  null,
);

function useAccordionContext(component: string) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(`${component} must be used within AccordionRoot`);
  }
  return context;
}

export function AccordionRoot({
  children,
  allowMultiple = false,
  className,
  variant = "default",
  ...props
}: AccordionProps) {
  return (
    <AccordionContext.Provider value={{ variant }}>
      <Accordion.Root
        multiple={allowMultiple}
        className={cn(
          accordionWrapperVariants({ variant }),
          variant === "splitted" && "gap-y-2",
          className,
        )}
        {...props}
      >
        {children}
      </Accordion.Root>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps
  extends Omit<Accordion.Item.Props, "className"> {
  /** Stable value used to identify the item. */
  value?: string;
  /** Additional classes for the accordion item. */
  className?: string;
}

export function AccordionItem({
  children,
  className,
  value,
  ...props
}: AccordionItemProps) {
  const { variant } = useAccordionContext("AccordionItem");

  return (
    <Accordion.Item
      value={value}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    >
      <div className="relative w-full min-w-0">{children}</div>
    </Accordion.Item>
  );
}

export interface AccordionItemHeaderProps {
  /** Header content displayed before the open-state icon. */
  children: ReactNode;
  /** Legacy item value; state is now owned by AccordionItem. */
  value?: string;
  /** Additional classes for the header layout. */
  className?: string;
}

export function AccordionItemHeader({
  children,
  className,
}: AccordionItemHeaderProps) {
  useAccordionContext("AccordionItemHeader");
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-center justify-between rounded-xl px-8 py-4 font-medium text-balance",
        className,
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <AnimatedPlusMinusButton />
    </div>
  );
}

export interface AccordionItemTriggerProps
  extends Omit<Accordion.Trigger.Props, "className"> {
  /** Trigger contents. */
  children: ReactNode;
  /** Legacy item value; state is now owned by AccordionItem. */
  value?: string;
  /** Additional classes for the trigger. */
  className?: string;
}

export function AccordionItemTrigger({
  children,
  className,
  value: _value,
  ...props
}: AccordionItemTriggerProps) {
  useAccordionContext("AccordionItemTrigger");
  return (
    <Accordion.Header className="w-full">
      <Accordion.Trigger
        className={cn(
          "group block w-full min-w-0 cursor-pointer text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          className,
        )}
        {...props}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

export interface AccordionItemContentProps
  extends Omit<Accordion.Panel.Props, "className"> {
  /** Panel contents. */
  children: ReactNode;
  /** Legacy item value; state is now owned by AccordionItem. */
  value?: string;
  /** Additional classes for the panel content. */
  className?: string;
}

export function AccordionItemContent({
  children,
  className,
  value: _value,
  ...props
}: AccordionItemContentProps) {
  useAccordionContext("AccordionItemContent");
  return (
    <Accordion.Panel
      className={cn(
        "h-[var(--accordion-panel-height)] w-full min-w-0 overflow-hidden text-sm opacity-100",
        "transition-[height,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "data-starting-style:h-0 data-ending-style:h-0",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "motion-reduce:transition-none",
      )}
      {...props}
    >
      <div className={cn("w-full min-w-0 px-8 pb-4", className)}>
        {children}
      </div>
    </Accordion.Panel>
  );
}

export { AccordionContext };
