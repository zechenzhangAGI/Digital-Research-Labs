"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import { Quote, ChevronRight } from "lucide-react";

const students = [
  "Ben Charette",
  "Alessandro Drake",
  "Rachel Fields",
  "Callie Garcia",
  "JaKayla Harris",
  "Sedona Kessler",
  "Katherine Lee",
  "Thomas Leeds",
  "Dominic Lehane",
  "Sara Lia",
  "Gandab Mammadova",
  "Christopher Prainito",
  "Paul Shen",
  "Spenser Sun",
  "Ashwin Vinod Kumar",
  "Nene Zhvania",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold mb-3"
          >
            About This Project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            This website was created as part of Physics 95 at Harvard University
            to help undergraduates discover research opportunities in the Physics Department.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Course Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6 text-center">Course Leadership</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-semibold text-primary">MF</span>
                    </div>
                    <h3 className="font-semibold text-lg">Professor Melissa Franklin</h3>
                    <p className="text-sm text-muted-foreground">Head Instructor</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-semibold text-primary">ZZ</span>
                    </div>
                    <h3 className="font-semibold text-lg">Zechen Zhang</h3>
                    <p className="text-sm text-muted-foreground">Teaching Fellow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Student Contributors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-2 text-center">Student Contributors</h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Physics 95 Class of Fall 2025
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {students.sort().map((name, idx) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.03 }}
                      className="text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-2">
                        <span className="text-sm font-medium text-primary">
                          {name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{name}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 text-center">About Physics 95</h2>
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                  <p>
                    Physics 95 is a course designed to introduce Harvard undergraduates to the world of
                    physics research. Through this project, students created a comprehensive resource
                    to help their peers discover and connect with research labs in the Physics Department.
                  </p>
                  <p className="mt-3">
                    This website features detailed information about research groups, video tours of labs,
                    interactive maps of research facilities, and tools to help students find the right
                    research fit for their interests and goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Student Reflections Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="pt-8">
                <div className="flex items-start gap-3 mb-4">
                  <Quote className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                  <h2 className="text-xl font-semibold">Student Reflections</h2>
                </div>
                <Separator className="mb-6" />
                <p className="text-muted-foreground mb-6">
                  Beyond exploring research labs, Physics 95 encouraged students to deeply reflect on the
                  ethical dimensions of scientific work. One student's thoughtful essay explores the moral
                  complexities of physics research—from microfluidics and fundamental science to animal testing.
                </p>
                <Link
                  href="/reflections"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium group"
                >
                  Read Student Reflection
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-muted-foreground"
          >
            Harvard University Department of Physics • Fall 2025
          </motion.p>
        </div>
      </div>
    </div>
  );
}

