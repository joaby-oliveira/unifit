"use client";

import useAuthStore from "@/stores/auth-store";
import { CheckInButton } from "./_components/check-in-button";
import { Header } from "./_components/header";
import { SummaryTable } from "./_components/summary-table";
import { useQuery } from "@tanstack/react-query";
import { UserInterface } from "@/types/user";
import axios from "axios";
import { useEffect } from "react";
import useUserStore from "@/stores/user-store";
import { decode } from "jsonwebtoken";

export interface JwtPayload {
  sub: number;
  email: string;
  accessLevel: string;
  iat: number;
}

async function getUserInfo(token: string): Promise<UserInterface> {
  const jwtDecoded = decode(token) as JwtPayload | null;

  const { data } = await axios.get(
    `http://localhost:3001/user/${jwtDecoded?.sub}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export default function Page(): JSX.Element {
  const { getToken } = useAuthStore();
  const { setUser } = useUserStore();
  const token = getToken();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-user-info"],
    queryFn: () => getUserInfo(token!),
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
