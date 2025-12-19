"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  MapPin,
  Users,
  FlaskConical,
  GraduationCap,
  Coffee,
  BookOpen,
  X,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Room types based on the floor plan legend
type RoomType =
  | "undergrad"
  | "gradOffice"
  | "profOffice"
  | "adminOffice"
  | "lectureHall"
  | "lab"
  | "common";

interface Room {
  id: string;
  number: string;
  name: string;
  type: RoomType;
  x: number;
  y: number;
  width: number;
  height: number;
  pi?: string;
  labId?: string;
  description?: string;
  researchArea?: string;
}

interface FloorData {
  floor: number;
  name: string;
  rooms: Room[];
  buildingOutline: { x: number; y: number }[];
}

// Jefferson Lab Floor Data
// Coordinate system: x (0-100 left to right), y (0-100 top to bottom)
const floorData: FloorData[] = [
  {
    floor: 1,
    name: "First Floor",
    rooms: [
      // Bottom Left - Mitrano and Yao Labs
      { id: "163-168", number: "163-168", name: "Mitrano Lab", type: "lab", x: 1, y: 62, width: 30, height: 8, pi: "Matteo Mitrano", labId: "mitrano", researchArea: "Ultrafast Quantum Materials" },
      { id: "storage-conn", number: "←", name: "To Storage Rooms", type: "common", x: 1, y: 73, width: 9, height: 6 },
      { id: "160-162", number: "160-162", name: "Yao Lab", type: "lab", x: 1, y: 82, width: 28, height: 8, pi: "Norman Yao", researchArea: "Quantum Dynamics" },
      
      // Bottom Center - Lukin, Prentiss, Knirck Labs
      { id: "158", number: "158", name: "Lukin Lab", type: "lab", x: 34, y: 60, width: 18, height: 8, pi: "Mikhail Lukin", researchArea: "Quantum Optics" },
      { id: "146", number: "146", name: "Prentiss Lab", type: "lab", x: 53, y: 60, width: 10, height: 8, pi: "Mara Prentiss", researchArea: "Biophysics" },
      { id: "156", number: "156", name: "Knirck Lab", type: "lab", x: 34, y: 78, width: 20, height: 12, pi: "Stefan Knirck", labId: "knirck", researchArea: "Dark Matter Detection" },
      { id: "150a", number: "150a", name: "Prentiss Lab", type: "lab", x: 55, y: 78, width: 8, height: 12, pi: "Mara Prentiss", researchArea: "Biophysics" },
      
      // Bottom Right - Greiner Lab 137
      { id: "137", number: "137", name: "Greiner Lab", type: "lab", x: 64, y: 78, width: 24, height: 12, pi: "Markus Greiner", researchArea: "Quantum Gas Microscopy" },
      
      // Right Wing - Vertical column (top to bottom)
      { id: "122", number: "122", name: "Silvera Lab", type: "lab", x: 80, y: 2, width: 13, height: 9, pi: "Isaac Silvera", researchArea: "High Pressure Physics" },
      { id: "hau-conn", number: "→", name: "To Hau Lab", type: "common", x: 84, y: 12, width: 9, height: 6 },
      
      { id: "123", number: "123", name: "Doyle Lab", type: "lab", x: 63, y: 2, width: 8, height: 22, pi: "John Doyle", researchArea: "Cold Molecules" },
      { id: "127", number: "127", name: "Silvera Lab", type: "lab", x: 80, y: 22, width: 8, height: 9, pi: "Isaac Silvera", researchArea: "High Pressure Physics" },
      
      { id: "128", number: "128", name: "Greiner Lab", type: "lab", x: 63, y: 25, width: 8, height: 15, pi: "Markus Greiner", researchArea: "Quantum Gas Microscopy" },
      { id: "130", number: "130", name: "Silvera Lab", type: "lab", x: 80, y: 32, width: 8, height: 11, pi: "Isaac Silvera", researchArea: "High Pressure Physics" },
      
      { id: "131", number: "131", name: "Greiner Lab", type: "lab", x: 63, y: 41, width: 8, height: 15, pi: "Markus Greiner", researchArea: "Quantum Gas Microscopy" },
      { id: "132", number: "132", name: "Silvera Lab", type: "lab", x: 80, y: 44, width: 8, height: 33, pi: "Isaac Silvera", researchArea: "High Pressure Physics" },
    ],
    buildingOutline: [
      { x: 1, y: 62 },
      { x: 1, y: 90 },
      { x: 88, y: 90 },
      { x: 88, y: 20 },
      { x: 93, y: 20 },
      { x: 93, y: 2 },
      { x: 63, y: 2 },
      { x: 63, y: 60 },
      { x: 34, y: 60 },
      { x: 34, y: 62 },
    ],
  },
  {
    floor: 2,
    name: "Second Floor",
    rooms: [
      // Bottom Left - Theory connection, Morin, Jefferson 256
      { id: "258", number: "258", name: "Morin", type: "profOffice", x: 6, y: 78, width: 8, height: 12, pi: "David Morin" },
      { id: "256", number: "256", name: "Jefferson 256", type: "lectureHall", x: 15, y: 78, width: 12, height: 8 },
      { id: "theory-conn", number: "←", name: "To Theory Groups", type: "common", x: 6, y: 70, width: 9, height: 6 },
      
      // Bottom Center - Jefferson 250 (large)
      { id: "250", number: "250", name: "Jefferson 250", type: "lectureHall", x: 34, y: 76, width: 19, height: 14, description: "Main Physics Lecture Hall" },
      
      // Bottom Center-Right - Undergrad Study, Klales, Franklin
      { id: "251", number: "251", name: "Physics Undergrad Study", type: "undergrad", x: 54, y: 76, width: 8, height: 14, description: "Study space for physics concentrators" },
      { id: "238", number: "238", name: "Klales", type: "profOffice", x: 63, y: 76, width: 8, height: 14 },
      { id: "237", number: "237", name: "Franklin", type: "profOffice", x: 80, y: 76, width: 8, height: 14, pi: "Melissa Franklin", labId: "franklin", researchArea: "Particle Physics" },
      
      // Middle Row - Faculty Offices (257a to 241) and 236
      { id: "257a", number: "257a", name: "", type: "adminOffice", x: 15, y: 62, width: 4, height: 6 },
      { id: "257", number: "257", name: "", type: "adminOffice", x: 19, y: 62, width: 4, height: 6 },
      { id: "255", number: "255", name: "", type: "adminOffice", x: 23, y: 62, width: 4, height: 6 },
      { id: "kitchen2", number: "254", name: "Kitchen", type: "adminOffice", x: 27, y: 62, width: 4, height: 6 },
      { id: "247", number: "247", name: "", type: "adminOffice", x: 34, y: 60, width: 4, height: 6 },
      { id: "246", number: "246", name: "", type: "adminOffice", x: 38, y: 60, width: 4, height: 6 },
      { id: "245", number: "245", name: "", type: "adminOffice", x: 42, y: 60, width: 4, height: 6 },
      { id: "244", number: "244", name: "", type: "adminOffice", x: 46, y: 60, width: 4, height: 6 },
      { id: "243", number: "243", name: "", type: "adminOffice", x: 50, y: 60, width: 4, height: 6 },
      { id: "242", number: "242", name: "", type: "adminOffice", x: 54, y: 60, width: 4, height: 6 },
      { id: "241", number: "241", name: "", type: "adminOffice", x: 58, y: 60, width: 4, height: 6 },
      { id: "236", number: "236", name: "", type: "adminOffice", x: 83, y: 60, width: 5, height: 15 },
      
      // Right Wing - Top section (Silvera, Prentiss, Grad 220)
      { id: "224", number: "224", name: "Silvera", type: "profOffice", x: 63, y: 2, width: 8, height: 12, pi: "Isaac Silvera" },
      { id: "222", number: "222", name: "Prentiss", type: "profOffice", x: 72, y: 2, width: 10, height: 8, pi: "Mara Prentiss" },
      { id: "220", number: "220", name: "Graduate", type: "gradOffice", x: 83, y: 2, width: 10, height: 8 },
      { id: "cruft-conn2", number: "→", name: "To Cruft", type: "common", x: 84, y: 12, width: 9, height: 6 },
      
      // Right Wing - Middle offices
      { id: "225", number: "225", name: "Greiner", type: "profOffice", x: 63, y: 15, width: 8, height: 8, pi: "Markus Greiner" },
      { id: "227", number: "227", name: "Graduate", type: "gradOffice", x: 80, y: 20, width: 8, height: 8 },
      
      { id: "228", number: "228", name: "Graduate", type: "gradOffice", x: 63, y: 24, width: 8, height: 8 },
      { id: "229", number: "229", name: "Hau", type: "profOffice", x: 80, y: 33, width: 8, height: 8, pi: "Lene Hau" },
      
      { id: "232", number: "232", name: "Manoharan", type: "profOffice", x: 63, y: 37, width: 8, height: 8, pi: "Vinothan Manoharan", labId: "manoharan" },
      { id: "231", number: "231", name: "Knirck", type: "profOffice", x: 80, y: 42, width: 8, height: 8, pi: "Stefan Knirck", labId: "knirck" },
      
      { id: "234", number: "234", name: "Deslauriers", type: "profOffice", x: 63, y: 46, width: 8, height: 8 },
      { id: "235", number: "235", name: "Huth", type: "profOffice", x: 80, y: 51, width: 8, height: 8, pi: "John Huth", labId: "huth" },
    ],
    buildingOutline: [
      { x: 1, y: 62 },
      { x: 1, y: 90 },
      { x: 14.5, y: 90 },
      { x: 14.5, y: 86 },
      { x: 27.5, y: 86 },
      { x: 27.5, y: 90 },
      { x: 88, y: 90 },
      { x: 88, y: 20 },
      { x: 93, y: 20 },
      { x: 93, y: 2 },
      { x: 63, y: 2 },
      { x: 63, y: 60 },
      { x: 34, y: 60 },
      { x: 34, y: 62 },
    ],
  },
  {
    floor: 3,
    name: "Third Floor",
    rooms: [
      // Bottom Left - Theory connection, J356
      { id: "356", number: "356", name: "J356", type: "lectureHall", x: 15, y: 78, width: 12, height: 8 },
      { id: "theory-conn2", number: "←", name: "To Theory Groups", type: "common", x: 11, y: 70, width: 9, height: 6 },
      
      // Bottom Center - Jefferson 250 (double height continues)
      { id: "250-3", number: "250", name: "Jefferson 250", type: "lectureHall", x: 34, y: 76, width: 28, height: 14, description: "Main Physics Lecture Hall (Upper Level)" },
      
      // Bottom Right - Graduate 344, Sachdev 343, Mitrano, Kaxiras 339
      { id: "344", number: "344", name: "Graduate", type: "gradOffice", x: 63, y: 76, width: 5, height: 10 },
      { id: "343", number: "343", name: "Sachdev", type: "profOffice", x: 69, y: 76, width: 6, height: 10, pi: "Subir Sachdev", labId: "sachdev", researchArea: "Condensed Matter Theory" },
      { id: "mitrano-off", number: "", name: "Mitrano", type: "profOffice", x: 76, y: 78, width: 5, height: 8, pi: "Matteo Mitrano", labId: "mitrano" },
      { id: "339", number: "339", name: "Kaxiras", type: "profOffice", x: 82, y: 76, width: 6, height: 10, pi: "Efthimios Kaxiras" },
      
      // Middle Row - Grad offices 358-353, then 352, 351, Barandes 349, 348
      { id: "358", number: "358", name: "Graduate", type: "gradOffice", x: 11, y: 62, width: 4, height: 6 },
      { id: "357", number: "357", name: "Graduate", type: "gradOffice", x: 15, y: 62, width: 4, height: 6 },
      { id: "355", number: "355", name: "Graduate", type: "gradOffice", x: 19, y: 62, width: 4, height: 6 },
      { id: "354", number: "354", name: "Graduate", type: "gradOffice", x: 23, y: 62, width: 4, height: 6 },
      { id: "353", number: "353", name: "Graduate", type: "gradOffice", x: 27, y: 62, width: 4, height: 6 },
      { id: "352", number: "352", name: "", type: "adminOffice", x: 36, y: 60, width: 6, height: 6 },
      { id: "351", number: "351", name: "", type: "adminOffice", x: 42, y: 60, width: 6, height: 6 },
      { id: "349", number: "349", name: "Barandes", type: "profOffice", x: 48, y: 60, width: 8, height: 6 },
      { id: "348", number: "348", name: "", type: "adminOffice", x: 56, y: 60, width: 6, height: 6 },
      
      // Right Wing - Top row (324, Lukin 323, Ro 322)
      { id: "324", number: "324", name: "", type: "adminOffice", x: 63, y: 2, width: 8, height: 13 },
      { id: "323", number: "323", name: "Lukin", type: "profOffice", x: 72, y: 2, width: 10, height: 8, pi: "Mikhail Lukin" },
      { id: "322", number: "322", name: "Ro", type: "profOffice", x: 83, y: 2, width: 10, height: 8, pi: "Sunghan Ro", labId: "ro", researchArea: "Statistical Physics" },
      { id: "cruft-lise-conn", number: "→", name: "To Cruft & LISE", type: "common", x: 84, y: 11.5, width: 9, height: 6 },
      
      // Right Wing - Offices going down
      { id: "326", number: "326", name: "Doyle", type: "profOffice", x: 63, y: 16, width: 8, height: 6, pi: "John Doyle" },
      { id: "328", number: "328", name: "Khalaf", type: "profOffice", x: 80, y: 20, width: 8, height: 8, pi: "Eslam Khalaf", labId: "khalaf", researchArea: "Condensed Matter Theory" },
      
      { id: "330", number: "330", name: "Lyman 330", type: "lectureHall", x: 63, y: 23, width: 8, height: 14 },
      { id: "331", number: "331", name: "Vishwanath", type: "profOffice", x: 80, y: 30, width: 8, height: 6, pi: "Ashvin Vishwanath" },
      
      { id: "332", number: "332", name: "Hoffman", type: "profOffice", x: 63, y: 40, width: 8, height: 8, pi: "Jenny Hoffman" },
      { id: "334", number: "334", name: "Dvorkin", type: "profOffice", x: 80, y: 37, width: 8, height: 6, pi: "Cora Dvorkin" },
      
      { id: "333", number: "333", name: "Samuel", type: "profOffice", x: 63, y: 49, width: 8, height: 8, pi: "Aravi Samuel", labId: "samuel", researchArea: "Neurophysics" },
      { id: "335", number: "335", name: "Stubbs", type: "profOffice", x: 80, y: 44, width: 8, height: 6, pi: "Christopher Stubbs", labId: "stubbs", researchArea: "Astrophysics" },
      
      { id: "336", number: "336", name: "Graduate", type: "gradOffice", x: 80, y: 51, width: 8, height: 6 },
      { id: "337", number: "337", name: "Graduate", type: "gradOffice", x: 80, y: 58, width: 8, height: 8 },
      { id: "338", number: "338", name: "Jaffe", type: "profOffice", x: 80, y: 67, width: 8, height: 8, pi: "Robert Jaffe" },
    ],
    buildingOutline: [
      { x: 1, y: 62 },
      { x: 1, y: 90 },
      { x: 14.5, y: 90 },
      { x: 14.5, y: 86 },
      { x: 27.5, y: 86 },
      { x: 27.5, y: 90 },
      { x: 62.5, y: 90 },
      { x: 62.5, y: 86 },
      { x: 88, y: 86 },
      { x: 88, y: 20 },
      { x: 93, y: 20 },
      { x: 93, y: 2 },
      { x: 63, y: 2 },
      { x: 63, y: 60 },
      { x: 34, y: 60 },
      { x: 34, y: 62 },
    ],
  },
  {
    floor: 4,
    name: "Fourth Floor",
    rooms: [
      // Bottom Left - Theory connection, Grad 459, Schwartz 455, Jefferson 453
      { id: "459", number: "459", name: "Graduate", type: "gradOffice", x: 1, y: 78, width: 4, height: 12 },
      { id: "455", number: "455", name: "Schwartz", type: "profOffice", x: 6, y: 78, width: 8, height: 12, pi: "Matthew Schwartz" },
      { id: "453", number: "453", name: "Jefferson 453", type: "lectureHall", x: 15, y: 78, width: 12, height: 8 },
      { id: "theory-conn3", number: "←", name: "To Theory Groups", type: "common", x: 1, y: 70, width: 9, height: 6 },
      
      // Bottom Center - Physics Library (large)
      { id: "450", number: "450", name: "Physics Library", type: "undergrad", x: 34, y: 60, width: 28, height: 30, description: "Physics Department Library" },
      
      // Bottom Right - Halperin 447, Grad 446, Grad 445
      { id: "447", number: "447", name: "Halperin", type: "profOffice", x: 65, y: 78, width: 9, height: 10, pi: "Bertrand Halperin" },
      { id: "446", number: "446", name: "Graduate", type: "gradOffice", x: 75, y: 78, width: 6, height: 10 },
      { id: "445", number: "445", name: "Graduate", type: "gradOffice", x: 82, y: 78, width: 6, height: 10 },
      
      // Middle Row - Faculty Offices 458, 456, 454, 452, Reece 451
      { id: "458", number: "458", name: "", type: "adminOffice", x: 11, y: 62, width: 4, height: 6 },
      { id: "456", number: "456", name: "", type: "adminOffice", x: 15, y: 62, width: 4, height: 6 },
      { id: "454", number: "454", name: "", type: "adminOffice", x: 19, y: 62, width: 4, height: 6 },
      { id: "452", number: "452", name: "", type: "adminOffice", x: 23, y: 62, width: 4, height: 6 },
      { id: "451", number: "451", name: "Reece", type: "profOffice", x: 27, y: 62, width: 6, height: 8, pi: "Matthew Reece" },
      
      // Right Wing - Top row (Grad 419, 415, 414)
      { id: "419", number: "419", name: "Graduate", type: "gradOffice", x: 63, y: 2, width: 6, height: 9 },
      { id: "415", number: "415", name: "Graduate", type: "gradOffice", x: 70, y: 2, width: 9, height: 6 },
      { id: "414", number: "414", name: "Graduate", type: "gradOffice", x: 80, y: 2, width: 9, height: 6 },
      { id: "cruft-conn4", number: "→", name: "To Cruft", type: "common", x: 84, y: 11, width: 9, height: 6 },
      
      // Right Wing - Offices going down
      { id: "421", number: "421", name: "Graduate", type: "gradOffice", x: 63, y: 12, width: 8, height: 6 },
      { id: "422", number: "422", name: "Graduate", type: "gradOffice", x: 82, y: 20, width: 6, height: 8 },
      
      { id: "423", number: "423", name: "Graduate", type: "gradOffice", x: 63, y: 19, width: 8, height: 6 },
      { id: "424", number: "424", name: "Feldman", type: "profOffice", x: 82, y: 29, width: 6, height: 8, pi: "Gary Feldman" },
      
      { id: "425", number: "425", name: "Lyman 425", type: "lectureHall", x: 63, y: 26, width: 8, height: 14 },
      { id: "430", number: "430", name: "Graduate", type: "gradOffice", x: 82, y: 38, width: 6, height: 8 },
      
      { id: "431", number: "431", name: "Graduate", type: "gradOffice", x: 63, y: 50, width: 8, height: 8 },
      { id: "434", number: "434", name: "Graduate", type: "gradOffice", x: 80, y: 47, width: 6, height: 6 },
      
      { id: "438", number: "438", name: "Graduate", type: "gradOffice", x: 86, y: 47, width: 2, height: 8 },
      { id: "440", number: "440", name: "Graduate", type: "gradOffice", x: 86, y: 56, width: 2, height: 12 },
      { id: "442", number: "442", name: "Graduate", type: "gradOffice", x: 80, y: 60, width: 6, height: 8 },
      { id: "443", number: "443", name: "Graduate", type: "gradOffice", x: 86, y: 69, width: 2, height: 8 },
    ],
    buildingOutline: [
      { x: 1, y: 62 },
      { x: 1, y: 90 },
      { x: 14.5, y: 90 },
      { x: 14.5, y: 86 },
      { x: 27.5, y: 86 },
      { x: 27.5, y: 90 },
      { x: 62.5, y: 90 },
      { x: 62.5, y: 88 },
      { x: 88, y: 88 },
      { x: 88, y: 20 },
      { x: 93, y: 20 },
      { x: 93, y: 2 },
      { x: 63, y: 2 },
      { x: 63, y: 60 },
      { x: 34, y: 60 },
      { x: 34, y: 62 },
    ],
  },
];

const getRoomIcon = (type: RoomType) => {
  switch (type) {
    case "lab":
      return <FlaskConical className="h-3 w-3" />;
    case "profOffice":
      return <Users className="h-3 w-3" />;
    case "gradOffice":
      return <GraduationCap className="h-3 w-3" />;
    case "lectureHall":
      return <BookOpen className="h-3 w-3" />;
    case "undergrad":
      return <GraduationCap className="h-3 w-3" />;
    case "common":
      return <Coffee className="h-3 w-3" />;
    default:
      return <MapPin className="h-3 w-3" />;
  }
};

// Colors matching the floor plan legend - optimized for both light and dark modes
const getRoomColor = (
  type: RoomType,
  isHovered: boolean,
  isSelected: boolean
) => {
  const baseColors: Record<
    RoomType,
    { bg: string; hover: string; selected: string; border: string }
  > = {
    undergrad: {
      bg: "bg-green-300/70 dark:bg-green-600/50",
      hover: "bg-green-400/90 dark:bg-green-500/70",
      selected: "bg-green-500 dark:bg-green-400",
      border: "border-green-600 dark:border-green-400",
    },
    gradOffice: {
      bg: "bg-blue-300/70 dark:bg-blue-600/50",
      hover: "bg-blue-400/90 dark:bg-blue-500/70",
      selected: "bg-blue-500 dark:bg-blue-400",
      border: "border-blue-600 dark:border-blue-400",
    },
    profOffice: {
      bg: "bg-red-300/70 dark:bg-red-600/50",
      hover: "bg-red-400/90 dark:bg-red-500/70",
      selected: "bg-red-500 dark:bg-red-400",
      border: "border-red-600 dark:border-red-400",
    },
    adminOffice: {
      bg: "bg-orange-300/70 dark:bg-orange-600/50",
      hover: "bg-orange-400/90 dark:bg-orange-500/70",
      selected: "bg-orange-500 dark:bg-orange-400",
      border: "border-orange-600 dark:border-orange-400",
    },
    lectureHall: {
      bg: "bg-emerald-300/70 dark:bg-emerald-600/50",
      hover: "bg-emerald-400/90 dark:bg-emerald-500/70",
      selected: "bg-emerald-500 dark:bg-emerald-400",
      border: "border-emerald-600 dark:border-emerald-400",
    },
    lab: {
      bg: "bg-purple-300/70 dark:bg-purple-600/50",
      hover: "bg-purple-400/90 dark:bg-purple-500/70",
      selected: "bg-purple-500 dark:bg-purple-400",
      border: "border-purple-600 dark:border-purple-400",
    },
    common: {
      bg: "bg-amber-200/70 dark:bg-amber-600/50",
      hover: "bg-amber-300/90 dark:bg-amber-500/70",
      selected: "bg-amber-400 dark:bg-amber-400",
      border: "border-amber-500 dark:border-amber-400",
    },
  };

  const colors = baseColors[type];
  if (isSelected) return `${colors.selected} ${colors.border}`;
  if (isHovered) return `${colors.hover} ${colors.border}`;
  return `${colors.bg} ${colors.border}`;
};

const getRoomTypeLabel = (type: RoomType): string => {
  switch (type) {
    case "undergrad":
      return "Undergraduate Space";
    case "gradOffice":
      return "Graduate Student Office";
    case "profOffice":
      return "Professor Office";
    case "adminOffice":
      return "Administrative Office";
    case "lectureHall":
      return "Lecture Hall";
    case "lab":
      return "Laboratory";
    case "common":
      return "Common Area";
    default:
      return "Room";
  }
};

export function JeffersonFloorPlan() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const floor = floorData.find((f) => f.floor === currentFloor) || floorData[0];

  // Get all labs with PIs across all floors for the sidebar list
  const allLabsWithPIs = floorData.flatMap((f) =>
    f.rooms.filter((r) => r.pi && r.labId)
  );

  return (
    <Card className="overflow-hidden shadow-lg border-0 bg-linear-to-br from-card to-card/80">
      <CardHeader className="py-4 px-6 border-b bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Jefferson Laboratory
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              17 Oxford Street • Interactive Floor Plan
            </p>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => setCurrentFloor(Math.min(4, currentFloor + 1))}
              disabled={currentFloor >= 4}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <div className="w-20 text-center px-2">
              <span className="text-sm font-semibold">Floor {currentFloor}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => setCurrentFloor(Math.max(1, currentFloor - 1))}
              disabled={currentFloor <= 1}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1fr_300px]">
          {/* Floor Plan Visualization */}
          <div
            className="relative bg-linear-to-br from-muted/20 to-muted/40 p-6"
            style={{ minHeight: "680px" }}
          >
            {/* Floor indicator tabs */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
              {[4, 3, 2, 1].map((floorNum) => (
                <button
                  key={floorNum}
                  onClick={() => setCurrentFloor(floorNum)}
                  className={cn(
                    "w-10 h-10 rounded-r-lg text-sm font-semibold transition-all duration-200 shadow-sm",
                    currentFloor === floorNum
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card hover:bg-primary/10 text-muted-foreground hover:text-foreground border-y border-r border-border"
                  )}
                >
                  {floorNum}
                </button>
              ))}
            </div>

            {/* Floor name and legend */}
            <div className="text-center mb-4">
              <motion.h3 
                key={floor.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold text-foreground"
              >
                {floor.name}
              </motion.h3>
              <p className="text-sm text-muted-foreground mt-1">
                Click on a room for details
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 mb-4 text-xs">
              <div className="flex items-center gap-1.5 bg-card/80 px-2 py-1 rounded-md shadow-sm">
                <div className="w-3.5 h-3.5 rounded bg-purple-300 dark:bg-purple-400/60 border border-purple-500" />
                <span className="font-medium">Lab</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/80 px-2 py-1 rounded-md shadow-sm">
                <div className="w-3.5 h-3.5 rounded bg-red-300 dark:bg-red-400/60 border border-red-500" />
                <span className="font-medium">Professor</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/80 px-2 py-1 rounded-md shadow-sm">
                <div className="w-3.5 h-3.5 rounded bg-blue-300 dark:bg-blue-400/60 border border-blue-500" />
                <span className="font-medium">Graduate</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/80 px-2 py-1 rounded-md shadow-sm">
                <div className="w-3.5 h-3.5 rounded bg-emerald-300 dark:bg-emerald-400/60 border border-emerald-500" />
                <span className="font-medium">Lecture Hall</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/80 px-2 py-1 rounded-md shadow-sm">
                <div className="w-3.5 h-3.5 rounded bg-green-300 dark:bg-green-400/60 border border-green-500" />
                <span className="font-medium">Undergrad</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/80 px-2 py-1 rounded-md shadow-sm">
                <div className="w-3.5 h-3.5 rounded bg-orange-300 dark:bg-orange-400/60 border border-orange-500" />
                <span className="font-medium">Admin</span>
              </div>
            </div>

            {/* Interactive floor plan grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFloor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative mx-auto bg-card rounded-xl border-2 border-border/50 overflow-hidden shadow-xl"
                style={{ width: "100%", maxWidth: "950px", height: "560px" }}
              >
                {/* Building shape underlay - uses coordinate-based polygon from floor data */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points={floor.buildingOutline.map(p => `${p.x},${p.y}`).join(' ')}
                    className="fill-slate-200/80 dark:fill-slate-700/50 stroke-slate-400 dark:stroke-slate-500"
                    strokeWidth="0.5"
                  />
                </svg>
                
                {/* Rooms */}
                {floor.rooms.map((room, index) => (
                  <motion.button
                    key={room.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.015 * index, duration: 0.2 }}
                    whileHover={{ scale: 1.02, zIndex: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "absolute rounded-md border-2 transition-shadow cursor-pointer flex flex-col items-center justify-center p-0.5",
                      "hover:shadow-lg hover:z-10",
                      getRoomColor(
                        room.type,
                        hoveredRoom === room.id,
                        selectedRoom?.id === room.id
                      ),
                      room.labId && "ring-2 ring-primary/40 ring-offset-1 ring-offset-background"
                    )}
                    style={{
                      left: `${room.x}%`,
                      top: `${room.y}%`,
                      width: `${room.width}%`,
                      height: `${room.height}%`,
                    }}
                    onClick={() => setSelectedRoom(room)}
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                  >
                    {room.number && (
                      <span className="text-[10px] font-bold leading-tight text-foreground/90">
                        {room.number}
                      </span>
                    )}
                    {room.width > 7 && room.height > 7 && room.name && (
                      <span className="text-[9px] text-center leading-tight line-clamp-2 text-foreground/70">
                        {room.name}
                      </span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Room Details Panel */}
          <div className="border-l bg-linear-to-b from-card to-muted/20 p-5">
            <AnimatePresence mode="wait">
              {selectedRoom ? (
                <motion.div
                  key={selectedRoom.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-primary/10">
                          {getRoomIcon(selectedRoom.type)}
                        </div>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {getRoomTypeLabel(selectedRoom.type)}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg">
                        {selectedRoom.name || `Room ${selectedRoom.number}`}
                      </h3>
                      {selectedRoom.number && (
                        <p className="text-sm text-muted-foreground">
                          Room {selectedRoom.number}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setSelectedRoom(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {selectedRoom.pi && (
                    <div className="p-4 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                        Principal Investigator
                      </p>
                      <p className="font-semibold text-lg">{selectedRoom.pi}</p>
                      {selectedRoom.researchArea && (
                        <Badge variant="outline" className="mt-2 text-xs bg-background/50">
                          {selectedRoom.researchArea}
                        </Badge>
                      )}
                    </div>
                  )}

                  {selectedRoom.description && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                        Description
                      </p>
                      <p className="text-sm leading-relaxed">{selectedRoom.description}</p>
                    </div>
                  )}

                  {selectedRoom.labId && (
                    <Button asChild className="w-full shadow-md" size="default">
                      <Link href={`/labs/${selectedRoom.labId}`}>
                        <FlaskConical className="h-4 w-4 mr-2" />
                        View Lab Details
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Link>
                    </Button>
                  )}

                  <div className="pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Floor {currentFloor} • Jefferson Lab</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      17 Oxford Street, Cambridge, MA
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-4"
                >
                  <div className="h-14 w-14 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 shadow-inner">
                    <MapPin className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Select a Room</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Click on any room to see details about the space and research groups.
                  </p>

                  <div className="mt-6 w-full">
                    <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                      Faculty & Labs in Jefferson
                    </p>
                    <ScrollArea className="h-52">
                      <div className="space-y-1.5">
                        {allLabsWithPIs.map((room) => (
                          <button
                            key={room.id}
                            onClick={() => {
                              const floorWithRoom = floorData.find((f) =>
                                f.rooms.some((r) => r.id === room.id)
                              );
                              if (floorWithRoom) {
                                setCurrentFloor(floorWithRoom.floor);
                              }
                              setSelectedRoom(room);
                            }}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-primary/10 transition-all text-sm group border border-transparent hover:border-primary/20"
                          >
                            <span className="font-medium group-hover:text-primary transition-colors">{room.pi}</span>
                            <span className="text-xs text-muted-foreground block mt-0.5">
                              Room {room.number} • Floor{" "}
                              {
                                floorData.find((f) =>
                                  f.rooms.some((r) => r.id === room.id)
                                )?.floor
                              }
                            </span>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
