import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Harvard Physics Lab Hub",
    template: "%s | Harvard Physics Lab Hub"
  },
  description: "Central hub for Harvard Physics Department research infrastructure. Explore labs, book equipment, and collaborate across quantum computing, biophysics, and condensed matter research.",
  keywords: ["Harvard Physics", "research labs", "quantum computing", "biophysics", "equipment booking", "scientific collaboration"],
  authors: [{ name: "Harvard Physics 95 Class, Fall 2025" }],
  openGraph: {
    title: "Harvard Physics Lab Hub",
    description: "Accelerating scientific discovery through AI-powered collaboration and resource optimization across Harvard's physics research infrastructure",
    url: "https://physics-lab-hub.vercel.app",
    siteName: "Harvard Physics Lab Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harvard Physics Lab Hub"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
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
          <main className="min-h-screen bg-linear-to-b from-background to-muted">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
