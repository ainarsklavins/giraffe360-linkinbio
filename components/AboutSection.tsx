"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AboutSectionProps {
  bio: string;
  specializations: string[];
}

export default function AboutSection({ bio, specializations }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show first 100 characters when collapsed
  const shortBio = bio.length > 100 ? bio.substring(0, 100) + "..." : bio;

  return (
    <div className="px-4 pb-3">
      {/* Bio text - compact */}
      <p className="text-[var(--g360-gray-light)] text-sm leading-snug">
        {isExpanded ? bio : shortBio}
      </p>

      {/* Expand/Collapse + Specializations inline */}
      <div className="flex items-center flex-wrap gap-2 mt-2">
        {bio.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-0.5 text-[var(--g360-accent)] text-xs font-medium hover:opacity-80 transition-opacity cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Less</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>More</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        )}

        {/* Specialization tags - inline */}
        {specializations.map((spec, index) => (
          <span
            key={index}
            className="px-2 py-0.5 text-xs rounded-full bg-[var(--g360-card)] text-[var(--g360-gray)]"
          >
            {spec}
          </span>
        ))}
      </div>
    </div>
  );
}
