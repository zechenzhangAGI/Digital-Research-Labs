"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LabFlashCardProps {
  id: string;
  pi: string;
  image?: string;
  description: string;
  researchArea: string;
  sampleProjects: string[];
}

export function LabFlashCard({
  id,
  pi,
  image,
  description,
  researchArea,
  sampleProjects
}: LabFlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isFlipped) {
      e.preventDefault();
      setIsFlipped(true);
    }
  };

  return (
    <div
      className="relative h-[380px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsFlipped(false);
      }}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT OF CARD */}
        <div
          onClick={handleClick}
          className={`absolute inset-0 overflow-hidden transition-all duration-300 cursor-pointer bg-card ${
            isHovered && !isFlipped ? 'brightness-90' : ''
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Full Image Background */}
          <div className="relative h-full bg-muted/30 flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={`${pi}'s lab`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                <div className="text-center">
                  <div className="text-muted-foreground text-sm">Science Image</div>
                  <div className="text-muted-foreground/50 text-xs">Placeholder</div>
                </div>
              </div>
            )}

            {/* Dark Overlay with Name - Bottom Third */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex items-end justify-end px-8 pb-6">
              <h3 className="text-3xl font-light tracking-tight text-white text-right">
                {pi}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div
          className="absolute inset-0 overflow-hidden bg-card p-8"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full flex flex-col">
            {/* Professor Name */}
            <div className="mb-5">
              <h3 className="text-2xl font-normal tracking-tight mb-3">{pi}</h3>
              <div className="h-px bg-primary/20" />
            </div>

            {/* Description */}
            <div className="mb-5 flex-grow">
              <p className="text-sm leading-relaxed text-foreground/80">
                {description || "Research description placeholder - a brief overview of what this lab focuses on and their main research goals."}
              </p>
            </div>

            {/* Research Area */}
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Research Area</p>
              <p className="text-sm text-primary font-medium">
                {researchArea || "Research Area Placeholder"}
              </p>
            </div>

            {/* Sample Projects */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Sample Projects</p>
              <ul className="space-y-1.5">
                {(sampleProjects && sampleProjects.length > 0) ? (
                  sampleProjects.slice(0, 2).map((project, idx) => (
                    <li key={idx} className="text-xs text-foreground/70 flex items-start leading-relaxed">
                      <span className="text-primary mr-2 mt-0.5">•</span>
                      <span>{project}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="text-xs text-foreground/70 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Sample project placeholder 1</span>
                    </li>
                    <li className="text-xs text-foreground/70 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Sample project placeholder 2</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* See More Link */}
            <Link
              href={`/labs/${id}`}
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium mt-auto"
            >
              See More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
