import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="physics-lab-theme">
          <Navigation />
          <main className="min-h-screen bg-gradient-to-b from-background to-muted">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
