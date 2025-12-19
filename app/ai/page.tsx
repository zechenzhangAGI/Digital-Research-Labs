"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";

const recommendedLabs = [
  {
    id: "franklin",
    name: "Franklin Lab",
    pi: "Melissa Franklin",
    matchScore: 94,
    reason: "Your interest in particle physics and data analysis aligns perfectly with ongoing CERN projects",
    currentOpenings: true,
    researchAreas: ["Particle Physics", "Data Analysis"],
    skillsNeeded: ["Python", "Statistical Analysis"],
    timeCommitment: "10-15 hours/week"
  },
  {
    id: "cohen",
    name: "Cohen Lab",
    pi: "Adam Cohen",
    matchScore: 89,
    reason: "Your biology and physics background is ideal for biophysics research",
    currentOpenings: true,
    researchAreas: ["Biophysics", "Optics"],
    skillsNeeded: ["Lab Skills", "MATLAB"],
    timeCommitment: "12-20 hours/week"
  },
  {
    id: "mitrano",
    name: "Mitrano Group",
    pi: "Matteo Mitrano",
    matchScore: 85,
    reason: "Your coursework in solid state physics makes you a great fit for materials research",
    currentOpenings: false,
    researchAreas: ["Condensed Matter", "Spectroscopy"],
    skillsNeeded: ["Physics 143a", "Lab Experience"],
    timeCommitment: "15-20 hours/week"
  }
];

const researchAreas = [
  { name: "Quantum Physics", labCount: 8, description: "Quantum computing, information, and sensing" },
  { name: "Biophysics", labCount: 6, description: "Biological systems and molecular dynamics" },
  { name: "Condensed Matter", labCount: 12, description: "Materials science and topological physics" },
  { name: "Particle Physics", labCount: 5, description: "High-energy physics and detector development" },
  { name: "Astrophysics", labCount: 7, description: "Cosmology and observational astronomy" }
];

const successStories = [
  { student: "Alex C. '25", lab: "Cohen Lab", outcome: "Published co-author paper", duration: "2 years" },
  { student: "Maya P. '26", lab: "Mitrano Group", outcome: "Presenting at APS March Meeting", duration: "1 year" },
  { student: "Jordan T. '24", lab: "Franklin Lab", outcome: "Summer research at CERN", duration: "1.5 years" }
];

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("matcher");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold mb-2">AI Research Matcher</h1>
          <p className="text-muted-foreground">
            Get personalized lab recommendations based on your interests and skills
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 rounded-lg bg-muted/30 border">
            <p className="text-2xl font-semibold">40+</p>
            <p className="text-xs text-muted-foreground">Labs</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30 border">
            <p className="text-2xl font-semibold">100+</p>
            <p className="text-xs text-muted-foreground">Undergrads</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30 border">
            <p className="text-2xl font-semibold">15</p>
            <p className="text-xs text-muted-foreground">Openings</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30 border">
            <p className="text-2xl font-semibold">87%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="h-9">
            <TabsTrigger value="matcher" className="text-sm">Lab Matcher</TabsTrigger>
            <TabsTrigger value="areas" className="text-sm">Research Areas</TabsTrigger>
            <TabsTrigger value="stories" className="text-sm">Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="matcher" className="space-y-6">
            {/* Search Input */}
            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-medium mb-3">Tell us about yourself</p>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="I'm interested in quantum computing and have taken Physics 143a..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 min-h-20 pt-2"
                  />
                </div>
                <Button className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find My Match
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Labs */}
            <div>
              <p className="text-sm font-medium mb-4">Recommended for you</p>
              <div className="space-y-3">
                {recommendedLabs.map((lab) => (
                  <Card key={lab.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{lab.name}</h3>
                          <p className="text-sm text-muted-foreground">Prof. {lab.pi}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {lab.currentOpenings && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              Hiring
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {lab.matchScore}% match
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{lab.reason}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {lab.researchAreas.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs font-normal">
                            {area}
                          </Badge>
                        ))}
                        {lab.skillsNeeded.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{lab.timeCommitment}</span>
                        <Button size="sm" variant="ghost" asChild className="h-7 text-xs">
                          <Link href={`/labs/${lab.id}`}>
                            View Lab
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-4">
            <p className="text-sm font-medium mb-4">Explore research fields</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {researchAreas.map((area) => (
                <Card key={area.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{area.name}</h3>
                      <Badge variant="outline" className="text-xs">{area.labCount} labs</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                    <Button size="sm" variant="ghost" asChild className="h-7 text-xs p-0">
                      <Link href="/labs">
                        Browse labs
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-4">
            <p className="text-sm font-medium mb-4">Undergraduate success stories</p>
            <div className="space-y-3">
              {successStories.map((story, idx) => (
                <Card key={idx}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {story.student.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{story.student}</p>
                          <Badge variant="outline" className="text-xs">{story.duration}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="text-foreground">{story.lab}</span> - {story.outcome}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-medium mb-2">Your story starts here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join 100+ undergraduates in physics research
                </p>
                <Button asChild>
                  <Link href="/labs">
                    Explore Labs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
