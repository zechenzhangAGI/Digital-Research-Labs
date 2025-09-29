"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Users,
  MapPin,
  ArrowRight,
  Filter,
  Atom,
  Microscope,
  Zap,
  Radio,
  Cpu,
  Orbit
} from "lucide-react";
import Link from "next/link";

// Mock data for labs
const labs = [
  {
    id: "quantum",
    name: "Quantum Computing Lab",
    pi: "Prof. Sarah Chen",
    location: "Room 301 Jefferson",
    category: "Quantum",
    icon: Atom,
    members: 12,
    description: "Developing next-generation quantum processors and algorithms for quantum supremacy experiments",
    equipment: ["Ion Trap System", "Dilution Refrigerator", "Laser Control System"],
    researchAreas: ["Quantum Computing", "Quantum Algorithms", "Quantum Error Correction"],
    color: "text-blue-600"
  },
  {
    id: "biophysics",
    name: "Molecular Biophysics Lab",
    pi: "Prof. Michael Zhang",
    location: "Room 415 Lyman",
    category: "Biophysics",
    icon: Microscope,
    members: 18,
    description: "Investigating protein folding dynamics and cellular mechanics using cutting-edge optical techniques",
    equipment: ["TIRF Microscope", "Optical Tweezers", "AFM"],
    researchAreas: ["Protein Dynamics", "Cell Mechanics", "Single Molecule Studies"],
    color: "text-green-600"
  },
  {
    id: "superconductivity",
    name: "Superconductivity Lab",
    pi: "Prof. Elena Rodriguez",
    location: "Room 203 Pierce",
    category: "Condensed Matter",
    icon: Zap,
    members: 15,
    description: "Exploring high-temperature superconductors and topological materials for quantum applications",
    equipment: ["PPMS", "MPMS SQUID", "Crystal Growth Furnace"],
    researchAreas: ["High-Tc Superconductors", "Topological Materials", "Quantum Phase Transitions"],
    color: "text-yellow-600"
  },
  {
    id: "photonics",
    name: "Photonics & Optics Lab",
    pi: "Prof. James Wilson",
    location: "Room 512 McKay",
    category: "Optics",
    icon: Radio,
    members: 14,
    description: "Advancing photonic technologies for quantum communication and ultrafast spectroscopy",
    equipment: ["Femtosecond Laser", "Streak Camera", "Photon Counting System"],
    researchAreas: ["Quantum Optics", "Nonlinear Optics", "Ultrafast Phenomena"],
    color: "text-purple-600"
  },
  {
    id: "computational",
    name: "Computational Physics Lab",
    pi: "Prof. Lisa Park",
    location: "Room 102 Jefferson",
    category: "Computational",
    icon: Cpu,
    members: 20,
    description: "Developing advanced computational methods for simulating complex physical systems",
    equipment: ["GPU Cluster", "Quantum Simulator", "HPC Access"],
    researchAreas: ["Quantum Simulations", "Machine Learning", "Computational Materials"],
    color: "text-orange-600"
  },
  {
    id: "cosmology",
    name: "Cosmology & Astrophysics Lab",
    pi: "Prof. David Kim",
    location: "Room 610 Pierce",
    category: "Astrophysics",
    icon: Orbit,
    members: 16,
    description: "Studying dark matter, dark energy, and the early universe through observations and simulations",
    equipment: ["Radio Telescope Access", "CCD Cameras", "Spectrographs"],
    researchAreas: ["Dark Matter", "CMB Analysis", "Galaxy Formation"],
    color: "text-indigo-600"
  }
];

const categories = ["All", "Quantum", "Biophysics", "Condensed Matter", "Optics", "Computational", "Astrophysics"];

export default function LabsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort labs
  const filteredLabs = labs
    .filter(lab => {
      const matchesSearch = searchQuery === "" ||
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.pi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.researchAreas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || lab.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "members") return b.members - a.members;
      return 0;
    });

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Research Labs</h1>
        <p className="text-lg text-muted-foreground">
          Explore Harvard Physics Department's cutting-edge research facilities and teams
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search labs, PIs, or research areas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="members">Team Size</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="grid w-full grid-cols-7">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredLabs.length} of {labs.length} labs
      </p>

      {/* Labs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => {
          const Icon = lab.icon;
          return (
            <Card key={lab.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-8 w-8 ${lab.color}`} />
                  <Badge>{lab.category}</Badge>
                </div>
                <CardTitle>{lab.name}</CardTitle>
                <CardDescription>
                  {lab.pi} • {lab.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {lab.description}
                </p>

                {/* Research Areas */}
                <div className="mb-4">
                  <p className="text-xs font-semibold mb-2">Research Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {lab.researchAreas.slice(0, 2).map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {lab.researchAreas.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{lab.researchAreas.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Equipment Preview */}
                <div className="mb-4">
                  <p className="text-xs font-semibold mb-2">Equipment:</p>
                  <p className="text-xs text-muted-foreground">
                    {lab.equipment.slice(0, 2).join(", ")}
                    {lab.equipment.length > 2 && ` +${lab.equipment.length - 2} more`}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{lab.members} members</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/labs/${lab.id}`}>
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}