"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show on homepage
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  
  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { name, href };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.href}>
            <li className="flex items-center">
              {index === 0 ? (
                <Link
                  href={crumb.href}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                </Link>
              ) : index === breadcrumbs.length - 1 ? (
                <span className="text-foreground font-medium">{crumb.name}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-primary transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4" />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
