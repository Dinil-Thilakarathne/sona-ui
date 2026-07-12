import { notFound } from "next/navigation";
import PlaygroundWorkbench from "@/components/playground/playground-workbench";
import { playgroundRegistry } from "@/registry/playground";

export default async function PlaygroundComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();

  const { component } = await params;
  if (!playgroundRegistry[component]) notFound();

  return <PlaygroundWorkbench component={component} />;
}
