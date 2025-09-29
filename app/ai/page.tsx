"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  Link2,
  Lightbulb,
  Target,
  Calendar,
  DollarSign,
  ArrowRight,
  RefreshCw
} from "lucide-react";

// Mock AI recommendations
const collaborationOpportunities = [
  {
    id: 1,
    title: "Quantum-Bio Interface Study",
    description: "3 labs have complementary expertise in quantum sensing for biological systems",
    labs: ["Quantum Computing Lab", "Molecular Biophysics Lab", "Photonics Lab"],
    matchScore: 92,
    potentialImpact: "High",
    suggestedAction: "Schedule inter-lab meeting"
  },
  {
    id: 2,
    title: "Shared Cryogenic Equipment",
    description: "5 labs could benefit from pooling resources for new dilution refrigerator",
    labs: ["Quantum Lab", "Superconductivity Lab", "Condensed Matter Lab"],
    matchScore: 87,
    potentialImpact: "Medium",
    suggestedAction: "Form equipment consortium"
  },
  {
    id: 3,
    title: "Machine Learning for Material Discovery",
    description: "Computational and experimental labs could accelerate material research",
    labs: ["Computational Physics Lab", "Superconductivity Lab"],
    matchScore: 85,
    potentialImpact: "High",
    suggestedAction: "Joint grant application"
  }
];

const grantOpportunities = [
  {
    id: 1,
    agency: "NSF",
    program: "Quantum Information Science Program",
    deadline: "March 15, 2025",
    amount: "$2M - $5M",
    matchingLabs: 4,
    fitScore: 94,
    requirements: ["Quantum computing focus", "Multi-institutional collaboration"]
  },
  {
    id: 2,
    agency: "DOE",
    program: "Energy Frontier Research Centers",
    deadline: "April 1, 2025",
    amount: "$3M - $4M/year",
    matchingLabs: 6,
    fitScore: 89,
    requirements: ["Energy applications", "Basic research focus"]
  },
  {
    id: 3,
    agency: "NIH",
    program: "Quantum Sensing for Biomedical Applications",
    deadline: "May 1, 2025",
    amount: "$1.5M - $3M",
    matchingLabs: 3,
    fitScore: 82,
    requirements: ["Biomedical applications", "Prototype development"]
  }
];

const researchTrends = [
  {
    topic: "Quantum Machine Learning",
    growth: "+45%",
    publications: 127,
    trend: "rising"
  },
  {
    topic: "Topological Quantum Computing",
    growth: "+38%",
    publications: 89,
    trend: "rising"
  },
  {
    topic: "Bio-inspired Materials",
    growth: "+32%",
    publications: 76,
    trend: "stable"
  },
  {
    topic: "Dark Matter Detection",
    growth: "+28%",
    publications: 104,
    trend: "rising"
  }
];

const equipmentRecommendations = [
  {
    equipment: "Quantum Annealer",
    requestingLabs: 3,
    estimatedUsage: "75%",
    cost: "$2.5M",
    roi: "18 months"
  },
  {
    equipment: "Cryo-EM System",
    requestingLabs: 4,
    estimatedUsage: "85%",
    cost: "$4M",
    roi: "24 months"
  },
  {
    equipment: "High-Field NMR",
    requestingLabs: 2,
    estimatedUsage: "60%",
    cost: "$1.8M",
    roi: "20 months"
  }
];

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("collaborations");

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-10 w-10 text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold">AI Research Assistant</h1>
            <p className="text-lg text-muted-foreground">
              Intelligent insights and recommendations powered by advanced analytics
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Active Recommendations</CardDescription>
              <Sparkles className="h-4 w-4 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">24</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Collaboration Matches</CardDescription>
              <Link2 className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">12</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Grant Opportunities</CardDescription>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <CardTitle className="text-2xl">8</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Success Rate</CardDescription>
              <Target className="h-4 w-4 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">87%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          <TabsTrigger value="grants">Grant Matching</TabsTrigger>
          <TabsTrigger value="trends">Research Trends</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="collaborations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Collaboration Opportunities
              </CardTitle>
              <CardDescription>
                AI-identified synergies between research groups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {collaborationOpportunities.map((opp) => (
                <Card key={opp.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{opp.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {opp.description}
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {opp.matchScore}% Match
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 my-3">
                    {opp.labs.map((lab) => (
                      <Badge key={lab} variant="secondary" className="text-xs">
                        {lab}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Impact:</span>
                      <Badge variant={opp.potentialImpact === "High" ? "default" : "outline"}>
                        {opp.potentialImpact}
                      </Badge>
                    </div>
                    <Button size="sm">
                      {opp.suggestedAction}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate More Recommendations
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Grant Opportunities
              </CardTitle>
              <CardDescription>
                Funding opportunities matching department capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {grantOpportunities.map((grant) => (
                <Card key={grant.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-100 text-green-800">
                          {grant.agency}
                        </Badge>
                        <Badge variant="outline">
                          {grant.fitScore}% Fit
                        </Badge>
                      </div>
                      <h3 className="font-semibold">{grant.program}</h3>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">
                      {grant.amount}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Deadline: {grant.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{grant.matchingLabs} labs match criteria</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold mb-1">Key Requirements:</p>
                    <div className="flex flex-wrap gap-1">
                      {grant.requirements.map((req, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Form Team
                    </Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Research Trends Analysis
              </CardTitle>
              <CardDescription>
                Emerging topics and publication patterns in physics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {researchTrends.map((trend, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{trend.topic}</h3>
                          <p className="text-sm text-muted-foreground">
                            {trend.publications} publications this year
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              trend.trend === "rising"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {trend.growth}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            YoY Growth
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(100, trend.publications / 1.5)}%` }}
                        />
                      </div>
                      {idx < researchTrends.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Equipment Acquisition Recommendations
              </CardTitle>
              <CardDescription>
                Suggested equipment purchases based on demand analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {equipmentRecommendations.map((rec, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{rec.equipment}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Requested by {rec.requestingLabs} labs
                      </p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      {rec.cost}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Estimated Usage:</span>
                      <p className="font-semibold">{rec.estimatedUsage}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ROI Period:</span>
                      <p className="font-semibold">{rec.roi}</p>
                    </div>
                  </div>

                  <Button size="sm" className="w-full mt-3">
                    View Business Case
                  </Button>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}