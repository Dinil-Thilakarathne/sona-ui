"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackTracwellEvent } from "./tracwell-provider";

export function TrackedExternalLink({
  eventName = "external_link_clicked",
  eventProperties,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName?: string;
  eventProperties?: Parameters<NonNullable<typeof trackTracwellEvent>>[1];
}) {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: tracking preserves native anchor behavior
    // biome-ignore lint/a11y/useKeyWithClickEvents: native anchors are keyboard activatable
    <a
      {...props}
      // biome-ignore lint/a11y/useValidAnchor: this remains a real navigation anchor
      onClick={(event) => {
        trackTracwellEvent(eventName, eventProperties);
        props.onClick?.(event);
      }}
    />
  );
}
