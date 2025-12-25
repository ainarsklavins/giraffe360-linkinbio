"use client";

import { MapPin, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import Image from "next/image";

interface AgentHeaderProps {
  name: string;
  title: string;
  brokerage: string;
  location: string;
  photo: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
}

// Custom TikTok icon
function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  tiktok: TikTokIcon,
  youtube: Youtube,
} as const;

export default function AgentHeader({ name, title, brokerage, location, photo, socials }: AgentHeaderProps) {
  const activeSocials = socials
    ? Object.entries(socials).filter(([, url]) => url)
    : [];

  return (
    <div className="flex items-start gap-4 px-4 pt-6 pb-3">
      {/* Profile Photo - Smaller */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--g360-accent)] to-[var(--g360-accent-hover)] p-[2px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-[var(--g360-darker)]">
            <Image
              src={photo}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Info Column */}
      <div className="flex-1 min-w-0 pt-1">
        {/* Name */}
        <h1 className="text-xl font-bold text-white leading-tight">
          {name}
        </h1>

        {/* Title & Brokerage */}
        <p className="text-[var(--g360-gray)] text-sm mt-0.5">
          {title} at {brokerage}
        </p>

        {/* Location + Social Icons Row */}
        <div className="flex items-center gap-3 mt-2">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-1 text-[var(--g360-gray-light)] text-xs">
            <MapPin size={12} className="text-[var(--g360-accent)]" />
            <span>{location}</span>
          </div>

          {/* Social Icons - Compact */}
          {activeSocials.length > 0 && (
            <div className="flex items-center gap-1.5">
              {activeSocials.map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-[var(--g360-card)] flex items-center justify-center text-[var(--g360-gray)] hover:bg-[var(--g360-accent)] hover:text-[var(--g360-darker)] transition-all"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
