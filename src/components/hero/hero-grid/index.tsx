import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import AnimatedTabsExample from "@/registry/examples/animated-tabs/animated-tabs-demo";
import ExpandableTabs_ex from "@/registry/examples/expandable-tabs/expandable-tabs-demo";
import Magnetic_ex from "@/registry/examples/magnetic-button/magnetic-button-demo";
import RippleButton_ex from "@/registry/examples/ripple-button/ripple-button-demo";

const HERO_GRID_ITEMS = [
  {
    id: "animated-tabs",
    component: <AnimatedTabsExample />,
    className: "col-span-2",
  },
  {
    id: "expandable-tabs",
    component: <ExpandableTabs_ex />,
    className: "col-span-2",
  },
  {
    id: "ripple-button",
    component: <RippleButton_ex />,
  },
  {
    id: "magnetic-button",
    component: <Magnetic_ex />,
  },
];

export default function HeroGrid() {
  return (
    <div className="grid-cols-2 grid-rows-2 hidden lg:grid gap-2 py-8 max-h-[calc(100vh-75px)]">
      {HERO_GRID_ITEMS.map((item) => (
        <GridItem key={item.id} className={cn(item.className)}>
          {item.component}
        </GridItem>
      ))}
    </div>
  );
}

type GridItemProps = {
  children: ReactNode;
  className?: string;
};

const GridItem = ({ children, className }: GridItemProps) => {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center rounded-lg border border-slate-100 shadow-md shadow-slate-400 *:h-full *:border-0 dark:shadow-slate-600",
        className,
      )}
    >
      {children}
    </div>
  );
};
