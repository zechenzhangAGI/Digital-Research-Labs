import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Harvard Physics Lab Hub",
  description: "Central hub for Harvard Physics Department research infrastructure",
  keywords: ["Harvard Physics", "Research Labs", "Equipment Booking", "Collaboration"],
  openGraph: {
    title: "Harvard Physics Lab Hub",
    description: "Central hub for Harvard Physics Department research infrastructure",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation />
          <Breadcrumbs />
          <main className="min-h-screen bg-linear-to-b from-background to-background/95">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
