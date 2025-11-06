import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FlaskConical,
  BookOpen,
  Activity,
  ArrowRight,
  Microscope,
  Atom,
  Zap,
  Brain,
  Globe,
  Award
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Research Lab Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Accelerating scientific discovery through AI-powered collaboration and resource optimization across Harvard's physics research infrastructure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/labs">
                  Explore Labs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/equipment">
                  Book Equipment
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-blue-600">47</CardTitle>
              <CardDescription className="text-base">Active Research Labs</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-green-600">250+</CardTitle>
              <CardDescription className="text-base">Equipment Units</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-purple-600">1,200</CardTitle>
              <CardDescription className="text-base">Active Researchers</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl font-bold text-orange-600">89%</CardTitle>
              <CardDescription className="text-base">Equipment Utilization</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Featured Labs */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Research Labs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Atom className="h-8 w-8 text-blue-600" />
                <Badge variant="default">Quantum</Badge>
              </div>
              <CardTitle>Quantum Computing Lab</CardTitle>
              <CardDescription>
                Prof. Sarah Chen • Room 301 Jefferson
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Developing next-generation quantum processors and algorithms for quantum supremacy experiments
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>12 members</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/labs/quantum">
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
              <CardTitle>Molecular Biophysics Lab</CardTitle>
              <CardDescription>
                Prof. Michael Zhang • Room 415 Lyman
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Investigating protein folding dynamics and cellular mechanics using cutting-edge optical techniques
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>18 members</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/labs/biophysics">
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
                <Badge variant="default">Condensed Matter</Badge>
              </div>
              <CardTitle>Superconductivity Lab</CardTitle>
              <CardDescription>
                Prof. Elena Rodriguez • Room 203 Pierce
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Exploring high-temperature superconductors and topological materials for quantum applications
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>15 members</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/labs/superconductivity">
                    View Lab
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-2xl">AI-Powered Insights</CardTitle>
            </div>
            <CardDescription className="text-base">
              Latest collaboration opportunities and equipment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Collaboration Opportunities
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">New</Badge>
                    <div>
                      <p className="text-sm font-medium">Quantum-Bio Interface Study</p>
                      <p className="text-xs text-muted-foreground">
                        3 labs have complementary expertise in quantum sensing for biological systems
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">Match</Badge>
                    <div>
                      <p className="text-sm font-medium">Shared Cryogenic Equipment</p>
                      <p className="text-xs text-muted-foreground">
                        5 labs could benefit from pooling resources for new dilution refrigerator
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Grant Opportunities
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5 border-green-600 text-green-600">NSF</Badge>
                    <div>
                      <p className="text-sm font-medium">Quantum Information Science Program</p>
                      <p className="text-xs text-muted-foreground">
                        Deadline: March 15 • 4 labs match criteria
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5 border-blue-600 text-blue-600">DOE</Badge>
                    <div>
                      <p className="text-sm font-medium">Energy Frontier Research Centers</p>
                      <p className="text-xs text-muted-foreground">
                        Deadline: April 1 • 6 labs have relevant expertise
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/ai">
                  Explore AI Assistant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12 pb-24">
        <h2 className="text-3xl font-bold mb-8">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <FlaskConical className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Find a Lab</CardTitle>
              <CardDescription>
                Search by research area, PI, or equipment
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Book Equipment</CardTitle>
              <CardDescription>
                Reserve specialized instruments and facilities
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Activity className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>View Analytics</CardTitle>
              <CardDescription>
                Track usage patterns and collaboration metrics
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}