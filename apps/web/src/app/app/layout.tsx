"use client"

import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
