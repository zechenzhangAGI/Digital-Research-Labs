import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FlaskConical,
  BookOpen,
  ArrowRight,
  Microscope,
  Atom,
  Zap,
  Brain,
  Lightbulb,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4" variant="secondary">
              Harvard Physics Department
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Discover Research Opportunities
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore cutting-edge physics research labs at Harvard and find opportunities to get involved as an undergraduate researcher
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/labs">
                  Browse Research Labs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/map">
                  Explore Lab Map
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-blue-600">40+</CardTitle>
              <CardDescription className="text-base">Research Labs</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-purple-600">200+</CardTitle>
              <CardDescription className="text-base">Graduate Researchers</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-green-600">100+</CardTitle>
              <CardDescription className="text-base">Undergraduate Researchers</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How to Get Involved Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-center">How to Get Involved</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Whether you're interested in quantum physics, biophysics, or astrophysics, there's a place for you in our research community
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4">
                  <FlaskConical className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="mb-2">1. Explore Labs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Browse our research labs to learn about ongoing projects and discover what interests you
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="mb-2">2. Find Your Match</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Use our AI assistant to match your interests and skills with research opportunities
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="mb-2">3. Reach Out</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Contact the Principal Investigator or lab members to express your interest and inquire about openings
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Labs */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">Featured Research Labs</h2>
        <p className="text-muted-foreground mb-8">
          Explore some of the exciting research happening in the Physics Department
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Atom className="h-8 w-8 text-blue-600" />
                <Badge variant="default">Quantum</Badge>
              </div>
              <CardTitle>Franklin Lab</CardTitle>
              <CardDescription>
                Prof. Melissa Franklin • Lyman 237
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Searching for new particles using particle accelerators at CERN
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>12 members</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/labs/franklin">
                    View Lab
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Microscope className="h-8 w-8 text-green-600" />
                <Badge variant="default">Biophysics</Badge>
              </div>
              <CardTitle>Cohen Lab</CardTitle>
              <CardDescription>
                Prof. Adam Cohen • Mallinckrodt 115
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Developing optical techniques to visualize voltage dynamics in neural tissue
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>18 members</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/labs/cohen">
                    View Lab
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-8 w-8 text-yellow-600" />
                <Badge variant="default">Solid State</Badge>
              </div>
              <CardTitle>Mitrano Group</CardTitle>
              <CardDescription>
                Prof. Matteo Mitrano • Jefferson 164
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Investigating quantum materials and their properties using advanced spectroscopy
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>20 members</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/labs/mitrano">
                    View Lab
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button size="lg" asChild>
            <Link href="/labs">
              View All Research Labs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* AI Research Matching */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-2xl">AI Research Assistant</CardTitle>
            </div>
            <CardDescription className="text-base">
              Get personalized recommendations to find the perfect research match for your interests and skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Match Your Interests
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tell our AI assistant about your coursework, skills, and research interests. 
                  Get personalized recommendations for labs that align with your academic goals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Connect with Researchers
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover labs actively looking for undergraduate researchers and learn what 
                  skills they're seeking. Find opportunities that match your experience level.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/ai">
                  Try AI Research Matcher
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12 pb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Quick Links</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/labs">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <FlaskConical className="h-12 w-12 text-blue-600 mb-3 mx-auto" />
                <CardTitle>Browse All Labs</CardTitle>
                <CardDescription>
                  Explore our complete directory of research groups
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/map">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-purple-600 mb-3 mx-auto" />
                <CardTitle>Lab Map</CardTitle>
                <CardDescription>
                  Navigate physics buildings and find lab locations
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/ai">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <Brain className="h-12 w-12 text-green-600 mb-3 mx-auto" />
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Get personalized research recommendations
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}