"use client";

import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Users,
  MapPin,
  FlaskConical,
  Info,
  X,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  Video,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Harvard Physics Buildings and their labs
const buildingsData: Record<string, any> = {
  "jefferson": {
    name: "Jefferson Laboratory",
    address: "17 Oxford Street",
    built: "1884",
    description: "First university building in America dedicated to physics research.",
    labs: [
      {
        id: "mitrano",
        name: "Mitrano Group",
        pi: "Matteo Mitrano",
        room: "Jefferson 164",
        category: "Solid State",
        members: 20,
        description: "Solid state physics research with cutting-edge techniques.",
        image: "https://mitrano.physics.harvard.edu/sites/g/files/omnuum1256/files/styles/hwp_1_1__1440x1440_scale/public/mitranolab/files/2_0.png?itok=GCfYx981"
      }
    ]
  },
  "lyman": {
    name: "Lyman Laboratory",
    address: "Cambridge Street",
    built: "1931",
    description: "Named after physicist Theodore Lyman, located between Jefferson and Cruft.",
    labs: [
      {
        id: "franklin",
        name: "Franklin Lab",
        pi: "Melissa Franklin",
        room: "Lyman 237",
        category: "Particle Physics",
        members: 12,
        description: "Searching for new particles using particle accelerators at CERN.",
        image: "https://atlas.cern/sites/default/files/2025-09/ATLAS-OO-banner.jpg"
      }
    ]
  },
  "mallinckrodt": {
    name: "Mallinckrodt Laboratory",
    address: "12 Oxford Street",
    built: "1928",
    description: "Chemistry and chemical physics research facility.",
    labs: [
      {
        id: "cohen",
        name: "Cohen Lab",
        pi: "Adam Cohen",
        room: "Mallinckrodt 115",
        category: "Biophysics",
        members: 18,
        description: "Developing optical techniques to visualize voltage dynamics in neural tissue.",
        image: "https://cohenweb.rc.fas.harvard.edu/Research/JNeuro_Cover.jpg"
      }
    ]
  },
  "mckay": {
    name: "McKay Laboratory",
    address: "9 Oxford Street",
    built: "2006",
    description: "Gordon McKay Laboratory of Applied Science for engineering and applied physics.",
    labs: [
      {
        id: "manoharan",
        name: "Manoharan Group",
        pi: "Vinothan Manoharan",
        room: "McKay 530",
        category: "Biophysics",
        members: 15,
        description: "Virus self-assembly research.",
        image: "https://www.manoharan.seas.harvard.edu/sites/g/files/omnuum4256/files/styles/hwp_21_9__2880x1230/public/manoharan/files/ccmv_in_out-01-01.png?itok=yAJ00Zuq"
      }
    ]
  },
  "oxford": {
    name: "60 Oxford Street",
    address: "60 Oxford Street",
    built: "1963",
    description: "Home to various physics and mathematics departments.",
    labs: [
      {
        id: "cotler",
        name: "Cotler Group",
        pi: "Jordan Cotler",
        room: "60 Oxford St. 412",
        category: "Quantum Computing",
        members: 14,
        description: "Developing new theoretical frameworks behind quantum gravity and computing.",
        image: "https://www.quantamagazine.org/wp-content/uploads/2022/09/andrew-strominger-jordan-cotler-ADJUSTED.jpg"
      }
    ]
  },
  "lise": {
    name: "LISE Building",
    address: "29 Oxford Street",
    built: "2007",
    description: "Laboratory for Integrated Science and Engineering with nanoscale research facilities.",
    labs: [
      {
        id: "mundy",
        name: "Mundy Group",
        pi: "Julia Mundy",
        room: "LISE 709",
        category: "Solid State",
        members: 16,
        description: "Molecular beam epitaxy research.",
        image: "/mundy-mbe.png"
      }
    ]
  }
};

export default function MapPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  const getBuildingColor = (buildingId: string, isHovered: boolean) => {
    const baseColors: Record<string, string> = {
      jefferson: "#3b82f6",
      lyman: "#8b5cf6",
      mallinckrodt: "#f59e0b",
      mckay: "#10b981",
      oxford: "#ef4444",
      lise: "#ec4899"
    };

    if (isHovered) {
      return "#fbbf24"; // Gold on hover
    }

    return baseColors[buildingId] || "#6b7280";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">Harvard Physics Campus Map</h1>
        <p className="text-lg text-muted-foreground">
          Explore Harvard's physics buildings and discover the research labs within each facility
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-6">
        {/* Map Area */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Harvard North Yard - Physics Area</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLegend(!showLegend)}
              >
                {showLegend ? "Hide" : "Show"} Legend
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-neutral-50 dark:bg-neutral-900" style={{ height: "600px" }}>
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                centerOnInit
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => zoomIn()}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => zoomOut()}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => resetTransform()}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Harvard Campus Map */}
                    <TransformComponent>
                      <svg
                        width="1000"
                        height="700"
                        viewBox="0 0 1000 700"
                        className="w-full h-full"
                      >
                        {/* Background - Campus Green */}
                        <rect
                          x="0"
                          y="0"
                          width="1000"
                          height="700"
                          fill="#f0fdf4"
                        />

                        {/* Streets */}
                        <rect x="0" y="300" width="1000" height="80" fill="#d1d5db" />
                        <text x="500" y="345" textAnchor="middle" className="fill-neutral-600 font-semibold">
                          Oxford Street
                        </text>

                        <rect x="200" y="0" width="50" height="700" fill="#d1d5db" />
                        <text x="225" y="50" textAnchor="middle" className="fill-neutral-600 font-semibold" transform="rotate(-90, 225, 50)">
                          Cambridge Street
                        </text>

                        {/* Jefferson Laboratory */}
                        <g
                          className="cursor-pointer transition-all"
                          onClick={() => setSelectedBuilding("jefferson")}
                          onMouseEnter={() => setHoveredBuilding("jefferson")}
                          onMouseLeave={() => setHoveredBuilding(null)}
                        >
                          <rect
                            x="280"
                            y="100"
                            width="180"
                            height="150"
                            fill={getBuildingColor("jefferson", hoveredBuilding === "jefferson")}
                            stroke="#1e40af"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          <text x="370" y="165" textAnchor="middle" className="fill-white font-bold text-base">
                            Jefferson
                          </text>
                          <text x="370" y="185" textAnchor="middle" className="fill-white text-sm">
                            Laboratory
                          </text>
                          <text x="370" y="200" textAnchor="middle" className="fill-white text-xs">
                            (1884)
                          </text>
                        </g>

                        {/* Lyman Laboratory */}
                        <g
                          className="cursor-pointer transition-all"
                          onClick={() => setSelectedBuilding("lyman")}
                          onMouseEnter={() => setHoveredBuilding("lyman")}
                          onMouseLeave={() => setHoveredBuilding(null)}
                        >
                          <rect
                            x="500"
                            y="100"
                            width="150"
                            height="150"
                            fill={getBuildingColor("lyman", hoveredBuilding === "lyman")}
                            stroke="#6d28d9"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          <text x="575" y="165" textAnchor="middle" className="fill-white font-bold text-base">
                            Lyman
                          </text>
                          <text x="575" y="185" textAnchor="middle" className="fill-white text-sm">
                            Laboratory
                          </text>
                          <text x="575" y="200" textAnchor="middle" className="fill-white text-xs">
                            (1931)
                          </text>
                        </g>

                        {/* Mallinckrodt Laboratory */}
                        <g
                          className="cursor-pointer transition-all"
                          onClick={() => setSelectedBuilding("mallinckrodt")}
                          onMouseEnter={() => setHoveredBuilding("mallinckrodt")}
                          onMouseLeave={() => setHoveredBuilding(null)}
                        >
                          <rect
                            x="690"
                            y="100"
                            width="160"
                            height="150"
                            fill={getBuildingColor("mallinckrodt", hoveredBuilding === "mallinckrodt")}
                            stroke="#d97706"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          <text x="770" y="160" textAnchor="middle" className="fill-white font-bold text-sm">
                            Mallinckrodt
                          </text>
                          <text x="770" y="180" textAnchor="middle" className="fill-white text-sm">
                            Laboratory
                          </text>
                          <text x="770" y="195" textAnchor="middle" className="fill-white text-xs">
                            (1928)
                          </text>
                        </g>

                        {/* McKay Laboratory */}
                        <g
                          className="cursor-pointer transition-all"
                          onClick={() => setSelectedBuilding("mckay")}
                          onMouseEnter={() => setHoveredBuilding("mckay")}
                          onMouseLeave={() => setHoveredBuilding(null)}
                        >
                          <rect
                            x="280"
                            y="420"
                            width="160"
                            height="180"
                            fill={getBuildingColor("mckay", hoveredBuilding === "mckay")}
                            stroke="#059669"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          <text x="360" y="500" textAnchor="middle" className="fill-white font-bold text-base">
                            McKay
                          </text>
                          <text x="360" y="520" textAnchor="middle" className="fill-white text-sm">
                            Laboratory
                          </text>
                          <text x="360" y="535" textAnchor="middle" className="fill-white text-xs">
                            (2006)
                          </text>
                        </g>

                        {/* 60 Oxford Street */}
                        <g
                          className="cursor-pointer transition-all"
                          onClick={() => setSelectedBuilding("oxford")}
                          onMouseEnter={() => setHoveredBuilding("oxford")}
                          onMouseLeave={() => setHoveredBuilding(null)}
                        >
                          <rect
                            x="480"
                            y="420"
                            width="140"
                            height="180"
                            fill={getBuildingColor("oxford", hoveredBuilding === "oxford")}
                            stroke="#dc2626"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          <text x="550" y="500" textAnchor="middle" className="fill-white font-bold text-base">
                            60 Oxford
                          </text>
                          <text x="550" y="520" textAnchor="middle" className="fill-white text-sm">
                            Street
                          </text>
                          <text x="550" y="535" textAnchor="middle" className="fill-white text-xs">
                            (1963)
                          </text>
                        </g>

                        {/* LISE Building */}
                        <g
                          className="cursor-pointer transition-all"
                          onClick={() => setSelectedBuilding("lise")}
                          onMouseEnter={() => setHoveredBuilding("lise")}
                          onMouseLeave={() => setHoveredBuilding(null)}
                        >
                          <rect
                            x="660"
                            y="420"
                            width="190"
                            height="180"
                            fill={getBuildingColor("lise", hoveredBuilding === "lise")}
                            stroke="#db2777"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                          <text x="755" y="490" textAnchor="middle" className="fill-white font-bold text-base">
                            LISE
                          </text>
                          <text x="755" y="510" textAnchor="middle" className="fill-white text-xs">
                            Laboratory for
                          </text>
                          <text x="755" y="525" textAnchor="middle" className="fill-white text-xs">
                            Integrated Science
                          </text>
                          <text x="755" y="540" textAnchor="middle" className="fill-white text-xs">
                            & Engineering (2007)
                          </text>
                        </g>

                        {/* Legend Labels */}
                        <text x="500" y="680" textAnchor="middle" className="fill-neutral-500 text-sm font-light italic">
                          Click on any building to view the research labs inside
                        </text>
                      </svg>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>

              {/* Legend */}
              <AnimatePresence>
                {showLegend && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute bottom-4 left-4 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg"
                  >
                    <h3 className="font-semibold mb-2 text-sm">Physics Buildings</h3>
                    <div className="space-y-1">
                      {Object.entries({
                        "Jefferson Laboratory": "#3b82f6",
                        "Lyman Laboratory": "#8b5cf6",
                        "Mallinckrodt Lab": "#f59e0b",
                        "McKay Laboratory": "#10b981",
                        "60 Oxford Street": "#ef4444",
                        "LISE Building": "#ec4899"
                      }).map(([building, color]: [string, string]) => (
                        <div key={building} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs">{building}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Building & Lab Details Panel */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Campus Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Buildings</span>
                <span className="font-semibold">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Research Labs</span>
                <span className="font-semibold">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Researchers</span>
                <span className="font-semibold">95</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Building Details */}
          <AnimatePresence mode="wait">
            {selectedBuilding && buildingsData[selectedBuilding] && (
              <motion.div
                key={selectedBuilding}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {buildingsData[selectedBuilding].name}
                        </CardTitle>
                        <CardDescription>
                          {buildingsData[selectedBuilding].address}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedBuilding(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Built in {buildingsData[selectedBuilding].built}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {buildingsData[selectedBuilding].description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <FlaskConical className="h-4 w-4" />
                        Labs in this Building
                      </h4>
                      <div className="space-y-3">
                        {buildingsData[selectedBuilding].labs.map((lab: any) => (
                          <div
                            key={lab.id}
                            className="border rounded-lg p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            {lab.image && (
                              <img
                                src={lab.image}
                                alt={lab.name}
                                className="w-full h-24 object-cover rounded mb-2"
                              />
                            )}
                            <div className="font-medium text-sm">{lab.name}</div>
                            <div className="text-xs text-muted-foreground mb-1">
                              PI: {lab.pi}
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {lab.room}
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {lab.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {lab.members}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {lab.description}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full mt-2"
                              onClick={() => window.location.href = `/labs/${lab.id}`}
                            >
                              View Lab Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedBuilding && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select a Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on any building on the map to view its research labs and details.
                </p>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground">Quick Tips:</div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Zoom and pan the map for a better view</li>
                    <li>Hover over buildings to highlight them</li>
                    <li>Buildings are color-coded by location</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Building Directory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Building Directory</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[250px]">
                <div className="p-4 space-y-2">
                  {Object.entries(buildingsData).map(([buildingId, building]: [string, any]) => (
                    <button
                      key={buildingId}
                      onClick={() => setSelectedBuilding(buildingId)}
                      className="w-full text-left p-3 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{building.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {building.address}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {building.labs.length} lab{building.labs.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}