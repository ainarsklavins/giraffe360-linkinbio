'use client'

import { useState } from 'react'

interface UnmuteButtonProps {
  onUnmute: () => void
}

export default function UnmuteButton({ onUnmute }: UnmuteButtonProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsFading(true)

    setTimeout(() => {
      onUnmute()
    }, 100)

    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleClick}
      className={`fixed z-30 w-14 h-14 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
        isFading ? 'opacity-0' : 'opacity-100 animate-pulse'
      }`}
      style={{
        bottom: 'max(100px, calc(80px + env(safe-area-inset-bottom)))',
        right: '20px'
      }}
      aria-label="Unmute videos"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M11 5L6 9H2V15H6L11 19V5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.7 5.3C20.2601 6.86015 21.1296 8.98104 21.1296 11.195C21.1296 13.409 20.2601 15.5298 18.7 17.09"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="4"
          y1="4"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}
