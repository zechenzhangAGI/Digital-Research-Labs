"use client";

import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Polygon, OverlayView } from "@react-google-maps/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  MapPin,
  X,
  ChevronRight,
  Loader2,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Harvard Physics Buildings with coordinates
const buildingsData: Record<string, {
  name: string;
  address: string;
  built: string;
  description: string;
  color: string;
  center: { lat: number; lng: number };
  coordinates: { lat: number; lng: number }[];
  labs: {
    id: string;
    name: string;
    pi: string;
    room: string;
    category: string;
    members: number;
    description: string;
    image: string;
  }[];
}> = {
  "jefferson": {
    name: "Jefferson Laboratory",
    address: "17 Oxford Street",
    built: "1884",
    description: "First university building in America dedicated to physics research. Home to the Physics Department offices and multiple research labs.",
    color: "#3b82f6",
    // Jefferson Lab is at 17 Oxford St, north of Science Center
    center: { lat: 42.377283, lng: -71.117561 },
    coordinates: [
      { lat: 42.377093, lng: -71.117896 },
      { lat: 42.377277, lng: -71.117960 },
      { lat: 42.377441, lng: -71.117210 },
      { lat: 42.377253, lng: -71.117142 },
    ],
    labs: [
      {
        id: "mitrano",
        name: "Mitrano Group",
        pi: "Matteo Mitrano",
        room: "Jefferson 164",
        category: "Solid State",
        members: 20,
        description: "Ultrafast spectroscopy of quantum materials.",
        image: "/lab_images/mitrano-lattice.png"
      },
      {
        id: "jafferis",
        name: "Jafferis Group",
        pi: "Daniel Jafferis",
        room: "Jefferson 371",
        category: "Quantum Gravity",
        members: 8,
        description: "String theory and quantum gravity research.",
        image: "/lab_images/jafferis-mogging.webp"
      },
      {
        id: "yin",
        name: "Yin Group",
        pi: "Xi Yin",
        room: "Jefferson 570",
        category: "High Energy Theory",
        members: 4,
        description: "Quantum field theory and mathematical physics.",
        image: "/lab_images/yin-wizards.jpg"
      }
    ]
  },
  "lyman": {
    name: "Lyman Laboratory",
    address: "17 Oxford Street",
    built: "1931",
    description: "Named after physicist Theodore Lyman, connected to Jefferson Lab. Houses particle physics and astrophysics groups.",
    color: "#8b5cf6",
    // Lyman is connected to Jefferson, slightly to the east
    center: { lat: 42.377336, lng: -71.117296 },
    coordinates: [
      { lat: 42.377201, lng: -71.117381 },
      { lat: 42.377392, lng: -71.117446 },
      { lat: 42.377441, lng: -71.117210 },
      { lat: 42.377253, lng: -71.117142 },
    ],
    labs: [
      {
        id: "franklin",
        name: "Franklin Lab",
        pi: "Melissa Franklin",
        room: "Lyman 237",
        category: "Particle Physics",
        members: 12,
        description: "ATLAS experiment at CERN, searching for new particles.",
        image: "/lab_images/franklin-atlas.jpg"
      },
      {
        id: "huth",
        name: "Huth Lab",
        pi: "John Huth",
        room: "Lyman 236",
        category: "Particle Physics",
        members: 8,
        description: "Higgs boson physics and ATLAS detector development.",
        image: "/lab_images/huth-atlas.jpg"
      },
      {
        id: "morii",
        name: "Morii Lab",
        pi: "Masahiro Morii",
        room: "Lyman 230",
        category: "Particle Physics",
        members: 10,
        description: "ATLAS silicon tracker upgrades and dark matter searches.",
        image: "/lab_images/morii-atlas.jpg"
      },
      {
        id: "stubbs",
        name: "Stubbs Lab",
        pi: "Christopher Stubbs",
        room: "Lyman 335",
        category: "Astrophysics",
        members: 8,
        description: "Dark energy measurements with Rubin Observatory.",
        image: "/lab_images/stubbs-telescope.png"
      },
      {
        id: "ro",
        name: "Ro Lab",
        pi: "Sunghan Ro",
        room: "Lyman 322",
        category: "Statistical Physics",
        members: 5,
        description: "Active matter and non-equilibrium statistical mechanics.",
        image: "/lab_images/ro-graph.png"
      },
      {
        id: "sachdev",
        name: "Sachdev Lab",
        pi: "Subir Sachdev",
        room: "Lyman 343",
        category: "Condensed Matter Theory",
        members: 12,
        description: "Quantum entanglement and high-temperature superconductivity.",
        image: "/lab_images/sachdev-hole.jpg"
      }
    ]
  },
  "mallinckrodt": {
    name: "Mallinckrodt Laboratory",
    address: "12 Oxford Street",
    built: "1928",
    description: "Chemistry and chemical physics research facility, shared between Physics and Chemistry departments.",
    color: "#f59e0b",
    center: { lat: 42.377452, lng: -71.114929 },
    coordinates: [
      { lat: 42.376798, lng: -71.115785 },
      { lat: 42.377710, lng: -71.116055 },
      { lat: 42.377984, lng: -71.114360 },
      { lat: 42.377202, lng: -71.114143 },
    ],
    labs: [
      {
        id: "cohen",
        name: "Cohen Lab",
        pi: "Adam Cohen",
        room: "Mallinckrodt 115",
        category: "Biophysics",
        members: 18,
        description: "Optical techniques for visualizing voltage dynamics in neurons.",
        image: "/lab_images/cohen-magazine.jpg"
      },
      {
        id: "heller",
        name: "Heller Lab",
        pi: "Eric Heller",
        room: "Mallinckrodt M-107",
        category: "Quantum Physics",
        members: 10,
        description: "Time-dependent wave mechanics and quantum chaos.",
        image: "/lab_images/heller-flow.jpg"
      }
    ]
  },
  "mckay": {
    name: "McKay Laboratory",
    address: "9 Oxford Street",
    built: "2006",
    description: "Gordon McKay Laboratory of Applied Science for engineering and applied physics research.",
    color: "#10b981",
    // McKay/SEAS is on Oxford St
    center: { lat: 42.37755, lng: -71.11666 },
    coordinates: [
      { lat: 42.377589, lng: -71.116834 },
      { lat: 42.37764, lng: -71.11653 },
      { lat: 42.37745, lng: -71.11646 },
      { lat: 42.37737, lng: -71.11675 },
    ],
    labs: [
      {
        id: "manoharan",
        name: "Manoharan Group",
        pi: "Vinothan Manoharan",
        room: "McKay 530",
        category: "Biophysics",
        members: 15,
        description: "Virus self-assembly and colloidal physics.",
        image: "/lab_images/manoharan-virus.png"
      },
      {
        id: "weitz",
        name: "Weitz Lab",
        pi: "David Weitz",
        room: "McKay 5th Floor",
        category: "Soft Matter",
        members: 25,
        description: "Soft condensed matter and microfluidics.",
        image: "/lab_images/weitz-bubbles.jpg"
      }
    ]
  },
  "oxford": {
    name: "60 Oxford Street",
    address: "60 Oxford Street",
    built: "1963",
    description: "Home to mathematics and theoretical physics groups.",
    color: "#ef4444",
    // 60 Oxford is north on Oxford St
    center: { lat: 42.38040, lng: -71.11605 },
    coordinates: [
      { lat: 42.38057, lng: -71.11623 },
      { lat: 42.38054, lng: -71.11583 },
      { lat: 42.38017, lng: -71.11587 },
      { lat: 42.38021, lng: -71.11629 },
    ],
    labs: [
      {
        id: "cotler",
        name: "Cotler Group",
        pi: "Jordan Cotler",
        room: "60 Oxford St. 412",
        category: "Quantum Computing",
        members: 14,
        description: "Quantum gravity, quantum information, and black hole physics.",
        image: "/lab_images/cotler-blackboard.jpg"
      }
    ]
  },
  "lise": {
    name: "LISE Building",
    address: "29 Oxford Street",
    built: "2007",
    description: "Laboratory for Integrated Science and Engineering with state-of-the-art nanoscale research facilities.",
    color: "#ec4899",
    // LISE is at 29 Oxford
    center: { lat: 42.37721, lng: -71.11636 },
    coordinates: [
      { lat: 42.37690, lng: -71.11639 },
      { lat: 42.37743, lng: -71.11657 },
      { lat: 42.37747, lng: -71.11634 },
      { lat: 42.37694, lng: -71.11614 },
    ],
    labs: [
      {
        id: "mundy",
        name: "Mundy Group",
        pi: "Julia Mundy",
        room: "LISE 709",
        category: "Solid State",
        members: 16,
        description: "Molecular beam epitaxy and oxide thin films.",
        image: "/lab_images/mundy-mbe.png"
      },
      {
        id: "kim",
        name: "Kim Lab",
        pi: "Philip Kim",
        room: "LISE 4th Floor",
        category: "Condensed Matter",
        members: 20,
        description: "Low-dimensional nanoscale materials and quantum devices.",
        image: "/lab_images/kim-circuit.png"
      }
    ]
  },
  "pierce": {
    name: "Pierce Hall",
    address: "29 Oxford Street",
    built: "1901",
    description: "Engineering building housing applied physics and photonics labs.",
    color: "#06b6d4",
    center: { lat: 42.37827, lng: -71.11715 },
    coordinates: [
      { lat: 42.37791, lng: -71.11723 },
      { lat: 42.37851, lng: -71.11745 },
      { lat: 42.37860, lng: -71.11704 },
      { lat: 42.37799, lng: -71.11681 },
    ],
    labs: [
      {
        id: "mazur",
        name: "Mazur Lab",
        pi: "Eric Mazur",
        room: "Pierce 233",
        category: "Optics",
        members: 20,
        description: "Ultrafast optics and nanophotonics.",
        image: "/lab_images/mazur-screwdrivers.png"
      }
    ]
  },
  "northwest": {
    name: "Northwest Building",
    address: "52 Oxford Street",
    built: "2008",
    description: "Modern research building housing biology and biophysics groups.",
    color: "#84cc16",
    center: { lat: 42.37959, lng: -71.11569 },
    coordinates: [
      { lat: 42.37943, lng: -71.11599 },
      { lat: 42.37974, lng: -71.11595 },
      { lat: 42.37971, lng: -71.11542 },
      { lat: 42.37939, lng: -71.11543 },
    ],
    labs: [
      {
        id: "desai",
        name: "Desai Lab",
        pi: "Michael Desai",
        room: "Northwest 457.20",
        category: "Biophysics",
        members: 15,
        description: "Evolutionary dynamics and population genetics.",
        image: "/lab_images/desai-bubbles.png"
      },
      {
        id: "samuel",
        name: "Samuel Lab",
        pi: "Aravi Samuel",
        room: "Northwest 258",
        category: "Biophysics",
        members: 12,
        description: "Neural circuits and organism behavior.",
        image: "/lab_images/samuel-brain-science.jpg"
      }
    ]
  }
};

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

// Harvard Science Center area - centered view of physics buildings
const center = {
  lat: 42.3775,
  lng: -71.1163
};

// Map options for satellite view with labels
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
  mapTypeId: 'satellite',
  tilt: 0,
};

// Custom label component for building names
function BuildingLabel({ building, position, onClick, isSelected }: { 
  building: typeof buildingsData[string]; 
  position: google.maps.LatLngLiteral;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <button
        onClick={onClick}
        className={`
          transform -translate-x-1/2 -translate-y-full
          px-2 py-1 rounded-md text-xs font-semibold
          shadow-lg cursor-pointer transition-all
          whitespace-nowrap
          ${isSelected 
            ? 'bg-white text-gray-900 scale-110 ring-2 ring-offset-1' 
            : 'bg-gray-900/90 text-white hover:bg-gray-800 hover:scale-105'
          }
        `}
        style={{ 
          borderColor: building.color,
          boxShadow: isSelected ? `0 0 10px ${building.color}` : undefined
        }}
      >
        <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: building.color }} />
        {building.name}
      </button>
    </OverlayView>
  );
}

export default function MapPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleBuildingClick = (buildingId: string) => {
    setSelectedBuilding(buildingId);
    if (map && buildingsData[buildingId]) {
      map.panTo(buildingsData[buildingId].center);
      map.setZoom(19);
    }
  };

  // Calculate total stats
  const totalLabs = Object.values(buildingsData).reduce((sum, b) => sum + b.labs.length, 0);
  const totalResearchers = Object.values(buildingsData).reduce(
    (sum, b) => sum + b.labs.reduce((labSum, lab) => labSum + lab.members, 0), 
    0
  );

  if (loadError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-red-500 mb-4">Error loading Google Maps</p>
            <p className="text-sm text-muted-foreground">
              Please check your Google Maps API key configuration.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold mb-2">Campus Map</h1>
          <p className="text-muted-foreground">
            Explore physics buildings and find lab locations across Harvard's Science Center area
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
              {/* Map Area */}
              <Card className="relative overflow-hidden">
                <CardHeader className="py-3 px-4 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Science Center Area</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowLegend(!showLegend)}
                      className="text-xs h-7"
                    >
                      {showLegend ? "Hide" : "Show"} Legend
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative" style={{ height: "500px" }}>
                    {!isLoaded ? (
                      <div className="h-full flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={17}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={mapOptions}
                      >
                        {/* Render building polygons */}
                        {Object.entries(buildingsData).map(([buildingId, building]) => (
                          <Polygon
                            key={buildingId}
                            paths={building.coordinates}
                            options={{
                              fillColor: hoveredBuilding === buildingId || selectedBuilding === buildingId 
                                ? "#fbbf24" 
                                : building.color,
                              fillOpacity: 0.6,
                              strokeColor: building.color,
                              strokeOpacity: 1,
                              strokeWeight: selectedBuilding === buildingId ? 4 : 2,
                              clickable: true,
                              zIndex: hoveredBuilding === buildingId || selectedBuilding === buildingId ? 1000 : 1,
                            }}
                            onClick={() => handleBuildingClick(buildingId)}
                            onMouseOver={() => setHoveredBuilding(buildingId)}
                            onMouseOut={() => setHoveredBuilding(null)}
                          />
                        ))}

                        {/* Building Labels */}
                        {Object.entries(buildingsData).map(([buildingId, building]) => (
                          <BuildingLabel
                            key={`label-${buildingId}`}
                            building={building}
                            position={building.center}
                            onClick={() => handleBuildingClick(buildingId)}
                            isSelected={selectedBuilding === buildingId}
                          />
                        ))}
                      </GoogleMap>
                    )}

                    {/* Legend */}
                    <AnimatePresence>
                      {showLegend && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="absolute bottom-4 left-4 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg z-10 max-w-[200px]"
                        >
                          <h3 className="font-semibold mb-2 text-sm">Physics Buildings</h3>
                          <div className="space-y-1">
                            {Object.entries(buildingsData).map(([buildingId, building]) => (
                              <button
                                key={buildingId}
                                onClick={() => handleBuildingClick(buildingId)}
                                className={`flex items-center gap-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1.5 rounded transition-colors ${
                                  selectedBuilding === buildingId ? 'bg-neutral-100 dark:bg-neutral-700' : ''
                                }`}
                              >
                                <div
                                  className="w-3 h-3 rounded-sm shrink-0"
                                  style={{ backgroundColor: building.color }}
                                />
                                <span className="text-xs truncate">{building.name}</span>
                              </button>
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
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xl font-semibold">{Object.keys(buildingsData).length}</p>
                    <p className="text-xs text-muted-foreground">Buildings</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xl font-semibold">{totalLabs}</p>
                    <p className="text-xs text-muted-foreground">Labs</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xl font-semibold">{totalResearchers}</p>
                    <p className="text-xs text-muted-foreground">Researchers</p>
                  </div>
                </div>

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
                              <div className="flex items-center gap-2 mb-1">
                                <div 
                                  className="w-3 h-3 rounded-sm" 
                                  style={{ backgroundColor: buildingsData[selectedBuilding].color }}
                                />
                                <CardTitle className="text-lg">
                                  {buildingsData[selectedBuilding].name}
                                </CardTitle>
                              </div>
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
                            <h4 className="text-sm font-medium mb-3">
                              Labs in this Building ({buildingsData[selectedBuilding].labs.length})
                            </h4>
                            <ScrollArea className="h-[280px]">
                              <div className="space-y-3 pr-4">
                                {buildingsData[selectedBuilding].labs.map((lab) => (
                                  <div
                                    key={lab.id}
                                    className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                                  >
                                    {lab.image && (
                                      <img
                                        src={lab.image}
                                        alt={lab.name}
                                        className="w-full h-20 object-cover rounded mb-2"
                                      />
                                    )}
                                    <div className="font-medium text-sm">{lab.name}</div>
                                    <div className="text-xs text-muted-foreground mb-1">
                                      PI: {lab.pi}
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-2">
                                      📍 {lab.room}
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
                                    <p className="text-xs text-muted-foreground mb-2">
                                      {lab.description}
                                    </p>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full text-xs h-7"
                                      asChild
                                    >
                                      <Link href={`/labs/${lab.id}`}>
                                        View Lab Details
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
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <p className="font-medium">Select a Building</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Click on any highlighted building or label on the map to view its research labs and details.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Building Directory */}
                <Card>
                  <CardHeader className="py-3 px-4 border-b">
                    <CardTitle className="text-sm font-medium">All Buildings</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[200px]">
                      <div className="p-2">
                        {Object.entries(buildingsData).map(([buildingId, building]) => (
                          <button
                            key={buildingId}
                            onClick={() => handleBuildingClick(buildingId)}
                            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between group ${
                              selectedBuilding === buildingId 
                                ? 'bg-primary/10' 
                                : 'hover:bg-muted'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="h-3 w-3 rounded-sm"
                                style={{ backgroundColor: building.color }}
                              />
                              <div>
                                <p className="text-sm font-medium">{building.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {building.labs.length} lab{building.labs.length !== 1 ? 's' : ''} • {building.address}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
      </div>
    </div>
  );
}
