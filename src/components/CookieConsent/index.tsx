'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { Button } from '@/components/ui/button'
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_SETTINGS_OPEN_EVENT,
  type CookieConsentValue,
  getCookieConsent,
} from '@/utilities/cookieConsent'

const GOOGLE_TAG_ID = 'AW-835198629'
const GOOGLE_ADS_ID = 'AW-18417265091'

type GoogleConsentState = {
  ad_personalization: 'denied' | 'granted'
  ad_storage: 'denied' | 'granted'
  ad_user_data: 'denied' | 'granted'
  analytics_storage: 'denied' | 'granted'
}

type GoogleTag = {
  (command: 'config', targetId: string): void
  (command: 'consent', action: 'update', state: GoogleConsentState): void
}

type GoogleTagWindow = Window & {
  gtag?: GoogleTag
}

const getGoogleConsentState = (granted: boolean): GoogleConsentState => ({
  ad_personalization: granted ? 'granted' : 'denied',
  ad_storage: granted ? 'granted' : 'denied',
  ad_user_data: granted ? 'granted' : 'denied',
  analytics_storage: granted ? 'granted' : 'denied',
})

export const CookieConsent: React.FC = () => {
  const hasConfiguredAdditionalGoogleTag = useRef(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onStoreChange)
      window.addEventListener('storage', onStoreChange)

      return () => {
        window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, onStoreChange)
        window.removeEventListener('storage', onStoreChange)
      }
    },
    getCookieConsent,
    () => null,
  )

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true)
    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, openSettings)

    return () => window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, openSettings)
  }, [])

  useEffect(() => {
    let retryTimeout: number | undefined
    let retryCount = 0

    const updateGoogleConsent = () => {
      const gtag = (window as GoogleTagWindow).gtag

      if (gtag) {
        const effectiveConsent = consent ?? getCookieConsent()
        gtag('consent', 'update', getGoogleConsentState(effectiveConsent === 'accepted'))

        if (!hasConfiguredAdditionalGoogleTag.current) {
          gtag('config', GOOGLE_TAG_ID)
          hasConfiguredAdditionalGoogleTag.current = true
        }

        return
      }

      if (retryCount >= 20) return

      retryCount += 1
      retryTimeout = window.setTimeout(updateGoogleConsent, 250)
    }

    updateGoogleConsent()

    return () => window.clearTimeout(retryTimeout)
  }, [consent])

  const updateConsent = useCallback(
    (value: CookieConsentValue) => {
      const shouldReload = consent === 'accepted' && value === 'declined'

      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value)
      setSettingsOpen(false)
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: value }))

      if (shouldReload) window.location.reload()
    },
    [consent],
  )

  return (
    <>
      <GoogleAnalytics gaId={GOOGLE_ADS_ID} />

      {(consent === null || settingsOpen) && (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-neutral-700 bg-neutral-950 p-5 text-white shadow-2xl sm:p-6"
          role="dialog"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="mb-2 text-lg font-semibold" id="cookie-consent-title">
                Küpsiste valikud
              </h2>
              <p className="text-sm leading-6 text-neutral-300">
                Kasutame vajalikke tehnoloogiaid veebilehe toimimiseks. Lisateavet leiate{' '}
                <Link className="underline underline-offset-4" href="/privaatsuspoliitika">
                  privaatsuspoliitikast
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Button
                className="border-neutral-500 bg-transparent text-white hover:bg-neutral-800 hover:text-white"
                onClick={() => updateConsent('declined')}
                type="button"
                variant="outline"
              >
                Ainult vajalikud
              </Button>
              <Button onClick={() => updateConsent('accepted')} type="button">
                Nõustun
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
