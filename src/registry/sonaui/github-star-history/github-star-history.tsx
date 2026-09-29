"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface GitHubStarHistoryDatum {
  /** Date represented by this cumulative observation. */
  date: Date | string;
  /** Total repository stars recorded at this observation. */
  total: number;
}

export interface GitHubStarHistoryProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Chronological observations displayed by the chart. */
  data: GitHubStarHistoryDatum[];
  /** Repository name displayed above the chart, usually owner/repository. */
  repository: string;
  /**
   * Height of the chart plot in pixels.
   * @default 280
   */
  height?: number;
  /**
   * CSS color used by the line, area, and active marker.
   * @default "var(--primary)"
   */
  color?: string;
  /**
   * Shows the recorded change between the first and latest observations.
   * @default true
   */
  showChange?: boolean;
  /**
   * Reveals the chart from left to right when it first appears.
   * @default true
   */
  animated?: boolean;
  /**
   * Accessible name for the interactive chart.
   * @default derived from repository
   */
  ariaLabel?: string;
}

interface NormalizedDatum {
  date: Date;
  total: number;
}

const VIEWBOX_WIDTH = 720;
const PADDING = { top: 18, right: 18, bottom: 32, left: 56 };
const TOOLTIP_EDGE_PADDING = 8;
const numberFormatter = new Intl.NumberFormat("en", { notation: "compact" });
const preciseNumberFormatter = new Intl.NumberFormat("en");
const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function normalizeData(data: GitHubStarHistoryDatum[]) {
  return data
    .map((item) => ({
      date: item.date instanceof Date ? item.date : new Date(item.date),
      total: Math.max(0, item.total),
    }))
    .filter(
      (item) =>
        !Number.isNaN(item.date.getTime()) && Number.isFinite(item.total),
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

function formatCompact(value: number) {
  return value < 1000
    ? String(Math.round(value))
    : numberFormatter.format(value);
}

function buildSmoothPath(
  points: NormalizedDatum[],
  getX: (index: number) => number,
  getY: (total: number) => number,
) {
  const firstPoint = points[0];
  if (!firstPoint) return "";

  const start = `M ${getX(0)} ${getY(firstPoint.total)}`;
  return points.slice(1).reduce((path, point, index) => {
    const currentIndex = index + 1;
    const previousX = getX(index);
    const currentX = getX(currentIndex);
    const controlX = previousX + (currentX - previousX) / 2;

    return `${path} C ${controlX} ${getY(points[index].total)}, ${controlX} ${getY(point.total)}, ${currentX} ${getY(point.total)}`;
  }, start);
}

function ChartTooltip({
  active,
  activeX,
  activeY,
  chartHeight,
  chartRef,
}: {
  active: NormalizedDatum;
  activeX: number;
  activeY: number;
  chartHeight: number;
  chartRef: RefObject<HTMLDivElement | null>;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipLeft, setTooltipLeft] = useState<number | null>(null);

  useLayoutEffect(() => {
    const chart = chartRef.current;
    const tooltip = tooltipRef.current;
    if (!chart || !tooltip) return;

    const updatePosition = () => {
      const desiredLeft = (activeX / VIEWBOX_WIDTH) * chart.clientWidth;
      const tooltipHalfWidth = tooltip.offsetWidth / 2;
      const minimumLeft = TOOLTIP_EDGE_PADDING + tooltipHalfWidth;
      const maximumLeft =
        chart.clientWidth - TOOLTIP_EDGE_PADDING - tooltipHalfWidth;

      setTooltipLeft(
        maximumLeft < minimumLeft
          ? chart.clientWidth / 2
          : Math.min(maximumLeft, Math.max(minimumLeft, desiredLeft)),
      );
    };

    updatePosition();
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(chart);
    resizeObserver.observe(tooltip);

    return () => resizeObserver.disconnect();
  }, [activeX, chartRef]);

  return (
    <div
      ref={tooltipRef}
      className="border-border bg-popover text-popover-foreground pointer-events-none absolute z-10 w-max whitespace-nowrap rounded-lg border px-2.5 py-2 text-xs shadow-md"
      style={{
        left:
          tooltipLeft === null
            ? `${(activeX / VIEWBOX_WIDTH) * 100}%`
            : `${tooltipLeft}px`,
        top: `${(activeY / chartHeight) * 100}%`,
        transform: "translate(-50%, calc(-100% - 12px))",
      }}
    >
      <p className="font-medium tabular-nums">
        {preciseNumberFormatter.format(active.total)} stars
      </p>
      <p className="text-muted-foreground">
        {dateFormatter.format(active.date)}
      </p>
    </div>
  );
}

export default function GitHubStarHistory({
  data,
  repository,
  height = 280,
  color = "var(--primary)",
  showChange = true,
  animated = true,
  ariaLabel,
  className,
  style,
  ...props
}: GitHubStarHistoryProps) {
  const shouldReduceMotion = useReducedMotion();
  const gradientId = useId().replaceAll(":", "");
  const clipId = useId().replaceAll(":", "");
  const normalizedData = useMemo(() => normalizeData(data), [data]);
  const chartRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  if (normalizedData.length === 0) {
    return (
      <div
        className={cn(
          "border-border bg-card text-card-foreground flex min-h-48 items-center justify-center rounded-xl border p-6 text-center",
          className,
        )}
        style={style}
        {...props}
      >
        <p className="text-muted-foreground text-sm">
          No star history is available for {repository}.
        </p>
      </div>
    );
  }

  const plotWidth = VIEWBOX_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = height - PADDING.top - PADDING.bottom;
  const totals = normalizedData.map((item) => item.total);
  const minimum = Math.min(...totals);
  const maximum = Math.max(...totals);
  const range = Math.max(1, maximum - minimum);
  const baseline = Math.max(0, minimum - range * 0.12);
  const chartRange = Math.max(1, maximum - baseline);
  const xForIndex = (index: number) =>
    PADDING.left +
    (normalizedData.length === 1
      ? plotWidth
      : (index / (normalizedData.length - 1)) * plotWidth);
  const yForTotal = (total: number) =>
    PADDING.top + ((maximum - total) / chartRange) * plotHeight;

  const linePath = buildSmoothPath(normalizedData, xForIndex, yForTotal);
  const areaPath = `${linePath} V ${PADDING.top + plotHeight} H ${PADDING.left} Z`;
  const latest = normalizedData.at(-1) as NormalizedDatum;
  const change = latest.total - normalizedData[0].total;
  const resolvedActiveIndex = activeIndex ?? normalizedData.length - 1;
  const active = normalizedData[resolvedActiveIndex];
  const activeX = xForIndex(resolvedActiveIndex);
  const activeY = yForTotal(active.total);
  const reveal = animated && !shouldReduceMotion;
  const ticks = Array.from({ length: 4 }, (_, index) => {
    const ratio = index / 3;
    return {
      value: maximum - ratio * chartRange,
      y: PADDING.top + ratio * plotHeight,
    };
  });

  const updateFromPointer = (event: PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    setActiveIndex(
      Math.round(relativeX * Math.max(0, normalizedData.length - 1)),
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const current = activeIndex ?? normalizedData.length - 1;
    if (event.key === "Home") setActiveIndex(0);
    if (event.key === "End") setActiveIndex(normalizedData.length - 1);
    if (event.key === "ArrowLeft") setActiveIndex(Math.max(0, current - 1));
    if (event.key === "ArrowRight") {
      setActiveIndex(Math.min(normalizedData.length - 1, current + 1));
    }
  };

  return (
    <div
      className={cn(
        "border-border bg-card text-card-foreground w-full rounded-xl border p-4 shadow-sm sm:p-5",
        className,
      )}
      style={{ ...style, "--star-history-color": color } as CSSProperties}
      {...props}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium">
            GitHub star history
          </p>
          <h3 className="truncate font-medium text-sm">{repository}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-semibold text-xl tabular-nums">
            {preciseNumberFormatter.format(latest.total)}
          </p>
          {showChange && (
            <p className="text-muted-foreground text-xs tabular-nums">
              {change >= 0 ? "+" : ""}
              {preciseNumberFormatter.format(change)} recorded
            </p>
          )}
        </div>
      </div>

      <div
        ref={chartRef}
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel ?? `${repository} GitHub star history`}
        aria-valuemin={0}
        aria-valuemax={normalizedData.length - 1}
        aria-valuenow={resolvedActiveIndex}
        aria-valuetext={`${dateFormatter.format(active.date)}, ${preciseNumberFormatter.format(active.total)} stars`}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        className="focus-visible:ring-ring relative rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <svg
          role="img"
          aria-hidden="true"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${height}`}
          className="block h-auto w-full overflow-visible"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--star-history-color)"
                stopOpacity="0.28"
              />
              <stop
                offset="100%"
                stopColor="var(--star-history-color)"
                stopOpacity="0.02"
              />
            </linearGradient>
            <clipPath id={clipId}>
              <motion.rect
                x={PADDING.left}
                y={0}
                height={height}
                initial={reveal ? { width: 0 } : { width: plotWidth }}
                animate={{ width: plotWidth }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </clipPath>
          </defs>

          {ticks.map((tick) => (
            <g key={tick.y}>
              <line
                x1={PADDING.left}
                x2={VIEWBOX_WIDTH - PADDING.right}
                y1={tick.y}
                y2={tick.y}
                className="stroke-border"
                strokeDasharray="3 5"
              />
              <text
                x={PADDING.left - 10}
                y={tick.y + 4}
                textAnchor="end"
                className="fill-muted-foreground text-[11px]"
              >
                {formatCompact(Math.max(0, tick.value))}
              </text>
            </g>
          ))}

          <g clipPath={`url(#${clipId})`}>
            <path d={areaPath} fill={`url(#${gradientId})`} />
            <path
              d={linePath}
              fill="none"
              stroke="var(--star-history-color)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>

          <text
            x={PADDING.left}
            y={height - 7}
            className="fill-muted-foreground text-[11px]"
          >
            {dateFormatter.format(normalizedData[0].date)}
          </text>
          <text
            x={VIEWBOX_WIDTH - PADDING.right}
            y={height - 7}
            textAnchor="end"
            className="fill-muted-foreground text-[11px]"
          >
            {dateFormatter.format(latest.date)}
          </text>

          {(activeIndex !== null || isFocused) && (
            <g className="pointer-events-none">
              <line
                x1={activeX}
                x2={activeX}
                y1={PADDING.top}
                y2={PADDING.top + plotHeight}
                className="stroke-muted-foreground/50"
                strokeDasharray="3 4"
              />
              <motion.circle
                animate={{ cx: activeX, cy: activeY }}
                initial={false}
                r="5"
                className="stroke-card"
                fill="var(--star-history-color)"
                strokeWidth="3"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 38, mass: 0.5 }
                }
              />
            </g>
          )}

          <rect
            x={PADDING.left}
            y={PADDING.top}
            width={plotWidth}
            height={plotHeight}
            fill="transparent"
            onPointerEnter={updateFromPointer}
            onPointerMove={updateFromPointer}
            onPointerLeave={() => setActiveIndex(null)}
          />
        </svg>

        {(activeIndex !== null || isFocused) && (
          <ChartTooltip
            active={active}
            activeX={activeX}
            activeY={activeY}
            chartHeight={height}
            chartRef={chartRef}
          />
        )}
      </div>
    </div>
  );
}
