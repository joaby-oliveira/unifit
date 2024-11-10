"use client";

import api from "@/lib/api";
import { generateDatesFromMonthBeginning } from "@/utils/generate-dates-from-month";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CheckInDay } from "./check-in-day";

const summaryDates = generateDatesFromMonthBeginning();

const minimumSummaryDatesSize = dayjs().daysInMonth();
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

interface CheckIn {
  id: number;
  id_user: number;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

async function getSummary(): Promise<CheckIn[]> {
  const { data } = await api.get("/checkin");
  return data.data;
}

export function SummaryTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-summary"],
    queryFn: () => getSummary(),
  });

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-col gap-2 ">
        {summaryDates.map((date) => {
          const dayIsChecked = data!.some((checkin) => {
            return dayjs(checkin.createdAt).isSame(dayjs(date), "day") && checkin.confirmed;
          });

          return (
            <CheckInDay
              key={date.toString()}
              date={date}
              isChecked={dayIsChecked}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-14 h-14 bg-zinc-400 border-2 border-zinc-400 opacity-40 cursor-not-allowed rounded-lg"
              />
            );
          })}
      </div>
    </div>
  );
}
