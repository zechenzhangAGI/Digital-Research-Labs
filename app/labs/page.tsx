"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { LabFlashCard } from "@/components/lab-flashcard";

// Mock data for labs
// To add a new lab, simply add a new object to this array with the required fields
const labs = [
  {
    id: "franklin",
    name: "Franklin Lab",
    pi: "Melissa Franklin",
    location: "Lyman 237",
    category: "Particle Physics",
    members: 12,
    description: "Searching for new particles using particle accelerators at CERN.",
    researchArea: "Particle Physics",
    image: "https://atlas.cern/sites/default/files/2025-09/ATLAS-OO-banner.jpg",
    sampleProjects: [
      "Melissa will give us a project to go here"
    ]
  },
  {
    id: "cohen",
    name: "Cohen Lab",
    pi: "Adam Cohen",
    location: "Mallinckrodt 115",
    category: "Biophysics",
    members: 18,
    description: "Developing optical techniques to visualize voltage dynamics in neural tissue.",
    researchArea: "Biophysics",
    image: "https://cohenweb.rc.fas.harvard.edu/Research/JNeuro_Cover.jpg",
    sampleProjects: [
      "Single-molecule protein folding studies",
      "Cellular force measurements",
      "DNA-protein interaction mapping"
    ]
  },
  {
    id: "rodriguez",
    name: "Rodriguez Lab",
    pi: "Elena Rodriguez",
    location: "Pierce 203",
    category: "Condensed Matter",
    members: 15,
    description: "Exploring high-temperature superconductors and topological materials for quantum applications.",
    researchArea: "Condensed Matter Physics",
    image: "",
    sampleProjects: [
      "Novel superconductor synthesis",
      "Topological insulator characterization",
      "Quantum critical point mapping"
    ]
  },
  {
    id: "cotler",
    name: "Cotler Group",
    pi: "Jordan Cotler",
    location: "60 Oxford St. 412",
    category: "Quantum Computing",
    members: 14,
    description: "Developing new theoretical frameworks behind quantum gravity and computing.",
    researchArea: "Photonics & Quantum Optics",
    image: "https://www.quantamagazine.org/wp-content/uploads/2022/09/andrew-strominger-jordan-cotler-ADJUSTED.jpg",
    sampleProjects: [
      "Idk if he has any"
    ]
  },
  {
    id: "park",
    name: "Park Lab",
    pi: "Lisa Park",
    location: "Jefferson 102",
    category: "Computational",
    members: 20,
    description: "Developing advanced computational methods for simulating complex physical systems.",
    researchArea: "Computational Physics",
    image: "",
    sampleProjects: [
      "ML-driven materials discovery",
      "Quantum system simulations",
      "High-performance algorithm development"
    ]
  },
  {
    id: "kim",
    name: "Kim Lab",
    pi: "David Kim",
    location: "Pierce 610",
    category: "Astrophysics",
    members: 16,
    description: "Studying dark matter, dark energy, and the early universe through observations and simulations.",
    researchArea: "Cosmology & Astrophysics",
    image: "",
    sampleProjects: [
      "Dark matter detection experiments",
      "CMB polarization analysis",
      "Galaxy formation simulations"
    ]
  }
];

const categories = ["All", "Quantum", "Biophysics", "Condensed Matter", "Optics", "Computational", "Astrophysics"];

export default function LabsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort labs
  const filteredLabs = labs
    .filter(lab => {
      const matchesSearch = searchQuery === "" ||
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.pi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.researchArea.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.pi.localeCompare(b.pi);
      if (sortBy === "members") return b.members - a.members;
      return 0;
    });

  return (
    <div>
      {/* Header Section with Container */}
      <div className="container py-12 pb-8">
        <div className="mb-10">
          <h1 className="text-5xl font-light tracking-tight mb-4">Research Labs</h1>
          <p className="text-lg text-muted-foreground font-light">
            Explore the Harvard Physics Department's research groups
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
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
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-8">
          Showing {filteredLabs.length} of {labs.length} labs
        </p>
      </div>

      {/* Labs Grid - With Small Margins */}
      <div className="px-4 pb-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLabs.map((lab) => (
            <LabFlashCard
              key={lab.id}
              id={lab.id}
              pi={lab.pi}
              image={lab.image}
              description={lab.description}
              researchArea={lab.researchArea}
              sampleProjects={lab.sampleProjects}
            />
          ))}
        </div>
      </div>
    </div>
  );
}