import { componentProps, type PropMeta } from "@/registry/prop-types";

interface PropTableProps {
  /**
   * Component key (kebab-case) to render props for. Props are derived from the
   * component's source `*Props` type via `scripts/build-prop-types.ts`, so the
   * table can never drift from the real types.
   */
  component?: string;
  /** Explicit rows. Use only for one-off tables not backed by a source type. */
  data?: PropMeta[];
}

const PropTable = ({ component, data }: PropTableProps) => {
  const rows = data ?? (component ? componentProps[component] : undefined);

  if (!rows || rows.length === 0) {
    return (
      <div className="py-3 text-muted-foreground text-sm">
        No props found
        {component ? (
          <>
            {" "}
            for{" "}
            <code className="px-1 py-0.5 bg-muted rounded">{component}</code>
          </>
        ) : null}
        .
      </div>
    );
  }

  return (
    <div className="py-3">
      <div className="overflow-x-auto rounded-lg smooth-shadow-ring-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-secondary">
            <tr>
              {["Property", "Type", "Default", "Description"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 font-semibold text-foreground whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((prop) => (
              <tr
                key={prop.name}
                className="hover:bg-secondary/50 border-border border-t"
              >
                <td className="px-4 py-2 align-top">
                  <code className="px-1.5 py-0.5 font-mono text-foreground text-xs bg-muted rounded">
                    {prop.name}
                  </code>
                </td>
                <td className="px-4 py-2 align-top text-muted-foreground">
                  <code className="font-mono text-xs">{prop.type}</code>
                </td>
                <td className="px-4 py-2 align-top">
                  <code className="font-mono text-foreground text-xs">
                    {prop.default?.length ? prop.default : "—"}
                  </code>
                </td>
                <td className="px-4 py-2 align-top text-foreground">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropTable;
