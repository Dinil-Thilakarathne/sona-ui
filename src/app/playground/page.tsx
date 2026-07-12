import { notFound } from "next/navigation";
import PlaygroundIndex from "@/components/playground/playground-index";
import { playgroundRegistry } from "@/registry/playground";

export default function PlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <PlaygroundIndex components={Object.keys(playgroundRegistry)} />;
}
