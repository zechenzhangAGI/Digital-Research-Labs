"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Sparkles,
  Users,
  TrendingUp,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Search,
  BookOpen,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

// Mock AI recommendations for undergraduate students
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
  {
    name: "Quantum Physics",
    labCount: 8,
    description: "Quantum computing, quantum information, and quantum sensing",
    popularity: "High"
  },
  {
    name: "Biophysics",
    labCount: 6,
    description: "Biological systems, molecular dynamics, and cellular mechanics",
    popularity: "High"
  },
  {
    name: "Condensed Matter",
    labCount: 12,
    description: "Materials science, superconductivity, and topological physics",
    popularity: "Medium"
  },
  {
    name: "Particle Physics",
    labCount: 5,
    description: "High-energy physics, collider experiments, and detector development",
    popularity: "Medium"
  },
  {
    name: "Astrophysics",
    labCount: 7,
    description: "Cosmology, observational astronomy, and theoretical modeling",
    popularity: "High"
  }
];

const successStories = [
  {
    student: "Alex C. '25",
    lab: "Cohen Lab",
    outcome: "Published co-author paper, now applying to grad school",
    duration: "2 years"
  },
  {
    student: "Maya P. '26",
    lab: "Mitrano Group",
    outcome: "Presenting at APS March Meeting",
    duration: "1 year"
  },
  {
    student: "Jordan T. '24",
    lab: "Franklin Lab",
    outcome: "Summer research at CERN",
    duration: "1.5 years"
  }
];

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("matcher");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-10 w-10 text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold">AI Research Matcher</h1>
            <p className="text-lg text-muted-foreground">
              Find your perfect research opportunity match using AI-powered recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Active Labs</CardDescription>
              <Sparkles className="h-4 w-4 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">40+</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Undergrad Researchers</CardDescription>
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">100+</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Labs with Openings</CardDescription>
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <CardTitle className="text-2xl">15</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Success Rate</CardDescription>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">87%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matcher">Lab Matcher</TabsTrigger>
          <TabsTrigger value="areas">Research Areas</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="matcher" className="space-y-6">
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Tell Us About Yourself
              </CardTitle>
              <CardDescription>
                Share your interests, skills, and background to get personalized lab recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Example: I'm interested in quantum computing and have taken Physics 143a and CS50..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 min-h-[100px]"
                />
              </div>
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Find My Research Match
              </Button>
            </CardContent>
          </Card>

          {/* Recommended Labs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recommended Labs for You
              </CardTitle>
              <CardDescription>
                Top matches based on your profile (sample results)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedLabs.map((lab) => (
                <Card key={lab.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{lab.name}</h3>
                      <p className="text-sm text-muted-foreground">Prof. {lab.pi}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 text-sm">
                      {lab.matchScore}% Match
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Why this lab?</span> {lab.reason}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div>
                      <span className="font-semibold">Research Areas:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lab.researchAreas.map((area: string) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold">Skills Needed:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lab.skillsNeeded.map((skill: string) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Time Commitment: <span className="font-semibold text-foreground">{lab.timeCommitment}</span>
                      </span>
                      {lab.currentOpenings && (
                        <Badge className="bg-green-100 text-green-800">
                          Currently Hiring
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/labs/${lab.id}`}>
                        View Lab Page
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Research Areas in Physics
              </CardTitle>
              <CardDescription>
                Explore different fields to find what interests you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {researchAreas.map((area, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{area.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {area.description}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {area.labCount} labs
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Popularity:</span>
                      <Badge
                        className={
                          area.popularity === "High"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {area.popularity}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/labs">
                        View Labs
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Undergraduate Success Stories
              </CardTitle>
              <CardDescription>
                Learn from students who have thrived in research positions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {successStories.map((story, idx) => (
                <Card key={idx} className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {story.student.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{story.student}</h3>
                        <Badge variant="outline">{story.duration}</Badge>
                      </div>
                      <p className="text-sm mb-2">
                        <span className="font-semibold">{story.lab}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {story.outcome}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              <Card className="p-6 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Your Success Story Starts Here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join over 100 undergraduates currently conducting research in the Physics Department
                  </p>
                  <Button asChild>
                    <Link href="/labs">
                      Explore Research Labs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}