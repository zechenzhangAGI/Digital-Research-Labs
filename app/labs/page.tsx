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
    id: "manoharan",
    name: "Manoharan Group",
    pi: "Vinothan Manoharan",
    location: "McKay 530",
    category: "Biophysics",
    members: 15,
    description: "Virus self-assembly.",
    researchArea: "Biophysics",
    image: "https://www.manoharan.seas.harvard.edu/sites/g/files/omnuum4256/files/styles/hwp_21_9__2880x1230/public/manoharan/files/ccmv_in_out-01-01.png?itok=yAJ00Zuq",
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
    id: "mitrano",
    name: "Mitrano Group",
    pi: "Matteo Mitrano",
    location: "Jefferson 164",
    category: "Solid State",
    members: 20,
    description: "This will be a great description of Mitrano's Lab",
    researchArea: "Physics",
    image: "https://mitrano.physics.harvard.edu/sites/g/files/omnuum1256/files/styles/hwp_1_1__1440x1440_scale/public/mitranolab/files/2_0.png?itok=GCfYx981",
    sampleProjects: [
      "ML-driven materials discovery",
      "Quantum system simulations",
      "High-performance algorithm development"
    ]
  },
  {
    id: "mundy",
    name: "Mundy Group",
    pi: "Julia Mundy",
    location: "LISE 709",
    category: "Solid State",
    members: 16,
    description: "Something something molecular beam epitaxy.",
    researchArea: "Solid State",
    image: "/mundy-mbe.png",
    sampleProjects: [
      "Dark matter detection experiments",
      "CMB polarization analysis",
      "Galaxy formation simulations"
    ]
  },
  {
    id: "kim",
    name: "Kim Lab",
    pi: "Philip Kim",
    location: "Location TBD",
    category: "Condensed Matter",
    members: 2,
    description: "Description coming soon.",
    researchArea: "Condensed Matter Physics",
    sampleProjects: []
  },
  {
    id: "weitz",
    name: "Weitz Lab",
    pi: "David Weitz",
    location: "Location TBD",
    category: "Soft Matter",
    members: 4,
    description: "Description coming soon.",
    researchArea: "Soft Matter Physics",
    sampleProjects: []
  },
  {
    id: "yin",
    name: "Yin Lab",
    pi: "Xi Yin",
    location: "Location TBD",
    category: "High Energy Theory",
    members: 0,
    description: "Description coming soon.",
    researchArea: "Theoretical High Energy Physics",
    sampleProjects: []
  },
  {
    id: "knirck",
    name: "Knirck Lab",
    pi: "Stefan Knirck",
    location: "Location TBD",
    category: "Particle Physics",
    members: 4,
    description: "Description coming soon.",
    researchArea: "Particle Astrophysics",
    sampleProjects: []
  },
  {
    id: "khalaf",
    name: "Khalaf Lab",
    pi: "Eslam Khalaf",
    location: "Location TBD",
    category: "Condensed Matter Theory",
    members: 1,
    description: "Description coming soon.",
    researchArea: "Condensed Matter Theory",
    sampleProjects: []
  },
  {
    id: "stubbs",
    name: "Stubbs Lab",
    pi: "Christopher Stubbs",
    location: "Location TBD",
    category: "Astrophysics",
    members: 2,
    description: "Description coming soon.",
    researchArea: "Observational Astrophysics",
    sampleProjects: []
  },
  {
    id: "huth",
    name: "Huth Lab",
    pi: "John Huth",
    location: "Location TBD",
    category: "Particle Physics",
    members: 2,
    description: "Description coming soon.",
    researchArea: "Experimental Particle Physics",
    sampleProjects: []
  },
  {
    id: "ro",
    name: "Ro Lab",
    pi: "Sunghan Ro",
    location: "Location TBD",
    category: "Statistical Physics",
    members: 1,
    description: "Description coming soon.",
    researchArea: "Statistical Physics",
    sampleProjects: []
  },
  {
    id: "desai",
    name: "Desai Lab",
    pi: "Michael Desai",
    location: "Location TBD",
    category: "Biophysics",
    members: 3,
    description: "Description coming soon.",
    researchArea: "Evolutionary Biophysics",
    sampleProjects: []
  },
  {
    id: "samuel",
    name: "Samuel Lab",
    pi: "Aravi Samuel",
    location: "Location TBD",
    category: "Biophysics",
    members: 4,
    description: "Description coming soon.",
    researchArea: "Neurophysics",
    sampleProjects: []
  },
  {
    id: "morii",
    name: "Morii Lab",
    pi: "Masahiro Morii",
    location: "Location TBD",
    category: "Particle Physics",
    members: 2,
    description: "Description coming soon.",
    researchArea: "Experimental Particle Physics",
    sampleProjects: []
  },
  {
    id: "park",
    name: "Park Lab",
    pi: "Hongkun Park",
    location: "Location TBD",
    category: "Quantum Materials",
    members: 2,
    description: "Description coming soon.",
    researchArea: "Quantum Materials & Sensing",
    sampleProjects: []
  },
  {
    id: "heller",
    name: "Heller Lab",
    pi: "Eric Heller",
    location: "Location TBD",
    category: "Quantum Physics",
    members: 2,
    description: "Description coming soon.",
    researchArea: "Quantum Physics",
    sampleProjects: []
  },
  {
    id: "sachdev",
    name: "Sachdev Lab",
    pi: "Subir Sachdev",
    location: "Location TBD",
    category: "Condensed Matter Theory",
    members: 1,
    description: "Description coming soon.",
    researchArea: "Condensed Matter Theory",
    sampleProjects: []
  },
  {
    id: "jafferis",
    name: "Jafferis Lab",
    pi: "Daniel Jafferis",
    location: "Location TBD",
    category: "Quantum Gravity",
    members: 1,
    description: "Description coming soon.",
    researchArea: "Quantum Gravity",
    sampleProjects: []
  },
  {
    id: "mazur",
    name: "Mazur Lab",
    pi: "Eric Mazur",
    location: "Location TBD",
    category: "Optics",
    members: 5,
    description: "Description coming soon.",
    researchArea: "Optics & Photonics",
    sampleProjects: []
  }
];

const getLastName = (pi: string) => {
  const trimmed = pi.trim();
  const parts = trimmed.split(/\s+/);
  return parts[parts.length - 1].toLowerCase();
};

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
      if (sortBy === "name") return getLastName(a.pi).localeCompare(getLastName(b.pi));
      if (sortBy === "members") return b.members - a.members;
      return 0;
    });

  return (
    <div>
      {/* Header Section with Container */}
      <div className="container mx-auto px-4 py-12 pb-8">
        <div className="mb-10">
          <h1 className="text-5xl font-light tracking-tight mb-4">Research Labs</h1>
          <p className="text-lg text-muted-foreground font-light">
            Explore the Harvard Physics Department's research groups
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl border-2 p-4 shadow-md mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search labs, PIs, or research areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="lg:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="members">Sort by Team Size</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-8">
          Showing {filteredLabs.length} of {labs.length} labs
        </p>
      </div>

      {/* Labs Grid - With Small Margins */}
      <div className="container mx-auto px-4 pb-8">
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
