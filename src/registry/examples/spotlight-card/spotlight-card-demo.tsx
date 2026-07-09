import SpotlightCard from "@/registry/sonaui/spotlight-card/spotlight-card";

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
