// This file is auto-generated. Do not edit.
import * as React from "react";
import animated_dropdown_animated_dropdown_danger from "@/registry/examples/animated-dropdown/animated-dropdown-danger";
import animated_dropdown_animated_dropdown_controlled from "@/registry/examples/animated-dropdown/animated-dropdown-controlled";
import animated_dropdown_animated_dropdown_demo from "@/registry/examples/animated-dropdown/animated-dropdown-demo";
import circular_dock_menu_circular_dock_menu_demo from "@/registry/examples/circular-dock-menu/circular-dock-menu-demo";
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
import animated_button_animated_button_demo from "@/registry/examples/animated-button/animated-button-demo";
import vertical_tab_vertical_tab_demo from "@/registry/examples/vertical-tab/vertical-tab-demo";
import animated_switch_animated_switch_demo from "@/registry/examples/animated-switch/animated-switch-demo";
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
        Dropdown is: <span className="font-semibold text-foreground">{open ? "open" : "closed"}</span>
      </p>
      <AnimatedDropdown open={open} onOpenChange={setOpen}>
        <AnimatedDropdownTrigger>Controlled ▾</AnimatedDropdownTrigger>
        <AnimatedDropdownContent>
          <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Bell />}>Notifications</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Settings />}>Settings</AnimatedDropdownItem>
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
        Dropdown is: <span className="font-semibold text-foreground">{open ? "open" : "closed"}</span>
      </p>
      <AnimatedDropdown open={open} onOpenChange={setOpen}>
        <AnimatedDropdownTrigger>Controlled ▾</AnimatedDropdownTrigger>
        <AnimatedDropdownContent>
          <AnimatedDropdownItem icon={<User />}>Profile</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Bell />}>Notifications</AnimatedDropdownItem>
          <AnimatedDropdownItem icon={<Settings />}>Settings</AnimatedDropdownItem>
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

import {
  Bell,
  CreditCard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
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
        <AnimatedDropdownItem icon={<CreditCard />}>Billing</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Bell />}>Notifications</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Settings />}>Settings</AnimatedDropdownItem>
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

import {
  Bell,
  CreditCard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
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
        <AnimatedDropdownItem icon={<CreditCard />}>Billing</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Bell />}>Notifications</AnimatedDropdownItem>
        <AnimatedDropdownItem icon={<Settings />}>Settings</AnimatedDropdownItem>
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
  "magnetic-button": [
    {
      name: "default",
      component: magnetic_button_magnetic_button_demo,
      code: `import Magnetic from "@/components/ui/magnetic-button/magnetic-button";

export default function MagneticButtonExample() {
  return (
    <div className="p-2 border border-border border-dashed rounded-full">
      <Magnetic interactionArea="parent">
        <button className="px-6 py-4 font-semibold text-foreground bg-background rounded-full cursor-pointer">
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
        <button className="px-6 py-4 font-semibold text-foreground bg-background rounded-full cursor-pointer">
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
        <AccordionItem key={item.value}>
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
        <AccordionItem key={item.value}>
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
        <AccordionItem key={item.value}>
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
        <AccordionItem key={item.value}>
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
        <AccordionItem key={item.value}>
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
        <AccordionItem key={item.value}>
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
        <AccordionItem key={item.value}>
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
        <AccordionItem key={item.value}>
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
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right" | "center">("bottom");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2 p-1 bg-secondary rounded-lg text-xs">
        {(["top", "bottom", "left", "right", "center"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDirection(d)}
            className={\`px-3 py-1.5 rounded-md font-medium capitalize transition-colors \${
              direction === d
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }\`}
          >
            {d}
          </button>
        ))}
      </div>

      <AnimatedDialog>
        <AnimatedDialogTrigger>Open Dialog</AnimatedDialogTrigger>
        <AnimatedDialogContent from={direction}>
          <AnimatedDialogTitle>Directional Transition</AnimatedDialogTitle>
          <AnimatedDialogDescription>
            This modal is configured to animate from the <span className="font-semibold text-foreground capitalize">{direction}</span>. You can test all entry vectors using the switcher above.
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
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right" | "center">("bottom");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2 p-1 bg-secondary rounded-lg text-xs">
        {(["top", "bottom", "left", "right", "center"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDirection(d)}
            className={\`px-3 py-1.5 rounded-md font-medium capitalize transition-colors \${
              direction === d
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }\`}
          >
            {d}
          </button>
        ))}
      </div>

      <AnimatedDialog>
        <AnimatedDialogTrigger>Open Dialog</AnimatedDialogTrigger>
        <AnimatedDialogContent from={direction}>
          <AnimatedDialogTitle>Directional Transition</AnimatedDialogTitle>
          <AnimatedDialogDescription>
            This modal is configured to animate from the <span className="font-semibold text-foreground capitalize">{direction}</span>. You can test all entry vectors using the switcher above.
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
}`,
    }
  ],
  "animated-button": [
    {
      name: "default",
      component: animated_button_animated_button_demo,
      code: `"use client";

import { useState } from "react";
import { Check, ArrowRight, Loader2, Sparkles } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button/animated-button";

export default function AnimatedButtonDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [swap, setSwap] = useState<"slide-up" | "slide-down" | "fade" | "blur">("slide-up");

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
              <Loader2 className="size-4 animate-spin" /> Saving...
            </>
          )}
          {state === "success" && (
            <>
              <Check className="size-4 text-emerald-400" /> Success
            </>
          )}
        </AnimatedButton>
        <span className="text-xs text-muted-foreground">Click to trigger state change</span>
      </div>

      {/* Hover Swap Mode (ScrollUpButton merge) */}
      <div className="flex flex-col items-center gap-2 border-t pt-6 w-full">
        <span className="text-sm font-semibold text-foreground">Hover Text Swap</span>
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

import { useState } from "react";
import { Check, ArrowRight, Loader2, Sparkles } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button/animated-button";

export default function AnimatedButtonDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [swap, setSwap] = useState<"slide-up" | "slide-down" | "fade" | "blur">("slide-up");

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
              <Loader2 className="size-4 animate-spin" /> Saving...
            </>
          )}
          {state === "success" && (
            <>
              <Check className="size-4 text-emerald-400" /> Success
            </>
          )}
        </AnimatedButton>
        <span className="text-xs text-muted-foreground">Click to trigger state change</span>
      </div>

      {/* Hover Swap Mode (ScrollUpButton merge) */}
      <div className="flex flex-col items-center gap-2 border-t pt-6 w-full">
        <span className="text-sm font-semibold text-foreground">Hover Text Swap</span>
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
  "vertical-tab": [
    {
      name: "default",
      component: vertical_tab_vertical_tab_demo,
      code: `import VerticalTab from "@/components/ui/vertical-tab/vertical-tab";

const VerticalTabs_data = [
  {
    title: "Home",
  },
  {
    title: "Profile",
  },
  {
    title: "Settings",
  },
  {
    title: "Help",
  },
  {
    title: "About",
  },
  {
    title: "Contact",
  },
  {
    title: "Feedback",
  },
];

export default function VerticalTabExample() {
  return <VerticalTab tabs={VerticalTabs_data} />;
}
`,
      imports: `import VerticalTab from "@/components/ui/vertical-tab/vertical-tab";`,
      anatomy: `const VerticalTabs_data = [
  {
    title: "Home",
  },
  {
    title: "Profile",
  },
  {
    title: "Settings",
  },
  {
    title: "Help",
  },
  {
    title: "About",
  },
  {
    title: "Contact",
  },
  {
    title: "Feedback",
  },
];

export default function VerticalTabExample() {
  return <VerticalTab tabs={VerticalTabs_data} />;
}`,
    }
  ],
  "animated-switch": [
    {
      name: "default",
      component: animated_switch_animated_switch_demo,
      code: `"use client";

import { useState } from "react";
import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
`,
      imports: ``,
      anatomy: `"use client";

import { useState } from "react";
import AnimatedSwitch from "@/components/ui/animated-switch/animated-switch";

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
}`,
    }
  ],
  "expandable-tabs": [
    {
      name: "default",
      component: expandable_tabs_expandable_tabs_demo,
      code: `"use client";

import type { IconType } from "react-icons";
import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "@/components/ui/expandable-tabs/expandable-tabs";

type TabDataType = {
  title: string;
  icon: IconType;
};

const TabData: TabDataType[] = [
  {
    title: "Home",
    icon: FaHome,
  },
  {
    title: "Profile",
    icon: FaUser,
  },
  {
    title: "Settings",
    icon: FaCog,
  },
  {
    title: "Logout",
    icon: FaSignOutAlt,
  },
];

export default function ExpandableTabsExample() {
  return (
    <ExpandableTabs
      tabs={TabData}
      defaultActiveIndex={0}
      motionConfig={{
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
    />
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import type { IconType } from "react-icons";
import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "@/components/ui/expandable-tabs/expandable-tabs";

type TabDataType = {
  title: string;
  icon: IconType;
};

const TabData: TabDataType[] = [
  {
    title: "Home",
    icon: FaHome,
  },
  {
    title: "Profile",
    icon: FaUser,
  },
  {
    title: "Settings",
    icon: FaCog,
  },
  {
    title: "Logout",
    icon: FaSignOutAlt,
  },
];

export default function ExpandableTabsExample() {
  return (
    <ExpandableTabs
      tabs={TabData}
      defaultActiveIndex={0}
      motionConfig={{
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
    />
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
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

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
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
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
  onOpenChange,
}: AnimatedDropdownProps) {
  const layoutId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ layoutId, activeId, setActiveId }}>
      <LayoutGroup id={layoutId}>
        <Menu.Root open={open} onOpenChange={onOpenChange}>
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
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            shouldReduceMotion
              ? "duration-0"
              : "duration-150 data-[ending-style]:duration-100",
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
            layoutId={\`\${layoutId}-highlight\`}
            className={cn(
              "absolute inset-0 rounded-lg",
              variant === "danger" ? "bg-danger" : "bg-accent",
            )}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    // layout transition for the sliding effect
                    layout: { type: "spring", stiffness: 380, damping: 30 },
                  }
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
export function AnimatedDropdownSeparator({ className }: { className?: string }) {
  return (
    <Menu.Separator
      className={cn("my-1 h-px bg-border/60 mx-1", className)}
    />
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

import { AnimatePresence, MotionConfig, type Transition } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface DockMenuItem {
  /** Display label shown on the item pill. */
  label: string;
  /** Icon component (e.g. from lucide-react). */
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
}

export interface CircularDockMenuProps {
  /**
   * Items rendered as arc pills when the menu is open.
   */
  items?: DockMenuItem[];
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
  stiffness = 420,
  damping = 32,
  className,
}: CircularDockMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const springConfig: Transition = useMemo(
    () => ({ type: "spring", stiffness, damping, mass: 0.8 }),
    [stiffness, damping],
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
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <MotionConfig transition={springConfig}>
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
                ({ label, icon: Icon, x, y, rotate }, index) => (
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
                        ...springConfig,
                        delay: (items.length - index - 1) * 0.045,
                      },
                    }}
                    exit={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.48,
                      rotate: 10,
                      filter: "blur(10px)",
                      transition: {
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
                        "hover:border-border/80",
                      )}
                      whileHover={{ scale: 1.05, zIndex: 20 }}
                      whileTap={{ scale: 0.96 }}
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
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
            className={cn(
              "absolute bottom-12 left-1/2 z-20 flex size-24 -translate-x-1/2 items-center justify-center rounded-full border",
              "border-border bg-background text-foreground shadow-lg",
              "hover:border-border/80 cursor-pointer",
            )}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
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
  "magnetic-button": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SPRING_CONFIG = { stiffness: 30, damping: 6, mass: 0.6 };

interface MagneticProps {
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
}

export default function Magnetic({
  children,
  magneticIntensity = 0.6,
  magneticRange = 100,
  interactionArea = "self",
  springConfig,
  customClassName,
}: MagneticProps) {
  const [isMouseHovered, setMouseHovered] = useState(false);
  const magneticRef = useRef<HTMLDivElement>(null);

  springConfig = springConfig || SPRING_CONFIG;

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const springMotionX = useSpring(motionX, springConfig);
  const springMotionY = useSpring(motionY, springConfig);

  useEffect(() => {
    const calculateMouseDistance = (event: MouseEvent) => {
      if (magneticRef.current) {
        const rect = magneticRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;

        const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (isMouseHovered && absoluteDistance <= magneticRange) {
          const scale = 1 - absoluteDistance / magneticRange;

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
    magneticRef,
    isMouseHovered,
    magneticIntensity,
    magneticRange,
    motionX,
    motionY,
    interactionArea,
  ]);

  useEffect(() => {
    if (interactionArea === "parent" && magneticRef.current?.parentElement) {
      const parentElement = magneticRef.current.parentElement;

      const handleParentMouseEnter = () => setMouseHovered(true);
      const handleParentMouseLeave = () => setMouseHovered(false);

      parentElement.addEventListener("mouseenter", handleParentMouseEnter);
      parentElement.addEventListener("mouseleave", handleParentMouseLeave);

      return () => {
        parentElement.removeEventListener("mouseenter", handleParentMouseEnter);
        parentElement.removeEventListener("mouseleave", handleParentMouseLeave);
      };
    }
  }, [interactionArea]);

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
      className={cn("", customClassName)}
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

import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      style={style}
      {...props}
    >
      <DotOrbit
        colorBack={colorBack}
        colors={colors}
        size={size}
        sizeRange={sizeRange}
        spreading={spreading}
        stepsPerColor={stepsPerColor}
        speed={speed}
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

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";
import { cn } from "@/lib/utils";
import AnimatedPlusMinusButton from "./animated-plus-minus-button";
import styles from "./styles.module.css";

// Types
type AccordionVariant = "default" | "outlined" | "splitted" | "animated";

interface AccordionProps {
  /** The content to be displayed inside the accordion. */
  children: ReactNode;
  /**
   * Allows multiple accordion items to be open at the same time.
   * @default false
   */
  allowMultiple?: boolean;
  /** Additional CSS classes for the accordion container. */
  className?: string;
  /**
   * The visual style of the accordion.
   * @default default
   */
  variant?: AccordionVariant;
}

const accordionWrapperVarinats = cva(
  "flex flex-col overflow-clip rounded-2xl",
  {
    variants: {
      variant: {
        default: "overflow-clip rounded-2xl",
        outlined: "overflow-clip rounded-2xl",
        splitted: "overflow-clip rounded-2xl",
        animated: styles.wrapper,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const accordionItemVariants = cva(
  "relative overflow-hidden bg-background text-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        outlined:
          "border-foreground border-t border-x last:border-b first:rounded-t-2xl last:rounded-b-2xl",
        splitted: "rounded-2xl ",
        animated: styles.animated,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  value?: string;
}

interface AccordionItemHeaderProps {
  value: string;
  children: ReactNode;
}
interface AccordionItemTriggerProps {
  value: string;
  children: ReactNode;
}

interface AccordionItemContentProps {
  children: ReactNode;
  value: string;
}

const AccordionContext = createContext<{
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
  value: string;
} | null>(null);

const AccordionRoot = ({
  children,
  allowMultiple = false,
  className,
  variant = "default",
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [value, setValue] = useState<string>("");
  const toggleItem = (v: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(v)) {
        newOpenItems.delete(v);
      } else {
        if (!allowMultiple) newOpenItems.clear();
        newOpenItems.add(v);
      }
      return newOpenItems;
    });
    if (value !== v) {
      setValue(v);
    } else {
      setValue("");
    }
  };

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, variant, value }}
    >
      <ViewTransition>
        <div
          role="presentation"
          className={cn(
            accordionWrapperVarinats({ variant }),
            variant === "splitted" && "gap-y-2",
            className,
          )}
        >
          {children}
        </div>
      </ViewTransition>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({
  children,
  className,
  style,
  value,
  ...props
}: AccordionItemProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItem must be used within AccordionRoot");
  const { variant } = context;
  return (
    <div
      role="presentation"
      className={cn(accordionItemVariants({ variant }), className)}
      style={style}
      data-active={value === context.value}
      {...props}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

const AccordionItemHeader = ({ value, children }: AccordionItemHeaderProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionTrigger must be used within AccordionRoot");
  const { openItems } = context;

  const isOpen = openItems.has(value);

  return (
    <div className="flex items-center justify-between pt-4 px-8 font-medium text-balance rounded-xl">
      <div className="">{children}</div>
      <AnimatedPlusMinusButton isOpen={isOpen} />
    </div>
  );
};

const AccordionItemTrigger = ({
  value,
  children,
}: AccordionItemTriggerProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionTrigger must be used within AccordionRoot");

  const { openItems, toggleItem } = context;
  const isOpen = openItems.has(value);

  return (
    <div
      aria-expanded={isOpen}
      onClick={() => toggleItem(value)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

const AccordionItemContent = ({
  children,
  value,
}: AccordionItemContentProps) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionContent must be used within AccordionRoot");

  const { openItems } = context;
  const isOpen = openItems.has(value);

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight + 16);
    }
  }, [isOpen]);

  const variants = {
    open: { opacity: [0, 0.5, 1], y: 0 },
    exit: { opacity: 0, y: 50 },
    initial: { opacity: 0, y: 50 },
  };

  const motionVariants = {
    open: { opacity: [0, 1], y: [10, 0] },
    exit: { opacity: [1, 0.1, 0], y: [0, 10] },
    initial: { opacity: 0, y: 0 },
  };

  return (
    <motion.div
      role="region"
      aria-hidden={!isOpen}
      className={\`overflow-hidden px-8 py-2 text-sm transition-[height]\`}
      initial={{ height: 0 }}
      animate={{ height: isOpen ? height : 0 }}
      transition={{ duration: 0.26, ease: "easeIn" }}
    >
      <motion.div
        initial="initial"
        animate={isOpen ? "open" : "exit"}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.2,
          type: "tween",
        }}
        // className="pb-2"
        variants={motionVariants}
        ref={ref}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export {
  AccordionContext,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
};
`,
      path: "accordion/accordion.tsx",
      target: "components/sonaui/accordion/accordion.tsx"
    },
    {
      type: "registry:ui",
      content: `"use client";
import { motion } from "framer-motion";

interface AnimatedPlusMinusButtonProps {
  size?: number;
  isOpen?: boolean;
}
const AnimatedPlusMinusButton = ({
  size = 24,
  isOpen = false,
}: AnimatedPlusMinusButtonProps) => {
  return (
    <span
      role="button"
      aria-pressed="true"
      className="flex items-center justify-center"
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        {/* Horizontal line */}
        <motion.line
          x1="1"
          y1="12"
          x2="23"
          y2="12"
          stroke="currentColor"
          strokeWidth="1"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Vertical line */}
        <motion.line
          x1="12"
          y1="1"
          x2="12"
          y2="23"
          stroke="currentColor"
          strokeWidth="1"
          variants={{
            closed: { rotate: 0, opacity: 1 },
            open: { rotate: 90, opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </span>
  );
};

export default AnimatedPlusMinusButton;
`,
      path: "accordion/animated-plus-minus-button.tsx",
      target: "components/sonaui/accordion/animated-plus-minus-button.tsx"
    }
  ],
  "spinning-text": [
    {
      type: "registry:ui",
      content: `"use client";

import { motion, type Transition, type Variants } from "motion/react";
import { type CSSProperties, useMemo } from "react";

import { cn } from "@/lib/utils";

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
  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error("children must be a string or an array of strings");
  }

  const textContent = useMemo(() => {
    if (Array.isArray(children)) {
      if (!children.every((child) => typeof child === "string")) {
        throw new Error("all elements in children array must be strings");
      }
      return children.join("");
    }
    return children;
  }, [children]);

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
      visible: { rotate: reverse ? -360 : 360 },
      ...variants?.container,
    }),
    [reverse, variants],
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
      style={style}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
    >
      {characters.map((char, index) => (
        <motion.span
          aria-hidden="true"
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
  "bubble-up-button": [
    {
      type: "registry:ui",
      content: `"use client";

import { type MotionConfigProps, motion, useAnimation } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    transition: { type: "spring", stiffness: 200, damping: 40 },
  },
  className = "",
  disabled = false,
  ...props
}: BubbleUpButtonProps) {
  const controls = useAnimation();

  const handleMouseEnter = async () => {
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% 100%)",
    });
  };

  const handleMouseLeave = async () => {
    await controls.start({
      clipPath: "ellipse(120% 120% at 50% -120%)",
    });
    controls.set({ clipPath: "ellipse(0% 0% at 50% 100%)" });
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={cn(
        "relative flex h-fit w-fit cursor-pointer overflow-clip rounded-2xl border bg-black px-16 py-2",
        "transition-opacity duration-200",
        "focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      aria-label={typeof children === "string" ? children : "Bubble up button"}
      {...props}
    >
      <motion.div
        animate={controls}
        initial={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
        transition={motionControls.transition}
        className="absolute left-0 top-0 h-full w-full bg-white"
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

import { AnimatePresence, MotionConfig, type Transition } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface FanViewItem {
  /** Display label shown on the card. */
  label: string;
  /**
   * Width of the card pill in pixels.
   * @default 160
   */
  width?: number;
}

export interface FanViewProps {
  /**
   * Items displayed as fanned cards when open.
   */
  items?: FanViewItem[];
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
  stiffness = 540,
  damping = 28,
  className,
}: FanViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const springConfig: Transition = useMemo(
    () => ({ type: "spring", stiffness, damping, mass: 0.95 }),
    [stiffness, damping],
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
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <MotionConfig transition={springConfig}>
      <div
        className={cn(
          "flex min-h-[420px] w-full items-end justify-center px-4 pb-16 pt-8",
          className,
        )}
      >
        <div ref={rootRef} className="flex relative items-end justify-center">
          <AnimatePresence initial={false}>
            {isOpen &&
              positionedItems.map(
                ({ label, width = 160, x, y, rotate, zIndex }, index) => (
                  <m.button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    className="absolute bottom-0 left-1/2 cursor-pointer -translate-x-1/2"
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
                      transition: { ...springConfig, delay: index * 0.04 },
                    }}
                    exit={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0.45,
                      rotate: 0,
                      filter: "blur(10px)",
                      transition: {
                        duration: 0.18,
                        ease: "easeInOut",
                        delay: (items.length - index - 1) * 0.025,
                      },
                    }}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setIsOpen((v) => !v)}
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
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close fan view" : "Open fan view"}
            onClick={() => setIsOpen((v) => !v)}
            className={cn(
              "relative z-20 flex h-16 w-16 items-center justify-center rounded-full border",
              "border-border bg-background text-foreground shadow-lg",
              "hover:border-border/80 cursor-pointer",
            )}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
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
import { cn } from "@/lib/utils";

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
  const directionSign =
    direction === "left" || direction === "up" ? 1 : -1;

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
        countRef.current = Math.max(2, Math.ceil((containerSize * 2) / segmentSize) + 1);
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

    const segmentSize = isVertical
      ? segment.offsetHeight
      : segment.offsetWidth;
    if (segmentSize === 0) return;

    // Lerp speedMultiplier toward target (eased pause on hover)
    const targetMultiplier = isHovered.current ? 0 : 1;
    speedMultiplier.current += (targetMultiplier - speedMultiplier.current) * 0.1;

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
      pxPerMs * delta * directionSign * velocityFlip * speedMultiplier.current * velocityBoost;

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
      <div
        ref={containerRef}
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
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
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
    </div>
  );
}

// Split into a separate component to isolate motion subscription
import { motion, type MotionValue } from "motion/react";

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
      <div ref={segmentRef} style={{ paddingRight: isVertical ? 0 : gap, paddingBottom: isVertical ? gap : 0 }}>
        {children}
      </div>
      {/* Copies — decorative, aria-hidden */}
      {items.map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: decorative animation copies
        <div
          key={i}
          aria-hidden="true"
          style={{ paddingRight: isVertical ? 0 : gap, paddingBottom: isVertical ? gap : 0 }}
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

import { motion } from "motion/react";
import { type ReactNode, useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

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

export default function RippleButton({
  children,
  className,
  scaleAmount = 25,
  duration = 0.5,
  rippleStyle,
  ...props
}: RippleButtonProps) {
  const [ripple, setRipple] = useState<RippleProps | null>(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setRipple({ x, y, key: Date.now() });
    },
    [],
  );

  const buttonClasses = useMemo(
    () =>
      cn(
        "relative overflow-hidden rounded-full border border-border bg-background px-4 py-2 leading-[16px] transition-all duration-300 ease-in-out hover:cursor-pointer",
        className,
      ),
    [className],
  );

  return (
    <button
      className={buttonClasses}
      onMouseEnter={handleMouseEnter}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
            left: ripple.x,
            top: ripple.y,
            width: "10px",
            height: "10px",
            transform: "translate(-50%, -50%) scale(0)",
          }}
          animate={isHover ? { scale: scaleAmount } : { scale: 0 }}
          transition={{
            duration: isHover ? duration : 0.4,
            ease: "easeIn",
          }}
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
      role="presentation"
      aria-label="ripple-button-text"
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

import { cn } from "@/lib/utils";

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
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const background = useMotionTemplate\`radial-gradient(\${spotlightSize}px circle at \${mouseX}px \${mouseY}px, \${spotlightColor}, transparent 80%)\`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group border-border bg-secondary relative overflow-hidden rounded-xl border p-8",
        className,
      )}
      {...props}
    >
      {!disabled && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-300 transition-opacity pointer-events-none"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
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
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

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
      "AnimatedDialog subcomponents must be used within <AnimatedDialog>"
    );
  }
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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
  onOpenChange,
}: AnimatedDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
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
      <Dialog.Root open={open} onOpenChange={setOpen}>
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
        "bg-primary text-primary-foreground text-sm font-medium",
        "hover:bg-primary/90 transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className
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
      case "center":
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
      case "center":
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
    <AnimatePresence custom={resolvedExitTo}>
      {open && (
        <Dialog.Portal keepMounted>
          {/* Backdrop Overlay */}
          <Dialog.Backdrop
            render={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: "easeOut" }
                }
                className={cn(
                  "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
                  backdropClassName
                )}
              />
            }
          />

          {/* Positioner centering the popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
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
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }
                  }
                  className={cn(
                    "w-full max-w-md overflow-hidden rounded-2xl p-6",
                    "bg-popover text-popover-foreground shadow-2xl",
                    "border border-border/80",
                    className
                  )}
                >
                  {children}
                </motion.div>
              }
            />
          </div>
        </Dialog.Portal>
      )}
    </AnimatePresence>
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
        className
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
        className
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
  "animated-button": [
    {
      type: "registry:ui",
      content: `"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ─── Button Variants (CVA) ───────────────────────────────────────────────────

export const animatedButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium rounded-xl select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outlined: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.button>, "children">,
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

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
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
    ref
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
          whileTap={{ scale: 0.97 }}
          variants={containerHoverVariants}
          className={cn(
            animatedButtonVariants({ variant, size }),
            "overflow-hidden flex flex-col items-center justify-center",
            className
          )}
          {...props}
        >
          {/* Main Label Layer */}
          <motion.span
            variants={firstLayerVariants}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex items-center justify-center w-full"
          >
            {children}
          </motion.span>

          {/* Incoming Hover Label Layer */}
          <motion.span
            variants={secondLayerVariants}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
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
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 35 }
        }
        className={cn(
          animatedButtonVariants({ variant, size }),
          "overflow-hidden flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden py-0.5">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={resolvedKey}
              variants={shouldReduceMotion ? swapVariants.fade : swapVariants[swap]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 450, damping: 30 }
              }
              className="flex items-center justify-center gap-2 whitespace-nowrap min-w-max"
            >
              {children}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
export default AnimatedButton;
`,
      path: "animated-button/animated-button.tsx",
      target: "components/sonaui/animated-button/animated-button.tsx"
    }
  ],
  "vertical-tab": [
    {
      type: "registry:ui",
      content: `"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

interface VerticalTabProps {
  /** An array of tab objects, each containing a title for the tab. */
  tabs: {
    title: string;
  }[];
  /**
   * The background color of the indicator. Accepts Tailwind CSS classes.
   * @default "bg-slate-300"
   */
  indicatorBgColor?: string;
  /**
   * The background color of the active tab. Accepts Tailwind CSS classes.
   * @default "bg-slate-400 dark:bg-slate-600"
   */
  activeTabBgColor?: string;
  /**
   * Additional class names for the container element.
   * @default ""
   */
  containerClassName?: string;
}

export default function VerticalTab({
  tabs,
  indicatorBgColor = "bg-slate-300",
  activeTabBgColor = "bg-slate-400 dark:bg-slate-600",
  containerClassName = "",
}: VerticalTabProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [lastHoveredIndex, setLastHoveredIndex] = useState<number | null>(null);

  const [ref, bounds] = useMeasure();
  const tabRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (tabElement: HTMLDivElement, index: number) => {
    tabRef.current = tabElement;
    ref(tabElement); // Update the ref dynamically
    setIsMouseOver(true);
    setLastHoveredIndex(index); // Store the last hovered index
  };

  const handleMouseLeave = () => {
    tabRef.current = null;
    setIsMouseOver(false);
    ref(null); // Reset the ref when mouse leaves
  };

  const handleMouseClick = (i: number) => {
    setActiveIndex(i);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    currentIndex: number,
  ) => {
    if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    } else if (e.key === "ArrowLeft") {
      setActiveIndex((prev) => (prev - 1 + tabs.length) % tabs.length);
    }
    if (e.key === "Enter" || e.key === " ") {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <div
      className={cn(
        "relative flex w-fit overflow-x-scroll border-b p-2",
        containerClassName,
      )}
      onMouseLeave={() => handleMouseLeave()}
    >
      {isMouseOver && tabRef.current && (
        <motion.div
          className={cn(
            "absolute left-0 rounded-xl bg-slate-300 will-change-[transform_width_height] dark:bg-slate-400",
            indicatorBgColor,
          )}
          initial={{
            opacity: 0,
            width: bounds.width,
            height: bounds.height,
            translateX:
              lastHoveredIndex !== null && tabs[lastHoveredIndex]
                ? tabRef.current.offsetLeft
                : 0,
          }}
          animate={{
            opacity: 1,
            translateX: tabRef.current ? tabRef.current.offsetLeft : 0,
            width: bounds.width,
            height: bounds.height,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className="flex space-x-2" role="tablist">
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            title={tab.title}
            data-tab-index={index}
            className={cn(
              "relative flex cursor-pointer items-center p-2",
              "rounded-xl transition-colors duration-300",
              "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              index === activeIndex ? \`\${activeTabBgColor}\` : "",
            )}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleMouseClick(index)}
            aria-selected={index === activeIndex}
            aria-label={\`Tab \${index + 1}\`}
          />
        ))}
      </div>
    </div>
  );
}

interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const TabItem = ({ title, ...props }: TabItemProps) => {
  return (
    <div {...props} role="tab" tabIndex={0}>
      <span>{title}</span>
    </div>
  );
};
`,
      path: "vertical-tab/vertical-tab.tsx",
      target: "components/sonaui/vertical-tab/vertical-tab.tsx"
    }
  ],
  "animated-switch": [
    {
      type: "registry:ui",
      content: `"use client";

import { Switch } from "@base-ui/react/switch";
import { motion, useReducedMotion } from "motion/react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedSwitchProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Default checked state. */
  defaultChecked?: boolean;
  /** Callback fired when the state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /**
   * The size of the switch.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    track: "w-9 h-5 p-0.5",
    thumb: "w-4 h-4",
    xTranslate: 16, // px offset to slide right
    squishScale: 1.15,
  },
  md: {
    track: "w-11 h-6 p-0.5",
    thumb: "w-5 h-5",
    xTranslate: 20,
    squishScale: 1.2,
  },
  lg: {
    track: "w-14 h-8 p-0.5",
    thumb: "w-7 h-7",
    xTranslate: 24,
    squishScale: 1.2,
  },
};

export default function AnimatedSwitch({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  size = "md",
  className,
}: AnimatedSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const shouldReduceMotion = useReducedMotion();

  // Track if we are dragging or actively pressing (via pointer events)
  const [isPressing, setIsPressing] = useState(false);
  const trackRef = useRef<HTMLButtonElement>(null);

  const handleCheckedChange = (nextChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  const sizes = sizeClasses[size];

  // We determine the horizontal origin of the stretch based on target state:
  // If checked, pressing down should stretch from left to right.
  // If not checked, pressing down should stretch from right to left.
  const transformOrigin = checked ? "right center" : "left center";

  return (
    <Switch.Root
      ref={trackRef}
      checked={checked}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      onPointerDown={(e) => {
        if (e.button === 0 && !disabled) {
          setIsPressing(true);
          const handleRelease = () => {
            setIsPressing(false);
            window.removeEventListener("pointerup", handleRelease);
          };
          window.addEventListener("pointerup", handleRelease);
        }
      }}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes.track,
        checked ? "bg-primary" : "bg-muted",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <Switch.Thumb
        className={cn(
          "block rounded-full bg-background shadow-lg ring-0",
          sizes.thumb
        )}
        render={
          <motion.span
            style={{
              transformOrigin,
            }}
            animate={{
              x: checked ? sizes.xTranslate : 0,
              scaleX: isPressing && !disabled ? sizes.squishScale : 1,
              scaleY: isPressing && !disabled ? 0.9 : 1,
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 500,
                    damping: 32,
                  }
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

import { MotionConfig, type MotionConfigProps, motion } from "motion/react";
import { useState } from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

export type TabsData = {
  title: string;
  icon: IconType;
};

interface ExpandableTabsProps {
  /** An array of tab objects, each containing a title and an icon. */
  tabs: TabsData[];
  /**
   * Additional class names for the container element.
   * @default ""
   */
  containerClassName?: string;
  /**
   * The index of the tab that is active by default.
   * @default 0
   */
  defaultActiveIndex?: number;
  /** Motion configuration for the transition animations. */
  motionConfig?: MotionConfigProps;
}

export default function ExpandableTabs({
  tabs,
  containerClassName = "",
  defaultActiveIndex = 0,
  motionConfig = {
    transition: { duration: 0.2, ease: "easeInOut" },
  },
}: ExpandableTabsProps) {
  const [isActive, setIsActive] = useState(defaultActiveIndex);

  return (
    <motion.div
      className={cn(
        "flex space-x-2 rounded-full border bg-transparent p-2 transition-[width] will-change-[width,_contents]",
        containerClassName,
      )}
      layout
    >
      <MotionConfig {...motionConfig}>
        {tabs.map((tab, index) => (
          <motion.div
            key={index}
            role="button"
            className={cn(
              "flex cursor-pointer items-center space-x-2 overflow-clip rounded-full p-2",
              "transition-[width,_background-color] duration-300 ease-in-out",
              isActive === index && "bg-slate-300 dark:text-slate-800",
            )}
            onClick={() => setIsActive(index)}
            tabIndex={0}
          >
            <div className="grow items-center justify-center h-full">
              <tab.icon className="text-lg" aria-label={\`\${tab.title}-icon\`} />
            </div>
            <motion.span
              className="overflow-hidden leading-[1] text-sm"
              key={tab.title}
              initial={isActive === index ? "" : "inactive"}
              animate={isActive === index ? "active" : "inactive"}
              variants={TabItemVariants}
            >
              {tab.title}
            </motion.span>
          </motion.div>
        ))}
      </MotionConfig>
    </motion.div>
  );
}

const TabItemVariants = {
  active: {
    opacity: 1,
    width: "auto",
    y: 0,
  },
  inactive: {
    opacity: 0,
    width: 0,
    y: 20,
  },
};
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

import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      style={style}
      {...props}
    >
      <MeshGradient
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        speed={speed}
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

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import useMeasure from "react-use-measure";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
  const [previewRef, previewBounds] = useMeasure();
  const [containerRef, containerBounds] = useMeasure();
  const desktop = useMediaQuery("(min-width: 768px)");

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <Link
        href={link}
        className="inline-flex relative items-center underline underline-offset-3 cursor-pointer"
        onMouseEnter={(e) => {
          if (!desktop) return;
          e.preventDefault();
          setIsHover(true);
        }}
        onClick={(e) => {
          if (!desktop) return;
          e.preventDefault();
          setIsHover((prev) => !prev);
        }}
        onMouseLeave={() => {
          if (isHover) {
            setIsHover(false);
          }
        }}
        onFocus={(e) => {
          e.preventDefault();
          setIsHover(true);
        }}
        onBlur={() => setIsHover(false)}
        ref={containerRef}
      >
        {text}
        {showIcon && (
          <span className="ml-1 text-sm">
            <FaArrowUpRightFromSquare />
          </span>
        )}
      </Link>
      <AnimatePresence>
        {isHover && desktop && (
          <motion.div
            ref={previewRef}
            className="overflow-clip absolute z-50 w-fit bg-slate-100 dark:bg-slate-600 border border-slate-400 rounded-xl shadow-xl origin-center"
            style={{
              left: containerBounds.left - previewBounds.width / 2,
              top: containerBounds.top - previewBounds.height,
            }}
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: 1, width: "fit-content", height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <motion.div className="flex flex-col gap-y-2 px-4 py-2 w-fit rounded-xl">
              <div className="flex justify-between w-full text-sm">
                External Link
                <Link href={link}>
                  <FaArrowUpRightFromSquare />
                </Link>
              </div>
              <Link
                href={link}
                className="text-nowrap underline"
                {...linkProps}
              >
                {link}
              </Link>
            </motion.div>
          </motion.div>
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

import { motion, type Variants } from "motion/react";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

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
}: StaggerTextProps<StaggerTextEleType>) {
  const Tag = as; // Explicitly type as a React component
  const [activeIndex, setActiveIndex] = useState(5);
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <h1 className="sr-only">{text}</h1>
      <Tag
        className={cn("overflow-clip tracking-wide select-text", className)}
        aria-label={text}
        onCopy={(e) => {
          e.preventDefault();
          e.clipboardData.setData("text/plain", text);
        }}
      >
        {text.split("").map((char, i) => {
          const delay = Math.abs(activeIndex - i);
          return (
            <StaggerTextItem
              char={char}
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
    </>
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

import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

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
  /** Additional CSS classes for the button. */
  className?: string;
}

export default function HoldToDeleteButton({
  label = "Hold To Delete",
  holdDuration = 2000,
  successDuration = 1200,
  onDelete,
  className,
}: HoldToDeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (isCompleted) return;
    cancelHold();
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false);
      setIsCompleted(true);
      onDelete?.();
    }, holdDuration);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: successDuration is stable per render
  useEffect(() => {
    if (!isCompleted) return;
    successTimerRef.current = setTimeout(resetState, successDuration);
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [isCompleted]);

  useEffect(
    () => () => {
      cancelHold();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  return (
    <m.button
      layout
      layoutId="hold-to-delete-button"
      type="button"
      className={cn(
        "relative cursor-pointer overflow-clip rounded-full border-2 px-6 py-3 font-medium",
        className,
      )}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onPointerDown={handlePointerDown}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-red-400"
        style={{
          clipPath: isHolding ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: isHolding
            ? \`clip-path \${holdDuration}ms linear\`
            : "clip-path 200ms ease-out",
        }}
      />
      <span className="relative text-xl">
        {isCompleted ? "Deleted!" : label}
      </span>
    </m.button>
  );
}
`,
      path: "hold-to-delete-button/hold-to-delete-button.tsx",
      target: "components/sonaui/hold-to-delete-button/hold-to-delete-button.tsx"
    }
  ]
};

export const componentMetadata = {
  "animated-dropdown": {
    "name": "animated-dropdown",
    "type": "registry:ui",
    "title": "Animated Dropdown",
    "description": "A composable, accessible dropdown menu built on Base UI with a spring-driven shared hover highlight and origin-aware scale/fade enter-exit animation.",
    "files": [
      {
        "path": "registry/sonaui/animated-dropdown/animated-dropdown.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "@base-ui/react",
      "motion"
    ]
  },
  "animated-switch": {
    "name": "animated-switch",
    "type": "registry:ui",
    "title": "Animated Switch",
    "description": "An interactive iOS-style squish switch built on Base UI Switch primitives, morphing the thumb on press and translating it with a snappy physics-based spring.",
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
    "description": "A composable, accessible dialog modal built on Base UI Dialog with custom direction-aware slide and fade animations powered by Framer Motion.",
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
    "description": "A button layout component that animates width shifts during content changes, transitions label swaps, and supports an iOS-style hover text-swap effect.",
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
      "@paper-design/shaders-react"
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
      "@paper-design/shaders-react"
    ]
  },
  "magnetic": {
    "name": "magnetic",
    "type": "registry:ui",
    "title": "Magnetic",
    "description": "The `MagneticButton` component is an interactive UI element that creates a magnetic effect, pulling the cursor towards the button when it is within a certain range. This component is highly customizable and provides a unique user experience.",
    "files": [
      {
        "path": "registry/sonaui/magnetic-button/magnetic-button.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": []
  },
  "vertical-tab": {
    "name": "vertical-tab",
    "type": "registry:ui",
    "title": "VerticalTab",
    "description": "The `VerticalTab` component is a versatile and interactive UI element designed for creating vertical tabbed navigation. It provides a smooth user experience with dynamic indicator transitions and customizable styles.",
    "files": [
      {
        "path": "registry/sonaui/vertical-tab/vertical-tab.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "react-use-measure"
    ]
  },
  "accordion": {
    "name": "accordion",
    "type": "registry:ui",
    "title": "Accordion",
    "description": "The `Accordion` component allows you to toggle the visibility of content sections. It is useful for FAQs, menus, and more.",
    "files": [
      {
        "path": "registry/sonaui/accordion/accordion.tsx",
        "type": "registry:ui"
      },
      {
        "path": "registry/sonaui/accordion/animated-plus-minus-button.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "class-variance-authority",
      "motion"
    ]
  },
  "ripple-button": {
    "name": "ripple-button",
    "type": "registry:ui",
    "title": "RippleButton",
    "description": "An interactive button with a ripple effect for modern UIs.",
    "files": [
      {
        "path": "registry/sonaui/ripple-button/ripple-button.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": []
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
    "dependencies": []
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
    "dependencies": []
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
    "dependencies": []
  },
  "expandable-tabs": {
    "name": "expandable-tabs",
    "type": "registry:ui",
    "title": "ExpandableTabs",
    "description": "The `ExpandableTabs` component is a dynamic and interactive UI element designed for creating horizontal tabbed navigation.",
    "files": [
      {
        "path": "registry/sonaui/expandable-tabs/expandable-tabs.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "react-icons"
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
    "description": "A button that reveals a destructive fill animation while held, triggering a callback only after the full hold duration completes.",
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
    "description": "A circular trigger button that fans items out in a radial arc with spring animations.",
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
    "description": "A trigger button that spreads labeled cards into a fanned arc layout with staggered spring animations.",
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
