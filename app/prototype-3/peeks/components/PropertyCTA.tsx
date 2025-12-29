'use client'

import { ExternalLink } from 'lucide-react'

interface PropertyCTAProps {
  url: string
}

export default function PropertyCTA({ url }: PropertyCTAProps) {
  return (
    <div
      className="fixed z-40 left-4 right-4"
      style={{
        bottom: 'max(20px, calc(20px + env(safe-area-inset-bottom)))'
      }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-[var(--g360-accent)] hover:bg-[var(--g360-accent-hover)] text-[var(--g360-darker)] font-bold text-sm transition-all active:scale-98 shadow-lg"
      >
        <span>View Full Tour</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
}
