"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useId, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface LightboxProps {
  /** The image URL shown in both the thumbnail and expanded preview. */
  src: string;
  /** Accessible alternative text for the image. */
  alt: string;
  /** Optional caption displayed beneath the expanded image. @default undefined */
  caption?: string;
  /** Controlled open state. @default undefined */
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called whenever the expanded preview opens or closes. @default undefined */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS classes for the thumbnail trigger. @default undefined */
  className?: string;
  /** Additional CSS classes for the thumbnail image. @default undefined */
  imageClassName?: string;
  /** Additional CSS classes for the expanded image. @default undefined */
  previewClassName?: string;
  /** Additional CSS classes for the modal backdrop. @default undefined */
  backdropClassName?: string;
}

export default function Lightbox({
  src,
  alt,
  caption,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  imageClassName,
  previewClassName,
  backdropClassName,
}: LightboxProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const instanceId = useId();
  const shouldReduceMotion = useReducedMotion();
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const layoutId = shouldReduceMotion
    ? undefined
    : `${instanceId}-lightbox-image`;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <LayoutGroup id={instanceId}>
      <Dialog.Root defaultOpen={defaultOpen} onOpenChange={setOpen} open={open}>
        <Dialog.Trigger
          className={cn(
            "group relative block w-full cursor-zoom-in rounded-2xl bg-muted text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/35 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
            className,
          )}
          render={
            <motion.button
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            />
          }
        >
          {/* biome-ignore lint/performance/noImgElement: a registry component must remain framework-agnostic */}
          <motion.img
            alt={alt}
            className={cn(
              "block h-full w-full rounded-2xl object-cover",
              imageClassName,
            )}
            layoutId={layoutId}
            src={src}
            transition={{ type: "spring", bounce: 0, duration: 0.38 }}
          />
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/28 via-transparent to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
          <span className="absolute right-3 bottom-3 inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-black/52 text-white opacity-0 shadow-sm backdrop-blur-md transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="m21 21-4.35-4.35M11 8v6m-3-3h6m5 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          <span className="sr-only">Open image preview: {alt}</span>
        </Dialog.Trigger>

        <AnimatePresence>
          {open ? (
            <Dialog.Portal keepMounted>
              <Dialog.Backdrop
                className={cn(
                  "fixed inset-0 z-50 bg-black/72 backdrop-blur-md",
                  backdropClassName,
                )}
                render={
                  <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.12 : 0.22 }}
                  />
                }
              />

              <Dialog.Popup
                aria-label={`Image preview: ${alt}`}
                className="fixed inset-0 z-50 grid cursor-zoom-out place-items-center p-5 sm:p-10"
                onClick={() => setOpen(false)}
                render={<motion.div />}
              >
                <Dialog.Close
                  aria-label="Close image preview"
                  className="absolute top-4 right-4 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-md transition-colors duration-150 ease-out hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:top-6 sm:right-6"
                  onClick={(event) => event.stopPropagation()}
                >
                  <svg
                    aria-hidden="true"
                    className="size-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 6 6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </Dialog.Close>

                <motion.figure
                  animate={{ opacity: 1 }}
                  className="m-0 flex max-h-[88svh] max-w-[90vw] cursor-default flex-col items-center gap-3"
                  exit={{ opacity: shouldReduceMotion ? 0 : 1 }}
                  initial={{ opacity: shouldReduceMotion ? 0 : 1 }}
                  onClick={(event) => event.stopPropagation()}
                  transition={{ duration: 0.12 }}
                >
                  {/* biome-ignore lint/performance/noImgElement: a registry component must remain framework-agnostic */}
                  <motion.img
                    alt={alt}
                    className={cn(
                      "block max-h-[82svh] max-w-[90vw] rounded-2xl object-contain shadow-2xl ring-1 ring-white/12 will-change-transform",
                      previewClassName,
                    )}
                    layoutId={layoutId}
                    src={src}
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: shouldReduceMotion ? 0.01 : 0.38,
                    }}
                  />
                  {caption ? (
                    <motion.figcaption
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-xl text-center text-sm leading-5 text-white/72"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 4 }
                      }
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.14,
                        duration: 0.18,
                        ease: "easeOut",
                      }}
                    >
                      {caption}
                    </motion.figcaption>
                  ) : null}
                </motion.figure>
              </Dialog.Popup>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </LayoutGroup>
  );
}
