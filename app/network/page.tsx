"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Info, Grab } from "lucide-react";

// Dynamic import to avoid SSR issues with canvas
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

// Lab data with carefully curated tags based ONLY on factual information
const labs = [
  {
    id: "franklin",
    pi: "Melissa Franklin",
    description: "Searching for new particles using particle accelerators at CERN.",
    researchArea: "Particle Physics",
    image: "/lab_images/franklin-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Measure noise in detector signals from proton-proton collision data",
      "Investigate cross-talk in muon detector data",
      "Use Monte Carlo to model backgrounds for three W signals"
    ],
    // Tags based on factual information from descriptions
    tags: {
      field: "Particle Physics",
      technique: "Particle Detectors",
      building: "Lyman"
    }
  },
  {
    id: "cohen",
    pi: "Adam Cohen",
    description: "The Cohen Lab develops and applies new tools to study biology. We push the limits of physics and chemistry to make measurements in previously inaccessible regimes.",
    researchArea: "Neurophotonics & Biophysics",
    image: "/lab_images/cohen-magazine.jpg",
    verified: true,
    sampleProjects: [
      "Developing improved optical stimulation of neurons with pulsed ultrafast lasers",
      "Modeling Lou Gehrig's disease (ALS) with human stem cell-derived neurons",
      "Developing better algorithms to extract electrical activity from voltage imaging data"
    ],
    tags: {
      field: "Biophysics",
      technique: "Laser/Optics",  // "pulsed ultrafast lasers"
      building: "Mallinckrodt"
    }
  },
  {
    id: "manoharan",
    pi: "Vinothan Manoharan",
    description: "We do experiments to understand how complex systems such as interacting nanoparticles or proteins spontaneously order themselves — a process called self-assembly or self-organization.",
    researchArea: "Soft Matter & Biophysics",
    image: "/lab_images/manoharan-virus.png",
    verified: true,
    sampleProjects: [
      "Building and understanding the physics of 'capillary tweezers' that manipulate small particles"
    ],
    tags: {
      field: "Soft Matter",
      technique: "Microscopy/Imaging",  // Known for holographic microscopy of colloids
      building: "McKay"
    }
  },
  {
    id: "cotler",
    pi: "Jordan Cotler",
    description: "Cotler's current research interests include developing quantum algorithms to analyze quantum many-body and quantum gravitational systems.",
    researchArea: "Quantum Computing & Gravity",
    image: "/lab_images/cotler-blackboard.jpg",
    verified: false,
    sampleProjects: [],
    tags: {
      field: "Quantum",
      technique: "Theory/Simulation",  // "developing quantum algorithms"
      building: "Oxford St"
    }
  },
  {
    id: "mitrano",
    pi: "Matteo Mitrano",
    description: "Our research focuses on the investigation and the control of collective electronic behavior in quantum materials at ultrafast timescales.",
    researchArea: "Ultrafast Quantum Materials",
    image: "/lab_images/mitrano-lattice.png",
    verified: true,
    sampleProjects: [
      "Simulate dynamics of many-body excitons in NiPS₃ under THz illumination",
      "Analyze time-resolved X-ray absorption data from Pohang XFEL",
      "Build non-collinear optical parametric amplifier with 9 fs pulses"
    ],
    tags: {
      field: "Condensed Matter",
      technique: "Laser/Optics",  // "optical parametric amplifier with 9 fs pulses"
      building: "Jefferson"
    }
  },
  {
    id: "mundy",
    pi: "Julia Mundy",
    description: "Work in the Mundy group will design, synthesize and probe emergent phenomena in complex oxide thin films.",
    researchArea: "Oxide Heterostructures",
    image: "/lab_images/mundy-mbe.png",
    verified: true,
    sampleProjects: [
      "Hands-on AFM imaging, sputtering, x-ray diffraction and data analysis",
      "Synthesis of oxide thin films"
    ],
    tags: {
      field: "Condensed Matter",
      technique: "Materials Synthesis",  // "synthesize", "Synthesis of oxide thin films", MBE
      building: "LISE"
    }
  },
  {
    id: "kim",
    pi: "Philip Kim",
    description: "Our group's research focuses on the mesoscopic investigation of transport phenomena, particularly electric, thermal and thermoelectrical properties of low dimensional nanoscale materials.",
    researchArea: "Condensed Matter Physics",
    image: "/lab_images/kim-circuit.png",
    verified: true,
    sampleProjects: [
      "Work on ongoing group projects (no separate undergraduate projects)"
    ],
    tags: {
      field: "Condensed Matter",
      technique: "Cryogenics",  // Transport measurements require cryogenic temperatures
      building: "LISE"
    }
  },
  {
    id: "weitz",
    pi: "David Weitz",
    description: "We study the physics of soft condensed matter, materials which are easily deformable by external stresses, electric or magnetic fields, or even by thermal fluctuations.",
    researchArea: "Soft Matter Physics",
    image: "/lab_images/weitz-bubbles.jpg",
    verified: true,
    sampleProjects: [
      "Making new classes of drop-based materials and studying their properties",
      "Imaging live cells and studying their mechanics"
    ],
    tags: {
      field: "Soft Matter",
      technique: "Microscopy/Imaging",  // "Imaging live cells"
      building: "McKay"
    }
  },
  {
    id: "yin",
    pi: "Xi Yin",
    description: "I am a theoretical physicist interested in quantum field theory, string theory, and mathematical physics.",
    researchArea: "Theoretical High Energy Physics",
    image: "/lab_images/yin-wizards.jpg",
    verified: true,
    sampleProjects: [
      "Implement matrix quantum mechanics bootstrap code on quantum-information solvers",
      "Study renormalization group flow of supersymmetric chiral nonlinear sigma models"
    ],
    tags: {
      field: "High Energy Theory",
      technique: "Theory/Simulation",  // "theoretical physicist"
      building: "Jefferson"
    }
  },
  {
    id: "knirck",
    pi: "Stefan Knirck",
    description: "Our group builds novel experiments to directly detect axion dark matter in the µeV - meV mass range.",
    researchArea: "Particle Astrophysics",
    image: "/lab_images/knirck-cone.jpg",
    verified: true,
    sampleProjects: [
      "Search for exotic models inside experimental data sets",
      "Simulate axion detectors, commission cryostats, and measure antenna patterns"
    ],
    tags: {
      field: "Particle Physics",
      technique: "Cryogenics",  // "commission cryostats" explicitly mentioned
      building: "Hammond St"
    }
  },
  {
    id: "khalaf",
    pi: "Eslam Khalaf",
    description: "Khalaf's work addresses questions in the physics of disorder, topological insulators and semimetals, mechanisms for superconductivity in multi-layer graphene heterostructures.",
    researchArea: "Condensed Matter Theory",
    image: "/lab_images/khalaf-skyrmions.jpg",
    verified: true,
    sampleProjects: [
      "Exact diagonalization to compute dispersion of anyons on the sphere",
      "Numerical diagonalization studies of trion states in semiconductor heterostructures"
    ],
    tags: {
      field: "Condensed Matter",
      technique: "Theory/Simulation",  // "Exact diagonalization", "Numerical diagonalization"
      building: "Oxford St"
    }
  },
  {
    id: "stubbs",
    pi: "Christopher Stubbs",
    description: "Recent projects have primarily used the tools and techniques of observational astronomy, providing the opportunity to measure the properties of the dark sector.",
    researchArea: "Observational Astrophysics",
    image: "/lab_images/stubbs-telescope.png",
    verified: true,
    sampleProjects: [
      "Build optical instrumentation to monitor image degradation in the Rubin Observatory",
      "Design precision calibration hardware that injects monochromatic photons into telescopes"
    ],
    tags: {
      field: "Particle Physics",  // Astroparticle physics - dark sector connects to particle physics
      technique: "Laser/Optics",
      building: "Lyman"
    }
  },
  {
    id: "huth",
    pi: "John Huth",
    description: "Huth's present work centers on the exploration of the Higgs boson, particularly the decay of the Higgs into a bb̄ pair.",
    researchArea: "Experimental Particle Physics",
    image: "/lab_images/huth-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Finding detector efficiencies as a function of beam intensity",
      "Fitting ancient tables of latitude and longitude"
    ],
    tags: {
      field: "Particle Physics",
      technique: "Particle Detectors",  // ATLAS
      building: "Lyman"
    }
  },
  {
    id: "ro",
    pi: "Sunghan Ro",
    description: "Recently, Ro has focused on studying collective phenomena in active matter, which consists of units driven out of equilibrium at the individual level.",
    researchArea: "Statistical Physics",
    image: "/lab_images/ro-graph.png",
    verified: true,
    sampleProjects: [
      "Coarsening in phase separation governed by moment-conserving diffusion",
      "Boundary-driven scale-free profiles in annihilating two-particle systems"
    ],
    tags: {
      field: "Soft Matter",  // Active matter is soft matter physics
      technique: "Theory/Simulation",
      building: "Lyman"
    }
  },
  {
    id: "desai",
    pi: "Michael Desai",
    description: "We use theory and experiments to study evolutionary dynamics and population genetics, particularly when selection is pervasive.",
    researchArea: "Evolutionary Biophysics",
    image: "/lab_images/desai-bubbles.png",
    verified: true,
    sampleProjects: [
      "Sequence genomes from evolving yeast lines and analyze mutations",
      "Calculate site-frequency spectra under various purifying selection models"
    ],
    tags: {
      field: "Biophysics",
      building: "Northwest"
    }
  },
  {
    id: "samuel",
    pi: "Aravi Samuel",
    description: "To make progress, we use accessible biophysical models of organism behavior that can be studied from sensory input to motor output.",
    researchArea: "Neurophysics",
    image: "/lab_images/samuel-brain-science.jpg",
    verified: true,
    sampleProjects: [
      "Whole-brain imaging of nematodes performing chemotaxis and thermotaxis"
    ],
    tags: {
      field: "Biophysics",
      technique: "Microscopy/Imaging",  // "Whole-brain imaging"
      building: "Northwest"
    }
  },
  {
    id: "morii",
    pi: "Masahiro Morii",
    description: "Prof. Morii and his team of postdocs and students have searched for supersymmetry, for dark matter, and for rare processes involving top quarks.",
    researchArea: "Experimental Particle Physics",
    image: "/lab_images/morii-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Work at CERN on silicon tracking detector upgrades for ATLAS",
      "Help PhD students with LHC data analysis"
    ],
    tags: {
      field: "Particle Physics",
      technique: "Particle Detectors",  // ATLAS, CERN
      building: "Lyman"
    }
  },
  {
    id: "park",
    pi: "Hongkun Park",
    description: "The group focuses on fundamental studies of nanoscale electrical, optical, and plasmonic devices that operate based upon quantum mechanical principles.",
    researchArea: "Quantum Materials & Sensing",
    image: "/lab_images/park-computer.webp",
    verified: true,
    sampleProjects: [
      "Build quantum devices made of atomically thin materials",
      "Develop quantum sensing experiments"
    ],
    tags: {
      field: "Quantum",
      technique: "Materials Synthesis",  // "Build quantum devices"
      building: "Conant"
    }
  },
  {
    id: "heller",
    pi: "Eric Heller",
    description: "We are interested in a broad range of subjects that depend on time-dependent wave mechanics in one form or another.",
    researchArea: "Quantum Physics",
    image: "/lab_images/heller-flow.jpg",
    verified: true,
    sampleProjects: [
      "Discovery that Anderson localization becomes Planckian diffusion as the medium animates",
      "Quantum dots as acoustical chambers",
      "Collaborative quantum projects inspired by numerical discoveries"
    ],
    tags: {
      field: "Quantum",
      technique: "Theory/Simulation",  // "numerical discoveries"
      building: "Mallinckrodt"
    }
  },
  {
    id: "sachdev",
    pi: "Subir Sachdev",
    description: "Subir Sachdev's research describes the consequences of quantum entanglement on the macroscopic properties of natural systems. On sabbatical until Fall 2026.",
    researchArea: "Condensed Matter Theory",
    image: "/lab_images/sachdev-hole.jpg",
    verified: true,
    sampleProjects: [
      "Spin-wave theory of fermions on the Lieb lattice"
    ],
    tags: {
      field: "Condensed Matter",
      technique: "Theory/Simulation",  // theoretical
      building: "Lyman"
    }
  },
  {
    id: "jafferis",
    pi: "Daniel Jafferis",
    description: "The research of Daniel Jafferis involves string theory, supersymmetric quantum field theory, and quantum gravity. Takes undergrads in rare cases.",
    researchArea: "Quantum Gravity",
    image: "/lab_images/jafferis-mogging.webp",
    verified: true,
    sampleProjects: [
      "Bags of gold and the overcounting of black hole entropy"
    ],
    tags: {
      field: "High Energy Theory",
      technique: "Theory/Simulation",  // "string theory"
      building: "Jefferson"
    }
  },
  {
    id: "mazur",
    pi: "Eric Mazur",
    description: "We study the dynamics of molecules, chemical reactions, and condensed matter on very short timescales — down to femtoseconds.",
    researchArea: "Optics & Photonics",
    image: "/lab_images/mazur-screwdrivers.png",
    verified: true,
    sampleProjects: [
      "Develop a microfluidic platform to engineer CAR-T cells with lasers",
      "Theory and simulations of nanophotonic metamaterials",
      "Fabricate and characterize nonlinear waveguides"
    ],
    tags: {
      field: "AMO",  // Optics & photonics is part of AMO physics
      technique: "Laser/Optics",
      building: "Pierce"
    }
  },
  {
    id: "hoffman",
    pi: "Jenny Hoffman",
    description: "Our group uses scanning tunneling microscopy and other tools to study quantum materials, superconductors, and topological systems.",
    researchArea: "Condensed Matter Physics",
    image: "/lab_images/mundy-mbe.png",
    verified: true,
    sampleProjects: [
      "Quantum-inspired design of tunable acoustic resonators",
      "Imaging Se diffusion across FeSe/SrTiO3 interface",
      "Simulating twistronics in acoustic metamaterials"
    ],
    tags: {
      field: "Condensed Matter",
      technique: "Microscopy/Imaging",  // "scanning tunneling microscopy"
      building: "LISE"
    }
  },
  {
    id: "arguelles",
    pi: "Carlos Argüelles",
    description: "We study high-energy neutrinos using experiments like IceCube and develop new methods for detecting rare particle physics events.",
    researchArea: "Particle Astrophysics",
    image: "/lab_images/franklin-atlas.jpg",
    verified: true,
    sampleProjects: [
      "Selecting high-energy neutrino events in IceCube with boosted decision trees",
      "Machine learning to separate signatures in neutrino telescopes",
      "Simulation work for IceCube, KM3NeT, or TAMBO"
    ],
    tags: {
      field: "Particle Physics",
      technique: "Particle Detectors",  // "IceCube"
      building: "Jefferson"
    }
  },
  {
    id: "doyle",
    pi: "John Doyle",
    description: "We build things. Our research involves building, running experiments, doing data analysis and then publishing.",
    researchArea: "AMO Physics",
    image: "/lab_images/mazur-screwdrivers.png",
    verified: true,
    sampleProjects: [
      "Building an ECDL (external cavity diode laser)"
    ],
    tags: {
      field: "AMO",
      technique: "Laser/Optics",  // "ECDL (external cavity diode laser)"
      building: "LISE"
    }
  },
  {
    id: "yao",
    pi: "Norman Yao",
    description: "My group has projects that span quite a number of topics in quantum physics, from theory to experiment.",
    researchArea: "Quantum Physics",
    image: "/lab_images/heller-flow.jpg",
    verified: true,
    sampleProjects: [
      "Many-body NV systems: repetitive readout for spin projection noise limit",
      "High-pressure sensing with magnetic resonance spectra",
      "Neural quantum states for spin squeezing"
    ],
    tags: {
      field: "Quantum",
      technique: "Cryogenics",  // NV center experiments often require cryogenic temps
      building: "LISE"
    }
  },
  {
    id: "fan",
    pi: "Xing Fan",
    description: "Our lab focuses on experimental physics with projects ranging from machining to FPGA development.",
    researchArea: "Experimental Physics",
    image: "/lab_images/kim-circuit.png",
    verified: true,
    sampleProjects: [
      "FPGA development",
      "Designing PCB boards and setting up electronics",
      "Automated data acquisition systems"
    ],
    tags: {
      field: "Particle Physics",  // Instrumentation often supports particle physics experiments
      building: "Jefferson"
    }
  },
  {
    id: "barandes",
    pi: "Jacob Barandes",
    description: "I work in philosophy of physics, connected to philosophy of science, logic, metaphysics, and epistemology.",
    researchArea: "Philosophy of Physics",
    image: "/lab_images/cotler-blackboard.jpg",
    verified: true,
    sampleProjects: [
      "Projects involving quantum foundations and physical theory underpinnings"
    ],
    tags: {
      field: "Philosophy",
      technique: "Theory/Simulation",  // theoretical/philosophical work
      building: "Jefferson"
    }
  }
];

// Connection type colors
const connectionColors: Record<string, string> = {
  field: "#3b82f6",      // Blue
  technique: "#22c55e",  // Green
  building: "#f59e0b",   // Amber
};

// Connection type labels with technique breakdown
const connectionLabels: Record<string, string> = {
  field: "Research Field",
  technique: "Technique",
  building: "Building",
};

// Research field colors for the legend
const fieldColors: Record<string, string> = {
  "Particle Physics": "#ef4444",     // Red
  "Condensed Matter": "#3b82f6",     // Blue
  "AMO": "#22c55e",                  // Green
  "Quantum": "#8b5cf6",              // Purple
  "Biophysics": "#ec4899",           // Pink
  "Soft Matter": "#f97316",          // Orange
  "Cosmology": "#06b6d4",            // Cyan
  "High Energy Theory": "#eab308",   // Yellow
};

// Research field descriptions for tooltips
const fieldDescriptions: Record<string, string> = {
  "Particle Physics": "Studies fundamental particles and forces using accelerators like CERN's LHC",
  "Condensed Matter": "Investigates properties of solids and liquids, including superconductivity and magnetism",
  "AMO": "Atomic, Molecular & Optical physics - studies light-matter interactions and quantum control",
  "Quantum": "Explores quantum computing, information, and foundations of quantum mechanics",
  "Biophysics": "Applies physics principles to understand biological systems and life processes",
  "Soft Matter": "Studies materials like polymers, colloids, and biological matter that deform easily",
  "Cosmology": "Investigates the origin, evolution, and structure of the universe",
  "High Energy Theory": "Theoretical physics of fundamental particles, gravity, and spacetime",
};

// Get counts of labs per field
function getFieldCounts() {
  const counts: Record<string, number> = {};
  labs.forEach(lab => {
    const field = lab.tags.field;
    if (field) {
      counts[field] = (counts[field] || 0) + 1;
    }
  });
  return counts;
}

// Technique categories for reference:
// - Laser/Optics: Cohen, Mitrano, Mazur, Doyle, Stubbs (5 labs)
// - Particle Detectors: Franklin, Huth, Morii, Argüelles (4 labs)
// - Cryogenics: Kim, Knirck, Yao (3 labs)
// - Microscopy/Imaging: Hoffman, Weitz, Samuel, Manoharan (4 labs)
// - Theory/Simulation: Cotler, Khalaf, Yin, Ro, Sachdev, Jafferis, Barandes, Heller (8 labs)
// - Materials Synthesis: Mundy, Park (2 labs)
// - No technique assigned: Desai (genomics), Fan (electronics) - don't fit existing categories

// Build graph data
function buildGraphData(activeFilters: Set<string>) {
  const nodes = labs.map((lab) => ({
    id: lab.id,
    name: lab.pi,
    val: 8, // Node size
    color: lab.verified ? "#a855f7" : "#6b7280",
    lab: lab,
  }));

  const links: { source: string; target: string; color: string; type: string; value: string }[] = [];
  const addedLinks = new Set<string>();

  // Build connections based on shared tags
  for (let i = 0; i < labs.length; i++) {
    for (let j = i + 1; j < labs.length; j++) {
      const lab1 = labs[i];
      const lab2 = labs[j];

      // Check each tag type
      for (const tagType of ["field", "technique", "building"] as const) {
        if (!activeFilters.has(tagType)) continue;

        const tag1 = lab1.tags[tagType];
        const tag2 = lab2.tags[tagType];

        if (tag1 && tag2 && tag1 === tag2) {
          const linkId = `${lab1.id}-${lab2.id}-${tagType}`;
          if (!addedLinks.has(linkId)) {
            addedLinks.add(linkId);
            links.push({
              source: lab1.id,
              target: lab2.id,
              color: connectionColors[tagType],
              type: tagType,
              value: tag1,
            });
          }
        }
      }
    }
  }

  return { nodes, links };
}

export default function NetworkPage() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(["field", "technique"]));
  const [selectedLab, setSelectedLab] = useState<typeof labs[0] | null>(null);
  const [selectedNodePos, setSelectedNodePos] = useState<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [tooltipNode, setTooltipNode] = useState<string | null>(null); // Only for tooltip display
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  
  // Use refs for hover state to avoid re-renders that cause flashing
  const hoveredNodeRef = useRef<string | null>(null);
  const highlightNodesRef = useRef<Set<string>>(new Set());
  const highlightLinksRef = useRef<Set<string>>(new Set());
  const highlightedFieldRef = useRef<string | null>(null);
  const isDarkModeRef = useRef<boolean>(true);
  
  // Keep ref in sync with state
  highlightedFieldRef.current = highlightedField;
  
  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      isDarkModeRef.current = document.documentElement.classList.contains('dark');
    };
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);
  
  const fieldCounts = getFieldCounts();

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.max(500, window.innerHeight - 200),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const graphData = buildGraphData(activeFilters);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const handleNodeClick = useCallback((node: any, event: MouseEvent) => {
    setSelectedLab(node.lab);
    // Get container position to calculate relative position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSelectedNodePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }, []);

  // Handle node hover - use refs to avoid re-renders
  const handleNodeHover = useCallback((node: any) => {
    if (node) {
      hoveredNodeRef.current = node.id;
      setTooltipNode(node.id); // Only this triggers re-render (for tooltip)
      
      // Find all connected nodes and links
      const connectedNodes = new Set<string>();
      const connectedLinks = new Set<string>();
      
      connectedNodes.add(node.id);
      
      graphData.links.forEach((link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        if (sourceId === node.id) {
          connectedNodes.add(targetId);
          connectedLinks.add(`${sourceId}-${targetId}`);
        } else if (targetId === node.id) {
          connectedNodes.add(sourceId);
          connectedLinks.add(`${sourceId}-${targetId}`);
        }
      });
      
      highlightNodesRef.current = connectedNodes;
      highlightLinksRef.current = connectedLinks;
    } else {
      hoveredNodeRef.current = null;
      highlightNodesRef.current = new Set();
      highlightLinksRef.current = new Set();
      setTooltipNode(null);
    }
  }, [graphData.links]);

  const resetView = useCallback(() => {
    if (fgRef.current) {
      fgRef.current.centerAt(0, 0, 1000);
      fgRef.current.zoom(1, 1000);
      // Brief reheat to reorganize
      fgRef.current.d3ReheatSimulation();
    }
  }, []);

  // Configure forces after graph mounts
  useEffect(() => {
    const fg = fgRef.current;
    if (fg) {
      // Strong local repulsion - pushes nodes apart within clusters
      fg.d3Force("charge")?.strength(-400).distanceMax(120);
      
      // Very short link distances - pulls clusters very close
      fg.d3Force("link")
        ?.distance((link: any) => {
          switch (link.type) {
            case "field": return 18;       // Extremely tight clusters
            case "technique": return 16;   // Technique connections
            case "building": return 14;    // Building connections
            default: return 16;
          }
        })
        ?.strength(1.5);  // Very strong links
      
      // Center force to keep graph compact
      fg.d3Force("center")?.strength(0.25);
      
      // Reheat to apply new forces
      fg.d3ReheatSimulation();
      
      // Auto-fit after simulation settles
      setTimeout(() => {
        fg.zoomToFit(400, 30);
      }, 600);
    }
  }, [activeFilters]);

  // Custom node canvas drawing for 2D with subtle highlighting
  // No dependencies on hover state - reads from refs to avoid re-renders
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name.split(" ").pop(); // Last name only
    const baseFontSize = Math.min(9, Math.max(7, 8 / globalScale));
    const isDark = isDarkModeRef.current;
    
    // Theme-aware colors
    const textColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
    const textColorDimmed = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
    const textColorHighlighted = isDark ? "#ffffff" : "#000000";
    const labelBgColor = isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)";
    const borderColorDefault = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
    
    // Read from refs instead of state to avoid callback changes
    const isHighlighted = highlightNodesRef.current.has(node.id);
    const isHovered = hoveredNodeRef.current === node.id;
    const isDimmed = hoveredNodeRef.current && !isHighlighted;
    
    // Check if this node's field is highlighted
    const currentHighlightedField = highlightedFieldRef.current;
    const nodeField = node.lab?.tags?.field;
    const isFieldHighlighted = currentHighlightedField && nodeField === currentHighlightedField;
    const isFieldDimmed = currentHighlightedField && nodeField !== currentHighlightedField;
    
    // Node size
    const nodeRadius = isHovered ? 5 : isFieldHighlighted ? 6 : 4;
    
    // Draw subtle glow effect for hovered or field-highlighted node
    if (isHovered || isFieldHighlighted) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius + 3, 0, 2 * Math.PI);
      ctx.fillStyle = isFieldHighlighted 
        ? `${fieldColors[nodeField] || "#888"}40` 
        : "rgba(168, 85, 247, 0.3)";
      ctx.fill();
    }
    
    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    
    if (isDimmed || isFieldDimmed) {
      ctx.fillStyle = "rgba(120, 120, 120, 0.4)";
    } else if (isHovered) {
      ctx.fillStyle = isDark ? "#ffffff" : "#1a1a1a";
    } else if (isFieldHighlighted) {
      ctx.fillStyle = fieldColors[nodeField] || node.color;
    } else if (isHighlighted) {
      ctx.fillStyle = node.color;
    } else {
      ctx.fillStyle = node.color;
    }
    ctx.fill();
    
    // Draw border
    const borderColor = isFieldHighlighted 
      ? fieldColors[nodeField] || node.color
      : isHovered ? node.color : isHighlighted ? "rgba(168, 85, 247, 0.6)" : borderColorDefault;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = isHovered || isFieldHighlighted ? 2 : 1;
    ctx.stroke();
    
    // Draw compact label with subtle background
    ctx.font = `500 ${baseFontSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    
    const labelY = node.y + nodeRadius + 2;
    const textMetrics = ctx.measureText(label);
    const textWidth = textMetrics.width;
    const textHeight = baseFontSize;
    const padding = 1;
    
    const shouldDim = isDimmed || isFieldDimmed;
    
    // Draw subtle background behind label (only when not dimmed)
    if (!shouldDim) {
      ctx.fillStyle = labelBgColor;
      ctx.beginPath();
      ctx.roundRect(
        node.x - textWidth / 2 - padding,
        labelY - padding / 2,
        textWidth + padding * 2,
        textHeight + padding,
        2
      );
      ctx.fill();
    }
    
    // Draw text
    if (shouldDim) {
      ctx.fillStyle = textColorDimmed;
    } else if (isHovered || isFieldHighlighted || isHighlighted) {
      ctx.fillStyle = textColorHighlighted;
    } else {
      ctx.fillStyle = textColor;
    }
    ctx.fillText(label, node.x, labelY);
  }, []); // No dependencies - reads from refs

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Header */}
      <div className="border-b bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">Lab Network</h1>
              <p className="text-muted-foreground text-sm">
                Explore connections between {labs.length} research groups
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset View
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Sidebar - Filters */}
          <div className="w-64 flex-shrink-0 space-y-4">
            {/* Connection Types */}
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <h3 className="text-foreground/80 text-sm font-medium mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Connection Types
              </h3>
              <div className="space-y-2">
                {Object.entries(connectionLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => toggleFilter(key)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      activeFilters.has(key)
                        ? "bg-accent border border-border"
                        : "bg-transparent border border-transparent hover:bg-muted"
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: activeFilters.has(key) ? connectionColors[key] : "var(--muted-foreground)",
                      }}
                    />
                    <span className={`text-sm ${activeFilters.has(key) ? "text-foreground" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Research Fields - Interactive Legend */}
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <h3 className="text-foreground/80 text-sm font-medium mb-3">Research Fields</h3>
              <div className="space-y-1">
                {Object.entries(fieldCounts)
                  .sort((a, b) => b[1] - a[1]) // Sort by count descending
                  .map(([field, count]) => (
                  <div key={field} className="group relative">
                    <button
                      onClick={() => setHighlightedField(highlightedField === field ? null : field)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all text-left ${
                        highlightedField === field
                          ? "bg-accent ring-1 ring-border"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: fieldColors[field] || "#888" }}
                      />
                      <span className="text-xs text-foreground/80 flex-1 truncate">{field}</span>
                      <span className="text-xs text-muted-foreground">{count}</span>
                    </button>
                    {/* Tooltip on hover */}
                    <div className="absolute left-full ml-2 top-0 z-50 w-48 p-2 bg-popover rounded-lg border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none">
                      <p className="text-xs text-popover-foreground/70 leading-relaxed">
                        {fieldDescriptions[field] || "Research area in physics"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {highlightedField && (
                <button
                  onClick={() => setHighlightedField(null)}
                  className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear highlight
                </button>
              )}
            </div>

            {/* Node Legend */}
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <h3 className="text-foreground/80 text-sm font-medium mb-3">Nodes</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Verified Lab</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span>Unverified Lab</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <h3 className="text-foreground/80 text-sm font-medium mb-3">Stats</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Labs</span>
                  <span className="text-foreground">{graphData.nodes.length}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Connections</span>
                  <span className="text-foreground">{graphData.links.length}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
              <h3 className="text-foreground/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Grab className="h-4 w-4" />
                How to Use
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• <strong className="text-foreground/70">Hover</strong> to highlight connections</li>
                <li>• <strong className="text-foreground/70">Click</strong> a node to view details</li>
                <li>• <strong className="text-foreground/70">Drag nodes</strong> to rearrange</li>
                <li>• <strong className="text-foreground/70">Scroll</strong> to zoom, drag to pan</li>
              </ul>
            </div>
          </div>

          {/* Graph Container */}
          <div
            ref={containerRef}
            className="flex-1 rounded-xl border overflow-hidden relative"
            style={{ minHeight: "500px", backgroundColor: "var(--graph-bg)" }}
          >
            <ForceGraph2D
              ref={fgRef}
              graphData={graphData}
              width={dimensions.width - 288} // Account for sidebar
              height={dimensions.height}
              // Node appearance
              nodeLabel={(node: any) => `${node.name}\n${node.lab.researchArea}`}
              nodeColor={(node: any) => node.color}
              nodeVal={(node: any) => node.val}
              nodeCanvasObject={paintNode}
              nodeCanvasObjectMode={() => "replace"}
              // Link appearance with subtle highlighting - use refs
              linkColor={(link: any) => {
                if (!hoveredNodeRef.current) return link.color;
                const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                const linkKey = `${sourceId}-${targetId}`;
                return highlightLinksRef.current.has(linkKey) ? link.color : "rgba(100,100,100,0.25)";
              }}
              linkWidth={(link: any) => {
                if (!hoveredNodeRef.current) return 1.5;
                const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                const linkKey = `${sourceId}-${targetId}`;
                return highlightLinksRef.current.has(linkKey) ? 2.5 : 1;
              }}
              // Interaction handlers
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              onNodeDragEnd={(node: any) => {
                // Fix node position after dragging
                node.fx = node.x;
                node.fy = node.y;
              }}
              // Physics settings - Fast settling, minimal movement
              cooldownTicks={300}        // More ticks to fully settle
              warmupTicks={200}          // More pre-computation
              d3VelocityDecay={0.5}      // High damping - nodes slow down fast
              d3AlphaDecay={0.05}        // Fast cooling - simulation stops quickly
              // Visual settings
              backgroundColor="rgba(0,0,0,0)"
              enableNodeDrag={true}
              onBackgroundClick={() => {
                setSelectedLab(null);
                setSelectedNodePos(null);
              }}
            />

            {/* Hovered node tooltip */}
            {tooltipNode && !selectedLab && (
              <div className="absolute top-4 left-4 bg-popover/95 backdrop-blur-sm rounded-lg px-3 py-2 border shadow-lg">
                <p className="text-popover-foreground text-sm font-medium">
                  {labs.find((l) => l.id === tooltipNode)?.pi}
                </p>
                <p className="text-muted-foreground text-xs">
                  {labs.find((l) => l.id === tooltipNode)?.researchArea}
                </p>
              </div>
            )}

            {/* Floating Lab Card - positioned near clicked node */}
            {selectedLab && selectedNodePos && (() => {
              const cardWidth = 320; // w-80 = 320px
              const cardHeight = 380; // Approximate height with more padding
              const offset = 60; // Distance from node
              const graphWidth = dimensions.width - 288; // Account for sidebar
              const graphHeight = dimensions.height;
              
              // Determine best position: prefer right, but go left if not enough space
              const spaceOnRight = graphWidth - selectedNodePos.x;
              const spaceOnLeft = selectedNodePos.x;
              const showOnRight = spaceOnRight > cardWidth + offset;
              
              // Calculate position
              let left: number;
              let top: number;
              
              if (showOnRight) {
                left = selectedNodePos.x + offset;
              } else if (spaceOnLeft > cardWidth + offset) {
                left = selectedNodePos.x - cardWidth - offset;
              } else {
                // Not enough space on either side, center below/above
                left = Math.max(10, Math.min(selectedNodePos.x - cardWidth / 2, graphWidth - cardWidth - 10));
              }
              
              // Vertical positioning: try to center vertically on node, but stay in bounds
              top = selectedNodePos.y - cardHeight / 2;
              top = Math.max(10, Math.min(top, graphHeight - cardHeight - 10));
              
              return (
              <div
                className="absolute z-20 w-80 animate-in fade-in zoom-in-95 duration-200"
                style={{ left, top }}
              >
                {/* Close button - outside the card */}
                <button
                  onClick={() => {
                    setSelectedLab(null);
                    setSelectedNodePos(null);
                  }}
                  className="absolute -top-2 -right-2 z-20 p-1.5 rounded-full bg-card border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-lg"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                
                <div className="bg-card/95 backdrop-blur-md rounded-xl border shadow-2xl overflow-hidden">
                  {/* Card content */}
                  <div className="p-5">
                    {/* Header with field color and verified badge */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: fieldColors[selectedLab.tags.field] || "#888" }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-foreground font-medium text-base leading-tight">{selectedLab.pi}</h3>
                          {selectedLab.verified ? (
                            <span className="text-[10px] bg-green-500/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                              Unverified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-primary mt-1">{selectedLab.researchArea}</p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {selectedLab.description}
                    </p>
                    
                    {/* Sample Projects - for verified labs */}
                    {selectedLab.verified && selectedLab.sampleProjects && selectedLab.sampleProjects.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">Sample Projects</p>
                        <ul className="space-y-1.5">
                          {selectedLab.sampleProjects.slice(0, 2).map((project, idx) => (
                            <li key={idx} className="text-[11px] text-muted-foreground flex items-start leading-relaxed">
                              <span className="text-primary mr-2 flex-shrink-0">•</span>
                              <span className="line-clamp-2">{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Notice for unverified labs */}
                    {!selectedLab.verified && (
                      <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <p className="text-[11px] text-amber-700 dark:text-amber-200/80 leading-relaxed">
                          No survey data available. Contact this professor directly for research opportunities.
                        </p>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {Object.entries(selectedLab.tags).map(([type, value]) => (
                        value && (
                          <span
                            key={type}
                            className="inline-flex items-center text-[10px] px-2 py-1 rounded bg-muted text-muted-foreground"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mr-1.5"
                              style={{ backgroundColor: connectionColors[type] }}
                            />
                            {value}
                          </span>
                        )
                      ))}
                    </div>
                    
                    {/* Link to full page */}
                    <a
                      href={`/labs/${selectedLab.id}`}
                      className="inline-flex items-center text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      View full profile →
                    </a>
                  </div>
                </div>
              </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

