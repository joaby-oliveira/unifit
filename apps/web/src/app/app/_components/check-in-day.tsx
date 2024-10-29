"use client";

import clsx from "clsx";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import "@/lib/dayjs";

export function CheckInDay({
  isChecked = false,
  date,
}: {
  isChecked: boolean;
  date: Date;
}) {
  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  return (
    <Popover>
      <PopoverTrigger
        className={clsx(
          "w-14 h-14 border-2 rounded-[0.75rem] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-400 border-2 border-zinc-400": !isChecked,
            "bg-primary border-primary": isChecked,
          }
        )}
      />

      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <span className="capitalize font-bold">{dayOfWeek}</span>
        <span className="text-sm text-zinc-400">{dayAndMonth}</span>
      </PopoverContent>
    </Popover>
  );
}
