import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"; // Ini nyambungin CSS kita

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cosmic Aura 2025",
  description: "Check your 2025 frequency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}