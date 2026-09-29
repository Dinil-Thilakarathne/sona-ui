import { ArrowUpRight } from "lucide-react";

import ExpandableDataCard from "@/registry/sonaui/expandable-data-card/expandable-data-card";

const sources = [
  { name: "Subscriptions", amount: "$24,840", share: "62%" },
  { name: "One-time", amount: "$10,320", share: "26%" },
  { name: "Services", amount: "$4,660", share: "12%" },
];

export function RevenueDataCard({
  title = "Total revenue",
}: {
  title?: string;
}) {
  return (
    <ExpandableDataCard
      title={title}
      summary={
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="text-3xl font-semibold tracking-tight tabular-nums">
              $39,820
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Sep 1 to Sep 30</p>
          </div>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
            +12.8%
          </span>
        </div>
      }
    >
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Revenue by source</span>
        <span>Sep 1 to Sep 30</span>
      </div>
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name} className="flex items-center gap-3 text-sm">
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {source.name}
            </span>
            <span className="font-medium tabular-nums">{source.amount}</span>
            <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
              {source.share}
            </span>
          </div>
        ))}
      </div>
    </ExpandableDataCard>
  );
}

export default function ExpandableDataCardDemo() {
  return (
    <div className="flex min-h-80 w-full items-start justify-center px-5 py-14">
      <RevenueDataCard />
    </div>
  );
}
