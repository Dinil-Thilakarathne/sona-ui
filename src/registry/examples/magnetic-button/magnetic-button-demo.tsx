import Magnetic from "@/registry/sonaui/magnetic-button/magnetic-button";

export default function MagneticButtonExample() {
  return (
    <div className="p-2 border border-border border-dashed rounded-full">
      <Magnetic interactionArea="parent">
        <button className="px-6 py-4 font-semibold text-foreground bg-background rounded-full cursor-pointer">
          Magnetic Button
        </button>
      </Magnetic>
    </div>
  );
}
