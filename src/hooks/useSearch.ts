import { allDocs } from "content-collections";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";

const options = {
  keys: ["title", "description", "tags"],
  threshold: 0.3,
};

export function useSearch() {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(allDocs, options), []);

  const results = useMemo(() => {
    const searchableDocs = allDocs.filter((doc) => doc.searchable !== false);
    if (!query) return searchableDocs;
    return fuse
      .search(query)
      .map((result) => result.item)
      .filter((doc) => doc.searchable !== false);
  }, [query, fuse]);

  return { query, setQuery, results };
}
