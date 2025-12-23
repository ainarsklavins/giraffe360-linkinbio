"use client";

import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

interface SocialLinksProps {
  socials: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
}

// Custom TikTok icon since lucide-react doesn't have one
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

const socialConfig = [
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "facebook", icon: Facebook, label: "Facebook" },
  { key: "tiktok", icon: TikTokIcon, label: "TikTok" },
  { key: "youtube", icon: Youtube, label: "YouTube" },
] as const;

export default function SocialLinks({ socials }: SocialLinksProps) {
  const activeSocials = socialConfig.filter(
    (social) => socials[social.key as keyof typeof socials]
  );

  if (activeSocials.length === 0) return null;

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-center gap-3">
        {activeSocials.map((social) => {
          const Icon = social.icon;
          const url = socials[social.key as keyof typeof socials];

          return (
            <a
              key={social.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[var(--g360-card)] flex items-center justify-center text-[var(--g360-gray)] hover:bg-[var(--g360-accent)] hover:text-[var(--g360-darker)] transition-all duration-200"
              aria-label={`Follow on ${social.label}`}
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
