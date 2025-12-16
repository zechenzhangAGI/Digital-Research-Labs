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


//Used LAB room if available, if not professor room #
const labs = [
  {
    id: "franklin",
    name: "Franklin Lab",
    pi: "Melissa Franklin",
    location: "Lyman 237",
    category: "Particle Physics",
    undergrads: 12,
    description: "Searching for new particles using particle accelerators at CERN.",
    researchArea: "Particle Physics",
    image: "/lab_images/franklin-atlas.jpg/",
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
    undergrads: 3,
    description: "The Cohen Lab develops and applies new tools to study biology. We push the limits of physics and chemistry to make measurements in previously inaccessible regimes.",
    researchArea: "Neurophotonics & Biophysics",
    image: "/lab_images/cohen-magazine.jpg",
    sampleProjects: [
      "Developing improved optical stimulation of neurons with pulsed ultrafast lasers.",
      "Modeling ALS with human stem cell-derived neurons.",
      "Designing better algorithms to extract electrical activity from voltage imaging data."
    ]
  },
  {
    id: "manoharan",
    name: "Manoharan Group",
    pi: "Vinothan Manoharan",
    location: "McKay 530",
    category: "Biophysics",
    undergrads: 3,
    description: "We do experiments to understand how complex systems such as interacting nanoparticles or proteins spontaneously order themselves — a process called self-assembly or self-organization.",
    researchArea: "Soft Matter & Biophysics",
    image: "/lab_images/manoharan-virus.png",
    sampleProjects: [
      "Constructing and refining capillary tweezers that manipulate particles via capillary forces.",
      "Long-term bench experiments that uncover the physics behind tweezers-inspired microdevices."
    ]
  },
  {
    id: "cotler",
    name: "Cotler Group",
    pi: "Jordan Cotler",
    location: "60 Oxford St. 412",
    category: "Quantum Computing",
    undergrads: 14,
    description: "Cotler’s current research interests include developing quantum algorithms to analyze quantum many-body and quantum gravitational systems and more.",
    researchArea: "Photonics & Quantum Optics",
    image: "/lab_images/cotler-blackboard.jpg",
    sampleProjects: [
    ]
  },
  {
    id: "mitrano",
    name: "Mitrano Group",
    pi: "Matteo Mitrano",
    location: "Jefferson 164",
    category: "Solid State",
    undergrads: 3,
    description: "Our research focuses on the investigation and the control of collective electronic behavior in quantum materials at ultrafast timescales.",
    researchArea: "Ultrafast Quantum Materials",
    image: "/lab_images/mitrano-lattice.png",
    sampleProjects: [
      "Simulate dynamics of many-body excitons in NiPS₃ under THz illumination for quantum control studies.",
      "Analyze time-resolved X-ray absorption data from the Pohang XFEL to tune cuprate interactions with light.",
      "Build a non-collinear optical parametric amplifier delivering tunable 9 fs pulses."
    ]
  },
  {
    id: "mundy",
    name: "Mundy Group",
    pi: "Julia Mundy",
    location: "LISE 709",
    category: "Solid State",
    undergrads: 4,
    description: "Work in the Mundy group will design, synthesize and probe such emergent phenomena in complex oxide thin films.",
    researchArea: "Oxide Heterostructures",
    image: "lab_images/mundy-mbe.png",
    sampleProjects: [
      "Create lithium-intercalated indium tin oxide thin films via solution-phase n-BuLi chemistry to achieve superconductivity while keeping 73% optical transparency and nanometer roughness.",
    ]
  },

  //STARTING HERE WITH IN-DEPTH VERIFICATION OF ALL INFORMATION

  {
    id: "kim",
    name: "Kim Lab",
    pi: "Philip Kim",
    location: "LISE 4th Floor",
    category: "Condensed Matter",
    undergrads: 2,
    description: "Our group’s research focuses on the mesoscopic investigation of transport phenomena, particularly, electric, thermal and thermoelectrical properties of low dimensional nanoscale materials.",
    researchArea: "Condensed Matter Physics",
    image: "lab_images/kim-circuit.png",
    sampleProjects: [
    ]
  },
  {
    id: "weitz",
    name: "Weitz Lab",
    pi: "David Weitz",
    location: "McKay 5th Floor",
    category: "Soft Matter",
    undergrads: 5,
    description: "We study the physics of soft condensed matter, materials which are easily deformable by external stresses, electric or magnetic fields, or even by thermal fluctuations",
    researchArea: "Soft Matter Physics",
    image: "lab_images/weitz-bubbles.jpg",
    sampleProjects: [
      "Creating new classes of drop-based materials and probing their properties.",
      "Imaging live cells and studying their mechanics."
    ]
  },
  {
    id: "yin",
    name: "Yin Lab",
    pi: "Xi Yin",
    location: "Jefferson 570",
    category: "High Energy Theory",
    undergrads: 0,
    description: "I am a theoretical physicist interested in quantum field theory, string theory, and mathematical physics.",
    researchArea: "Theoretical High Energy Physics",
    image: "lab_images/yin-wizards.jpg",
    sampleProjects: [
      "Implement matrix quantum mechanics bootstrap code on quantum-information solvers.",
      "Study renormalization group flow of supersymmetric chiral nonlinear sigma models."
    ]
  },
  {
    id: "knirck",
    name: "Knirck Lab",
    pi: "Stefan Knirck",
    location: "18 Hammond Street",
    category: "Particle Physics",
    undergrads: 5,
    description: "Our group builds novel experiments to directly detect axion dark matter in the µeV - meV mass range.",
    researchArea: "Particle Astrophysics",
    image: "lab_images/knirck-cone.jpg",
    sampleProjects: [
      "Search for exotic models inside experimental data sets.",
      "Simulate axion detectors, commission cryostats, and measure antenna patterns."
    ]
  },
  {
    id: "khalaf",
    name: "Khalaf Lab",
    pi: "Eslam Khalaf",
    location: "17 Oxford Street",
    category: "Condensed Matter Theory",
    undergrads: 1,
    description: "Khalaf's work addresses questions in the physics of disorder, topological insulators and semimetals, mechanisms for superconductivity in multi-layer graphene heterostructures, and new phenomena in quasicrystals and moiré systems.",
    researchArea: "Condensed Matter Theory",
    image: "lab_images/khalaf-skyrmions.jpg",
    sampleProjects: [
      "Exact diagonalization to compute dispersion of anyons on the sphere.",
      "Numerical diagonalization studies of trion states in semiconductor heterostructures."
    ]
  },
  {
    id: "stubbs",
    name: "Stubbs Lab",
    pi: "Christopher Stubbs",
    location: "Lyman 335",
    category: "Astrophysics",
    undergrads: 2,
    description: "Recent projects have primarily used the tools and techniques of observational astronomy, providing the opportunity to measure the properties of the dark sector where signal is non-zero.",
    researchArea: "Observational Astrophysics",
    image: "/lab_images/stubbs-telescope.png",
    sampleProjects: [
      "Build optical instrumentation to monitor image degradation in the Rubin Observatory.",
      "Design precision calibration hardware that injects monochromatic photons into telescopes."
    ]
  },
  {
    id: "huth",
    name: "Huth Lab",
    pi: "John Huth",
    location: "Lyman 236",
    category: "Particle Physics",
    undergrads: 2,
    description: "Huth's present work centers on the exploration of the Higgs boson, particularly the decay of the Higgs into a b b-bar pair, which is a challenging final state.",
    researchArea: "Experimental Particle Physics",
    image: "lab_images/huth-atlas.jpg",
    sampleProjects: [
      "Finding detector efficiencies as a function of beam intensity.",
      "Fitting and digitizing ancient tables of latitude and longitude."
    ]
  },
  {
    id: "ro",
    name: "Ro Lab",
    pi: "Sunghan Ro",
    location: "Lyman 322",
    category: "Statistical Physics",
    undergrads: 1,
    description: "Recently, Ro has focused on studying collective phenomena in active matter, which consists of units driven out of equilibrium at the individual level.",
    researchArea: "Statistical Physics",
    image: "/lab_images/ro-graph.png",
    sampleProjects: [
      "Coarsening in phase separation governed by moment-conserving diffusion.",
      "Boundary-driven scale-free profiles in annihilating two-particle systems."
    ]
  },
  {
    id: "desai",
    name: "Desai Lab",
    pi: "Michael Desai",
    location: "Northwest 457.20",
    category: "Biophysics",
    undergrads: 3,
    description: "We use theory and experiments to study evolutionary dynamics and population genetics, particularly when selection is pervasive.",
    researchArea: "Evolutionary Biophysics",
    image: "/lab_images/desai-bubbles.png",
    sampleProjects: [
      "Sequence genomes from evolving yeast lines and analyze mutations to track dynamics.",
      "Model site-frequency spectra under different purifying-selection scenarios."
    ]
  },
  {
    id: "samuel",
    name: "Samuel Lab",
    pi: "Aravi Samuel",
    location: "Northwest 258",
    category: "Biophysics",
    undergrads: 4,
    description: "To make progress, we use accessible biophysical models of organism behavior that can be studied from sensory input to motor output.",
    researchArea: "Neurophysics",
    image: "/lab_images/samuel-brain-science.jpg",
    sampleProjects: [
      "Whole-brain imaging of nematodes performing chemotaxis and thermotaxis.",
      "Data pipelines and coding that connect behavioral assays to neural signals."
    ]
  },
  {
    id: "morii",
    name: "Morii Lab",
    pi: "Masahiro Morii",
    location: "Lyman 230",
    category: "Particle Physics",
    undergrads: 2,
    description: "Prof. Morii and his team of postdocs and students have searched for supersymmetry, for dark matter, and for rare processes involving top quarks.",
    researchArea: "Experimental Particle Physics",
    image: "lab_images/morii-atlas.jpg",
    sampleProjects: [
      "Contribute to silicon tracking detector upgrades for ATLAS at CERN.",
      "Assist PhD students with LHC data analysis when hardware work is paused."
    ]
  },
  {
    id: "park",
    name: "Park Lab",
    pi: "Hongkun Park",
    location: "Conant 048",
    category: "Quantum Materials",
    undergrads: 2,
    description: "The group focuses on fundamental studies of nanoscale electrical, optical, and plasmonic devices that operate based upon quantum mechanical principles.",
    researchArea: "Quantum Materials & Sensing",
    image: "/lab_images/park-computer.webp",
    sampleProjects: [
      "Build and test quantum devices made of atomically thin materials.",
      "Develop quantum sensing experiments leveraging layered materials."
    ]
  },
  {
    id: "heller",
    name: "Heller Lab",
    pi: "Eric Heller",
    location: "Mallinckrodt M-107",
    category: "Quantum Physics",
    undergrads: 6,
    description: "We are interested in a broad range of subjects that depend on time-dependant wave mechanics in one form or another.",
    researchArea: "Quantum Physics",
    image: "/lab_images/heller-flow.jpg",
    sampleProjects: [
      "Show how Anderson localization turns into Planckian diffusion as media evolves.",
      "Study quantum dots as acoustical chambers.",
      "Explore collaborative quantum projects inspired by numerical discoveries."
    ]
  },
  {
    id: "sachdev",
    name: "Sachdev Lab",
    pi: "Subir Sachdev",
    location: "Lyman 343",
    category: "Condensed Matter Theory",
    undergrads: 1,
    description: "Subir Sachdev's research describes the consequences of quantum entanglement on the macroscopic properties of natural systems.",
    researchArea: "Condensed Matter Theory",
    image: "/lab_images/sachdev-hole.jpg",
    sampleProjects: [
      "Spin-wave theory of fermions on the Lieb lattice."
    ]
  },
  {
    id: "jafferis",
    name: "Jafferis Lab",
    pi: "Daniel Jafferis",
    location: "Jefferson 371",
    category: "Quantum Gravity",
    undergrads: 1,
    description: "The research of Daniel Jafferis involves string theory, supersymmetric quantum field theory, and quantum gravity.",
    researchArea: "Quantum Gravity",
    image: "/lab_images/jafferis-mogging.webp",
    sampleProjects: [
      "Explore bags of gold and the overcounting of black hole entropy."
    ]
  },
  {
    id: "mazur",
    name: "Mazur Lab",
    pi: "Eric Mazur",
    location: "Pierce 233",
    category: "Optics",
    undergrads: 5,
    description: "We study the dynamics of molecules, chemical reactions, and condensed matter on very short timescales -- down to femtoseconds (millionths of billionths of a second).",
    researchArea: "Optics & Photonics",
    image: "lab_images/mazur-screwdrivers.png",
    sampleProjects: [
      "Develop a microfluidic platform to engineer CAR-T cells with lasers.",
      "Simulate new nanophotonic metamaterials for nonlinear optics.",
      "Fabricate and characterize nonlinear waveguides."
    ]
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
      if (sortBy === "undergrads") return b.undergrads - a.undergrads;
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
                <SelectItem value="undergrads">Sort by # of Undergrads</SelectItem>
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
