"use client";

import { Header } from "@/components/header";
import useAuthStore from "@/stores/auth-store";
import useUserStore from "@/stores/user-store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { decode } from "jsonwebtoken";
import api from "@/lib/api";
import { UserInterface } from "@/types/user";
import { JwtPayload } from "@/types/jwt";

async function getUserInfo(id: number): Promise<UserInterface> {
  const { data } = await api.get(`/user/${id}`);
  return data;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { typeUser, getToken } = useAuthStore();
  const { setUser, user } = useUserStore();
  const router = useRouter();
  const token = getToken();
  const jwtDecoded = decode(token!) as JwtPayload | null;

  if (typeUser === "USER") {
    router.push("/app");
  }

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
      {children}
    </main>
  );
}
