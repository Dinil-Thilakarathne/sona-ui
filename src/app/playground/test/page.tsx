import { Slider } from "@base-ui/react";
import FluidSlider from "@/registry/sonaui/fluid-slider/fluid-slider";

export default function Page() {
  return (
    <main className="min-h-svh w-full flex items-center justify-center flex-col ">
      <div className=" bg-secondary h-full flex-1 items-center justify-center flex w-screen flex-col gap-12">
        <div className="">
          Before
          <Slider.Root defaultValue={25}>
            <Slider.Control className="flex w-[500px]! touch-none items-center py-3 select-none">
              <Slider.Track className="h-1 w-full bg-neutral-200 select-none dark:bg-neutral-800">
                <Slider.Indicator
                  className="bg-neutral-950 select-none dark:bg-white "
                  style={{
                    backgroundColor:
                      "color-mix(in oklab, var(--primary) 80%, var(--background))",
                  }}
                />
                <Slider.Thumb
                  aria-label="Volume"
                  className="size-4 border border-neutral-950 bg-white select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-neutral-950 dark:has-[:focus-visible]:outline-white dark:border-white dark:bg-neutral-950 rounded-full! cursor-pointer"
                />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <div>
            After
            <FluidSlider
              label="Resonance"
              defaultValue={6}
              max={10}
              // marks={[2, 4, 6, 8]}
              className="min-w-[500px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
