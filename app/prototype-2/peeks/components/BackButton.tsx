'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95"
      aria-label="Return to profile"
    >
      <ArrowLeft className="text-white w-6 h-6" />
    </button>
  )
}
