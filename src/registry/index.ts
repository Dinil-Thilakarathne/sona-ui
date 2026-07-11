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
import marquee_marquee_demo from "@/registry/examples/marquee/marquee-demo";
import ripple_button_ripple_button_demo from "@/registry/examples/ripple-button/ripple-button-demo";
import spotlight_card_spotlight_card_demo from "@/registry/examples/spotlight-card/spotlight-card-demo";
import animated_dialog_animated_dialog_demo from "@/registry/examples/animated-dialog/animated-dialog-demo";
import animated_dialog_animated_dialog_toast from "@/registry/examples/animated-dialog/animated-dialog-toast";
import split_text_split_text_demo from "@/registry/examples/split-text/split-text-demo";
import animated_tabs_animated_tabs_demo from "@/registry/examples/animated-tabs/animated-tabs-demo";
import animated_button_animated_button_demo from "@/registry/examples/animated-button/animated-button-demo";
import animated_switch_animated_switch_demo from "@/registry/examples/animated-switch/animated-switch-demo";
import animated_switch_animated_switch_disabled from "@/registry/examples/animated-switch/animated-switch-disabled";
import animated_switch_animated_switch_controlled from "@/registry/examples/animated-switch/animated-switch-controlled";
import animated_switch_animated_switch_sizes from "@/registry/examples/animated-switch/animated-switch-sizes";
import animated_switch_animated_switch_disable from "@/registry/examples/animated-switch/animated-switch-disable";
import expandable_tabs_expandable_tabs_demo from "@/registry/examples/expandable-tabs/expandable-tabs-demo";
import mesh_gradient_shader_mesh_gradient_shader_ocean from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-ocean";
import mesh_gradient_shader_mesh_gradient_shader_demo from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-demo";
import mesh_gradient_shader_mesh_gradient_shader_sunset from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-sunset";
import mesh_gradient_shader_mesh_gradient_shader_static from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-static";
import mesh_gradient_shader_mesh_gradient_shader_monochrome from "@/registry/examples/mesh-gradient-shader/mesh-gradient-shader-monochrome";
import link_preview_link_preview_demo from "@/registry/examples/link-preview/link-preview-demo";
import stagger_text_stagger_text_demo from "@/registry/examples/stagger-text/stagger-text-demo";
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
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDanger() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>Actions ▾</AnimatedDropdownTrigger>
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
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDanger() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>Actions ▾</AnimatedDropdownTrigger>
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
        <AnimatedDropdownTrigger>Controlled ▾</AnimatedDropdownTrigger>
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
        <AnimatedDropdownTrigger>Controlled ▾</AnimatedDropdownTrigger>
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
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDemo() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>My Account ▾</AnimatedDropdownTrigger>
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
} from "@/components/ui/animated-dropdown/animated-dropdown";

export default function AnimatedDropdownDemo() {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger>My Account ▾</AnimatedDropdownTrigger>
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
  return <BubbleUpButton className="bg-background">Hover me!</BubbleUpButton>;
}
`,
      imports: `import BubbleUpButton from "@/components/ui/bubble-up-button/bubble-up-button";`,
      anatomy: `export default function BubbleUpButtonExample() {
  return <BubbleUpButton className="bg-background">Hover me!</BubbleUpButton>;
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
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
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
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
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
  "animated-button": [
    {
      name: "default",
      component: animated_button_animated_button_demo,
      code: `"use client";

import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import AnimatedButton from "@/components/ui/animated-button/animated-button";

export default function AnimatedButtonDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [swap, setSwap] = useState<"slide-up" | "slide-down" | "fade" | "blur">(
    "slide-up",
  );

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Swap Animation Selector */}
      <div className="flex gap-2 p-1 bg-secondary rounded-lg text-xs">
        {(["slide-up", "slide-down", "fade", "blur"] as const).map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setSwap(style)}
            className={\`px-3 py-1.5 rounded-md font-medium capitalize transition-colors \${
              swap === style
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }\`}
          >
            {style.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Main state swap button */}
      <div className="flex flex-col items-center gap-2">
        <AnimatedButton
          onClick={handleClick}
          swap={swap}
          contentKey={state}
          variant="default"
          size="md"
          className="w-36"
        >
          {state === "idle" && (
            <>
              Submit <ArrowRight className="size-4" />
            </>
          )}
          {state === "loading" && (
            <>
              <Loader2 className="size-4 animate-spin" /> Saving text 2...
            </>
          )}
          {state === "success" && (
            <>
              <Check className="size-4 text-emerald-400" /> Success lorem lorem
            </>
          )}
        </AnimatedButton>
        <span className="text-xs text-muted-foreground">
          Click to trigger state change
        </span>
      </div>

      {/* Hover Swap Mode (ScrollUpButton merge) */}
      <div className="flex flex-col items-center gap-2 border-t pt-6 w-full">
        <span className="text-sm font-semibold text-foreground">
          Hover Text Swap
        </span>
        <div className="flex gap-4">
          <AnimatedButton hoverSwap variant="outlined" size="md">
            Hover Me
          </AnimatedButton>
          <AnimatedButton hoverSwap variant="secondary" size="md">
            <Sparkles className="size-4 mr-2" /> Playful Effect
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import AnimatedButton from "@/components/ui/animated-button/animated-button";

export default function AnimatedButtonDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [swap, setSwap] = useState<"slide-up" | "slide-down" | "fade" | "blur">(
    "slide-up",
  );

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Swap Animation Selector */}
      <div className="flex gap-2 p-1 bg-secondary rounded-lg text-xs">
        {(["slide-up", "slide-down", "fade", "blur"] as const).map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setSwap(style)}
            className={\`px-3 py-1.5 rounded-md font-medium capitalize transition-colors \${
              swap === style
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }\`}
          >
            {style.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Main state swap button */}
      <div className="flex flex-col items-center gap-2">
        <AnimatedButton
          onClick={handleClick}
          swap={swap}
          contentKey={state}
          variant="default"
          size="md"
          className="w-36"
        >
          {state === "idle" && (
            <>
              Submit <ArrowRight className="size-4" />
            </>
          )}
          {state === "loading" && (
            <>
              <Loader2 className="size-4 animate-spin" /> Saving text 2...
            </>
          )}
          {state === "success" && (
            <>
              <Check className="size-4 text-emerald-400" /> Success lorem lorem
            </>
          )}
        </AnimatedButton>
        <span className="text-xs text-muted-foreground">
          Click to trigger state change
        </span>
      </div>

      {/* Hover Swap Mode (ScrollUpButton merge) */}
      <div className="flex flex-col items-center gap-2 border-t pt-6 w-full">
        <span className="text-sm font-semibold text-foreground">
          Hover Text Swap
        </span>
        <div className="flex gap-4">
          <AnimatedButton hoverSwap variant="outlined" size="md">
            Hover Me
          </AnimatedButton>
          <AnimatedButton hoverSwap variant="secondary" size="md">
            <Sparkles className="size-4 mr-2" /> Playful Effect
          </AnimatedButton>
        </div>
      </div>
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
}: AnimatedDropdownTriggerProps) {
  return (
    <Menu.Trigger
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5",
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
      <Menu.Positioner side={side} align={align} sideOffset={sideOffset}>
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
        "relative flex cursor-pointer select-none items-center gap-2.5",
        "rounded-lg px-2.5 py-2 text-sm outline-none",
        "transition-colors duration-75",
        variant === "danger"
          ? "text-danger-foreground focus:text-danger-foreground"
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
        <span className="relative z-10 shrink-0 [&_svg]:size-4 text-muted-foreground">
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
        "relative flex h-fit w-fit cursor-pointer overflow-clip rounded-2xl border bg-foreground px-16 py-2",
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
        className="absolute left-0 top-0 h-full w-full bg-background"
        aria-hidden="true"
      />
      <span className="relative text-background mix-blend-difference">
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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useId, useState } from "react";

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
  /** Background class for the pointer hover indicator. @default "bg-accent" */
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
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const layoutId = useId();
  const shouldReduceMotion = useReducedMotion();
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;

  return (
    <Tabs.Root
      value={value}
      defaultValue={defaultValue ?? fallbackValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue === "string") onValueChange?.(nextValue);
      }}
      className={cn("relative w-fit overflow-x-auto border-b p-2", className)}
    >
      <Tabs.List
        aria-label={ariaLabel}
        className={cn("flex gap-2", listClassName)}
        onPointerLeave={() => setHoveredValue(null)}
      >
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            aria-controls={tab.ariaControls}
            onPointerEnter={() => {
              if (!tab.disabled) setHoveredValue(tab.value);
            }}
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
            <AnimatePresence>
              {hoveredValue === tab.value && (
                <motion.span
                  aria-hidden="true"
                  layoutId={\`\${layoutId}-hover\`}
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-xl",
                    indicatorClassName,
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
            <span className="relative">{tab.title}</span>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
`,
      path: "animated-tabs/animated-tabs.tsx",
      target: "components/sonaui/animated-tabs/animated-tabs.tsx"
    }
  ],
  "animated-button": [
    {
      type: "registry:ui",
      content: `"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { forwardRef } from "react";
import { motionTransition } from "@/lib/sona-motion";
import { cn } from "@/lib/sona-utils";

// ─── Button Variants (CVA) ───────────────────────────────────────────────────

export const animatedButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium rounded-xl select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 transition-colors",
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

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedButtonProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof motion.button>,
      "children"
    >,
    VariantProps<typeof animatedButtonVariants> {
  children: React.ReactNode;
  /**
   * Key identifying the current label/content state. Change it to trigger the transition.
   * If omitted, it will fall back to deriving from children when they are simple strings.
   */
  contentKey?: string | number;
  /**
   * Swap animation transition style.
   * @default "slide-up"
   */
  swap?: "slide-up" | "slide-down" | "fade" | "blur";
  /**
   * Whether to animate a text-swap effect vertically on hover.
   * Replaces the dedicated ScrollUpButton with a unified hover interaction.
   * @default false
   */
  hoverSwap?: boolean;
}

// ─── Motion Variants ──────────────────────────────────────────────────────────

const swapVariants = {
  "slide-up": {
    initial: { y: "60%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "-60%", opacity: 0 },
  },
  "slide-down": {
    initial: { y: "-60%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "60%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  blur: {
    initial: { filter: "blur(4px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(4px)", opacity: 0 },
  },
};

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      children,
      contentKey,
      swap = "slide-up",
      variant = "default",
      size = "md",
      hoverSwap = false,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    // Fallback key: string representation of children, if applicable
    const resolvedKey =
      contentKey ?? (typeof children === "string" ? children : undefined);

    const isHoverSwap = hoverSwap && !shouldReduceMotion;

    // Hover swap variants (two layers y-shifting)
    const containerHoverVariants = {
      initial: {},
      hover: {},
    };

    const firstLayerVariants = {
      initial: { y: "0%" },
      hover: { y: "-150%" },
    };

    const secondLayerVariants = {
      initial: { y: "150%" },
      hover: { y: "0%" },
    };

    // If using hoverSwap, render a dual-layer sliding structure
    if (isHoverSwap) {
      return (
        <motion.button
          ref={ref}
          disabled={disabled}
          initial="initial"
          whileHover="hover"
          whileFocus="hover"
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          variants={containerHoverVariants}
          className={cn(
            animatedButtonVariants({ variant, size }),
            "overflow-hidden flex flex-col items-center justify-center w-fit",
            className,
          )}
          {...props}
        >
          {/* Main Label Layer */}
          <motion.span
            variants={firstLayerVariants}
            transition={motionTransition.spatial}
            className="flex items-center justify-center w-full"
          >
            {children}
          </motion.span>

          {/* Incoming Hover Label Layer */}
          <motion.span
            variants={secondLayerVariants}
            transition={motionTransition.spatial}
            className="absolute flex items-center justify-center w-full"
          >
            {children}
          </motion.span>
        </motion.button>
      );
    }

    // Default button with layout animations on state changes
    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        layout={shouldReduceMotion ? false : "size"}
        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        transition={
          shouldReduceMotion
            ? motionTransition.reduced
            : motionTransition.spatial
        }
        className={cn(
          animatedButtonVariants({ variant, size }),
          "overflow-hidden flex items-center justify-center w-fit",
          className,
        )}
        {...props}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden py-0.5">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={resolvedKey}
              variants={
                shouldReduceMotion ? swapVariants.fade : swapVariants[swap]
              }
              initial="initial"
              animate="animate"
              exit="exit"
              transition={
                shouldReduceMotion
                  ? motionTransition.reduced
                  : motionTransition.spatial
              }
              className="flex items-center justify-center gap-2 whitespace-nowrap min-w-max"
            >
              {children}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.button>
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";
export default AnimatedButton;
`,
      path: "animated-button/animated-button.tsx",
      target: "components/sonaui/animated-button/animated-button.tsx"
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
  "hold-to-delete-button": [
    {
      type: "registry:ui",
      content: `"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();
  const resolvedHoldDuration = Math.max(0, holdDuration);
  const resolvedSuccessDuration = Math.max(0, successDuration);

  const cancelHold = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
    setIsHolding(false);
  };

  const resetState = () => {
    cancelHold();
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = null;
    setIsCompleted(false);
  };

  const handlePointerDown = () => {
    if (isCompleted || disabled) return;
    cancelHold();
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false);
      setIsCompleted(true);
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
      cancelHold();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  return (
    <motion.button
      type="button"
      className={cn(
        "relative cursor-pointer overflow-clip rounded-full border-2 px-6 py-3 font-medium",
        className,
      )}
      disabled={disabled}
      aria-busy={isHolding}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
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
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-danger-foreground"
        style={{
          clipPath: isHolding ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: shouldReduceMotion
            ? "none"
            : isHolding
              ? \`clip-path \${resolvedHoldDuration}ms linear\`
              : "clip-path 200ms ease-out",
        }}
      />
      <span aria-live="polite" className="relative text-xl">
        {isCompleted ? "Deleted!" : label}
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
        "target": "lib/sona-utils.ts"
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
        "target": "lib/sona-motion.ts"
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
      "https://sona-ui.vercel.app/r/sona-theme.json"
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
  "animated-button": {
    "name": "animated-button",
    "type": "registry:ui",
    "title": "Animated Button",
    "description": "A button layout component that animates content-size changes, supports keyboard-aware hover text swaps, and respects reduced-motion preferences.",
    "files": [
      {
        "path": "registry/sonaui/animated-button/animated-button.tsx",
        "type": "registry:ui"
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
  }
};
