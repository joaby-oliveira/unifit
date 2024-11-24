"use client";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import "@/lib/dayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/auth-store";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn, typeUser, login } = useAuthStore();

  useEffect(() => {
    login();
  }, []);

  if (isLoggedIn && typeUser) {
    const routerPush = typeUser === "USER" ? "/app" : "/adm";
    router.push(routerPush);
  } else {
    router.push("/auth");
  }

  return (
    <html lang="pt-br">
      <body className={`$antialiased`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
      <Toaster />
    </html>
  );
}
