import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 0,
  })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 0,
  })

  const sitemap: MetadataRoute.Sitemap = []
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

  for (const page of pages) {
    sitemap.push({
      changeFrequency: 'weekly',
      lastModified: page.updatedAt,
      priority: 1,
      url: `${baseUrl}/${page.slug}`,
    })
  }

  for (const post of posts) {
    sitemap.push({
      changeFrequency: 'weekly',
      lastModified: post.updatedAt,
      priority: 1,
      url: `${baseUrl}/posts/${post.slug}`,
    })
  }

  return [
    ...sitemap,
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },

  ]
}
