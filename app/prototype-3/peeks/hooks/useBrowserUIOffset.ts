'use client'

import { useState, useEffect } from 'react'

interface BrowserUIOffsetResult {
  browserUIOffset: number
  isSafari: boolean
  isMobileBrowser: boolean
  isAndroid: boolean
  browserType: string
  safeBottomSpacing: number
}

export default function useBrowserUIOffset(): BrowserUIOffsetResult {
  const [browserUIOffset, setBrowserUIOffset] = useState(0)
  const [isSafari, setIsSafari] = useState(false)
  const [isMobileBrowser, setIsMobileBrowser] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [browserType, setBrowserType] = useState('unknown')

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isSafariBrowser = /safari/.test(userAgent) && !/chrome/.test(userAgent)
    setIsSafari(isSafariBrowser)

    const isMobile = /iphone|ipad|ipod|android/i.test(userAgent)
    setIsMobileBrowser(isMobile)

    const isAndroidDevice = /android/i.test(userAgent)
    setIsAndroid(isAndroidDevice)

    let browser = 'unknown'
    if (isAndroidDevice) {
      if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) {
        browser = 'android-chrome'
      } else if (/samsung/i.test(userAgent)) {
        browser = 'samsung-internet'
      } else if (/firefox/i.test(userAgent)) {
        browser = 'android-firefox'
      } else if (/opera|opr/i.test(userAgent)) {
        browser = 'android-opera'
      } else {
        browser = 'android-other'
      }
    } else if (isSafariBrowser && isMobile) {
      browser = 'ios-safari'
    } else if (/crios/i.test(userAgent)) {
      browser = 'ios-chrome'
    }
    setBrowserType(browser)

    const calculateOffset = () => {
      let offset = 0

      if (window.visualViewport) {
        const windowHeight = window.innerHeight
        const visualHeight = window.visualViewport.height
        const difference = windowHeight - visualHeight

        if (difference > 0) {
          offset = difference
        }

        if (isAndroidDevice && window.visualViewport.scale > 1) {
          offset = Math.max(offset, 20)
        }
      }

      if (browser === 'android-chrome') {
        if (offset === 0) {
          const isFullscreen = window.innerHeight === screen.height
          if (!isFullscreen) {
            offset = Math.max(offset, 56)
          }
        }
      } else if (browser === 'samsung-internet') {
        if (offset === 0) {
          offset = Math.max(offset, 64)
        }
      } else if (browser === 'android-firefox') {
        if (offset === 0) {
          offset = Math.max(offset, 48)
        }
      } else if (browser === 'ios-safari' && isMobile) {
        const vh = window.innerHeight
        const expectedVh = document.documentElement.clientHeight

        if (vh !== expectedVh) {
          offset = Math.max(offset, 44)
        }

        if ((navigator as Navigator & { standalone?: boolean }).standalone) {
          offset = 0
        }
      }

      const safeAreaBottom = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--safe-area-bottom')
          .replace('px', '') || '0'
      )

      if (safeAreaBottom > 0) {
        offset = Math.max(offset, safeAreaBottom)
      }

      if (isMobile && offset === 0) {
        const isFullscreen = window.innerHeight === screen.height
        const isStandalone = (navigator as Navigator & { standalone?: boolean }).standalone

        if (!isFullscreen && !isStandalone) {
          offset = 0
        }
      }

      if (isAndroidDevice && window.visualViewport) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height
        if (keyboardHeight > 100) {
          offset = Math.min(offset, 20)
        }
      }

      setBrowserUIOffset(offset)
    }

    calculateOffset()

    const handleResize = () => calculateOffset()
    const handleScroll = () => calculateOffset()
    const handleOrientationChange = () => {
      setTimeout(calculateOffset, 100)
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', calculateOffset)
      window.visualViewport.addEventListener('scroll', calculateOffset)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', calculateOffset)
        window.visualViewport.removeEventListener('scroll', calculateOffset)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return {
    browserUIOffset,
    isSafari,
    isMobileBrowser,
    isAndroid,
    browserType,
    safeBottomSpacing: browserUIOffset
  }
}
