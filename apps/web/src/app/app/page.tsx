"use client";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth-store";
import axios from "axios";
import { SummaryTable } from "./_components/summary-table";
import { useQueryClient } from "@tanstack/react-query";
import { Header } from "./_components/header";

export default function Page(): JSX.Element {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  async function checkInDay() {
    const token = getToken();

    try {
      await axios.post(
        "http://localhost:3001/checkin",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["get-summary"],
      });
    } catch (error) {
      console.log("Erro ao fazer check-in:", error);
    }
  }

  return (
    <main className="h-screen w-screen flex flex-col items-center p-2 gap-4">
      <Header />

      <div className="w-full h-full gap-2">
        <SummaryTable />
      </div>

      <Button onClick={checkInDay} className="w-full" size="lg">
        Fazer check-in
      </Button>
    </main>
  );
}
