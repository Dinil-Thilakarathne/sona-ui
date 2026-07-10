"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  ViewTransition,
} from "react";
import { cn } from "@/lib/utils";
import AnimatedPlusMinusButton from "./animated-plus-minus-button";
import styles from "./styles.module.css";

// Types
type AccordionVariant = "default" | "outlined" | "splitted" | "animated";

interface AccordionProps {
  /** The content to be displayed inside the accordion. */
  children: ReactNode;
  /**
   * Allows multiple accordion items to be open at the same time.
   * @default false
   */
  allowMultiple?: boolean;
  /** Additional CSS classes for the accordion container. */
  className?: string;
  /**
   * The visual style of the accordion.
   * @default default
   */
  variant?: AccordionVariant;
}

const accordionWrapperVariants = cva(
  "flex flex-col overflow-clip rounded-2xl",
  {
    variants: {
      variant: {
        default: "overflow-clip rounded-2xl",
        outlined: "overflow-clip rounded-2xl",
        splitted: "overflow-clip rounded-2xl",
        animated: styles.wrapper,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const accordionItemVariants = cva(
  "relative overflow-hidden bg-background text-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        outlined:
          "border-foreground border-t border-x last:border-b first:rounded-t-2xl last:rounded-b-2xl",
        splitted: "rounded-2xl ",
        animated: styles.animated,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  value?: string;
}

interface AccordionItemHeaderProps {
  value: string;
  children: ReactNode;
}
interface AccordionItemTriggerProps {
  value: string;
  children: ReactNode;
}

interface AccordionItemContentProps {
  children: ReactNode;
  value: string;
}

const AccordionContext = createContext<{
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
  /** Prefix used to pair each trigger with its content for aria wiring. */
  idPrefix: string;
} | null>(null);

const AccordionRoot = ({
  children,
  allowMultiple = false,
  className,
  variant = "default",
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const idPrefix = useId();
  const toggleItem = (v: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(v)) {
        newOpenItems.delete(v);
      } else {
        if (!allowMultiple) newOpenItems.clear();
        newOpenItems.add(v);
      }
      return newOpenItems;
    });
  };

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, variant, idPrefix }}
    >
      <ViewTransition>
        <div
          role="presentation"
          className={cn(
            accordionWrapperVariants({ variant }),
            variant === "splitted" && "gap-y-2",
            className,
          )}
        >
          {children}
        </div>
      </ViewTransition>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({
  children,
  className,
  style,
  value,
  ...props
}: AccordionItemProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItem must be used within AccordionRoot");
  const { variant, openItems } = context;
  return (
    <div
      role="presentation"
      className={cn(accordionItemVariants({ variant }), className)}
      style={style}
      data-active={value !== undefined && openItems.has(value)}
      {...props}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

const AccordionItemHeader = ({ value, children }: AccordionItemHeaderProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItemHeader must be used within AccordionRoot");
  const { openItems } = context;

  const isOpen = openItems.has(value);

  return (
    <div className="flex items-center justify-between py-4 px-8 font-medium text-balance rounded-xl">
      <div className="">{children}</div>
      <AnimatedPlusMinusButton isOpen={isOpen} />
    </div>
  );
};

const AccordionItemTrigger = ({
  value,
  children,
}: AccordionItemTriggerProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItemTrigger must be used within AccordionRoot");

  const { openItems, toggleItem, idPrefix } = context;
  const isOpen = openItems.has(value);

  return (
    <button
      type="button"
      id={`${idPrefix}-${value}-trigger`}
      aria-expanded={isOpen}
      aria-controls={`${idPrefix}-${value}-content`}
      onClick={() => toggleItem(value)}
      className="block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      {children}
    </button>
  );
};

const AccordionItemContent = ({
  children,
  value,
}: AccordionItemContentProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItemContent must be used within AccordionRoot");

  const { openItems, idPrefix } = context;
  const isOpen = openItems.has(value);
  const shouldReduceMotion = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Keep the measured height in sync with content reflow (resize, wrapping).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const motionVariants = {
    open: { opacity: [0, 1], y: [10, 0] },
    exit: { opacity: [1, 0.1, 0], y: [0, 10] },
  };

  return (
    <motion.div
      role="region"
      id={`${idPrefix}-${value}-content`}
      aria-labelledby={`${idPrefix}-${value}-trigger`}
      aria-hidden={!isOpen}
      inert={!isOpen}
      className="overflow-hidden text-sm"
      initial={false}
      animate={{ height: isOpen ? height : 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.26, ease: [0.23, 1, 0.32, 1] }
      }
    >
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "exit"}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.3,
                ease: "easeOut",
                delay: isOpen ? 0.1 : 0,
                type: "tween",
              }
        }
        variants={motionVariants}
        ref={ref}
        className="px-8 pb-4"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export {
  AccordionContext,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
};
