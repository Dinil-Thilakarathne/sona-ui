"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { motion, useReducedMotion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  forwardRef,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/sona-utils";

export interface ActivityGraphDatum {
  /** Calendar date represented by this record. */
  date: Date | string;
  /** Non-negative activity recorded for the date. */
  value: number;
  /** Optional accessible label for the record. */
  label?: string;
  /** Optional domain data retained for selection callbacks. */
  metadata?: unknown;
}

export interface ActivityGraphValueContext {
  /** Calendar date represented by the active cell. */
  date: Date;
  /** Combined activity record for the active date, when one exists. */
  item: ActivityGraphDatum | undefined;
  /** Combined numeric value for the active date. */
  value: number;
  /** Normalized visual intensity from zero to the configured level count. */
  level: number;
}

export interface ActivityGraphProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children" | "defaultValue"> {
  /** Dated activity records displayed in the graph. */
  data: ActivityGraphDatum[];
  /**
   * Inclusive first date displayed by the graph.
   * @default 364 days before endDate
   */
  startDate?: Date | string;
  /**
   * Inclusive last date displayed by the graph.
   * @default latest data date or today
   */
  endDate?: Date | string;
  /**
   * Number of non-empty color intensity levels.
   * @default 4
   */
  levels?: number;
  /**
   * Maximum number of calendar days rendered.
   * @default 366
   */
  maxDays?: number;
  /**
   * First day of each visual week: Sunday, Monday, or Saturday.
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 6;
  /**
   * Controlled selected date.
   * @default undefined
   */
  value?: Date | string | null;
  /**
   * Initially selected date for uncontrolled usage.
   * @default undefined
   */
  defaultValue?: Date | string | null;
  /**
   * Called when a date is selected.
   * @default undefined
   */
  onValueChange?: (date: Date, item: ActivityGraphDatum | undefined) => void;
  /**
   * Called when a selected date is activated with pointer or keyboard.
   * @default undefined
   */
  onCellSelect?: (item: ActivityGraphDatum | undefined, date: Date) => void;
  /**
   * Custom content shown for the currently explored date.
   * @default undefined
   */
  renderValue?: (context: ActivityGraphValueContext) => ReactNode;
  /**
   * Shows the active date and value above the graph.
   * @default true
   */
  showValue?: boolean;
  /**
   * Shows an anchored tooltip when a date cell is hovered or focused.
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Delay before the first tooltip opens, in milliseconds.
   * @default 400
   */
  tooltipDelay?: number;
  /**
   * Custom content rendered inside the optional cell tooltip.
   * @default undefined
   */
  renderTooltip?: (context: ActivityGraphValueContext) => ReactNode;
  /**
   * Custom colors for non-empty intensity levels, ordered from low to high.
   * @default undefined
   */
  colors?: string[];
  /**
   * Custom color for dates without activity.
   * @default undefined
   */
  emptyColor?: string;
  /**
   * Shows month labels above the graph.
   * @default true
   */
  showMonthLabels?: boolean;
  /**
   * Shows abbreviated weekday labels beside the graph.
   * @default true
   */
  showWeekdayLabels?: boolean;
  /**
   * Shows the intensity legend below the graph.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Accessible description for a date without activity.
   * @default "No activity"
   */
  emptyLabel?: string;
  /**
   * Accessible name for the interactive graph.
   * @default "Activity graph"
   */
  ariaLabel?: string;
  /**
   * Additional classes for the scrollable graph region.
   * @default undefined
   */
  gridClassName?: string;
  /**
   * Additional classes applied to every date cell.
   * @default undefined
   */
  cellClassName?: string;
  /**
   * Additional classes for the optional tooltip surface.
   * @default undefined
   */
  tooltipClassName?: string;
  /**
   * Additional classes for the intensity legend.
   * @default undefined
   */
  legendClassName?: string;
}

interface NormalizedCell {
  date: Date;
  key: string;
  item: ActivityGraphDatum | undefined;
  value: number;
  level: number;
}

type TooltipDirection = "up" | "right" | "down" | "left" | "none";

const DAY_MS = 86_400_000;
const DEFAULT_MAX_DAYS = 366;
const levelClasses = [
  "bg-[var(--activity-graph-level-1)]",
  "bg-[var(--activity-graph-level-2)]",
  "bg-[var(--activity-graph-level-3)]",
  "bg-[var(--activity-graph-level-4)]",
  "bg-[var(--activity-graph-level-5)]",
  "bg-[var(--activity-graph-level-6)]",
] as const;

const tokenStyle = {
  "--activity-graph-empty":
    "color-mix(in oklab, var(--muted) 76%, var(--background))",
  "--activity-graph-level-1":
    "color-mix(in oklab, var(--primary) 24%, var(--background))",
  "--activity-graph-level-2":
    "color-mix(in oklab, var(--primary) 42%, var(--background))",
  "--activity-graph-level-3":
    "color-mix(in oklab, var(--primary) 62%, var(--background))",
  "--activity-graph-level-4":
    "color-mix(in oklab, var(--primary) 82%, var(--background))",
  "--activity-graph-level-5":
    "color-mix(in oklab, var(--primary) 91%, var(--background))",
  "--activity-graph-level-6": "var(--primary)",
  "--activity-graph-focus-ring": "var(--ring)",
  "--activity-graph-label": "var(--foreground)",
  "--activity-graph-muted-label": "var(--muted-foreground)",
  "--activity-graph-tooltip-surface":
    "color-mix(in oklab, var(--popover) 94%, transparent)",
  "--activity-graph-tooltip-foreground": "var(--popover-foreground)",
  "--activity-graph-cell-size": "0.75rem",
  "--activity-graph-cell-gap": "0.25rem",
  "--activity-graph-cell-radius": "0.1875rem",
} as CSSProperties;
const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
});
const weekdayFormatter = new Intl.DateTimeFormat("en", {
  weekday: "narrow",
  timeZone: "UTC",
});

function toUtcDate(value: Date | string): Date | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;

    return new Date(
      Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()),
    );
  }

  const calendarDate = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (calendarDate) {
    const year = Number(calendarDate[1]);
    const month = Number(calendarDate[2]) - 1;
    const day = Number(calendarDate[3]);
    const date = new Date(Date.UTC(year, month, day));

    return date.getUTCFullYear() === year &&
      date.getUTCMonth() === month &&
      date.getUTCDate() === day
      ? date
      : null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Date(
    Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()),
  );
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, amount: number) {
  return new Date(date.getTime() + amount * DAY_MS);
}

function startOfWeek(date: Date, weekStartsOn: 0 | 1 | 6) {
  const offset = (date.getUTCDay() - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

function endOfWeek(date: Date, weekStartsOn: 0 | 1 | 6) {
  return addDays(startOfWeek(date, weekStartsOn), 6);
}

function clampDate(date: Date, start: Date, end: Date) {
  if (date < start) return start;
  if (date > end) return end;
  return date;
}

function getWeekdayLabels(
  weekStartsOn: 0 | 1 | 6,
  formatter: Intl.DateTimeFormat,
) {
  const sunday = new Date(Date.UTC(2026, 0, 4));
  return Array.from({ length: 7 }, (_, index) => {
    const day = (weekStartsOn + index) % 7;
    return {
      key: `weekday-${day}`,
      day,
      label: formatter.format(addDays(sunday, day)),
    };
  });
}

const ActivityGraph = forwardRef<HTMLDivElement, ActivityGraphProps>(
  function ActivityGraph(
    {
      data,
      startDate,
      endDate,
      levels = 4,
      maxDays = DEFAULT_MAX_DAYS,
      weekStartsOn = 0,
      value,
      defaultValue,
      onValueChange,
      onCellSelect,
      renderValue,
      showValue = true,
      showTooltip = false,
      tooltipDelay = 400,
      renderTooltip,
      colors,
      emptyColor,
      showMonthLabels = true,
      showWeekdayLabels = true,
      showLegend = true,
      emptyLabel = "No activity",
      ariaLabel = "Activity graph",
      className,
      style,
      gridClassName,
      cellClassName,
      tooltipClassName,
      legendClassName,
      ...rootProps
    },
    forwardedRef,
  ) {
    const layoutId = useId();
    const shouldReduceMotion = useReducedMotion();
    const safeLevels = Number.isFinite(levels)
      ? Math.min(6, Math.max(1, Math.round(levels)))
      : 4;
    const safeMaxDays = Number.isFinite(maxDays)
      ? Math.max(1, Math.round(maxDays))
      : DEFAULT_MAX_DAYS;
    const tooltipHandle = useMemo(
      () => Tooltip.createHandle<ActivityGraphValueContext>(),
      [],
    );
    const resolvedTokenStyle = useMemo(() => {
      const style = {
        ...tokenStyle,
      } as CSSProperties & Record<`--activity-graph-${string}`, string>;

      colors?.slice(0, 6).forEach((color, index) => {
        style[`--activity-graph-level-${index + 1}`] = color;
      });
      if (emptyColor) style["--activity-graph-empty"] = emptyColor;

      return style;
    }, [colors, emptyColor]);

    const model = useMemo(() => {
      const records = new Map<string, ActivityGraphDatum>();

      for (const datum of data) {
        const date = toUtcDate(datum.date);
        if (!date) continue;
        const key = dateKey(date);
        const previous = records.get(key);
        const nextValue =
          Math.max(0, Number.isFinite(datum.value) ? datum.value : 0) +
          (previous?.value ?? 0);

        records.set(key, {
          ...datum,
          date,
          value: nextValue,
          label: previous ? undefined : datum.label,
          metadata: datum.metadata ?? previous?.metadata,
        });
      }

      const dataDates = [...records.keys()].sort();
      const latestDataDate = dataDates.at(-1);
      const fallbackEnd =
        (latestDataDate ? toUtcDate(latestDataDate) : null) ??
        toUtcDate(new Date()) ??
        new Date(0);
      const requestedEnd = endDate ? toUtcDate(endDate) : null;
      const resolvedEnd = requestedEnd ?? fallbackEnd;
      const requestedStart = startDate ? toUtcDate(startDate) : null;
      const resolvedStart = requestedStart ?? addDays(resolvedEnd, -364);
      const orderedStart =
        resolvedStart <= resolvedEnd ? resolvedStart : resolvedEnd;
      const rangeEnd =
        resolvedStart <= resolvedEnd ? resolvedEnd : resolvedStart;
      const rangeStart = new Date(
        Math.max(
          orderedStart.getTime(),
          addDays(rangeEnd, -(safeMaxDays - 1)).getTime(),
        ),
      );
      const gridStart = startOfWeek(rangeStart, weekStartsOn);
      const gridEnd = endOfWeek(rangeEnd, weekStartsOn);

      const nonZeroValues = [...records.entries()]
        .filter(
          ([key]) => key >= dateKey(rangeStart) && key <= dateKey(rangeEnd),
        )
        .map(([, item]) => item.value)
        .filter((itemValue) => itemValue > 0)
        .sort((a, b) => a - b);
      const levelByValue = new Map<number, number>();

      nonZeroValues.forEach((itemValue, index) => {
        if (levelByValue.has(itemValue)) return;
        levelByValue.set(
          itemValue,
          Math.max(
            1,
            Math.min(
              safeLevels,
              Math.ceil(((index + 1) / nonZeroValues.length) * safeLevels),
            ),
          ),
        );
      });

      const getLevel = (itemValue: number) => {
        if (itemValue <= 0) return 0;
        return levelByValue.get(itemValue) ?? 1;
      };

      const cells: NormalizedCell[] = [];
      for (
        let current = gridStart;
        current <= gridEnd;
        current = addDays(current, 1)
      ) {
        const key = dateKey(current);
        const item = records.get(key);
        const inRange = current >= rangeStart && current <= rangeEnd;
        const itemValue = inRange ? (item?.value ?? 0) : 0;

        cells.push({
          date: current,
          key,
          item: inRange ? item : undefined,
          value: itemValue,
          level: getLevel(itemValue),
        });
      }

      const weeks = Array.from(
        { length: Math.ceil(cells.length / 7) },
        (_, index) => cells.slice(index * 7, index * 7 + 7),
      );

      const monthMap = new Map<number, string>([
        [0, monthFormatter.format(rangeStart)],
      ]);
      for (const [weekIndex, week] of weeks.entries()) {
        const firstOfMonth = week.find(
          (cell) =>
            cell.date.getUTCDate() === 1 &&
            cell.date >= rangeStart &&
            cell.date <= rangeEnd,
        );
        if (firstOfMonth) {
          monthMap.set(weekIndex, monthFormatter.format(firstOfMonth.date));
        }
      }
      const monthCandidates = [...monthMap].map(([weekIndex, label]) => ({
        label,
        weekIndex,
      }));
      const months = monthCandidates.filter((month, index) => {
        const nextMonth = monthCandidates[index + 1];
        return !nextMonth || nextMonth.weekIndex - month.weekIndex >= 2;
      });

      const rangeStartIndex = cells.findIndex(
        (cell) => cell.key === dateKey(rangeStart),
      );
      const rangeEndIndex = cells.findIndex(
        (cell) => cell.key === dateKey(rangeEnd),
      );

      return {
        cells,
        weeks,
        months,
        rangeStart,
        rangeEnd,
        rangeStartIndex,
        rangeEndIndex,
      };
    }, [data, endDate, safeLevels, safeMaxDays, startDate, weekStartsOn]);

    const controlledDate =
      value !== undefined && value !== null ? toUtcDate(value) : null;
    const controlledKey =
      value !== undefined
        ? controlledDate
          ? dateKey(clampDate(controlledDate, model.rangeStart, model.rangeEnd))
          : null
        : undefined;
    const initialDate =
      defaultValue !== undefined && defaultValue !== null
        ? toUtcDate(defaultValue)
        : null;
    const [internalKey, setInternalKey] = useState<string | null>(() =>
      initialDate
        ? dateKey(clampDate(initialDate, model.rangeStart, model.rangeEnd))
        : null,
    );
    const [focusedKey, setFocusedKey] = useState<string | null>(null);
    const [lastFocusedKey, setLastFocusedKey] = useState(() =>
      dateKey(model.rangeEnd),
    );
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [keyboardNavigation, setKeyboardNavigation] = useState(false);
    const [tooltipDirection, setTooltipDirection] =
      useState<TooltipDirection>("none");
    const previousHoveredIndex = useRef<number | null>(null);
    const cellRefs = useRef(new Map<string, HTMLButtonElement>());
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const internalDate = internalKey ? toUtcDate(internalKey) : null;
    const resolvedInternalKey = internalDate
      ? dateKey(clampDate(internalDate, model.rangeStart, model.rangeEnd))
      : null;
    const selectedKey =
      controlledKey !== undefined ? controlledKey : resolvedInternalKey;
    const rovingKey = model.cells.some((cell) => cell.key === lastFocusedKey)
      ? lastFocusedKey
      : (selectedKey ?? dateKey(model.rangeEnd));
    const activeKey = keyboardNavigation
      ? (focusedKey ?? selectedKey)
      : (hoveredKey ?? focusedKey ?? selectedKey);
    const activeCell = activeKey
      ? model.cells.find((cell) => cell.key === activeKey)
      : undefined;
    const rovingIndex = model.cells.findIndex((cell) => cell.key === rovingKey);

    useEffect(() => {
      const scrollArea = scrollAreaRef.current;
      if (!scrollArea || model.weeks.length === 0) return;
      scrollArea.scrollLeft = scrollArea.scrollWidth;
    }, [model.weeks.length]);

    const selectCell = (cell: NormalizedCell, activate = false) => {
      const clamped = clampDate(cell.date, model.rangeStart, model.rangeEnd);
      const key = dateKey(clamped);
      const item = model.cells.find((candidate) => candidate.key === key)?.item;
      if (value === undefined) setInternalKey(key);
      onValueChange?.(clamped, item);
      if (activate) onCellSelect?.(item, clamped);
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) => {
      let nextIndex = index;
      const rowIndex = index % 7;

      if (event.key === "ArrowLeft") nextIndex = index - 7;
      else if (event.key === "ArrowRight") nextIndex = index + 7;
      else if (event.key === "ArrowUp")
        nextIndex = rowIndex === 0 ? index : index - 1;
      else if (event.key === "ArrowDown")
        nextIndex = rowIndex === 6 ? index : index + 1;
      else if (event.key === "Home") {
        if (event.metaKey || event.ctrlKey) {
          nextIndex = model.rangeStartIndex;
        } else {
          nextIndex = model.cells.findIndex(
            (cell, candidateIndex) =>
              candidateIndex >= model.rangeStartIndex &&
              candidateIndex % 7 === rowIndex &&
              cell.date <= model.rangeEnd,
          );
        }
      } else if (event.key === "End") {
        if (event.metaKey || event.ctrlKey) {
          nextIndex = model.rangeEndIndex;
        } else {
          for (
            let candidateIndex = model.rangeEndIndex;
            candidateIndex >= model.rangeStartIndex;
            candidateIndex -= 1
          ) {
            if (candidateIndex % 7 === rowIndex) {
              nextIndex = candidateIndex;
              break;
            }
          }
        }
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCell(model.cells[index], true);
        return;
      } else {
        return;
      }

      event.preventDefault();
      const boundedIndex =
        nextIndex >= model.rangeStartIndex && nextIndex <= model.rangeEndIndex
          ? nextIndex
          : index;
      const nextCell = model.cells[boundedIndex];
      setKeyboardNavigation(true);
      setHoveredKey(null);
      setFocusedKey(nextCell.key);
      setLastFocusedKey(nextCell.key);
      requestAnimationFrame(() => {
        cellRefs.current.get(nextCell.key)?.focus();
      });
    };

    const weekdayLabels = useMemo(
      () => getWeekdayLabels(weekStartsOn, weekdayFormatter),
      [weekStartsOn],
    );
    const activeContext: ActivityGraphValueContext | undefined = activeCell
      ? {
          date: activeCell.date,
          item: activeCell.item,
          value: activeCell.value,
          level: activeCell.level,
        }
      : undefined;
    const tooltipContentOffset =
      tooltipDirection === "left"
        ? { x: -4, y: 0 }
        : tooltipDirection === "right"
          ? { x: 4, y: 0 }
          : tooltipDirection === "up"
            ? { x: 0, y: -4 }
            : tooltipDirection === "down"
              ? { x: 0, y: 4 }
              : { x: 0, y: 0 };
    const totalActivity = model.cells.reduce(
      (total, cell) => total + cell.value,
      0,
    );
    const summaryId = `${layoutId}-summary`;

    return (
      <Tooltip.Provider delay={Math.max(0, tooltipDelay)}>
        <div
          ref={forwardedRef}
          data-slot="activity-graph"
          className={cn(
            "w-full text-[var(--activity-graph-label)] [@media(pointer:coarse)]:[--activity-graph-cell-size:1.25rem]",
            className,
          )}
          style={{ ...resolvedTokenStyle, ...style }}
          {...rootProps}
        >
          <p id={summaryId} className="sr-only">
            {totalActivity} total activities from{" "}
            {dateFormatter.format(model.rangeStart)} to{" "}
            {dateFormatter.format(model.rangeEnd)}.
          </p>

          {showValue && (
            <div
              data-slot="activity-graph-value"
              className="mb-3 flex min-h-5 items-baseline gap-2 text-sm"
            >
              {activeContext && renderValue ? (
                renderValue(activeContext)
              ) : activeContext ? (
                <>
                  <span className="font-medium">
                    {dateFormatter.format(activeContext.date)}
                  </span>
                  <span className="text-[var(--activity-graph-muted-label)] tabular-nums">
                    {activeContext.value === 0
                      ? emptyLabel
                      : `${activeContext.value} ${activeContext.value === 1 ? "activity" : "activities"}`}
                  </span>
                </>
              ) : (
                <span className="font-medium tabular-nums">
                  {totalActivity} total{" "}
                  {totalActivity === 1 ? "activity" : "activities"}
                </span>
              )}
            </div>
          )}

          <div
            ref={scrollAreaRef}
            data-slot="activity-graph-scroll-area"
            className={cn(
              "max-w-full overflow-x-auto pb-1 [scrollbar-width:thin]",
              gridClassName,
            )}
          >
            <div className="w-max min-w-full">
              {showMonthLabels && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "mb-1 grid h-4 text-[0.6875rem] text-[var(--activity-graph-muted-label)]",
                    showWeekdayLabels && "ml-7",
                  )}
                  style={{
                    gridTemplateColumns: `repeat(${model.weeks.length}, var(--activity-graph-cell-size))`,
                    columnGap: "var(--activity-graph-cell-gap)",
                  }}
                >
                  {model.months.map((month) => (
                    <span
                      key={`${month.label}-${month.weekIndex}`}
                      className="whitespace-nowrap"
                      style={{ gridColumnStart: month.weekIndex + 1 }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-[var(--activity-graph-cell-gap)]">
                {showWeekdayLabels && (
                  <div
                    aria-hidden="true"
                    className="grid w-6 shrink-0 text-[0.625rem] text-[var(--activity-graph-muted-label)]"
                    style={{
                      gridTemplateRows:
                        "repeat(7, var(--activity-graph-cell-size))",
                      rowGap: "var(--activity-graph-cell-gap)",
                    }}
                  >
                    {weekdayLabels.map((weekday) => (
                      <span
                        key={weekday.key}
                        className={cn(
                          "flex items-center",
                          ![1, 3, 5].includes(weekday.day) && "invisible",
                        )}
                      >
                        {weekday.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* biome-ignore lint/a11y/useSemanticElements: the interactive calendar uses ARIA grid navigation rather than table navigation */}
                <div
                  role="grid"
                  aria-label={ariaLabel}
                  aria-describedby={summaryId}
                  aria-rowcount={7}
                  aria-colcount={model.weeks.length}
                  data-slot="activity-graph-grid"
                  className="m-0 grid min-w-0 grid-flow-col border-0 p-0"
                  style={{
                    gridTemplateRows:
                      "repeat(7, var(--activity-graph-cell-size))",
                    gridTemplateColumns: `repeat(${model.weeks.length}, var(--activity-graph-cell-size))`,
                    gap: "var(--activity-graph-cell-gap)",
                  }}
                  onMouseLeave={() => {
                    previousHoveredIndex.current = null;
                    setHoveredKey(null);
                    setTooltipDirection("none");
                  }}
                >
                  {model.cells.map((cell, index) => {
                    const outsideRange =
                      cell.date < model.rangeStart ||
                      cell.date > model.rangeEnd;
                    const isSelected = cell.key === selectedKey;
                    const label =
                      cell.item?.label ??
                      (cell.value === 0
                        ? emptyLabel
                        : `${cell.value} ${cell.value === 1 ? "activity" : "activities"}`);

                    if (outsideRange) {
                      return (
                        <span
                          key={cell.key}
                          aria-hidden="true"
                          data-slot="activity-graph-spacer"
                        />
                      );
                    }

                    return (
                      <Tooltip.Trigger
                        key={cell.key}
                        handle={tooltipHandle}
                        payload={{
                          date: cell.date,
                          item: cell.item,
                          value: cell.value,
                          level: cell.level,
                        }}
                        disabled={!showTooltip}
                        render={<button type="button" />}
                        role="gridcell"
                        aria-rowindex={(index % 7) + 1}
                        aria-colindex={Math.floor(index / 7) + 1}
                        aria-label={`${dateFormatter.format(cell.date)}: ${label}`}
                        aria-current={isSelected ? "date" : undefined}
                        aria-selected={isSelected}
                        tabIndex={index === rovingIndex ? 0 : -1}
                        ref={(node: HTMLButtonElement | null) => {
                          if (node) cellRefs.current.set(cell.key, node);
                          else cellRefs.current.delete(cell.key);
                        }}
                        data-slot="activity-graph-cell"
                        data-activity-graph={layoutId}
                        data-date={cell.key}
                        onPointerEnter={(event) => {
                          if (event.pointerType === "touch") return;
                          const previousIndex = previousHoveredIndex.current;

                          if (previousIndex === null) {
                            setTooltipDirection("none");
                          } else {
                            const horizontalDelta =
                              Math.floor(index / 7) -
                              Math.floor(previousIndex / 7);
                            const verticalDelta =
                              (index % 7) - (previousIndex % 7);

                            if (
                              Math.abs(horizontalDelta) >=
                              Math.abs(verticalDelta)
                            ) {
                              setTooltipDirection(
                                horizontalDelta < 0 ? "left" : "right",
                              );
                            } else {
                              setTooltipDirection(
                                verticalDelta < 0 ? "up" : "down",
                              );
                            }
                          }

                          previousHoveredIndex.current = index;
                          setKeyboardNavigation(false);
                          setHoveredKey(cell.key);
                        }}
                        onPointerDown={() => setKeyboardNavigation(false)}
                        onClick={() => selectCell(cell, true)}
                        onFocus={() => {
                          setFocusedKey(cell.key);
                          setLastFocusedKey(cell.key);
                        }}
                        onBlur={() => setFocusedKey(null)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        className={cn(
                          "relative isolate rounded-[var(--activity-graph-cell-radius)] outline-none transition-[filter,box-shadow] duration-150 before:absolute before:inset-[calc(var(--activity-graph-cell-gap)/-2)] before:content-[''] hover:brightness-110",
                          "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--activity-graph-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          "active:scale-[0.96]",
                          isSelected &&
                            "z-[1] ring-1 ring-[var(--activity-graph-focus-ring)] ring-offset-1 ring-offset-background",
                          cell.level === 0
                            ? "bg-[var(--activity-graph-empty)]"
                            : levelClasses[cell.level - 1],
                          cellClassName,
                        )}
                      ></Tooltip.Trigger>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {showLegend && (
            <div
              data-slot="activity-graph-legend"
              className={cn(
                "mt-3 flex items-center justify-end gap-1.5 text-[0.6875rem] text-[var(--activity-graph-muted-label)]",
                legendClassName,
              )}
            >
              <span>Less</span>
              <span
                aria-hidden="true"
                className="size-[var(--activity-graph-cell-size)] rounded-[var(--activity-graph-cell-radius)] bg-[var(--activity-graph-empty)]"
              />
              {Array.from({ length: safeLevels }, (_, index) => (
                <span
                  key={levelClasses[index]}
                  aria-hidden="true"
                  className={cn(
                    "size-[var(--activity-graph-cell-size)] rounded-[var(--activity-graph-cell-radius)]",
                    levelClasses[index],
                  )}
                />
              ))}
              <span>More</span>
            </div>
          )}
        </div>

        <Tooltip.Root handle={tooltipHandle} disabled={!showTooltip}>
          {({ payload }) => (
            <Tooltip.Portal>
              <Tooltip.Positioner
                sideOffset={8}
                collisionPadding={8}
                className={cn(
                  "z-50 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
                  (shouldReduceMotion || keyboardNavigation) &&
                    "transition-none",
                )}
                style={resolvedTokenStyle}
              >
                <Tooltip.Popup
                  data-slot="activity-graph-tooltip"
                  className={cn(
                    "relative max-w-64 origin-[var(--transform-origin)] rounded-lg border border-border/70 bg-[var(--activity-graph-tooltip-surface)] px-2.5 py-2 text-xs text-[var(--activity-graph-tooltip-foreground)] shadow-lg backdrop-blur-md",
                    "transition-[transform,opacity,filter] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:blur-[2px] data-instant:transition-none data-starting-style:scale-[0.96] data-starting-style:opacity-0 data-starting-style:blur-[2px]",
                    shouldReduceMotion && "transition-none",
                    tooltipClassName,
                  )}
                >
                  {payload && (
                    <motion.div
                      key={dateKey(payload.date)}
                      data-slot="activity-graph-tooltip-content"
                      initial={
                        shouldReduceMotion ||
                        keyboardNavigation ||
                        tooltipDirection === "none"
                          ? false
                          : {
                              opacity: 0.72,
                              x: tooltipContentOffset.x,
                              y: tooltipContentOffset.y,
                            }
                      }
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{
                        duration: 0.14,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      {renderTooltip ? (
                        renderTooltip(payload)
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium">
                            {dateFormatter.format(payload.date)}
                          </span>
                          <span className="text-muted-foreground tabular-nums">
                            {payload.item?.label ??
                              (payload.value === 0
                                ? emptyLabel
                                : `${payload.value} ${payload.value === 1 ? "activity" : "activities"}`)}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                  <Tooltip.Arrow className="flex size-2.5 rotate-45 border-border/70 border-r border-b bg-[var(--activity-graph-tooltip-surface)]" />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  },
);

export default ActivityGraph;
