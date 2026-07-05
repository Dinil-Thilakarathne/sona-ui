"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
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

const accordionWrapperVarinats = cva(
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
  value: string;
} | null>(null);

const AccordionRoot = ({
  children,
  allowMultiple = false,
  className,
  variant = "default",
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [value, setValue] = useState<string>("");
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
    if (value !== v) {
      setValue(v);
    } else {
      setValue("");
    }
  };

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, variant, value }}
    >
      <ViewTransition>
        <div
          role="presentation"
          className={cn(
            accordionWrapperVarinats({ variant }),
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
  const { variant } = context;
  return (
    <div
      role="presentation"
      className={cn(accordionItemVariants({ variant }), className)}
      style={style}
      data-active={value === context.value}
      {...props}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

const AccordionItemHeader = ({ value, children }: AccordionItemHeaderProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionTrigger must be used within AccordionRoot");
  const { openItems } = context;

  const isOpen = openItems.has(value);

  return (
    <div className="flex items-center justify-between rounded-xl px-8 pt-4 font-medium text-balance">
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
    throw new Error("AccordionTrigger must be used within AccordionRoot");

  const { openItems, toggleItem } = context;
  const isOpen = openItems.has(value);

  return (
    <div
      aria-expanded={isOpen}
      onClick={() => toggleItem(value)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

const AccordionItemContent = ({
  children,
  value,
}: AccordionItemContentProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionContent must be used within AccordionRoot");

  const { openItems } = context;
  const isOpen = openItems.has(value);

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight + 16);
    }
  }, [isOpen]);

  const variants = {
    open: { opacity: [0, 0.5, 1], y: 0 },
    exit: { opacity: 0, y: 50 },
    initial: { opacity: 0, y: 50 },
  };

  const motionVariants = {
    open: { opacity: [0, 1], y: [10, 0] },
    exit: { opacity: [1, 0.1, 0], y: [0, 10] },
    initial: { opacity: 0, y: 0 },
  };

  return (
    <motion.div
      role="region"
      aria-hidden={!isOpen}
      className={`overflow-hidden px-8 py-2 text-sm transition-[height]`}
      initial={{ height: 0 }}
      animate={{ height: isOpen ? height : 0 }}
      transition={{ duration: 0.26, ease: "easeIn" }}
    >
      <motion.div
        initial="initial"
        animate={isOpen ? "open" : "exit"}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.2,
          type: "tween",
        }}
        // className="pb-2"
        variants={motionVariants}
        ref={ref}
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
