"use client";

import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";

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

  return children;
}
