"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  MapPin,
  FlaskConical,
  X,
  ChevronRight,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Harvard Physics Buildings and their labs
const buildingsData: Record<string, any> = {
  "jefferson": {
    name: "Jefferson Laboratory",
    address: "17 Oxford Street",
    built: "1884",
    description: "First university building in America dedicated to physics research.",
    color: "#3b82f6",
    position: { x: 150, y: 200 },
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
    color: "#8b5cf6",
    position: { x: 320, y: 150 },
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
    color: "#f59e0b",
    position: { x: 480, y: 120 },
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
    color: "#10b981",
    position: { x: 620, y: 100 },
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
    color: "#ef4444",
    position: { x: 750, y: 80 },
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
    color: "#ec4899",
    position: { x: 150, y: 350 },
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">Harvard Physics Campus Map</h1>
        <p className="text-lg text-muted-foreground">
          Explore Harvard's physics buildings and research labs
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Map Area */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle>Harvard North Yard - Physics Area</CardTitle>
            <CardDescription>Click on any building to view details</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-neutral-50 dark:bg-neutral-900" style={{ height: "600px" }}>
              <svg
                viewBox="0 0 900 600"
                className="w-full h-full"
                style={{ minHeight: "600px" }}
              >
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                  </pattern>
                </defs>
                <rect width="900" height="600" fill="url(#grid)" />

                {/* Roads/Paths */}
                <path d="M 50,250 L 850,250" stroke="currentColor" strokeWidth="4" opacity="0.2" strokeDasharray="10,5" />
                <path d="M 400,50 L 400,550" stroke="currentColor" strokeWidth="4" opacity="0.2" strokeDasharray="10,5" />

                {/* Labels */}
                <text x="450" y="270" textAnchor="middle" className="fill-current text-muted-foreground text-xs font-medium">
                  Oxford Street
                </text>
                <text x="420" y="300" textAnchor="start" className="fill-current text-muted-foreground text-xs font-medium" transform="rotate(-90 420 300)">
                  Cambridge Street
                </text>

                {/* Buildings */}
                {Object.entries(buildingsData).map(([buildingId, building]) => {
                  const isHovered = hoveredBuilding === buildingId;
                  const isSelected = selectedBuilding === buildingId;
                  
                  return (
                    <g key={buildingId}>
                      {/* Building rectangle */}
                      <rect
                        x={building.position.x}
                        y={building.position.y}
                        width="120"
                        height="80"
                        fill={building.color}
                        fillOpacity={isHovered || isSelected ? 0.9 : 0.7}
                        stroke={building.color}
                        strokeWidth={isSelected ? 4 : 2}
                        rx="4"
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredBuilding(buildingId)}
                        onMouseLeave={() => setHoveredBuilding(null)}
                        onClick={() => setSelectedBuilding(buildingId)}
                      />
                      
                      {/* Building icon */}
                      <g transform={`translate(${building.position.x + 60}, ${building.position.y + 25})`}>
                        <rect x="-12" y="-12" width="24" height="24" fill="white" fillOpacity="0.9" rx="2" />
                        <path
                          d="M3-8h6v6h-6zm0 8h6v6h-6zm8-8h6v6h-6zm0 8h6v6h-6z"
                          fill={building.color}
                          transform="scale(0.8)"
                        />
                      </g>
                      
                      {/* Building name */}
                      <text
                        x={building.position.x + 60}
                        y={building.position.y + 60}
                        textAnchor="middle"
                        className="fill-white text-xs font-semibold pointer-events-none"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                      >
                        {building.name.split(' ')[0]}
                      </text>
                      <text
                        x={building.position.x + 60}
                        y={building.position.y + 72}
                        textAnchor="middle"
                        className="fill-white text-xs font-medium pointer-events-none"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                      >
                        {building.labs.length} lab{building.labs.length !== 1 ? 's' : ''}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Physics Buildings
                </h3>
                <div className="space-y-2">
                  {Object.entries(buildingsData).map(([buildingId, building]) => (
                    <button
                      key={buildingId}
                      onClick={() => setSelectedBuilding(buildingId)}
                      className="flex items-center gap-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1.5 rounded transition-colors text-left"
                    >
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: building.color }}
                      />
                      <span className="text-xs">{building.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Building & Lab Details Panel */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Campus Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Physics Buildings</span>
                <span className="font-semibold">{Object.keys(buildingsData).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Research Labs</span>
                <span className="font-semibold">
                  {Object.values(buildingsData).reduce((acc: number, building: any) => acc + building.labs.length, 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Researchers</span>
                <span className="font-semibold">
                  {Object.values(buildingsData).reduce(
                    (acc: number, building: any) => 
                      acc + building.labs.reduce((sum: number, lab: any) => sum + lab.members, 0), 
                    0
                  )}
                </span>
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
                      <ScrollArea className="max-h-[350px]">
                        <div className="space-y-3 pr-4">
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
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="secondary" className="text-xs">
                                  {lab.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Users className="h-3 w-3" />
                                  {lab.members}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3">
                                {lab.description}
                              </p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full"
                                asChild
                              >
                                <Link href={`/labs/${lab.id}`}>
                                  View Lab Details
                                  <ChevronRight className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
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
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Building Directory:</div>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2 pr-4">
                      {Object.entries(buildingsData).map(([buildingId, building]: [string, any]) => (
                        <button
                          key={buildingId}
                          onClick={() => setSelectedBuilding(buildingId)}
                          className="w-full text-left p-3 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-sm flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded"
                                  style={{ backgroundColor: building.color }}
                                />
                                {building.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {building.address}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {building.labs.length} lab{building.labs.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
