"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Use key to force re-mount and CSS animation on route change
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}

