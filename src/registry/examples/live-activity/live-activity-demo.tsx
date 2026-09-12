"use client";

import {
  Check,
  MapPin,
  MessageCircle,
  Navigation,
  PackageCheck,
  Truck,
} from "lucide-react";
import { useState } from "react";
import LiveActivity, {
  type LiveActivityProps,
} from "@/registry/sonaui/live-activity/live-activity";

type DeliveryState = "moving" | "arriving" | "delivered";

const deliveryCopy: Record<
  DeliveryState,
  { title: string; detail: string; eta: string; progress: string }
> = {
  moving: {
    title: "On the way",
    detail: "Maya picked up your order",
    eta: "12 min",
    progress: "72%",
  },
  arriving: {
    title: "Almost there",
    detail: "Maya is approaching your address",
    eta: "2 min",
    progress: "94%",
  },
  delivered: {
    title: "Delivered",
    detail: "Left safely at your front door",
    eta: "Now",
    progress: "100%",
  },
};

export function LiveActivityExample({
  direction = "down",
  align = "center",
  gestures = "touch",
  motion = "auto",
}: Pick<LiveActivityProps, "direction" | "align" | "gestures" | "motion">) {
  const [deliveryState, setDeliveryState] = useState<DeliveryState>("moving");
  const copy = deliveryCopy[deliveryState];
  const delivered = deliveryState === "delivered";

  const advanceDelivery = () => {
    setDeliveryState((current) =>
      current === "moving"
        ? "arriving"
        : current === "arriving"
          ? "delivered"
          : "moving",
    );
  };

  return (
    <div className="flex min-h-[30rem] w-full max-w-xl flex-col items-center justify-between gap-8 px-3 py-10">
      {direction === "up" && <div className="flex-1" />}
      <LiveActivity.Root
        direction={direction}
        align={align}
        gestures={gestures}
        motion={motion}
      >
        <LiveActivity.Surface className="smooth-shadow-ring-lg rounded-[1.75rem] bg-zinc-950 text-white shadow-black/20">
          <LiveActivity.Compact>
            <LiveActivity.Trigger className="flex h-[4.5rem] w-[19rem] items-center gap-3 rounded-[1.75rem] px-3 text-left">
              <LiveActivity.Shared id="courier">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-amber-300 text-zinc-950">
                  {delivered ? (
                    <PackageCheck aria-hidden="true" className="size-5" />
                  ) : (
                    <Truck aria-hidden="true" className="size-5" />
                  )}
                </span>
              </LiveActivity.Shared>
              <span className="min-w-0 flex-1">
                <LiveActivity.Shared
                  id="delivery-title"
                  className="block font-medium tracking-[-0.01em]"
                >
                  {copy.title}
                </LiveActivity.Shared>
                <span className="mt-0.5 block truncate text-xs text-zinc-400">
                  Order #4821
                </span>
              </span>
              <LiveActivity.Shared id="delivery-eta" className="text-right">
                <span className="block text-sm font-semibold tabular-nums">
                  {copy.eta}
                </span>
                <span className="mt-0.5 block text-[0.625rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                  {delivered ? "status" : "away"}
                </span>
              </LiveActivity.Shared>
            </LiveActivity.Trigger>
          </LiveActivity.Compact>

          <LiveActivity.Expanded className="w-[22rem] p-4 pb-4 [@media(pointer:coarse)]:pb-0">
            <div className="flex items-center gap-3">
              <LiveActivity.Shared id="courier">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-amber-300 text-zinc-950">
                  {delivered ? (
                    <PackageCheck aria-hidden="true" className="size-5" />
                  ) : (
                    <Truck aria-hidden="true" className="size-5" />
                  )}
                </span>
              </LiveActivity.Shared>
              <span className="min-w-0 flex-1">
                <LiveActivity.Shared
                  id="delivery-title"
                  className="block font-medium tracking-[-0.01em]"
                >
                  {copy.title}
                </LiveActivity.Shared>
                <span className="mt-0.5 block text-xs text-zinc-400">
                  {copy.detail}
                </span>
              </span>
              <LiveActivity.Shared id="delivery-eta" className="text-right">
                <span className="block text-sm font-semibold tabular-nums">
                  {copy.eta}
                </span>
                <span className="mt-0.5 block text-[0.625rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                  {delivered ? "status" : "away"}
                </span>
              </LiveActivity.Shared>
              <LiveActivity.Close className="flex size-9 shrink-0 items-center justify-center rounded-full text-lg text-zinc-500 hover:bg-white/10 hover:text-white" />
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl bg-zinc-900 px-4 py-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,theme(colors.zinc.700)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.700)_1px,transparent_1px)] [background-size:24px_24px]"
              />
              <div className="relative flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg shadow-black/30">
                  <Truck aria-hidden="true" className="size-4" />
                </span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full origin-left rounded-full bg-amber-300 transition-transform duration-300 motion-reduce:transition-none"
                    style={{
                      transform: `scaleX(${Number.parseInt(copy.progress, 10) / 100})`,
                    }}
                  />
                </span>
                <span className="flex size-9 items-center justify-center rounded-full bg-amber-300 text-zinc-950 shadow-lg shadow-amber-300/10">
                  {delivered ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    <MapPin aria-hidden="true" className="size-4" />
                  )}
                </span>
              </div>
              <div className="relative mt-4 flex items-end justify-between text-xs">
                <span className="text-zinc-400">Green Street Kitchen</span>
                <span className="font-medium text-zinc-200">Home</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 active:scale-[0.98] motion-reduce:transform-none"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Message
              </button>
              <button
                type="button"
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 active:scale-[0.98] motion-reduce:transform-none"
              >
                <Navigation aria-hidden="true" className="size-4" />
                Track order
              </button>
            </div>
            <LiveActivity.Handle className="mt-1 text-zinc-500 hover:text-zinc-300" />
          </LiveActivity.Expanded>
        </LiveActivity.Surface>
      </LiveActivity.Root>

      <div className="flex flex-col items-center gap-2 text-center">
        <button
          type="button"
          onClick={advanceDelivery}
          className="rounded-full bg-muted px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {delivered ? "Restart delivery" : "Advance delivery"}
        </button>
        <p className="text-xs text-muted-foreground">
          Tap to expand. On touch devices, drag down to open.
        </p>
      </div>
      <span role="status" className="sr-only">
        {copy.title}. {copy.detail}.
      </span>
    </div>
  );
}

export default function LiveActivityDemo() {
  return <LiveActivityExample />;
}
