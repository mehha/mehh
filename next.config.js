import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['mehh.test'],
  experimental: {
    // Static routes read the remote D1 database during builds. Serial generation avoids
    // multiple workerd processes contending for the same local proxy database.
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
  },
  // Cloudflare Images resizes pictures (src/utilities/imageLoader.ts); the hosts pictures may come
  // from are in wrangler.jsonc. next dev has no /cdn-cgi/image, so it shows pictures as they are.
  images: {
    loader: 'custom',
    loaderFile: './src/utilities/imageLoader.ts',
    unoptimized: process.env.NODE_ENV === 'development',
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

export default withPayload(nextConfig, { devBundleServerPackages: false })
