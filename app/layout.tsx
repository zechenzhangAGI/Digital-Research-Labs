import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Harvard Physics Lab Hub",
  description: "Central hub for Harvard Physics Department research infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-background to-black">
          {children}
        </main>
      </body>
    </html>
  );
}
