import dayjs from "dayjs";

export type DateOption = {
  type: "date";
  date: string;
};

export type TimeOption = {
  type: "timeSlot";
  start: string;
  duration: number;
  end: string;
};

export type DateTimeOption = DateOption | TimeOption;

export function formatDateWithoutTz(date: Date): string {
  return dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
}

export function formatDateWithoutTime(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

export function removeAllOptionsForDay(
  options: DateTimeOption[],
  date: Date,
) {
  return options.filter((option) => {
    return !dayjs(date).isSame(
      option.type === "date" ? option.date : option.start,
      "day",
    );
  });
}
