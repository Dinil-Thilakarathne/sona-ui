export interface AgentTableRow {
  layer: string;
  description: string;
}

interface AgentTableProps {
  rows: AgentTableRow[];
}

/** MDX table for agent docs, styled to match PropTable. */
export function AgentTable({ rows }: AgentTableProps) {
  return (
    <div className="py-3">
      <div className="overflow-x-auto rounded-lg smooth-shadow-ring-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 font-semibold text-foreground whitespace-nowrap">
                Layer
              </th>
              <th className="px-4 py-2 font-semibold text-foreground whitespace-nowrap">
                What it does
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.layer}
                className="hover:bg-secondary/50 border-border border-t"
              >
                <td className="px-4 py-2 align-top">
                  <code className="px-1.5 py-0.5 font-mono text-foreground text-xs bg-muted rounded">
                    {row.layer}
                  </code>
                </td>
                <td className="px-4 py-2 align-top text-foreground">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
