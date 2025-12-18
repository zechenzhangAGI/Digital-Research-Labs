"use client";

import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Polygon, InfoWindow } from "@react-google-maps/api";
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
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Harvard Physics Buildings and their labs with coordinates and building footprints
const buildingsData: Record<string, any> = {
  "jefferson": {
    name: "Jefferson Laboratory",
    address: "17 Oxford Street",
    built: "1884",
    description: "First university building in America dedicated to physics research.",
    color: "#3b82f6",
    center: { lat: 42.37485, lng: -71.11705 },
    // Approximate building footprint (polygon coordinates)
    coordinates: [
      { lat: 42.37495, lng: -71.11720 },
      { lat: 42.37495, lng: -71.11690 },
      { lat: 42.37475, lng: -71.11690 },
      { lat: 42.37475, lng: -71.11720 },
    ],
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
    center: { lat: 42.37515, lng: -71.11680 },
    coordinates: [
      { lat: 42.37525, lng: -71.11695 },
      { lat: 42.37525, lng: -71.11665 },
      { lat: 42.37505, lng: -71.11665 },
      { lat: 42.37505, lng: -71.11695 },
    ],
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
    center: { lat: 42.37548, lng: -71.11650 },
    coordinates: [
      { lat: 42.37558, lng: -71.11665 },
      { lat: 42.37558, lng: -71.11635 },
      { lat: 42.37538, lng: -71.11635 },
      { lat: 42.37538, lng: -71.11665 },
    ],
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
    center: { lat: 42.37575, lng: -71.11630 },
    coordinates: [
      { lat: 42.37585, lng: -71.11645 },
      { lat: 42.37585, lng: -71.11615 },
      { lat: 42.37565, lng: -71.11615 },
      { lat: 42.37565, lng: -71.11645 },
    ],
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
    center: { lat: 42.37645, lng: -71.11580 },
    coordinates: [
      { lat: 42.37655, lng: -71.11595 },
      { lat: 42.37655, lng: -71.11565 },
      { lat: 42.37635, lng: -71.11565 },
      { lat: 42.37635, lng: -71.11595 },
    ],
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
    center: { lat: 42.37465, lng: -71.11720 },
    coordinates: [
      { lat: 42.37475, lng: -71.11735 },
      { lat: 42.37475, lng: -71.11705 },
      { lat: 42.37455, lng: -71.11705 },
      { lat: 42.37455, lng: -71.11735 },
    ],
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

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

// Harvard University center coordinates
const center = {
  lat: 42.3755,
  lng: -71.1167
};

// Map options
const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
  mapTypeId: 'satellite',
  tilt: 0,
};

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

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading map...</p>
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
            Explore physics buildings and lab locations at Harvard
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Map Area */}
          <Card className="relative overflow-hidden">
            <CardHeader className="py-3 px-4 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">North Yard</CardTitle>
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
            <div className="relative" style={{ height: "600px" }}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={18}
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
                      fillColor: hoveredBuilding === buildingId ? "#fbbf24" : building.color,
                      fillOpacity: 0.7,
                      strokeColor: building.color,
                      strokeOpacity: 1,
                      strokeWeight: 3,
                      clickable: true,
                      zIndex: hoveredBuilding === buildingId ? 1000 : 1,
                    }}
                    onClick={() => handleBuildingClick(buildingId)}
                    onMouseOver={() => setHoveredBuilding(buildingId)}
                    onMouseOut={() => setHoveredBuilding(null)}
                  />
                ))}
              </GoogleMap>

              {/* Legend */}
              <AnimatePresence>
                {showLegend && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute bottom-4 left-4 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg z-10"
                  >
                    <h3 className="font-semibold mb-2 text-sm">Physics Buildings</h3>
                    <div className="space-y-1">
                      {Object.entries(buildingsData).map(([buildingId, building]) => (
                        <button
                          key={buildingId}
                          onClick={() => handleBuildingClick(buildingId)}
                          className="flex items-center gap-2 w-full hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded transition-colors"
                        >
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: building.color }}
                          />
                          <span className="text-xs">{building.name}</span>
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
              <p className="text-xl font-semibold">6</p>
              <p className="text-xs text-muted-foreground">Buildings</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xl font-semibold">6</p>
              <p className="text-xs text-muted-foreground">Labs</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xl font-semibold">95</p>
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
                      <h4 className="text-sm font-medium mb-3">
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
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-medium">Select a Building</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click on any highlighted building to view its research labs and details.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Building Directory */}
          <Card>
            <CardHeader className="py-3 px-4 border-b">
              <CardTitle className="text-sm font-medium">Buildings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[280px]">
                <div className="p-2">
                  {Object.entries(buildingsData).map(([buildingId, building]: [string, any]) => (
                    <button
                      key={buildingId}
                      onClick={() => handleBuildingClick(buildingId)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: building.color }}
                        />
                        <div>
                          <p className="text-sm font-medium">{building.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {building.labs.length} lab{building.labs.length !== 1 ? 's' : ''}
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