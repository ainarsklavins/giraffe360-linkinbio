"use client";

import { Play, X } from "lucide-react";
import { useState } from "react";

interface VideoIntroProps {
  videoUrl: string;
  name: string;
}

export default function VideoIntro({ videoUrl, name }: VideoIntroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="px-4 pb-2">
      {isExpanded ? (
        /* Expanded video player */
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--g360-card)]">
          <iframe
            src={`${videoUrl}?autoplay=1&mute=1`}
            title={`Video introduction from ${name}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        /* Compact pill button */
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--g360-card)] hover:bg-[var(--g360-card-hover)] transition-colors group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--g360-accent)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Play size={18} className="text-[var(--g360-darker)] ml-0.5" fill="currentColor" />
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">Watch my introduction</p>
            <p className="text-[var(--g360-gray)] text-xs">Learn about my approach</p>
          </div>
        </button>
      )}
    </div>
  );
}
