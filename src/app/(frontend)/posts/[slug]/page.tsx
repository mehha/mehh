import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { StructuredData } from '@/components/StructuredData'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCanonicalURL } from '@/utilities/getURL'
import { Media } from '@/components/Media'
import { NavigationSectionSetter } from '@/providers/NavigationSection'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const isCaseStudy = Boolean(post.client || post.year || post.service)
  const parentPath = isCaseStudy ? '/projektid' : '/blogi'
  const parentName = isCaseStudy ? 'Projektid' : 'Blogi'
  const canonicalURL = getCanonicalURL(url)
  const image =
    typeof post.meta?.image === 'object' && post.meta.image?.url
      ? getCanonicalURL(post.meta.image.url)
      : typeof post.media === 'object' && post.media.url
        ? getCanonicalURL(post.media.url)
        : getCanonicalURL('/mehh-og.webp')
  const authors = post.populatedAuthors?.flatMap((author) =>
    author.name
      ? [
          {
            '@type': 'Person',
            name: author.name,
          },
        ]
      : [],
  )

  return (
    <article className="pt-16 md:pt-36 pb-16">
      <NavigationSectionSetter section={isCaseStudy ? 'projektid' : 'blogi'} />
      <StructuredData
        data={[
          {
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
                item: getCanonicalURL(parentPath),
                name: parentName,
                position: 2,
              },
              {
                '@type': 'ListItem',
                item: canonicalURL,
                name: post.title,
                position: 3,
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': isCaseStudy ? 'CreativeWork' : 'Article',
            author: authors?.length
              ? authors
              : {
                  '@id': `${getCanonicalURL('/')}#organization`,
                },
            dateModified: post.updatedAt,
            datePublished: post.publishedAt || post.createdAt,
            description: post.meta?.description || undefined,
            headline: post.title,
            image,
            mainEntityOfPage: canonicalURL,
            publisher: {
              '@id': `${getCanonicalURL('/')}#organization`,
            },
          },
        ]}
      />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <PostHero post={post} />

      <div className="gap-4 pt-8">
        <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="mx-auto max-w-5xl">
              <dl className="grid grid-cols-1 text-sm text-neutral-950 sm:grid-cols-4">
                {post.client && (
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Klient</dt>
                    <dd>{post.client}</dd>
                  </div>
                )}
                {post.year && (
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Aasta</dt>
                    <dd>
                      <time>{post.year}</time>
                    </dd>
                  </div>
                )}
                {post.service && (
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Teenus</dt>
                    <dd>{post.service}</dd>
                  </div>
                )}
                {post?.homepage && (
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Koduleht</dt>
                    <dd>
                      <Link href={post?.homepage} className="underline" target="_blank">
                        {post.homepage}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        <div className="border-y border-neutral-200 bg-neutral-100 py-16">
          <div className="container">
            <div className="mb-6 mx-auto">
              {post?.media && typeof post?.media !== 'string' && (
                <Media imgClassName="mx-auto" resource={post?.media} />
              )}
            </div>

            <div className="max-w-4xl mx-auto mt-10">
              <RichText className="" data={post.content} enableGutter={false} />
            </div>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <RelatedPosts
                className="mt-12"
                docs={post.relatedPosts.filter((post) => typeof post === 'object')}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({
    doc: post,
    path: `/posts/${decodedSlug}`,
  })
}

const findPostBySlug = async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

const getCachedPostBySlug = (slug: string) =>
  unstable_cache(() => findPostBySlug({ slug, draft: false }), ['post', slug], {
    tags: [`post_${slug}`],
  })

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  if (draft) {
    return findPostBySlug({ slug, draft: true })
  }

  return getCachedPostBySlug(slug)()
})
