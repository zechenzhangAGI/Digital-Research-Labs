"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Users,
  Mail,
  Phone,
  Globe,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize2,
  Download,
  ExternalLink,
  BookOpen,
  Award,
  Microscope,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Comprehensive lab data
const labsDetailData: Record<string, any> = {
  quantum: {
    name: "Quantum Computing Lab",
    pi: "Prof. Sarah Chen",
    email: "schen@physics.harvard.edu",
    phone: "+1 (617) 495-1234",
    website: "quantum.physics.harvard.edu",
    location: "Jefferson Laboratory, Room 301",
    established: 2018,
    type: "Quantum",
    members: {
      faculty: 2,
      postdocs: 4,
      graduate: 6,
      undergraduate: 3
    },
    description: `The Quantum Computing Lab at Harvard Physics is at the forefront of quantum information science,
    developing next-generation quantum processors and algorithms. Our research spans from fundamental quantum mechanics
    to practical quantum computing applications.`,
    research: [
      "Ion trap quantum computing",
      "Quantum error correction",
      "Quantum algorithms for optimization",
      "Hybrid classical-quantum algorithms",
      "Quantum simulation of many-body systems"
    ],
    equipment: [
      {
        name: "Ion Trap System",
        description: "State-of-the-art trapped ion quantum computer with 32 qubits",
        status: "operational"
      },
      {
        name: "Dilution Refrigerator",
        description: "BlueFors XLD system reaching 10mK for superconducting qubits",
        status: "operational"
      },
      {
        name: "Quantum Control Electronics",
        description: "Arbitrary waveform generators and control systems",
        status: "operational"
      }
    ],
    publications: [
      {
        title: "Demonstration of quantum advantage in optimization problems",
        journal: "Nature Physics",
        year: 2024,
        doi: "10.1038/nature12345"
      },
      {
        title: "Error correction in trapped ion quantum computers",
        journal: "Science",
        year: 2023,
        doi: "10.1126/science.abc1234"
      }
    ],
    images: [
      { url: "/api/placeholder/800/600", caption: "Main laboratory space" },
      { url: "/api/placeholder/800/600", caption: "Ion trap quantum processor" },
      { url: "/api/placeholder/800/600", caption: "Control room" },
      { url: "/api/placeholder/800/600", caption: "Dilution refrigerator setup" }
    ],
    videos: [
      { url: "/api/placeholder/video", title: "Lab Tour", duration: "5:23" },
      { url: "/api/placeholder/video", title: "Research Overview", duration: "8:45" }
    ],
    funding: [
      { agency: "NSF", program: "Quantum Information Science", amount: "$2.5M", period: "2023-2026" },
      { agency: "DOE", program: "Quantum Computing Research", amount: "$1.8M", period: "2022-2025" }
    ]
  },
  biophysics: {
    name: "Molecular Biophysics Lab",
    pi: "Prof. Michael Zhang",
    email: "mzhang@physics.harvard.edu",
    phone: "+1 (617) 495-5678",
    website: "biophysics.physics.harvard.edu",
    location: "Jefferson Laboratory, Room 304",
    established: 2015,
    type: "Biophysics",
    members: {
      faculty: 3,
      postdocs: 5,
      graduate: 8,
      undergraduate: 2
    },
    description: `The Molecular Biophysics Lab investigates the physical principles underlying biological processes
    at the molecular and cellular level. We use advanced optical techniques and single-molecule manipulation to
    understand protein folding, molecular motors, and cellular mechanics.`,
    research: [
      "Single-molecule FRET studies",
      "Optical tweezers for force spectroscopy",
      "Super-resolution microscopy",
      "Protein folding dynamics",
      "Cell membrane mechanics"
    ],
    equipment: [
      {
        name: "TIRF Microscope",
        description: "Total Internal Reflection Fluorescence microscope for single-molecule imaging",
        status: "operational"
      },
      {
        name: "Optical Tweezers",
        description: "Dual-beam optical trap for force measurements",
        status: "operational"
      },
      {
        name: "AFM",
        description: "Atomic Force Microscope for nanoscale imaging",
        status: "maintenance"
      }
    ],
    publications: [
      {
        title: "Direct observation of protein folding intermediates",
        journal: "Cell",
        year: 2024,
        doi: "10.1016/cell.2024.01.001"
      },
      {
        title: "Mechanical properties of living cells under stress",
        journal: "PNAS",
        year: 2023,
        doi: "10.1073/pnas.2301234567"
      }
    ],
    images: [
      { url: "/api/placeholder/800/600", caption: "TIRF microscopy setup" },
      { url: "/api/placeholder/800/600", caption: "Single molecule traces" },
      { url: "/api/placeholder/800/600", caption: "Cell imaging station" }
    ],
    videos: [
      { url: "/api/placeholder/video", title: "Single Molecule Techniques", duration: "12:34" }
    ],
    funding: [
      { agency: "NIH", program: "Biophysics Research", amount: "$3.2M", period: "2022-2027" }
    ]
  }
};

export default function LabDetailPage() {
  const params = useParams();
  const labId = params.id as string;
  const lab = labsDetailData[labId] || labsDetailData["quantum"]; // Fallback to quantum lab

  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % lab.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + lab.images.length) % lab.images.length);
  };

  return (
    <div className="container py-8">
      {/* Back Navigation */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/labs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Labs
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{lab.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{lab.location}</span>
              </div>
              <Badge variant="secondary">{lab.type}</Badge>
              <span>Established {lab.established}</span>
            </div>
          </div>
          <Button asChild>
            <Link href="/map">
              View on Map
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Image Gallery */}
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={lab.images[currentImage].url}
                      alt={lab.images[currentImage].caption}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Gallery Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-black/50 text-white px-3 py-1 rounded">
                    {lab.images[currentImage].caption}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={prevImage}
                      className="bg-black/50 hover:bg-black/70"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={nextImage}
                      className="bg-black/50 hover:bg-black/70"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                  <div className="flex gap-2 overflow-x-auto">
                    {lab.images.map((img: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                          idx === currentImage ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About the Lab</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{lab.description}</p>

                  <h3 className="font-semibold mb-2">Research Areas</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {lab.research.map((area: string) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Videos */}
              {lab.videos && lab.videos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Lab Videos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lab.videos.map((video: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded flex items-center justify-center">
                            <Play className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{video.title}</div>
                            <div className="text-sm text-muted-foreground">{video.duration}</div>
                          </div>
                        </div>
                        <Button size="sm">Watch</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="research" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Research Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lab.research.map((project: string, idx: number) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">{project}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Active research area with multiple ongoing projects and collaborations.
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Laboratory Equipment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lab.equipment.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        <Badge variant={item.status === "operational" ? "default" : "secondary"}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Calendar className="mr-1 h-3 w-3" />
                          Book Time
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="mr-1 h-3 w-3" />
                          View Docs
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="publications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Publications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lab.publications.map((pub: any, idx: number) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-1">{pub.title}</h4>
                      <div className="text-sm text-muted-foreground mb-2">
                        {pub.journal} • {pub.year}
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View Paper
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lab Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-semibold mb-1">Principal Investigator</div>
                <div className="text-sm text-muted-foreground">{lab.pi}</div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${lab.email}`} className="hover:underline">
                    {lab.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{lab.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={`https://${lab.website}`} className="hover:underline">
                    {lab.website}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Composition */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Faculty</span>
                  <span className="font-semibold">{lab.members.faculty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Postdocs</span>
                  <span className="font-semibold">{lab.members.postdocs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Graduate Students</span>
                  <span className="font-semibold">{lab.members.graduate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Undergraduates</span>
                  <span className="font-semibold">{lab.members.undergraduate}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>
                    {lab.members.faculty + lab.members.postdocs + lab.members.graduate + lab.members.undergraduate}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Funding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lab.funding.map((grant: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {grant.agency}
                    </Badge>
                    <span className="text-sm font-semibold">{grant.amount}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{grant.program}</div>
                  <div className="text-xs text-muted-foreground">{grant.period}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline" size="sm">
                <Users className="mr-2 h-4 w-4" />
                Join This Lab
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Visit
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Request Collaboration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}