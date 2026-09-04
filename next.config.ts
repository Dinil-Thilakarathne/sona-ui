import { withContentCollections } from "@content-collections/next";

const STATIC_PAGE_CACHE_CONTROL =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: STATIC_PAGE_CACHE_CONTROL,
          },
        ],
      },
      {
        source: "/components",
        headers: [
          {
            key: "Cache-Control",
            value: STATIC_PAGE_CACHE_CONTROL,
          },
        ],
      },
      {
        source: "/docs/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: STATIC_PAGE_CACHE_CONTROL,
          },
        ],
      },
      {
        source: "/agent/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
