"use client";

import { useState } from "react";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/registry/sonaui/animated-dialog/animated-dialog";

export default function AnimatedDialogDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatedDialog>
        <AnimatedDialogTrigger>Open Dialog</AnimatedDialogTrigger>
        <AnimatedDialogContent from={"bottom"}>
          <AnimatedDialogTitle>Directional Transition</AnimatedDialogTitle>
          <AnimatedDialogDescription>
            This modal is configured to animate from the{" "}
            <span className="font-semibold text-foreground capitalize">
              "Bottom"
            </span>
            . You can test all entry vectors using the switcher above.
          </AnimatedDialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <AnimatedDialogClose
              render={
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors hover:cursor-pointer"
                >
                  Cancel
                </button>
              }
            />
            <AnimatedDialogClose
              render={
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-primary text-primary-foreground text-sm font-medium transition-colors hover:cursor-pointer"
                >
                  Confirm
                </button>
              }
            />
          </div>
        </AnimatedDialogContent>
      </AnimatedDialog>
    </div>
  );
}
