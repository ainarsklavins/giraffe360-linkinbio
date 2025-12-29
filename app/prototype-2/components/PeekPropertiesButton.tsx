'use client'

import Link from 'next/link'
import { Play, ChevronRight } from 'lucide-react'

export default function PeekPropertiesButton() {
  return (
    <Link
      href="/prototype-2/peeks"
      className="block w-full rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center gap-4 px-4 py-4 bg-gradient-to-r from-[var(--g360-accent)] to-[var(--g360-accent-hover)] shadow-lg">
        {/* Animated play icon container */}
        <div className="relative w-14 h-14 rounded-full bg-[var(--g360-darker)] flex items-center justify-center flex-shrink-0 group">
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full bg-[var(--g360-darker)] animate-ping opacity-20" />
          <div className="absolute inset-0 rounded-full bg-[var(--g360-darker)]" />
          <Play className="relative w-6 h-6 text-[var(--g360-accent)] fill-[var(--g360-accent)]" />
        </div>

        {/* Text content */}
        <div className="flex-1 text-left">
          <p className="text-[var(--g360-darker)] text-base font-bold leading-tight">
            Peek into my properties
          </p>
          <p className="text-[var(--g360-darker)]/70 text-sm mt-0.5">
            Swipe through video tours
          </p>
        </div>

        {/* Arrow indicator */}
        <ChevronRight className="w-6 h-6 text-[var(--g360-darker)]/70 flex-shrink-0" />
      </div>
    </Link>
  )
}
