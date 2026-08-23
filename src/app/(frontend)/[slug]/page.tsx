import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { StructuredData } from '@/components/StructuredData'
import { RenderHero } from '@/heros/RenderHero'
import { getCanonicalURL } from '@/utilities/getURL'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  let page: PageType | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const path = decodedSlug === 'home' ? '/' : `/${decodedSlug}`

  return (
    <article className="pt-16 pb-24">
      {path !== '/' && (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                item: getCanonicalURL('/'),
                name: 'Avaleht',
                position: 1,
              },
              {
                '@type': 'ListItem',
                item: getCanonicalURL(path),
                name: page.title,
                position: 2,
              },
            ],
          }}
        />
      )}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({
    doc: page,
    path: decodedSlug === 'home' ? '/' : `/${decodedSlug}`,
  })
}

const findPageBySlug = async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

const getCachedPageBySlug = (slug: string) =>
  unstable_cache(() => findPageBySlug({ slug, draft: false }), ['page', slug], {
    tags: [`page_${slug}`],
  })

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  if (draft) {
    return findPageBySlug({ slug, draft: true })
  }

  return getCachedPageBySlug(slug)()
})
