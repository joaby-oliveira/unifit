"use client";

import clsx from "clsx";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { useState } from "react";
import "@/lib/dayjs";

export function CheckInDay({
  isChecked = false,
  date,
}: {
  isChecked: false;
  date: Date;
}) {
  const [check, setCheck] = useState(isChecked);

  const dayAndMonth = dayjs(date).format("DD/MM");

  const dayOfWeek = dayjs(date).format("dddd");

  return (
    <Popover>
      <PopoverTrigger
        className={clsx(
          "w-10 h-10 border-2 rounded-[0.75rem] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-400 border-2 border-zinc-400": !check,
            "bg-primary border-primary": check,
          }
        )}
      />

      <PopoverContent>
        <span className="">{dayOfWeek}</span>
        <span className="">{dayAndMonth}</span>
      </PopoverContent>
    </Popover>
  );
}
