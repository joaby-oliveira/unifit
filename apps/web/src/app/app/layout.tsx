"use client";

import { queryClient } from "@/lib/react-query";
import useAuthStore from "@/stores/auth-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) router.push("/auth")

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
