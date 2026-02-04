// This file is auto-generated. Do not edit.
import * as React from "react";
import magnetic_button_magnetic_button_demo from "@/registry/examples/magnetic-button/magnetic-button-demo";
import accordion_accordion_splitted from "@/registry/examples/accordion/accordion-splitted";
import accordion_accordion_demo from "@/registry/examples/accordion/accordion-demo";
import accordion_accordion_multistep from "@/registry/examples/accordion/accordion-multistep";
import accordion_accordion_outlined from "@/registry/examples/accordion/accordion-outlined";
import spinning_text_spinning_text_demo from "@/registry/examples/spinning-text/spinning-text-demo";
import bubble_up_button_bubble_up_button_demo from "@/registry/examples/bubble-up-button/bubble-up-button-demo";
import marquee_marquee_demo from "@/registry/examples/marquee/marquee-demo";
import ripple_button_ripple_button_demo from "@/registry/examples/ripple-button/ripple-button-demo";
import vertical_tab_vertical_tab_demo from "@/registry/examples/vertical-tab/vertical-tab-demo";
import expandable_tabs_expandable_tabs_demo from "@/registry/examples/expandable-tabs/expandable-tabs-demo";
import link_preview_link_preview_demo from "@/registry/examples/link-preview/link-preview-demo";
import stagger_text_stagger_text_demo from "@/registry/examples/stagger-text/stagger-text-demo";

export type RegistryEntry = {
  name: string;
  component: React.ComponentType;
  code: string;
  imports: string;
  anatomy: string;
};

export const exampleRegistry: Record<string, RegistryEntry[]> = {
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
  "marquee": [
    {
      name: "default",
      component: marquee_marquee_demo,
      code: `import { type ReactNode } from "react";

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
      imports: `import { type ReactNode } from "react";

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
      code: `import { type ReactNode } from "react";

import RippleButton, {
  RippleButtonText,
  RippleButtonTextProps,
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
      imports: `import { type ReactNode } from "react";

import RippleButton, {
  RippleButtonText,
  RippleButtonTextProps,
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
import { type IconType } from "react-icons";

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
import { type IconType } from "react-icons";

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
  children: ReactNode;
  magneticIntensity?: number;
  magneticRange?: number;
  interactionArea?: "self" | "parent";
  springConfig?: SpringOptions;
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
} from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import AnimatedPlusMinusButton from "./animated-plus-minus-button";
import { cva, type VariantProps } from "class-variance-authority";

// Types
type AccordionVariant = "default" | "outlined" | "splitted";

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
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
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const accordionItemVariants = cva(
  "relative overflow-hidden bg-background text-foreground",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        outlined:
          "border-foreground border-t border-x last:border-b first:rounded-t-2xl last:rounded-b-2xl",
        splitted: "rounded-2xl ",
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
} | null>(null);

const AccordionRoot = ({
  children,
  allowMultiple = false,
  className,
  variant = "default",
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        if (!allowMultiple) newOpenItems.clear();
        newOpenItems.add(value);
      }
      return newOpenItems;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, variant }}>
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
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({
  children,
  className,
  style,
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

  return (
    <motion.div
      role="region"
      aria-hidden={!isOpen}
      className={\`overflow-hidden px-8 py-2 text-sm transition-[height] duration-300\`}
      initial={{ height: 0 }}
      animate={{ height: isOpen ? height : 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <motion.div
        initial="initial"
        animate={isOpen ? "open" : "exit"}
        transition={{
          duration: 0.4,
          ease: "easeIn",
          delay: 0.3,
          type: "tween",
        }}
        // className="pb-2"
        variants={variants}
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

import { CSSProperties, useMemo } from "react";
import { motion, type Transition, Variants } from "motion/react";

import { cn } from "@/lib/utils";

type SpinningTextProps = {
  children: string | string[];
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  radius?: number;
  transition?: Transition;
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

  const finalTransition  = useMemo(
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
import { motion, MotionConfigProps, useAnimation } from "motion/react";
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
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
  reverse?: boolean;
  activeScroll?: boolean;
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

import { useState, useCallback, useMemo, type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  scaleAmount?: number;
  className?: string;
  duration?: number;
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
      className={cn("text-background dark:text-foreground mix-blend-difference", className)}
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
  "vertical-tab": [
    {
      type: "registry:ui",
      content: `"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

interface VerticalTabProps {
  tabs: {
    title: string;
  }[];
  indicatorBgColor?: string;
  activeTabBgColor?: string;
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
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

export type TabsData = {
  title: string;
  icon: IconType;
};

interface ExpandableTabsProps {
  tabs: TabsData[];
  containerClassName?: string;
  defaultActiveIndex?: number;
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
  link: string;
  text: string;
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
    text: string;
    className?: string;
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
  "verticalTab": {
    "name": "verticalTab",
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
  "rippleButton": {
    "name": "rippleButton",
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
  "spinningText": {
    "name": "spinningText",
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
  "staggerText": {
    "name": "staggerText",
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
  "linkPreview": {
    "name": "linkPreview",
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
  "bubbleUpButton": {
    "name": "bubbleUpButton",
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
  "expandableTabs": {
    "name": "expandableTabs",
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
  }
};
