'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import useBrowserUIOffset from '../hooks/useBrowserUIOffset'
import HeartParticles from './HeartParticles'

export interface PropertyOverlayData {
  overlays: {
    top: string
    bottom: string
    listing: string
  }
  url?: string
}

interface VideoOverlayProps {
  propertyData: PropertyOverlayData | null
  videoIndex?: number
}

export default function VideoOverlay({
  propertyData,
  videoIndex = 0
}: VideoOverlayProps) {
  const { safeBottomSpacing, isSafari, isMobileBrowser, isAndroid, browserType } = useBrowserUIOffset()
  const [isFavorited, setIsFavorited] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(false)

  useEffect(() => {
    if (propertyData?.overlays?.listing && videoIndex >= 2) {
      setShowSwipeHint(true)
      const timer = setTimeout(() => {
        setShowSwipeHint(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [propertyData, videoIndex])

  if (!propertyData || !propertyData.overlays) {
    return null
  }

  let bottomOffset = safeBottomSpacing

  if (isMobileBrowser) {
    if (!isAndroid && isSafari) {
      bottomOffset = 0
    } else if (isAndroid) {
      if (bottomOffset === 0) {
        switch (browserType) {
          case 'android-chrome':
            bottomOffset = 56
            break
          case 'samsung-internet':
            bottomOffset = 64
            break
          case 'android-firefox':
            bottomOffset = 48
            break
          default:
            bottomOffset = 56
        }
      }
    }
  }

  const totalBottomOffset = bottomOffset

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const newFavoriteState = !isFavorited
    setIsFavorited(newFavoriteState)
    setIsAnimating(true)

    if (newFavoriteState) {
      setShowParticles(true)
      setTimeout(() => setShowParticles(false), 1500)
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="absolute inset-0 z-10">
      {/* Heart Button - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleHeartClick}
          className={`w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFavorited ? 'var(--g360-accent)' : 'none'}
            stroke={isFavorited ? 'var(--g360-accent)' : 'white'}
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            <HeartParticles />
          </div>
        )}
      </div>

      {/* Top Overlay - Agent info */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <Image
          src={propertyData.overlays.top}
          alt="Property Agent Info"
          width={393}
          height={80}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Bottom Overlay - Property details */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-20"
        style={{
          bottom: isAndroid ? `${totalBottomOffset}px` : 0,
          paddingBottom: !isAndroid ? 'env(safe-area-inset-bottom, 44px)' : '0px'
        }}
      >
        <Image
          src={propertyData.overlays.bottom}
          alt="Property Details"
          width={393}
          height={250}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Swipe Hint Indicator */}
      {showSwipeHint && propertyData?.overlays?.listing && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none animate-pulse">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-3 flex items-center space-x-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(180 12 12)"
              />
            </svg>
            <span className="text-white text-sm font-medium">Swipe for details</span>
          </div>
        </div>
      )}
    </div>
  )
}
