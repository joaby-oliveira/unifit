import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import '@/lib/dayjs';

export const metadata: Metadata = {
  title: "Unifit",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`$antialiased`}>{children}</body>
      <Toaster />
    </html>
  );
}
