"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/sona-utils";

export interface AnimatedCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof Checkbox.Root> {
  /** Optional label rendered beside the control. */
  label?: React.ReactNode;
}

/** An accessible Base UI checkbox with a drawn checkmark and shared motion states. */
export default function AnimatedCheckbox({
  label,
  className,
  ...props
}: AnimatedCheckboxProps) {
  const reduce = useReducedMotion();
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
      <Checkbox.Root
        {...props}
        className={cn(
          "group relative grid size-5 shrink-0 place-items-center rounded-md border border-input bg-background outline-none transition-colors hover:cursor-pointer data-checked:border-foreground data-checked:bg-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
      >
        <Checkbox.Indicator keepMounted>
          <motion.svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="size-3.5 text-background"
            initial={false}
            animate={reduce ? { opacity: 1 } : { opacity: 1 }}
          >
            <motion.path
              d="M6.75,15h-.002c-.227,0-.442-.104-.583-.281L2.165,9.719c-.259-.324-.207-.795,.117-1.054,.325-.259,.796-.206,1.054,.117l3.418,4.272L14.667,3.278c.261-.322,.732-.373,1.055-.111,.322,.261,.372,.733,.111,1.055L7.333,14.722c-.143,.176-.357,.278-.583,.278Z"
              fill="currentColor"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
              }
            />
          </motion.svg>
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && <span>{label}</span>}
    </label>
  );
}
