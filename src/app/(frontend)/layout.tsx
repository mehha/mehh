import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'

const monaSans = localFont({ src: 'fonts/Mona-Sans.var.woff2' })
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { GridPattern } from '@/components/StudioComponents/GridPattern'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { StructuredData } from '@/components/StructuredData'
import { getCanonicalURL, getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cookies, draftMode } from 'next/headers'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const cookieStore = await cookies()
  const hasPayloadSession = Boolean(cookieStore.get('payload-token')?.value)

  const organizationURL = getCanonicalURL('/')

  return (
    <html className={monaSans.className} lang="et" suppressHydrationWarning data-theme="light">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <StructuredData
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${organizationURL}#organization`,
              name: 'Mehh Meedia OÜ',
              url: organizationURL,
              logo: getCanonicalURL('/favicon.svg'),
              email: 'info@mehh.ee',
              telephone: '+37256577769',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${organizationURL}#website`,
              name: 'Mehh Meedia OÜ',
              alternateName: 'Mehh Meedia',
              publisher: {
                '@id': `${organizationURL}#organization`,
              },
              url: organizationURL,
            },
          ]}
        />
      </head>
      <body>
        {hasPayloadSession && (
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
        )}
        {isEnabled && <LivePreviewListener />}

        <Header />

        <GridPattern
          className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-96}
        />

        {children}
        <Footer />
        <GoogleAnalytics gaId="AW-835198629" />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: 'Mehh Meedia OÜ',
  },
}
