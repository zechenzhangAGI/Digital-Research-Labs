import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Harvard Physics Lab Hub",
    template: "%s | Harvard Physics Lab Hub"
  },
  description: "Discover physics research opportunities at Harvard. Browse labs, explore research areas, and find your path to joining cutting-edge research projects.",
  keywords: ["Harvard Physics", "undergraduate research", "physics labs", "research opportunities", "quantum physics", "biophysics", "STEM research"],
  authors: [{ name: "Harvard Physics 95 Class, Fall 2025" }],
  openGraph: {
    title: "Harvard Physics Lab Hub",
    description: "Discover physics research opportunities at Harvard and find your path to joining cutting-edge research projects",
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
          <footer className="border-t bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <h3 className="font-semibold mb-3">About</h3>
                  <p className="text-sm text-muted-foreground">
                    Helping Harvard undergraduates discover physics research opportunities and connect with faculty.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Quick Links</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/labs" className="hover:text-foreground transition-colors">Research Labs</a></li>
                    <li><a href="/map" className="hover:text-foreground transition-colors">Lab Map</a></li>
                    <li><a href="/ai" className="hover:text-foreground transition-colors">Research Matcher</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Resources</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="https://physics.harvard.edu" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Harvard Physics</a></li>
                    <li><a href="https://uraf.harvard.edu" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Undergraduate Research</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t pt-6 text-center text-sm text-muted-foreground">
                <p>&copy; 2025 Harvard Physics 95 Class. Built with Next.js for the undergraduate physics community.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
