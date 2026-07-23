import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/registry/sonaui/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button>
        Get started <ArrowRight className="size-4" />
      </Button>
      <Button variant="outlined">Learn more</Button>
      <Button variant="secondary">
        <Sparkles className="size-4" /> Explore
      </Button>
    </div>
  );
}
