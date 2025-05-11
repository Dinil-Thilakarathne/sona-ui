"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import AnimatedPlusMinusButton from "./AnimatedPlusMinusButton";

// Types
type AccordionVariant = "default" | "bordered" | "splitted";

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
  variant?: AccordionVariant;
}

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
} | null>(null);

const AccordionRoot = ({
  children,
  allowMultiple = false,
  className,
  variant = "default",
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        if (!allowMultiple) newOpenItems.clear();
        newOpenItems.add(value);
      }
      return newOpenItems;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, variant }}>
      <div
        role="presentation"
        className={cn(
          "flex flex-col",
          variant === "default" && "overflow-clip rounded-2xl",
          variant === "splitted" && "gap-y-2",
          className,
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({ children, className, style }: AccordionItemProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItem must be used within AccordionRoot");
  const { variant } = context;
  return (
    <div
      role="presentation"
      className={cn(
        "relative overflow-hidden bg-slate-50 dark:bg-gray-400",
        variant === "default" &&
          "border-b border-slate-200 dark:border-slate-700 dark:text-gray-800",
        variant === "bordered" &&
          "border border-slate-200 bg-transparent **:text-white dark:border-slate-700 dark:bg-transparent",
        variant === "splitted" && "rounded-2xl dark:text-gray-800",
        className,
      )}
      style={style}
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
    <div className="flex items-center justify-between rounded-xl px-8 py-4 font-medium text-balance">
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
      setHeight(ref.current.offsetHeight);
    }
  }, [isOpen]);

  const variants = {
    open: { opacity: [0, 0.5, 1], y: 0 },
    exit: { opacity: 0, y: 50 },
    initial: { opacity: 0, y: 50 },
  };

  return (
    <motion.div
      role="region"
      aria-hidden={!isOpen}
      className={`overflow-hidden px-8 text-sm transition-[height] duration-300`}
      initial={{ height: 0 }}
      animate={{ height: isOpen ? height : 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <motion.div
        initial="initial"
        animate={isOpen ? "open" : "exit"}
        transition={{
          duration: 0.4,
          ease: "easeIn",
          delay: 0.3,
          type: "tween",
        }}
        variants={variants}
        className="pb-2"
        ref={ref}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export {
  AccordionRoot,
  AccordionItem,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionContext,
};
