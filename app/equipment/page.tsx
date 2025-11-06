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
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  MapPin,
  User,
  BookOpen,
  Wrench
} from "lucide-react";
import Link from "next/link";

// Mock data for equipment
const equipment = [
  {
    id: "tirf-microscope",
    name: "TIRF Microscope",
    type: "Microscopy",
    location: "Room 415 Lyman",
    lab: "Molecular Biophysics Lab",
    status: "available",
    description: "Total Internal Reflection Fluorescence microscope for single-molecule imaging",
    specifications: ["100x oil objective", "EM-CCD camera", "4-laser system"],
    hourlyRate: 75,
    nextAvailable: "Today",
    trainingRequired: true
  },
  {
    id: "dilution-fridge",
    name: "Dilution Refrigerator",
    type: "Cryogenics",
    location: "Room 301 Jefferson",
    lab: "Quantum Computing Lab",
    status: "in-use",
    description: "Ultra-low temperature system reaching 10mK for quantum experiments",
    specifications: ["Base temp: 10mK", "Cooling power: 400µW", "24 DC lines"],
    hourlyRate: 150,
    nextAvailable: "Tomorrow 2PM",
    trainingRequired: true
  },
  {
    id: "femto-laser",
    name: "Femtosecond Laser System",
    type: "Lasers",
    location: "Room 512 McKay",
    lab: "Photonics & Optics Lab",
    status: "available",
    description: "Ti:Sapphire laser for ultrafast spectroscopy and nonlinear optics",
    specifications: ["800nm center", "100fs pulses", "5W average power"],
    hourlyRate: 100,
    nextAvailable: "Today",
    trainingRequired: true
  },
  {
    id: "afm-system",
    name: "Atomic Force Microscope",
    type: "Microscopy",
    location: "Room 415 Lyman",
    lab: "Molecular Biophysics Lab",
    status: "maintenance",
    description: "High-resolution AFM for surface topology and force measurements",
    specifications: ["Sub-nm resolution", "Force spectroscopy", "Liquid cell"],
    hourlyRate: 60,
    nextAvailable: "Next Week",
    trainingRequired: true
  },
  {
    id: "ppms",
    name: "PPMS DynaCool",
    type: "Characterization",
    location: "Room 203 Pierce",
    lab: "Superconductivity Lab",
    status: "available",
    description: "Physical Property Measurement System for material characterization",
    specifications: ["1.9K-400K", "14T magnet", "AC/DC transport"],
    hourlyRate: 80,
    nextAvailable: "Today",
    trainingRequired: false
  },
  {
    id: "gpu-cluster",
    name: "GPU Computing Cluster",
    type: "Computing",
    location: "Room 102 Jefferson",
    lab: "Computational Physics Lab",
    status: "available",
    description: "High-performance GPU cluster for simulations and ML workloads",
    specifications: ["8x A100 GPUs", "1TB RAM", "100TB storage"],
    hourlyRate: 50,
    nextAvailable: "Today",
    trainingRequired: false
  }
];

const equipmentTypes = ["All", "Microscopy", "Cryogenics", "Lasers", "Characterization", "Computing"];

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter equipment
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lab.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "All" || item.type === selectedType;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-use":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "maintenance":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>;
      case "in-use":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Use</Badge>;
      case "maintenance":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Equipment Database</h1>
        <p className="text-lg text-muted-foreground">
          Browse and book specialized research equipment across all physics labs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment, labs, or specifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="in-use">In Use</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      {/* Type Tabs */}
      <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-8">
        <TabsList className="grid w-full grid-cols-6">
          {equipmentTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Available Now</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <CardTitle className="text-2xl">
              {equipment.filter(e => e.status === "available").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>In Use</CardDescription>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">
              {equipment.filter(e => e.status === "in-use").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Maintenance</CardDescription>
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <CardTitle className="text-2xl">
              {equipment.filter(e => e.status === "maintenance").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardDescription>Total Equipment</CardDescription>
              <Wrench className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">{equipment.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredEquipment.length} of {equipment.length} equipment
      </p>

      {/* Equipment Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                {getStatusBadge(item.status)}
                <Badge variant="outline">{item.type}</Badge>
              </div>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {item.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>

              {/* Lab Info */}
              <div className="flex items-center gap-2 mb-3 text-sm">
                <User className="h-3 w-3" />
                <span className="text-muted-foreground">{item.lab}</span>
              </div>

              {/* Specifications */}
              <div className="mb-4">
                <p className="text-xs font-semibold mb-1">Key Features:</p>
                <div className="flex flex-wrap gap-1">
                  {item.specifications.slice(0, 2).map((spec, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {item.specifications.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.specifications.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between mb-4 p-2 bg-muted rounded">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Next: {item.nextAvailable}</span>
                </div>
                <span className="text-sm font-semibold">${item.hourlyRate}/hr</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1" size="sm" disabled={item.status === "maintenance"}>
                  <Calendar className="mr-1 h-3 w-3" />
                  Book Now
                </Button>
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-1 h-3 w-3" />
                  Docs
                </Button>
              </div>

              {item.trainingRequired && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Training required
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}