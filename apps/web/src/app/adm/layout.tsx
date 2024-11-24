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



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { typeUser } = useAuthStore();
  const router = useRouter();

  if (typeUser === "USER") {
    router.push("/app");
  }

  return (
    <main className="h-screen w-screen flex flex-col items-center p-2 gap-4">
      <Header />
      {children}
    </main>
  );
}
