// This file is auto-generated. Do not edit.
import * as React from "react";
import animated_dropdown_animated_dropdown_danger from "@/registry/examples/animated-dropdown/animated-dropdown-danger";
import animated_dropdown_animated_dropdown_controlled from "@/registry/examples/animated-dropdown/animated-dropdown-controlled";
import animated_dropdown_animated_dropdown_demo from "@/registry/examples/animated-dropdown/animated-dropdown-demo";
import circular_dock_menu_circular_dock_menu_demo from "@/registry/examples/circular-dock-menu/circular-dock-menu-demo";
import image_trail_image_trail_interactive from "@/registry/examples/image-trail/image-trail-interactive";
import image_trail_image_trail_blur from "@/registry/examples/image-trail/image-trail-blur";
import image_trail_image_trail_demo from "@/registry/examples/image-trail/image-trail-demo";
import image_trail_image_trail_tilt from "@/registry/examples/image-trail/image-trail-tilt";
import magnetic_button_magnetic_button_demo from "@/registry/examples/magnetic-button/magnetic-button-demo";
import fluid_tabs_fluid_tabs_demo from "@/registry/examples/fluid-tabs/fluid-tabs-demo";
import fluid_tabs_fluid_tabs_underline from "@/registry/examples/fluid-tabs/fluid-tabs-underline";
import dot_orbit_shader_dot_orbit_shader_dense from "@/registry/examples/dot-orbit-shader/dot-orbit-shader-dense";
import dot_orbit_shader_dot_orbit_shader_slow from "@/registry/examples/dot-orbit-shader/dot-orbit-shader-slow";
import dot_orbit_shader_dot_orbit_shader_demo from "@/registry/examples/dot-orbit-shader/dot-orbit-shader-demo";
import dot_orbit_shader_dot_orbit_shader_pastel from "@/registry/examples/dot-orbit-shader/dot-orbit-shader-pastel";
import accordion_accordion_splitted from "@/registry/examples/accordion/accordion-splitted";
import accordion_accordion_animated from "@/registry/examples/accordion/accordion-animated";
import accordion_accordion_demo from "@/registry/examples/accordion/accordion-demo";
import accordion_accordion_multistep from "@/registry/examples/accordion/accordion-multistep";
import accordion_accordion_outlined from "@/registry/examples/accordion/accordion-outlined";
import spinning_text_spinning_text_demo from "@/registry/examples/spinning-text/spinning-text-demo";
import bubble_up_button_bubble_up_button_demo from "@/registry/examples/bubble-up-button/bubble-up-button-demo";
import fan_view_fan_view_demo from "@/registry/examples/fan-view/fan-view-demo";
import lightbox_lightbox_demo from "@/registry/examples/lightbox/lightbox-demo";
import marquee_marquee_demo from "@/registry/examples/marquee/marquee-demo";
import ripple_button_ripple_button_demo from "@/registry/examples/ripple-button/ripple-button-demo";
import spotlight_card_spotlight_card_demo from "@/registry/examples/spotlight-card/spotlight-card-demo";
import section_rail_section_rail_demo from "@/registry/examples/section-rail/section-rail-demo";
import animated_dialog_animated_dialog_demo from "@/registry/examples/animated-dialog/animated-dialog-demo";
import animated_dialog_animated_dialog_toast from "@/registry/examples/animated-dialog/animated-dialog-toast";
import split_text_split_text_demo from "@/registry/examples/split-text/split-text-demo";
import animated_tabs_animated_tabs_demo from "@/registry/examples/animated-tabs/animated-tabs-demo";
import button_button_demo from "@/registry/examples/button/button-demo";
import fluid_slider_fluid_slider_demo from "@/registry/examples/fluid-slider/fluid-slider-demo";
import animated_switch_animated_switch_demo from "@/registry/examples/animated-switch/animated-switch-demo";
import animated_switch_animated_switch_disabled from "@/registry/examples/animated-switch/animated-switch-disabled";
import animated_switch_animated_switch_controlled from "@/registry/examples/animated-switch/animated-switch-controlled";
import animated_switch_animated_switch_sizes from "@/registry/examples/animated-switch/animated-switch-sizes";
import animated_switch_animated_switch_disable from "@/registry/examples/animated-switch/animated-switch-disable";
import activity_graph_activity_graph_demo from "@/registry/examples/activity-graph/activity-graph-demo";
import expandable_tabs_expandable_tabs_demo from "@/registry/examples/expandable-tabs/expandable-tabs-demo";
import expanding_action_expanding_action_demo from "@/registry/examples/expanding-action/expanding-action-demo";
import fluid_tooltip_fluid_tooltip_demo from "@/registry/examples/fluid-tooltip/fluid-tooltip-demo";
import mesh_gradient_shader_mesh_gradient_shader_ocean from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-ocean";
import mesh_gradient_shader_mesh_gradient_shader_demo from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-demo";
import mesh_gradient_shader_mesh_gradient_shader_sunset from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-sunset";
import mesh_gradient_shader_mesh_gradient_shader_static from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-static";
import mesh_gradient_shader_mesh_gradient_shader_monochrome from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-monochrome";
import link_preview_link_preview_demo from "@/registry/examples/link-preview/link-preview-demo";
import stagger_text_stagger_text_demo from "@/registry/examples/stagger-text/stagger-text-demo";
import avatar_showcase_avatar_showcase_demo from "@/registry/examples/avatar-showcase/avatar-showcase-demo";
import hold_to_delete_button_hold_to_delete_button_demo from "@/registry/examples/hold-to-delete-button/hold-to-delete-button-demo";

export type RegistryEntry = {
  name: string;
  component: React.ComponentType;
  code: string;
  imports: string;
  anatomy: string;
};

export const exampleRegistry: Record<string, RegistryEntry[]> = {
  "animated-dropdown": [
    {
      name: "danger",
      component: animated_dropdown_animated_dropdown_danger,
      code: `"use client";

import { Copy, Edit, Share2, Trash2 } from "lucide-react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDanger() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>
        Actions
        <AnimatedDropdownTriggerIndicator />
      </AnimatedDropdownTrigger>
      <AnimatedDropdownContent align="start">
        <AnimatedDropdownItem icon={<Edit />}>Edit</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Copy />}>Duplicate</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Share2 />}>Share</AnimatedDropdownItem>
        <AnimatedDropdownSeparator />
        <AnimatedDropdownItem icon={<Trash2 />} variant="danger">
          Delete
        </AnimatedDropdownItem>
      </AnimatedDropdownContent>
    </AnimatedDropdown>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { Copy, Edit, Share2, Trash2 } from "lucide-react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDanger() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>
        Actions
        <AnimatedDropdownTriggerIndicator />
      </AnimatedDropdownTrigger>
      <AnimatedDropdownContent align="start">
        <AnimatedDropdownItem icon={<Edit />}>Edit</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Copy />}>Duplicate</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Share2 />}>Share</AnimatedDropdownItem>
        <AnimatedDropdownSeparator />
        <AnimatedDropdownItem icon={<Trash2 />} variant="danger">
          Delete
        </AnimatedDropdownItem>
      </AnimatedDropdownContent>
    </AnimatedDropdown>
  );
}`,
    },
    {
      name: "controlled",
      component: animated_dropdown_animated_dropdown_controlled,
      code: `"use client";

import { Bell, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-muted-foreground text-sm">
        Dropdown is:{" "}
        <span className="font-semibold text-foreground">
          {open ? "open" : "closed"}
        </span>
      </p>
      <AnimatedDropdown open={open} onOpenChange={setOpen}>
        <AnimatedDropdownTrigger>
          Controlled
          <AnimatedDropdownTriggerIndicator />
        </AnimatedDropdownTrigger>
        <AnimatedDropdownContent>
          <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Bell />}>
            Notifications
          </AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Settings />}>
            Settings
          </AnimatedDropdownItem>
          <AnimatedDropdownSeparator />
          <AnimatedDropdownItem
            icon={<LogOut />}
            variant="danger"
            onClick={() => setOpen(false)}
          >
            Log out
          </AnimatedDropdownItem>
        </AnimatedDropdownContent>
      </AnimatedDropdown>
    </div>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { Bell, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-muted-foreground text-sm">
        Dropdown is:{" "}
        <span className="font-semibold text-foreground">
          {open ? "open" : "closed"}
        </span>
      </p>
      <AnimatedDropdown open={open} onOpenChange={setOpen}>
        <AnimatedDropdownTrigger>
          Controlled
          <AnimatedDropdownTriggerIndicator />
        </AnimatedDropdownTrigger>
        <AnimatedDropdownContent>
          <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Bell />}>
            Notifications
          </AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Settings />}>
            Settings
          </AnimatedDropdownItem>
          <AnimatedDropdownSeparator />
          <AnimatedDropdownItem
            icon={<LogOut />}
            variant="danger"
            onClick={() => setOpen(false)}
          >
            Log out
          </AnimatedDropdownItem>
        </AnimatedDropdownContent>
      </AnimatedDropdown>
    </div>
  );
}`,
    },
    {
      name: "default",
      component: animated_dropdown_animated_dropdown_demo,
      code: `"use client";

import { Bell, CreditCard, LogOut, Settings, User } from "lucide-react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDemo() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>
        My Account
        <AnimatedDropdownTriggerIndicator />
      </AnimatedDropdownTrigger>
      <AnimatedDropdownContent>
        <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<CreditCard />}>
          Billing
        </AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Bell />}>
          Notifications
        </AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Settings />}>
          Settings
        </AnimatedDropdownItem>
        <AnimatedDropdownSeparator />
        <AnimatedDropdownItem icon={<LogOut />} variant="danger">
          Log out
        </AnimatedDropdownItem>
      </AnimatedDropdownContent>
    </AnimatedDropdown>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { Bell, CreditCard, LogOut, Settings, User } from "lucide-react";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
  AnimatedDropdownTriggerIndicator,
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDemo() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>
        My Account
        <AnimatedDropdownTriggerIndicator />
      </AnimatedDropdownTrigger>
      <AnimatedDropdownContent>
        <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<CreditCard />}>
          Billing
        </AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Bell />}>
          Notifications
        </AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Settings />}>
          Settings
        </AnimatedDropdownItem>
        <AnimatedDropdownSeparator />
        <AnimatedDropdownItem icon={<LogOut />} variant="danger">
          Log out
        </AnimatedDropdownItem>
      </AnimatedDropdownContent>
    </AnimatedDropdown>
  );
}`,
    }
  ],
  "circular-dock-menu": [
    {
      name: "default",
      component: circular_dock_menu_circular_dock_menu_demo,
      code: `"use client";

import {
  BookOpen,
  Clapperboard,
  FileText,
  ImageIcon,
  Music,
} from "lucide-react";

import CircularDockMenu from "@/components/ui/circular-dock-menu/circular-dock-menu";

const ITEMS = [
  { label: "Document", icon: FileText },
  { label: "Learning", icon: BookOpen },
  { label: "Music", icon: Music },
  { label: "Video", icon: Clapperboard },
  { label: "Image", icon: ImageIcon },
];

export default function CircularDockMenuDemo() {
  return <CircularDockMenu items={ITEMS} />;
}
`,
      imports: ``,
      anatomy: `"use client";

import {
  BookOpen,
  Clapperboard,
  FileText,
  ImageIcon,
  Music,
} from "lucide-react";

import CircularDockMenu from "@/components/ui/circular-dock-menu/circular-dock-menu";

const ITEMS = [
  { label: "Document", icon: FileText },
  { label: "Learning", icon: BookOpen },
  { label: "Music", icon: Music },
  { label: "Video", icon: Clapperboard },
  { label: "Image", icon: ImageIcon },
];

export default function CircularDockMenuDemo() {
  return <CircularDockMenu items={ITEMS} />;
}`,
    }
  ],
  "image-trail": [
    {
      name: "interactive",
      component: image_trail_image_trail_interactive,
      code: `"use client";

import { useState } from "react";
import ImageTrail from "@/components/ui/image-trail/image-trail";

const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailInteractiveExample() {
  const [clicks, setClicks] = useState(0);

  return (
    <ImageTrail images={images} className="h-80 w-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <p className="pointer-events-none text-center text-muted-foreground text-sm">
          Sweep the cursor to spawn the trail, then click the button or the link
          — the images never block them.
        </p>
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90"
        >
          Clicked {clicks} {clicks === 1 ? "time" : "times"}
        </button>
        <a
          href="https://sonaui.dev"
          target="_blank"
          rel="noreferrer"
          className="text-foreground text-sm underline underline-offset-4 hover:text-primary"
        >
          A link that stays hoverable
        </a>
      </div>
    </ImageTrail>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { useState } from "react";
import ImageTrail from "@/components/ui/image-trail/image-trail";

const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailInteractiveExample() {
  const [clicks, setClicks] = useState(0);

  return (
    <ImageTrail images={images} className="h-80 w-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <p className="pointer-events-none text-center text-muted-foreground text-sm">
          Sweep the cursor to spawn the trail, then click the button or the link
          — the images never block them.
        </p>
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90"
        >
          Clicked {clicks} {clicks === 1 ? "time" : "times"}
        </button>
        <a
          href="https://sonaui.dev"
          target="_blank"
          rel="noreferrer"
          className="text-foreground text-sm underline underline-offset-4 hover:text-primary"
        >
          A link that stays hoverable
        </a>
      </div>
    </ImageTrail>
  );
}`,
    },
    {
      name: "blur",
      component: image_trail_image_trail_blur,
      code: `import ImageTrail from "@/components/ui/image-trail/image-trail";

const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailBlurExample() {
  return (
    <ImageTrail images={images} variant="blur" className="h-80 w-full">
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="pointer-events-none text-center font-semibold text-2xl text-foreground">
          Blur trail
        </h3>
      </div>
    </ImageTrail>
  );
}
`,
      imports: `import ImageTrail from "@/components/ui/image-trail/image-trail";`,
      anatomy: `const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailBlurExample() {
  return (
    <ImageTrail images={images} variant="blur" className="h-80 w-full">
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="pointer-events-none text-center font-semibold text-2xl text-foreground">
          Blur trail
        </h3>
      </div>
    </ImageTrail>
  );
}`,
    },
    {
      name: "default",
      component: image_trail_image_trail_demo,
      code: `import ImageTrail from "@/components/ui/image-trail/image-trail";

const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailExample() {
  return (
    <ImageTrail images={images} className="h-80 w-full">
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="pointer-events-none text-center font-semibold text-2xl text-foreground">
          Move your cursor here
        </h3>
      </div>
    </ImageTrail>
  );
}
`,
      imports: `import ImageTrail from "@/components/ui/image-trail/image-trail";`,
      anatomy: `const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailExample() {
  return (
    <ImageTrail images={images} className="h-80 w-full">
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="pointer-events-none text-center font-semibold text-2xl text-foreground">
          Move your cursor here
        </h3>
      </div>
    </ImageTrail>
  );
}`,
    },
    {
      name: "tilt",
      component: image_trail_image_trail_tilt,
      code: `import ImageTrail from "@/components/ui/image-trail/image-trail";

const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailTiltExample() {
  return (
    <ImageTrail images={images} variant="tilt" className="h-80 w-full">
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="pointer-events-none text-center font-semibold text-2xl text-foreground">
          Tilt trail
        </h3>
      </div>
    </ImageTrail>
  );
}
`,
      imports: `import ImageTrail from "@/components/ui/image-trail/image-trail";`,
      anatomy: `const images = [
  "https://picsum.photos/id/1015/300/200",
  "https://picsum.photos/id/1025/300/200",
  "https://picsum.photos/id/1035/300/200",
  "https://picsum.photos/id/1043/300/200",
  "https://picsum.photos/id/1050/300/200",
  "https://picsum.photos/id/1062/300/200",
];

export default function ImageTrailTiltExample() {
  return (
    <ImageTrail images={images} variant="tilt" className="h-80 w-full">
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="pointer-events-none text-center font-semibold text-2xl text-foreground">
          Tilt trail
        </h3>
      </div>
    </ImageTrail>
  );
}`,
    }
  ],
  "magnetic-button": [
    {
      name: "default",
      component: magnetic_button_magnetic_button_demo,
      code: `import Magnetic from "@/components/ui/magnetic-button/magnetic-button";

export default function MagneticButtonExample() {
  return (
    <div className="p-2 border border-border border-dashed rounded-full">
      <Magnetic interactionArea="parent">
        <button
          type="button"
          className="px-6 py-4 font-semibold text-foreground bg-background rounded-full cursor-pointer"
        >
          Magnetic Button
        </button>
      </Magnetic>
    </div>
  );
}
`,
      imports: `import Magnetic from "@/components/ui/magnetic-button/magnetic-button";`,
      anatomy: `export default function MagneticButtonExample() {
  return (
    <div className="p-2 border border-border border-dashed rounded-full">
      <Magnetic interactionArea="parent">
        <button
          type="button"
          className="px-6 py-4 font-semibold text-foreground bg-background rounded-full cursor-pointer"
        >
          Magnetic Button
        </button>
      </Magnetic>
    </div>
  );
}`,
    }
  ],
  "fluid-tabs": [
    {
      name: "default",
      component: fluid_tabs_fluid_tabs_demo,
      code: `import FluidTabs from "@/components/ui/fluid-tabs/fluid-tabs";

const tabs = [
  { value: "overview", title: "Overview" },
  { value: "activity", title: "Activity" },
  { value: "settings", title: "Settings" },
];

export default function FluidTabsDemo() {
  return <FluidTabs tabs={tabs} />;
}
`,
      imports: `import FluidTabs from "@/components/ui/fluid-tabs/fluid-tabs";`,
      anatomy: `const tabs = [
  { value: "overview", title: "Overview" },
  { value: "activity", title: "Activity" },
  { value: "settings", title: "Settings" },
];

export default function FluidTabsDemo() {
  return <FluidTabs tabs={tabs} />;
}`,
    },
    {
      name: "underline",
      component: fluid_tabs_fluid_tabs_underline,
      code: `import FluidTabs from "@/components/ui/fluid-tabs/fluid-tabs";

export default function FluidTabsUnderlineDemo() {
  return (
    <FluidTabs
      tabs={[
        { value: "all", title: "All" },
        { value: "design", title: "Design" },
        { value: "engineering", title: "Engineering" },
      ]}
      variant="underline"
    />
  );
}
`,
      imports: `import FluidTabs from "@/components/ui/fluid-tabs/fluid-tabs";`,
      anatomy: `export default function FluidTabsUnderlineDemo() {
  return (
    <FluidTabs
      tabs={[
        { value: "all", title: "All" },
        { value: "design", title: "Design" },
        { value: "engineering", title: "Engineering" },
      ]}
      variant="underline"
    />
  );
}`,
    }
  ],
  "dot-orbit-shader": [
    {
      name: "dense",
      component: dot_orbit_shader_dot_orbit_shader_dense,
      code: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";

export default function DotOrbitShaderDense() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#0a0a0a"
      colors={["#ff0080", "#7928ca", "#0070f3", "#00dfd8"]}
      size={0.5}
      sizeRange={0.1}
      spreading={0.3}
      stepsPerColor={3}
    />
  );
}
`,
      imports: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";`,
      anatomy: `export default function DotOrbitShaderDense() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#0a0a0a"
      colors={["#ff0080", "#7928ca", "#0070f3", "#00dfd8"]}
      size={0.5}
      sizeRange={0.1}
      spreading={0.3}
      stepsPerColor={3}
    />
  );
}`,
    },
    {
      name: "slow",
      component: dot_orbit_shader_dot_orbit_shader_slow,
      code: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";

export default function DotOrbitShaderSlow() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#111827"
      colors={["#34d399", "#059669", "#065f46"]}
      size={0.45}
      sizeRange={0.5}
      spreading={0.8}
      speed={0.2}
    />
  );
}
`,
      imports: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";`,
      anatomy: `export default function DotOrbitShaderSlow() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#111827"
      colors={["#34d399", "#059669", "#065f46"]}
      size={0.45}
      sizeRange={0.5}
      spreading={0.8}
      speed={0.2}
    />
  );
}`,
    },
    {
      name: "default",
      component: dot_orbit_shader_dot_orbit_shader_demo,
      code: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";

export default function DotOrbitShaderExample() {
  return <DotOrbitShader className="h-64 w-full lg:h-72" />;
}
`,
      imports: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";`,
      anatomy: `export default function DotOrbitShaderExample() {
  return <DotOrbitShader className="h-64 w-full lg:h-72" />;
}`,
    },
    {
      name: "pastel",
      component: dot_orbit_shader_dot_orbit_shader_pastel,
      code: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";

export default function DotOrbitShaderPastel() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#fdf6f0"
      colors={["#f9a8d4", "#a5f3fc", "#bbf7d0", "#fde68a", "#ddd6fe"]}
      size={0.35}
      sizeRange={0.4}
      spreading={0.6}
    />
  );
}
`,
      imports: `import DotOrbitShader from "@/components/ui/dot-orbit-shader/dot-orbit-shader";`,
      anatomy: `export default function DotOrbitShaderPastel() {
  return (
    <DotOrbitShader
      className="h-64 w-full lg:h-72"
      colorBack="#fdf6f0"
      colors={["#f9a8d4", "#a5f3fc", "#bbf7d0", "#fde68a", "#ddd6fe"]}
      size={0.35}
      sizeRange={0.4}
      spreading={0.6}
    />
  );
}`,
    }
  ],
  "accordion": [
    {
      name: "splitted",
      component: accordion_accordion_splitted,
      code: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";

export default function AccordionSplittedExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot
      allowMultiple={false}
      className="mx-auto max-w-4xl"
      variant="splitted"
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
`,
      imports: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";`,
      anatomy: `export default function AccordionSplittedExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot
      allowMultiple={false}
      className="mx-auto max-w-4xl"
      variant="splitted"
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}`,
    },
    {
      name: "animated",
      component: accordion_accordion_animated,
      code: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";

export default function AccordionAnimatedExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot
      allowMultiple={false}
      className="mx-auto max-w-4xl"
      variant="animated"
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
`,
      imports: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";`,
      anatomy: `export default function AccordionAnimatedExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot
      allowMultiple={false}
      className="mx-auto max-w-4xl"
      variant="animated"
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}`,
    },
    {
      name: "default",
      component: accordion_accordion_demo,
      code: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";

export default function AccordionDefaultExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot allowMultiple={false} className="mx-auto max-w-4xl">
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
`,
      imports: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";`,
      anatomy: `export default function AccordionDefaultExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot allowMultiple={false} className="mx-auto max-w-4xl">
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}`,
    },
    {
      name: "multistep",
      component: accordion_accordion_multistep,
      code: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";

export default function AccordionMultiStepExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot allowMultiple={true} className="mx-auto max-w-4xl">
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
`,
      imports: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";`,
      anatomy: `export default function AccordionMultiStepExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot allowMultiple={true} className="mx-auto max-w-4xl">
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}`,
    },
    {
      name: "outlined",
      component: accordion_accordion_outlined,
      code: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";

export default function AccordionOutlinedExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot
      allowMultiple={false}
      className="mx-auto max-w-4xl"
      variant="outlined"
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
`,
      imports: `import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion/accordion";`,
      anatomy: `export default function AccordionOutlinedExample() {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];
  return (
    <AccordionRoot
      allowMultiple={false}
      className="mx-auto max-w-4xl"
      variant="outlined"
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionItemTrigger value={item.value}>
            <AccordionItemHeader value={item.value}>
              <span className="flex-1">{item.title}</span>
            </AccordionItemHeader>
          </AccordionItemTrigger>
          <AccordionItemContent value={item.value}>
            <p className="">{item.content}</p>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}`,
    }
  ],
  "spinning-text": [
    {
      name: "default",
      component: spinning_text_spinning_text_demo,
      code: `import SpinningText from "@/components/ui/spinning-text/spinning-text";

export default function SpinningTextExample() {
  return (
    <div className="flex items-center justify-center min-h-[320px]">
      <SpinningText>This is example text!</SpinningText>
    </div>
  );
}
`,
      imports: `import SpinningText from "@/components/ui/spinning-text/spinning-text";`,
      anatomy: `export default function SpinningTextExample() {
  return (
    <div className="flex items-center justify-center min-h-[320px]">
      <SpinningText>This is example text!</SpinningText>
    </div>
  );
}`,
    }
  ],
  "bubble-up-button": [
    {
      name: "default",
      component: bubble_up_button_bubble_up_button_demo,
      code: `import BubbleUpButton from "@/components/ui/bubble-up-button/bubble-up-button";

export default function BubbleUpButtonExample() {
  return <BubbleUpButton>Hover me!</BubbleUpButton>;
}
`,
      imports: `import BubbleUpButton from "@/components/ui/bubble-up-button/bubble-up-button";`,
      anatomy: `export default function BubbleUpButtonExample() {
  return <BubbleUpButton>Hover me!</BubbleUpButton>;
}`,
    }
  ],
  "fan-view": [
    {
      name: "default",
      component: fan_view_fan_view_demo,
      code: `"use client";

import FanView from "@/components/ui/fan-view/fan-view";

const ITEMS = [
  { label: "Music", width: 164 },
  { label: "Video", width: 160 },
  { label: "Image", width: 156 },
  { label: "Learning", width: 180 },
  { label: "Document", width: 196 },
];

export default function FanViewDemo() {
  return <FanView items={ITEMS} />;
}
`,
      imports: ``,
      anatomy: `"use client";

import FanView from "@/components/ui/fan-view/fan-view";

const ITEMS = [
  { label: "Music", width: 164 },
  { label: "Video", width: 160 },
  { label: "Image", width: 156 },
  { label: "Learning", width: 180 },
  { label: "Document", width: 196 },
];

export default function FanViewDemo() {
  return <FanView items={ITEMS} />;
}`,
    }
  ],
  "lightbox": [
    {
      name: "default",
      component: lightbox_lightbox_demo,
      code: `import Lightbox from "@/components/ui/lightbox/lightbox";

export default function LightboxDemo() {
  return (
    <Lightbox
      alt="Accordion component preview on a dark canvas"
      caption="Select the backdrop, close button, or press Escape to return."
      className="aspect-[16/10] w-full max-w-xl"
      src="/og/accordion-og.png"
    />
  );
}
`,
      imports: `import Lightbox from "@/components/ui/lightbox/lightbox";`,
      anatomy: `export default function LightboxDemo() {
  return (
    <Lightbox
      alt="Accordion component preview on a dark canvas"
      caption="Select the backdrop, close button, or press Escape to return."
      className="aspect-[16/10] w-full max-w-xl"
      src="/og/accordion-og.png"
    />
  );
}`,
    }
  ],
  "marquee": [
    {
      name: "default",
      component: marquee_marquee_demo,
      code: `import type { ReactNode } from "react";

import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";
import Marquee from "@/components/ui/marquee/marquee";

const TECH_STACK = [
  {
    name: "Next.js",
    icon: <NextjsIcon />,
  },
  {
    name: "React",
    icon: <ReactIcon />,
  },
  {
    name: "Typescript",
    icon: <TypescriptIcon />,
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindIcon />,
  },
];

export default function MarqueeExample() {
  return (
    <Marquee speed={80} gap="4rem" direction="left" pauseOnHover>
      <div className="flex gap-x-8 items-center md:gap-x-16">
        {TECH_STACK.map((tech) => (
          <Icon key={tech.name} text={tech.name}>
            {tech.icon}
          </Icon>
        ))}
      </div>
    </Marquee>
  );
}

const Icon = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="flex gap-x-4 items-center shrink h-16">
      <span className="*:xl:h-16 *:xl:w-16">{children}</span>
      <span className="font-medium text-sm lg:text-lg">{text}</span>
    </div>
  );
};
`,
      imports: `import type { ReactNode } from "react";

import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/assets/svgs";
import Marquee from "@/components/ui/marquee/marquee";`,
      anatomy: `const TECH_STACK = [
  {
    name: "Next.js",
    icon: <NextjsIcon />,
  },
  {
    name: "React",
    icon: <ReactIcon />,
  },
  {
    name: "Typescript",
    icon: <TypescriptIcon />,
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindIcon />,
  },
];

export default function MarqueeExample() {
  return (
    <Marquee speed={80} gap="4rem" direction="left" pauseOnHover>
      <div className="flex gap-x-8 items-center md:gap-x-16">
        {TECH_STACK.map((tech) => (
          <Icon key={tech.name} text={tech.name}>
            {tech.icon}
          </Icon>
        ))}
      </div>
    </Marquee>
  );
}

const Icon = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <div className="flex gap-x-4 items-center shrink h-16">
      <span className="*:xl:h-16 *:xl:w-16">{children}</span>
      <span className="font-medium text-sm lg:text-lg">{text}</span>
    </div>
  );
};`,
    }
  ],
  "ripple-button": [
    {
      name: "default",
      component: ripple_button_ripple_button_demo,
      code: `import type { ReactNode } from "react";

import RippleButton, {
  RippleButtonText,
  type RippleButtonTextProps,
} from "@/components/ui/ripple-button/ripple-button";

interface LocalRippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  scaleAmount?: number;
  className?: string;
  duration?: number;
  rippleStyle?: string;
}

interface RippleButtonEx1Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonProps?: LocalRippleButtonProps;
  textProps?: RippleButtonTextProps;
  className?: string;
}

export default function RippleButtonExample({
  textProps,
  buttonProps,
  className,
  ...props
}: RippleButtonEx1Props) {
  return (
    <RippleButton {...buttonProps}>
      <RippleButtonText {...textProps} text="Hover me!" />
    </RippleButton>
  );
}
`,
      imports: `import type { ReactNode } from "react";

import RippleButton, {
  RippleButtonText,
  type RippleButtonTextProps,
} from "@/components/ui/ripple-button/ripple-button";`,
      anatomy: `interface LocalRippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  scaleAmount?: number;
  className?: string;
  duration?: number;
  rippleStyle?: string;
}

interface RippleButtonEx1Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonProps?: LocalRippleButtonProps;
  textProps?: RippleButtonTextProps;
  className?: string;
}

export default function RippleButtonExample({
  textProps,
  buttonProps,
  className,
  ...props
}: RippleButtonEx1Props) {
  return (
    <RippleButton {...buttonProps}>
      <RippleButtonText {...textProps} text="Hover me!" />
    </RippleButton>
  );
}`,
    }
  ],
  "spotlight-card": [
    {
      name: "default",
      component: spotlight_card_spotlight_card_demo,
      code: `import SpotlightCard from "@/components/ui/spotlight-card/spotlight-card";

export default function SpotlightCardExample() {
  return (
    <SpotlightCard className="max-w-sm">
      <h3 className="font-semibold text-foreground text-lg">Spotlight Card</h3>
      <p className="mt-2 text-muted-foreground text-sm">
        Move your cursor across the card to reveal the spotlight that follows
        your pointer.
      </p>
    </SpotlightCard>
  );
}
`,
      imports: `import SpotlightCard from "@/components/ui/spotlight-card/spotlight-card";`,
      anatomy: `export default function SpotlightCardExample() {
  return (
    <SpotlightCard className="max-w-sm">
      <h3 className="font-semibold text-foreground text-lg">Spotlight Card</h3>
      <p className="mt-2 text-muted-foreground text-sm">
        Move your cursor across the card to reveal the spotlight that follows
        your pointer.
      </p>
    </SpotlightCard>
  );
}`,
    }
  ],
  "section-rail": [
    {
      name: "default",
      component: section_rail_section_rail_demo,
      code: `"use client";

import { useRef } from "react";

import SectionRail from "@/components/ui/section-rail/section-rail";

const sections = [
  {
    id: "section-rail-demo-overview",
    label: "Overview",
    description: "The goal, scope, and main ideas behind this page.",
  },
  {
    id: "section-rail-demo-interaction",
    label: "Interaction",
    description: "How the component responds to hover, focus, and scroll.",
  },
  {
    id: "section-rail-demo-motion",
    label: "Motion",
    description: "Direct scroll progress, no bounce, no ambient animation.",
  },
  {
    id: "section-rail-demo-accessibility",
    label: "Accessibility",
    description: "Labels on focus, aria-current, and reduced-motion support.",
  },
];

const copy =
  "A rail answers three questions at a glance: where am I, what is nearby, and where can I go. Everything else is decoration.";

export default function SectionRailDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full max-w-2xl items-stretch gap-6">
      <div
        ref={scrollRef}
        className="h-80 flex-1 overflow-y-auto rounded-xl border border-border bg-secondary/40 p-6"
      >
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-6 py-10"
          >
            <h3 className="font-semibold text-foreground text-lg">
              {section.label}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {section.description} {copy}
            </p>
          </section>
        ))}
      </div>

      <div className="flex items-center">
        <SectionRail
          items={sections}
          scrollRoot={scrollRef}
          scrollOffset={24}
          side="left"
        />
      </div>
    </div>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { useRef } from "react";

import SectionRail from "@/components/ui/section-rail/section-rail";

const sections = [
  {
    id: "section-rail-demo-overview",
    label: "Overview",
    description: "The goal, scope, and main ideas behind this page.",
  },
  {
    id: "section-rail-demo-interaction",
    label: "Interaction",
    description: "How the component responds to hover, focus, and scroll.",
  },
  {
    id: "section-rail-demo-motion",
    label: "Motion",
    description: "Direct scroll progress, no bounce, no ambient animation.",
  },
  {
    id: "section-rail-demo-accessibility",
    label: "Accessibility",
    description: "Labels on focus, aria-current, and reduced-motion support.",
  },
];

const copy =
  "A rail answers three questions at a glance: where am I, what is nearby, and where can I go. Everything else is decoration.";

export default function SectionRailDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full max-w-2xl items-stretch gap-6">
      <div
        ref={scrollRef}
        className="h-80 flex-1 overflow-y-auto rounded-xl border border-border bg-secondary/40 p-6"
      >
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-6 py-10"
          >
            <h3 className="font-semibold text-foreground text-lg">
              {section.label}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {section.description} {copy}
            </p>
          </section>
        ))}
      </div>

      <div className="flex items-center">
        <SectionRail
          items={sections}
          scrollRoot={scrollRef}
          scrollOffset={24}
          side="left"
        />
      </div>
    </div>
  );
}`,
    }
  ],
  "animated-dialog": [
    {
      name: "default",
      component: animated_dialog_animated_dialog_demo,
      code: `"use client";

import { useState } from "react";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/components/ui/animated-dialog/animated-dialog";

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
`,
      imports: ``,
      anatomy: `"use client";

import { useState } from "react";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/components/ui/animated-dialog/animated-dialog";

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
}`,
    },
    {
      name: "toast",
      component: animated_dialog_animated_dialog_toast,
      code: `"use client";

import { toast } from "sonner";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/components/ui/animated-dialog/animated-dialog";

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
`,
      imports: ``,
      anatomy: `"use client";

import { toast } from "sonner";
import {
  AnimatedDialog,
  AnimatedDialogClose,
  AnimatedDialogContent,
  AnimatedDialogDescription,
  AnimatedDialogTitle,
  AnimatedDialogTrigger,
} from "@/components/ui/animated-dialog/animated-dialog";

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
}`,
    }
  ],
  "split-text": [
    {
      name: "default",
      component: split_text_split_text_demo,
      code: `import SplitText from "@/components/ui/split-text/split-text";

export default function SplitTextExample() {
  return (
    <SplitText variant="words" className="max-w-md text-center">
      <h2 className="font-semibold text-3xl text-foreground">
        Text that reveals itself, one word at a time.
      </h2>
    </SplitText>
  );
}
`,
      imports: `import SplitText from "@/components/ui/split-text/split-text";`,
      anatomy: `export default function SplitTextExample() {
  return (
    <SplitText variant="words" className="max-w-md text-center">
      <h2 className="font-semibold text-3xl text-foreground">
        Text that reveals itself, one word at a time.
      </h2>
    </SplitText>
  );
}`,
    }
  ],
  "animated-tabs": [
    {
      name: "default",
      component: animated_tabs_animated_tabs_demo,
      code: `import AnimatedTabs from "@/components/ui/animated-tabs/animated-tabs";

const tabs = [
  { value: "home", title: "Home" },
  { value: "profile", title: "Profile" },
  { value: "settings", title: "Settings" },
  { value: "help", title: "Help" },
  { value: "about", title: "About" },
];

export default function AnimatedTabsExample() {
  return <AnimatedTabs tabs={tabs} />;
}
`,
      imports: `import AnimatedTabs from "@/components/ui/animated-tabs/animated-tabs";`,
      anatomy: `const tabs = [
  { value: "home", title: "Home" },
  { value: "profile", title: "Profile" },
  { value: "settings", title: "Settings" },
  { value: "help", title: "Help" },
  { value: "about", title: "About" },
];

export default function AnimatedTabsExample() {
  return <AnimatedTabs tabs={tabs} />;
}`,
    }
  ],
  "button": [
    {
      name: "default",
      component: button_button_demo,
      code: `import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button>
        Get started <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
`,
      imports: `import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/button/button";`,
      anatomy: `export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button>
        Get started <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}`,
    }
  ],
  "fluid-slider": [
    {
      name: "default",
      component: fluid_slider_fluid_slider_demo,
      code: `import FluidSlider from "@/components/ui/fluid-slider/fluid-slider";

export default function FluidSliderDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <FluidSlider
        label="Frequency"
        defaultValue={15}
        formatValue={(value) => \`\${value}%\`}
      />
      <FluidSlider
        label="Resonance"
        defaultValue={6}
        max={10}
        marks={[2, 4, 6, 8]}
      />
    </div>
  );
}
`,
      imports: `import FluidSlider from "@/components/ui/fluid-slider/fluid-slider";`,
      anatomy: `export default function FluidSliderDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <FluidSlider
        label="Frequency"
        defaultValue={15}
        formatValue={(value) => \`\${value}%\`}
      />
      <FluidSlider
        label="Resonance"
        defaultValue={6}
        max={10}
        marks={[2, 4, 6, 8]}
      />
    </div>
  );
}`,
    }
  ],
  "animated-switch": [
    {
      name: "default",
      component: animated_switch_animated_switch_demo,
      code: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

export default function AnimatedSwitchDemo() {
  return <AnimatedSwitch defaultChecked />;
}
`,
      imports: ``,
      anatomy: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

export default function AnimatedSwitchDemo() {
  return <AnimatedSwitch defaultChecked />;
}`,
    },
    {
      name: "disabled",
      component: animated_switch_animated_switch_disabled,
      code: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
`,
      imports: ``,
      anatomy: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
}`,
    },
    {
      name: "controlled",
      component: animated_switch_animated_switch_controlled,
      code: `"use client";

import { useState } from "react";
import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

export default function AnimatedSwitchControlled() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <AnimatedSwitch checked={checked} onCheckedChange={setChecked} />
      <span className="text-foreground text-sm font-medium">
        Controlled State:{" "}
        <span className="text-foreground font-semibold">
          {checked ? "ON" : "OFF"}
        </span>
      </span>
    </div>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { useState } from "react";
import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

export default function AnimatedSwitchControlled() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <AnimatedSwitch checked={checked} onCheckedChange={setChecked} />
      <span className="text-foreground text-sm font-medium">
        Controlled State:{" "}
        <span className="text-foreground font-semibold">
          {checked ? "ON" : "OFF"}
        </span>
      </span>
    </div>
  );
}`,
    },
    {
      name: "sizes",
      component: animated_switch_animated_switch_sizes,
      code: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
`,
      imports: ``,
      anatomy: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
}`,
    },
    {
      name: "disable",
      component: animated_switch_animated_switch_disable,
      code: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
`,
      imports: ``,
      anatomy: `"use client";

import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
}`,
    }
  ],
  "activity-graph": [
    {
      name: "default",
      component: activity_graph_activity_graph_demo,
      code: `"use client";

import { useEffect, useState } from "react";
import ActivityGraph from "@/components/ui/activity-graph/activity-graph";

interface GitHubContributionCalendar {
  login: string;
  days: Array<{
    date: string;
    value: number;
    label: string;
  }>;
  from: string;
  to: string;
}

type CalendarState =
  | { status: "loading" }
  | { status: "success"; calendar: GitHubContributionCalendar }
  | { status: "error"; message: string };

export default function ActivityGraphDemo() {
  const [state, setState] = useState<CalendarState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadCalendar() {
      try {
        const response = await fetch("/api/github-contributions", {
          signal: controller.signal,
        });
        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error(
            \`The GitHub contribution endpoint returned \${response.status} instead of JSON.\`,
          );
        }

        const payload = (await response.json()) as
          | GitHubContributionCalendar
          | { message?: string };

        if (!response.ok) {
          throw new Error(
            "message" in payload && payload.message
              ? payload.message
              : "GitHub contribution data is unavailable.",
          );
        }

        setState({
          status: "success",
          calendar: payload as GitHubContributionCalendar,
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "GitHub contribution data is unavailable.",
        });
      }
    }

    void loadCalendar();

    return () => controller.abort();
  }, []);

  if (state.status === "loading") {
    return (
      <div
        className="w-full max-w-4xl rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground"
        role="status"
      >
        Loading GitHub contribution activity…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="w-full max-w-4xl rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="font-medium text-foreground">
          GitHub contribution data is unavailable
        </p>
        <p className="mt-1 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  const { calendar } = state;

  return (
    <div className="w-full max-w-4xl">
      <ActivityGraph
        data={calendar.days}
        startDate={calendar.from}
        endDate={calendar.to}
        showTooltip
        colors={[
          "color-mix(in oklab, #22c55e 25%, var(--background))",
          "color-mix(in oklab, #22c55e 45%, var(--background))",
          "color-mix(in oklab, #22c55e 70%, var(--background))",
          "#22c55e",
        ]}
        emptyColor="color-mix(in oklab, var(--muted) 76%, var(--background))"
        ariaLabel={\`\${calendar.login}'s GitHub contribution activity\`}
      />
    </div>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { useEffect, useState } from "react";
import ActivityGraph from "@/components/ui/activity-graph/activity-graph";

interface GitHubContributionCalendar {
  login: string;
  days: Array<{
    date: string;
    value: number;
    label: string;
  }>;
  from: string;
  to: string;
}

type CalendarState =
  | { status: "loading" }
  | { status: "success"; calendar: GitHubContributionCalendar }
  | { status: "error"; message: string };

export default function ActivityGraphDemo() {
  const [state, setState] = useState<CalendarState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadCalendar() {
      try {
        const response = await fetch("/api/github-contributions", {
          signal: controller.signal,
        });
        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error(
            \`The GitHub contribution endpoint returned \${response.status} instead of JSON.\`,
          );
        }

        const payload = (await response.json()) as
          | GitHubContributionCalendar
          | { message?: string };

        if (!response.ok) {
          throw new Error(
            "message" in payload && payload.message
              ? payload.message
              : "GitHub contribution data is unavailable.",
          );
        }

        setState({
          status: "success",
          calendar: payload as GitHubContributionCalendar,
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "GitHub contribution data is unavailable.",
        });
      }
    }

    void loadCalendar();

    return () => controller.abort();
  }, []);

  if (state.status === "loading") {
    return (
      <div
        className="w-full max-w-4xl rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground"
        role="status"
      >
        Loading GitHub contribution activity…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="w-full max-w-4xl rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="font-medium text-foreground">
          GitHub contribution data is unavailable
        </p>
        <p className="mt-1 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  const { calendar } = state;

  return (
    <div className="w-full max-w-4xl">
      <ActivityGraph
        data={calendar.days}
        startDate={calendar.from}
        endDate={calendar.to}
        showTooltip
        colors={[
          "color-mix(in oklab, #22c55e 25%, var(--background))",
          "color-mix(in oklab, #22c55e 45%, var(--background))",
          "color-mix(in oklab, #22c55e 70%, var(--background))",
          "#22c55e",
        ]}
        emptyColor="color-mix(in oklab, var(--muted) 76%, var(--background))"
        ariaLabel={\`\${calendar.login}'s GitHub contribution activity\`}
      />
    </div>
  );
}`,
    }
  ],
  "expandable-tabs": [
    {
      name: "default",
      component: expandable_tabs_expandable_tabs_demo,
      code: `"use client";

import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "@/components/ui/expandable-tabs/expandable-tabs";

const tabs = [
  {
    value: "home",
    title: "Home",
    icon: FaHome,
  },
  {
    value: "profile",
    title: "Profile",
    icon: FaUser,
  },
  {
    value: "settings",
    title: "Settings",
    icon: FaCog,
  },
  {
    value: "logout",
    title: "Logout",
    icon: FaSignOutAlt,
  },
];

export default function ExpandableTabsExample() {
  return <ExpandableTabs tabs={tabs} defaultValue="home" />;
}
`,
      imports: ``,
      anatomy: `"use client";

import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "@/components/ui/expandable-tabs/expandable-tabs";

const tabs = [
  {
    value: "home",
    title: "Home",
    icon: FaHome,
  },
  {
    value: "profile",
    title: "Profile",
    icon: FaUser,
  },
  {
    value: "settings",
    title: "Settings",
    icon: FaCog,
  },
  {
    value: "logout",
    title: "Logout",
    icon: FaSignOutAlt,
  },
];

export default function ExpandableTabsExample() {
  return <ExpandableTabs tabs={tabs} defaultValue="home" />;
}`,
    }
  ],
  "expanding-action": [
    {
      name: "default",
      component: expanding_action_expanding_action_demo,
      code: `"use client";

import { Plus } from "lucide-react";

import ExpandingAction from "@/components/ui/expanding-action/expanding-action";

const projectTypes = [
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
];

export default function ExpandingActionDemo() {
  return (
    <ExpandingAction
      trigger="New project"
      triggerIcon={<Plus className="size-4" strokeWidth={1.75} />}
      items={projectTypes}
    />
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { Plus } from "lucide-react";

import ExpandingAction from "@/components/ui/expanding-action/expanding-action";

const projectTypes = [
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
];

export default function ExpandingActionDemo() {
  return (
    <ExpandingAction
      trigger="New project"
      triggerIcon={<Plus className="size-4" strokeWidth={1.75} />}
      items={projectTypes}
    />
  );
}`,
    }
  ],
  "fluid-tooltip": [
    {
      name: "default",
      component: fluid_tooltip_fluid_tooltip_demo,
      code: `import { Bell, Home, Search, Settings } from "lucide-react";

import FluidTooltip from "@/components/ui/fluid-tooltip/fluid-tooltip";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function FluidTooltipDemo() {
  return (
    <FluidTooltip.Group orientation="horizontal">
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-muted/60 p-1.5">
        {items.map((item) => (
          <FluidTooltip.Root key={item.id} id={item.id}>
            <FluidTooltip.Trigger asChild>
              <button
                type="button"
                aria-label={item.label}
                className="grid size-10 place-items-center rounded-xl text-muted-foreground outline-none transition-colors duration-150 hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <item.icon aria-hidden="true" className="size-4" />
              </button>
            </FluidTooltip.Trigger>
            <FluidTooltip.Content>{item.label}</FluidTooltip.Content>
          </FluidTooltip.Root>
        ))}
      </div>
    </FluidTooltip.Group>
  );
}
`,
      imports: `import { Bell, Home, Search, Settings } from "lucide-react";

import FluidTooltip from "@/components/ui/fluid-tooltip/fluid-tooltip";`,
      anatomy: `const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function FluidTooltipDemo() {
  return (
    <FluidTooltip.Group orientation="horizontal">
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-muted/60 p-1.5">
        {items.map((item) => (
          <FluidTooltip.Root key={item.id} id={item.id}>
            <FluidTooltip.Trigger asChild>
              <button
                type="button"
                aria-label={item.label}
                className="grid size-10 place-items-center rounded-xl text-muted-foreground outline-none transition-colors duration-150 hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <item.icon aria-hidden="true" className="size-4" />
              </button>
            </FluidTooltip.Trigger>
            <FluidTooltip.Content>{item.label}</FluidTooltip.Content>
          </FluidTooltip.Root>
        ))}
      </div>
    </FluidTooltip.Group>
  );
}`,
    }
  ],
  "mesh-gradient-shader": [
    {
      name: "ocean",
      component: mesh_gradient_shader_mesh_gradient_shader_ocean,
      code: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderOcean() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#006994", "#0099cc", "#00b4d8", "#48cae4", "#90e0ef"]}
      distortion={0.5}
      swirl={0.1}
    />
  );
}
`,
      imports: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";`,
      anatomy: `export default function MeshGradientShaderOcean() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#006994", "#0099cc", "#00b4d8", "#48cae4", "#90e0ef"]}
      distortion={0.5}
      swirl={0.1}
    />
  );
}`,
    },
    {
      name: "default",
      component: mesh_gradient_shader_mesh_gradient_shader_demo,
      code: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderExample() {
  return <MeshGradientShader className="h-64 w-full lg:h-72" />;
}
`,
      imports: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";`,
      anatomy: `export default function MeshGradientShaderExample() {
  return <MeshGradientShader className="h-64 w-full lg:h-72" />;
}`,
    },
    {
      name: "sunset",
      component: mesh_gradient_shader_mesh_gradient_shader_sunset,
      code: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderSunset() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#ff6b35", "#f7931e", "#ffcd3c", "#ff4e6a", "#c0392b"]}
      distortion={0.4}
      swirl={0.5}
    />
  );
}
`,
      imports: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";`,
      anatomy: `export default function MeshGradientShaderSunset() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#ff6b35", "#f7931e", "#ffcd3c", "#ff4e6a", "#c0392b"]}
      distortion={0.4}
      swirl={0.5}
    />
  );
}`,
    },
    {
      name: "static",
      component: mesh_gradient_shader_mesh_gradient_shader_static,
      code: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderStatic() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#a855f7", "#6366f1", "#3b82f6", "#06b6d4", "#10b981"]}
      distortion={0.2}
      swirl={0.05}
      speed={0}
    />
  );
}
`,
      imports: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";`,
      anatomy: `export default function MeshGradientShaderStatic() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#a855f7", "#6366f1", "#3b82f6", "#06b6d4", "#10b981"]}
      distortion={0.2}
      swirl={0.05}
      speed={0}
    />
  );
}`,
    },
    {
      name: "monochrome",
      component: mesh_gradient_shader_mesh_gradient_shader_monochrome,
      code: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";

export default function MeshGradientShaderMonochrome() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#111111", "#333333", "#555555", "#888888", "#cccccc"]}
      distortion={0.6}
      swirl={0.3}
      grainOverlay={0.15}
    />
  );
}
`,
      imports: `import MeshGradientShader from "@/components/ui/mesh-gradient-shader/mesh-gradient-shader";`,
      anatomy: `export default function MeshGradientShaderMonochrome() {
  return (
    <MeshGradientShader
      className="h-64 w-full lg:h-72"
      colors={["#111111", "#333333", "#555555", "#888888", "#cccccc"]}
      distortion={0.6}
      swirl={0.3}
      grainOverlay={0.15}
    />
  );
}`,
    }
  ],
  "link-preview": [
    {
      name: "default",
      component: link_preview_link_preview_demo,
      code: `import LinkPreview from "@/components/ui/link-preview/link-preview";

export default function LinkPreviewExample() {
  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <h3>Projects that I works on!!!</h3>
      <ul className="list-disc *:ml-2 *:lg:ml-4">
        <li>
          Sona UI - Open Source UI Component Library :{" "}
          <LinkPreview
            link="https://sona-ui.vercel.app/"
            text="Sona UI"
            className="flex items-center justify-center h-full w-full"
          />
        </li>
      </ul>
    </div>
  );
}
`,
      imports: `import LinkPreview from "@/components/ui/link-preview/link-preview";`,
      anatomy: `export default function LinkPreviewExample() {
  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <h3>Projects that I works on!!!</h3>
      <ul className="list-disc *:ml-2 *:lg:ml-4">
        <li>
          Sona UI - Open Source UI Component Library :{" "}
          <LinkPreview
            link="https://sona-ui.vercel.app/"
            text="Sona UI"
            className="flex items-center justify-center h-full w-full"
          />
        </li>
      </ul>
    </div>
  );
}`,
    }
  ],
  "stagger-text": [
    {
      name: "default",
      component: stagger_text_stagger_text_demo,
      code: `import StaggerText from "@/components/ui/stagger-text/stagger-text";

export default function StaggerTextExample() {
  return <StaggerText text="Stagger Text!!" />;
}
`,
      imports: `import StaggerText from "@/components/ui/stagger-text/stagger-text";`,
      anatomy: `export default function StaggerTextExample() {
  return <StaggerText text="Stagger Text!!" />;
}`,
    }
  ],
  "avatar-showcase": [
    {
      name: "default",
      component: avatar_showcase_avatar_showcase_demo,
      code: `import AvatarShowcase, {
  type AvatarShowcaseItem,
} from "@/components/ui/avatar-showcase/avatar-showcase";

const FOLLOWERS: AvatarShowcaseItem[] = [
  { id: "1", name: "Maya Chen", imageUrl: "https://i.pravatar.cc/160?img=5" },
  {
    id: "2",
    name: "Noah Williams",
    imageUrl: "https://i.pravatar.cc/160?img=12",
  },
  {
    id: "3",
    name: "Aisha Rahman",
    imageUrl: "https://i.pravatar.cc/160?img=32",
  },
  { id: "4", name: "Leo Martin", imageUrl: "https://i.pravatar.cc/160?img=11" },
  {
    id: "5",
    name: "Sofia Silva",
    imageUrl: "https://i.pravatar.cc/160?img=47",
  },
  { id: "6", name: "Ethan Kim", imageUrl: "https://i.pravatar.cc/160?img=68" },
  {
    id: "7",
    name: "Amara Okafor",
    imageUrl: "https://i.pravatar.cc/160?img=44",
  },
  {
    id: "8",
    name: "Oliver Smith",
    imageUrl: "https://i.pravatar.cc/160?img=15",
  },
  { id: "9", name: "Priya Nair", imageUrl: "https://i.pravatar.cc/160?img=49" },
  {
    id: "10",
    name: "Mateo Garcia",
    imageUrl: "https://i.pravatar.cc/160?img=53",
  },
  { id: "11", name: "Hana Sato", imageUrl: "https://i.pravatar.cc/160?img=25" },
  { id: "12", name: "Jon Bell", imageUrl: "https://i.pravatar.cc/160?img=3" },
];

export default function AvatarShowcaseExample() {
  return (
    <AvatarShowcase
      items={FOLLOWERS}
      message="Thanks for following"
      totalCount={912}
    />
  );
}
`,
      imports: `import AvatarShowcase, {
  type AvatarShowcaseItem,
} from "@/components/ui/avatar-showcase/avatar-showcase";`,
      anatomy: `const FOLLOWERS: AvatarShowcaseItem[] = [
  { id: "1", name: "Maya Chen", imageUrl: "https://i.pravatar.cc/160?img=5" },
  {
    id: "2",
    name: "Noah Williams",
    imageUrl: "https://i.pravatar.cc/160?img=12",
  },
  {
    id: "3",
    name: "Aisha Rahman",
    imageUrl: "https://i.pravatar.cc/160?img=32",
  },
  { id: "4", name: "Leo Martin", imageUrl: "https://i.pravatar.cc/160?img=11" },
  {
    id: "5",
    name: "Sofia Silva",
    imageUrl: "https://i.pravatar.cc/160?img=47",
  },
  { id: "6", name: "Ethan Kim", imageUrl: "https://i.pravatar.cc/160?img=68" },
  {
    id: "7",
    name: "Amara Okafor",
    imageUrl: "https://i.pravatar.cc/160?img=44",
  },
  {
    id: "8",
    name: "Oliver Smith",
    imageUrl: "https://i.pravatar.cc/160?img=15",
  },
  { id: "9", name: "Priya Nair", imageUrl: "https://i.pravatar.cc/160?img=49" },
  {
    id: "10",
    name: "Mateo Garcia",
    imageUrl: "https://i.pravatar.cc/160?img=53",
  },
  { id: "11", name: "Hana Sato", imageUrl: "https://i.pravatar.cc/160?img=25" },
  { id: "12", name: "Jon Bell", imageUrl: "https://i.pravatar.cc/160?img=3" },
];

export default function AvatarShowcaseExample() {
  return (
    <AvatarShowcase
      items={FOLLOWERS}
      message="Thanks for following"
      totalCount={912}
    />
  );
}`,
    }
  ],
  "hold-to-delete-button": [
    {
      name: "default",
      component: hold_to_delete_button_hold_to_delete_button_demo,
      code: `"use client";

import { toast } from "sonner";
import HoldToDeleteButton from "@/components/ui/hold-to-delete-button/hold-to-delete-button";

export default function HoldToDeleteButtonDemo() {
  return (
    <div className="flex items-center justify-center py-12">
      <HoldToDeleteButton
        onDelete={() => toast.success("Successfully deleted")}
      />
    </div>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { toast } from "sonner";
import HoldToDeleteButton from "@/components/ui/hold-to-delete-button/hold-to-delete-button";

export default function HoldToDeleteButtonDemo() {
  return (
    <div className="flex items-center justify-center py-12">
      <HoldToDeleteButton
        onDelete={() => toast.success("Successfully deleted")}
      />
    </div>
  );
}`,
    }
  ]
};

export type Registry = {
    [key: string]: Array<{
        type: string;
        content: string;
        path: string;
        target: string;
    }>
}

export const registry: Registry = {
  "animated-dropdown": [
    {
      type: "registry:ui",
      content: `"use client";

import { Menu } from "@base-ui/react/menu";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useState,
} from "react";
import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

// ─── Context ─────────────────────────────────────────────────────────────────

interface DropdownContextValue {
  /** Unique layoutId prefix for the hover highlight — scoped per Root instance. */
  layoutId: string;
  /** Currently highlighted item id (for keyboard + mouse parity). */
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error(
      "AnimatedDropdown subcomponents must be used within <AnimatedDropdown>",
    );
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedDropdownProps {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the menu ignores user interaction. @default false */
  disabled?: boolean;
  /** Whether the open menu limits interaction to the menu. @default true */
  modal?: boolean;
}

export interface AnimatedDropdownContentProps {
  children: ReactNode;
  className?: string;
  /**
   * Side the menu opens on.
   * @default "bottom"
   */
  side?: "bottom" | "top" | "left" | "right";
  /**
   * Alignment along the side.
   * @default "center"
   */
  align?: "start" | "center" | "end";
  /**
   * Gap between trigger and popup in px.
   * @default 6
   */
  sideOffset?: number;
}

export interface AnimatedDropdownItemProps {
  children: ReactNode;
  /** Icon to display before the label (any ReactNode — no HugeIcons dependency). */
  icon?: ReactNode;
  /**
   * Visual variant.
   * @default "default"
   */
  variant?: "default" | "danger";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface AnimatedDropdownTriggerProps {
  children: ReactNode;
  className?: string;
  /** Associates the trigger with an external visible label. */
  "aria-labelledby"?: string;
}

export interface AnimatedDropdownTriggerIndicatorProps {
  className?: string;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

/**
 * Root dropdown — owns open state and the hover-highlight layout group.
 * Wrap all other AnimatedDropdown subcomponents inside this.
 */
export function AnimatedDropdown({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  modal = true,
}: AnimatedDropdownProps) {
  const layoutId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setActiveId(null);
    onOpenChange?.(nextOpen);
  };

  return (
    <DropdownContext.Provider value={{ layoutId, activeId, setActiveId }}>
      <LayoutGroup id={layoutId}>
        <Menu.Root
          open={open}
          defaultOpen={defaultOpen}
          disabled={disabled}
          modal={modal}
          onOpenChange={handleOpenChange}
        >
          {children}
        </Menu.Root>
      </LayoutGroup>
    </DropdownContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

/**
 * The element that opens the dropdown when clicked.
 * Renders as a \`<button>\` by default via Base UI.
 */
export function AnimatedDropdownTrigger({
  children,
  className,
  "aria-labelledby": ariaLabelledBy,
}: AnimatedDropdownTriggerProps) {
  return (
    <Menu.Trigger
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5",
        "bg-secondary text-secondary-foreground text-sm font-medium",
        "hover:bg-muted transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "data-[popup-open]:bg-muted",
        className,
      )}
    >
      {children}
    </Menu.Trigger>
  );
}

/**
 * A state-aware chevron for the dropdown trigger.
 * Rotates when Base UI marks the parent trigger as open.
 */
export function AnimatedDropdownTriggerIndicator({
  className,
}: AnimatedDropdownTriggerIndicatorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "size-4 shrink-0 text-muted-foreground",
        "transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "group-data-[popup-open]:rotate-180 motion-reduce:transition-none",
        className,
      )}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

/**
 * The animated popup panel containing menu items.
 * Scales in from its trigger origin using Base UI's \`--transform-origin\` variable.
 */
export function AnimatedDropdownContent({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 6,
}: AnimatedDropdownContentProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Menu.Portal>
      <Menu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <Menu.Popup
          className={cn(
            // Layout
            "z-50 min-w-[160px] rounded-xl p-1",
            // Surface
            "bg-popover text-popover-foreground shadow-lg",
            "border border-border/60",
            // Origin-aware transform — Base UI injects --transform-origin
            "origin-[var(--transform-origin)]",
            // Enter animation (CSS @starting-style + transition)
            "transition-[opacity,transform]",
            "starting:scale-95 starting:opacity-0",
            shouldReduceMotion ? "duration-0" : "duration-150",
            className,
          )}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

/**
 * A single menu item with an animated hover-highlight background.
 * The highlight uses a shared \`layoutId\` so it glides between items on mouse-over.
 */
export function AnimatedDropdownItem({
  children,
  icon,
  variant = "default",
  disabled,
  onClick,
  className,
}: AnimatedDropdownItemProps) {
  const { layoutId, activeId, setActiveId } = useDropdownContext();
  const itemId = useId();
  const shouldReduceMotion = useReducedMotion();

  const isActive = activeId === itemId;

  return (
    <Menu.Item
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group relative flex cursor-pointer select-none items-center gap-2.5",
        "rounded-lg px-2.5 py-2 text-sm outline-none",
        "transition-colors duration-75",
        variant === "danger"
          ? "text-danger-foreground focus:text-white"
          : "text-popover-foreground",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onMouseEnter={() => setActiveId(itemId)}
      onFocus={() => setActiveId(itemId)}
      onMouseLeave={() => setActiveId(null)}
      onBlur={() => setActiveId(null)}
    >
      {/* Animated highlight — shared across all items in this dropdown instance */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId={shouldReduceMotion ? undefined : \`\${layoutId}-highlight\`}
            className={cn(
              "absolute inset-0 rounded-lg",
              variant === "danger" ? "bg-danger" : "bg-accent",
            )}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion
                ? motionTransition.reduced
                : motionTransition.spatial
            }
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      {icon && (
        <span
          className={cn(
            "relative z-10 shrink-0 [&_svg]:size-4 text-muted-foreground",
            variant === "danger"
              ? "text-danger-foreground group-focus:text-white"
              : "text-popover-foreground",
          )}
        >
          {icon}
        </span>
      )}

      {/* Label */}
      <span className="relative z-10 flex-1">{children}</span>
    </Menu.Item>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

/** A thin visual divider between groups of items. */
export function AnimatedDropdownSeparator({
  className,
}: {
  className?: string;
}) {
  return (
    <Menu.Separator className={cn("my-1 h-px bg-border/60 mx-1", className)} />
  );
}
`,
      path: "animated-dropdown/animated-dropdown.tsx",
      target: "components/sonaui/animated-dropdown/animated-dropdown.tsx"
    }
  ],
  "circular-dock-menu": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  AnimatePresence,
  MotionConfig,
  type Transition,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface DockMenuItem {
  /** Display label shown on the item pill. */
  label: string;
  /** Icon component (e.g. from lucide-react). */
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  /** Called when the item is selected. */
  onSelect?: () => void;
}

export interface CircularDockMenuProps {
  /**
   * Items rendered as arc pills when the menu is open.
   */
  items?: DockMenuItem[];
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Spring stiffness for the open/close animation.
   * @default 420
   */
  stiffness?: number;
  /**
   * Spring damping for the open/close animation.
   * @default 32
   */
  damping?: number;
  /** Additional CSS classes for the root container. */
  className?: string;
}

const DEFAULT_ITEMS: DockMenuItem[] = [];

function getArcPosition(index: number, total: number) {
  const progress = total <= 1 ? 0 : index / (total - 1);
  const radius = 500 - progress * 270;
  const angle = (-140 + progress * 36) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    rotate: -12 + progress * 9,
  };
}

export default function CircularDockMenu({
  items = DEFAULT_ITEMS,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  stiffness = 420,
  damping = 32,
  className,
}: CircularDockMenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const springConfig: Transition = useMemo(
    () => ({ type: "spring", stiffness, damping, mass: 0.8 }),
    [stiffness, damping],
  );
  const resolvedTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : springConfig;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const positionedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        ...getArcPosition(index, items.length),
      })),
    [items],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, setOpen]);

  return (
    <MotionConfig transition={resolvedTransition}>
      <div
        className={cn(
          "flex min-h-[520px] w-full items-center justify-center overflow-hidden px-4 py-10",
          className,
        )}
      >
        <div ref={rootRef} className="relative h-[440px] max-w-[520px] w-full">
          <AnimatePresence initial={false}>
            {isOpen &&
              positionedItems.map(
                ({ label, icon: Icon, onSelect, x, y, rotate }, index) => (
                  <m.div
                    key={label}
                    className="absolute bottom-12 left-1/2 z-10"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.56,
                      rotate: 8,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      x,
                      y,
                      opacity: 1,
                      scale: 1,
                      rotate,
                      filter: "blur(0px)",
                      transition: {
                        ...(shouldReduceMotion
                          ? { duration: 0 }
                          : springConfig),
                        delay: shouldReduceMotion
                          ? 0
                          : (items.length - index - 1) * 0.045,
                      },
                    }}
                    exit={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.48,
                      rotate: 10,
                      filter: "blur(10px)",
                      transition: shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: index * 0.025,
                          },
                    }}
                  >
                    <m.button
                      type="button"
                      className={cn(
                        "relative flex h-14 -translate-x-1/2 items-center gap-3 rounded-full border px-5",
                        "border-border bg-background text-foreground shadow-lg",
                        "cursor-pointer text-lg font-semibold whitespace-nowrap",
                        "hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      )}
                      onClick={() => {
                        onSelect?.();
                        setOpen(false);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          event.preventDefault();
                          setOpen(false);
                          triggerRef.current?.focus();
                        }
                      }}
                      whileHover={
                        shouldReduceMotion ? {} : { scale: 1.05, zIndex: 20 }
                      }
                      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-6 text-muted-foreground"
                        strokeWidth={2}
                      />
                      <span>{label}</span>
                    </m.button>
                  </m.div>
                ),
              )}
          </AnimatePresence>

          <m.button
            ref={triggerRef}
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!isOpen)}
            className={cn(
              "absolute bottom-12 left-1/2 z-20 flex size-24 -translate-x-1/2 items-center justify-center rounded-full border",
              "border-border bg-background text-foreground shadow-lg",
              "hover:border-border/80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          >
            <m.span
              className="block relative size-9"
              animate={isOpen ? "open" : "closed"}
              initial={false}
            >
              <m.span
                className="absolute left-0 top-1/2 h-1 w-full bg-foreground rounded-full -translate-y-1/2"
                variants={{ closed: { rotate: 0 }, open: { rotate: 45 } }}
              />
              <m.span
                className="absolute left-0 top-1/2 h-1 w-full bg-foreground rounded-full -translate-y-1/2"
                variants={{ closed: { rotate: 90 }, open: { rotate: -45 } }}
              />
            </m.span>
          </m.button>
        </div>
      </div>
    </MotionConfig>
  );
}
`,
      path: "circular-dock-menu/circular-dock-menu.tsx",
      target: "components/sonaui/circular-dock-menu/circular-dock-menu.tsx"
    }
  ],
  "image-trail": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

type ImageTrailVariant = "scale" | "fade" | "blur" | "rise" | "tilt";

export interface ImageTrailProps {
  /** Image sources spawned in order as the pointer moves. */
  images: string[];
  /** The content the effect is scoped to; the trail only spawns over this area. */
  children: ReactNode;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Extra classes for each trail image (use for sizing, e.g. \`"w-48"\`). @default "w-40" */
  itemClassName?: string;
  /**
   * Pointer distance in pixels travelled before the next image spawns.
   * @default 80
   */
  threshold?: number;
  /**
   * Maximum number of images alive at once.
   * @default 8
   */
  maxImages?: number;
  /**
   * How long an image stays before it animates out, in milliseconds.
   * @default 600
   */
  lifetime?: number;
  /**
   * Entrance and exit animation style.
   * @default "scale"
   */
  variant?: "scale" | "fade" | "blur" | "rise" | "tilt";
  /**
   * CSS selector for elements that suppress the effect when hovered, keeping
   * interactive UI unobstructed.
   * @default "a, button, input, [data-image-trail-ignore]"
   */
  ignoreSelector?: string;
  /**
   * z-index of the trail layer.
   * @default 10
   */
  zIndex?: number;
}

interface TrailItem {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
}

const VARIANTS: Record<
  ImageTrailVariant,
  {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
  }
> = {
  scale: {
    initial: { opacity: 0, scale: 0.4 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(12px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
  rise: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
  },
  tilt: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

export default function ImageTrail({
  images,
  children,
  className,
  itemClassName = "w-40",
  threshold = 80,
  maxImages = 8,
  lifetime = 600,
  variant = "scale",
  ignoreSelector = "a, button, input, [data-image-trail-ignore]",
  zIndex = 10,
}: ImageTrailProps) {
  const prefersReducedMotion = useReducedMotion();
  const [trail, setTrail] = useState<TrailItem[]>([]);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const imageIndex = useRef(0);
  const idCounter = useRef(0);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // Clear any pending removals when the component unmounts.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    // Over interactive UI: stop spawning and fast-clear live images so they
    // don't obstruct it. Their exit animation still plays via AnimatePresence.
    if ((event.target as Element).closest(ignoreSelector)) {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
      lastPos.current = null;
      setTrail((prev) => (prev.length ? [] : prev));
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const last = lastPos.current;
    if (last && Math.hypot(x - last.x, y - last.y) < threshold) return;
    lastPos.current = { x, y };

    const src = images[imageIndex.current % images.length];
    imageIndex.current += 1;
    const id = idCounter.current++;
    const rotate = (Math.random() - 0.5) * (variant === "tilt" ? 24 : 8);

    setTrail((prev) => {
      const next = [...prev, { id, src, x, y, rotate }];
      return next.length > maxImages
        ? next.slice(next.length - maxImages)
        : next;
    });

    const timer = setTimeout(() => {
      setTrail((prev) => prev.filter((item) => item.id !== id));
      timers.current.delete(timer);
    }, lifetime);
    timers.current.add(timer);
  };

  const active = VARIANTS[variant];

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        lastPos.current = null;
      }}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ zIndex }}
      >
        <AnimatePresence>
          {trail.map((item) => (
            // biome-ignore lint/performance/noImgElement: registry components stay framework-agnostic — no next/image dependency
            <motion.img
              key={item.id}
              src={item.src}
              alt=""
              draggable={false}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-lg object-cover shadow-lg",
                itemClassName,
              )}
              style={{ left: item.x, top: item.y, rotate: item.rotate }}
              initial={active.initial}
              animate={active.animate}
              exit={active.exit}
              transition={motionTransition.expressive}
            />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
}
`,
      path: "image-trail/image-trail.tsx",
      target: "components/sonaui/image-trail/image-trail.tsx"
    }
  ],
  "sona-utils": [
    {
      type: "registry:ui",
      content: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names while resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
      path: "sona-utils/sona-utils.ts",
      target: "components/sonaui/sona-utils/sona-utils.ts"
    }
  ],
  "magnetic-button": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  motion,
  type SpringOptions,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/sona-utils";

const SPRING_CONFIG = { stiffness: 30, damping: 6, mass: 0.6 };

export interface MagneticProps {
  /** The content to be rendered inside the magnetic button. */
  children: ReactNode;
  /**
   * The intensity of the magnetic pull effect.
   * @default 0.6
   */
  magneticIntensity?: number;
  /**
   * The range within which the magnetic effect is active.
   * @default 100
   */
  magneticRange?: number;
  /**
   * Defines the area of interaction for the magnetic effect.
   * @default "self"
   */
  interactionArea?: "self" | "parent";
  /** Configuration for the spring animation. */
  springConfig?: SpringOptions;
  /** Additional class names for custom styling. */
  customClassName?: string;
  /** Additional classes for the wrapper. Prefer this for new usage. */
  className?: string;
}

export default function Magnetic({
  children,
  magneticIntensity = 0.6,
  magneticRange = 100,
  interactionArea = "self",
  springConfig = SPRING_CONFIG,
  customClassName,
  className,
}: MagneticProps) {
  const [isMouseHovered, setMouseHovered] = useState(false);
  const magneticRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const springMotionX = useSpring(motionX, springConfig);
  const springMotionY = useSpring(motionY, springConfig);
  const resolvedRange = Math.max(1, magneticRange);

  // Only listen while hovered — no idle document-wide mousemove work.
  useEffect(() => {
    if (!isMouseHovered || shouldReduceMotion) return;

    const calculateMouseDistance = (event: MouseEvent) => {
      if (magneticRef.current) {
        const rect = magneticRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;

        const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (absoluteDistance <= resolvedRange) {
          const scale = 1 - absoluteDistance / resolvedRange;

          motionX.set(distanceX * magneticIntensity * scale);
          motionY.set(distanceY * magneticIntensity * scale);
        } else {
          motionX.set(0);
          motionY.set(0);
        }
      }
    };

    document.addEventListener("mousemove", calculateMouseDistance);

    return () => {
      document.removeEventListener("mousemove", calculateMouseDistance);
    };
  }, [
    isMouseHovered,
    shouldReduceMotion,
    magneticIntensity,
    resolvedRange,
    motionX,
    motionY,
  ]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setMouseHovered(false);
      motionX.set(0);
      motionY.set(0);
    }
  }, [motionX, motionY, shouldReduceMotion]);

  useEffect(() => {
    if (interactionArea === "parent" && magneticRef.current?.parentElement) {
      const parentElement = magneticRef.current.parentElement;

      const handleParentMouseEnter = () => setMouseHovered(true);
      const handleParentMouseLeave = () => {
        setMouseHovered(false);
        motionX.set(0);
        motionY.set(0);
      };

      parentElement.addEventListener("mouseenter", handleParentMouseEnter);
      parentElement.addEventListener("mouseleave", handleParentMouseLeave);

      return () => {
        parentElement.removeEventListener("mouseenter", handleParentMouseEnter);
        parentElement.removeEventListener("mouseleave", handleParentMouseLeave);
      };
    }
  }, [interactionArea, motionX, motionY]);

  const handleMouseEnter = () => {
    if (interactionArea === "self") {
      setMouseHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactionArea === "self") {
      setMouseHovered(false);
      motionX.set(0);
      motionY.set(0);
    }
  };

  return (
    <motion.div
      ref={magneticRef}
      onMouseEnter={interactionArea === "self" ? handleMouseEnter : undefined}
      onMouseLeave={interactionArea === "self" ? handleMouseLeave : undefined}
      style={{
        x: springMotionX,
        y: springMotionY,
      }}
      role="presentation"
      className={cn(customClassName, className)}
    >
      {children}
    </motion.div>
  );
}
`,
      path: "magnetic-button/magnetic-button.tsx",
      target: "components/sonaui/magnetic-button/magnetic-button.tsx"
    }
  ],
  "fluid-tabs": [
    {
      type: "registry:ui",
      content: `"use client";

import { Tabs } from "@base-ui/react/tabs";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface FluidTabItem {
  /** Stable value used to identify the tab. */
  value: string;
  /** Content displayed inside the tab trigger. */
  title: ReactNode;
  /** Whether the tab is unavailable. @default false */
  disabled?: boolean;
  /** ID of the external tab panel controlled by this tab. */
  ariaControls?: string;
}

export interface FluidTabsProps {
  /** Tabs displayed in the horizontal tab list. */
  tabs: FluidTabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initially active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Visual treatment for the active surface. @default "capsule" */
  variant?: "capsule" | "underline";
  /** Size of the tab triggers. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible label for the tab list. @default "Tabs" */
  ariaLabel?: string;
  /**
   * Styling hook for the active surface.
   * @default Capsule uses the active surface token; underline uses foreground.
   */
  activeIndicatorClassName?: string;
  /** Optional styling hook for the supporting hover cue. @default "bg-[var(--fluid-tabs-hover)]" */
  hoverClassName?: string;
  /** Additional classes for the root container. */
  className?: string;
  /** Additional classes for the tab list. */
  listClassName?: string;
}

const sizeClasses = {
  sm: "min-h-8 px-2.5 text-xs",
  md: "min-h-9 px-3 text-sm",
  lg: "min-h-11 px-4 text-base",
} as const;

const tokenStyle = {
  "--fluid-tabs-surface": "var(--tabs-surface)",
  "--fluid-tabs-surface-active": "var(--tabs-indicator)",
  "--fluid-tabs-label": "var(--muted-foreground)",
  "--fluid-tabs-label-active": "var(--foreground)",
  "--fluid-tabs-hover": "color-mix(in oklab, var(--accent) 35%, transparent)",
  "--fluid-tabs-focus-ring": "var(--ring)",
  "--fluid-tabs-border": "var(--border)",
  "--fluid-tabs-capsule-border-radius": "var(--radius-lg)",
} as CSSProperties;

export default function FluidTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  variant = "capsule",
  size = "md",
  ariaLabel = "Tabs",
  activeIndicatorClassName,
  hoverClassName = "bg-[var(--fluid-tabs-hover)]",
  className,
  listClassName,
}: FluidTabsProps) {
  const layoutId = useId();
  const keyboardSelectionRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? fallbackValue,
  );
  const activeValue = value ?? internalValue;

  return (
    <Tabs.Root
      value={value}
      defaultValue={defaultValue ?? fallbackValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue !== "string") return;
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
        keyboardSelectionRef.current = false;
      }}
      className={cn("relative w-fit max-w-full overflow-x-auto", className)}
      style={tokenStyle}
    >
      <LayoutGroup id={layoutId}>
        <Tabs.List
          aria-label={ariaLabel}
          className={cn(
            "flex w-max gap-1 p-1",
            variant === "capsule" && "rounded-xl bg-(--fluid-tabs-surface)",
            listClassName,
          )}
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              aria-controls={tab.ariaControls}
              onKeyDown={() => {
                keyboardSelectionRef.current = true;
              }}
              className={(state) =>
                cn(
                  "group relative flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-medium text-(--fluid-tabs-label) transition-colors duration-150",
                  sizeClasses[size],
                  "hover:text-(--fluid-tabs-label-active) focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--fluid-tabs-focus-ring)",
                  "disabled:pointer-events-none disabled:opacity-45",
                  variant === "underline" && "rounded-none",
                  state.active && "text-(--fluid-tabs-label-active)",
                )
              }
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
                  hoverClassName,
                  variant === "underline" &&
                    "inset-x-1 top-auto h-0.5 rounded-full",
                  variant === "capsule" &&
                    "rounded-(--fluid-tabs-capsule-border-radius)",
                )}
              />
              {activeValue === tab.value && (
                <motion.span
                  aria-hidden="true"
                  layoutId={\`\${layoutId}-active\`}
                  className={cn(
                    "pointer-events-none absolute",
                    variant === "capsule" &&
                      "inset-0 rounded-lg border border-(--tabs-indicator-border)",
                    variant === "underline" &&
                      "inset-x-1 bottom-0 h-0.5 rounded-full",
                    activeIndicatorClassName ??
                      (variant === "underline"
                        ? "bg-foreground"
                        : "bg-[var(--fluid-tabs-surface-active)]"),
                  )}
                  transition={
                    shouldReduceMotion || keyboardSelectionRef.current
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 320,
                          damping: 40,
                          mass: 0.9,
                        }
                  }
                />
              )}
              <span className="relative z-1">{tab.title}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </LayoutGroup>
    </Tabs.Root>
  );
}
`,
      path: "fluid-tabs/fluid-tabs.tsx",
      target: "components/sonaui/fluid-tabs/fluid-tabs.tsx"
    }
  ],
  "dot-orbit-shader": [
    {
      type: "registry:ui",
      content: `"use client";

import { DotOrbit } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/sona-utils";

export interface DotOrbitShaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Background color. Accepts hex, RGB, or HSL strings.
   * @default "#000000"
   */
  colorBack?: string;
  /**
   * Up to 10 dot colors. Accepts hex, RGB, or HSL strings.
   * @default ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]
   */
  colors?: string[];
  /**
   * Dot radius relative to cell size (0–1).
   * @default 0.4
   */
  size?: number;
  /**
   * Random variation in dot size (0–1). 0 = uniform.
   * @default 0.3
   */
  sizeRange?: number;
  /**
   * Maximum orbit distance around each cell center (0–1).
   * @default 0.5
   */
  spreading?: number;
  /**
   * Extra color steps between base colors. 1 = N colors, 2 = 2×N, etc. (1–4).
   * @default 1
   */
  stepsPerColor?: number;
  /**
   * Animation speed multiplier. 0 = static.
   * @default 1
   */
  speed?: number;
}

export default function DotOrbitShader({
  className,
  colorBack = "#000000",
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
  size = 0.4,
  sizeRange = 0.3,
  spreading = 0.5,
  stepsPerColor = 1,
  speed = 1,
  style,
  ...props
}: DotOrbitShaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      // Background color doubles as a fallback while WebGL boots (or is unavailable).
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <DotOrbit
        colorBack={colorBack}
        colors={colors}
        size={size}
        sizeRange={sizeRange}
        spreading={spreading}
        stepsPerColor={stepsPerColor}
        speed={shouldReduceMotion ? 0 : speed}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
`,
      path: "dot-orbit-shader/dot-orbit-shader.tsx",
      target: "components/sonaui/dot-orbit-shader/dot-orbit-shader.tsx"
    }
  ],
  "accordion": [
    {
      type: "registry:file",
      content: `.wrapper {
  border-radius: 1rem;
  overflow: visible;
}

.animated {
  --_margin-gap: 1.5rem;
  --ease: linear(
    0 0%,
    0.2688 9.91%,
    0.3859 15%,
    0.4917 20.19%,
    0.5865 25.5%,
    0.6705 30.93%,
    0.7441 36.51%,
    0.8075 42.26%,
    0.8593 47.98%,
    0.9022 53.93%,
    0.9366 60.13%,
    0.963 66.67%,
    0.9812 73.4%,
    0.9929 80.76%,
    0.9986 88.89%,
    1 100%
  );
  --bounce-duration: calc((1 / var(--speed, 1)) * 1s);
  --duration: calc((0.36 / var(--speed, 1)) * 1s);

  outline: 1px solid;

  transition-property: transform, border-radius;
  transition-duration: var(--duration);
  transition-timing-function: var(--ease);
  transform-style: preserve-3d;
  perspective: 120px;
}

.animated:has(~ .animated[data-open]) {
  transform: translate3d(0, calc(var(--_margin-gap) * -1), 0);
}

.animated[data-open] ~ .animated {
  transform: translate3d(0, calc(var(--_margin-gap) * 1), 0);
}

.animated:is(:first-child) {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.animated:is(:last-child) {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.animated[data-open] {
  border-radius: 1rem;
}

.animated[data-open] + .animated {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.animated.animated:has(+ .animated[data-open]) {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
`,
      path: "accordion/styles.module.css",
      target: "components/sonaui/accordion/styles.module.css"
    },
    {
      type: "registry:ui",
      content: `"use client";

import { Accordion } from "@base-ui/react/accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, type ReactNode, useContext } from "react";

import { cn } from "@/lib/sona-utils";
import AnimatedPlusMinusButton from "./animated-plus-minus-button";
import styles from "./styles.module.css";

export type AccordionVariant = "default" | "outlined" | "splitted" | "animated";

export interface AccordionProps
  extends Omit<Accordion.Root.Props<string>, "className" | "multiple"> {
  /** The accordion items. */
  children: ReactNode;
  /** Allows multiple accordion items to be open simultaneously. @default false */
  allowMultiple?: boolean;
  /** Controlled values of the currently open items. */
  value?: string[];
  /** Values of the initially open items for uncontrolled usage. */
  defaultValue?: string[];
  /** Called when the set of open item values changes. */
  onValueChange?: Accordion.Root.Props<string>["onValueChange"];
  /** Whether the entire accordion ignores interaction. @default false */
  disabled?: boolean;
  /** Keeps closed panels mounted in the DOM. @default false */
  keepMounted?: boolean;
  /** Allows browser find-in-page to reveal matching panel content. @default false */
  hiddenUntilFound?: boolean;
  /** Additional classes for the accordion root. */
  className?: string;
  /** Visual style of the accordion. @default "default" */
  variant?: AccordionVariant;
}

const accordionWrapperVariants = cva(
  "flex w-full flex-col items-stretch overflow-clip rounded-2xl",
  {
    variants: {
      variant: {
        default: "overflow-clip rounded-2xl",
        outlined: "overflow-clip rounded-2xl",
        splitted: "overflow-clip rounded-2xl",
        animated: styles.wrapper,
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const accordionItemVariants = cva(
  "relative w-full min-w-0 overflow-hidden bg-background text-foreground transition-[transform,border-radius] duration-300",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        outlined:
          "border-foreground border-t border-x last:border-b first:rounded-t-2xl last:rounded-b-2xl",
        splitted: "rounded-2xl",
        animated: styles.animated,
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const AccordionContext = createContext<{ variant: AccordionVariant } | null>(
  null,
);

function useAccordionContext(component: string) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(\`\${component} must be used within AccordionRoot\`);
  }
  return context;
}

export function AccordionRoot({
  children,
  allowMultiple = false,
  className,
  variant = "default",
  ...props
}: AccordionProps) {
  return (
    <AccordionContext.Provider value={{ variant }}>
      <Accordion.Root
        multiple={allowMultiple}
        className={cn(
          accordionWrapperVariants({ variant }),
          variant === "splitted" && "gap-y-2",
          className,
        )}
        {...props}
      >
        {children}
      </Accordion.Root>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps
  extends Omit<Accordion.Item.Props, "className">,
    VariantProps<typeof accordionItemVariants> {
  /** Stable value used to identify the item. */
  value?: string;
  /** Additional classes for the accordion item. */
  className?: string;
}

export function AccordionItem({
  children,
  className,
  value,
  ...props
}: AccordionItemProps) {
  const { variant } = useAccordionContext("AccordionItem");

  return (
    <Accordion.Item
      value={value}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    >
      <div className="relative w-full min-w-0">{children}</div>
    </Accordion.Item>
  );
}

export interface AccordionItemHeaderProps {
  /** Header content displayed before the open-state icon. */
  children: ReactNode;
  /** Legacy item value; state is now owned by AccordionItem. */
  value?: string;
  /** Additional classes for the header layout. */
  className?: string;
}

export function AccordionItemHeader({
  children,
  className,
}: AccordionItemHeaderProps) {
  useAccordionContext("AccordionItemHeader");
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-center justify-between rounded-xl px-8 py-4 font-medium text-balance",
        className,
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <AnimatedPlusMinusButton />
    </div>
  );
}

export interface AccordionItemTriggerProps
  extends Omit<Accordion.Trigger.Props, "className"> {
  /** Trigger contents. */
  children: ReactNode;
  /** Legacy item value; state is now owned by AccordionItem. */
  value?: string;
  /** Additional classes for the trigger. */
  className?: string;
}

export function AccordionItemTrigger({
  children,
  className,
  value: _value,
  ...props
}: AccordionItemTriggerProps) {
  useAccordionContext("AccordionItemTrigger");
  return (
    <Accordion.Header className="w-full">
      <Accordion.Trigger
        className={cn(
          "group block w-full min-w-0 cursor-pointer text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          className,
        )}
        {...props}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

export interface AccordionItemContentProps
  extends Omit<Accordion.Panel.Props, "className"> {
  /** Panel contents. */
  children: ReactNode;
  /** Legacy item value; state is now owned by AccordionItem. */
  value?: string;
  /** Additional classes for the panel content. */
  className?: string;
}

export function AccordionItemContent({
  children,
  className,
  value: _value,
  ...props
}: AccordionItemContentProps) {
  useAccordionContext("AccordionItemContent");
  return (
    <Accordion.Panel
      className={cn(
        "h-[var(--accordion-panel-height)] w-full min-w-0 overflow-hidden text-sm opacity-100",
        "transition-[height,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "data-starting-style:h-0 data-ending-style:h-0",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "motion-reduce:transition-none",
      )}
      {...props}
    >
      <div className={cn("w-full min-w-0 px-8 pb-4", className)}>
        {children}
      </div>
    </Accordion.Panel>
  );
}

export { AccordionContext };
`,
      path: "accordion/accordion.tsx",
      target: "components/sonaui/accordion/accordion.tsx"
    },
    {
      type: "registry:ui",
      content: `"use client";

export interface AnimatedPlusMinusButtonProps {
  /** Icon size in pixels. @default 24 */
  size?: number;
}

export default function AnimatedPlusMinusButton({
  size = 24,
}: AnimatedPlusMinusButtonProps) {
  return (
    <span aria-hidden="true" className="flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 24 24">
        <title>Expand or collapse</title>
        <line
          x1="1"
          y1="12"
          x2="23"
          y2="12"
          stroke="currentColor"
          strokeWidth="1"
          className="origin-center transition-opacity duration-200 group-data-panel-open:opacity-0 motion-reduce:transition-none"
        />
        <line
          x1="12"
          y1="1"
          x2="12"
          y2="23"
          stroke="currentColor"
          strokeWidth="1"
          className="origin-center transition-transform duration-200 group-data-panel-open:rotate-90 motion-reduce:transition-none"
        />
      </svg>
    </span>
  );
}
`,
      path: "accordion/animated-plus-minus-button.tsx",
      target: "components/sonaui/accordion/animated-plus-minus-button.tsx"
    }
  ],
  "spinning-text": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  motion,
  type Transition,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { type CSSProperties, useMemo } from "react";

import { cn } from "@/lib/sona-utils";

type SpinningTextProps = {
  /** The text content to be animated. Can be a single string or an array of strings. */
  children: string | string[];
  /** Custom styles for the container. */
  style?: CSSProperties;
  /**
   * Duration of the spinning animation in seconds.
   * @default 10
   */
  duration?: number;
  /** Additional CSS classes for the container. */
  className?: string;
  /**
   * Reverses the spinning direction when set to \`true\`.
   * @default false
   */
  reverse?: boolean;
  /**
   * Radius of the circular path in \`ch\` units.
   * @default 5
   */
  radius?: number;
  /** Custom transition settings for the animation. Merges with the default transition. */
  transition?: Transition;
  /** Custom animation variants for the container and individual characters. */
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: "linear" as const,
};

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

export default function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  radius = 5,
  transition,
  variants,
}: SpinningTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const textContent = useMemo(
    () => (Array.isArray(children) ? children.join("") : children),
    [children],
  );

  const characters = useMemo(() => {
    const chars = textContent.split("");
    chars.push(" ");
    return chars;
  }, [textContent]);

  const finalTransition = useMemo(
    () => ({
      ...BASE_TRANSITION,
      ...transition,
      duration: (transition as { duration?: number })?.duration ?? duration,
    }),
    [transition, duration],
  );

  const containerVariants = useMemo(
    () => ({
      // Reduced motion: hold the ring static instead of spinning forever.
      visible: { rotate: shouldReduceMotion ? 0 : reverse ? -360 : 360 },
      ...variants?.container,
    }),
    [reverse, variants, shouldReduceMotion],
  );

  const itemVariants = useMemo(
    () => ({
      ...BASE_ITEM_VARIANTS,
      ...variants?.item,
    }),
    [variants],
  );

  return (
    <motion.div
      className={cn("relative", className)}
      // Give the ring an intrinsic footprint so it doesn't collapse to 0x0.
      style={{
        width: \`\${radius * 2 + 1}ch\`,
        height: \`\${radius * 2 + 1}ch\`,
        ...style,
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
    >
      {characters.map((char, index) => (
        <motion.span
          aria-hidden="true"
          // biome-ignore lint/suspicious/noArrayIndexKey: chars repeat; position is the identity
          key={\`\${index}-\${char}\`}
          variants={itemVariants}
          className="inline-block absolute left-1/2 top-1/2"
          style={
            {
              "--index": index,
              "--total": characters.length,
              "--radius": radius,
              transform: \`
              translate(-50%, -50%)
              rotate(calc(360deg / var(--total) * var(--index)))
              translateY(calc(var(--radius, 5) * -1ch))
            \`,
              transformOrigin: "center",
            } as React.CSSProperties
          }
        >
          {char}
        </motion.span>
      ))}
      <span className="sr-only">{textContent}</span>
    </motion.div>
  );
}
`,
      path: "spinning-text/spinning-text.tsx",
      target: "components/sonaui/spinning-text/spinning-text.tsx"
    }
  ],
  "sona-motion": [
    {
      type: "registry:ui",
      content: `import type { Transition } from "motion/react";

/** Shared easing curves for stateful Sona UI motion. */
export const motionEasing = {
  enter: [0.23, 1, 0.32, 1],
  exit: [0.4, 0, 1, 1],
  move: [0.65, 0, 0.35, 1],
} as const;

/** Semantic motion transitions. Choose by interaction purpose, not component. */
export const motionTransition = {
  instant: { duration: 0 },
  reduced: { duration: 0.12, ease: motionEasing.enter },
  feedback: { type: "spring", bounce: 0, duration: 0.22 },
  enter: { duration: 0.18, ease: motionEasing.enter },
  exit: { duration: 0.12, ease: motionEasing.exit },
  spatial: { type: "spring", bounce: 0, duration: 0.35 },
  expressive: { type: "spring", bounce: 0.18, duration: 0.4 },
} satisfies Record<string, Transition>;
`,
      path: "sona-motion/sona-motion.ts",
      target: "components/sonaui/sona-motion/sona-motion.ts"
    }
  ],
  "bubble-up-button": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  type MotionConfigProps,
  motion,
  useAnimation,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/sona-utils";

interface BubbleUpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to display inside the button */
  children?: ReactNode;
  /** Motion configuration for animations */
  motionControls?: MotionConfigProps;
  /** Additional CSS classes */
  className?: string;
}
export default function BubbleUpButton({
  children = "Hover me!",
  motionControls = {
    transition: { type: "spring", stiffness: 300, damping: 32 },
  },
  className = "",
  disabled = false,
  ...props
}: BubbleUpButtonProps) {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  // Tracks the latest intent so a re-enter during the exit animation
  // doesn't get clobbered by the post-exit reset.
  const hoverIntent = useRef(false);

  const fill = async () => {
    hoverIntent.current = true;
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% 100%)",
      transition: shouldReduceMotion ? { duration: 0 } : undefined,
    });
  };

  const drain = async () => {
    hoverIntent.current = false;
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% -120%)",
      transition: shouldReduceMotion ? { duration: 0 } : undefined,
    });
    if (!hoverIntent.current) {
      controls.set({ clipPath: "ellipse(0% 0% at 50% 100%)" });
    }
  };

  return (
    <button
      onMouseEnter={fill}
      onMouseLeave={drain}
      onFocus={fill}
      onBlur={drain}
      disabled={disabled}
      className={cn(
        "relative isolate flex h-fit w-fit cursor-pointer overflow-clip rounded-2xl border bg-background text-foreground px-16 py-2",
        "transition-opacity duration-200",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      <motion.div
        animate={controls}
        initial={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
        transition={motionControls.transition}
        className="absolute left-0 top-0 h-full w-full bg-foreground"
        aria-hidden="true"
      />
      <span className="relative text-white mix-blend-difference">
        {children}
      </span>
    </button>
  );
}
`,
      path: "bubble-up-button/bubble-up-button.tsx",
      target: "components/sonaui/bubble-up-button/bubble-up-button.tsx"
    }
  ],
  "fan-view": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  AnimatePresence,
  MotionConfig,
  type Transition,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface FanViewItem {
  /** Display label shown on the card. */
  label: string;
  /**
   * Width of the card pill in pixels.
   * @default 160
   */
  width?: number;
  /** Called when the item is selected. */
  onSelect?: () => void;
}

export interface FanViewProps {
  /**
   * Items displayed as fanned cards when open.
   */
  items?: FanViewItem[];
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called when the view opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Spring stiffness for the fan animation.
   * @default 540
   */
  stiffness?: number;
  /**
   * Spring damping for the fan animation.
   * @default 28
   */
  damping?: number;
  /** Additional CSS classes for the root container. */
  className?: string;
}

const DEFAULT_ITEMS: FanViewItem[] = [];

function getFanPoint(index: number, total: number) {
  const progress = total <= 1 ? 0 : index / (total - 1);
  const angle = (progress - 0.5) * 80 * (Math.PI / 180);
  const radius = 190;
  return {
    x: Math.sin(angle) * radius,
    y: -(Math.cos(angle) * radius * 0.65 + 110),
    rotate: (progress - 0.5) * 28,
    zIndex: total - index,
  };
}

export default function FanView({
  items = DEFAULT_ITEMS,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  stiffness = 540,
  damping = 28,
  className,
}: FanViewProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const springConfig: Transition = useMemo(
    () => ({ type: "spring", stiffness, damping, mass: 0.95 }),
    [stiffness, damping],
  );
  const resolvedTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : springConfig;
  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const positionedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        ...getFanPoint(index, items.length),
      })),
    [items],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, setOpen]);

  return (
    <MotionConfig transition={resolvedTransition}>
      <div
        className={cn(
          "flex min-h-[420px] w-full items-end justify-center px-4 pb-16 pt-8",
          className,
        )}
      >
        <div ref={rootRef} className="relative flex items-end justify-center">
          <AnimatePresence initial={false}>
            {isOpen &&
              positionedItems.map(
                (
                  { label, onSelect, width = 160, x, y, rotate, zIndex },
                  index,
                ) => (
                  <m.button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    className="absolute bottom-0 left-1/2 cursor-pointer -translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    style={{ width, zIndex }}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.55,
                      rotate: 0,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      x,
                      y,
                      opacity: 1,
                      scale: 1,
                      rotate,
                      filter: "blur(0px)",
                      transition: {
                        ...(shouldReduceMotion
                          ? { duration: 0 }
                          : springConfig),
                        delay: shouldReduceMotion ? 0 : index * 0.04,
                      },
                    }}
                    exit={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.45,
                      rotate: 0,
                      filter: "blur(10px)",
                      transition: shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.18,
                            ease: "easeInOut",
                            delay: (items.length - index - 1) * 0.025,
                          },
                    }}
                    whileHover={
                      shouldReduceMotion ? {} : { scale: 1.05, zIndex: 30 }
                    }
                    whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                    onClick={() => {
                      onSelect?.();
                      setOpen(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        setOpen(false);
                        triggerRef.current?.focus();
                      }
                    }}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl border px-5",
                        "border-border bg-foreground text-background shadow-sm",
                        "text-[17px] font-medium whitespace-nowrap",
                      )}
                    >
                      {label}
                    </span>
                  </m.button>
                ),
              )}
          </AnimatePresence>

          <m.button
            ref={triggerRef}
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close fan view" : "Open fan view"}
            onClick={() => setOpen(!isOpen)}
            className={cn(
              "relative z-20 flex h-16 w-16 items-center justify-center rounded-full border",
              "border-border bg-background text-foreground shadow-lg",
              "hover:border-border/80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          >
            <m.span
              className="block relative size-8"
              animate={isOpen ? "open" : "closed"}
              initial={false}
            >
              <m.span
                className="absolute left-0 top-1/2 h-1 w-full bg-foreground rounded-full -translate-y-1/2"
                variants={{ closed: { rotate: 0 }, open: { rotate: 45 } }}
              />
              <m.span
                className="absolute left-0 top-1/2 h-1 w-full bg-foreground rounded-full -translate-y-1/2"
                variants={{ closed: { rotate: 90 }, open: { rotate: -45 } }}
              />
            </m.span>
          </m.button>
        </div>
      </div>
    </MotionConfig>
  );
}
`,
      path: "fan-view/fan-view.tsx",
      target: "components/sonaui/fan-view/fan-view.tsx"
    }
  ],
  "lightbox": [
    {
      type: "registry:ui",
      content: `"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useId, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface LightboxProps {
  /** The image URL shown in both the thumbnail and expanded preview. */
  src: string;
  /** Accessible alternative text for the image. */
  alt: string;
  /** Optional caption displayed beneath the expanded image. @default undefined */
  caption?: string;
  /** Controlled open state. @default undefined */
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called whenever the expanded preview opens or closes. @default undefined */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS classes for the thumbnail trigger. @default undefined */
  className?: string;
  /** Additional CSS classes for the thumbnail image. @default undefined */
  imageClassName?: string;
  /** Additional CSS classes for the expanded image. @default undefined */
  previewClassName?: string;
  /** Additional CSS classes for the modal backdrop. @default undefined */
  backdropClassName?: string;
}

export default function Lightbox({
  src,
  alt,
  caption,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  imageClassName,
  previewClassName,
  backdropClassName,
}: LightboxProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const instanceId = useId();
  const shouldReduceMotion = useReducedMotion();
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const layoutId = shouldReduceMotion
    ? undefined
    : \`\${instanceId}-lightbox-image\`;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <LayoutGroup id={instanceId}>
      <Dialog.Root defaultOpen={defaultOpen} onOpenChange={setOpen} open={open}>
        <Dialog.Trigger
          className={cn(
            "group relative block w-full cursor-zoom-in rounded-2xl bg-muted text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/35 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
            className,
          )}
          render={
            <motion.button
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            />
          }
        >
          {/* biome-ignore lint/performance/noImgElement: a registry component must remain framework-agnostic */}
          <motion.img
            alt={alt}
            className={cn(
              "block h-full w-full rounded-2xl object-cover",
              imageClassName,
            )}
            layoutId={layoutId}
            src={src}
            transition={{ type: "spring", bounce: 0, duration: 0.38 }}
          />
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/28 via-transparent to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
          <span className="absolute right-3 bottom-3 inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-black/52 text-white opacity-0 shadow-sm backdrop-blur-md transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="m21 21-4.35-4.35M11 8v6m-3-3h6m5 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          <span className="sr-only">Open image preview: {alt}</span>
        </Dialog.Trigger>

        <AnimatePresence>
          {open ? (
            <Dialog.Portal keepMounted>
              <Dialog.Backdrop
                className={cn(
                  "fixed inset-0 z-50 bg-black/72 backdrop-blur-md",
                  backdropClassName,
                )}
                render={
                  <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.12 : 0.22 }}
                  />
                }
              />

              <Dialog.Popup
                aria-label={\`Image preview: \${alt}\`}
                className="fixed inset-0 z-50 grid cursor-zoom-out place-items-center p-5 sm:p-10"
                onClick={() => setOpen(false)}
                render={<motion.div />}
              >
                <Dialog.Close
                  aria-label="Close image preview"
                  className="absolute top-4 right-4 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-md transition-colors duration-150 ease-out hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:top-6 sm:right-6"
                  onClick={(event) => event.stopPropagation()}
                >
                  <svg
                    aria-hidden="true"
                    className="size-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 6 6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </Dialog.Close>

                <motion.figure
                  animate={{ opacity: 1 }}
                  className="m-0 flex max-h-[88svh] max-w-[90vw] cursor-default flex-col items-center gap-3"
                  exit={{ opacity: shouldReduceMotion ? 0 : 1 }}
                  initial={{ opacity: shouldReduceMotion ? 0 : 1 }}
                  onClick={(event) => event.stopPropagation()}
                  transition={{ duration: 0.12 }}
                >
                  {/* biome-ignore lint/performance/noImgElement: a registry component must remain framework-agnostic */}
                  <motion.img
                    alt={alt}
                    className={cn(
                      "block max-h-[82svh] max-w-[90vw] rounded-2xl object-contain shadow-2xl ring-1 ring-white/12 will-change-transform",
                      previewClassName,
                    )}
                    layoutId={layoutId}
                    src={src}
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: shouldReduceMotion ? 0.01 : 0.38,
                    }}
                  />
                  {caption ? (
                    <motion.figcaption
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-xl text-center text-sm leading-5 text-white/72"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 4 }
                      }
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.14,
                        duration: 0.18,
                        ease: "easeOut",
                      }}
                    >
                      {caption}
                    </motion.figcaption>
                  ) : null}
                </motion.figure>
              </Dialog.Popup>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </LayoutGroup>
  );
}
`,
      path: "lightbox/lightbox.tsx",
      target: "components/sonaui/lightbox/lightbox.tsx"
    }
  ],
  "marquee": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/sona-utils";

export interface MarqueeProps {
  /** Content of one marquee segment. Can be a single small element or a long strip. */
  children: React.ReactNode;
  className?: string;
  /** Class for the outer clipping container. */
  containerClassName?: string;
  /**
   * Scroll speed in pixels per second. Higher = faster.
   * @default 80
   */
  speed?: number;
  /**
   * Gap between repeated segments, any CSS length string.
   * @default "4rem"
   */
  gap?: string;
  /**
   * Scroll direction.
   * @default "left"
   */
  direction?: "left" | "right" | "up" | "down";
  /**
   * Multiply speed by scroll velocity (and flip direction on scroll-up).
   * @default false
   */
  scrollVelocity?: boolean;
  /**
   * Max speed multiplier when scrollVelocity is enabled.
   * @default 5
   */
  maxVelocity?: number;
  /**
   * Pause (with easing, not a snap) on hover.
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * How many segment copies to render.
   * "auto" measures the container and fills 2× it.
   * @default "auto"
   */
  repeat?: number | "auto";
}

export default function Marquee({
  children,
  className,
  containerClassName,
  speed = 80,
  gap = "4rem",
  direction = "left",
  scrollVelocity = false,
  maxVelocity = 5,
  pauseOnHover = false,
  repeat = "auto",
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);

  // How many copies are rendered (updated by ResizeObserver)
  const countRef = useRef<number>(typeof repeat === "number" ? repeat : 4);

  // Motion value for translation — never stored in React state
  const baseX = useMotionValue(0);
  const isHovered = useRef(false);
  // 0 = fully paused, 1 = full speed — lerped in rAF
  const speedMultiplier = useRef(1);

  // Scroll velocity pipeline (motion values only — no setState)
  const { scrollY } = useScroll();
  const scrollVelocityMV = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocityMV, {
    damping: 50,
    stiffness: 400,
  });

  const isVertical = direction === "up" || direction === "down";
  const directionSign = direction === "left" || direction === "up" ? 1 : -1;

  // ResizeObserver — recompute copy count when container or segment resize
  useEffect(() => {
    if (repeat !== "auto" || shouldReduceMotion) return;

    const container = containerRef.current;
    const segment = segmentRef.current;
    if (!container || !segment) return;

    function recompute() {
      if (!container || !segment) return;
      const containerSize = isVertical
        ? container.offsetHeight
        : container.offsetWidth;
      const segmentSize = isVertical
        ? segment.offsetHeight
        : segment.offsetWidth;
      if (segmentSize > 0) {
        countRef.current = Math.max(
          2,
          Math.ceil((containerSize * 2) / segmentSize) + 1,
        );
      }
    }

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    ro.observe(segment);
    return () => ro.disconnect();
  }, [repeat, isVertical, shouldReduceMotion]);

  // Hover handlers
  const onMouseEnter = () => {
    if (pauseOnHover) isHovered.current = true;
  };
  const onMouseLeave = () => {
    if (pauseOnHover) isHovered.current = false;
  };

  // Main animation loop — all in motion values, zero React state
  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;

    const segment = segmentRef.current;
    if (!segment) return;

    const segmentSize = isVertical ? segment.offsetHeight : segment.offsetWidth;
    if (segmentSize === 0) return;

    // Lerp speedMultiplier toward target (eased pause on hover)
    const targetMultiplier = isHovered.current ? 0 : 1;
    speedMultiplier.current +=
      (targetMultiplier - speedMultiplier.current) * 0.1;

    // Velocity boost from scroll
    let velocityBoost = 1;
    let velocityFlip = 1;
    if (scrollVelocity) {
      const v = smoothVelocity.get();
      velocityBoost = Math.min(Math.abs(v) / 200, maxVelocity);
      velocityBoost = Math.max(velocityBoost, 1);
      if (v < -50) velocityFlip = -1;
    }

    const pxPerMs = speed / 1000;
    const delta_px =
      pxPerMs *
      delta *
      directionSign *
      velocityFlip *
      speedMultiplier.current *
      velocityBoost;

    let next = baseX.get() - delta_px;

    // Wrap: keep translation within [-segmentSize, 0)
    if (directionSign > 0) {
      // moving left/up — translate goes negative
      if (next <= -segmentSize) next += segmentSize;
    } else {
      // moving right/down — translate goes positive
      if (next >= 0) next -= segmentSize;
      if (next < -segmentSize) next += segmentSize;
    }

    baseX.set(next);
  });

  const copies = repeat !== "auto" ? repeat : countRef.current;
  const items = Array.from({ length: copies });

  if (shouldReduceMotion) {
    // Static strip — no animation
    return (
      <section
        ref={containerRef}
        aria-label="Scrolling content"
        className={cn("overflow-hidden", containerClassName)}
      >
        <div
          className={cn(
            isVertical ? "flex flex-col" : "flex flex-row",
            "w-max",
            className,
          )}
          style={{ gap }}
        >
          <div ref={segmentRef}>{children}</div>
          {items.map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative copies
            <div key={i} aria-hidden="true">
              {children}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="Scrolling content"
      className={cn("overflow-hidden", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* The track: a flex row/col of copies, translated as a unit */}
      <MotionTrack
        baseX={baseX}
        isVertical={isVertical}
        gap={gap}
        className={className}
        segmentRef={segmentRef}
        items={items}
      >
        {children}
      </MotionTrack>
    </section>
  );
}

// Split into a separate component to isolate motion subscription
import { type MotionValue, motion } from "motion/react";

function MotionTrack({
  baseX,
  isVertical,
  gap,
  className,
  segmentRef,
  items,
  children,
}: {
  baseX: MotionValue<number>;
  isVertical: boolean;
  gap: string;
  className?: string;
  segmentRef: React.RefObject<HTMLDivElement | null>;
  items: unknown[];
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={isVertical ? { y: baseX } : { x: baseX }}
      className={cn(
        isVertical ? "flex flex-col" : "flex flex-row",
        "w-max will-change-transform",
        className,
      )}
    >
      {/* First segment — measured for loop math */}
      <div
        ref={segmentRef}
        style={{
          paddingRight: isVertical ? 0 : gap,
          paddingBottom: isVertical ? gap : 0,
        }}
      >
        {children}
      </div>
      {/* Copies — decorative, aria-hidden */}
      {items.map((_, i) => (
        <div
          key={String(i)}
          aria-hidden="true"
          style={{
            paddingRight: isVertical ? 0 : gap,
            paddingBottom: isVertical ? gap : 0,
          }}
        >
          {children}
        </div>
      ))}
    </motion.div>
  );
}
`,
      path: "marquee/marquee.tsx",
      target: "components/sonaui/marquee/marquee.tsx"
    }
  ],
  "ripple-button": [
    {
      type: "registry:ui",
      content: `"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useCallback, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The content to be displayed inside the button. */
  children: ReactNode;
  /**
   * The scale amount for the ripple effect.
   * @default 25
   */
  scaleAmount?: number;
  /** Additional CSS classes for the button. */
  className?: string;
  /**
   * Duration of the ripple animation in seconds.
   * @default 0.5
   */
  duration?: number;
  /** Additional CSS classes for the ripple effect. */
  rippleStyle?: string;
}

interface RippleProps {
  x: number;
  y: number;
  key: number;
}

const RIPPLE_SIZE = 10;

export default function RippleButton({
  children,
  className,
  scaleAmount = 25,
  duration = 0.5,
  rippleStyle,
  disabled,
  onPointerEnter,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...props
}: RippleButtonProps) {
  const [ripple, setRipple] = useState<RippleProps | null>(null);
  const [isHover, setIsHover] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rippleKey = useRef(0);

  const showRipple = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      rippleKey.current += 1;
      setRipple({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        key: rippleKey.current,
      });
      setIsHover(true);
    },
    [],
  );

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-full border border-border bg-background px-4 py-2 leading-[16px] transition-[transform,background-color,border-color] duration-200 ease-out hover:cursor-pointer active:scale-[0.97] motion-reduce:active:scale-100",
        className,
      )}
      disabled={disabled}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (disabled) return;
        // Touch pointers fire enter on tap — let pointerdown handle those.
        if (e.pointerType === "mouse") showRipple(e);
      }}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        if (disabled) return;
        if (e.pointerType !== "mouse") showRipple(e);
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e);
        if (e.pointerType !== "mouse") setIsHover(false);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setIsHover(false);
      }}
      onPointerCancel={(e) => {
        onPointerCancel?.(e);
        setIsHover(false);
      }}
      {...props}
    >
      {ripple && (
        <motion.span
          key={ripple.key}
          className={cn(
            "pointer-events-none absolute rounded-full bg-foreground",
            rippleStyle,
          )}
          style={{
            left: ripple.x - RIPPLE_SIZE / 2,
            top: ripple.y - RIPPLE_SIZE / 2,
            width: RIPPLE_SIZE,
            height: RIPPLE_SIZE,
          }}
          initial={{ scale: 0 }}
          animate={isHover ? { scale: scaleAmount } : { scale: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: isHover ? duration : 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }
          }
        />
      )}
      {children}
    </button>
  );
}

export interface RippleButtonTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
}

export function RippleButtonText({ text, className }: RippleButtonTextProps) {
  return (
    <span
      className={cn(
        "text-background dark:text-foreground mix-blend-difference",
        className,
      )}
    >
      {text}
    </span>
  );
}
`,
      path: "ripple-button/ripple-button.tsx",
      target: "components/sonaui/ripple-button/ripple-button.tsx"
    }
  ],
  "spotlight-card": [
    {
      type: "registry:ui",
      content: `"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/sona-utils";

export interface SpotlightCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The content rendered inside the card. */
  children: ReactNode;
  /** Additional CSS classes for the card. */
  className?: string;
  /**
   * The color of the spotlight glow. Accepts any CSS color value.
   * @default "rgba(255,255,255,0.15)"
   */
  spotlightColor?: string;
  /**
   * The radius of the spotlight in pixels.
   * @default 350
   */
  spotlightSize?: number;
  /**
   * Disables the spotlight effect.
   * @default false
   */
  disabled?: boolean;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255,255,255,0.15)",
  spotlightSize = 350,
  disabled = false,
  onMouseMove,
  ...props
}: SpotlightCardProps) {
  // Start off-canvas so the first hover doesn't flash the glow at (0,0).
  const mouseX = useMotionValue(-spotlightSize);
  const mouseY = useMotionValue(-spotlightSize);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const background = useMotionTemplate\`radial-gradient(\${spotlightSize}px circle at \${mouseX}px \${mouseY}px, \${spotlightColor}, transparent 80%)\`;

  return (
    <article
      onMouseMove={(event) => {
        handleMouseMove(event);
        onMouseMove?.(event as React.MouseEvent<HTMLDivElement>);
      }}
      className={cn(
        "group border-border bg-secondary relative overflow-hidden rounded-xl border p-8",
        className,
      )}
      {...props}
    >
      {!disabled && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-200 ease-out transition-opacity pointer-events-none"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </article>
  );
}
`,
      path: "spotlight-card/spotlight-card.tsx",
      target: "components/sonaui/spotlight-card/spotlight-card.tsx"
    }
  ],
  "section-rail": [
    {
      type: "registry:ui",
      content: `"use client";

import { AnimatePresence, animate, motion, useMotionValue } from "motion/react";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface SectionRailThumbnail {
  /** Image source for the context card. */
  src: string;
  /** Alternative text. The card is supplementary, so this may be decorative. */
  alt: string;
}

export interface SectionRailItem {
  /** Unique key. In scroll mode this must match the target element's DOM id. */
  id: string;
  /** Short destination name. This is the accessible name of the item. */
  label: string;
  /** Optional one-to-two-line summary shown in the fine-pointer context card. */
  description?: string;
  /** Optional image shown in the fine-pointer context card. */
  thumbnail?: SectionRailThumbnail;
  /** Renders the item as present but non-navigable. */
  disabled?: boolean;
}

export interface SectionRailProps {
  /** The sections represented by the rail, in document order. */
  items: SectionRailItem[];
  /**
   * \`"scroll"\` resolves the active item from the page; \`"controlled"\` leaves it
   * to \`activeId\` / \`onActiveChange\`.
   * @default "scroll"
   */
  mode?: "scroll" | "controlled";
  /** Active item id for controlled usage. @default undefined */
  activeId?: string;
  /** Initial active item id for uncontrolled usage. @default undefined */
  defaultActiveId?: string;
  /** Called whenever the active item changes. @default undefined */
  onActiveChange?: (id: string) => void;
  /**
   * When labels sit next to the rail on fine pointers. Defaults to \`"hidden"\`
   * because the context card already names the section, so an inline label
   * would only appear underneath it. Coarse pointers, which never get a card,
   * always show labels.
   * @default "hidden"
   */
  showLabels?: "hidden" | "always" | "active" | "hover";
  /**
   * How the active item is marked. \`"progress"\` fills the active line from the
   * section's own scroll position.
   * @default "progress"
   */
  activeIndicator?: "dot" | "fill" | "progress";
  /** Direction the rail runs in. @default "vertical" */
  orientation?: "vertical" | "horizontal";
  /** Which edge the rail is anchored to, which flips label and card placement. @default "right" */
  side?: "left" | "right";
  /** Pixels of fixed-header compensation used when scrolling to a section. @default 96 */
  scrollOffset?: number;
  /** Resolves a section element when ids are not real DOM ids. @default undefined */
  getSectionElement?: (id: string) => HTMLElement | null;
  /**
   * Scrolling element the sections live in. Defaults to the page itself.
   * @default undefined
   */
  scrollRoot?: React.RefObject<HTMLElement | null>;
  /**
   * When the context card appears. Cards never appear on coarse pointers.
   * @default "hover-and-focus"
   */
  showPreview?: "never" | "hover" | "focus" | "hover-and-focus";
  /** Accessible name for the rail's landmark. @default "Section navigation" */
  ariaLabel?: string;
  /** Additional classes for the rail root. @default undefined */
  className?: string;
  /** Additional classes for each rail line. @default undefined */
  lineClassName?: string;
  /** Additional classes for the item labels. @default undefined */
  labelClassName?: string;
  /** Additional classes for the context card surface. @default undefined */
  previewClassName?: string;
}

const tokenStyle = {
  "--section-rail-track":
    "color-mix(in oklab, var(--foreground) 22%, transparent)",
  "--section-rail-active": "var(--foreground)",
  "--section-rail-hover":
    "color-mix(in oklab, var(--foreground) 55%, transparent)",
  "--section-rail-label": "var(--muted-foreground)",
  "--section-rail-focus-ring": "var(--ring)",
  "--section-rail-progress": "var(--primary)",
  "--section-rail-preview-surface":
    "color-mix(in oklab, var(--popover) 78%, transparent)",
  "--section-rail-preview-border":
    "color-mix(in oklab, var(--foreground) 10%, transparent)",
  "--section-rail-preview-shadow":
    "0 12px 32px -12px color-mix(in oklab, var(--foreground) 30%, transparent)",
  "--section-rail-preview-thumbnail":
    "color-mix(in oklab, var(--foreground) 6%, transparent)",
} as CSSProperties;

/**
 * The active line is the longest line the rail can ever draw, so it doubles as
 * the rail's fixed track width. Every line is drawn inside a slot of exactly
 * this size, which keeps the rail's footprint constant: growing a line on hover
 * never reflows the page, and labels and context cards always anchor to the
 * same edge instead of sliding with whichever line happens to be widest.
 */
const LINE_TRACK = 30;
const LINE_REST = 18;
/** Capped so an emphasised inactive line (18 + 10) stays under the track. */
const LINE_EMPHASIS = 10;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export default function SectionRail({
  items,
  mode = "scroll",
  activeId,
  defaultActiveId,
  onActiveChange,
  showLabels = "hidden",
  activeIndicator = "progress",
  orientation = "vertical",
  side = "right",
  scrollOffset = 96,
  getSectionElement,
  scrollRoot,
  showPreview = "hover-and-focus",
  ariaLabel = "Section navigation",
  className,
  lineClassName,
  labelClassName,
  previewClassName,
}: SectionRailProps) {
  const descriptionIdPrefix = useId();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isVertical = orientation === "vertical";

  const [internalActiveId, setInternalActiveId] = useState(
    () => defaultActiveId ?? items[0]?.id,
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const resolvedActiveId = activeId ?? internalActiveId;
  const activeIndex = items.findIndex((item) => item.id === resolvedActiveId);
  // One shared value for the whole rail: only the active line reads it, so
  // scrolling never re-renders React or animates every item.
  const progress = useMotionValue(0);

  // Latest-value refs so the observer below depends only on things that
  // genuinely change what it watches. Callers routinely pass inline \`items\`
  // arrays and inline handlers; without this the observer would be torn down
  // and rebuilt on every render — and again on every active change — which
  // makes the active item flicker mid-scroll and the dot's travel erratic.
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const getSectionElementRef = useRef(getSectionElement);
  getSectionElementRef.current = getSectionElement;
  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;
  const isControlledRef = useRef(activeId !== undefined);
  isControlledRef.current = activeId !== undefined;
  const activeIdRef = useRef(resolvedActiveId);
  activeIdRef.current = resolvedActiveId;

  const itemsKey = items.map((item) => item.id).join(" ");

  const resolveElement = useCallback(
    (id: string) =>
      getSectionElementRef.current
        ? getSectionElementRef.current(id)
        : document.getElementById(id),
    [],
  );

  const commitActive = useCallback((id: string) => {
    if (!isControlledRef.current) setInternalActiveId(id);
    onActiveChangeRef.current?.(id);
  }, []);

  // The dot is one element for the whole rail, positioned from the active
  // item's measured slot. A per-item dot matched with \`layoutId\` had to hand
  // off between mounting and unmounting nodes on every active change, so its
  // travel time depended on how much else re-rendered that frame; this is a
  // single value animating to a measured target, which is always the same.
  const listRef = useRef<HTMLOListElement>(null);
  const dotSlots = useRef(new Map<string, HTMLElement>());
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const dotPlaced = useRef(false);
  const dotAnimations = useRef<ReturnType<typeof animate>[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (activeIndicator !== "dot") return;

    const list = listRef.current;
    const slot = dotSlots.current.get(resolvedActiveId ?? "");
    if (!list || !slot) return;

    const place = (animated: boolean) => {
      const listRect = list.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const targetX = slotRect.left - listRect.left;
      const targetY = slotRect.top - listRect.top;

      for (const animation of dotAnimations.current) animation.stop();
      dotAnimations.current = [];

      // The first placement and any resize are corrections, not transitions.
      if (!animated || !dotPlaced.current || reducedMotion) {
        dotPlaced.current = true;
        dotX.set(targetX);
        dotY.set(targetY);
        return;
      }

      // A fixed duration, not a spring. A spring's settle time grows with the
      // distance it has to cover, so the dot visibly dragged when a fast scroll
      // skipped several sections at once and snapped when it moved one. The
      // travel should read the same no matter how far the active item jumped.
      const options = {
        duration: 0.26,
        ease: [0.22, 1, 0.36, 1],
      } as const;
      dotAnimations.current = [
        animate(dotX, targetX, options),
        animate(dotY, targetY, options),
      ];
    };

    place(true);

    const resizeObserver = new ResizeObserver(() => place(false));
    resizeObserver.observe(list);

    return () => {
      resizeObserver.disconnect();
      for (const animation of dotAnimations.current) animation.stop();
      dotAnimations.current = [];
    };
  }, [activeIndicator, resolvedActiveId, reducedMotion, dotX, dotY, itemsKey]);

  // Active section resolution. IntersectionObserver decides *which* section is
  // current; a rAF-throttled scroll read decides how far through it we are.
  // \`items\` is read through a ref so inline arrays don't rebuild the observer;
  // \`itemsKey\` is what actually signals the observed set of sections changed.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional, see above
  useEffect(() => {
    const items = itemsRef.current;
    if (mode !== "scroll" || items.length === 0) return;

    const elements = items
      .map((item) => ({ id: item.id, element: resolveElement(item.id) }))
      .filter(
        (entry): entry is { id: string; element: HTMLElement } =>
          entry.element !== null,
      );
    if (elements.length === 0) return;

    const root = scrollRoot?.current ?? null;
    const visible = new Set<string>();
    let currentId = activeIdRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id =
            entry.target.id ||
            elements.find((e) => e.element === entry.target)?.id;
          if (!id) continue;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }

        const next = items.find((item) => visible.has(item.id))?.id;
        if (next && next !== currentId) {
          currentId = next;
          commitActive(next);
        }
      },
      { root, rootMargin: \`-\${scrollOffset}px 0px -55% 0px\`, threshold: 0 },
    );

    for (const { element } of elements) observer.observe(element);

    const readMetrics = () => {
      if (root) {
        return {
          scrollTop: root.scrollTop,
          maxScroll: Math.max(root.scrollHeight - root.clientHeight, 0),
          viewportTop: root.getBoundingClientRect().top,
        };
      }
      const doc = document.documentElement;
      return {
        scrollTop: window.scrollY,
        maxScroll: Math.max(doc.scrollHeight - window.innerHeight, 0),
        viewportTop: 0,
      };
    };

    let frame = 0;
    const readProgress = () => {
      frame = 0;
      const { scrollTop, maxScroll, viewportTop } = readMetrics();

      // The bottom of the page is a hard stop: the last section can never
      // scroll its own end past the offset line, so without this its fill
      // would top out short of 100%. Treat reaching the end as arriving.
      const atEnd = scrollTop >= maxScroll - 1;
      if (atEnd) {
        const last = elements[elements.length - 1]?.id;
        if (last && last !== currentId) {
          currentId = last;
          commitActive(last);
        }
      }

      const element = resolveElement(currentId ?? "");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const sectionTop = rect.top - viewportTop + scrollTop;
      const start = sectionTop - scrollOffset;
      // Clamp the end of the section's travel to the furthest the scroller can
      // actually go, so every section — including the last — completes.
      const end = Math.min(start + rect.height, maxScroll);
      const span = end - start;

      progress.set(span <= 0 ? 1 : clamp((scrollTop - start) / span, 0, 1));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(readProgress);
    };

    const scroller: HTMLElement | Window = root ?? window;
    readProgress();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [
    scrollRoot,
    commitActive,
    itemsKey,
    mode,
    progress,
    resolveElement,
    scrollOffset,
  ]);

  // In controlled mode there is no scroll position to read, so the active line
  // is simply full.
  useEffect(() => {
    if (mode === "controlled") progress.set(1);
  }, [mode, progress]);

  const navigate = (
    event: React.MouseEvent<HTMLElement>,
    item: SectionRailItem,
  ) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    commitActive(item.id);
    if (mode !== "scroll") return;

    const element = resolveElement(item.id);
    if (!element) return;

    event.preventDefault();
    // \`detail === 0\` means the click came from Enter/Space, which must land
    // instantly rather than animating.
    const keyboardActivated = event.detail === 0;
    const behavior = keyboardActivated || reducedMotion ? "auto" : "smooth";
    const root = scrollRoot?.current ?? null;

    if (root) {
      const top =
        root.scrollTop +
        (element.getBoundingClientRect().top -
          root.getBoundingClientRect().top) -
        scrollOffset;
      root.scrollTo({ top, behavior });
    } else {
      const top =
        element.getBoundingClientRect().top + window.scrollY - scrollOffset;
      window.scrollTo({ top, behavior });
    }

    // Only own the page URL when the rail actually navigates the page.
    if (element.id && !root) {
      window.history.replaceState(null, "", \`#\${element.id}\`);
    }
    element.setAttribute("tabindex", "-1");
    element.focus({ preventScroll: true });
  };

  const previewOnHover =
    showPreview === "hover" || showPreview === "hover-and-focus";
  const previewOnFocus =
    showPreview === "focus" || showPreview === "hover-and-focus";

  return (
    <nav
      aria-label={ariaLabel}
      data-orientation={orientation}
      data-side={side}
      className={cn(
        "group/section-rail relative",
        isVertical ? "w-fit" : "h-fit",
        className,
      )}
      style={tokenStyle}
      onPointerLeave={() => setHoveredId(null)}
    >
      <ol
        ref={listRef}
        className={cn(
          "relative flex list-none",
          isVertical
            ? cn("flex-col", side === "right" ? "items-end" : "items-start")
            : "flex-row items-end",
        )}
      >
        {activeIndicator === "dot" && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-10 size-1.5 rounded-full bg-(--section-rail-progress)"
            style={{ x: dotX, y: dotY }}
          />
        )}
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = hoveredId === item.id;
          const isFocused = focusedId === item.id;
          const distance =
            hoveredId === null
              ? Number.POSITIVE_INFINITY
              : Math.abs(index - items.findIndex((i) => i.id === hoveredId));

          const previewVisible =
            !coarsePointer &&
            showPreview !== "never" &&
            Boolean(item.description || item.thumbnail) &&
            ((previewOnHover && isHovered) || (previewOnFocus && isFocused));

          // A visible card already names the section, so the inline label steps
          // aside rather than rendering behind it. Focus still reveals the
          // label whenever no card is showing.
          const labelVisible =
            coarsePointer ||
            showLabels === "always" ||
            (showLabels === "active" && isActive) ||
            ((showLabels === "hover" || isFocused) &&
              (isHovered || isFocused) &&
              !previewVisible);

          // Neighbours of the hovered item grow a little too, so the rail is
          // easier to aim at without any of them becoming a separate target.
          const emphasis =
            distance === 0
              ? 1
              : distance === 1
                ? 0.45
                : distance === 2
                  ? 0.15
                  : 0;
          const lineLength = isActive
            ? LINE_TRACK
            : LINE_REST + emphasis * LINE_EMPHASIS;

          const descriptionId = item.description
            ? \`\${descriptionIdPrefix}-\${item.id}\`
            : undefined;

          const content = (
            <>
              {/* Fixed-size slot. The line animates inside it, so the rail
                  never changes width and nothing around it reflows. */}
              <span
                aria-hidden="true"
                className="relative block shrink-0"
                style={
                  isVertical
                    ? { width: LINE_TRACK, height: 2 }
                    : { height: LINE_TRACK, width: 2 }
                }
              >
                <motion.span
                  className={cn(
                    "absolute overflow-hidden rounded-full",
                    isVertical
                      ? cn("inset-y-0", side === "right" ? "end-0" : "start-0")
                      : "inset-x-0 bottom-0",
                    item.disabled && "opacity-40",
                    lineClassName,
                  )}
                  initial={false}
                  animate={{
                    [isVertical ? "width" : "height"]: lineLength,
                    backgroundColor: isActive
                      ? activeIndicator === "progress"
                        ? "var(--section-rail-track)"
                        : "var(--section-rail-active)"
                      : distance <= 1
                        ? "var(--section-rail-hover)"
                        : "var(--section-rail-track)",
                  }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 520,
                          damping: 42,
                          mass: 0.7,
                        }
                  }
                  style={
                    isVertical ? { width: lineLength } : { height: lineLength }
                  }
                >
                  {isActive && activeIndicator === "progress" && (
                    <motion.span
                      className={cn(
                        "absolute inset-0 rounded-full bg-(--section-rail-progress)",
                        // Fill grows away from the edge the rail is anchored
                        // to, so it always reads as advancing outward-in.
                        isVertical
                          ? side === "right"
                            ? "origin-right"
                            : "origin-left"
                          : "origin-top",
                      )}
                      style={
                        isVertical ? { scaleX: progress } : { scaleY: progress }
                      }
                    />
                  )}
                </motion.span>
              </span>

              {/* Reserved for every item, not just the active one, so the
                  item's width — and with it the label and card anchor —
                  doesn't change as the dot moves down the rail. The single
                  rail dot is measured against these slots. */}
              {activeIndicator === "dot" && (
                <span
                  ref={(node) => {
                    if (node) dotSlots.current.set(item.id, node);
                    else dotSlots.current.delete(item.id);
                  }}
                  aria-hidden="true"
                  className="block size-1.5 shrink-0"
                />
              )}

              <motion.span
                className={cn(
                  "whitespace-nowrap font-medium text-(--section-rail-label) text-xs",
                  isActive && "text-(--section-rail-active)",
                  coarsePointer
                    ? "static"
                    : cn(
                        "pointer-events-none absolute",
                        isVertical
                          ? side === "right"
                            ? "end-full me-3"
                            : "start-full ms-3"
                          : "bottom-full mb-3",
                      ),
                  labelClassName,
                )}
                initial={false}
                animate={{
                  opacity: labelVisible ? 1 : 0,
                  filter: labelVisible ? "blur(0px)" : "blur(3px)",
                  [isVertical ? "x" : "y"]: labelVisible
                    ? 0
                    : isVertical
                      ? side === "right"
                        ? 6
                        : -6
                      : 6,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                }
              >
                {item.label}
              </motion.span>

              {descriptionId && (
                <span id={descriptionId} className="sr-only">
                  {item.description}
                </span>
              )}
            </>
          );

          const interactiveProps = {
            "aria-current": isActive
              ? ((mode === "scroll" ? "location" : "true") as
                  | "location"
                  | "true")
              : undefined,
            "aria-describedby": descriptionId,
            "aria-disabled": item.disabled || undefined,
            "data-active": isActive || undefined,
            className: cn(
              // The visible line is 2px; the hit area is not.
              "relative flex cursor-pointer items-center gap-2 rounded-sm outline-none",
              "focus-visible:ring-2 focus-visible:ring-(--section-rail-focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isVertical ? "px-2 py-1.5" : "flex-col px-1.5 py-2",
              // The line always sits flush against the edge the rail is
              // anchored to; the dot slot tucks in behind it. Reversing for
              // \`side="right"\` is what keeps every line right-aligned instead
              // of the dot slot pushing them inward.
              side === "right" && isVertical && "flex-row-reverse",
              item.disabled && "cursor-not-allowed",
            ),
            onClick: (event: React.MouseEvent<HTMLElement>) =>
              navigate(event, item),
            onPointerEnter: () => setHoveredId(item.id),
            onFocus: () => setFocusedId(item.id),
            onBlur: () =>
              setFocusedId((current) => (current === item.id ? null : current)),
          };

          return (
            <li key={item.id} className="relative flex">
              {mode === "scroll" ? (
                <a href={\`#\${item.id}\`} {...interactiveProps}>
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  disabled={item.disabled}
                  {...interactiveProps}
                >
                  {content}
                </button>
              )}

              <AnimatePresence>
                {previewVisible && (
                  <SectionRailPreview
                    item={item}
                    isVertical={isVertical}
                    side={side}
                    reducedMotion={reducedMotion}
                    className={previewClassName}
                  />
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function SectionRailPreview({
  item,
  isVertical,
  side,
  reducedMotion,
  className,
}: {
  item: SectionRailItem;
  isVertical: boolean;
  side: "left" | "right";
  reducedMotion: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Collision handling: flip across the anchor if the preferred side has no
  // room, then slide along the rail axis so the card stays fully on screen.
  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const margin = 12;
    const rect = node.getBoundingClientRect();

    if (!flipped) {
      const overflowsStart = rect.left < margin;
      const overflowsEnd = rect.right > window.innerWidth - margin;
      if (isVertical && (overflowsStart || overflowsEnd)) {
        setFlipped(true);
        return;
      }
      if (!isVertical && rect.top < margin) {
        setFlipped(true);
        return;
      }
    }

    if (isVertical) {
      if (rect.top < margin) setShift(margin - rect.top);
      else if (rect.bottom > window.innerHeight - margin)
        setShift(window.innerHeight - margin - rect.bottom);
    } else if (rect.left < margin) {
      setShift(margin - rect.left);
    } else if (rect.right > window.innerWidth - margin) {
      setShift(window.innerWidth - margin - rect.right);
    }
  }, [flipped, isVertical]);

  const inlineSide = side === "right" ? !flipped : flipped;
  const placement = isVertical
    ? inlineSide
      ? "end-full me-4 top-1/2 -translate-y-1/2"
      : "start-full ms-4 top-1/2 -translate-y-1/2"
    : flipped
      ? "top-full mt-4 start-1/2 -translate-x-1/2"
      : "bottom-full mb-4 start-1/2 -translate-x-1/2";

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.96, filter: "blur(8px)" }
      }
      animate={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.98, filter: "blur(6px)" }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
      }
      style={{
        [isVertical ? "marginTop" : "marginLeft"]: shift,
        transformOrigin: isVertical
          ? inlineSide
            ? "right center"
            : "left center"
          : flipped
            ? "center top"
            : "center bottom",
      }}
      className={cn(
        "pointer-events-none absolute z-50 w-60 rounded-xl border p-3 backdrop-blur-xl",
        "border-(--section-rail-preview-border) bg-(--section-rail-preview-surface) shadow-(--section-rail-preview-shadow)",
        placement,
        className,
      )}
    >
      {item.thumbnail && (
        <div className="mb-2.5 aspect-video w-full overflow-hidden rounded-lg bg-(--section-rail-preview-thumbnail)">
          {/* biome-ignore lint/performance/noImgElement: registry components stay framework-agnostic */}
          <img
            src={item.thumbnail.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
      )}
      <p className="font-medium text-foreground text-sm">{item.label}</p>
      {item.description && (
        <p className="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
          {item.description}
        </p>
      )}
    </motion.div>
  );
}
`,
      path: "section-rail/section-rail.tsx",
      target: "components/sonaui/section-rail/section-rail.tsx"
    }
  ],
  "animated-dialog": [
    {
      type: "registry:ui",
      content: `"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext, useState } from "react";
import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

// ─── Context ─────────────────────────────────────────────────────────────────

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      "AnimatedDialog subcomponents must be used within <AnimatedDialog>",
    );
  }
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedDialogProps {
  children: ReactNode;
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Whether the dialog traps interaction inside the modal. @default true */
  modal?: boolean;
}

export interface AnimatedDialogContentProps {
  children: ReactNode;
  /**
   * Direction the dialog slides in from.
   * @default "bottom"
   */
  from?: "top" | "bottom" | "left" | "right" | "center";
  /**
   * Direction the dialog slides out to. Defaults to reversing the entrance.
   */
  exitTo?: "top" | "bottom" | "left" | "right" | "center";
  className?: string;
  /**
   * Class name for the backdrop overlay.
   */
  backdropClassName?: string;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function AnimatedDialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  modal = true,
}: AnimatedDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <Dialog.Root
        open={open}
        defaultOpen={defaultOpen}
        modal={modal}
        onOpenChange={setOpen}
      >
        {children}
      </Dialog.Root>
    </DialogContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

export function AnimatedDialogTrigger({
  children,
  className,
  ...props
}: Dialog.Trigger.Props) {
  return (
    <Dialog.Trigger
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2",
        "bg-foreground text-background text-sm font-medium",
        "hover:bg-foreground/90 transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </Dialog.Trigger>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

const motionVariants = {
  initial: (from: string) => {
    switch (from) {
      case "top":
        return { y: -24, opacity: 0, scale: 0.97 };
      case "bottom":
        return { y: 24, opacity: 0, scale: 0.97 };
      case "left":
        return { x: -24, opacity: 0, scale: 0.97 };
      case "right":
        return { x: 24, opacity: 0, scale: 0.97 };
      default:
        return { scale: 0.95, opacity: 0 };
    }
  },
  animate: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (exitTo: string) => {
    switch (exitTo) {
      case "top":
        return { y: -20, opacity: 0, scale: 0.97 };
      case "bottom":
        return { y: 20, opacity: 0, scale: 0.97 };
      case "left":
        return { x: -20, opacity: 0, scale: 0.97 };
      case "right":
        return { x: 20, opacity: 0, scale: 0.97 };
      default:
        return { scale: 0.95, opacity: 0 };
    }
  },
};

export function AnimatedDialogContent({
  children,
  from = "bottom",
  exitTo,
  className,
  backdropClassName,
}: AnimatedDialogContentProps) {
  const { open } = useDialogContext();
  const shouldReduceMotion = useReducedMotion();
  const resolvedExitTo = exitTo ?? from;

  return (
    <Dialog.Portal>
      <AnimatePresence custom={resolvedExitTo}>
        {open && (
          <>
            {/* Backdrop Overlay */}
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? motionTransition.reduced
                      : motionTransition.enter
                  }
                  className={cn(
                    "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
                    backdropClassName,
                  )}
                />
              }
            />

            {/* Positioner centering the popup */}
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
              <Dialog.Popup
                className="pointer-events-auto"
                render={
                  <motion.div
                    custom={from}
                    variants={shouldReduceMotion ? {} : motionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={
                      shouldReduceMotion
                        ? motionTransition.reduced
                        : motionTransition.enter
                    }
                    className={cn(
                      "w-full max-w-md overflow-hidden rounded-2xl p-6",
                      "bg-popover text-popover-foreground shadow-2xl",
                      "border border-border/80",
                      className,
                    )}
                  >
                    {children}
                  </motion.div>
                }
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </Dialog.Portal>
  );
}

// ─── Title ────────────────────────────────────────────────────────────────────

export function AnimatedDialogTitle({
  className,
  ...props
}: Dialog.Title.Props) {
  return (
    <Dialog.Title
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

// ─── Description ──────────────────────────────────────────────────────────────

export function AnimatedDialogDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      className={cn("mt-1.5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// ─── Close ────────────────────────────────────────────────────────────────────

export function AnimatedDialogClose({
  className,
  ...props
}: Dialog.Close.Props) {
  return (
    <Dialog.Close
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2",
        "bg-secondary text-secondary-foreground text-sm font-medium",
        "hover:bg-muted transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}
`,
      path: "animated-dialog/animated-dialog.tsx",
      target: "components/sonaui/animated-dialog/animated-dialog.tsx"
    }
  ],
  "split-text": [
    {
      type: "registry:ui",
      content: `"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { type ReactNode, useRef } from "react";

import { cn } from "@/lib/sona-utils";

gsap.registerPlugin(useGSAP, GSAPSplitText, ScrollTrigger);

type SplitUnit = "chars" | "words" | "lines";

export interface SplitTextProps {
  /** A single text element (e.g. a heading or paragraph) to split and animate. */
  children: ReactNode;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /**
   * Which unit the text is split into and animated.
   * @default "words"
   */
  variant?: SplitUnit;
  /**
   * Mask each split piece (clip it) so it reveals from behind an edge instead
   * of animating in fully visible. Masks by the same unit set in \`variant\`.
   * @default true
   */
  mask?: boolean;
  /**
   * GSAP tween vars merged over the defaults, e.g. \`{ duration: 1.2 }\`.
   * @default { yPercent: 120, rotate: 5, stagger: 0.2, duration: 0.4 }
   */
  animationProps?: gsap.TweenVars;
  /**
   * Play the animation when the element scrolls into view instead of on mount.
   * @default false
   */
  scrollTrigger?: boolean;
  /**
   * ScrollTrigger start position (only used when \`scrollTrigger\` is true).
   * @default "top 85%"
   */
  start?: string;
  /**
   * Re-split on resize so line breaks stay correct. Note: this replays the
   * animation on every resize, so it suits looping reveals more than one-shot
   * entrances. Font-load correctness is handled automatically either way.
   * @default false
   */
  autoSplit?: boolean;
  /**
   * Show ScrollTrigger debug markers.
   * @default false
   */
  markers?: boolean;
}

export default function SplitText({
  children,
  className,
  variant = "words",
  mask = true,
  animationProps = {},
  scrollTrigger = false,
  start = "top 85%",
  autoSplit = false,
  markers = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultAnimationProps: gsap.TweenVars = {
    yPercent: 120,
    rotate: 5,
    stagger: 0.2,
    duration: 0.4,
  };

  const mergedAnimationProps = { ...defaultAnimationProps, ...animationProps };

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      // Reveal the wrapper (it starts hidden to avoid a flash of unsplit text).
      gsap.set(containerEl, { opacity: 1 });

      // Reduced motion: show the final text, skip the animation entirely.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const targetEl = containerEl.firstElementChild as HTMLElement | null;
      if (!targetEl) {
        console.warn(
          "[SplitText] Expected a single wrapping element as children (e.g. an <h2>), but found none. Nothing will animate.",
        );
      }
      if (!targetEl) return;

      let split: GSAPSplitText | undefined;

      // Build the split + animation. Kept in a closure so it can run after fonts
      // load, and re-run per re-split when \`autoSplit\` is on.
      const build = () => {
        split = GSAPSplitText.create(targetEl, {
          type: variant,
          mask: mask ? variant : undefined,
          autoSplit,
          // Create the tween inside onSplit and return it so GSAP re-runs it on
          // every re-split (font swap / resize when autoSplit is enabled).
          onSplit: (self) => {
            const tl = gsap.timeline(
              scrollTrigger
                ? { scrollTrigger: { trigger: containerEl, start, markers } }
                : {},
            );
            tl.from(self[variant], mergedAnimationProps);
            return tl;
          },
        });
      };

      // Wait for web fonts before splitting so \`lines\` and masks measure against
      // the real font metrics, not the fallback. Resolves immediately if loaded.
      let cancelled = false;
      const fonts = typeof document !== "undefined" ? document.fonts : null;
      if (fonts && fonts.status !== "loaded") {
        fonts.ready.then(() => {
          if (!cancelled) build();
        });
      } else {
        build();
      }

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    {
      dependencies: [{ ...mergedAnimationProps }, variant, mask, scrollTrigger],
      scope: containerRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
`,
      path: "split-text/split-text.tsx",
      target: "components/sonaui/split-text/split-text.tsx"
    }
  ],
  "animated-tabs": [
    {
      type: "registry:ui",
      content: `"use client";

import { Tabs } from "@base-ui/react/tabs";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useId, useState } from "react";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export interface AnimatedTabItem {
  /** Stable value used to identify the tab. */
  value: string;
  /** Content displayed inside the tab trigger. */
  title: ReactNode;
  /** Whether the tab is unavailable. @default false */
  disabled?: boolean;
  /** ID of the external tab panel controlled by this tab. */
  ariaControls?: string;
}

export interface AnimatedTabsProps {
  /** Tabs displayed in the horizontal tab list. */
  tabs: AnimatedTabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initially active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Accessible label for the tab list. @default "Tabs" */
  ariaLabel?: string;
  /** Background class for the shared active indicator. @default "bg-accent" */
  indicatorClassName?: string;
  /** Background class for the active tab. @default "bg-muted" */
  activeTabClassName?: string;
  /** Additional classes for the root container. */
  className?: string;
  /** Additional classes for the tab list. */
  listClassName?: string;
}

export default function AnimatedTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "Tabs",
  indicatorClassName = "bg-accent",
  activeTabClassName = "bg-muted",
  className,
  listClassName,
}: AnimatedTabsProps) {
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;
  const [activeValue, setActiveValue] = useState(
    value ?? defaultValue ?? fallbackValue,
  );
  const layoutId = useId();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (value !== undefined) setActiveValue(value);
  }, [value]);

  return (
    <Tabs.Root
      value={value}
      defaultValue={defaultValue ?? fallbackValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue !== "string") return;
        setActiveValue(nextValue);
        onValueChange?.(nextValue);
      }}
      className={cn("relative w-fit overflow-x-auto border-b p-2", className)}
    >
      <LayoutGroup id={layoutId}>
        <Tabs.List
          aria-label={ariaLabel}
          className={cn("flex gap-2", listClassName)}
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              aria-controls={tab.ariaControls}
              className={(state) =>
                cn(
                  "relative flex cursor-pointer items-center rounded-xl p-2",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:pointer-events-none disabled:opacity-50",
                  state.active && activeTabClassName,
                )
              }
            >
              {activeValue === tab.value && (
                <motion.span
                  aria-hidden="true"
                  layoutId={\`\${layoutId}-active\`}
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-xl",
                    indicatorClassName,
                  )}
                  transition={
                    shouldReduceMotion
                      ? motionTransition.reduced
                      : motionTransition.spatial
                  }
                />
              )}
              <span className="relative">{tab.title}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </LayoutGroup>
    </Tabs.Root>
  );
}
`,
      path: "animated-tabs/animated-tabs.tsx",
      target: "components/sonaui/animated-tabs/animated-tabs.tsx"
    }
  ],
  "button": [
    {
      type: "registry:ui",
      content: `"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "motion/react";
import { forwardRef } from "react";
import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium select-none outline-none transition-colors hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        outlined:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof motion.button>,
    VariantProps<typeof buttonVariants> {
  /** Content rendered inside the button. */
  children: React.ReactNode;
  /**
   * Visual style of the button.
   * @default "default"
   */
  variant?: "default" | "outlined" | "secondary";
  /**
   * Controls the button height, padding, and text size.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        whileTap={disabled || shouldReduceMotion ? undefined : { scale: 0.97 }}
        whileHover={
          disabled || shouldReduceMotion ? undefined : { scale: 1.02 }
        }
        transition={
          shouldReduceMotion
            ? motionTransition.reduced
            : motionTransition.spatial
        }
        className={cn(buttonVariants({ variant, size }), "w-fit", className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
`,
      path: "button/button.tsx",
      target: "components/sonaui/button/button.tsx"
    }
  ],
  "fluid-slider": [
    {
      type: "registry:ui",
      content: `"use client";

import { Slider } from "@base-ui/react/slider";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface FluidSliderProps {
  /** Visible label associated with the slider. */
  label: ReactNode;
  /** Controlled slider value. @default undefined */
  value?: number;
  /** Initial value for uncontrolled usage. @default 50 */
  defaultValue?: number;
  /** Called continuously while the value changes. @default undefined */
  onValueChange?: (
    value: number,
    details: Slider.Root.ChangeEventDetails,
  ) => void;
  /** Called when a pointer or keyboard interaction commits. @default undefined */
  onValueCommitted?: (
    value: number,
    details: Slider.Root.CommitEventDetails,
  ) => void;
  /** Minimum allowed value. @default 0 */
  min?: number;
  /** Maximum allowed value. @default 100 */
  max?: number;
  /** Smallest value increment. @default 1 */
  step?: number;
  /** Increment used by Page Up, Page Down, and modified arrow keys. @default 10 */
  largeStep?: number;
  /** Numeric positions rendered as quiet reference marks. @default [] */
  marks?: number[];
  /** Formats the visible and accessible value text. @default undefined */
  formatValue?: (value: number) => string;
  /** Intl options used when no custom formatter is supplied. @default undefined */
  format?: Intl.NumberFormatOptions;
  /** Locale used by the default number formatter. @default undefined */
  locale?: Intl.LocalesArgument;
  /** Whether the trailing formatted value is visible. @default true */
  showValue?: boolean;
  /** Whether the active boundary grip is visible. @default true */
  showHandle?: boolean;
  /** Whether the slider ignores user interaction. @default false */
  disabled?: boolean;
  /** Name submitted with the slider's hidden range input. @default undefined */
  name?: string;
  /** ID of the form that owns the slider input. @default undefined */
  form?: string;
  /** Accessible name used instead of the visible label. @default undefined */
  ariaLabel?: string;
  /** Additional classes for the slider root. @default undefined */
  className?: string;
  /** Additional classes for the track surface. @default undefined */
  trackClassName?: string;
  /** Additional classes for the filled surface. @default undefined */
  surfaceClassName?: string;
  /** Additional classes for the fixed label. @default undefined */
  labelClassName?: string;
  /** Additional classes for the trailing value. @default undefined */
  valueClassName?: string;
  /** Additional classes for the boundary grip. @default undefined */
  handleClassName?: string;
}

const tokenStyle = {
  "--fluid-slider-track": "var(--background)",
  "--fluid-slider-surface":
    "color-mix(in oklab, var(--primary) 16%, var(--background))",
  "--fluid-slider-surface-active":
    "color-mix(in oklab, var(--primary) 22%, var(--background))",
  "--fluid-slider-handle": "var(--primary)",
  "--fluid-slider-label": "var(--foreground)",
  "--fluid-slider-value": "var(--muted-foreground)",
  "--fluid-slider-mark":
    "color-mix(in oklab, var(--foreground) 32%, transparent)",
  "--fluid-slider-focus-ring": "var(--ring)",
  "--fluid-slider-disabled-opacity": "0.48",
  "--fluid-slider-border-radius": "var(--radius)",
} as CSSProperties;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

export default function FluidSlider({
  label,
  value,
  defaultValue = 50,
  onValueChange,
  onValueCommitted,
  min = 0,
  max = 100,
  step = 1,
  largeStep = 10,
  marks = [],
  formatValue,
  format,
  locale,
  showValue = true,
  showHandle = true,
  disabled = false,
  name,
  form,
  ariaLabel,
  className,
  trackClassName,
  surfaceClassName,
  labelClassName,
  valueClassName,
  handleClassName,
}: FluidSliderProps) {
  const labelId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [internalValue, setInternalValue] = useState(() =>
    clamp(defaultValue, min, max),
  );
  const currentValue = clamp(value ?? internalValue, min, max);
  const range = max - min;
  const progress = range === 0 ? 0 : ((currentValue - min) / range) * 100;
  const controlRef = useRef<HTMLDivElement>(null);
  const pointerActiveRef = useRef(false);
  const trackPressRef = useRef(false);
  const dragMovedRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const fillAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const grabOffsetRef = useRef(0);
  const pointerVelocityRef = useRef(0);
  const previousPointerRef = useRef({ x: 0, time: 0 });
  const settleAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const progressMotion = useMotionValue(progress / 100);
  const overshoot = useMotionValue(0);
  const trackWidth = useMotionValue(1);
  const direction = useMotionValue(1);
  const press = useMotionValue(0);
  const pressAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const target = progress / 100;
    fillAnimationRef.current?.stop();

    // A tap on the inactive track (pointer pressed but not yet dragged) should
    // glide the fill to the new value. Dragging tracks 1:1 and keyboard/external
    // changes stay instant, per the interaction spec.
    const isTap = pointerActiveRef.current && !dragMovedRef.current;
    if (isTap && !shouldReduceMotion) {
      fillAnimationRef.current = animate(progressMotion, target, {
        type: "spring",
        stiffness: 420,
        damping: 40,
        mass: 0.9,
      });
    } else {
      progressMotion.set(target);
    }
  }, [progress, progressMotion, shouldReduceMotion]);

  useEffect(() => {
    const control = controlRef.current;
    if (!control) return;

    const updateWidth = () =>
      trackWidth.set(control.getBoundingClientRect().width);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(control);
    return () => resizeObserver.disconnect();
  }, [trackWidth]);

  useEffect(
    () => () => {
      settleAnimationRef.current?.stop();
      pressAnimationRef.current?.stop();
      fillAnimationRef.current?.stop();
    },
    [],
  );

  // The filled fraction (0–1), including any damped overshoot past the bounds.
  // Clip-path, not scaleX, sizes the fill so its border-radius stays a true,
  // undistorted match for the track corners at every value.
  const fillFraction = useTransform(() => {
    const width = Math.max(trackWidth.get(), 1);
    const directionalOvershoot = (overshoot.get() / width) * direction.get();
    return clamp(progressMotion.get() + directionalOvershoot, 0, 1);
  });
  const surfaceClipPath = useTransform(() => {
    const inset = (1 - fillFraction.get()) * 100;
    const isRtl = direction.get() === -1;
    const insetEnd = isRtl ? 0 : inset;
    const insetStart = isRtl ? inset : 0;
    return \`inset(0px \${insetEnd}% 0px \${insetStart}% round var(--fluid-slider-border-radius))\`;
  });

  // Immediate-response squash: the active surface compresses slightly while
  // pressed and eases back on release. Presentation only — never the value.
  const surfaceScaleY = useTransform(press, [0, 1], [1, 0.98]);

  const animatePress = (target: number) => {
    pressAnimationRef.current?.stop();
    if (shouldReduceMotion) {
      press.set(target);
      return;
    }
    pressAnimationRef.current = animate(press, target, {
      type: "spring",
      stiffness: 640,
      damping: 34,
      mass: 0.6,
    });
  };

  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, format),
    [format, locale],
  );
  const formattedValue = formatValue
    ? formatValue(currentValue)
    : formatter.format(currentValue);
  const visibleMarks = marks.filter((mark) => mark >= min && mark <= max);

  const settleOvershoot = () => {
    pointerActiveRef.current = false;
    trackPressRef.current = false;
    controlRef.current?.removeAttribute("data-pressed");
    animatePress(0);
    if (overshoot.get() === 0) return;

    settleAnimationRef.current?.stop();
    if (shouldReduceMotion) {
      overshoot.set(0);
      return;
    }

    settleAnimationRef.current = animate(overshoot, 0, {
      type: "spring",
      stiffness: 520,
      damping: 42,
      mass: 0.65,
      velocity: pointerVelocityRef.current,
    });
  };

  // Base UI's own track-press handler can't resolve the thumb when it is
  // rendered through motion (getFingerState returns null), so a bare-track tap
  // never sets the value. Since Slider.Root is fully controlled by this
  // component, we drive Base UI's hidden range input directly: it fires the
  // real onValueChange with proper event details, which flows through the
  // Slider.Root handler below.
  const applyValueFromClientX = (clientX: number) => {
    const control = controlRef.current;
    if (!control) return;

    const rect = control.getBoundingClientRect();
    if (rect.width === 0) return;

    const isRtl = getComputedStyle(control).direction === "rtl";
    let ratio = (clientX - rect.left) / rect.width;
    if (isRtl) ratio = 1 - ratio;
    ratio = clamp(ratio, 0, 1);

    const raw = min + ratio * range;
    const stepped = clamp(
      Math.round((raw - min) / step) * step + min,
      min,
      max,
    );

    const input = control.querySelector<HTMLInputElement>(
      'input[type="range"]',
    );
    if (!input || Number(input.value) === stepped) return;

    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set;
    nativeSetter?.call(input, String(stepped));
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (disabled || event.button !== 0) return;

    settleAnimationRef.current?.stop();
    pointerActiveRef.current = true;
    dragMovedRef.current = false;
    pointerStartXRef.current = event.clientX;
    controlRef.current?.setAttribute("data-pressed", "");
    animatePress(1);
    pointerVelocityRef.current = 0;
    previousPointerRef.current = { x: event.clientX, time: event.timeStamp };

    const control = controlRef.current;
    if (control) {
      const rect = control.getBoundingClientRect();
      trackWidth.set(rect.width);
      direction.set(getComputedStyle(control).direction === "rtl" ? -1 : 1);
    }

    const target = event.target as HTMLElement;
    const pressedHandle = target.closest<HTMLElement>(
      "[data-fluid-slider-hit]",
    );
    const thumb = target.closest<HTMLElement>("[data-fluid-slider-thumb]");

    if (pressedHandle && thumb) {
      trackPressRef.current = false;
      const thumbRect = thumb.getBoundingClientRect();
      grabOffsetRef.current =
        event.clientX - (thumbRect.left + thumbRect.width / 2);
    } else {
      // A surface press is a positional command, not a drag gesture. Move the
      // value to that point immediately; continuous adjustment begins only
      // from the boundary indicator.
      trackPressRef.current = true;
      grabOffsetRef.current = 0;
      overshoot.set(0);
      applyValueFromClientX(event.clientX);
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!pointerActiveRef.current || disabled) return;

    // Once handle movement passes the threshold, stop any pending tap glide so
    // the boundary remains locked 1:1 to the pointer.
    if (
      !dragMovedRef.current &&
      Math.abs(event.clientX - pointerStartXRef.current) > 8
    ) {
      dragMovedRef.current = true;
      fillAnimationRef.current?.stop();
    }

    // Surface presses set one value on pointer-down. Only the indicator is a
    // continuous drag target.
    if (trackPressRef.current) return;

    const previous = previousPointerRef.current;
    const elapsed = Math.max(event.timeStamp - previous.time, 1);
    pointerVelocityRef.current =
      ((event.clientX - previous.x) / elapsed) * 1000;
    previousPointerRef.current = { x: event.clientX, time: event.timeStamp };

    if (shouldReduceMotion) {
      overshoot.set(0);
      return;
    }

    const control = controlRef.current;
    if (!control) return;

    const rect = control.getBoundingClientRect();
    const presentedBoundary = event.clientX - grabOffsetRef.current;
    const rawOvershoot =
      presentedBoundary < rect.left
        ? presentedBoundary - rect.left
        : presentedBoundary > rect.right
          ? presentedBoundary - rect.right
          : 0;

    overshoot.set(rubberband(rawOvershoot, rect.width));
  };

  useEffect(() => {
    const control = controlRef.current;
    if (!control) return;

    control.addEventListener("pointerdown", handlePointerDown);
    control.addEventListener("pointermove", handlePointerMove);
    control.addEventListener("pointerup", settleOvershoot);
    control.addEventListener("pointercancel", settleOvershoot);
    control.addEventListener("lostpointercapture", settleOvershoot);

    return () => {
      control.removeEventListener("pointerdown", handlePointerDown);
      control.removeEventListener("pointermove", handlePointerMove);
      control.removeEventListener("pointerup", settleOvershoot);
      control.removeEventListener("pointercancel", settleOvershoot);
      control.removeEventListener("lostpointercapture", settleOvershoot);
    };
  });

  const fluidStyle = {
    ...tokenStyle,
    "--fluid-slider-progress": progress,
  } as CSSProperties;

  return (
    <Slider.Root
      aria-labelledby={ariaLabel ? undefined : labelId}
      value={currentValue}
      min={min}
      max={max}
      step={step}
      largeStep={largeStep}
      format={format}
      locale={locale}
      disabled={disabled}
      name={name}
      form={form}
      onValueChange={(nextValue, details) => {
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue, details);
      }}
      onValueCommitted={onValueCommitted}
      className={cn(
        "group/fluid-slider w-full max-w-xl select-none rounded-xl",
        disabled &&
          "pointer-events-none opacity-(--fluid-slider-disabled-opacity)",
        className,
      )}
      style={fluidStyle}
    >
      <Slider.Control
        ref={controlRef}
        data-fluid-slider-control=""
        className={cn(
          "group/fluid-slider-control relative h-16 w-full cursor-pointer rounded-2xl outline-none touch-pan-y",
          "has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-(--fluid-slider-focus-ring) has-[input:focus-visible]:ring-offset-2 has-[input:focus-visible]:ring-offset-background _overflow-clip rounded-(--fluid-slider-border-radius)",
          trackClassName,
        )}
      >
        <Slider.Track className="relative h-full w-full [container-type:inline-size]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-(--fluid-slider-border-radius) bg-(--fluid-slider-track) shadow-[inset_0_1px_0_color-mix(in_oklab,var(--foreground)_4%,transparent)]"
          />

          <Slider.Indicator
            render={
              <motion.div
                style={{ clipPath: surfaceClipPath, scaleY: surfaceScaleY }}
              />
            }
            className={cn(
              "w-full! pointer-events-none absolute inset-0 origin-left rounded-(--fluid-slider-border-radius) bg-(--fluid-slider-surface) shadow-[inset_0_1px_0_color-mix(in_oklab,var(--background)_55%,transparent),0_1px_2px_color-mix(in_oklab,var(--foreground)_5%,transparent)] transition-[filter,background-color] duration-150 rtl:origin-right",
              surfaceClassName,
            )}
            style={{ insetInlineStart: 0, insetInlineEnd: 0 }}
          />

          {visibleMarks.map((mark) => {
            const markProgress = range === 0 ? 0 : ((mark - min) / range) * 100;
            return (
              <span
                key={mark}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 z-5 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--fluid-slider-mark) rtl:translate-x-1/2"
                style={{ insetInlineStart: \`\${markProgress}%\` }}
              />
            );
          })}

          <Slider.Label
            className={cn(
              "pointer-events-none absolute inset-y-0 start-5 z-10 flex items-center truncate pe-24 font-medium text-(--fluid-slider-label) text-sm",
              labelClassName,
            )}
          >
            <span id={labelId}>{label}</span>
          </Slider.Label>

          {showValue && (
            <Slider.Value
              className={cn(
                "pointer-events-none absolute inset-y-0 end-5 z-10 flex items-center font-medium text-(--fluid-slider-value) text-sm tabular-nums",
                valueClassName,
              )}
            >
              {() => formattedValue}
            </Slider.Value>
          )}

          <Slider.Thumb
            render={<motion.div style={{ x: overshoot }} />}
            data-fluid-slider-thumb=""
            aria-label={ariaLabel}
            aria-valuetext={formattedValue}
            className="absolute z-20 h-full w-0 outline-none"
          >
            <span
              data-fluid-slider-hit=""
              aria-hidden="true"
              className="absolute inset-y-0 z-20 w-11 -translate-x-1/2 cursor-grab active:cursor-grabbing rtl:translate-x-1/2"
              style={{
                insetInlineStart: "50%",
              }}
            />
            {showHandle && (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute top-1/2 start-1/2 h-7 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--fluid-slider-handle) opacity-90 shadow-[0_0_0_1px_color-mix(in_oklab,var(--background)_30%,transparent)] transition-[height,opacity] duration-150 group-data-[pressed]/fluid-slider-control:h-8 group-data-[pressed]/fluid-slider-control:opacity-100 rtl:translate-x-1/2",
                  handleClassName,
                )}
              />
            )}
          </Slider.Thumb>
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
`,
      path: "fluid-slider/fluid-slider.tsx",
      target: "components/sonaui/fluid-slider/fluid-slider.tsx"
    }
  ],
  "animated-switch": [
    {
      type: "registry:ui",
      content: `"use client";

import { Switch } from "@base-ui/react/switch";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export interface AnimatedSwitchProps
  extends Omit<
    Switch.Root.Props,
    "checked" | "defaultChecked" | "onCheckedChange" | "className"
  > {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage. @default false */
  defaultChecked?: boolean;
  /** Callback fired when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled. @default false */
  disabled?: boolean;
  /** The size of the switch. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Additional classes for the switch track. */
  className?: string;
}

const sizeClasses = {
  sm: { track: "h-5 w-9 p-0.5", thumb: "h-4 w-4", xTranslate: 16 },
  md: { track: "h-6 w-11 p-0.5", thumb: "h-5 w-5", xTranslate: 20 },
  lg: { track: "h-8 w-14 p-0.5", thumb: "h-7 w-7", xTranslate: 24 },
};

export default function AnimatedSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  className,
  onPointerDownCapture,
  onPointerUpCapture,
  onPointerCancelCapture,
  onLostPointerCapture,
  ...props
}: AnimatedSwitchProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isPressing, setIsPressing] = useState(false);
  const [visualChecked, setVisualChecked] = useState(defaultChecked);
  const sizes = sizeClasses[size];
  const resolvedChecked = checked ?? visualChecked;
  const accessibleLabel =
    props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Toggle");

  return (
    <Switch.Root
      {...props}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      aria-label={accessibleLabel}
      onCheckedChange={(nextChecked) => {
        setVisualChecked(nextChecked);
        onCheckedChange?.(nextChecked);
      }}
      onPointerDownCapture={(event) => {
        onPointerDownCapture?.(event);
        if (event.button !== 0 || disabled) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsPressing(true);
      }}
      onPointerUpCapture={(event) => {
        onPointerUpCapture?.(event);
        setIsPressing(false);
      }}
      onPointerCancelCapture={(event) => {
        onPointerCancelCapture?.(event);
        setIsPressing(false);
      }}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event);
        setIsPressing(false);
      }}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent",
        "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes.track,
        "data-[checked]:bg-foreground data-[unchecked]:bg-foreground/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <Switch.Thumb
        className={cn(
          "block rounded-full bg-background shadow-lg ring-0",
          sizes.thumb,
        )}
        render={
          <motion.span
            style={{
              transformOrigin: resolvedChecked ? "right center" : "left center",
            }}
            animate={{
              x: resolvedChecked ? sizes.xTranslate : 0,
              scaleX: isPressing && !shouldReduceMotion ? 1.18 : 1,
              scaleY: isPressing && !shouldReduceMotion ? 0.92 : 1,
            }}
            transition={
              shouldReduceMotion
                ? motionTransition.instant
                : motionTransition.feedback
            }
          />
        }
      />
    </Switch.Root>
  );
}
`,
      path: "animated-switch/animated-switch.tsx",
      target: "components/sonaui/animated-switch/animated-switch.tsx"
    }
  ],
  "activity-graph": [
    {
      type: "registry:ui",
      content: `"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { motion, useReducedMotion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  forwardRef,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface ActivityGraphDatum {
  /** Calendar date represented by this record. */
  date: Date | string;
  /** Non-negative activity recorded for the date. */
  value: number;
  /** Optional accessible label for the record. */
  label?: string;
  /** Optional domain data retained for selection callbacks. */
  metadata?: unknown;
}

export interface ActivityGraphValueContext {
  /** Calendar date represented by the active cell. */
  date: Date;
  /** Combined activity record for the active date, when one exists. */
  item: ActivityGraphDatum | undefined;
  /** Combined numeric value for the active date. */
  value: number;
  /** Normalized visual intensity from zero to the configured level count. */
  level: number;
}

export interface ActivityGraphProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children" | "defaultValue"> {
  /** Dated activity records displayed in the graph. */
  data: ActivityGraphDatum[];
  /**
   * Inclusive first date displayed by the graph.
   * @default 364 days before endDate
   */
  startDate?: Date | string;
  /**
   * Inclusive last date displayed by the graph.
   * @default latest data date or today
   */
  endDate?: Date | string;
  /**
   * Number of non-empty color intensity levels.
   * @default 4
   */
  levels?: number;
  /**
   * Maximum number of calendar days rendered.
   * @default 366
   */
  maxDays?: number;
  /**
   * First day of each visual week: Sunday, Monday, or Saturday.
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 6;
  /**
   * Controlled selected date.
   * @default undefined
   */
  value?: Date | string | null;
  /**
   * Initially selected date for uncontrolled usage.
   * @default undefined
   */
  defaultValue?: Date | string | null;
  /**
   * Called when a date is selected.
   * @default undefined
   */
  onValueChange?: (date: Date, item: ActivityGraphDatum | undefined) => void;
  /**
   * Called when a selected date is activated with pointer or keyboard.
   * @default undefined
   */
  onCellSelect?: (item: ActivityGraphDatum | undefined, date: Date) => void;
  /**
   * Custom content shown for the currently explored date.
   * @default undefined
   */
  renderValue?: (context: ActivityGraphValueContext) => ReactNode;
  /**
   * Shows the active date and value above the graph.
   * @default true
   */
  showValue?: boolean;
  /**
   * Shows an anchored tooltip when a date cell is hovered or focused.
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Delay before the first tooltip opens, in milliseconds.
   * @default 400
   */
  tooltipDelay?: number;
  /**
   * Custom content rendered inside the optional cell tooltip.
   * @default undefined
   */
  renderTooltip?: (context: ActivityGraphValueContext) => ReactNode;
  /**
   * Custom colors for non-empty intensity levels, ordered from low to high.
   * @default undefined
   */
  colors?: string[];
  /**
   * Custom color for dates without activity.
   * @default undefined
   */
  emptyColor?: string;
  /**
   * Shows month labels above the graph.
   * @default true
   */
  showMonthLabels?: boolean;
  /**
   * Shows abbreviated weekday labels beside the graph.
   * @default true
   */
  showWeekdayLabels?: boolean;
  /**
   * Shows the intensity legend below the graph.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Accessible description for a date without activity.
   * @default "No activity"
   */
  emptyLabel?: string;
  /**
   * Accessible name for the interactive graph.
   * @default "Activity graph"
   */
  ariaLabel?: string;
  /**
   * Additional classes for the scrollable graph region.
   * @default undefined
   */
  gridClassName?: string;
  /**
   * Additional classes applied to every date cell.
   * @default undefined
   */
  cellClassName?: string;
  /**
   * Additional classes for the optional tooltip surface.
   * @default undefined
   */
  tooltipClassName?: string;
  /**
   * Additional classes for the intensity legend.
   * @default undefined
   */
  legendClassName?: string;
}

interface NormalizedCell {
  date: Date;
  key: string;
  item: ActivityGraphDatum | undefined;
  value: number;
  level: number;
}

type TooltipDirection = "up" | "right" | "down" | "left" | "none";

const DAY_MS = 86_400_000;
const DEFAULT_MAX_DAYS = 366;
const levelClasses = [
  "bg-[var(--activity-graph-level-1)]",
  "bg-[var(--activity-graph-level-2)]",
  "bg-[var(--activity-graph-level-3)]",
  "bg-[var(--activity-graph-level-4)]",
  "bg-[var(--activity-graph-level-5)]",
  "bg-[var(--activity-graph-level-6)]",
] as const;

const tokenStyle = {
  "--activity-graph-empty":
    "color-mix(in oklab, var(--muted) 76%, var(--background))",
  "--activity-graph-level-1":
    "color-mix(in oklab, var(--primary) 24%, var(--background))",
  "--activity-graph-level-2":
    "color-mix(in oklab, var(--primary) 42%, var(--background))",
  "--activity-graph-level-3":
    "color-mix(in oklab, var(--primary) 62%, var(--background))",
  "--activity-graph-level-4":
    "color-mix(in oklab, var(--primary) 82%, var(--background))",
  "--activity-graph-level-5":
    "color-mix(in oklab, var(--primary) 91%, var(--background))",
  "--activity-graph-level-6": "var(--primary)",
  "--activity-graph-focus-ring": "var(--ring)",
  "--activity-graph-label": "var(--foreground)",
  "--activity-graph-muted-label": "var(--muted-foreground)",
  "--activity-graph-tooltip-surface":
    "color-mix(in oklab, var(--popover) 94%, transparent)",
  "--activity-graph-tooltip-foreground": "var(--popover-foreground)",
  "--activity-graph-cell-size": "0.75rem",
  "--activity-graph-cell-gap": "0.25rem",
  "--activity-graph-cell-radius": "0.1875rem",
} as CSSProperties;
const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
});
const weekdayFormatter = new Intl.DateTimeFormat("en", {
  weekday: "narrow",
  timeZone: "UTC",
});

function toUtcDate(value: Date | string): Date | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;

    return new Date(
      Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()),
    );
  }

  const calendarDate = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (calendarDate) {
    const year = Number(calendarDate[1]);
    const month = Number(calendarDate[2]) - 1;
    const day = Number(calendarDate[3]);
    const date = new Date(Date.UTC(year, month, day));

    return date.getUTCFullYear() === year &&
      date.getUTCMonth() === month &&
      date.getUTCDate() === day
      ? date
      : null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Date(
    Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()),
  );
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, amount: number) {
  return new Date(date.getTime() + amount * DAY_MS);
}

function startOfWeek(date: Date, weekStartsOn: 0 | 1 | 6) {
  const offset = (date.getUTCDay() - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

function endOfWeek(date: Date, weekStartsOn: 0 | 1 | 6) {
  return addDays(startOfWeek(date, weekStartsOn), 6);
}

function clampDate(date: Date, start: Date, end: Date) {
  if (date < start) return start;
  if (date > end) return end;
  return date;
}

function getWeekdayLabels(
  weekStartsOn: 0 | 1 | 6,
  formatter: Intl.DateTimeFormat,
) {
  const sunday = new Date(Date.UTC(2026, 0, 4));
  return Array.from({ length: 7 }, (_, index) => {
    const day = (weekStartsOn + index) % 7;
    return {
      key: \`weekday-\${day}\`,
      day,
      label: formatter.format(addDays(sunday, day)),
    };
  });
}

const ActivityGraph = forwardRef<HTMLDivElement, ActivityGraphProps>(
  function ActivityGraph(
    {
      data,
      startDate,
      endDate,
      levels = 4,
      maxDays = DEFAULT_MAX_DAYS,
      weekStartsOn = 0,
      value,
      defaultValue,
      onValueChange,
      onCellSelect,
      renderValue,
      showValue = true,
      showTooltip = false,
      tooltipDelay = 400,
      renderTooltip,
      colors,
      emptyColor,
      showMonthLabels = true,
      showWeekdayLabels = true,
      showLegend = true,
      emptyLabel = "No activity",
      ariaLabel = "Activity graph",
      className,
      style,
      gridClassName,
      cellClassName,
      tooltipClassName,
      legendClassName,
      ...rootProps
    },
    forwardedRef,
  ) {
    const layoutId = useId();
    const shouldReduceMotion = useReducedMotion();
    const safeLevels = Number.isFinite(levels)
      ? Math.min(6, Math.max(1, Math.round(levels)))
      : 4;
    const safeMaxDays = Number.isFinite(maxDays)
      ? Math.max(1, Math.round(maxDays))
      : DEFAULT_MAX_DAYS;
    const tooltipHandle = useMemo(
      () => Tooltip.createHandle<ActivityGraphValueContext>(),
      [],
    );
    const resolvedTokenStyle = useMemo(() => {
      const style = {
        ...tokenStyle,
      } as CSSProperties & Record<\`--activity-graph-\${string}\`, string>;

      colors?.slice(0, 6).forEach((color, index) => {
        style[\`--activity-graph-level-\${index + 1}\`] = color;
      });
      if (emptyColor) style["--activity-graph-empty"] = emptyColor;

      return style;
    }, [colors, emptyColor]);

    const model = useMemo(() => {
      const records = new Map<string, ActivityGraphDatum>();

      for (const datum of data) {
        const date = toUtcDate(datum.date);
        if (!date) continue;
        const key = dateKey(date);
        const previous = records.get(key);
        const nextValue =
          Math.max(0, Number.isFinite(datum.value) ? datum.value : 0) +
          (previous?.value ?? 0);

        records.set(key, {
          ...datum,
          date,
          value: nextValue,
          label: previous ? undefined : datum.label,
          metadata: datum.metadata ?? previous?.metadata,
        });
      }

      const dataDates = [...records.keys()].sort();
      const latestDataDate = dataDates.at(-1);
      const fallbackEnd =
        (latestDataDate ? toUtcDate(latestDataDate) : null) ??
        toUtcDate(new Date()) ??
        new Date(0);
      const requestedEnd = endDate ? toUtcDate(endDate) : null;
      const resolvedEnd = requestedEnd ?? fallbackEnd;
      const requestedStart = startDate ? toUtcDate(startDate) : null;
      const resolvedStart = requestedStart ?? addDays(resolvedEnd, -364);
      const orderedStart =
        resolvedStart <= resolvedEnd ? resolvedStart : resolvedEnd;
      const rangeEnd =
        resolvedStart <= resolvedEnd ? resolvedEnd : resolvedStart;
      const rangeStart = new Date(
        Math.max(
          orderedStart.getTime(),
          addDays(rangeEnd, -(safeMaxDays - 1)).getTime(),
        ),
      );
      const gridStart = startOfWeek(rangeStart, weekStartsOn);
      const gridEnd = endOfWeek(rangeEnd, weekStartsOn);

      const nonZeroValues = [...records.entries()]
        .filter(
          ([key]) => key >= dateKey(rangeStart) && key <= dateKey(rangeEnd),
        )
        .map(([, item]) => item.value)
        .filter((itemValue) => itemValue > 0)
        .sort((a, b) => a - b);
      const levelByValue = new Map<number, number>();

      nonZeroValues.forEach((itemValue, index) => {
        if (levelByValue.has(itemValue)) return;
        levelByValue.set(
          itemValue,
          Math.max(
            1,
            Math.min(
              safeLevels,
              Math.ceil(((index + 1) / nonZeroValues.length) * safeLevels),
            ),
          ),
        );
      });

      const getLevel = (itemValue: number) => {
        if (itemValue <= 0) return 0;
        return levelByValue.get(itemValue) ?? 1;
      };

      const cells: NormalizedCell[] = [];
      for (
        let current = gridStart;
        current <= gridEnd;
        current = addDays(current, 1)
      ) {
        const key = dateKey(current);
        const item = records.get(key);
        const inRange = current >= rangeStart && current <= rangeEnd;
        const itemValue = inRange ? (item?.value ?? 0) : 0;

        cells.push({
          date: current,
          key,
          item: inRange ? item : undefined,
          value: itemValue,
          level: getLevel(itemValue),
        });
      }

      const weeks = Array.from(
        { length: Math.ceil(cells.length / 7) },
        (_, index) => cells.slice(index * 7, index * 7 + 7),
      );

      const monthMap = new Map<number, string>([
        [0, monthFormatter.format(rangeStart)],
      ]);
      for (const [weekIndex, week] of weeks.entries()) {
        const firstOfMonth = week.find(
          (cell) =>
            cell.date.getUTCDate() === 1 &&
            cell.date >= rangeStart &&
            cell.date <= rangeEnd,
        );
        if (firstOfMonth) {
          monthMap.set(weekIndex, monthFormatter.format(firstOfMonth.date));
        }
      }
      const monthCandidates = [...monthMap].map(([weekIndex, label]) => ({
        label,
        weekIndex,
      }));
      const months = monthCandidates.filter((month, index) => {
        const nextMonth = monthCandidates[index + 1];
        return !nextMonth || nextMonth.weekIndex - month.weekIndex >= 2;
      });

      const rangeStartIndex = cells.findIndex(
        (cell) => cell.key === dateKey(rangeStart),
      );
      const rangeEndIndex = cells.findIndex(
        (cell) => cell.key === dateKey(rangeEnd),
      );

      return {
        cells,
        weeks,
        months,
        rangeStart,
        rangeEnd,
        rangeStartIndex,
        rangeEndIndex,
      };
    }, [data, endDate, safeLevels, safeMaxDays, startDate, weekStartsOn]);

    const controlledDate =
      value !== undefined && value !== null ? toUtcDate(value) : null;
    const controlledKey =
      value !== undefined
        ? controlledDate
          ? dateKey(clampDate(controlledDate, model.rangeStart, model.rangeEnd))
          : null
        : undefined;
    const initialDate =
      defaultValue !== undefined && defaultValue !== null
        ? toUtcDate(defaultValue)
        : null;
    const [internalKey, setInternalKey] = useState<string | null>(() =>
      initialDate
        ? dateKey(clampDate(initialDate, model.rangeStart, model.rangeEnd))
        : null,
    );
    const [focusedKey, setFocusedKey] = useState<string | null>(null);
    const [lastFocusedKey, setLastFocusedKey] = useState(() =>
      dateKey(model.rangeEnd),
    );
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [keyboardNavigation, setKeyboardNavigation] = useState(false);
    const [tooltipDirection, setTooltipDirection] =
      useState<TooltipDirection>("none");
    const previousHoveredIndex = useRef<number | null>(null);
    const cellRefs = useRef(new Map<string, HTMLButtonElement>());
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const internalDate = internalKey ? toUtcDate(internalKey) : null;
    const resolvedInternalKey = internalDate
      ? dateKey(clampDate(internalDate, model.rangeStart, model.rangeEnd))
      : null;
    const selectedKey =
      controlledKey !== undefined ? controlledKey : resolvedInternalKey;
    const rovingKey = model.cells.some((cell) => cell.key === lastFocusedKey)
      ? lastFocusedKey
      : (selectedKey ?? dateKey(model.rangeEnd));
    const activeKey = keyboardNavigation
      ? (focusedKey ?? selectedKey)
      : (hoveredKey ?? focusedKey ?? selectedKey);
    const activeCell = activeKey
      ? model.cells.find((cell) => cell.key === activeKey)
      : undefined;
    const rovingIndex = model.cells.findIndex((cell) => cell.key === rovingKey);

    useEffect(() => {
      const scrollArea = scrollAreaRef.current;
      if (!scrollArea || model.weeks.length === 0) return;
      scrollArea.scrollLeft = scrollArea.scrollWidth;
    }, [model.weeks.length]);

    const selectCell = (cell: NormalizedCell, activate = false) => {
      const clamped = clampDate(cell.date, model.rangeStart, model.rangeEnd);
      const key = dateKey(clamped);
      const item = model.cells.find((candidate) => candidate.key === key)?.item;
      if (value === undefined) setInternalKey(key);
      onValueChange?.(clamped, item);
      if (activate) onCellSelect?.(item, clamped);
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) => {
      let nextIndex = index;
      const rowIndex = index % 7;

      if (event.key === "ArrowLeft") nextIndex = index - 7;
      else if (event.key === "ArrowRight") nextIndex = index + 7;
      else if (event.key === "ArrowUp")
        nextIndex = rowIndex === 0 ? index : index - 1;
      else if (event.key === "ArrowDown")
        nextIndex = rowIndex === 6 ? index : index + 1;
      else if (event.key === "Home") {
        if (event.metaKey || event.ctrlKey) {
          nextIndex = model.rangeStartIndex;
        } else {
          nextIndex = model.cells.findIndex(
            (cell, candidateIndex) =>
              candidateIndex >= model.rangeStartIndex &&
              candidateIndex % 7 === rowIndex &&
              cell.date <= model.rangeEnd,
          );
        }
      } else if (event.key === "End") {
        if (event.metaKey || event.ctrlKey) {
          nextIndex = model.rangeEndIndex;
        } else {
          for (
            let candidateIndex = model.rangeEndIndex;
            candidateIndex >= model.rangeStartIndex;
            candidateIndex -= 1
          ) {
            if (candidateIndex % 7 === rowIndex) {
              nextIndex = candidateIndex;
              break;
            }
          }
        }
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCell(model.cells[index], true);
        return;
      } else {
        return;
      }

      event.preventDefault();
      const boundedIndex =
        nextIndex >= model.rangeStartIndex && nextIndex <= model.rangeEndIndex
          ? nextIndex
          : index;
      const nextCell = model.cells[boundedIndex];
      setKeyboardNavigation(true);
      setHoveredKey(null);
      setFocusedKey(nextCell.key);
      setLastFocusedKey(nextCell.key);
      requestAnimationFrame(() => {
        cellRefs.current.get(nextCell.key)?.focus();
      });
    };

    const weekdayLabels = useMemo(
      () => getWeekdayLabels(weekStartsOn, weekdayFormatter),
      [weekStartsOn],
    );
    const activeContext: ActivityGraphValueContext | undefined = activeCell
      ? {
          date: activeCell.date,
          item: activeCell.item,
          value: activeCell.value,
          level: activeCell.level,
        }
      : undefined;
    const tooltipContentOffset =
      tooltipDirection === "left"
        ? { x: -4, y: 0 }
        : tooltipDirection === "right"
          ? { x: 4, y: 0 }
          : tooltipDirection === "up"
            ? { x: 0, y: -4 }
            : tooltipDirection === "down"
              ? { x: 0, y: 4 }
              : { x: 0, y: 0 };
    const totalActivity = model.cells.reduce(
      (total, cell) => total + cell.value,
      0,
    );
    const summaryId = \`\${layoutId}-summary\`;

    return (
      <Tooltip.Provider delay={Math.max(0, tooltipDelay)}>
        <div
          ref={forwardedRef}
          data-slot="activity-graph"
          className={cn(
            "w-full text-[var(--activity-graph-label)] [@media(pointer:coarse)]:[--activity-graph-cell-size:1.25rem]",
            className,
          )}
          style={{ ...resolvedTokenStyle, ...style }}
          {...rootProps}
        >
          <p id={summaryId} className="sr-only">
            {totalActivity} total activities from{" "}
            {dateFormatter.format(model.rangeStart)} to{" "}
            {dateFormatter.format(model.rangeEnd)}.
          </p>

          {showValue && (
            <div
              data-slot="activity-graph-value"
              className="mb-3 flex min-h-5 items-baseline gap-2 text-sm"
            >
              {activeContext && renderValue ? (
                renderValue(activeContext)
              ) : activeContext ? (
                <>
                  <span className="font-medium">
                    {dateFormatter.format(activeContext.date)}
                  </span>
                  <span className="text-[var(--activity-graph-muted-label)] tabular-nums">
                    {activeContext.value === 0
                      ? emptyLabel
                      : \`\${activeContext.value} \${activeContext.value === 1 ? "activity" : "activities"}\`}
                  </span>
                </>
              ) : (
                <span className="font-medium tabular-nums">
                  {totalActivity} total{" "}
                  {totalActivity === 1 ? "activity" : "activities"}
                </span>
              )}
            </div>
          )}

          <div
            ref={scrollAreaRef}
            data-slot="activity-graph-scroll-area"
            className={cn(
              "max-w-full overflow-x-auto pb-1 [scrollbar-width:thin]",
              gridClassName,
            )}
          >
            <div className="w-max min-w-full">
              {showMonthLabels && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "mb-1 grid h-4 text-[0.6875rem] text-[var(--activity-graph-muted-label)]",
                    showWeekdayLabels && "ml-7",
                  )}
                  style={{
                    gridTemplateColumns: \`repeat(\${model.weeks.length}, var(--activity-graph-cell-size))\`,
                    columnGap: "var(--activity-graph-cell-gap)",
                  }}
                >
                  {model.months.map((month) => (
                    <span
                      key={\`\${month.label}-\${month.weekIndex}\`}
                      className="whitespace-nowrap"
                      style={{ gridColumnStart: month.weekIndex + 1 }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-[var(--activity-graph-cell-gap)]">
                {showWeekdayLabels && (
                  <div
                    aria-hidden="true"
                    className="grid w-6 shrink-0 text-[0.625rem] text-[var(--activity-graph-muted-label)]"
                    style={{
                      gridTemplateRows:
                        "repeat(7, var(--activity-graph-cell-size))",
                      rowGap: "var(--activity-graph-cell-gap)",
                    }}
                  >
                    {weekdayLabels.map((weekday) => (
                      <span
                        key={weekday.key}
                        className={cn(
                          "flex items-center",
                          ![1, 3, 5].includes(weekday.day) && "invisible",
                        )}
                      >
                        {weekday.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* biome-ignore lint/a11y/useSemanticElements: the interactive calendar uses ARIA grid navigation rather than table navigation */}
                <div
                  role="grid"
                  aria-label={ariaLabel}
                  aria-describedby={summaryId}
                  aria-rowcount={7}
                  aria-colcount={model.weeks.length}
                  data-slot="activity-graph-grid"
                  className="m-0 grid min-w-0 grid-flow-col border-0 p-0"
                  style={{
                    gridTemplateRows:
                      "repeat(7, var(--activity-graph-cell-size))",
                    gridTemplateColumns: \`repeat(\${model.weeks.length}, var(--activity-graph-cell-size))\`,
                    gap: "var(--activity-graph-cell-gap)",
                  }}
                  onMouseLeave={() => {
                    previousHoveredIndex.current = null;
                    setHoveredKey(null);
                    setTooltipDirection("none");
                  }}
                >
                  {model.cells.map((cell, index) => {
                    const outsideRange =
                      cell.date < model.rangeStart ||
                      cell.date > model.rangeEnd;
                    const isSelected = cell.key === selectedKey;
                    const label =
                      cell.item?.label ??
                      (cell.value === 0
                        ? emptyLabel
                        : \`\${cell.value} \${cell.value === 1 ? "activity" : "activities"}\`);

                    if (outsideRange) {
                      return (
                        <span
                          key={cell.key}
                          aria-hidden="true"
                          data-slot="activity-graph-spacer"
                        />
                      );
                    }

                    return (
                      <Tooltip.Trigger
                        key={cell.key}
                        handle={tooltipHandle}
                        payload={{
                          date: cell.date,
                          item: cell.item,
                          value: cell.value,
                          level: cell.level,
                        }}
                        disabled={!showTooltip}
                        render={<button type="button" />}
                        role="gridcell"
                        aria-rowindex={(index % 7) + 1}
                        aria-colindex={Math.floor(index / 7) + 1}
                        aria-label={\`\${dateFormatter.format(cell.date)}: \${label}\`}
                        aria-current={isSelected ? "date" : undefined}
                        aria-selected={isSelected}
                        tabIndex={index === rovingIndex ? 0 : -1}
                        ref={(node: HTMLButtonElement | null) => {
                          if (node) cellRefs.current.set(cell.key, node);
                          else cellRefs.current.delete(cell.key);
                        }}
                        data-slot="activity-graph-cell"
                        data-activity-graph={layoutId}
                        data-date={cell.key}
                        onPointerEnter={(event) => {
                          if (event.pointerType === "touch") return;
                          const previousIndex = previousHoveredIndex.current;

                          if (previousIndex === null) {
                            setTooltipDirection("none");
                          } else {
                            const horizontalDelta =
                              Math.floor(index / 7) -
                              Math.floor(previousIndex / 7);
                            const verticalDelta =
                              (index % 7) - (previousIndex % 7);

                            if (
                              Math.abs(horizontalDelta) >=
                              Math.abs(verticalDelta)
                            ) {
                              setTooltipDirection(
                                horizontalDelta < 0 ? "left" : "right",
                              );
                            } else {
                              setTooltipDirection(
                                verticalDelta < 0 ? "up" : "down",
                              );
                            }
                          }

                          previousHoveredIndex.current = index;
                          setKeyboardNavigation(false);
                          setHoveredKey(cell.key);
                        }}
                        onPointerDown={() => setKeyboardNavigation(false)}
                        onClick={() => selectCell(cell, true)}
                        onFocus={() => {
                          setFocusedKey(cell.key);
                          setLastFocusedKey(cell.key);
                        }}
                        onBlur={() => setFocusedKey(null)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        className={cn(
                          "relative isolate rounded-[var(--activity-graph-cell-radius)] outline-none transition-[filter,box-shadow] duration-150 before:absolute before:inset-[calc(var(--activity-graph-cell-gap)/-2)] before:content-[''] hover:brightness-110",
                          "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--activity-graph-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          "active:scale-[0.96]",
                          isSelected &&
                            "z-[1] ring-1 ring-[var(--activity-graph-focus-ring)] ring-offset-1 ring-offset-background",
                          cell.level === 0
                            ? "bg-[var(--activity-graph-empty)]"
                            : levelClasses[cell.level - 1],
                          cellClassName,
                        )}
                      ></Tooltip.Trigger>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {showLegend && (
            <div
              data-slot="activity-graph-legend"
              className={cn(
                "mt-3 flex items-center justify-end gap-1.5 text-[0.6875rem] text-[var(--activity-graph-muted-label)]",
                legendClassName,
              )}
            >
              <span>Less</span>
              <span
                aria-hidden="true"
                className="size-[var(--activity-graph-cell-size)] rounded-[var(--activity-graph-cell-radius)] bg-[var(--activity-graph-empty)]"
              />
              {Array.from({ length: safeLevels }, (_, index) => (
                <span
                  key={levelClasses[index]}
                  aria-hidden="true"
                  className={cn(
                    "size-[var(--activity-graph-cell-size)] rounded-[var(--activity-graph-cell-radius)]",
                    levelClasses[index],
                  )}
                />
              ))}
              <span>More</span>
            </div>
          )}
        </div>

        <Tooltip.Root handle={tooltipHandle} disabled={!showTooltip}>
          {({ payload }) => (
            <Tooltip.Portal>
              <Tooltip.Positioner
                sideOffset={8}
                collisionPadding={8}
                className={cn(
                  "z-50 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
                  (shouldReduceMotion || keyboardNavigation) &&
                    "transition-none",
                )}
                style={resolvedTokenStyle}
              >
                <Tooltip.Popup
                  data-slot="activity-graph-tooltip"
                  className={cn(
                    "relative max-w-64 origin-[var(--transform-origin)] rounded-lg border border-border/70 bg-[var(--activity-graph-tooltip-surface)] px-2.5 py-2 text-xs text-[var(--activity-graph-tooltip-foreground)] shadow-lg backdrop-blur-md",
                    "transition-[transform,opacity,filter] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:blur-[2px] data-instant:transition-none data-starting-style:scale-[0.96] data-starting-style:opacity-0 data-starting-style:blur-[2px]",
                    shouldReduceMotion && "transition-none",
                    tooltipClassName,
                  )}
                >
                  {payload && (
                    <motion.div
                      key={dateKey(payload.date)}
                      data-slot="activity-graph-tooltip-content"
                      initial={
                        shouldReduceMotion ||
                        keyboardNavigation ||
                        tooltipDirection === "none"
                          ? false
                          : {
                              opacity: 0.72,
                              x: tooltipContentOffset.x,
                              y: tooltipContentOffset.y,
                            }
                      }
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{
                        duration: 0.14,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      {renderTooltip ? (
                        renderTooltip(payload)
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium">
                            {dateFormatter.format(payload.date)}
                          </span>
                          <span className="text-muted-foreground tabular-nums">
                            {payload.item?.label ??
                              (payload.value === 0
                                ? emptyLabel
                                : \`\${payload.value} \${payload.value === 1 ? "activity" : "activities"}\`)}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                  <Tooltip.Arrow className="flex size-2.5 rotate-45 border-border/70 border-r border-b bg-[var(--activity-graph-tooltip-surface)]" />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  },
);

export default ActivityGraph;
`,
      path: "activity-graph/activity-graph.tsx",
      target: "components/sonaui/activity-graph/activity-graph.tsx"
    }
  ],
  "expandable-tabs": [
    {
      type: "registry:ui",
      content: `"use client";

import { Tabs } from "@base-ui/react/tabs";
import {
  AnimatePresence,
  MotionConfig,
  type MotionConfigProps,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import type { IconType } from "react-icons";

import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

export interface ExpandableTabItem {
  /** Stable value used to identify the tab. */
  value: string;
  /** Text revealed when the tab is active. */
  title: string;
  /** Icon displayed for the tab. */
  icon: IconType;
  /** Whether the tab is unavailable. @default false */
  disabled?: boolean;
  /** ID of the external tab panel controlled by this tab. */
  ariaControls?: string;
}

export interface ExpandableTabsProps {
  /** Tabs displayed in the expandable horizontal tab list. */
  tabs: ExpandableTabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initially active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Accessible label for the tab list. @default "Expandable tabs" */
  ariaLabel?: string;
  /** Additional classes for the root container. */
  className?: string;
  /** Additional classes for the tab list. */
  listClassName?: string;
  /** Additional classes for the active tab. */
  activeTabClassName?: string;
  /** Motion configuration applied to the layout and label transitions. */
  motionConfig?: MotionConfigProps;
}

export default function ExpandableTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "Expandable tabs",
  className,
  listClassName,
  activeTabClassName = "bg-accent text-accent-foreground",
  motionConfig,
}: ExpandableTabsProps) {
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? fallbackValue,
  );
  const [inputModality, setInputModality] = useState<"keyboard" | "pointer">(
    "pointer",
  );
  const shouldReduceMotion = useReducedMotion();
  const activeValue = value ?? internalValue;
  const transition =
    shouldReduceMotion || inputModality === "keyboard"
      ? motionTransition.instant
      : (motionConfig?.transition ?? motionTransition.spatial);

  return (
    <Tabs.Root
      value={activeValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue !== "string") return;
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
      }}
      className={className}
    >
      <MotionConfig transition={transition}>
        <Tabs.List
          aria-label={ariaLabel}
          className={cn(
            "flex gap-2 rounded-full border bg-transparent p-2",
            listClassName,
          )}
          onKeyDownCapture={() => setInputModality("keyboard")}
          onPointerDownCapture={() => setInputModality("pointer")}
        >
          {tabs.map((tab) => {
            const isActive = activeValue === tab.value;
            return (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                aria-label={tab.title}
                aria-controls={tab.ariaControls}
                render={<motion.button layout />}
                className={cn(
                  "flex cursor-pointer items-center gap-2 overflow-clip rounded-full p-2",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:pointer-events-none disabled:opacity-50",
                  isActive && activeTabClassName,
                )}
              >
                <motion.span
                  layout
                  className="flex h-full grow items-center justify-center"
                >
                  <tab.icon className="text-lg" aria-hidden="true" />
                </motion.span>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      layout
                      className="overflow-hidden whitespace-nowrap text-sm leading-none"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      {tab.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </MotionConfig>
    </Tabs.Root>
  );
}
`,
      path: "expandable-tabs/expandable-tabs.tsx",
      target: "components/sonaui/expandable-tabs/expandable-tabs.tsx"
    }
  ],
  "expanding-action": [
    {
      type: "registry:ui",
      content: `"use client";

import { ChevronLeft } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";
import { type CSSProperties, type ReactNode, useId, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface ExpandingActionItem {
  /** Stable value passed to \`onValueSelect\` when the item is chosen. */
  value: string;
  /** Content displayed inside the choice button. */
  label: ReactNode;
  /** Whether the choice is unavailable. @default false */
  disabled?: boolean;
}

export interface ExpandingActionProps {
  /** Short choices revealed when the action expands. */
  items: ExpandingActionItem[];
  /** Content displayed inside the collapsed trigger. */
  trigger: ReactNode;
  /** Optional icon displayed before the trigger content. @default undefined */
  triggerIcon?: ReactNode;
  /** Controlled expanded state. @default undefined */
  open?: boolean;
  /** Initial expanded state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called whenever the expanded state changes. @default undefined */
  onOpenChange?: (open: boolean) => void;
  /** Called with the selected item value before the action collapses. @default undefined */
  onValueSelect?: (value: string) => void;
  /** Accessible label for the control that returns to the trigger. @default "Back" */
  backLabel?: string;
  /** Whether the trigger and choices are unavailable. @default false */
  disabled?: boolean;
  /** Additional classes for the rendered state container. @default undefined */
  className?: string;
  /** Additional classes for the collapsed trigger. @default undefined */
  triggerClassName?: string;
  /** Additional classes applied to every choice button. @default undefined */
  optionClassName?: string;
}

const surfaceTransition = {
  type: "spring",
  duration: 0.32,
  bounce: 0.2,
} as const;

const contentTransition = {
  duration: 0.14,
  ease: [0.23, 1, 0.32, 1],
} as const;

const tokenStyle = {
  "--expanding-action-surface": "var(--background)",
  "--expanding-action-foreground": "var(--foreground)",
  "--expanding-action-muted": "var(--muted-foreground)",
  "--expanding-action-hover":
    "color-mix(in oklab, var(--accent) 55%, transparent)",
  "--expanding-action-border": "var(--border)",
  "--expanding-action-ring": "var(--ring)",
} as CSSProperties;

export default function ExpandingAction({
  items,
  trigger,
  triggerIcon,
  open,
  defaultOpen = false,
  onOpenChange,
  onValueSelect,
  backLabel = "Back",
  disabled = false,
  className,
  triggerClassName,
  optionClassName,
}: ExpandingActionProps) {
  const instanceId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const hasEnabledItem = items.some((item) => !item.disabled);

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={\`\${instanceId}-expanding-action\`}>
        <AnimatePresence initial={false} mode="popLayout">
          {!isOpen ? (
            <motion.button
              key="trigger"
              type="button"
              disabled={disabled || !hasEnabledItem}
              onClick={() => setOpen(true)}
              className={cn(
                "relative flex h-12 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-medium text-(--expanding-action-foreground) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--expanding-action-ring)",
                className,
                triggerClassName,
              )}
              style={tokenStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={contentTransition}
            >
              <motion.span
                layoutId={\`\${instanceId}-surface\`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-(--expanding-action-border) bg-(--expanding-action-surface)/70 shadow-sm"
                transition={surfaceTransition}
              />
              {triggerIcon ? (
                <span
                  aria-hidden="true"
                  className="relative grid size-4 shrink-0 place-items-center"
                >
                  {triggerIcon}
                </span>
              ) : null}
              <span className="relative whitespace-nowrap">{trigger}</span>
            </motion.button>
          ) : (
            <motion.div
              key="choices"
              className={cn(
                "relative flex max-w-full items-center overflow-x-auto rounded-full p-1",
                className,
              )}
              style={tokenStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={contentTransition}
            >
              <motion.span
                layoutId={\`\${instanceId}-surface\`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-(--expanding-action-border) bg-(--expanding-action-surface)/70 shadow-sm"
                transition={surfaceTransition}
              />
              <div className="relative flex items-center gap-1">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setOpen(false)}
                  aria-label={backLabel}
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-(--expanding-action-muted) transition-colors hover:bg-(--expanding-action-hover) hover:text-(--expanding-action-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--expanding-action-ring) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45"
                >
                  <ChevronLeft
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.75}
                  />
                </button>
                <span
                  aria-hidden="true"
                  className="h-5 w-px shrink-0 bg-(--expanding-action-border)"
                />
                {items.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    disabled={disabled || item.disabled}
                    onClick={() => {
                      onValueSelect?.(item.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3 text-sm text-(--expanding-action-foreground) transition-colors hover:bg-(--expanding-action-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--expanding-action-ring) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45",
                      optionClassName,
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </MotionConfig>
  );
}
`,
      path: "expanding-action/expanding-action.tsx",
      target: "components/sonaui/expanding-action/expanding-action.tsx"
    }
  ],
  "fluid-tooltip": [
    {
      type: "registry:ui",
      content: `"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  createContext,
  type FocusEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type PointerEventHandler,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefObject,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

type FluidTooltipOrientation = "horizontal" | "vertical" | "auto";
type FluidTooltipSide = "top" | "right" | "bottom" | "left";
type FluidTooltipAlign = "start" | "center" | "end";
type FluidTooltipDirection = -1 | 0 | 1;
type FluidTooltipMotionAxis = "x" | "y";

interface FluidTooltipPayload {
  id: string;
  contentRef: RefObject<ReactNode>;
  side: FluidTooltipSide;
  align: FluidTooltipAlign;
  sideOffset: number;
  showArrowRef: RefObject<boolean>;
  contentClassNameRef: RefObject<string | undefined>;
}

interface FluidTooltipGroupContextValue {
  handle: Tooltip.Handle<FluidTooltipPayload>;
  disabled: boolean;
  defaultSide: FluidTooltipSide;
  direction: FluidTooltipDirection;
  keyboardNavigation: boolean;
  registerPointerTarget: (element: HTMLElement) => void;
  registerKeyboardTarget: () => void;
}

interface FluidTooltipRootContextValue {
  id: string;
  contentRef: RefObject<ReactNode>;
  disabled: boolean;
  side?: FluidTooltipSide;
  align: FluidTooltipAlign;
  sideOffset: number;
  showArrowRef: RefObject<boolean>;
  contentClassNameRef: RefObject<string | undefined>;
}

const GroupContext = createContext<FluidTooltipGroupContextValue | null>(null);
const RootContext = createContext<FluidTooltipRootContextValue | null>(null);

const tokenStyle = {
  "--fluid-tooltip-surface": "var(--foreground)",
  "--fluid-tooltip-label": "var(--background)",
  "--fluid-tooltip-shadow": "rgb(0 0 0 / 0.28)",
} as CSSProperties;

function useGroupContext(component: string) {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error(\`\${component} must be used inside FluidTooltip.Group.\`);
  }
  return context;
}

function useRootContext(component: string) {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(\`\${component} must be used inside FluidTooltip.Root.\`);
  }
  return context;
}

export interface FluidTooltipGroupProps {
  /** Related tooltip roots rendered inside the group. */
  children: ReactNode;
  /** Axis used to calculate directional content entry. @default "auto" */
  orientation?: FluidTooltipOrientation;
  /** Delay before the first pointer tooltip opens, in milliseconds. @default 350 */
  openDelay?: number;
  /** Grace period before a pointer tooltip closes, in milliseconds. @default 100 */
  closeDelay?: number;
  /** Disables tooltip behavior for every trigger in the group. @default false */
  disabled?: boolean;
  /** Additional CSS classes for the positioned tooltip surface. @default undefined */
  className?: string;
}

export function FluidTooltipGroup({
  children,
  orientation = "auto",
  openDelay = 350,
  closeDelay = 100,
  disabled = false,
  className,
}: FluidTooltipGroupProps) {
  const handle = useMemo(() => Tooltip.createHandle<FluidTooltipPayload>(), []);
  const shouldReduceMotion = useReducedMotion();
  const previousCenter = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<FluidTooltipDirection>(0);
  const [motionAxis, setMotionAxis] = useState<FluidTooltipMotionAxis>(
    orientation === "vertical" ? "y" : "x",
  );
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  const context = useMemo<FluidTooltipGroupContextValue>(
    () => ({
      handle,
      disabled,
      defaultSide: orientation === "vertical" ? "right" : "top",
      direction,
      keyboardNavigation,
      registerPointerTarget(element) {
        const bounds = element.getBoundingClientRect();
        const center = {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        };
        const previous = previousCenter.current;

        if (!previous) {
          setDirection(0);
          setMotionAxis(orientation === "vertical" ? "y" : "x");
        } else {
          const deltaX = center.x - previous.x;
          const deltaY = center.y - previous.y;
          const resolvedAxis =
            orientation === "horizontal"
              ? "x"
              : orientation === "vertical"
                ? "y"
                : Math.abs(deltaX) >= Math.abs(deltaY)
                  ? "x"
                  : "y";
          const delta = resolvedAxis === "x" ? deltaX : deltaY;
          setMotionAxis(resolvedAxis);
          setDirection(delta === 0 ? 0 : delta > 0 ? 1 : -1);
        }

        previousCenter.current = center;
        setKeyboardNavigation(false);
      },
      registerKeyboardTarget() {
        previousCenter.current = null;
        setDirection(0);
        setMotionAxis(orientation === "vertical" ? "y" : "x");
        setKeyboardNavigation(true);
      },
    }),
    [disabled, direction, handle, keyboardNavigation, orientation],
  );

  const directionalOffset =
    shouldReduceMotion || keyboardNavigation ? 0 : direction * 8;
  const contentOffset = {
    x: motionAxis === "x" ? directionalOffset : 0,
    y: motionAxis === "y" ? directionalOffset : 0,
  };

  return (
    <Tooltip.Provider
      delay={Math.max(0, openDelay)}
      closeDelay={Math.max(0, closeDelay)}
    >
      <GroupContext.Provider value={context}>{children}</GroupContext.Provider>

      <Tooltip.Root
        handle={handle}
        disabled={disabled}
        onOpenChange={(open) => {
          if (!open) {
            previousCenter.current = null;
            setDirection(0);
            setMotionAxis(orientation === "vertical" ? "y" : "x");
          }
        }}
      >
        {({ payload }) => (
          <Tooltip.Portal>
            {payload ? (
              <Tooltip.Positioner
                align={payload.align}
                className={cn(
                  "z-50 transition-transform duration-120 [transition-timing-function:cubic-bezier(0.23,1,0.42,1)]",
                  (shouldReduceMotion || keyboardNavigation) &&
                    "transition-none",
                )}
                collisionPadding={8}
                side={payload.side}
                sideOffset={payload.sideOffset}
              >
                <Tooltip.Popup
                  className={cn(
                    "relative origin-[var(--transform-origin)] rounded-lg bg-[var(--fluid-tooltip-surface)] px-2.5 py-1.5 text-[12px] font-medium leading-none text-[var(--fluid-tooltip-label)] shadow-[0_8px_24px_-8px_var(--fluid-tooltip-shadow)]",
                    "transition-[transform,opacity] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-100 data-starting-style:scale-[0.96] data-starting-style:translate-y-1 data-starting-style:opacity-0",
                    (shouldReduceMotion || keyboardNavigation) &&
                      "transition-none",
                    className,
                    payload.contentClassNameRef.current,
                  )}
                  style={tokenStyle}
                >
                  <AnimatePresence
                    custom={directionalOffset}
                    initial={false}
                    mode="popLayout"
                  >
                    <motion.span
                      key={payload.id}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      className="block whitespace-nowrap"
                      exit={{
                        opacity: 0,
                        x: contentOffset.x * -0.5,
                        y: contentOffset.y * -0.5,
                      }}
                      initial={
                        directionalOffset === 0
                          ? false
                          : {
                              opacity: 0,
                              x: contentOffset.x,
                              y: contentOffset.y,
                            }
                      }
                      transition={
                        shouldReduceMotion || keyboardNavigation
                          ? { duration: 0 }
                          : {
                              duration: 0.18,
                              ease: [0.23, 1, 0.42, 1],
                            }
                      }
                    >
                      {payload.contentRef.current}
                    </motion.span>
                  </AnimatePresence>

                  {payload.showArrowRef.current ? (
                    <Tooltip.Arrow className="absolute size-2 rotate-45 bg-[var(--fluid-tooltip-surface)] data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1" />
                  ) : null}
                </Tooltip.Popup>
              </Tooltip.Positioner>
            ) : null}
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export interface FluidTooltipRootProps {
  /** Stable identifier used to key directional content transitions. */
  id: string;
  /** Trigger and content parts associated with this tooltip. */
  children: ReactNode;
  /** Preferred side of the trigger. Overrides the group default when provided. @default undefined */
  side?: FluidTooltipSide;
  /** Alignment relative to the trigger. @default "center" */
  align?: FluidTooltipAlign;
  /** Distance between the trigger and tooltip, in pixels. @default 8 */
  sideOffset?: number;
  /** Disables this tooltip without disabling its trigger. @default false */
  disabled?: boolean;
}

export function FluidTooltipRoot({
  id,
  children,
  side,
  align = "center",
  sideOffset = 8,
  disabled = false,
}: FluidTooltipRootProps) {
  const contentRef = useRef<ReactNode>(null);
  const showArrowRef = useRef(true);
  const contentClassNameRef = useRef<string | undefined>(undefined);
  const context = useMemo<FluidTooltipRootContextValue>(
    () => ({
      id,
      contentRef,
      disabled,
      side,
      align,
      sideOffset,
      showArrowRef,
      contentClassNameRef,
    }),
    [align, disabled, id, side, sideOffset],
  );

  return (
    <RootContext.Provider value={context}>{children}</RootContext.Provider>
  );
}

export interface FluidTooltipTriggerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** Existing button or link used as the actual trigger. */
  children: ReactElement;
  /** Uses the child element without introducing a wrapper. @default true */
  asChild?: boolean;
  /** Keeps the tooltip open when the trigger is activated. @default false */
  keepOpenOnClick?: boolean;
}

export const FluidTooltipTrigger = forwardRef<
  HTMLElement,
  FluidTooltipTriggerProps
>(function FluidTooltipTrigger(
  {
    children,
    asChild = true,
    keepOpenOnClick = false,
    onPointerEnter,
    onFocus,
    onKeyDown,
    ...props
  },
  ref,
) {
  const group = useGroupContext("FluidTooltip.Trigger");
  const root = useRootContext("FluidTooltip.Trigger");

  const payload: FluidTooltipPayload = {
    id: root.id,
    contentRef: root.contentRef,
    side: root.side ?? group.defaultSide,
    align: root.align,
    sideOffset: root.sideOffset,
    showArrowRef: root.showArrowRef,
    contentClassNameRef: root.contentClassNameRef,
  };

  const handlePointerEnter: PointerEventHandler<HTMLElement> = (event) => {
    if (event.pointerType !== "touch") {
      group.registerPointerTarget(event.currentTarget);
    }
    onPointerEnter?.(event);
  };
  const handleFocus: FocusEventHandler<HTMLElement> = (event) => {
    group.registerKeyboardTarget();
    onFocus?.(event);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    group.registerKeyboardTarget();
    onKeyDown?.(event);
  };

  return (
    <Tooltip.Trigger
      {...props}
      ref={ref as Ref<HTMLButtonElement>}
      closeOnClick={!keepOpenOnClick}
      disabled={group.disabled || root.disabled}
      handle={group.handle}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      payload={payload}
      render={asChild ? children : undefined}
    >
      {asChild ? undefined : children}
    </Tooltip.Trigger>
  );
});

export interface FluidTooltipContentProps {
  /** Short, non-interactive tooltip label. */
  children: ReactNode;
  /** Additional CSS classes for this tooltip's surface. @default undefined */
  className?: string;
  /** Shows the arrow connecting the surface to its trigger. @default true */
  showArrow?: boolean;
}

export function FluidTooltipContent({
  children,
  className,
  showArrow = true,
}: FluidTooltipContentProps) {
  const root = useRootContext("FluidTooltip.Content");
  useLayoutEffect(() => {
    root.contentRef.current = children;
    root.contentClassNameRef.current = className;
    root.showArrowRef.current = showArrow;
  }, [children, className, root, showArrow]);
  return null;
}

export const FluidTooltip = {
  Group: FluidTooltipGroup,
  Root: FluidTooltipRoot,
  Trigger: FluidTooltipTrigger,
  Content: FluidTooltipContent,
};

export default FluidTooltip;
`,
      path: "fluid-tooltip/fluid-tooltip.tsx",
      target: "components/sonaui/fluid-tooltip/fluid-tooltip.tsx"
    }
  ],
  "mesh-gradient-shader": [
    {
      type: "registry:ui",
      content: `"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/sona-utils";

export interface MeshGradientShaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Up to 10 color spots. Accepts hex, RGB, or HSL strings.
   * @default ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"]
   */
  colors?: string[];
  /**
   * Power of organic noise distortion (0–1).
   * @default 0.3
   */
  distortion?: number;
  /**
   * Power of vortex distortion (0–1).
   * @default 0.2
   */
  swirl?: number;
  /**
   * Grain distortion on color edges (0–1).
   * @default 0
   */
  grainMixer?: number;
  /**
   * Post-processing grain overlay (0–1).
   * @default 0
   */
  grainOverlay?: number;
  /**
   * Animation speed multiplier. 0 = static.
   * @default 1
   */
  speed?: number;
}

export default function MeshGradientShader({
  className,
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"],
  distortion = 0.3,
  swirl = 0.2,
  grainMixer = 0,
  grainOverlay = 0,
  speed = 1,
  style,
  ...props
}: MeshGradientShaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      // First color doubles as a fallback while WebGL boots (or is unavailable).
      style={{ backgroundColor: colors[0], ...style }}
      {...props}
    >
      <MeshGradient
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        speed={shouldReduceMotion ? 0 : speed}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
`,
      path: "mesh-gradient-shader/mesh-gradient-shader.tsx",
      target: "components/sonaui/mesh-gradient-shader/mesh-gradient-shader.tsx"
    }
  ],
  "link-preview": [
    {
      type: "registry:ui",
      content: `"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState, useSyncExternalStore } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import useMeasure from "react-use-measure";
import { motionTransition } from "@/lib/sona-motion";

function useMediaQuery(query: string) {
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

interface LinkPreviewProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** The URL of the link to preview. */
  link: string;
  /** The text to display for the link. */
  text: string;
  /**
   * Whether to show an icon next to the link text.
   * @default true
   */
  showIcon?: boolean;
}

export default function LinkPreview({
  link,
  text,
  showIcon = true,
  ...linkProps
}: LinkPreviewProps) {
  // scroll: true keeps viewport coordinates fresh while the page scrolls
  const [containerRef, containerBounds] = useMeasure({ scroll: true });
  const desktop = useMediaQuery("(min-width: 768px)");
  const shouldReduceMotion = useReducedMotion();

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <a
        href={link}
        className="inline-flex relative items-center underline underline-offset-3 cursor-pointer"
        onMouseEnter={() => {
          if (desktop) setIsHover(true);
        }}
        onMouseLeave={() => setIsHover(false)}
        onFocus={() => {
          if (desktop) setIsHover(true);
        }}
        onBlur={() => setIsHover(false)}
        ref={containerRef}
        {...linkProps}
      >
        {text}
        {showIcon && (
          <span className="ml-1 text-sm">
            <FaArrowUpRightFromSquare />
          </span>
        )}
      </a>
      <AnimatePresence>
        {isHover && desktop && (
          <aside
            aria-label={\`Link preview for \${link}\`}
            className="fixed z-50 -translate-x-1/2 -translate-y-full pointer-events-auto"
            style={{
              left: containerBounds.left + containerBounds.width / 2,
              top: containerBounds.top - 8,
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <motion.div
              className="overflow-clip w-fit bg-popover text-popover-foreground border border-border rounded-xl shadow-xl origin-bottom"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, y: 4 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97 }
              }
              transition={
                shouldReduceMotion
                  ? motionTransition.reduced
                  : motionTransition.enter
              }
            >
              <div className="flex flex-col gap-y-2 px-4 py-2 w-fit rounded-xl">
                <div className="flex justify-between gap-x-4 w-full text-sm">
                  External Link
                  <a href={link} aria-label={\`Open \${link}\`}>
                    <FaArrowUpRightFromSquare />
                  </a>
                </div>
                <a href={link} className="text-nowrap underline">
                  {link}
                </a>
              </div>
            </motion.div>
          </aside>
        )}
      </AnimatePresence>
    </>
  );
}
`,
      path: "link-preview/link-preview.tsx",
      target: "components/sonaui/link-preview/link-preview.tsx"
    }
  ],
  "stagger-text": [
    {
      type: "registry:ui",
      content: `"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/sona-utils";

type StaggerTextEleType = "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type StaggerTextProps<T extends StaggerTextEleType> =
  React.ComponentPropsWithoutRef<T> & {
    /** The text content to be displayed with staggered animation. */
    text: string;
    /** Additional CSS classes for the container. */
    className?: string;
    /**
     * The HTML tag to be used for the text container.
     * @default "h3"
     */
    as?: T;
  };

export default function StaggerText({
  text = "text",
  className,
  as = "h3",
  ...props
}: StaggerTextProps<StaggerTextEleType>) {
  const Tag = as; // Explicitly type as a React component
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Tag className={cn("tracking-wide", className)} {...props}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn("overflow-clip tracking-wide select-text", className)}
      aria-label={text}
      onCopy={(e) => {
        e.preventDefault();
        e.clipboardData.setData("text/plain", text);
      }}
      {...props}
    >
      {text.split("").map((char, i) => {
        const delay = Math.abs(activeIndex - i);
        return (
          <StaggerTextItem
            char={char}
            // biome-ignore lint/suspicious/noArrayIndexKey: chars repeat; position is the identity
            key={i}
            onMouseEnter={() => {
              setActiveIndex(i);
              setIsActive(true);
            }}
            onMouseLeave={() => {
              setActiveIndex(-1);
              setIsActive(false);
            }}
            delay={delay}
            isHovered={isActive}
          />
        );
      })}
    </Tag>
  );
}

interface StaggerTextItemProps
  extends React.ComponentPropsWithoutRef<typeof motion.span> {
  char: string;
  delay?: number;
  isHovered?: boolean;
}

const StaggerTextItem = ({
  char,
  delay,
  isHovered,
  ...props
}: StaggerTextItemProps) => {
  return (
    <motion.span
      {...props}
      className="inline-flex relative flex-col"
      role="presentation"
    >
      <StaggerItemSegment
        variants={variants}
        custom={delay}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        aria-hidden="true"
      >
        {char}
      </StaggerItemSegment>
      <StaggerItemSegment
        isCopy
        variants={variants}
        custom={delay}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        aria-hidden="true"
      >
        {char}
      </StaggerItemSegment>
    </motion.span>
  );
};

interface StaggerItemSegmentProps
  extends React.ComponentPropsWithoutRef<typeof motion.span> {
  children: ReactNode;
  isCopy?: boolean;
}

const StaggerItemSegment = ({
  children,
  isCopy,
  ...props
}: StaggerItemSegmentProps) => {
  const content = children === " " ? "\u00A0" : children;

  if (isCopy) {
    return (
      <motion.span
        className="absolute left-0 top-[0] h-fit w-full select-text"
        style={{ translate: "0 100%" }}
        {...props}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <motion.span className="h-fit select-none" aria-hidden="true" {...props}>
      {content}
    </motion.span>
  );
};

const variants: Variants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: "-100%",
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeInOut",
      type: "tween" as const,
    },
  }),
  exit: (i: number) => ({
    y: 0,
    transition: { delay: i * 0.02, duration: 0.3 },
  }),
};
`,
      path: "stagger-text/stagger-text.tsx",
      target: "components/sonaui/stagger-text/stagger-text.tsx"
    }
  ],
  "avatar-showcase": [
    {
      type: "registry:ui",
      content: `"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface AvatarShowcaseItem {
  /** Stable identifier used to preserve the supplied item order. */
  id: string;
  /** Accessible name for the person or profile. */
  name: string;
  /** Avatar image URL. */
  imageUrl: string;
}

export interface AvatarShowcaseProps extends React.HTMLAttributes<HTMLElement> {
  /** Ordered people to present. The first item is treated as the most recent. */
  items: AvatarShowcaseItem[];
  /** Number of vertically staggered lanes used by the moving strip.
   * @default 1
   */
  lanes?: 1 | 2 | 3;
  /** Total community size when \`items\` contains only a recent subset.
   * @default items.length
   */
  totalCount?: number;
  /** Optional message revealed with the final count. Omit it for a count-only ending.
   * @default undefined
   */
  message?: string;
  /** Maximum number of avatars rendered before deterministic sampling is applied.
   * @default 80
   */
  maxItems?: number;
  /** Fixed playback duration in seconds. When omitted, duration is derived from the total count.
   * @default undefined
   */
  duration?: number;
  /** Avatar diameter in pixels.
   * @default 56
   */
  avatarSize?: number;
  /** Called after the strip finishes and the ending is revealed.
   * @default undefined
   */
  onComplete?: () => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function sampleItems(items: AvatarShowcaseItem[], limit: number) {
  if (items.length <= limit) return items;

  const recentCount = Math.min(12, Math.ceil(limit / 3));
  const recentItems = items.slice(0, recentCount);
  const remainingSlots = limit - recentCount;
  const remainingItems = items.slice(recentCount);

  const sampledItems = Array.from({ length: remainingSlots }, (_, index) => {
    const sampleIndex = Math.floor(
      (index * (remainingItems.length - 1)) / Math.max(1, remainingSlots - 1),
    );
    return remainingItems[sampleIndex];
  });

  return [...recentItems, ...sampledItems];
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?"
  );
}

function ShowcaseAvatar({
  item,
  size,
}: {
  item: AvatarShowcaseItem;
  size: number;
}) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--border)_80%,transparent),0_8px_24px_-12px_color-mix(in_oklab,var(--foreground)_24%,transparent)]"
      style={{ width: size, height: size }}
      title={item.name}
    >
      {hasImageError ? (
        <span
          aria-hidden="true"
          style={{ fontSize: Math.max(11, size * 0.28) }}
        >
          {getInitials(item.name)}
        </span>
      ) : (
        // biome-ignore lint/performance/noImgElement: registry consumers may provide any remote image source
        <img
          alt=""
          className="size-full object-cover"
          draggable={false}
          loading="eager"
          onError={() => setHasImageError(true)}
          src={item.imageUrl}
        />
      )}
    </div>
  );
}

export default function AvatarShowcase({
  items,
  lanes = 1,
  totalCount = items.length,
  message,
  maxItems = 80,
  duration,
  avatarSize = 56,
  className,
  onComplete,
  ...props
}: AvatarShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [measurement, setMeasurement] = useState({ container: 0, track: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const safeLaneCount = clamp(Math.round(lanes), 1, 3);
  const safeAvatarSize = clamp(avatarSize, 32, 96);
  const safeLimit = Math.max(1, Math.floor(maxItems));
  const visibleItems = useMemo(
    () => sampleItems(items, safeLimit),
    [items, safeLimit],
  );
  const effectiveLanes = Math.min(safeLaneCount, visibleItems.length || 1);
  const laneOffset = safeAvatarSize * 0.58;
  const containerHeight = safeAvatarSize + laneOffset * (effectiveLanes - 1);
  const measurementKey = \`\${visibleItems.map((item) => item.id).join(":")}-\${effectiveLanes}-\${safeAvatarSize}\`;
  const resolvedCount = Math.max(totalCount, items.length);
  const resolvedDuration =
    duration ?? clamp(8 + Math.log10(Math.max(1, resolvedCount)) * 1.2, 8, 12);

  useEffect(() => {
    // Reconnect the observer when the rendered strip geometry changes.
    void measurementKey;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const nextMeasurement = {
        container: container.clientWidth,
        track: track.scrollWidth,
      };
      // Removing the completed track reports a transient zero width. Ignoring
      // that observation keeps the final count visible instead of restarting.
      if (nextMeasurement.container === 0 || nextMeasurement.track === 0)
        return;
      setMeasurement(nextMeasurement);
      setIsComplete(false);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measurementKey]);

  if (visibleItems.length === 0) {
    return (
      <section
        aria-label="No people to showcase yet"
        className={cn(
          "grid min-h-28 place-items-center overflow-hidden rounded-xl border border-border bg-background px-6 text-center text-muted-foreground text-sm",
          className,
        )}
        {...props}
      >
        No people to showcase yet.
      </section>
    );
  }

  const summary = \`Showing \${visibleItems.length.toLocaleString()} of \${resolvedCount.toLocaleString()} people.\`;
  const staticItems = visibleItems.slice(0, Math.min(8, visibleItems.length));
  const canAnimate =
    !shouldReduceMotion && measurement.container > 0 && measurement.track > 0;

  return (
    <section
      ref={containerRef}
      aria-label={summary}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border bg-background px-4 py-8",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{summary}</span>

      {shouldReduceMotion ? (
        <div
          className="flex items-center justify-center -space-x-3"
          aria-hidden="true"
        >
          {staticItems.map((item) => (
            <ShowcaseAvatar item={item} key={item.id} size={safeAvatarSize} />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              aria-hidden="true"
              animate={
                canAnimate
                  ? { x: -measurement.track - safeAvatarSize }
                  : { x: 0 }
              }
              className="flex w-max items-start gap-3 will-change-transform"
              initial={{ x: measurement.container + safeAvatarSize }}
              key={\`\${measurement.container}-\${measurement.track}-\${measurementKey}\`}
              onAnimationComplete={() => {
                if (!canAnimate) return;
                setIsComplete(true);
                onComplete?.();
              }}
              ref={trackRef}
              style={{ height: containerHeight }}
              transition={{ duration: resolvedDuration, ease: "linear" }}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    transform: \`translateY(\${(index % effectiveLanes) * laneOffset}px)\`,
                  }}
                >
                  <ShowcaseAvatar item={item} size={safeAvatarSize} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="grid min-h-20 place-items-center text-center"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              key="summary"
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
            >
              <div>
                <p className="font-semibold tabular-nums text-2xl text-foreground">
                  {resolvedCount.toLocaleString()}
                </p>
                {message ? (
                  <p className="mt-1 text-muted-foreground text-sm">
                    {message}
                  </p>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
`,
      path: "avatar-showcase/avatar-showcase.tsx",
      target: "components/sonaui/avatar-showcase/avatar-showcase.tsx"
    }
  ],
  "hold-to-delete-button": [
    {
      type: "registry:ui",
      content: `"use client";

import { Check, Trash2 } from "lucide-react";
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/sona-utils";

export interface HoldToDeleteButtonProps {
  /** Text displayed inside the button. */
  label?: string;
  /**
   * Duration in milliseconds the user must hold before the action triggers.
   * @default 2000
   */
  holdDuration?: number;
  /**
   * Duration in milliseconds the success state is visible before auto-resetting.
   * @default 1200
   */
  successDuration?: number;
  /** Called once when the hold completes. */
  onDelete?: () => void;
  /** Whether the button ignores interaction. @default false */
  disabled?: boolean;
  /** Additional CSS classes for the button. */
  className?: string;
}

export default function HoldToDeleteButton({
  label = "Hold To Delete",
  holdDuration = 2000,
  successDuration = 1200,
  onDelete,
  disabled = false,
  className,
}: HoldToDeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAtRef = useRef(0);
  const buttonControls = useAnimationControls();
  const progress = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const resolvedHoldDuration = Math.max(0, holdDuration);
  const resolvedSuccessDuration = Math.max(0, successDuration);
  const progressClipPath = useTransform(
    progress,
    (value) => \`inset(0 \${100 - value * 100}% 0 0)\`,
  );

  const clearHoldTimer = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  };

  const cancelHold = () => {
    if (!holdTimerRef.current) return;
    const heldRatio =
      resolvedHoldDuration === 0
        ? 1
        : Math.min(
            (performance.now() - startedAtRef.current) / resolvedHoldDuration,
            1,
          );

    clearHoldTimer();
    setIsHolding(false);
    animate(progress, 0, {
      type: "spring",
      duration: 0.3,
      bounce: 0,
    });

    if (shouldReduceMotion || heldRatio < 0.15) {
      buttonControls.start({ transform: "translateX(0) scale(1)" });
      return;
    }

    const isPastHalfway = heldRatio >= 0.5;
    buttonControls.start(
      {
        transform: isPastHalfway
          ? [
              "translateX(0) rotate(0deg) scale(1)",
              "translateX(-7px) rotate(-1.2deg) scale(0.985)",
              "translateX(6px) rotate(1deg) scale(0.99)",
              "translateX(-4px) rotate(-0.6deg) scale(0.995)",
              "translateX(2px) rotate(0.3deg) scale(1)",
              "translateX(0) rotate(0deg) scale(1)",
            ]
          : [
              "translateX(0) scale(1)",
              "translateX(-3px) scale(0.99)",
              "translateX(3px) scale(0.995)",
              "translateX(0) scale(1)",
            ],
      },
      {
        duration: isPastHalfway ? 0.38 : 0.24,
        ease: [0.23, 1, 0.32, 1],
      },
    );
  };

  const resetState = () => {
    clearHoldTimer();
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = null;
    setIsCompleted(false);
    buttonControls.start({ transform: "translateX(0) scale(1)" });
    animate(progress, 0, {
      type: "spring",
      duration: 0.3,
      bounce: 0,
    });
  };

  const handlePointerDown = () => {
    if (isCompleted || disabled) return;
    clearHoldTimer();
    startedAtRef.current = performance.now();
    setIsHolding(true);
    buttonControls.start({
      transform: shouldReduceMotion
        ? "translateX(0) scale(1)"
        : "translateX(0) scale(0.97)",
      transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
    });
    animate(progress, 1, {
      duration: resolvedHoldDuration / 1000,
      ease: "linear",
    });
    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null;
      setIsHolding(false);
      setIsCompleted(true);
      buttonControls.start({
        transform: "translateX(0) scale(1)",
        transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
      });
      progress.set(1);
      onDelete?.();
    }, resolvedHoldDuration);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: successDuration is stable per render
  useEffect(() => {
    if (!isCompleted) return;
    successTimerRef.current = setTimeout(resetState, resolvedSuccessDuration);
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [isCompleted, resolvedSuccessDuration]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: unmount-only cleanup
  useEffect(
    () => () => {
      clearHoldTimer();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  const renderVisualContent = () => (
    <>
      <span className="relative grid size-4 shrink-0 place-items-center">
        {isCompleted ? (
          <Check aria-hidden="true" className="size-4" strokeWidth={2.25} />
        ) : (
          <Trash2 aria-hidden="true" className="size-4" strokeWidth={2} />
        )}
      </span>
      <span className="relative grid text-sm leading-none [&>*]:col-start-1 [&>*]:row-start-1">
        <span
          className={cn(isHolding || isCompleted ? "opacity-0" : "opacity-100")}
        >
          {label}
        </span>
        <span
          className={cn(
            isHolding && !isCompleted ? "opacity-100" : "opacity-0",
          )}
        >
          Keep holding
        </span>
        <span className={cn(isCompleted ? "opacity-100" : "opacity-0")}>
          Deleted
        </span>
      </span>
    </>
  );

  return (
    <motion.button
      type="button"
      className={cn(
        "relative flex h-12 min-w-48 touch-none cursor-pointer select-none items-center justify-center gap-2 overflow-clip rounded-full bg-danger/10 px-5 font-medium text-danger shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-danger)_40%,transparent),0_1px_2px_rgb(0_0_0/0.06)] outline-none transition-[background-color,color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-danger/50 disabled:cursor-not-allowed disabled:opacity-50",
        isCompleted &&
          "bg-success/10 text-success shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-success)_40%,transparent),0_1px_2px_rgb(0_0_0/0.06)] focus-visible:ring-success/50",
        className,
      )}
      disabled={disabled}
      aria-busy={isHolding}
      animate={buttonControls}
      onPointerDown={(event) => {
        if (disabled) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        handlePointerDown();
      }}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          handlePointerDown();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") cancelHold();
      }}
    >
      <span className="relative flex items-center justify-center gap-2">
        {renderVisualContent()}
      </span>
      <motion.span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center gap-2 bg-danger text-white",
          isCompleted && "bg-success",
        )}
        style={{ clipPath: progressClipPath }}
      >
        {renderVisualContent()}
      </motion.span>
      <span aria-live="polite" className="sr-only">
        {isCompleted ? "Deleted" : isHolding ? "Keep holding" : label}
      </span>
    </motion.button>
  );
}
`,
      path: "hold-to-delete-button/hold-to-delete-button.tsx",
      target: "components/sonaui/hold-to-delete-button/hold-to-delete-button.tsx"
    }
  ]
};

export const componentMetadata = {
  "sona-utils": {
    "name": "sona-utils",
    "type": "registry:lib",
    "title": "Sona Utilities",
    "description": "Shared class-name utilities used by Sona UI registry components.",
    "files": [
      {
        "path": "registry/sonaui/sona-utils/sona-utils.ts",
        "type": "registry:lib",
        "target": "@lib/sona-utils.ts"
      }
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ]
  },
  "sona-motion": {
    "name": "sona-motion",
    "type": "registry:lib",
    "title": "Sona Motion",
    "description": "Semantic motion transitions for feedback, entrances, exits, spatial movement, expressive interactions, and reduced motion.",
    "files": [
      {
        "path": "registry/sonaui/sona-motion/sona-motion.ts",
        "type": "registry:lib",
        "target": "@lib/sona-motion.ts"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "sona-theme": {
    "name": "sona-theme",
    "type": "registry:theme",
    "title": "Sona Theme",
    "description": "Optional Sona UI semantic status colors and shared design tokens for Tailwind CSS v4.",
    "files": [],
    "dependencies": [],
    "registryDependencies": [],
    "cssVars": {
      "theme": {
        "radius-sona": "0.75rem"
      },
      "light": {
        "danger": "oklch(0.97 0.04 25)",
        "danger-foreground": "oklch(0.55 0.18 25)",
        "danger-border": "oklch(0.9 0.1 25)"
      },
      "dark": {
        "danger": "oklch(0.34 0.1 20)",
        "danger-foreground": "oklch(0.75 0.15 25)",
        "danger-border": "oklch(0.36 0.11 25)"
      }
    }
  },
  "agent-skill": {
    "name": "agent-skill",
    "type": "registry:file",
    "title": "Sona UI Agent Skill",
    "description": "Instructions for coding agents to discover, install, compose, and verify Sona UI components.",
    "files": [
      {
        "path": "registry/sonaui/agent-skill/SKILL.md",
        "type": "registry:file",
        "target": ".agents/skills/sona-ui/SKILL.md"
      },
      {
        "path": "registry/sonaui/agent-skill/references/component-selection.md",
        "type": "registry:file",
        "target": ".agents/skills/sona-ui/references/component-selection.md"
      },
      {
        "path": "registry/sonaui/agent-skill/references/consumer-validation.md",
        "type": "registry:file",
        "target": ".agents/skills/sona-ui/references/consumer-validation.md"
      },
      {
        "path": "registry/sonaui/agent-skill/references/design-principles.md",
        "type": "registry:file",
        "target": ".agents/skills/sona-ui/references/design-principles.md"
      },
      {
        "path": "registry/sonaui/agent-skill/references/provider-setup.md",
        "type": "registry:file",
        "target": ".agents/skills/sona-ui/references/provider-setup.md"
      }
    ],
    "dependencies": [],
    "registryDependencies": []
  },
  "animated-dropdown": {
    "name": "animated-dropdown",
    "type": "registry:ui",
    "title": "Animated Dropdown",
    "description": "A composable, accessible dropdown menu built on Base UI with controlled state, interruptible hover highlighting, and origin-aware enter motion.",
    "files": [
      {
        "path": "registry/sonaui/animated-dropdown/animated-dropdown.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ],
    "registryDependencies": [
      "@sona-ui/sona-theme"
    ]
  },
  "animated-switch": {
    "name": "animated-switch",
    "type": "registry:ui",
    "title": "Animated Switch",
    "description": "An interactive iOS-style squish switch built on Base UI Switch primitives, with interruptible press feedback and a shared feedback spring.",
    "files": [
      {
        "path": "registry/sonaui/animated-switch/animated-switch.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "animated-dialog": {
    "name": "animated-dialog",
    "type": "registry:ui",
    "title": "Animated Dialog",
    "description": "A composable, accessible dialog modal built on Base UI with controlled state, direction-aware enter and exit motion, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/animated-dialog/animated-dialog.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "button": {
    "name": "button",
    "type": "registry:ui",
    "title": "Button",
    "description": "A simple action button with subtle press feedback and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/button/button.tsx",
        "type": "registry:ui",
        "target": "@ui/button.tsx"
      }
    ],
    "dependencies": [
      "class-variance-authority",
      "motion"
    ]
  },
  "dot-orbit-shader": {
    "name": "dot-orbit-shader",
    "type": "registry:ui",
    "title": "Dot Orbit Shader",
    "description": "Animated multi-color dots orbiting their cell centers. Supports up to 10 colors with controls for size, spread, and motion. Powered by Paper Design Shaders.",
    "files": [
      {
        "path": "registry/sonaui/dot-orbit-shader/dot-orbit-shader.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@paper-design/shaders-react",
      "motion"
    ]
  },
  "mesh-gradient-shader": {
    "name": "mesh-gradient-shader",
    "type": "registry:ui",
    "title": "Mesh Gradient Shader",
    "description": "A flowing composition of animated color spots shaped by organic distortion and vortex effects. Powered by Paper Design Shaders.",
    "files": [
      {
        "path": "registry/sonaui/mesh-gradient-shader/mesh-gradient-shader.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@paper-design/shaders-react",
      "motion"
    ]
  },
  "magnetic-button": {
    "name": "magnetic-button",
    "type": "registry:ui",
    "title": "Magnetic",
    "description": "A pointer-aware magnetic wrapper with bounded pull strength, self or parent interaction areas, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/magnetic-button/magnetic-button.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "fluid-tabs": {
    "name": "fluid-tabs",
    "type": "registry:ui",
    "title": "Fluid Tabs",
    "description": "An accessible Base UI tab selector with a shared active surface that travels fluidly between selections, with capsule and underline variants.",
    "files": [
      {
        "path": "registry/sonaui/fluid-tabs/fluid-tabs.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "fluid-tooltip": {
    "name": "fluid-tooltip",
    "type": "registry:ui",
    "title": "Fluid Tooltip",
    "description": "A grouped Base UI tooltip system with a deliberate first appearance and fast directional handoffs between related controls.",
    "files": [
      {
        "path": "registry/sonaui/fluid-tooltip/fluid-tooltip.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "fluid-slider": {
    "name": "fluid-slider",
    "type": "registry:ui",
    "title": "Fluid Slider",
    "description": "A labeled Base UI range control with direct surface selection, a dedicated draggable indicator, and restrained boundary resistance.",
    "files": [
      {
        "path": "registry/sonaui/fluid-slider/fluid-slider.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "activity-graph": {
    "name": "activity-graph",
    "type": "registry:ui",
    "title": "Activity Graph",
    "description": "A keyboard-accessible calendar heatmap with normalized intensity levels and an interruptible shared focus surface.",
    "files": [
      {
        "path": "registry/sonaui/activity-graph/activity-graph.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ],
    "registryDependencies": [
      "@sona-ui/sona-utils"
    ]
  },
  "animated-tabs": {
    "name": "animated-tabs",
    "type": "registry:ui",
    "title": "Animated Tabs",
    "description": "An accessible horizontal tab selector built on Base UI with controlled state, keyboard navigation, disabled items, and a pointer-only shared hover indicator.",
    "files": [
      {
        "path": "registry/sonaui/animated-tabs/animated-tabs.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "expanding-action": {
    "name": "expanding-action",
    "type": "registry:ui",
    "title": "Expanding Action",
    "description": "A compact action that transforms in place into a short set of related choices with accessible focus management.",
    "files": [
      {
        "path": "registry/sonaui/expanding-action/expanding-action.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "lucide-react",
      "motion"
    ],
    "registryDependencies": [
      "@sona-ui/sona-utils"
    ]
  },
  "accordion": {
    "name": "accordion",
    "type": "registry:ui",
    "title": "Accordion",
    "description": "An accessible Base UI accordion with controlled and uncontrolled state, four visual variants, interruptible disclosure transitions, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/accordion/accordion.tsx",
        "type": "registry:ui"
      },
      {
        "path": "registry/sonaui/accordion/animated-plus-minus-button.tsx",
        "type": "registry:ui"
      },
      {
        "path": "registry/sonaui/accordion/styles.module.css",
        "type": "registry:file",
        "target": "components/ui/accordion/styles.module.css"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ]
  },
  "ripple-button": {
    "name": "ripple-button",
    "type": "registry:ui",
    "title": "RippleButton",
    "description": "A pointer-aware ripple button with touch-safe feedback, customizable motion, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/ripple-button/ripple-button.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "marquee": {
    "name": "marquee",
    "type": "registry:ui",
    "title": "Marquee",
    "description": "A scroll-velocity marquee with seamless loop math, eased hover pause, vertical/horizontal direction, ResizeObserver-based copy count, and full prefers-reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/marquee/marquee.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "spinning-text": {
    "name": "spinning-text",
    "type": "registry:ui",
    "title": "SpinningText",
    "description": "The `SpinningText` component is a dynamic and visually engaging UI element that animates text in a circular spinning motion. It is highly customizable, allowing you to control the animation's speed, direction, radius, and more.",
    "files": [
      {
        "path": "registry/sonaui/spinning-text/spinning-text.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "stagger-text": {
    "name": "stagger-text",
    "type": "registry:ui",
    "title": "StaggerText",
    "description": "A text component with staggered animation.",
    "files": [
      {
        "path": "registry/sonaui/stagger-text/stagger-text.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "link-preview": {
    "name": "link-preview",
    "type": "registry:ui",
    "title": "LinkPreview",
    "description": "The `LinkPreview` component is an interactive UI element that displays a preview of a link when hovered over. It enhances user experience by providing additional context about the link.",
    "files": [
      {
        "path": "registry/sonaui/link-preview/link-preview.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion",
      "react-icons",
      "react-use-measure"
    ]
  },
  "bubble-up-button": {
    "name": "bubble-up-button",
    "type": "registry:ui",
    "title": "BubbleUpButton",
    "description": "The `BubbleUpButton` component provides an interactive button with a fluid \"bubble-up\" animation effect when hovered. It creates an engaging user experience with minimal effort.",
    "files": [
      {
        "path": "registry/sonaui/bubble-up-button/bubble-up-button.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "expandable-tabs": {
    "name": "expandable-tabs",
    "type": "registry:ui",
    "title": "Expandable Tabs",
    "description": "An accessible Base UI tab selector that expands the active icon into a labeled pill with input-aware layout motion.",
    "files": [
      {
        "path": "registry/sonaui/expandable-tabs/expandable-tabs.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion",
      "react-icons"
    ]
  },
  "split-text": {
    "name": "split-text",
    "type": "registry:ui",
    "title": "Split Text",
    "description": "Splits text into characters, words, or lines and reveals them with a staggered, optionally scroll-triggered animation.",
    "files": [
      {
        "path": "registry/sonaui/split-text/split-text.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "gsap",
      "@gsap/react"
    ]
  },
  "image-trail": {
    "name": "image-trail",
    "type": "registry:ui",
    "title": "Image Trail",
    "description": "Spawns a trail of images that follow the cursor across a scoped area, with multiple appearance styles.",
    "files": [
      {
        "path": "registry/sonaui/image-trail/image-trail.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "lightbox": {
    "name": "lightbox",
    "type": "registry:ui",
    "title": "Lightbox",
    "description": "An accessible image preview that expands from its thumbnail and returns to the same spatial origin when dismissed.",
    "files": [
      {
        "path": "registry/sonaui/lightbox/lightbox.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "avatar-showcase": {
    "name": "avatar-showcase",
    "type": "registry:ui",
    "title": "Avatar Showcase",
    "description": "A recording-friendly avatar strip with count-aware pacing, deterministic sampling, staggered lanes, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/avatar-showcase/avatar-showcase.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "spotlight-card": {
    "name": "spotlight-card",
    "type": "registry:ui",
    "title": "Spotlight Card",
    "description": "A card with a radial spotlight glow that follows the cursor.",
    "files": [
      {
        "path": "registry/sonaui/spotlight-card/spotlight-card.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "hold-to-delete-button": {
    "name": "hold-to-delete-button",
    "type": "registry:ui",
    "title": "Hold To Delete Button",
    "description": "A hold-to-confirm destructive button with pointer capture, keyboard activation, cancellation, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/hold-to-delete-button/hold-to-delete-button.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "lucide-react",
      "motion"
    ]
  },
  "circular-dock-menu": {
    "name": "circular-dock-menu",
    "type": "registry:ui",
    "title": "Circular Dock Menu",
    "description": "A circular dock menu with controlled state, keyboard dismissal, item callbacks, outside-click handling, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/circular-dock-menu/circular-dock-menu.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion",
      "lucide-react"
    ]
  },
  "fan-view": {
    "name": "fan-view",
    "type": "registry:ui",
    "title": "Fan View",
    "description": "A fanned card menu with controlled state, item callbacks, keyboard dismissal, outside-click handling, and reduced-motion support.",
    "files": [
      {
        "path": "registry/sonaui/fan-view/fan-view.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  },
  "section-rail": {
    "name": "section-rail",
    "type": "registry:ui",
    "title": "Section Rail",
    "description": "A compact navigation rail that tracks the reader's position through a long page, revealing labels and editorial context cards on hover and focus.",
    "files": [
      {
        "path": "registry/sonaui/section-rail/section-rail.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "motion"
    ]
  }
};
