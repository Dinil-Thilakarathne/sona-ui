"use client";

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
            <AnimatedDialogClose className="bg-danger/80 hover:bg-danger hover:cursor-pointer">
              Cancel
            </AnimatedDialogClose>
            <AnimatedDialogClose className="bg-primary/80 hover:bg-primary text-primary-foreground hover:cursor-pointer">
              Confirm
            </AnimatedDialogClose>
          </div>
        </AnimatedDialogContent>
      </AnimatedDialog>
    </div>
  );
}
