"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { FlaskConical, Users, Map, Brain } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <FlaskConical className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Physics Research</span>
        </Link>

        <NavigationMenu className="mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/labs" className={cn(navigationMenuTriggerStyle())}>
                <Users className="mr-2 h-4 w-4" />
                Research Labs
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/map" className={cn(navigationMenuTriggerStyle())}>
                <Map className="mr-2 h-4 w-4" />
                Lab Map
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/ai" className={cn(navigationMenuTriggerStyle())}>
                <Brain className="mr-2 h-4 w-4" />
                Research Matcher
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};