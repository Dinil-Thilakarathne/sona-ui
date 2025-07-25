"use client";

import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighterLib } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "../Button";
import { cn } from "@/lib/utils";

interface SyntaxHighlighterProps {
  code?: string;
  filePath?: {
    directory: string; // Directory path relative to the public/ directory
    fileName: string; // File name with extension
  };
  language: string;
  className?: string;
}

export const CodeSyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  filePath,
  language,
  className,
}) => {
  const [codeContent, setCodeContent] = useState<string | null>(code || null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    if (filePath) {
      const fetchFileContent = async () => {
        try {
          const response = await fetch(
            `/api/read-file?folder=${filePath.directory}&file=${filePath.fileName}`,
          );
          const data = await response.json();
          if (data.content) {
            setCodeContent(data.content);
          } else {
            setCodeContent("// Error loading code from file.");
          }
        } catch (error) {
          console.error("Error fetching file content:", error);
          setCodeContent("// Error loading code from file.");
        }
      };

      fetchFileContent();
    }
  }, [filePath]);

  useEffect(() => {
    if (code) {
      setCodeContent(code);
    }
  }, [code]);

  useEffect(() => {
    if (codeContent && !filePath) {
      if (codeContent.split("\n").length <= 10) {
        setIsExpanded(true);
      }
    }
    if (filePath) {
      setIsExpanded(false);
    }
  }, [codeContent, filePath]);

  if (!codeContent) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Display only the first 10 lines of code if not expanded
  const displayedContent = isExpanded
    ? codeContent
    : codeContent.split("\n").slice(0, 10).join("\n") +
      (codeContent.split("\n").length > 10 ? "\n..." : "");

  return (
    <div
      className={cn(
        "bg-codeWrapper border-border relative mt-4 w-full max-w-[calc(100vw-16px)] overflow-x-auto rounded-lg border p-4 lg:max-w-full",
        className,
      )}
    >
      <div className="max-h-[40vh] overflow-y-scroll">
        <SyntaxHighlighterLib
          language={language}
          style={oneDark}
          lineProps={{
            style: { whiteSpace: "pre-wrap" },
          }}
          wrapLines={true}
          wrapLongLines={true}
          customStyle={{
            fontSize: "0.875rem",
            lineHeight: "1.5",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            backgroundColor: "oklch(0.269 0 0)",
          }}
        >
          {displayedContent}
        </SyntaxHighlighterLib>
      </div>

      <Button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-sm hover:underline"
      >
        {copied ? "Copied!" : "Copy Code"}
      </Button>

      {!isExpanded && (
        <div className="absolute bottom-0 left-0 h-[50%] w-full bg-[rgb(0,0,0)] mask-t-from-0% mask-t-to-70%" />
      )}

      <div className="absolute bottom-2 left-0 flex w-full items-center justify-center">
        {codeContent.split("\n").length > 10 && (
          <Button
            onClick={toggleExpand}
            className="relative bottom-2 text-sm hover:underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>
    </div>
  );
};
