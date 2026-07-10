"use client";

import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";

export default function AnimatedSwitchSizes() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-1.5">
        <AnimatedSwitch size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <AnimatedSwitch size="md" defaultChecked />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <AnimatedSwitch size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  );
}
