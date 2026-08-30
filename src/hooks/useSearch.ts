import { allDocs } from "content-collections";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { componentNavigationLinks } from "@/config/components";

const options = {
  keys: ["title", "description", "tags"],
  threshold: 0.3,
};

const visibleDocSlugs = new Set(
  componentNavigationLinks.map((component) => component.slug),
);

const searchableDocs = allDocs.filter(
  (doc) => doc.searchable !== false && visibleDocSlugs.has(doc.slug),
);

export function useSearch() {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(searchableDocs, options), []);

  const results = useMemo(() => {
    if (!query) return searchableDocs;
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse]);

  return { query, setQuery, results };
}
