import { Table, Box, Text } from "@radix-ui/themes";

const CodeCell = ({ content = "" }) => {
  return <Box className="w-fit">{content}</Box>;
};

interface PropTableProps {
  data: {
    name: string;
    type: string;
    default: string;
    description: string;
  }[];
}

const PropTable = ({ data }: PropTableProps) => {
  return (
    <Box className="py-3">
      <Box className="overflow-x-auto">
        <Table.Root
          variant="surface"
          className="props-table overflow-clip rounded-lg! border border-border text-wrap shadow-sm"
        >
          <Table.Header className="bg-secondary">
            <Table.Row>
              <Table.ColumnHeaderCell
                className="text-foreground px-4 py-2 text-left font-semibold"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Property
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                className="text-foreground px-4 py-2 text-left font-semibold"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Type
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                className="text-foreground px-4 py-2 text-left font-semibold"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Default
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                className="text-foreground px-4 py-2 text-left font-semibold"
                style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
              >
                Description
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((prop, index) => (
              <Table.Row
                key={index}
                className="odd:bg-secondary/80 even:bg-accent/80 hover:odd:bg-secondary/60 hover:even:bg-accent/60"
              >
                <Table.Cell
                  className="text-foreground px-4 py-4"
                  style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
                >
                  <CodeCell content={prop.name} />
                </Table.Cell>
                <Table.Cell
                  className="text-foreground px-4 py-4"
                  style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
                >
                  <Text className="w-fit">{prop.type}</Text>
                </Table.Cell>
                <Table.Cell
                  className="text-foreground px-4 py-4"
                  style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
                >
                  <CodeCell
                    content={
                      prop.default && prop.default.length ? prop.default : "—"
                    }
                  />
                </Table.Cell>
                <Table.Cell
                  className="text-foreground px-4 py-4"
                  style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}
                >
                  <Text className="w-fit">{prop.description}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default PropTable;
