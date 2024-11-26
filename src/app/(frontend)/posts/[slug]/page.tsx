import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import {Media} from "@/components/Media";
import Link from "next/link";

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
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
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 md:pt-36 pb-16">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <PostHero post={post} />

      <div className="gap-4 pt-8">
        <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="mx-auto max-w-5xl">
              <dl className="grid grid-cols-1 text-sm text-neutral-950 sm:grid-cols-4">
                {post.client &&
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Klient</dt>
                    <dd>{post.client}</dd>
                  </div>}
                {post.year &&
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Aasta</dt>
                    <dd>
                    <time>{post.year}</time>
                    </dd>
                  </div>}
                {post.service &&
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Teenus</dt>
                    <dd>{post.service}</dd>
                  </div>}
                {post?.homepage &&
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">Koduleht</dt>
                    <dd><Link href={post?.homepage} className="underline" target="_blank">{post.homepage}</Link></dd>
                  </div>}
              </dl>
            </div>
          </div>
        </div>

        <div className="border-y border-neutral-200 bg-neutral-100 py-16">
          <div className="container">
            <div className="mb-6 mx-auto">
              {post?.media && typeof post?.media !== 'string' && (
                <Media imgClassName="mx-auto" resource={post?.media}/>
              )}
            </div>

            <div className="max-w-4xl mx-auto mt-10">
              <RichText
                className=""
                content={post.content}
                enableGutter={false}
              />
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

export async function generateMetadata({params: paramsPromise}: Args): Promise<Metadata> {
  const {slug = ''} = await paramsPromise
  const post = await queryPostBySlug({slug})

  return generateMeta({doc: post})
}

const queryPostBySlug = cache(async ({slug}: { slug: string }) => {
  const {isEnabled: draft} = await draftMode()

  const payload = await getPayloadHMR({config: configPromise})

  const result = await payload.find({
    collection: 'posts',
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
})
