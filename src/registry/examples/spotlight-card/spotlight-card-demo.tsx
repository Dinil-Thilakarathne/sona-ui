import SpotlightCard from "@/registry/sonaui/spotlight-card/spotlight-card";

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
