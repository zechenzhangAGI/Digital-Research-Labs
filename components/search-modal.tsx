"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FlaskConical, Wrench, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Sample search data - in production, this would come from your data source
const searchData = [
  { type: "lab", name: "Franklin Lab", pi: "Melissa Franklin", url: "/labs/franklin", description: "Particle Physics" },
  { type: "lab", name: "Cohen Lab", pi: "Adam Cohen", url: "/labs/cohen", description: "Biophysics" },
  { type: "lab", name: "Manoharan Group", pi: "Vinothan Manoharan", url: "/labs/manoharan", description: "Biophysics" },
  { type: "lab", name: "Cotler Group", pi: "Jordan Cotler", url: "/labs/cotler", description: "Quantum Computing" },
  { type: "lab", name: "Mitrano Group", pi: "Matteo Mitrano", url: "/labs/mitrano", description: "Solid State" },
  { type: "lab", name: "Mundy Group", pi: "Julia Mundy", url: "/labs/mundy", description: "Solid State" },
  { type: "equipment", name: "TIRF Microscope", location: "Lyman 415", url: "/equipment#tirf-microscope" },
  { type: "equipment", name: "Dilution Refrigerator", location: "Jefferson 301", url: "/equipment#dilution-fridge" },
  { type: "equipment", name: "Femtosecond Laser System", location: "McKay 512", url: "/equipment#femto-laser" },
  { type: "page", name: "Interactive Lab Maps", url: "/map", description: "Navigate building floor plans" },
  { type: "page", name: "AI Assistant", url: "/ai", description: "Get research recommendations" },
  { type: "page", name: "Equipment Database", url: "/equipment", description: "Browse and book equipment" },
];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return searchData
      .filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          ("pi" in item && item.pi?.toLowerCase().includes(lowerQuery)) ||
          ("description" in item && item.description?.toLowerCase().includes(lowerQuery)) ||
          ("location" in item && item.location?.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 8);
  }, [query]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(url);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const getIcon = (type: string) => {
    switch (type) {
      case "lab":
        return <FlaskConical className="h-4 w-4 text-muted-foreground" />;
      case "equipment":
        return <Wrench className="h-4 w-4 text-muted-foreground" />;
      case "page":
        return <MapPin className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for labs, equipment, or pages
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {results.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto px-2 pb-4">
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(result.url)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent transition-colors text-left group"
                >
                  {getIcon(result.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {result.name}
                    </div>
                    {"pi" in result && result.pi && (
                      <div className="text-sm text-muted-foreground">
                        PI: {result.pi}
                      </div>
                    )}
                    {"location" in result && result.location && (
                      <div className="text-sm text-muted-foreground">
                        {result.location}
                      </div>
                    )}
                    {"description" in result && result.description && !("pi" in result) && (
                      <div className="text-sm text-muted-foreground">
                        {result.description}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {result.type}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="px-6 py-12 text-center text-muted-foreground">
            No results found for "{query}"
          </div>
        )}

        {!query && (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">Start typing to search...</p>
            <p className="text-xs">
              Press{" "}
              <kbd className="px-2 py-1 text-xs bg-muted rounded">
                {typeof navigator !== "undefined" &&
                navigator.platform.toLowerCase().includes("mac")
                  ? "⌘"
                  : "Ctrl"}
                +K
              </kbd>{" "}
              to open search anytime
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
