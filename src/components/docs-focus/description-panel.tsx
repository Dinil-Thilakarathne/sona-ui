import type { ReactNode } from "react";
import { Mdx } from "@/components/common/mdx-components";
import { ComponentUsage } from "@/components/usage/component-usage";
import PropTable from "../common/prop-table";
import type { ComponentDocumentationData } from "./component-doc-data";
import type { FocusDoc } from "./docs-focus-types";

export function DescriptionPanel({
  doc,
  data,
  copyActions,
}: {
  doc: FocusDoc;
  data: ComponentDocumentationData;
  copyActions: ReactNode;
}) {
  const hasInlineReference =
    doc.body.raw.includes("<ComponentUsage") ||
    doc.body.raw.includes("<PropTable");

  return (
    <div className="relative h-full overflow-hidden bg-focus-panel lg:bg-background ">
      <div className="h-full overflow-y-auto overscroll-contain px-4 py-8 lg:pt-32">
        <section className="border border-transparent">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="text-sm text-muted-foreground">
                Component details
              </span>
              <h2 className="mt-2 text-xl font-semibold">{doc.title}</h2>
            </div>
            {copyActions}
          </div>
        </section>
        <section id="overview">
          <Mdx
            code={doc.body.code}
            className="docs-focus-prose max-w-none"
            sourceFiles={doc.sourceFiles}
          />
        </section>
        {!hasInlineReference && (
          <>
            <section id="usage" className="scroll-mt-16">
              <h2 className="docs-heading docs-heading-h2">Usage</h2>
              <ComponentUsage component={data.component} anatomy={data.usage} />
            </section>
            <section id="props" className="scroll-mt-16">
              <h2 className="docs-heading docs-heading-h2">Props</h2>
              <PropTable data={data.props} />
            </section>
          </>
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-focus-panel lg:from-background to-transparent"
      />
    </div>
  );
}
