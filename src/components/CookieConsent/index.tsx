'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import Link from 'next/link'
import React, { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

import { Button } from '@/components/ui/button'
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_SETTINGS_OPEN_EVENT,
  type CookieConsentValue,
  getCookieConsent,
} from '@/utilities/cookieConsent'

const GOOGLE_ADS_ID = 'AW-835198629'

export const CookieConsent: React.FC = () => {
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
      {consent === 'accepted' && <GoogleAnalytics gaId={GOOGLE_ADS_ID} />}

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
