"use client";

import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";

export default function AnimatedSwitchDisabled() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <AnimatedSwitch disabled />
        <span className="text-sm text-muted-foreground">Disabled Off</span>
      </div>
      <div className="flex items-center gap-2">
        <AnimatedSwitch defaultChecked disabled />
        <span className="text-sm text-muted-foreground">Disabled On</span>
      </div>
    </div>
  );
}
