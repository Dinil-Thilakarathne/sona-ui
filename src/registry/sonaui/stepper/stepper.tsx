"use client";

import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useId,
  useState,
} from "react";
import { cn } from "@/lib/sona-utils";

type StepperContextValue = {
  value: number;
  setValue: (value: number) => void;
  orientation: "horizontal" | "vertical";
};

type StepperItemContextValue = {
  step: number;
  active: boolean;
  id: string;
};

const StepperContext = createContext<StepperContextValue | null>(null);
const StepperItemContext = createContext<StepperItemContextValue | null>(null);

function useStepper(component: string) {
  const context = useContext(StepperContext);
  if (!context) throw new Error(`${component} must be used within Stepper.`);
  return context;
}

function useStepperItem(component: string) {
  const context = useContext(StepperItemContext);
  if (!context)
    throw new Error(`${component} must be used within StepperItem.`);
  return context;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Step navigation and panels. */
  children: ReactNode;
  /** The active step in controlled mode. */
  value?: number;
  /** The initially active step in uncontrolled mode. @default 1 */
  defaultValue?: number;
  /** Called when a user selects a different step. */
  onValueChange?: (value: number) => void;
  /** The direction of the step navigation. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}

export function Stepper({
  children,
  value,
  defaultValue = 1,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const activeValue = value ?? uncontrolledValue;
  const setValue = (nextValue: number) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <StepperContext.Provider
      value={{ value: activeValue, setValue, orientation }}
    >
      <div
        data-orientation={orientation}
        className={cn(
          "grid gap-6 data-[orientation=vertical]:md:grid-cols-[minmax(11rem,0.35fr)_minmax(0,1fr)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

export function StepperNav({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const { orientation } = useStepper("StepperNav");
  return (
    <nav
      aria-label="Steps"
      className={cn(
        "relative flex min-w-0 gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:before:absolute data-[orientation=vertical]:before:top-5 data-[orientation=vertical]:before:bottom-5 data-[orientation=vertical]:before:left-5 data-[orientation=vertical]:before:w-px data-[orientation=vertical]:before:bg-border",
        className,
      )}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </nav>
  );
}

export interface StepperItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The one-based value that identifies this step. */
  step: number;
  /** Step trigger and optional separator. */
  children: ReactNode;
}

export function StepperItem({
  step,
  children,
  className,
  ...props
}: StepperItemProps) {
  const { value } = useStepper("StepperItem");
  const id = useId();
  return (
    <StepperItemContext.Provider value={{ step, active: value === step, id }}>
      <div className={cn("flex min-w-0 items-center", className)} {...props}>
        {children}
      </div>
    </StepperItemContext.Provider>
  );
}

export function StepperTrigger({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setValue } = useStepper("StepperTrigger");
  const { step, active, id } = useStepperItem("StepperTrigger");
  return (
    <button
      type="button"
      aria-current={active ? "step" : undefined}
      aria-pressed={active}
      aria-describedby={`${id}-label`}
      onClick={(event) => {
        setValue(step);
        onClick?.(event);
      }}
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function StepperIndicator({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { active } = useStepperItem("StepperIndicator");
  return (
    <span
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full border border-border bg-background font-mono text-[10px] text-muted-foreground transition-colors",
        "relative z-1",
        active && "border-primary bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StepperTitle({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { id } = useStepperItem("StepperTitle");
  return (
    <span id={`${id}-label`} className={cn("truncate", className)} {...props}>
      {children}
    </span>
  );
}

export function StepperSeparator({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("mx-1 h-px min-w-4 flex-1 bg-border", className)}
    />
  );
}

export function StepperPanel({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("min-w-0", className)} {...props}>
      {children}
    </div>
  );
}

export interface StepperContentProps extends HTMLAttributes<HTMLDivElement> {
  /** The step value associated with this panel. */
  value: number;
  /** Keeps inactive content mounted. @default false */
  forceMount?: boolean;
  /** Content shown for this step. */
  children: ReactNode;
}

export function StepperContent({
  value,
  forceMount = false,
  children,
  className,
  ...props
}: StepperContentProps) {
  const { value: activeValue } = useStepper("StepperContent");
  const active = activeValue === value;
  if (!active && !forceMount) return null;

  return (
    <div
      hidden={!active && !forceMount}
      aria-hidden={!active && !forceMount}
      className={cn("min-w-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Stepper;
