"use client";

import { useState } from "react";
import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";

export default function AnimatedSwitchControlled() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <AnimatedSwitch checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm font-medium">
        Controlled State:{" "}
        <span className="text-primary font-semibold">
          {checked ? "ON" : "OFF"}
        </span>
      </span>
    </div>
  );
}
