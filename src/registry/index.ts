// This file is auto-generated. Do not edit.
import * as React from "react";
import circular_dock_menu_circular_dock_menu_demo from "@/registry/examples/circular-dock-menu/circular-dock-menu-demo";
import magnetic_button_magnetic_button_demo from "@/registry/examples/magnetic-button/magnetic-button-demo";
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
import vertical_tab_vertical_tab_demo from "@/registry/examples/vertical-tab/vertical-tab-demo";
import expandable_tabs_expandable_tabs_demo from "@/registry/examples/expandable-tabs/expandable-tabs-demo";
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
  "circular-dock-menu": [
    {
      name: "default",
      component: circular_dock_menu_circular_dock_menu_demo,
      code: `"use client";

import { BookOpen, Clapperboard, FileText, ImageIcon, Music } from "lucide-react";

import CircularDockMenu from "@/registry/sonaui/circular-dock-menu/circular-dock-menu";

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

import { BookOpen, Clapperboard, FileText, ImageIcon, Music } from "lucide-react";

import CircularDockMenu from "@/registry/sonaui/circular-dock-menu/circular-dock-menu";

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
      code: `import Magnetic from "@/registry/sonaui/magnetic-button/magnetic-button";

export default function MagneticButtonExample() {
  return (
    <div className="border-border rounded-full border border-dashed p-2">
      <Magnetic interactionArea="parent">
        <button className="bg-background text-foreground cursor-pointer rounded-full px-6 py-4 font-semibold">
          Magnetic Button
        </button>
      </Magnetic>
    </div>
  );
}
`,
      imports: `import Magnetic from "@/registry/sonaui/magnetic-button/magnetic-button";`,
      anatomy: `export default function MagneticButtonExample() {
  return (
    <div className="border-border rounded-full border border-dashed p-2">
      <Magnetic interactionArea="parent">
        <button className="bg-background text-foreground cursor-pointer rounded-full px-6 py-4 font-semibold">
          Magnetic Button
        </button>
      </Magnetic>
    </div>
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
} from "@/registry/sonaui/accordion/accordion";

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
} from "@/registry/sonaui/accordion/accordion";`,
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
} from "@/registry/sonaui/accordion/accordion";

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
} from "@/registry/sonaui/accordion/accordion";`,
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
} from "@/registry/sonaui/accordion/accordion";

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
} from "@/registry/sonaui/accordion/accordion";`,
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
} from "@/registry/sonaui/accordion/accordion";

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
} from "@/registry/sonaui/accordion/accordion";`,
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
} from "@/registry/sonaui/accordion/accordion";

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
} from "@/registry/sonaui/accordion/accordion";`,
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
      code: `import SpinningText from "@/registry/sonaui/spinning-text/spinning-text";

export default function SpinningTextExample() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <SpinningText>This is example text!</SpinningText>
    </div>
  );
};
`,
      imports: `import SpinningText from "@/registry/sonaui/spinning-text/spinning-text";`,
      anatomy: `export default function SpinningTextExample() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <SpinningText>This is example text!</SpinningText>
    </div>
  );
};`,
    }
  ],
  "bubble-up-button": [
    {
      name: "default",
      component: bubble_up_button_bubble_up_button_demo,
      code: `import BubbleUpButton from "@/registry/sonaui/bubble-up-button/bubble-up-button";

export default function BubbleUpButtonExample() {
  return <BubbleUpButton className="bg-background">Hover me!</BubbleUpButton>;
}
`,
      imports: `import BubbleUpButton from "@/registry/sonaui/bubble-up-button/bubble-up-button";`,
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

import FanView from "@/registry/sonaui/fan-view/fan-view";

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

import FanView from "@/registry/sonaui/fan-view/fan-view";

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
import Marquee from "@/registry/sonaui/marquee/marquee";

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
    <Marquee duration={10} containerClassName="md:space-x-16 " activeHover>
      <div className="flex items-center gap-x-8 md:gap-x-16">
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
    <div className="flex h-16 shrink items-center gap-x-4">
      <span className="*:xl:h-16 *:xl:w-16">{children}</span>
      <span className="text-sm font-medium lg:text-lg">{text}</span>
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
import Marquee from "@/registry/sonaui/marquee/marquee";`,
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
    <Marquee duration={10} containerClassName="md:space-x-16 " activeHover>
      <div className="flex items-center gap-x-8 md:gap-x-16">
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
    <div className="flex h-16 shrink items-center gap-x-4">
      <span className="*:xl:h-16 *:xl:w-16">{children}</span>
      <span className="text-sm font-medium lg:text-lg">{text}</span>
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
} from "@/registry/sonaui/ripple-button/ripple-button";

interface LocalRippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  scaleAmount?: number;
  className?: string;
  duration?: number;
  rippleStyle?: string;
}

interface RippleButtonEx1Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
};
`,
      imports: `import type { ReactNode } from "react";

import RippleButton, {
  RippleButtonText,
  type RippleButtonTextProps,
} from "@/registry/sonaui/ripple-button/ripple-button";`,
      anatomy: `interface LocalRippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  scaleAmount?: number;
  className?: string;
  duration?: number;
  rippleStyle?: string;
}

interface RippleButtonEx1Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
};`,
    }
  ],
  "spotlight-card": [
    {
      name: "default",
      component: spotlight_card_spotlight_card_demo,
      code: `import SpotlightCard from "@/registry/sonaui/spotlight-card/spotlight-card";

export default function SpotlightCardExample() {
  return (
    <SpotlightCard className="max-w-sm">
      <h3 className="text-foreground text-lg font-semibold">Spotlight Card</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        Move your cursor across the card to reveal the spotlight that follows
        your pointer.
      </p>
    </SpotlightCard>
  );
}
`,
      imports: `import SpotlightCard from "@/registry/sonaui/spotlight-card/spotlight-card";`,
      anatomy: `export default function SpotlightCardExample() {
  return (
    <SpotlightCard className="max-w-sm">
      <h3 className="text-foreground text-lg font-semibold">Spotlight Card</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        Move your cursor across the card to reveal the spotlight that follows
        your pointer.
      </p>
    </SpotlightCard>
  );
}`,
    }
  ],
  "vertical-tab": [
    {
      name: "default",
      component: vertical_tab_vertical_tab_demo,
      code: `import VerticalTab from "@/registry/sonaui/vertical-tab/vertical-tab";

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
      imports: `import VerticalTab from "@/registry/sonaui/vertical-tab/vertical-tab";`,
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
  "expandable-tabs": [
    {
      name: "default",
      component: expandable_tabs_expandable_tabs_demo,
      code: `"use client";

import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "@/registry/sonaui/expandable-tabs/expandable-tabs";
import type { IconType } from "react-icons";

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

import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "@/registry/sonaui/expandable-tabs/expandable-tabs";
import type { IconType } from "react-icons";

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
  "link-preview": [
    {
      name: "default",
      component: link_preview_link_preview_demo,
      code: `import LinkPreview from "@/registry/sonaui/link-preview/link-preview";

export default function LinkPreviewExample() {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <h3>Projects that I works on!!!</h3>
      <ul className="list-disc *:ml-2 *:lg:ml-4">
        <li>
          Sona UI - Open Source UI Component Library :{" "}
          <LinkPreview
            link="https://sona-ui.vercel.app/"
            text="Sona UI"
            className="flex h-full w-full items-center justify-center"
          />
        </li>
      </ul>
    </div>
  );
}
`,
      imports: `import LinkPreview from "@/registry/sonaui/link-preview/link-preview";`,
      anatomy: `export default function LinkPreviewExample() {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <h3>Projects that I works on!!!</h3>
      <ul className="list-disc *:ml-2 *:lg:ml-4">
        <li>
          Sona UI - Open Source UI Component Library :{" "}
          <LinkPreview
            link="https://sona-ui.vercel.app/"
            text="Sona UI"
            className="flex h-full w-full items-center justify-center"
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
      code: `import StaggerText from "@/registry/sonaui/stagger-text/stagger-text";

export default function StaggerTextExample() {
  return <StaggerText text="Stagger Text!!" />;
}
`,
      imports: `import StaggerText from "@/registry/sonaui/stagger-text/stagger-text";`,
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

import HoldToDeleteButton from "@/registry/sonaui/hold-to-delete-button/hold-to-delete-button";
import { toast } from "sonner";

export default function HoldToDeleteButtonDemo() {
  return (
    <div className="flex items-center justify-center py-12">
      <HoldToDeleteButton onDelete={() => toast.success("Successfully deleted")} />
    </div>
  );
}
`,
      imports: ``,
      anatomy: `"use client";

import HoldToDeleteButton from "@/registry/sonaui/hold-to-delete-button/hold-to-delete-button";
import { toast } from "sonner";

export default function HoldToDeleteButtonDemo() {
  return (
    <div className="flex items-center justify-center py-12">
      <HoldToDeleteButton onDelete={() => toast.success("Successfully deleted")} />
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
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" | "false" }>;
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
    () => items.map((item, index) => ({ ...item, ...getArcPosition(index, items.length) })),
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
      <div className={cn("flex min-h-[520px] w-full items-center justify-center overflow-hidden px-4 py-10", className)}>
        <div ref={rootRef} className="relative h-[440px] w-full max-w-[520px]">
          <AnimatePresence initial={false}>
            {isOpen &&
              positionedItems.map(({ label, icon: Icon, x, y, rotate }, index) => (
                <m.div
                  key={label}
                  className="absolute bottom-12 left-1/2 z-10"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.56, rotate: 8, filter: "blur(10px)" }}
                  animate={{
                    x, y, opacity: 1, scale: 1, rotate,
                    filter: "blur(0px)",
                    transition: { ...springConfig, delay: (items.length - index - 1) * 0.045 },
                  }}
                  exit={{
                    x: 0, y: 0, opacity: 0, scale: 0.48, rotate: 10,
                    filter: "blur(10px)",
                    transition: { duration: 0.2, ease: "easeInOut", delay: index * 0.025 },
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
                    <Icon aria-hidden="true" className="text-muted-foreground size-6" strokeWidth={2} />
                    <span>{label}</span>
                  </m.button>
                </m.div>
              ))}
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
            <m.span className="relative block size-9" animate={isOpen ? "open" : "closed"} initial={false}>
              <m.span
                className="bg-foreground absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full"
                variants={{ closed: { rotate: 0 }, open: { rotate: 45 } }}
              />
              <m.span
                className="bg-foreground absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full"
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

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "motion/react";
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
  "accordion": [
    {
      type: "registry:ui",
      content: `"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
  ViewTransition,
} from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import AnimatedPlusMinusButton from "./animated-plus-minus-button";
import styles from "./styles.module.css";
import { cva, type VariantProps } from "class-variance-authority";

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
  extends
    React.HTMLAttributes<HTMLDivElement>,
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
    <div className="flex items-center justify-between rounded-xl px-8 pt-4 font-medium text-balance">
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
  AccordionRoot,
  AccordionItem,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionContext,
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
          className="absolute top-1/2 left-1/2 inline-block"
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

import type { ReactNode } from "react";
import { motion, type MotionConfigProps, useAnimation } from "motion/react";
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
        className="absolute top-0 left-0 h-full w-full bg-white"
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
  const progress = total <= 1 ? 0 : index / (total / 2);
  const curve = progress;
  return {
    x: 40 - progress * 18 - curve * 28,
    y: -340 + progress * 170,
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
    () => items.map((item, index) => ({ ...item, ...getFanPoint(index, items.length) })),
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
      <div className={cn("flex min-h-[560px] w-full items-center justify-center px-4 py-8", className)}>
        <div ref={rootRef} className="relative h-[700px] w-full max-w-[700px]">
          <AnimatePresence initial={false}>
            {isOpen &&
              positionedItems.map(({ label, width = 160, x, y, zIndex }, index) => (
                <m.button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  className={cn(
                    "absolute bottom-4 left-1/2 flex -translate-x-[40%] items-center gap-3",
                    "cursor-pointer",
                  )}
                  style={{ width, zIndex }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.55, filter: "blur(10px)" }}
                  animate={{
                    x, y, opacity: 1, scale: 1,
                    filter: "blur(0px)",
                    rotate: 4 * (items.length - index - 1),
                    transition: { ...springConfig, delay: (items.length - index - 1) * 0.045 },
                  }}
                  exit={{
                    x: 0, y: 0, opacity: 0, scale: 0.45,
                    filter: "blur(10px)",
                    transition: { duration: 0.2, ease: "easeInOut", delay: index * 0.025 },
                  }}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsOpen((v) => !v)}
                >
                  <span className={cn(
                    "flex h-12 items-center justify-center rounded-xl border px-5",
                    "border-border bg-foreground text-background shadow-sm",
                    "text-[17px] font-medium whitespace-nowrap",
                  )}>
                    {label}
                  </span>
                </m.button>
              ))}
          </AnimatePresence>

          <m.button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close fan view" : "Open fan view"}
            onClick={() => setIsOpen((v) => !v)}
            className={cn(
              "absolute bottom-0 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border",
              "border-border bg-background text-foreground shadow-lg",
              "hover:border-border/80 cursor-pointer",
            )}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            <m.span className="relative block size-8" animate={isOpen ? "open" : "closed"} initial={false}>
              <m.span
                className="bg-foreground absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full"
                variants={{ closed: { rotate: 0 }, open: { rotate: 45 } }}
              />
              <m.span
                className="bg-foreground absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full"
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

import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

// Constants
const DEFAULT_DURATION = 10; // Default duration in seconds

// Helper function to calculate the number of marquee items
const calculateItemCount = (
  containerWidth: number,
  itemWidth: number,
): number => {
  return Math.ceil(containerWidth / itemWidth);
};

interface MarqueeProps {
  /** The content to be rendered inside the marquee. */
  children: React.ReactNode;
  /** Additional class names for custom styling of the marquee items. */
  className?: string;
  /** Additional class names for custom styling of the marquee container. */
  containerClassName?: string;
  /**
   * The duration of the marquee animation in seconds.
   * @default 10
   */
  duration?: number;
  /**
   * Determines whether the marquee scrolls in reverse direction.
   * @default false
   */
  reverse?: boolean;
  /**
   * Enables dynamic speed adjustment based on scroll velocity.
   * @default false
   */
  activeScroll?: boolean;
  /**
   * Pauses the marquee animation when hovered.
   * @default false
   */
  activeHover?: boolean;
}

export default function Marquee({
  children,
  className,
  containerClassName,
  duration = DEFAULT_DURATION,
  reverse = false,
  activeScroll = false,
  activeHover = false,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [parentBounds, setParentBounds] = useState({ width: 0, height: 0 });
  const [marqueeItemRef, marqueeItemBounds] = useMeasure();
  const [count, setCount] = useState(0);
  const [activeDirection, setActiveDirection] = useState<boolean>(false);
  const [speed, setSpeed] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  useEffect(() => {
    if (ref.current && isClient) {
      if (ref.current.parentElement) {
        const { width, height } =
          ref.current.parentElement.getBoundingClientRect();
        setParentBounds({ width, height });
      }
    }
  }, [ref, isClient]);

  // Update item count when dimensions change
  useEffect(() => {
    if (marqueeItemBounds.width > 0 && parentBounds.width > 0) {
      setCount(calculateItemCount(parentBounds.width, marqueeItemBounds.width));
    }
  }, [marqueeItemBounds, parentBounds, children]);

  // Update active direction based on velocity
  useEffect(() => {
    return velocityFactor.on("change", (value) => {
      setActiveDirection(value < 0);
    });
  }, [velocityFactor]);

  // Update speed dynamically based on velocity factor
  useEffect(() => {
    const unsubscribe = velocityFactor.on("change", (value) => {
      setSpeed(activeScroll && value > 0 ? value : 1);
    });

    return () => unsubscribe();
  }, [velocityFactor, activeScroll]);

  // Update speed when hovered
  useEffect(() => {
    if (!activeHover) return;
    if (isHovered) {
      setSpeed(0);
    } else {
      setSpeed(activeScroll ? velocityFactor.get() : 1);
    }
  }, [isHovered, activeScroll, velocityFactor, activeHover]);

  const clock = useClock({
    defaultValue: Date.now(),
    reverse: activeScroll ? activeDirection : reverse,
    speed,
  }).value;

  const progress = useTransform(clock, (time) => (time % duration) / duration);
  const percentage = useTransform(progress, (t) => t * 100);
  const translateX = useMotionTemplate\`-\${percentage}%\`;

  return (
    isClient && (
      <motion.div
        style={{ translateX }}
        className={cn("flex w-fit space-x-16", containerClassName)}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MarqueeItem className={className} ref={marqueeItemRef}>
          {children}
        </MarqueeItem>
        {Array.from({ length: count }).map((_, i) => (
          <MarqueeItem
            key={i}
            isCopy
            style={{ left: \`calc(\${(i + 1) * 100}%)\` }}
          >
            {children}
          </MarqueeItem>
        ))}
      </motion.div>
    )
  );
}

interface MarqueeItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  isCopy?: boolean;
}

const MarqueeItem = forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ children, className, isCopy, style }, ref) => {
    return (
      <div
        className={cn("w-full text-nowrap", isCopy && "absolute", className)}
        style={style}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

MarqueeItem.displayName = "MarqueeItem";
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
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
  "expandable-tabs": [
    {
      type: "registry:ui",
      content: `"use client";

import { useState } from "react";
import { motion, MotionConfig, type MotionConfigProps } from "motion/react";
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
            <div className="h-full grow items-center justify-center">
              <tab.icon className="text-lg" aria-label={\`\${tab.title}-icon\`} />
            </div>
            <motion.span
              className="overflow-hidden text-sm leading-[1]"
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
  "link-preview": [
    {
      type: "registry:ui",
      content: `"use client";

import { useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";
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
        className="relative inline-flex cursor-pointer items-center underline underline-offset-3"
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
            className="absolute z-50 w-fit origin-center overflow-clip rounded-xl border border-slate-400 bg-slate-100 shadow-xl dark:bg-slate-600"
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
            <motion.div className="flex w-fit flex-col gap-y-2 rounded-xl px-4 py-2">
              <div className="flex w-full justify-between text-sm">
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
import { useState, type ReactNode } from "react";

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
      <h1 className="sr-only">
        {text}
      </h1>
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
      className="relative inline-flex flex-col"
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
        className="absolute top-[0] left-0 h-fit w-full select-text"
        style={{ translate: "0 100%" }}
        {...props}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <motion.span
      className="h-fit select-none"
      aria-hidden="true"
      {...props}
    >
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
    "description": "The `Marquee` component is a versatile UI element that creates a scrolling marquee effect. It is highly customizable and can adapt to various use cases, such as displaying text or other content in a continuous loop.",
    "files": [
      {
        "path": "registry/sonaui/marquee/marquee.tsx",
        "type": "registry:ui"
      }
    ],
    "dependencies": [
      "react-use-measure"
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
