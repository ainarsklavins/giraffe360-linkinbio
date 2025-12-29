'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { PropertyOverlayData } from './VideoOverlay'

interface ListingViewProps {
  listingImage: string
  isVisible: boolean
  onClose: () => void
  propertyData: PropertyOverlayData | null
}

export default function ListingView({
  listingImage,
  isVisible,
  onClose,
  propertyData
}: ListingViewProps) {
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (isVisible) {
        onClose()
      }
    },
    delta: 50,
    trackMouse: true,
    trackTouch: true,
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible, onClose])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  return (
    <div
      {...swipeHandlers}
      className={`fixed inset-0 z-50 bg-[var(--g360-darker)] transition-all duration-300 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitPerspective: 1000,
        transform: isVisible ? 'translateX(0) translateZ(0)' : 'translateX(100%) translateZ(0)',
        WebkitTransform: isVisible ? 'translateX(0) translateZ(0)' : 'translateX(100%) translateZ(0)'
      }}
    >
      {/* Back Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-60 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95"
        style={{ pointerEvents: 'auto' }}
        aria-label="Go back to video"
      >
        <ArrowLeft className="text-white w-6 h-6" />
      </button>

      {/* Listing Image - Full width, scrollable */}
      <div className="w-full h-full overflow-y-auto">
        {listingImage && (
          <div className="w-full">
            <Image
              src={listingImage}
              alt="Property Listing Details"
              width={1170}
              height={2532}
              className="w-full h-auto object-cover object-top"
              priority
            />
          </div>
        )}
      </div>

      {/* View Full Tour CTA - Fixed at bottom */}
      {propertyData?.url && (
        <div className="absolute bottom-0 left-0 right-0 z-60 p-4 pb-safe bg-gradient-to-t from-[var(--g360-darker)] via-[var(--g360-darker)]/80 to-transparent">
          <a
            href={propertyData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[var(--g360-accent)] hover:bg-[var(--g360-accent-hover)] text-[var(--g360-darker)] font-bold transition-all active:scale-98"
          >
            <span>View Full Tour on Giraffe360</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      )}

      {/* Swipe hint */}
      <div className="absolute bottom-24 right-4 text-white/60 text-sm animate-pulse z-10">
        Swipe right to go back
      </div>
    </div>
  )
}
