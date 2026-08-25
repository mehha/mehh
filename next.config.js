import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const NEXT_PUBLIC_MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || 'https://media.mehh.ee'

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['mehh.test'],
  experimental: {
    // Static routes read the remote D1 database during builds. Serial generation avoids
    // multiple workerd processes contending for the same local proxy database.
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL, NEXT_PUBLIC_MEDIA_BASE_URL /* 'https://example.com' */].map(
        (item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        },
      ),
    ],
  },
  reactStrictMode: true,
  redirects,
  serverExternalPackages: ['jose', 'pg-cloudflare'],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

const payloadNextConfig = withPayload(nextConfig, { devBundleServerPackages: false })
const payloadHeaders = payloadNextConfig.headers

// Payload requests the preferred color scheme as a critical client hint on every route. Browsers
// then retry the first request after receiving the hint, which can leave a streamed response on its
// loading boundary if the connection is interrupted. Keep Accept-CH for subsequent requests, but do
// not force a navigation retry.
payloadNextConfig.headers = async () => {
  const headers = (await payloadHeaders?.()) || []

  return headers.map((rule) => ({
    ...rule,
    headers:
      rule.source === '/:path*'
        ? rule.headers.filter(({ key }) => key.toLowerCase() !== 'critical-ch')
        : rule.headers,
  }))
}

export default payloadNextConfig
