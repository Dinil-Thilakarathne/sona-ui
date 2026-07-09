"use client";

import { useState } from "react";
import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";

export default function AnimatedSwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-6 items-start">
      {/* Sizes */}
      <div className="flex gap-6 items-center">
        <div className="flex flex-col gap-1.5 items-center">
          <AnimatedSwitch size="sm" />
          <span className="text-muted-foreground text-xs">sm</span>
        </div>
        <div className="flex flex-col gap-1.5 items-center">
          <AnimatedSwitch size="md" defaultChecked />
          <span className="text-muted-foreground text-xs">md</span>
        </div>
        <div className="flex flex-col gap-1.5 items-center">
          <AnimatedSwitch size="lg" />
          <span className="text-muted-foreground text-xs">lg</span>
        </div>
      </div>

      {/* Controlled & Disabled */}
      <div className="flex gap-8 items-center pt-4 w-full border-t">
        <div className="flex gap-3 items-center">
          <AnimatedSwitch
            checked={checked}
            onCheckedChange={setChecked}
          />
          <span className="font-medium text-sm">
            Controlled: {checked ? "On" : "Off"}
          </span>
        </div>

        <div className="flex gap-3 items-center">
          <AnimatedSwitch defaultChecked disabled />
          <span className="font-medium text-muted-foreground text-sm">
            Disabled
          </span>
        </div>
      </div>
    </div>
  );
}
