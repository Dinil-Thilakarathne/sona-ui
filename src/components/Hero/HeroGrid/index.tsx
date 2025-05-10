import { cn } from "@/lib/utils";
import Fade from "@/components/Common/Fade";
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
    <div className="grid max-h-[calc(100vh-75px)] grid-cols-2 grid-rows-2 gap-2 px-4 py-8">
      {HERO_GRID_ITEMS.map((item, index) => (
        <GridItem key={index} className={cn(item.className)} index={index}>
          {item.component}
        </GridItem>
      ))}
    </div>
  );
}

type GridItemProps = {
  children: React.ReactNode;
  index: number;
  className?: string;
};

const GridItem = ({ children, className, index }: GridItemProps) => {
  return (
    <Fade
      preset="Fade-up"
      delay={0.2 + index * 0.1}
      containerClasses={className}
      className="flex h-full items-center justify-center rounded-lg border border-slate-100 shadow-md shadow-slate-400 *:h-full *:border-0 dark:shadow-slate-600"
    >
      {children}
    </Fade>
  );
};
