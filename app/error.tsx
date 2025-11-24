"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <CardTitle className="text-2xl">Something went wrong!</CardTitle>
          </div>
          <CardDescription className="text-base">
            We encountered an error while loading this page. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error.message && (
            <div className="mb-6 p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground font-mono">
                {error.message}
              </p>
            </div>
          )}
          <Button onClick={reset} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
