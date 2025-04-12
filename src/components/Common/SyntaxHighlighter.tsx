"use client";

import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighterLib } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import clsx from "clsx";

interface SyntaxHighlighterProps {
  filePath: string; // Path relative to the public/ directory
  language: string;
  className?: string;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
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

  return (
    <div className={clsx("relative rounded-lg bg-gray-900 p-4", className)}>
      <SyntaxHighlighterLib
        language={language}
        style={oneDark}
        customStyle={{ fontSize: "0.875rem", lineHeight: "1.5" }}
      >
        {displayedContent}
      </SyntaxHighlighterLib>

      <div className="mt-2 flex items-center justify-between">
        {content.split("\n").length > 10 && (
          <button
            onClick={toggleExpand}
            className="text-sm text-blue-500 hover:underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}

        <button
          onClick={handleCopy}
          className="text-sm text-green-500 hover:underline"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
};
