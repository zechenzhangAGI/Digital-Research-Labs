import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Skeleton className="h-6 w-48 mx-auto mb-4" />
            <Skeleton className="h-16 w-full max-w-2xl mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-10 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Labs Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <Skeleton className="h-9 w-64 mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full mb-4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
