"use client";

import { useState } from "react";

import ScheduleChip, {
  type ScheduleValue,
} from "@/registry/sonaui/schedule-chip/schedule-chip";

const initialSchedule: ScheduleValue = {
  date: "2026-09-09",
  time: "09:00",
  timezone: "Asia/Colombo",
};

const presets = [
  {
    label: "Tomorrow morning",
    value: initialSchedule,
  },
  {
    label: "Friday afternoon",
    value: {
      date: "2026-09-11",
      time: "15:00",
      timezone: "Asia/Colombo",
    },
  },
];

function formatSchedule(value: ScheduleValue | null) {
  if (!value) return "Add schedule";
  if (value.date === "2026-09-09" && value.time === "09:00") {
    return "Tomorrow, 9 AM";
  }
  if (value.date === "2026-09-11" && value.time === "15:00") {
    return "Friday, 3 PM";
  }
  return `${value.date}, ${value.time}`;
}

export default function ScheduleChipDemo() {
  const [schedule, setSchedule] = useState<ScheduleValue | null>(
    initialSchedule,
  );

  return (
    <ScheduleChip
      value={schedule}
      onValueChange={setSchedule}
      formatSummary={formatSchedule}
      presets={presets}
      timezones={["Asia/Colombo", "UTC", "America/New_York"]}
      validate={(draft) => {
        if (!draft) return null;
        if (!draft.date || !draft.time) return "Choose both a date and time.";
        return null;
      }}
    />
  );
}
