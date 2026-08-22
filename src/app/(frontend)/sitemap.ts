import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getCanonicalURL } from '@/utilities/getURL'
import { getPayload } from 'payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 0,
    overrideAccess: false,
  })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 0,
    overrideAccess: false,
  })

  const sitemap: MetadataRoute.Sitemap = []

  for (const page of pages) {
    if (page.slug === 'tname-pringu-eest') continue

    sitemap.push({
      lastModified: page.updatedAt,
      url: getCanonicalURL(page.slug === 'home' ? '/' : `/${page.slug}`),
    })
  }

  for (const post of posts) {
    sitemap.push({
      lastModified: post.updatedAt,
      url: getCanonicalURL(`/posts/${post.slug}`),
    })
  }

  return sitemap
}
