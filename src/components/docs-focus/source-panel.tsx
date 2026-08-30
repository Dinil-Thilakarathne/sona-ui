import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "@/components/code-block/code-block";
import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";
import type { ComponentDocumentationData } from "./component-doc-data";

function sourceFileName(path: string) {
  return path.split("/").pop() ?? path;
}

function sourceHeaderPath(path: string) {
  return path.replace(/^components\/sonaui\//, "");
}

export function SourcePanel({
  data,
  selectedFileId,
  activeExampleName,
  onFileChange,
}: {
  data: ComponentDocumentationData;
  selectedFileId: string;
  activeExampleName?: string;
  onFileChange: (id: string | null) => void;
}) {
  const group =
    data.sourceFiles.find((file) => file.id === selectedFileId)?.group ??
    "component";
  const files = data.sourceFiles.filter((file) => file.group === group);
  const selected = files.find((file) => file.id === selectedFileId) ?? files[0];
  const selectGroup = (value: string) => {
    const nextFile =
      value === "example"
        ? data.sourceFiles.find(
            (file) =>
              file.group === value && file.path === `${activeExampleName}.tsx`,
          )
        : undefined;
    const firstFile =
      nextFile ?? data.sourceFiles.find((file) => file.group === value);
    if (firstFile) {
      onFileChange(
        firstFile.id === data.sourceFiles[0]?.id ? null : firstFile.id,
      );
    }
  };

  if (!selected) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        No source files are available.
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col px-4 py-4">
      <div className="mb-4 flex items-center justify-between  pt-4 md:pt-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Source code
        </span>
        <FluidTabs
          tabs={(["component", "example"] as const).map((value) => ({
            value,
            title: value[0].toUpperCase() + value.slice(1),
            disabled: !data.sourceFiles.some((file) => file.group === value),
          }))}
          value={group}
          onValueChange={selectGroup}
          size="sm"
          ariaLabel="Source groups"
        />
      </div>
      <FluidTabs
        tabs={files.map((file) => ({
          value: file.id,
          title: (
            <span className="font-mono text-[11px]">
              {sourceFileName(file.path)}
            </span>
          ),
        }))}
        value={selected.id}
        onValueChange={(fileId) =>
          onFileChange(fileId === data.sourceFiles[0]?.id ? null : fileId)
        }
        variant="underline"
        size="sm"
        ariaLabel={`${group} source files`}
        className="mb-3 w-full"
        listClassName="p-0"
      />
      <CodeBlock
        key={selected.id}
        code={selected.content}
        language={selected.language}
        className="min-h-0 flex-1"
      >
        <CodeBlockHeader filename={sourceHeaderPath(selected.target)} />
        <CodeBlockPre className=" max-h-none">
          <CodeBlockCode />
        </CodeBlockPre>
      </CodeBlock>
    </div>
  );
}
