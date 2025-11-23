"use client";

import { useEffect, useRef, useState, useCallback, createElement } from "react";
import { cn } from "@/lib/utils";

interface FullWidthTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p" | "div";
  className?: string;
  minFontSize?: number;
  maxFontSize?: number;
  resizeOnWindowResize?: boolean;
}

export default function FullWidthText({
  text,
  as = "h1",
  className,
  resizeOnWindowResize = true,
  ...props
}: FullWidthTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const [fontSize, setFontSize] = useState(16);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const adjustTextSize = useCallback(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    // Reset to a baseline font size
    textElement.style.fontSize = "16px";

    const containerWidth = container.offsetWidth;
    const textLength = text.length;

    console.log("Container Width:", containerWidth);
    console.log("Text Length:", textLength);

    if (textLength === 0 || containerWidth === 0) return;

    const newFontSize = containerWidth / textLength * 1.2; // Adjust based on text length

    // Apply min/max constraints
    // newFontSize = Math.max(minFontSize, Math.min(maxFontSize, newFontSize));

    console.log("New Font Size:", newFontSize);

    setFontSize(newFontSize);
  }, [text.length]);

  useEffect(() => {
    if (!isClient) return;

    // Initial adjustment
    const timer = setTimeout(adjustTextSize, 100);

    return () => clearTimeout(timer);
  }, [isClient, text, adjustTextSize]);

  useEffect(() => {
    if (!resizeOnWindowResize || !isClient) return;

    const handleResize = () => {
      adjustTextSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeOnWindowResize, isClient, adjustTextSize]);

  // Use ResizeObserver for more accurate container size changes
  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      adjustTextSize();
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [isClient, adjustTextSize]);

  if (!isClient) {
    return (
      <div className={cn("w-full", className)} {...props}>
        {createElement(as, { className: "whitespace-nowrap" }, text)}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden", className)}
      {...props}
    >
      {createElement(
        as,
        {
          ref: textRef,
          className: "whitespace-nowrap block leading-none",
          style: { fontSize: `${fontSize}px` },
        },
        text,
      )}
    </div>
  );
}
