"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AboutSectionProps {
  bio: string;
  specializations: string[];
}

export default function AboutSection({ bio, specializations }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show first 120 characters when collapsed
  const shortBio = bio.length > 120 ? bio.substring(0, 120) + "..." : bio;

  return (
    <div className="px-4 pb-4">
      <div className="bg-[var(--g360-card)] rounded-xl p-4">
        <h2 className="text-sm font-semibold text-[var(--g360-accent)] uppercase tracking-wider mb-2">
          About Me
        </h2>

        {/* Bio text */}
        <p className="text-[var(--g360-gray-light)] text-sm leading-relaxed mb-3">
          {isExpanded ? bio : shortBio}
        </p>

        {/* Expand/Collapse button */}
        {bio.length > 120 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-[var(--g360-accent)] text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Read more</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        )}

        {/* Specializations */}
        <div className="mt-4 pt-4 border-t border-[var(--g360-dark)]">
          <p className="text-xs text-[var(--g360-gray)] mb-2">Specializations</p>
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-[var(--g360-dark)] text-[var(--g360-gray-light)]"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
