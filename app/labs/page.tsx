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
import { Search, SlidersHorizontal } from "lucide-react";
import { LabFlashCard } from "@/components/lab-flashcard";

// Labs with survey data are marked as verified
const labs = [
  // VERIFIED LABS (have survey responses)
  {
    id: "franklin",
    name: "Franklin Lab",
    pi: "Melissa Franklin",
    location: "Lyman 237",
    category: "Particle Physics",
    undergrads: 4,
    description: "Searching for new particles using particle accelerators at CERN.",
    researchArea: "Particle Physics",
    image: "/lab_images/franklin-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Measure noise in detector signals from proton-proton collision data",
      "Investigate cross-talk in muon detector data",
      "Use Monte Carlo to model backgrounds for three W signals"
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
    verified: true,
    sampleProjects: [
      "Developing improved optical stimulation of neurons with pulsed ultrafast lasers",
      "Modeling Lou Gehrig's disease (ALS) with human stem cell-derived neurons",
      "Developing better algorithms to extract electrical activity from voltage imaging data"
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
    verified: true,
    sampleProjects: [
      "Building and understanding the physics of 'capillary tweezers' that manipulate small particles"
    ]
  },
  {
    id: "cotler",
    name: "Cotler Group",
    pi: "Jordan Cotler",
    location: "60 Oxford St. 412",
    category: "Quantum Computing",
    undergrads: 14,
    description: "Cotler's current research interests include developing quantum algorithms to analyze quantum many-body and quantum gravitational systems.",
    researchArea: "Quantum Computing & Gravity",
    image: "/lab_images/cotler-blackboard.jpg",
    verified: false,
    sampleProjects: []
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
    verified: true,
    sampleProjects: [
      "Simulate dynamics of many-body excitons in NiPS₃ under THz illumination",
      "Analyze time-resolved X-ray absorption data from Pohang XFEL",
      "Build non-collinear optical parametric amplifier with 9 fs pulses"
    ]
  },
  {
    id: "mundy",
    name: "Mundy Group",
    pi: "Julia Mundy",
    location: "LISE 709",
    category: "Solid State",
    undergrads: 4,
    description: "Work in the Mundy group will design, synthesize and probe emergent phenomena in complex oxide thin films.",
    researchArea: "Oxide Heterostructures",
    image: "/lab_images/mundy-mbe.png",
    verified: true,
    sampleProjects: [
      "Hands-on AFM imaging, sputtering, x-ray diffraction and data analysis",
      "Synthesis of oxide thin films"
    ]
  },
  {
    id: "kim",
    name: "Kim Lab",
    pi: "Philip Kim",
    location: "LISE 4th Floor",
    category: "Condensed Matter",
    undergrads: 2,
    description: "Our group's research focuses on the mesoscopic investigation of transport phenomena, particularly electric, thermal and thermoelectrical properties of low dimensional nanoscale materials.",
    researchArea: "Condensed Matter Physics",
    image: "/lab_images/kim-circuit.png",
    verified: true,
    sampleProjects: [
      "Work on ongoing group projects (no separate undergraduate projects)"
    ]
  },
  {
    id: "weitz",
    name: "Weitz Lab",
    pi: "David Weitz",
    location: "McKay 5th Floor",
    category: "Soft Matter",
    undergrads: 5,
    description: "We study the physics of soft condensed matter, materials which are easily deformable by external stresses, electric or magnetic fields, or even by thermal fluctuations.",
    researchArea: "Soft Matter Physics",
    image: "/lab_images/weitz-bubbles.jpg",
    verified: true,
    sampleProjects: [
      "Making new classes of drop-based materials and studying their properties",
      "Imaging live cells and studying their mechanics"
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
    image: "/lab_images/yin-wizards.jpg",
    verified: true,
    sampleProjects: [
      "Implement matrix quantum mechanics bootstrap code on quantum-information solvers",
      "Study renormalization group flow of supersymmetric chiral nonlinear sigma models"
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
    image: "/lab_images/knirck-cone.jpg",
    verified: true,
    sampleProjects: [
      "Search for exotic models inside experimental data sets",
      "Simulate axion detectors, commission cryostats, and measure antenna patterns"
    ]
  },
  {
    id: "khalaf",
    name: "Khalaf Lab",
    pi: "Eslam Khalaf",
    location: "17 Oxford Street",
    category: "Condensed Matter Theory",
    undergrads: 1,
    description: "Khalaf's work addresses questions in the physics of disorder, topological insulators and semimetals, mechanisms for superconductivity in multi-layer graphene heterostructures.",
    researchArea: "Condensed Matter Theory",
    image: "/lab_images/khalaf-skyrmions.jpg",
    verified: true,
    sampleProjects: [
      "Exact diagonalization to compute dispersion of anyons on the sphere",
      "Numerical diagonalization studies of trion states in semiconductor heterostructures"
    ]
  },
  {
    id: "stubbs",
    name: "Stubbs Lab",
    pi: "Christopher Stubbs",
    location: "Lyman 335",
    category: "Astrophysics",
    undergrads: 2,
    description: "Recent projects have primarily used the tools and techniques of observational astronomy, providing the opportunity to measure the properties of the dark sector.",
    researchArea: "Observational Astrophysics",
    image: "/lab_images/stubbs-telescope.png",
    verified: true,
    sampleProjects: [
      "Build optical instrumentation to monitor image degradation in the Rubin Observatory",
      "Design precision calibration hardware that injects monochromatic photons into telescopes"
    ]
  },
  {
    id: "huth",
    name: "Huth Lab",
    pi: "John Huth",
    location: "Lyman 236",
    category: "Particle Physics",
    undergrads: 2,
    description: "Huth's present work centers on the exploration of the Higgs boson, particularly the decay of the Higgs into a bb̄ pair.",
    researchArea: "Experimental Particle Physics",
    image: "/lab_images/huth-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Finding detector efficiencies as a function of beam intensity",
      "Fitting ancient tables of latitude and longitude"
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
    verified: true,
    sampleProjects: [
      "Coarsening in phase separation governed by moment-conserving diffusion",
      "Boundary-driven scale-free profiles in annihilating two-particle systems"
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
    verified: true,
    sampleProjects: [
      "Sequence genomes from evolving yeast lines and analyze mutations",
      "Calculate site-frequency spectra under various purifying selection models"
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
    verified: true,
    sampleProjects: [
      "Whole-brain imaging of nematodes performing chemotaxis and thermotaxis"
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
    image: "/lab_images/morii-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Work at CERN on silicon tracking detector upgrades for ATLAS",
      "Help PhD students with LHC data analysis"
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
    verified: true,
    sampleProjects: [
      "Build quantum devices made of atomically thin materials",
      "Develop quantum sensing experiments"
    ]
  },
  {
    id: "heller",
    name: "Heller Lab",
    pi: "Eric Heller",
    location: "Mallinckrodt M-107",
    category: "Quantum Physics",
    undergrads: 6,
    description: "We are interested in a broad range of subjects that depend on time-dependent wave mechanics in one form or another.",
    researchArea: "Quantum Physics",
    image: "/lab_images/heller-flow.jpg",
    verified: true,
    sampleProjects: [
      "Discovery that Anderson localization becomes Planckian diffusion as the medium animates",
      "Quantum dots as acoustical chambers",
      "Collaborative quantum projects inspired by numerical discoveries"
    ]
  },
  {
    id: "sachdev",
    name: "Sachdev Lab",
    pi: "Subir Sachdev",
    location: "Lyman 343",
    category: "Condensed Matter Theory",
    undergrads: 1,
    description: "Subir Sachdev's research describes the consequences of quantum entanglement on the macroscopic properties of natural systems. On sabbatical until Fall 2026.",
    researchArea: "Condensed Matter Theory",
    image: "/lab_images/sachdev-hole.jpg",
    verified: true,
    sampleProjects: [
      "Spin-wave theory of fermions on the Lieb lattice"
    ]
  },
  {
    id: "jafferis",
    name: "Jafferis Lab",
    pi: "Daniel Jafferis",
    location: "Jefferson 371",
    category: "Quantum Gravity",
    undergrads: 1,
    description: "The research of Daniel Jafferis involves string theory, supersymmetric quantum field theory, and quantum gravity. Takes undergrads in rare cases.",
    researchArea: "Quantum Gravity",
    image: "/lab_images/jafferis-mogging.webp",
    verified: true,
    sampleProjects: [
      "Bags of gold and the overcounting of black hole entropy"
    ]
  },
  {
    id: "mazur",
    name: "Mazur Lab",
    pi: "Eric Mazur",
    location: "Pierce 233",
    category: "Optics",
    undergrads: 5,
    description: "We study the dynamics of molecules, chemical reactions, and condensed matter on very short timescales — down to femtoseconds.",
    researchArea: "Optics & Photonics",
    image: "/lab_images/mazur-screwdrivers.png",
    verified: true,
    sampleProjects: [
      "Develop a microfluidic platform to engineer CAR-T cells with lasers",
      "Theory and simulations of nanophotonic metamaterials",
      "Fabricate and characterize nonlinear waveguides"
    ]
  },
  // NEW LABS FROM SURVEY
  {
    id: "hoffman",
    name: "Hoffman Lab",
    pi: "Jenny Hoffman",
    location: "LISE Basement",
    category: "Condensed Matter",
    undergrads: 10,
    description: "Our group uses scanning tunneling microscopy and other tools to study quantum materials, superconductors, and topological systems.",
    researchArea: "Condensed Matter Physics",
    image: "/lab_images/mundy-mbe.png",
    verified: true,
    sampleProjects: [
      "Quantum-inspired design of tunable acoustic resonators",
      "Imaging Se diffusion across FeSe/SrTiO3 interface",
      "Simulating twistronics in acoustic metamaterials"
    ]
  },
  {
    id: "arguelles",
    name: "Argüelles Lab",
    pi: "Carlos Argüelles",
    location: "Jefferson",
    category: "Particle Astrophysics",
    undergrads: 5,
    description: "We study high-energy neutrinos using experiments like IceCube and develop new methods for detecting rare particle physics events.",
    researchArea: "Particle Astrophysics",
    image: "/lab_images/franklin-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Selecting high-energy neutrino events in IceCube with boosted decision trees",
      "Machine learning to separate signatures in neutrino telescopes",
      "Simulation work for IceCube, KM3NeT, or TAMBO"
    ]
  },
  {
    id: "doyle",
    name: "Doyle Lab",
    pi: "John Doyle",
    location: "LISE",
    category: "AMO Physics",
    undergrads: 2,
    description: "We build things. Our research involves building, running experiments, doing data analysis and then publishing.",
    researchArea: "AMO Physics",
    image: "/lab_images/mazur-screwdrivers.png",
    verified: true,
    sampleProjects: [
      "Building an ECDL (external cavity diode laser)"
    ]
  },
  {
    id: "yao",
    name: "Yao Lab",
    pi: "Norman Yao",
    location: "LISE",
    category: "Quantum Physics",
    undergrads: 3,
    description: "My group has projects that span quite a number of topics in quantum physics, from theory to experiment.",
    researchArea: "Quantum Physics",
    image: "/lab_images/heller-flow.jpg",
    verified: true,
    sampleProjects: [
      "Many-body NV systems: repetitive readout for spin projection noise limit",
      "High-pressure sensing with magnetic resonance spectra",
      "Neural quantum states for spin squeezing"
    ]
  },
  {
    id: "fan",
    name: "Fan Lab",
    pi: "Xing Fan",
    location: "Jefferson",
    category: "Experimental Physics",
    undergrads: 3,
    description: "Our lab focuses on experimental physics with projects ranging from machining to FPGA development.",
    researchArea: "Experimental Physics",
    image: "/lab_images/kim-circuit.png",
    verified: true,
    sampleProjects: [
      "FPGA development",
      "Designing PCB boards and setting up electronics",
      "Automated data acquisition systems"
    ]
  },
  {
    id: "barandes",
    name: "Barandes Group",
    pi: "Jacob Barandes",
    location: "Jefferson",
    category: "Philosophy of Physics",
    undergrads: 2,
    description: "I work in philosophy of physics, connected to philosophy of science, logic, metaphysics, and epistemology.",
    researchArea: "Philosophy of Physics",
    image: "/lab_images/cotler-blackboard.jpg",
    verified: true,
    sampleProjects: [
      "Projects involving quantum foundations and physical theory underpinnings"
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

  const verifiedCount = labs.filter(l => l.verified).length;

  return (
    <div>
      {/* Header Section */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold mb-2">Research Labs</h1>
          <p className="text-muted-foreground">
            Explore {labs.length} research groups in the Harvard Physics Department
            <span className="inline-flex items-center ml-2 text-green-600">
              • {verifiedCount} with verified survey data
            </span>
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-14 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search labs, PIs, or research areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-9">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">By Name</SelectItem>
                <SelectItem value="undergrads">By Undergrads</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {filteredLabs.length} results
            </span>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLabs.map((lab) => (
            <LabFlashCard
              key={lab.id}
              id={lab.id}
              pi={lab.pi}
              image={lab.image}
              description={lab.description}
              researchArea={lab.researchArea}
              sampleProjects={lab.sampleProjects}
              verified={lab.verified}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
