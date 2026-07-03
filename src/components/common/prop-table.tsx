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
      <div className="text-muted-foreground py-3 text-sm">
        No props found
        {component ? (
          <>
            {" "}
            for{" "}
            <code className="bg-muted rounded px-1 py-0.5">{component}</code>
          </>
        ) : null}
        .
      </div>
    );
  }

  return (
    <div className="py-3">
      <div className="border-border overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-secondary">
            <tr>
              {["Property", "Type", "Default", "Description"].map((h) => (
                <th
                  key={h}
                  className="text-foreground px-4 py-2 font-semibold whitespace-nowrap"
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
                className="border-border odd:bg-secondary/80 even:bg-accent/80 border-t"
              >
                <td className="px-4 py-2 align-top">
                  <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                    {prop.name}
                  </code>
                </td>
                <td className="text-muted-foreground px-4 py-2 align-top">
                  <code className="font-mono text-xs">{prop.type}</code>
                </td>
                <td className="px-4 py-2 align-top">
                  <code className="text-foreground font-mono text-xs">
                    {prop.default?.length ? prop.default : "—"}
                  </code>
                </td>
                <td className="text-foreground px-4 py-2 align-top">
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
