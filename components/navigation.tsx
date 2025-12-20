"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/resources", label: "Getting Started" },
    { href: "/reflections", label: "Reflections" },
    { href: "/about", label: "About" },
    { href: "/labs", label: "Labs" },
    { href: "/network", label: "Network" },
    { href: "/videos", label: "Videos" },
  ];

  const isMapsSection =
    pathname?.startsWith("/map") || pathname?.startsWith("/jefferson");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">H</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline-block">
            Harvard Physics
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "text-sm font-medium transition-colors inline-flex items-center gap-1",
                  isMapsSection
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Maps
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/map">Campus Map</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/jefferson">Jefferson Floor Plans</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ml-auto flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
