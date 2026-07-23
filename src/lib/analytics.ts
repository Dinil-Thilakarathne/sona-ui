import posthog from "posthog-js";

export const analytics = {
  codeCopied(props: { component: string; language?: string }) {
    posthog.capture("code_copied", props);
  },
  searchUsed(props: {
    query: string;
    result_count: number;
    selected?: string;
  }) {
    posthog.capture("search_used", props);
  },
  docViewed(props: { slug: string; title: string }) {
    posthog.capture("doc_viewed", props);
  },
};
