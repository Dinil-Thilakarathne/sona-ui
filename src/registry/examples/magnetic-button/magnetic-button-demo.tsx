import Magnetic from "@/registry/sonaui/magnetic-button/magnetic-button";

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
