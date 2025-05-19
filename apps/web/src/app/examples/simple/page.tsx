"use client";

import dayjs from "dayjs";
import React from "react";

import { cn } from "@rallly/ui";
import { useHeadlessDatePicker } from "@/components/headless-date-picker";
import type { DateTimeOption } from "@/components/forms/poll-options-form";
import {
  formatDateWithoutTime,
  formatDateWithoutTz,
  removeAllOptionsForDay,
} from "@/components/forms/poll-options-form/utils";

export default function SimpleExample() {
  const [options, setOptions] = React.useState<DateTimeOption[]>([]);
  const [navigationDate, setNavigationDate] = React.useState(new Date());

  const datepicker = useHeadlessDatePicker({
    date: navigationDate,
    selection: options.map((o) =>
      new Date(o.type === "date" ? `${o.date}T12:00:00` : o.start),
    ),
    onNavigationChange: setNavigationDate,
  });

  const onChange = React.useCallback((opts: DateTimeOption[]) => {
    setOptions(opts);
  }, []);

  const onNavigate = React.useCallback((date: Date) => {
    setNavigationDate(date);
  }, []);

  const isTimedEvent = false;
  const duration = 60;

  return (
    <div className="p-4">
      <div className="grid grow grid-cols-7 rounded-md border bg-white shadow-sm">
        {datepicker.days.map((day, i) => {
          return (
            <div
              key={i}
              className={cn("h-11", {
                "border-r": (i + 1) % 7 !== 0,
                "border-b": i < datepicker.days.length - 7,
              })}
            >
              <button
                type="button"
                onClick={() => {
                  if (
                    datepicker.selection.some((selectedDate) =>
                      dayjs(selectedDate).isSame(day.date, "day"),
                    )
                  ) {
                    onChange(removeAllOptionsForDay(options, day.date));
                  } else {
                    const selectedDate = dayjs(day.date)
                      .set("hour", 12)
                      .toDate();
                    const newOption: DateTimeOption = !isTimedEvent
                      ? {
                          type: "date",
                          date: formatDateWithoutTime(selectedDate),
                        }
                      : {
                          type: "timeSlot",
                          start: formatDateWithoutTz(selectedDate),
                          duration,
                          end: formatDateWithoutTz(
                            dayjs(selectedDate)
                              .add(duration, "minutes")
                              .toDate(),
                          ),
                        };

                    onChange([...options, newOption]);
                    onNavigate(selectedDate);
                  }
                  if (day.outOfMonth) {
                    if (i < 6) {
                      datepicker.prev();
                    } else {
                      datepicker.next();
                    }
                  }
                }}
                className={cn(
                  "group relative flex h-full w-full items-start justify-end rounded-none px-2.5 py-1.5 text-sm font-medium tracking-tight focus:z-10 focus:rounded",
                  {
                    "bg-gray-100 text-gray-400": day.isPast,
                    "text-rose-600": day.today && !day.selected,
                    "bg-gray-50 text-gray-500":
                      day.outOfMonth && !day.isPast,
                    "text-primary-600": day.selected,
                  },
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-1 -z-0 rounded-md border",
                    day.selected
                      ? "border-primary-300 group-hover:border-primary-400 border-dashed shadow-sm"
                      : "border-dashed border-transparent group-hover:border-gray-400 group-active:bg-gray-200",
                  )}
                ></span>
                <span className="z-10">{day.day}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
