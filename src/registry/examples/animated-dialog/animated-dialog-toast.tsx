"use client";

import { toast } from "sonner";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/registry/sonaui/animated-dialog/animated-dialog";

export default function AnimatedDialogToast() {
  return (
    <AnimatedDialog>
      <AnimatedDialogTrigger>Trigger Action</AnimatedDialogTrigger>
      <AnimatedDialogContent from="bottom">
        <AnimatedDialogTitle>Delete Project?</AnimatedDialogTitle>
        <AnimatedDialogDescription>
          This action will permanently delete the repository. This change is irreversible.
        </AnimatedDialogDescription>
        <div className="mt-6 flex justify-end gap-3">
          <AnimatedDialogClose
            render={
              <button
                type="button"
                onClick={() => toast.error("Project deletion aborted")}
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            }
          />
          <AnimatedDialogClose
            render={
              <button
                type="button"
                onClick={() => toast.success("Project deleted successfully!")}
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-danger text-danger-foreground text-sm font-medium hover:bg-danger/90 transition-colors"
              >
                Delete
              </button>
            }
          />
        </div>
      </AnimatedDialogContent>
    </AnimatedDialog>
  );
}
