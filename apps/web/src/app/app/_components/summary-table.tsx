"use client";

import dayjs from "dayjs";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { generateDatesFromMonthBeginning } from "@/utils/generate-dates-from-month";
import { CheckInDay } from "./check-in-day";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromMonthBeginning();

const minimumSummaryDatesSize = dayjs().daysInMonth();
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  const [summary, setSummary] = useState([]);

  return (
    <div className="w-full flex">
      {/* <div className="grid grid-rows-7 grid-flow-row gap-3 pt-1 pb-6">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className={clsx(
                "text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center border-r-2 mr-4 border-r-zinc-900",
                {
                  "border-r-violet-800": i == dayjs().day(),
                }
              )}
            >
              {weekDay}
            </div>
          );
        })}
      </div> */}

      <div className="grid grid-rows-7 grid-flow-col gap-1 ">
        {summaryDates.map((date) => {
          return (
            <CheckInDay
              key={date.toString()}
              date={date}
              isChecked={false}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-400 border-2 border-zinc-400 opacity-40 cursor-not-allowed rounded-lg"
              />
            );
          })}
      </div>
    </div>
  );
}
