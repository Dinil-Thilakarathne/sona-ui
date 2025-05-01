import { Table, Box, Text } from "@radix-ui/themes";

const CodeCell = ({ content = "" }) => {
  return <Box>{content}</Box>;
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
    <Box className="py-2">
      <Box className="overflow-x-auto">
        <Table.Root
          variant="surface"
          className="props-table rounded-lg border border-gray-200 shadow-sm"
        >
          <Table.Header className="bg-gray-100">
            <Table.Row>
              <Table.ColumnHeaderCell className="px-4 py-2 text-left font-semibold text-gray-700" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                Property
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="px-4 py-2 text-left font-semibold text-gray-700" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                Type
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="px-4 py-2 text-left font-semibold text-gray-700" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                Default
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="px-4 py-2 text-left font-semibold text-gray-700" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                Description
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((prop, index) => (
              <Table.Row
                key={index}
                className="odd:bg-slate-100 even:bg-gray-50 hover:bg-gray-100"
              >
                <Table.Cell className="px-4 py-4 text-gray-800" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                  <CodeCell content={prop.name} />
                </Table.Cell>
                <Table.Cell className="px-4 py-4 text-gray-800" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                  <Text>{prop.type}</Text>
                </Table.Cell>
                <Table.Cell className="px-4 py-4 text-gray-800" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                  <CodeCell
                    content={
                      prop.default && prop.default.length ? prop.default : "—"
                    }
                  />
                </Table.Cell>
                <Table.Cell className="px-4 py-4 text-gray-800" style={{paddingInline: "1rem", paddingBlock: "0.5rem"}}>
                  <Text>{prop.description}</Text>
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
