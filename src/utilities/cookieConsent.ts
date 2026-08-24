export const COOKIE_CONSENT_STORAGE_KEY = 'mehh-cookie-consent-v1'
export const COOKIE_CONSENT_CHANGED_EVENT = 'mehh:cookie-consent-changed'
export const COOKIE_SETTINGS_OPEN_EVENT = 'mehh:cookie-settings-open'

export type CookieConsentValue = 'accepted' | 'declined'

export const getCookieConsent = (): CookieConsentValue | null => {
  if (typeof window === 'undefined') return null

  const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  return value === 'accepted' || value === 'declined' ? value : null
}

export const hasAnalyticsConsent = (): boolean => getCookieConsent() === 'accepted'
