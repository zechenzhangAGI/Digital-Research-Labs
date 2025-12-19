"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface LabFlashCardProps {
  id: string;
  pi: string;
  image?: string;
  description: string;
  researchArea: string;
  sampleProjects: string[];
  verified?: boolean;
}

export function LabFlashCard({
  id,
  pi,
  image,
  description,
  researchArea,
  sampleProjects,
  verified = false
}: LabFlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFrontClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(true);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    setIsFlipped(false);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`relative h-[420px] transition-transform duration-300 ${
        isHovered && !isFlipped ? 'scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsFlipped(false);
      }}
      style={{ perspective: '1000px' }}
      role="article"
      aria-label={`Lab card for ${pi}`}
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
          onClick={handleFrontClick}
          className="absolute inset-0 overflow-hidden rounded-xl border-2 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-card"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            transform: 'translateZ(0)',
          }}
        >
          <div className="relative h-full bg-muted/30 flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={`${pi}'s lab`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-muted/50 to-muted flex items-center justify-center">
                <div className="text-center">
                  <div className="text-muted-foreground text-sm">Science Image</div>
                  <div className="text-muted-foreground/50 text-xs">Placeholder</div>
                </div>
              </div>
            )}

            {verified && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-green-500/90 text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-lg">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/80 via-black/60 to-transparent flex items-end justify-end px-6 pb-5">
              <h3 className="text-2xl font-light tracking-tight text-white text-right">
                {pi}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div
          onClick={handleBackClick}
          className="absolute inset-0 overflow-hidden rounded-xl border-2 shadow-lg bg-card cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(0)',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {verified ? (
            // VERIFIED PROFESSOR - Show full details
            <div className="h-full flex flex-col p-6 overflow-hidden">
              {/* Professor Name */}
              <div className="mb-3 flex-shrink-0">
                <h3 className="text-xl font-normal tracking-tight mb-2">{pi}</h3>
                <div className="h-px bg-primary/20" />
              </div>

              {/* Description - uses line-clamp as safety net */}
              <div className="mb-3 flex-shrink-0">
                <p className="text-sm leading-relaxed text-foreground/80 line-clamp-4">
                  {description}
                </p>
              </div>

              {/* Research Area */}
              <div className="mb-3 flex-shrink-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Research Area</p>
                <p className="text-sm text-primary font-medium">
                  {researchArea}
                </p>
              </div>

              {/* Sample Projects - only show if available */}
              {sampleProjects && sampleProjects.length > 0 && (
                <div className="mb-3 flex-grow min-h-0 overflow-hidden">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">Sample Projects</p>
                  <ul className="space-y-1">
                    {sampleProjects.slice(0, 2).map((project, idx) => (
                      <li key={idx} className="text-xs text-foreground/70 flex items-start leading-relaxed">
                        <span className="text-primary mr-1.5 flex-shrink-0">•</span>
                        <span className="line-clamp-2">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* See More Link */}
              <Link
                href={`/labs/${id}`}
                onClick={handleLinkClick}
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium mt-auto flex-shrink-0 hover:underline"
              >
                See More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ) : (
            // NON-VERIFIED PROFESSOR - Show limited info + contact prompt
            <div className="h-full flex flex-col p-6">
              {/* Professor Name */}
              <div className="mb-3 flex-shrink-0">
                <h3 className="text-xl font-normal tracking-tight mb-2">{pi}</h3>
                <div className="h-px bg-muted-foreground/20" />
              </div>

              {/* Description */}
              <div className="mb-3 flex-shrink-0">
                <p className="text-sm leading-relaxed text-foreground/80 line-clamp-4">
                  {description}
                </p>
              </div>

              {/* Research Area */}
              <div className="mb-4 flex-shrink-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Research Area</p>
                <p className="text-sm text-primary font-medium">
                  {researchArea}
                </p>
              </div>

              {/* No Survey Data Notice */}
              <div className="flex-grow flex flex-col justify-center">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
                  <AlertCircle className="h-5 w-5 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">
                    No survey data available
                  </p>
                  <p className="text-xs text-foreground/70">
                    Contact this professor directly for research opportunities
                  </p>
                </div>
              </div>

              {/* See More Link */}
              <Link
                href={`/labs/${id}`}
                onClick={handleLinkClick}
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium mt-4 flex-shrink-0 hover:underline"
              >
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
