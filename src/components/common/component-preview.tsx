"use client";

import { MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "@/components/code-block/code-block";
import ComponentWrapper from "@/components/common/component-wrapper";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/tabs";
import {
  type PreviewMotionMode,
  PreviewMotionProvider,
} from "@/lib/preview-motion";
import AnimatedSwitch from "@/registry/sonaui/animated-switch/animated-switch";

interface ComponentPreviewProps {
  component: React.ReactNode;
  code: string;
}

function PreviewInspector({
  rootRef,
  enabled,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [details, setDetails] = useState<{
    width: number;
    height: number;
    padding: string;
    gap: string;
  } | null>(null);

  useEffect(() => {
    if (!enabled) {
      setTarget(null);
      setDetails(null);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const handlePointerMove = (event: PointerEvent) => {
      const nextTarget = document
        .elementsFromPoint(event.clientX, event.clientY)
        .find(
          (element): element is HTMLElement =>
            element instanceof HTMLElement &&
            element !== root &&
            root.contains(element) &&
            !element.closest("[data-preview-controls]") &&
            !element.hasAttribute("data-preview-inspector-layer"),
        );

      if (!nextTarget) return;
      const rect = nextTarget.getBoundingClientRect();
      const styles = getComputedStyle(nextTarget);
      setTarget(nextTarget);
      setDetails({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        padding: styles.padding,
        gap: styles.gap,
      });
    };

    root.addEventListener("pointermove", handlePointerMove);
    return () => root.removeEventListener("pointermove", handlePointerMove);
  }, [enabled, rootRef]);

  if (!enabled || !target || !details) return null;

  const rootRect = rootRef.current?.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  if (!rootRect) return null;

  return (
    <div
      data-preview-inspector-layer
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute border border-blue-500 bg-blue-500/10"
        style={{
          left: rect.left - rootRect.left,
          top: rect.top - rootRect.top,
          width: rect.width,
          height: rect.height,
        }}
      />
      <div
        className="absolute rounded-md bg-foreground px-2 py-1 text-[11px] leading-tight text-background shadow-lg"
        style={{
          left: Math.max(8, rect.left - rootRect.left),
          top: Math.max(8, rect.top - rootRect.top - 46),
        }}
      >
        <div>
          {details.width} × {details.height}px
        </div>
        <div className="text-background/70">padding {details.padding}</div>
        <div className="text-background/70">gap {details.gap}</div>
      </div>
    </div>
  );
}

function PreviewRulers({
  enabled,
  rootRef,
}: {
  enabled: boolean;
  rootRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [guides, setGuides] = useState<
    {
      axis: "x" | "y";
      position: number;
    }[]
  >([]);

  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    const root = rootRef.current;
    const updateSize = () =>
      setSize({ width: root.clientWidth, height: root.clientHeight });
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(root);
    return () => observer.disconnect();
  }, [enabled, rootRef]);

  if (!enabled) return null;

  const xTicks = Array.from(
    { length: Math.ceil(size.width / 50) + 1 },
    (_, index) => index * 50,
  );
  const yTicks = Array.from(
    { length: Math.ceil(size.height / 50) + 1 },
    (_, index) => index * 50,
  );

  const startGuide = (axis: "x" | "y", event: React.PointerEvent) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const position =
      axis === "x" ? event.clientX - rect.left : event.clientY - rect.top;
    const guideIndex = guides.length;
    setGuides((current) => [...current, { axis, position }]);
    const move = (moveEvent: PointerEvent) => {
      const next =
        axis === "x"
          ? moveEvent.clientX - rect.left
          : moveEvent.clientY - rect.top;
      setGuides((current) =>
        current.map((guide, index) =>
          index === guideIndex
            ? { ...guide, position: Math.max(0, next) }
            : guide,
        ),
      );
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop, { once: true });
  };

  return (
    <div
      data-preview-rulers
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden text-[9px] text-background/70"
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-0 top-0 h-5 pl-5"
        onPointerDown={(event) => startGuide("x", event)}
      >
        {xTicks
          .filter((tick) => tick > 0)
          .map((tick) => (
            <span
              key={`x-${tick}`}
              className="absolute top-0 h-2 border-l border-foreground/50 pl-1 text-foreground/70"
              style={{ left: tick }}
            >
              {tick}
            </span>
          ))}
      </div>
      <div
        className="absolute inset-y-0 left-0 w-5 pt-5"
        onPointerDown={(event) => startGuide("y", event)}
      >
        {yTicks
          .filter((tick) => tick > 0)
          .map((tick) => (
            <span
              key={`y-${tick}`}
              className="absolute left-0 w-3 border-t border-foreground/50 pr-1 text-right text-foreground/70"
              style={{ top: tick }}
            >
              {tick}
            </span>
          ))}
      </div>
      <div className="absolute left-0 top-0 size-5" />
      {guides.map((guide) => (
        <div
          key={`${guide.axis}-${guide.position}`}
          className={
            guide.axis === "x"
              ? "absolute inset-y-0 w-px cursor-ew-resize bg-blue-500/70"
              : "absolute inset-x-0 h-px cursor-ns-resize bg-blue-500/70"
          }
          style={
            guide.axis === "x"
              ? { left: guide.position }
              : { top: guide.position }
          }
          onPointerDown={(event) => {
            event.stopPropagation();
            startGuide(guide.axis, event);
          }}
        />
      ))}
    </div>
  );
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  component,
  code,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const inspectionRootRef = useRef<HTMLDivElement>(null);
  const [motionMode, setMotionMode] = useState<PreviewMotionMode>("normal");
  const [inspectionEnabled, setInspectionEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setIsMobile(media.matches);
      if (media.matches) setInspectionEnabled(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <Tabs defaultValue="preview" className="my-3 w-full">
      <TabsList data-orientation="horizontal">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="flex items-center justify-center min-h-[350px]"
      >
        <div ref={previewRef} className="relative w-full">
          <div
            data-preview-controls
            className="mb-2 flex items-center justify-end gap-4 text-xs absolute right-0 -top-6"
          >
            <div className="inline-flex items-center gap-1 text-muted-foreground">
              Reduce motion:
              <span className="min-w-[3ch]">
                {motionMode === "reduced" ? "On" : "Off"}
              </span>
              <AnimatedSwitch
                size="sm"
                checked={motionMode === "reduced"}
                onCheckedChange={(checked) =>
                  setMotionMode(checked ? "reduced" : "normal")
                }
                aria-label="Toggle reduced motion"
              />
            </div>
            {!isMobile && (
              <div className="inline-flex items-center gap-1 text-muted-foreground">
                Inspect
                <AnimatedSwitch
                  size="sm"
                  checked={inspectionEnabled}
                  onCheckedChange={setInspectionEnabled}
                  aria-label="Toggle inspection mode"
                />
              </div>
            )}
          </div>
          <div
            ref={(node) => {
              inspectionRootRef.current = node;
            }}
            data-motion-mode={motionMode}
            className="relative"
          >
            <PreviewMotionProvider mode={motionMode}>
              <MotionConfig
                reducedMotion={motionMode === "reduced" ? "always" : "never"}
              >
                <ComponentWrapper>{component}</ComponentWrapper>
              </MotionConfig>
            </PreviewMotionProvider>
            <PreviewInspector
              rootRef={inspectionRootRef}
              enabled={inspectionEnabled}
            />
            <PreviewRulers
              enabled={inspectionEnabled}
              rootRef={inspectionRootRef}
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="code" className="">
        <CodeBlock language="tsx" code={code}>
          <CodeBlockHeader />
          <CodeBlockPre>
            <CodeBlockCode />
          </CodeBlockPre>
        </CodeBlock>
      </TabsContent>
    </Tabs>
  );
};

export default ComponentPreview;
