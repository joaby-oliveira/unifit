"use client";

import api from "@/lib/api";
import useAuthStore from "@/stores/auth-store";
import useUserStore from "@/stores/user-store";
import { JwtPayload } from "@/types/jwt";
import { UserInterface } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { decode } from "jsonwebtoken";
import { useEffect } from "react";
import { CheckInButton } from "./_components/check-in-button";
import { Header } from "./_components/header";
import { SummaryTable } from "./_components/summary-table";

async function getUserInfo(id: number): Promise<UserInterface> {
  const { data } = await api.get(`/user/${id}`);
  return data;
}

export default function Page(): JSX.Element {
  const { getToken } = useAuthStore();
  const { setUser } = useUserStore();
  const token = getToken();
  const jwtDecoded = decode(token!) as JwtPayload | null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-user-info"],
    queryFn: () => getUserInfo(jwtDecoded!.sub),
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setUser(data!);
    }
  }, [data]);

  return (
    <main className="h-screen w-screen flex flex-col items-center p-2 gap-4">
      <Header />
      <div className="w-full h-full gap-2">
        <SummaryTable />
      </div>
      <CheckInButton />
    </main>
  );
}
