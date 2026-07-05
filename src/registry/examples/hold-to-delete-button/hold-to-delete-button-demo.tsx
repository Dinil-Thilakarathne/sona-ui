"use client";

import { toast } from "sonner";
import HoldToDeleteButton from "@/registry/sonaui/hold-to-delete-button/hold-to-delete-button";

export default function HoldToDeleteButtonDemo() {
  return (
    <div className="flex items-center justify-center py-12">
      <HoldToDeleteButton
        onDelete={() => toast.success("Successfully deleted")}
      />
    </div>
  );
}
