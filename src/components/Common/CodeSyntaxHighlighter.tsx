"use client";

import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighterLib } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "../Button";
import { cn } from "@/lib/utils";

interface SyntaxHighlighterProps {
  filePath: string; // Path relative to the public/ directory
  language: string;
  className?: string;
}

export const CodeSyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  filePath,
  language,
  className,
}) => {
  const [content, setContent] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(`/${filePath}`);
        if (!response.ok) {
          throw new Error("Failed to fetch file content");
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error fetching file content:", error);
        setContent(null); // Set content to null if there's an error
      } finally {
      }
    };

    fetchFileContent();
  }, [filePath]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  if (!content) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayedContent = isExpanded
    ? content
    : content.split("\n").slice(0, 10).join("\n") +
      (content.split("\n").length > 10 ? "\n..." : "");

  console.log(displayedContent);

  return (
    <div
      className={cn(
        "relative w-full max-w-[calc(100vw-16px)] overflow-x-auto rounded-lg border bg-[rgb(40,44,52)] p-4 lg:max-w-full",
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
        <div className="absolute bottom-0 left-0 h-[50%] w-full bg-white/70 mask-t-from-0% mask-t-to-70%" />
      )}

      <div className="relative bottom-2 left-0 flex w-full items-center justify-center">
        {content.split("\n").length > 10 && (
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
