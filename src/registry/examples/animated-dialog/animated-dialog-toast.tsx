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
          This action will permanently delete the repository. This change is
          irreversible.
        </AnimatedDialogDescription>
        <div className="mt-6 flex justify-end gap-3">
          <AnimatedDialogClose
            onClick={() => toast.error("Project deletion aborted")}
          >
            Cancel
          </AnimatedDialogClose>
          <AnimatedDialogClose
            onClick={() => toast.success("Project deleted successfully!")}
            className="bg-danger text-danger-foreground hover:bg-danger/90"
          >
            Delete
          </AnimatedDialogClose>
        </div>
      </AnimatedDialogContent>
    </AnimatedDialog>
  );
}
