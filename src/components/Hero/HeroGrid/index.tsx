import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import ExpandableTabs_ex from "@/registry/example/ExpandableTabs_ex";
import Magnetic_ex from "@/registry/example/MagneticButton_ex";
import RippleButton_ex from "@/registry/example/RippleButton_ex";
import VerticalTab_ex from "@/registry/example/VerticalTab_ex";

const HERO_GRID_ITEMS = [
  {
    component: <VerticalTab_ex />,
    className: "col-span-2",
  },
  {
    component: <ExpandableTabs_ex />,
    className: "col-span-2",
  },
  {
    component: <RippleButton_ex />,
  },
  {
    component: <Magnetic_ex />,
  },
];

export default function HeroGrid() {
  return (
    <div className="hidden max-h-[calc(100vh-75px)] grid-cols-2 grid-rows-2 gap-2 py-8 lg:grid">
      {HERO_GRID_ITEMS.map((item, index) => (
        <GridItem key={index} className={cn(item.className)}>
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
