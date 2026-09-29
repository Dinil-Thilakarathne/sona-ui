"use client";

import {
  motion,
  useMotionValue,
  useReducedMotionConfig,
  useSpring,
  useTransform,
} from "motion/react";
import {
  type ComponentType,
  type HTMLAttributes,
  type Ref,
  type SVGProps,
  useRef,
} from "react";

import { cn } from "@/lib/sona-utils";

type DockIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface MagneticDockItem {
  /** A stable identifier used as the rendered item key. */
  id: string;
  /** The accessible and visible label for the item. */
  label: string;
  /** The icon rendered inside the launcher item. */
  icon: DockIcon;
  /** Optional destination for an item that navigates. */
  href?: string;
  /** Prevents interaction with an item. */
  disabled?: boolean;
  /** Runs when a button item is activated. @default undefined */
  onClick?: () => void;
}

export interface MagneticDockProps extends HTMLAttributes<HTMLElement> {
  /** App-launcher items rendered in the dock. */
  items: MagneticDockItem[];
  /**
   * The maximum item scale nearest the pointer.
   * @default 1.65
   */
  magnification?: number;
  /**
   * The pointer distance in pixels that influences nearby items.
   * @default 140
   */
  distance?: number;
  /**
   * The base item size in pixels.
   * @default 48
   */
  itemSize?: number;
  /** Additional CSS classes for the dock surface. */
  className?: string;
}

type MagneticDockItemButtonProps = {
  item: MagneticDockItem;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  magnification: number;
  distance: number;
  itemSize: number;
};

function MagneticDockItemButton({
  item,
  pointerX,
  magnification,
  distance,
  itemSize,
}: MagneticDockItemButtonProps) {
  const itemRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotionConfig();

  const rawScale = useTransform(pointerX, (pointerPosition) => {
    const element = itemRef.current;
    if (shouldReduceMotion || !element || item.disabled) return 1;
    const center = element.offsetLeft + element.offsetWidth / 2;
    const proximity = Math.max(
      0,
      1 - Math.abs(pointerPosition - center) / distance,
    );
    return 1 + (magnification - 1) * proximity * proximity;
  });
  const scale = useSpring(rawScale, {
    damping: 24,
    stiffness: 360,
    mass: 0.32,
  });
  const translateY = useTransform(
    scale,
    (value) => -(itemSize * (value - 1)) / 2,
  );
  const Icon = item.icon;
  const sharedProps = {
    "aria-label": item.label,
    className:
      "group relative grid shrink-0 place-items-center rounded-2xl bg-background text-muted-foreground smooth-shadow-ring-sm outline-none transition-colors motion-reduce:transition-none hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-45",
    style: {
      width: itemSize,
      height: itemSize,
      scale: shouldReduceMotion ? 1 : scale,
      y: shouldReduceMotion ? 0 : translateY,
    },
  };
  const content = (
    <>
      <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 font-medium text-background text-xs opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.label}
      </span>
    </>
  );

  if (item.href && !item.disabled) {
    return (
      <motion.a
        {...sharedProps}
        ref={itemRef as Ref<HTMLAnchorElement>}
        href={item.href}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...sharedProps}
      ref={itemRef as Ref<HTMLButtonElement>}
      type="button"
      disabled={item.disabled}
      onClick={item.onClick}
    >
      {content}
    </motion.button>
  );
}

export default function MagneticDock({
  items,
  magnification = 1.65,
  distance = 140,
  itemSize = 48,
  className,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...props
}: MagneticDockProps) {
  const pointerX = useMotionValue(-10000);
  const shouldReduceMotion = useReducedMotionConfig();
  const resolvedMagnification = Math.max(1, magnification);
  const resolvedDistance = Math.max(1, distance);
  const resolvedItemSize = Math.max(32, itemSize);

  return (
    <nav
      aria-label="App launcher"
      className={cn(
        "relative inline-flex items-end gap-2 rounded-[1.35rem] bg-background/80 p-2 smooth-shadow-ring-lg backdrop-blur-xl",
        className,
      )}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (
          !event.defaultPrevented &&
          !shouldReduceMotion &&
          event.pointerType !== "touch"
        ) {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set(event.clientX - rect.left);
        }
      }}
      onPointerLeave={(event) => {
        pointerX.set(-10000);
        onPointerLeave?.(event);
      }}
      onPointerCancel={(event) => {
        pointerX.set(-10000);
        onPointerCancel?.(event);
      }}
      {...props}
    >
      {items.map((item) => (
        <MagneticDockItemButton
          key={item.id}
          distance={resolvedDistance}
          item={item}
          itemSize={resolvedItemSize}
          magnification={resolvedMagnification}
          pointerX={pointerX}
        />
      ))}
    </nav>
  );
}
