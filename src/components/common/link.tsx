import NextLink from "next/link";
import type { ComponentProps } from "react";

export type LinkProps = ComponentProps<typeof NextLink>;

/**
 * Sona UI navigation defaults to click-time loading. Opt into prefetching only
 * for a transition where the faster follow-up navigation is worth the request.
 */
export default function Link({
  prefetch = false,
  ...props
}: LinkProps) {
  return <NextLink {...props} prefetch={prefetch} />;
}
