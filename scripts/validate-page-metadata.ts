import { allDocs, type Doc } from "content-collections";
import { getDocDescription } from "@/lib/docs-metadata";

const errors: string[] = [];
const seenSlugs = new Set<string>();

for (const doc of allDocs as Doc[]) {
  if (seenSlugs.has(doc.slug)) {
    errors.push(`${doc.slug}: duplicate documentation slug`);
  }
  seenSlugs.add(doc.slug);

  const description = getDocDescription(doc).trim();
  if (description.length < 40) {
    errors.push(
      `${doc.slug}: metadata description is shorter than 40 characters`,
    );
  }
  if (description.length > 200) {
    errors.push(`${doc.slug}: metadata description exceeds 200 characters`);
  }
}

if (errors.length > 0) {
  console.error(`Page metadata validation failed:\n${errors.join("\n")}`);
  process.exit(1);
}

console.log(
  `Page metadata validation passed for ${allDocs.length} docs pages.`,
);
