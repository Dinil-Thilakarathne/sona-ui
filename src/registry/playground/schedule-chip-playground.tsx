"use client";

import { useState } from "react";

import ScheduleChip, {
  type ScheduleValue,
} from "@/registry/sonaui/schedule-chip/schedule-chip";

export default function ScheduleChipPlayground() {
  const [value, setValue] = useState<ScheduleValue | null>({
    date: "2026-09-09",
    time: "09:00",
    timezone: "Asia/Colombo",
  });

  return (
    <ScheduleChip
      value={value}
      onValueChange={setValue}
      formatSummary={(schedule) =>
        schedule?.date === "2026-09-11" ? "Friday, 3 PM" : "Tomorrow, 9 AM"
      }
      presets={[
        {
          label: "Tomorrow morning",
          value: {
            date: "2026-09-09",
            time: "09:00",
            timezone: "Asia/Colombo",
          },
        },
        {
          label: "Friday afternoon",
          value: {
            date: "2026-09-11",
            time: "15:00",
            timezone: "Asia/Colombo",
          },
        },
      ]}
      timezones={["Asia/Colombo", "UTC", "America/New_York"]}
    />
  );
}
