import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base font-medium text-primary mb-4 tracking-wide">
              Harvard Physics Department
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-5 text-foreground leading-[1.1]">
              Discover Research Opportunities
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Explore cutting-edge physics research at Harvard and find opportunities to get involved as an undergraduate researcher.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild className="rounded-full px-6">
                <Link href="/labs">
                  Browse Labs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-6">
                <Link href="/map">
                  View Campus Map
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-semibold text-foreground">40+</p>
              <p className="text-sm text-muted-foreground mt-1">Research Labs</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-semibold text-foreground">200+</p>
              <p className="text-sm text-muted-foreground mt-1">Researchers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-semibold text-foreground">100+</p>
              <p className="text-sm text-muted-foreground mt-1">Undergrads</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Involved */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">How to Get Involved</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Three simple steps to start your research journey
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-sm font-semibold">
              1
            </div>
            <h3 className="font-semibold mb-2">Explore Labs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Browse our research groups and discover what interests you
            </p>
          </div>
          <div className="text-center p-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-sm font-semibold">
              2
            </div>
            <h3 className="font-semibold mb-2">Map Your Options</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the campus map and floor plans to see where labs are and what they work on
            </p>
          </div>
          <div className="text-center p-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-sm font-semibold">
              3
            </div>
            <h3 className="font-semibold mb-2">Reach Out</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Contact the PI or lab members to express your interest
            </p>
          </div>
        </div>
      </section>

      {/* Featured Labs */}
      <section className="bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Featured Labs</h2>
              <p className="text-muted-foreground">
                Explore some of our active research groups
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/labs">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-primary">Particle Physics</span>
                </div>
                <CardTitle className="text-lg">Franklin Lab</CardTitle>
                <CardDescription>Prof. Melissa Franklin</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Searching for new particles using particle accelerators at CERN
                </p>
                <Link
                  href="/labs/franklin"
                  className="text-sm font-medium text-primary inline-flex items-center hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-primary">Biophysics</span>
                </div>
                <CardTitle className="text-lg">Cohen Lab</CardTitle>
                <CardDescription>Prof. Adam Cohen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Developing optical techniques to visualize voltage dynamics in neural tissue
                </p>
                <Link
                  href="/labs/cohen"
                  className="text-sm font-medium text-primary inline-flex items-center hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-primary">Solid State</span>
                </div>
                <CardTitle className="text-lg">Mitrano Group</CardTitle>
                <CardDescription>Prof. Matteo Mitrano</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Investigating quantum materials using advanced spectroscopy techniques
                </p>
                <Link
                  href="/labs/mitrano"
                  className="text-sm font-medium text-primary inline-flex items-center hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link href="/labs">
                View All Labs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Maps & Facilities CTA */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <Card className="max-w-3xl mx-auto border-primary/20 bg-primary/2">
          <CardContent className="p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-semibold mb-3">Plan Your Lab Visits</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Preview campus locations and Jefferson floor plans so you can navigate to meetings and lab tours with confidence.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Button asChild className="rounded-full px-6">
                <Link href="/map">
                  Open Campus Map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/jefferson">
                  Jefferson Floor Plans
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/labs" className="group">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Browse Labs</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore all research groups
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/map" className="group">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Campus Map</h3>
                  <p className="text-sm text-muted-foreground">
                    Find lab locations
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/resources" className="group">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Getting Started</h3>
                  <p className="text-sm text-muted-foreground">
                    Research guide for undergrads
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/network" className="group">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Lab Network</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with peers and mentors
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
