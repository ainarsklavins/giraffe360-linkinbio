'use client'

import Link from 'next/link'
import { Play, ChevronRight } from 'lucide-react'

export default function PeekPropertiesButton() {
  return (
    <Link
      href="/prototype-3/peeks"
      className="block w-full rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center gap-5 px-5 py-5 bg-gradient-to-r from-[var(--g360-accent)] to-[var(--g360-accent-hover)] shadow-lg">
        {/* Animated play icon container */}
        <div className="relative w-16 h-16 rounded-full bg-[var(--g360-darker)] flex items-center justify-center flex-shrink-0 group">
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full bg-[var(--g360-darker)] animate-ping opacity-20" />
          <div className="absolute inset-0 rounded-full bg-[var(--g360-darker)]" />
          <Play className="relative w-7 h-7 text-[var(--g360-accent)] fill-[var(--g360-accent)]" />
        </div>

        {/* Text content */}
        <div className="flex-1 text-left">
          <p className="text-[var(--g360-darker)] text-lg font-bold leading-tight">
            Peek into my properties
          </p>
          <p className="text-[var(--g360-darker)]/70 text-base mt-0.5">
            Swipe through video tours
          </p>
        </div>

        {/* Arrow indicator */}
        <ChevronRight className="w-7 h-7 text-[var(--g360-darker)]/70 flex-shrink-0" />
      </div>
    </Link>
  )
}
