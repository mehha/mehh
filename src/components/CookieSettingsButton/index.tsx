'use client'

import React from 'react'

import { COOKIE_SETTINGS_OPEN_EVENT } from '@/utilities/cookieConsent'

export const CookieSettingsButton: React.FC = () => {
  return (
    <button
      className="text-left text-white underline-offset-4 hover:underline"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_OPEN_EVENT))}
      type="button"
    >
      Küpsiste seaded
    </button>
  )
}
