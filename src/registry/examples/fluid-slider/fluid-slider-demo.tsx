import FluidSlider from "@/registry/sonaui/fluid-slider/fluid-slider";

export default function FluidSliderDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <FluidSlider
        label="Frequency"
        defaultValue={15}
        formatValue={(value) => `${value}%`}
      />
      <FluidSlider
        label="Resonance"
        defaultValue={6}
        max={10}
        marks={[2, 4, 6, 8]}
      />
    </div>
  );
}
