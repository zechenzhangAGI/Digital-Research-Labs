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

// Lab data with coordinates on the floor plan
const labsData: Record<string, any> = {
  "301": {
    id: "quantum",
    name: "Quantum Computing Lab",
    pi: "Prof. Sarah Chen",
    room: "Jefferson 301",
    floor: 3,
    type: "Quantum",
    members: 12,
    description: "State-of-the-art quantum computing research facility with ion trap systems and quantum processors.",
    equipment: ["Ion Trap System", "Dilution Refrigerator", "Quantum Control Electronics"],
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    video: "/api/placeholder/video"
  },
  "302": {
    id: "optics",
    name: "Ultrafast Optics Lab",
    pi: "Prof. James Wilson",
    room: "Jefferson 302",
    floor: 3,
    type: "Optics",
    members: 8,
    description: "Advanced laser systems for ultrafast spectroscopy and nonlinear optics research.",
    equipment: ["Femtosecond Laser", "Optical Table", "Spectrometer"],
    images: ["/api/placeholder/600/400"]
  },
  "303": {
    id: "condensed",
    name: "Condensed Matter Lab",
    pi: "Prof. Elena Rodriguez",
    room: "Jefferson 303",
    floor: 3,
    type: "Materials",
    members: 15,
    description: "Materials synthesis and characterization for superconductors and topological materials.",
    equipment: ["Crystal Growth Furnace", "PPMS", "X-ray Diffractometer"],
    images: ["/api/placeholder/600/400"]
  },
  "304": {
    id: "biophysics",
    name: "Molecular Biophysics Lab",
    pi: "Prof. Michael Zhang",
    room: "Jefferson 304",
    floor: 3,
    type: "Biophysics",
    members: 18,
    description: "Single-molecule imaging and manipulation for biological systems.",
    equipment: ["TIRF Microscope", "Optical Tweezers", "AFM"],
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
  },
  "305": {
    id: "computational",
    name: "Computational Physics",
    pi: "Prof. Lisa Park",
    room: "Jefferson 305",
    floor: 3,
    type: "Computational",
    members: 20,
    description: "High-performance computing for quantum simulations and machine learning.",
    equipment: ["GPU Cluster", "Workstations"],
    images: ["/api/placeholder/600/400"]
  }
};

export default function MapPage() {
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [hoveredLab, setHoveredLab] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState(3);
  const [showLegend, setShowLegend] = useState(true);

  const getLabColor = (type: string) => {
    const colors: Record<string, string> = {
      Quantum: "#3b82f6",
      Optics: "#8b5cf6",
      Materials: "#f59e0b",
      Biophysics: "#10b981",
      Computational: "#ef4444"
    };
    return colors[type] || "#6b7280";
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">Interactive Lab Map</h1>
        <p className="text-lg text-muted-foreground">
          Navigate the Harvard Physics Department floor plans and explore lab locations
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Map Area */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle>Jefferson Laboratory - Floor {selectedFloor}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant={selectedFloor === 2 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFloor(2)}
                  >
                    Floor 2
                  </Button>
                  <Button
                    variant={selectedFloor === 3 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFloor(3)}
                  >
                    Floor 3
                  </Button>
                  <Button
                    variant={selectedFloor === 4 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFloor(4)}
                  >
                    Floor 4
                  </Button>
                </div>
              </div>
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

                    {/* Floor Plan */}
                    <TransformComponent>
                      <svg
                        width="800"
                        height="600"
                        viewBox="0 0 800 600"
                        className="w-full h-full"
                      >
                        {/* Building Outline */}
                        <rect
                          x="50"
                          y="50"
                          width="700"
                          height="500"
                          fill="white"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />

                        {/* Corridor */}
                        <rect
                          x="50"
                          y="250"
                          width="700"
                          height="100"
                          fill="#f3f4f6"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <text
                          x="400"
                          y="305"
                          textAnchor="middle"
                          className="fill-neutral-500 text-sm"
                        >
                          Main Corridor
                        </text>

                        {selectedFloor === 3 && (
                          <>
                            {/* Lab Rooms - Floor 3 */}
                            {/* Room 301 - Quantum Computing */}
                            <g
                              className="cursor-pointer"
                              onClick={() => setSelectedLab("301")}
                              onMouseEnter={() => setHoveredLab("301")}
                              onMouseLeave={() => setHoveredLab(null)}
                            >
                              <rect
                                x="50"
                                y="50"
                                width="200"
                                height="200"
                                fill={hoveredLab === "301" ? "#dbeafe" : "white"}
                                stroke={getLabColor("Quantum")}
                                strokeWidth="3"
                              />
                              <text
                                x="150"
                                y="140"
                                textAnchor="middle"
                                className="font-semibold"
                              >
                                Room 301
                              </text>
                              <text
                                x="150"
                                y="160"
                                textAnchor="middle"
                                className="text-sm fill-neutral-600"
                              >
                                Quantum Lab
                              </text>
                              <FlaskConical
                                className="w-6 h-6"
                                x="137"
                                y="100"
                                fill={getLabColor("Quantum")}
                              />
                            </g>

                            {/* Room 302 - Optics */}
                            <g
                              className="cursor-pointer"
                              onClick={() => setSelectedLab("302")}
                              onMouseEnter={() => setHoveredLab("302")}
                              onMouseLeave={() => setHoveredLab(null)}
                            >
                              <rect
                                x="250"
                                y="50"
                                width="150"
                                height="200"
                                fill={hoveredLab === "302" ? "#ede9fe" : "white"}
                                stroke={getLabColor("Optics")}
                                strokeWidth="3"
                              />
                              <text
                                x="325"
                                y="140"
                                textAnchor="middle"
                                className="font-semibold"
                              >
                                Room 302
                              </text>
                              <text
                                x="325"
                                y="160"
                                textAnchor="middle"
                                className="text-sm fill-neutral-600"
                              >
                                Optics Lab
                              </text>
                            </g>

                            {/* Room 303 - Condensed Matter */}
                            <g
                              className="cursor-pointer"
                              onClick={() => setSelectedLab("303")}
                              onMouseEnter={() => setHoveredLab("303")}
                              onMouseLeave={() => setHoveredLab(null)}
                            >
                              <rect
                                x="400"
                                y="50"
                                width="180"
                                height="200"
                                fill={hoveredLab === "303" ? "#fef3c7" : "white"}
                                stroke={getLabColor("Materials")}
                                strokeWidth="3"
                              />
                              <text
                                x="490"
                                y="140"
                                textAnchor="middle"
                                className="font-semibold"
                              >
                                Room 303
                              </text>
                              <text
                                x="490"
                                y="160"
                                textAnchor="middle"
                                className="text-sm fill-neutral-600"
                              >
                                Materials Lab
                              </text>
                            </g>

                            {/* Room 304 - Biophysics */}
                            <g
                              className="cursor-pointer"
                              onClick={() => setSelectedLab("304")}
                              onMouseEnter={() => setHoveredLab("304")}
                              onMouseLeave={() => setHoveredLab(null)}
                            >
                              <rect
                                x="50"
                                y="350"
                                width="250"
                                height="200"
                                fill={hoveredLab === "304" ? "#d1fae5" : "white"}
                                stroke={getLabColor("Biophysics")}
                                strokeWidth="3"
                              />
                              <text
                                x="175"
                                y="440"
                                textAnchor="middle"
                                className="font-semibold"
                              >
                                Room 304
                              </text>
                              <text
                                x="175"
                                y="460"
                                textAnchor="middle"
                                className="text-sm fill-neutral-600"
                              >
                                Biophysics Lab
                              </text>
                            </g>

                            {/* Room 305 - Computational */}
                            <g
                              className="cursor-pointer"
                              onClick={() => setSelectedLab("305")}
                              onMouseEnter={() => setHoveredLab("305")}
                              onMouseLeave={() => setHoveredLab(null)}
                            >
                              <rect
                                x="300"
                                y="350"
                                width="200"
                                height="200"
                                fill={hoveredLab === "305" ? "#fee2e2" : "white"}
                                stroke={getLabColor("Computational")}
                                strokeWidth="3"
                              />
                              <text
                                x="400"
                                y="440"
                                textAnchor="middle"
                                className="font-semibold"
                              >
                                Room 305
                              </text>
                              <text
                                x="400"
                                y="460"
                                textAnchor="middle"
                                className="text-sm fill-neutral-600"
                              >
                                Computational
                              </text>
                            </g>

                            {/* Common Areas */}
                            <rect
                              x="580"
                              y="50"
                              width="170"
                              height="200"
                              fill="#f9fafb"
                              stroke="#e5e7eb"
                              strokeWidth="1"
                            />
                            <text
                              x="665"
                              y="150"
                              textAnchor="middle"
                              className="text-sm fill-neutral-500"
                            >
                              Conference Room
                            </text>

                            <rect
                              x="500"
                              y="350"
                              width="250"
                              height="200"
                              fill="#f9fafb"
                              stroke="#e5e7eb"
                              strokeWidth="1"
                            />
                            <text
                              x="625"
                              y="450"
                              textAnchor="middle"
                              className="text-sm fill-neutral-500"
                            >
                              Student Office Space
                            </text>

                            {/* Elevators and Stairs */}
                            <rect
                              x="680"
                              y="270"
                              width="50"
                              height="60"
                              fill="#e5e7eb"
                              stroke="#9ca3af"
                              strokeWidth="1"
                            />
                            <text
                              x="705"
                              y="305"
                              textAnchor="middle"
                              className="text-xs fill-neutral-600"
                            >
                              Elev
                            </text>
                          </>
                        )}

                        {selectedFloor === 2 && (
                          <text
                            x="400"
                            y="300"
                            textAnchor="middle"
                            className="text-xl fill-neutral-400"
                          >
                            Floor 2 - Administrative Offices
                          </text>
                        )}

                        {selectedFloor === 4 && (
                          <text
                            x="400"
                            y="300"
                            textAnchor="middle"
                            className="text-xl fill-neutral-400"
                          >
                            Floor 4 - Advanced Research Facilities
                          </text>
                        )}
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
                    <h3 className="font-semibold mb-2 text-sm">Lab Types</h3>
                    <div className="space-y-1">
                      {Object.entries({
                        Quantum: "#3b82f6",
                        Optics: "#8b5cf6",
                        Materials: "#f59e0b",
                        Biophysics: "#10b981",
                        Computational: "#ef4444"
                      }).map(([type, color]) => (
                        <div key={type} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs">{type}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Lab Details Panel */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Floor Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Labs</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Researchers</span>
                <span className="font-semibold">73</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Lab Space</span>
                <span className="font-semibold">12,000 sq ft</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Lab Details */}
          <AnimatePresence mode="wait">
            {selectedLab && labsData[selectedLab] && (
              <motion.div
                key={selectedLab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {labsData[selectedLab].name}
                        </CardTitle>
                        <CardDescription>
                          {labsData[selectedLab].room}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedLab(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold">
                          {labsData[selectedLab].pi}
                        </span>
                      </div>
                      <Badge variant="secondary">
                        {labsData[selectedLab].members} members
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {labsData[selectedLab].description}
                    </p>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Key Equipment</h4>
                      <div className="flex flex-wrap gap-1">
                        {labsData[selectedLab].equipment.map((item) => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <ImageIcon className="mr-1 h-3 w-3" />
                        Photos
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Video className="mr-1 h-3 w-3" />
                        Tour
                      </Button>
                    </div>

                    <Button className="w-full" size="sm">
                      View Lab Page
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedLab && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select a Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click on any lab room in the floor plan to view details, photos, and equipment information.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Lab Directory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lab Directory</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px]">
                <div className="p-4 space-y-2">
                  {Object.entries(labsData).map(([room, lab]) => (
                    <button
                      key={room}
                      onClick={() => setSelectedLab(room)}
                      className="w-full text-left p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{lab.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Room {room}
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