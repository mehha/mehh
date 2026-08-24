'use client'
import React, { useEffect, useRef } from 'react'
import { COOKIE_CONSENT_CHANGED_EVENT, hasAnalyticsConsent } from '@/utilities/cookieConsent'

type GoogleTagWindow = Window & {
  gtag?: (command: 'event', eventName: string, parameters: Record<string, string>) => void
}

const PageClient: React.FC = () => {
  const hasSentConversion = useRef(false)

  useEffect(() => {
    let retryTimeout: number | undefined
    let retryCount = 0

    const sendConversion = (): boolean => {
      if (hasSentConversion.current || !hasAnalyticsConsent()) return true

      const gtag = (window as GoogleTagWindow).gtag
      if (!gtag) return false

      gtag('event', 'conversion', {
        send_to: 'AW-835198629/akcmCLfwsvgZEKW9oI4D',
      })
      hasSentConversion.current = true

      return true
    }

    const scheduleConversion = () => {
      window.clearTimeout(retryTimeout)

      if (sendConversion() || retryCount >= 20) return

      retryCount += 1
      retryTimeout = window.setTimeout(scheduleConversion, 250)
    }

    scheduleConversion()
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, scheduleConversion)

    return () => {
      window.clearTimeout(retryTimeout)
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, scheduleConversion)
    }
  }, [])

  return <React.Fragment />
}

export default PageClient
