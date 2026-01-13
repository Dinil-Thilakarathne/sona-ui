"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TabsVariant = "capsule" | "underline";
type TabsSize = "small" | "medium";
type TabsSide = "left" | "right";

/* -------------------------------------------------------------------------------------------------
 * CVA Variants
 * -------------------------------------------------------------------------------------------------*/

const tabsListVariants = cva(
  [
    "group/tabs-list text-muted-foreground relative z-0 inline-flex w-fit items-center justify-center gap-1",
    "data-[orientation=vertical]:flex-col data-[orientation=vertical]:self-start",
  ],
  {
    variants: {
      variant: {
        capsule: "bg-muted rounded-xl",
        underline:
          "data-[orientation=horizontal]:px-0 data-[orientation=horizontal]:pt-0 data-[orientation=vertical]:py-0",
      },
      size: {
        small: "p-0.5 data-[orientation=horizontal]:gap-x-0.5",
        medium: "p-1 data-[orientation=horizontal]:gap-x-1",
      },
      side: {
        left: "",
        right: "",
      },
    },
    compoundVariants: [
      {
        variant: "underline",
        side: "left",
        class:
          "data-[orientation=vertical]:**:data-[slot=tabs-trigger]:justify-end",
      },
      {
        variant: "underline",
        side: "right",
        class:
          "data-[orientation=vertical]:**:data-[slot=tabs-trigger]:justify-start",
      },
    ],
    defaultVariants: {
      variant: "capsule",
      size: "medium",
      side: "left",
    },
  },
);

const tabIndicatorVariants = cva(
  [
    "ease-out-cubic absolute z-[-1] transition-all duration-200",
    // Vertical orientation
    "data-[orientation=vertical]:top-0 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:translate-y-(--active-tab-top)",
    // Horizontal orientation
    "data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=horizontal]:translate-x-(--active-tab-left) data-[orientation=horizontal]:-translate-y-1/2",
  ],
  {
    variants: {
      variant: {
        underline: [
          "bg-neutral rounded-full",
          "data-[orientation=vertical]:w-0.75",
          "data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:top-auto data-[orientation=horizontal]:h-0.75 data-[orientation=horizontal]:translate-y-0",
        ],
        capsule: [
          "bg-card dark:bg-accent  border bg-clip-padding shadow-[0_1px_2px_0_oklch(0.18_0_0/0.06)]",
          "data-[orientation=vertical]:w-auto",
          "data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:h-(--active-tab-height)",
        ],
      },
      size: {
        small: "",
        medium: "",
      },
      side: {
        left: "",
        right: "",
      },
    },
    compoundVariants: [
      {
        variant: "capsule",
        size: "small",
        class: "rounded-sm data-[orientation=vertical]:inset-x-0.5",
      },
      {
        variant: "capsule",
        size: "medium",
        class: "rounded-md data-[orientation=vertical]:inset-x-1",
      },
      {
        variant: "underline",
        side: "left",
        class: "data-[orientation=vertical]:right-0",
      },
      {
        variant: "underline",
        side: "right",
        class: "data-[orientation=vertical]:left-0",
      },
    ],
    defaultVariants: {
      variant: "capsule",
      size: "medium",
      side: "left",
    },
  },
);

function Tabs({ className, ...props }: BaseTabs.Root.Props) {
  return (
    <BaseTabs.Root
      data-slot="tabs"
      className={cn(
        "flex min-w-0 gap-2",
        "data-[orientation=vertical]:flex-row",
        "data-[orientation=horizontal]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function TabsList({
  variant = "capsule",
  size = "medium",
  side = "left",
  className,
  children,
  ...props
}: BaseTabs.List.Props & {
  variant?: TabsVariant;
  size?: TabsSize;
  side?: TabsSide;
}) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      data-variant={variant}
      data-size={size}
      data-side={side}
      className={cn(tabsListVariants({ variant, size, side }), className)}
      {...props}
    >
      {children}
      <div
        data-slot="tabs-divider"
        className={cn(
          "bg-accent absolute z-[-2] rounded-full",
          variant === "underline" ? "block" : "hidden",
          // Vertical orientation
          "group-data-[orientation=vertical]/tabs-list:top-0 group-data-[orientation=vertical]/tabs-list:bottom-0 group-data-[orientation=vertical]/tabs-list:w-[2px]",
          side === "left" &&
            "group-data-[orientation=vertical]/tabs-list:right-0 group-data-[orientation=vertical]/tabs-list:-translate-x-[0.5px]",
          side === "right" &&
            "group-data-[orientation=vertical]/tabs-list:left-0 group-data-[orientation=vertical]/tabs-list:translate-x-[0.5px]",
          // Horizontal orientation
          "group-data-[orientation=horizontal]/tabs-list:right-0 group-data-[orientation=horizontal]/tabs-list:bottom-0 group-data-[orientation=horizontal]/tabs-list:left-0 group-data-[orientation=horizontal]/tabs-list:h-[2px] group-data-[orientation=horizontal]/tabs-list:-translate-y-[0.5px]",
        )}
        aria-hidden="true"
      />
      <TabIndicator variant={variant} size={size} side={side} />
    </BaseTabs.List>
  );
}

function TabsTrigger({ className, ...props }: BaseTabs.Tab.Props) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Base styles
        "text-muted-foreground data-active:text-foreground flex cursor-pointer items-center gap-1.5 font-medium text-nowrap whitespace-nowrap",
        "transition-[outline-offset,color] duration-200 ease-out",
        "focus-visible:outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-2",
        "hover:text-muted-foreground/75",
        "data-disabled:pointer-events-none data-disabled:opacity-60",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Orientation
        "data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:w-full",
        "justify-center",
        "group-data-[variant=underline]/tabs-list:focus-visible:outline-offset-0",
        // Default size (small) - overridden by group data attribute for medium
        "rounded-sm px-2 py-1 text-xs",
        // Medium size via parent group
        "group-data-[size=medium]/tabs-list:rounded-md group-data-[size=medium]/tabs-list:px-2.5 group-data-[size=medium]/tabs-list:py-1.5 group-data-[size=medium]/tabs-list:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function TabIndicator({
  variant = "capsule",
  size = "medium",
  side = "left",
  className,
  ...props
}: BaseTabs.Indicator.Props & {
  variant?: TabsVariant;
  size?: TabsSize;
  side?: TabsSide;
}) {
  return (
    <BaseTabs.Indicator
      data-slot="tab-indicator"
      className={cn(tabIndicatorVariants({ variant, size, side }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: BaseTabs.Panel.Props) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-content"
      className={cn("min-w-0 flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
