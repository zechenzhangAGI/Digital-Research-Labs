"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  labId?: string;
  labName?: string;
  pi?: string;
  category: "lab_tour" | "explainer" | "facility";
  badge?: string;
}

const allVideos: Video[] = [
  {
    id: "cohen",
    youtubeId: "LerqVgB9Co8",
    title: "Cohen Lab Tour",
    description: "Explore biophysics and neurophotonics research. The Cohen Lab develops and applies new tools to study biology, pushing the limits of physics and chemistry.",
    labId: "cohen",
    labName: "Cohen Lab",
    pi: "Adam Cohen",
    category: "lab_tour",
    badge: "Lab Tour"
  },
  {
    id: "manoharan",
    youtubeId: "6Qp8xEMrQ-M",
    title: "Manoharan Lab Tour",
    description: "Discover soft matter and self-assembly research. Learn how complex systems like nanoparticles and proteins spontaneously organize themselves.",
    labId: "manoharan",
    labName: "Manoharan Group",
    pi: "Vinothan Manoharan",
    category: "lab_tour",
    badge: "Lab Tour"
  },
  {
    id: "manoharan-holographic-microscopy",
    youtubeId: "9QvnYQJ_ICs",
    title: "“Scanning for Viruses”: Holographic Microscopy",
    description: "Illustrated technique explainer from Physics 95: how holographic microscopy uses interference fringes and phase shifts to reconstruct 3D information.",
    labId: "manoharan",
    labName: "Manoharan Group",
    pi: "Vinothan Manoharan",
    category: "explainer",
    badge: "Technique Explainer"
  },
  {
    id: "mundy-overview",
    youtubeId: "pvB5-xdQKG4",
    title: "Mundy Lab Overview",
    description: "Quick introduction to quantum materials research in the Mundy Group - a short teaser showcasing what we do.",
    labId: "mundy",
    labName: "Mundy Group",
    pi: "Julia Mundy",
    category: "lab_tour",
    badge: "Lab Tour"
  },
  {
    id: "mundy-tour",
    youtubeId: "coKMeww2lSk",
    title: "Mundy Lab Tour",
    description: "Full tour of the MBE systems and oxide thin film research. See how we design, synthesize, and probe emergent phenomena in complex oxide thin films.",
    labId: "mundy",
    labName: "Mundy Group",
    pi: "Julia Mundy",
    category: "lab_tour",
    badge: "Lab Tour"
  },
  {
    id: "cns",
    youtubeId: "G5iNrFMhW8U",
    title: "Center for Nanoscale Systems (CNS)",
    description: "Explore the Center for Nanoscale Systems at Harvard University. CNS provides state-of-the-art facilities for nanoscale science and engineering, supporting researchers across multiple disciplines.",
    category: "facility",
    badge: "Facility"
  }
];

function VideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const badgeText = video.badge ?? "Video";
  const badgeClass =
    video.category === "lab_tour"
      ? "bg-blue-500/90 hover:bg-blue-500/90"
      : video.category === "explainer"
        ? "bg-amber-500/90 hover:bg-amber-500/90"
        : "bg-purple-500/90 hover:bg-purple-500/90";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group cursor-pointer h-full" onClick={onPlay}>
        <div className="relative aspect-video bg-muted overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to medium quality if maxres doesn't exist
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
            </div>
          </div>
          <Badge 
            className={`absolute top-3 left-3 ${badgeClass}`}
          >
            {badgeText}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          {video.pi && (
            <p className="text-sm text-muted-foreground mb-2">
              Prof. {video.pi}
            </p>
          )}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {video.description}
          </p>
          {video.labId && (
            <Link
              href={`/labs/${video.labId}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
            >
              View Lab Details
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="mt-4 text-white">
          <h2 className="text-xl font-semibold">{video.title}</h2>
          {video.pi && <p className="text-white/70">Prof. {video.pi}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<"all" | "lab_tour" | "explainer" | "facility">("all");

  const filteredVideos = allVideos.filter(
    (v) => filter === "all" || v.category === filter
  );

  const tourVideos = allVideos.filter((v) => v.category === "lab_tour");
  const explainerVideos = allVideos.filter((v) => v.category === "explainer");
  const facilityVideos = allVideos.filter((v) => v.category === "facility");

  return (
    <div>
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold mb-2">Lab Videos</h1>
          <p className="text-muted-foreground">
            Watch tours of Harvard Physics research labs and facilities
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Videos ({allVideos.length})
            </Button>
            <Button
              variant={filter === "lab_tour" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("lab_tour")}
            >
              Lab Tours ({tourVideos.length})
            </Button>
            <Button
              variant={filter === "explainer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("explainer")}
            >
              Explainers ({explainerVideos.length})
            </Button>
            <Button
              variant={filter === "facility" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("facility")}
            >
              Facilities ({facilityVideos.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

