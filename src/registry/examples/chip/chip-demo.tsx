import { Check } from "lucide-react";
import Chip from "@/registry/sonaui/chip/chip";

export default function ChipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip>
        <Chip.Label>Default</Chip.Label>
      </Chip>
      <Chip tone="success">
        <Chip.Icon aria-hidden="true">
          <Check />
        </Chip.Icon>
        <Chip.Label>Ready</Chip.Label>
      </Chip>
      <Chip tone="warning">
        <Chip.Label>Beta</Chip.Label>
      </Chip>
      <Chip tone="danger">
        <Chip.Label>Deprecated</Chip.Label>
      </Chip>
    </div>
  );
}
