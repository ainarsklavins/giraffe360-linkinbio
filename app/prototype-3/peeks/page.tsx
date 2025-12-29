'use client'

import { useState, useEffect, useRef } from 'react'
import VideoOverlay, { PropertyOverlayData } from './components/VideoOverlay'
import UnmuteButton from './components/UnmuteButton'
import ListingView from './components/ListingView'
import BackButton from './components/BackButton'
import PropertyCTA from './components/PropertyCTA'
import useBrowserUIOffset from './hooks/useBrowserUIOffset'

interface VideoWithProperty {
  videoPath: string
  propertyData: PropertyOverlayData | null
}

// Sample data - matches the PEEKS videos and overlays we copied
const videosWithProperties: VideoWithProperty[] = [
  {
    videoPath: '/videos/properties/Drone_colr.mp4',
    propertyData: {
      overlays: {
        top: '/overlays/Property_1_Top.png',
        bottom: '/overlays/Property_1_Bottom.png',
        listing: '/overlays/Property_1_Listing.png'
      },
      url: 'https://my.giraffe360.com/p/n1qg5ko'
    }
  },
  {
    videoPath: '/videos/properties/drone_portrait.mp4',
    propertyData: {
      overlays: {
        top: '/overlays/Property_2_Top.png',
        bottom: '/overlays/Property_2_Bottom.png',
        listing: '/overlays/Property_2_Listing.png'
      },
      url: 'https://my.giraffe360.com/p/35ru87b'
    }
  },
  {
    videoPath: '/videos/properties/airbnb1(long).mp4',
    propertyData: {
      overlays: {
        top: '/overlays/Property_3_Top.png',
        bottom: '/overlays/Property_3_Bottom.png',
        listing: '/overlays/Property_3_Listing.png'
      },
      url: 'https://my.giraffe360.com/p/w6zqyn3'
    }
  },
  {
    videoPath: '/videos/properties/airbnb2(long).mp4',
    propertyData: {
      overlays: {
        top: '/overlays/Property_4_Top.png',
        bottom: '/overlays/Property_4_Bottom.png',
        listing: '/overlays/Property_4_Listing.png'
      },
      url: 'https://my.giraffe360.com/p/vxq0yo6'
    }
  },
  {
    videoPath: '/videos/properties/karlahata(long).mp4',
    propertyData: {
      overlays: {
        top: '/overlays/Property_5_Top.png',
        bottom: '/overlays/Property_5_Bottom.png',
        listing: '/overlays/Property_5_Listing.png'
      },
      url: 'https://my.giraffe360.com/p/m8k3jd9'
    }
  }
]

export default function PeeksPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [showListingForVideo, setShowListingForVideo] = useState<Record<number, boolean>>({})
  const { isAndroid } = useBrowserUIOffset()

  const videoRefs = useRef<HTMLVideoElement[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isRepositioning = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const lastY = useRef(0)
  const velocityY = useRef(0)
  const lastTime = useRef(0)
  const swipeStartX = useRef(0)
  const swipeStartY = useRef(0)
  const isSwipeTracking = useRef(false)

  const videos = videosWithProperties.map(v => v.videoPath)

  const handleSwipeLeft = (videoIndex: number) => {
    setShowListingForVideo(prev => ({
      ...prev,
      [videoIndex]: true
    }))
  }

  const handleSwipeRight = (videoIndex: number) => {
    setShowListingForVideo(prev => ({
      ...prev,
      [videoIndex]: false
    }))
  }

  // Prevent iOS Safari pull-to-refresh
  useEffect(() => {
    let lastTouchY = 0

    const preventPullToRefresh = (e: TouchEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || document.body.scrollTop
      const direction = e.touches[0].pageY - lastTouchY

      if (scrollY === 0 && direction > 0) {
        e.preventDefault()
      }

      lastTouchY = e.touches[0].pageY
    }

    document.addEventListener('touchmove', preventPullToRefresh, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh)
    }
  }, [])

  // Preload videos
  useEffect(() => {
    const preloadVideos = async () => {
      let loadedCount = 0
      const totalVideos = videos.length

      videoRefs.current = []

      const loadPromises = videos.map((videoSrc, index) => {
        return new Promise<void>((resolve) => {
          const video = document.createElement('video')
          video.src = videoSrc
          video.preload = 'auto'
          video.muted = true
          video.playsInline = true
          video.loop = true
          video.autoplay = true
          video.setAttribute('webkit-playsinline', 'true')
          video.className = 'w-full h-full object-cover pointer-events-none'
          video.style.userSelect = 'none'

          videoRefs.current[index] = video

          let hasTriggeredLoad = false

          video.addEventListener('progress', () => {
            if (video.buffered.length > 0) {
              const bufferedEnd = video.buffered.end(video.buffered.length - 1)
              const duration = video.duration
              if (duration > 0) {
                const percentBuffered = (bufferedEnd / duration) * 100
                if (percentBuffered >= 90 && !hasTriggeredLoad) {
                  hasTriggeredLoad = true
                  loadedCount++
                  setLoadingProgress((loadedCount / totalVideos) * 100)
                  resolve()
                }
              }
            }
          })

          video.oncanplaythrough = () => {
            if (!hasTriggeredLoad) {
              hasTriggeredLoad = true
              loadedCount++
              setLoadingProgress((loadedCount / totalVideos) * 100)
              resolve()
            }
          }

          video.onerror = () => {
            if (!hasTriggeredLoad) {
              hasTriggeredLoad = true
              loadedCount++
              setLoadingProgress((loadedCount / totalVideos) * 100)
              resolve()
            }
          }

          video.load()
        })
      })

      await Promise.all(loadPromises)

      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    preloadVideos()
  }, [])

  // Set initial scroll position
  useEffect(() => {
    if (!isLoading && videos.length > 0 && scrollContainerRef.current) {
      const containerHeight = scrollContainerRef.current.clientHeight
      scrollContainerRef.current.scrollTop = containerHeight
    }
  }, [isLoading, videos.length])

  // Attach preloaded videos to containers
  useEffect(() => {
    if (isLoading || videos.length === 0 || !videoRefs.current.length) return

    videos.forEach((_, index) => {
      const container = scrollContainerRef.current?.querySelector(
        `.video-container[data-video-index="${index}"] .video-wrapper`
      )

      if (container && videoRefs.current[index]) {
        container.innerHTML = ''
        const video = videoRefs.current[index]
        video.muted = isMuted
        container.appendChild(video)
      }
    })

    // Handle duplicate videos for circular scrolling
    const lastDupContainer = scrollContainerRef.current?.querySelector(
      '.video-container[data-real-index="' + (videos.length - 1) + '"]:first-child .video-wrapper'
    )
    if (lastDupContainer && videos[videos.length - 1]) {
      lastDupContainer.innerHTML = ''
      const dupVideo = document.createElement('video')
      dupVideo.src = videos[videos.length - 1]
      dupVideo.muted = isMuted
      dupVideo.playsInline = true
      dupVideo.loop = true
      dupVideo.autoplay = true
      dupVideo.preload = 'auto'
      dupVideo.className = 'w-full h-full object-cover pointer-events-none'
      lastDupContainer.appendChild(dupVideo)
    }

    const firstDupContainer = scrollContainerRef.current?.querySelector(
      '.video-container[data-real-index="0"]:last-child .video-wrapper'
    )
    if (firstDupContainer && videos[0]) {
      firstDupContainer.innerHTML = ''
      const dupVideo = document.createElement('video')
      dupVideo.src = videos[0]
      dupVideo.muted = isMuted
      dupVideo.playsInline = true
      dupVideo.loop = true
      dupVideo.autoplay = true
      dupVideo.preload = 'auto'
      dupVideo.className = 'w-full h-full object-cover pointer-events-none'
      firstDupContainer.appendChild(dupVideo)
    }
  }, [isLoading, videos, isMuted])

  // IntersectionObserver for video visibility
  useEffect(() => {
    if (isLoading || videos.length === 0) return

    const options = {
      root: scrollContainerRef.current,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video')
        const realIndex = parseInt((entry.target as HTMLElement).dataset.realIndex || '0')

        if (entry.isIntersecting) {
          if (video) {
            video.play().catch(() => {})
          }
          setCurrentVideoIndex(realIndex)
        } else {
          video?.pause()
        }
      })
    }, options)

    const videoContainers = scrollContainerRef.current?.querySelectorAll('.video-container')
    videoContainers?.forEach(container => observer.observe(container))

    return () => observer.disconnect()
  }, [isLoading, videos.length])

  const handleUnmute = () => {
    const containers = scrollContainerRef.current?.querySelectorAll('.video-container')
    let currentVideo: HTMLVideoElement | null = null

    if (containers) {
      containers.forEach(container => {
        const rect = container.getBoundingClientRect()
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
        if (isVisible) {
          currentVideo = container.querySelector('video')
        }
      })
    }

    if (currentVideo) {
      (currentVideo as HTMLVideoElement).pause()
      ;(currentVideo as HTMLVideoElement).currentTime = 0
      ;(currentVideo as HTMLVideoElement).muted = false
      ;(currentVideo as HTMLVideoElement).volume = 1
      ;(currentVideo as HTMLVideoElement).play().catch(() => {})
    }

    const allVideos = scrollContainerRef.current?.querySelectorAll('video')
    if (allVideos) {
      allVideos.forEach(video => {
        if (video !== currentVideo) {
          video.muted = false
          video.volume = 1
        }
      })
    }

    setIsMuted(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    startX.current = touch.clientX
    startY.current = touch.clientY
    lastY.current = touch.clientY
    lastTime.current = Date.now()
    velocityY.current = 0
    swipeStartX.current = touch.clientX
    swipeStartY.current = touch.clientY
    isSwipeTracking.current = true

    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'auto'
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentTime = Date.now()
    const timeDelta = currentTime - lastTime.current
    if (timeDelta > 0) {
      velocityY.current = (e.touches[0].clientY - lastY.current) / timeDelta * 100
    }
    lastY.current = e.touches[0].clientY
    lastTime.current = currentTime
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    const deltaY = touch.clientY - startY.current

    if (isSwipeTracking.current) {
      const swipeDeltaX = touch.clientX - swipeStartX.current
      const swipeDeltaY = touch.clientY - swipeStartY.current
      const absX = Math.abs(swipeDeltaX)
      const absY = Math.abs(swipeDeltaY)

      if (absX > absY * 1.2 && absX > 40) {
        const containerHeight = scrollContainerRef.current?.clientHeight || 0
        const currentScroll = scrollContainerRef.current?.scrollTop || 0
        const visibleVideoIndex = Math.round(currentScroll / containerHeight)

        let actualVideoIndex = visibleVideoIndex - 1
        if (actualVideoIndex < 0) actualVideoIndex = videos.length - 1
        if (actualVideoIndex >= videos.length) actualVideoIndex = 0

        if (swipeDeltaX < 0) {
          handleSwipeLeft(actualVideoIndex)
        } else {
          handleSwipeRight(actualVideoIndex)
        }

        isSwipeTracking.current = false
        return
      }
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'smooth'

      const containerHeight = scrollContainerRef.current.clientHeight
      const currentScroll = scrollContainerRef.current.scrollTop
      const currentVideoIdx = Math.round(currentScroll / containerHeight)

      const dragThreshold = 30
      const velocityThreshold = 30

      let targetIndex = currentVideoIdx

      if (deltaY < -dragThreshold || velocityY.current < -velocityThreshold) {
        targetIndex = currentVideoIdx + 1
      } else if (deltaY > dragThreshold || velocityY.current > velocityThreshold) {
        targetIndex = currentVideoIdx - 1
      }

      const targetScroll = targetIndex * containerHeight
      scrollContainerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })
    }

    isSwipeTracking.current = false
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement
    const scrollTop = container.scrollTop
    const containerHeight = container.clientHeight
    const scrollHeight = container.scrollHeight

    if (!isRepositioning.current) {
      if (scrollTop === 0) {
        isRepositioning.current = true
        container.style.scrollBehavior = 'auto'
        container.scrollTop = containerHeight * videos.length
        setTimeout(() => {
          container.style.scrollBehavior = 'smooth'
          isRepositioning.current = false
        }, 50)
      } else if (scrollTop + containerHeight >= scrollHeight - 1) {
        isRepositioning.current = true
        container.style.scrollBehavior = 'auto'
        container.scrollTop = containerHeight
        setTimeout(() => {
          container.style.scrollBehavior = 'smooth'
          isRepositioning.current = false
        }, 50)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--g360-darker)]">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 border-3 border-[var(--g360-card)] rounded-full"></div>
              <div className="absolute w-14 h-14 border-3 border-[var(--g360-accent)] rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>

          <div className="text-[var(--g360-gray-light)] text-base font-normal">
            Loading property videos...
          </div>

          <div className="w-64 h-1 bg-[var(--g360-card)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--g360-accent)] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <div className="text-[var(--g360-gray)] text-xs">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--g360-darker)]">
        <div className="text-white text-xl">No videos found</div>
      </div>
    )
  }

  const currentProperty = videosWithProperties[currentVideoIndex]

  return (
    <div
      className="fixed inset-0 bg-black"
      style={{
        height: '100dvh',
        minHeight: '-webkit-fill-available'
      }}
    >
      {/* Back Button */}
      <BackButton />

      {/* Scrollable video container */}
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-scroll cursor-grab select-none"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          overscrollBehavior: 'contain',
          userSelect: 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
      >
        {/* Duplicate last video at beginning */}
        {videos.length > 0 && (
          <div
            key="last-duplicate"
            data-index={0}
            data-real-index={videos.length - 1}
            className="video-container relative w-full h-full"
            style={{
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always'
            }}
          >
            <div className="video-wrapper w-full h-full" />
            <VideoOverlay
              videoIndex={videos.length - 1}
              propertyData={videosWithProperties[videos.length - 1]?.propertyData || null}
            />
          </div>
        )}

        {/* Main videos */}
        {videos.map((_, index) => (
          <div
            key={`video-${index}`}
            data-index={index + 1}
            data-real-index={index}
            data-video-index={index}
            className="video-container relative w-full h-full"
            style={{
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always'
            }}
          >
            <div className="video-wrapper w-full h-full" />
            <VideoOverlay
              videoIndex={index}
              propertyData={videosWithProperties[index]?.propertyData || null}
            />
          </div>
        ))}

        {/* Duplicate first video at end */}
        {videos.length > 0 && (
          <div
            key="first-duplicate"
            data-index={videos.length + 1}
            data-real-index={0}
            className="video-container relative w-full h-full"
            style={{
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always'
            }}
          >
            <div className="video-wrapper w-full h-full" />
            <VideoOverlay
              videoIndex={0}
              propertyData={videosWithProperties[0]?.propertyData || null}
            />
          </div>
        )}
      </div>

      {/* Unmute button */}
      {isMuted && <UnmuteButton onUnmute={handleUnmute} />}

      {/* Property CTA */}
      {currentProperty?.propertyData?.url && (
        <PropertyCTA url={currentProperty.propertyData.url} />
      )}

      {/* Listing View */}
      {currentProperty && (
        <ListingView
          listingImage={currentProperty.propertyData?.overlays?.listing || ''}
          isVisible={showListingForVideo[currentVideoIndex] || false}
          onClose={() => handleSwipeRight(currentVideoIndex)}
          propertyData={currentProperty.propertyData}
        />
      )}
    </div>
  )
}
