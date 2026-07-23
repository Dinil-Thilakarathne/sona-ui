"use client";

import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";

export default function AnimatedSwitchDemo() {
  return (
    <div className="flex flex-col gap-6 items-start">
      {/* Controlled & Disabled */}
      <div className="flex gap-8 items-center pt-4 w-full border-t">
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
