"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

interface AgentHeaderProps {
  name: string;
  title: string;
  brokerage: string;
  location: string;
  photo: string;
}

export default function AgentHeader({ name, title, brokerage, location, photo }: AgentHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center px-4 pt-8 pb-4">
      {/* Profile Photo */}
      <div className="relative w-28 h-28 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--g360-accent)] to-[var(--g360-accent-hover)] p-[3px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-[var(--g360-darker)]">
            <Image
              src={photo}
              alt={name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Name */}
      <h1 className="text-2xl font-bold text-white mb-1">
        {name}
      </h1>

      {/* Title & Brokerage */}
      <p className="text-[var(--g360-gray)] text-sm mb-2">
        {title} at {brokerage}
      </p>

      {/* Location Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--g360-card)] text-[var(--g360-gray-light)] text-xs">
        <MapPin size={12} className="text-[var(--g360-accent)]" />
        <span>{location}</span>
      </div>
    </div>
  );
}
