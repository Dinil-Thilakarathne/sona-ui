import type { Doc } from "content-collections";
import registry from "@/registry/registry.json";

type RegistryItem = {
  description?: string;
};

const registryByName = new Map(
  registry.map((item) => [item.name, item as RegistryItem]),
);

const descriptionOverrides: Record<string, string> = {
  changelog:
    "Follow the latest Sona UI component releases, interaction refinements, documentation updates, and fixes.",
};

function clampDescription(description: string) {
  if (description.length <= 180) return description;

  const shortened = description.slice(0, 177);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}...`;
}

export function getDocDescription(doc: Doc) {
  const componentDescription = doc.component
    ? registryByName.get(doc.component)?.description
    : undefined;

  return clampDescription(
    descriptionOverrides[doc.slug] ??
      doc.description ??
      componentDescription ??
      `Documentation, examples, and implementation guidance for ${doc.title} in Sona UI.`,
  );
}
