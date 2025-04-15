import { Metadata } from "next";
import { ComponentItems } from "@/libs/data";

export const getComponentMetadata = (componentName: string): Metadata => {
  const compMetadata = ComponentItems.find(
    (item) => item.name === componentName
  )?.metadata;

  return {
    title: compMetadata?.title || "Sona UI",
    description: compMetadata?.description || "",
    keywords: compMetadata?.keywords || [],
    openGraph: {
      images: [
        {
          url: compMetadata?.openGraphImage || "",
          alt: compMetadata?.title || "",
        },
      ],
    },
  };
};
