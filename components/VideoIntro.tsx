"use client";

import { Play } from "lucide-react";
import { useState } from "react";

interface VideoIntroProps {
  videoUrl: string;
  name: string;
}

export default function VideoIntro({ videoUrl, name }: VideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="px-4 pb-4">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--g360-card)]">
        {isPlaying ? (
          <iframe
            src={`${videoUrl}?autoplay=1&mute=1`}
            title={`Video introduction from ${name}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative group cursor-pointer"
          >
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--g360-dark)] to-[var(--g360-card)] flex items-center justify-center">
              {/* Play button */}
              <div className="w-16 h-16 rounded-full bg-[var(--g360-accent)] flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-lg">
                <Play size={28} className="text-[var(--g360-darker)] ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium">
                Watch my introduction
              </p>
              <p className="text-[var(--g360-gray)] text-xs">
                Learn about my approach to real estate
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
