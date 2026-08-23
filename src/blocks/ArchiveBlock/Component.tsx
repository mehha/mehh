import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive, type ArchivePost } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

const getCachedArchivePosts = unstable_cache(
  async ({ categories, limit }: { categories: (number | string)[]; limit: number }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      pagination: false,
      sort: 'createdAt',
      select: {
        categories: true,
        meta: true,
        service: true,
        slug: true,
        title: true,
        year: true,
      },
      ...(categories.length > 0
        ? {
            where: {
              categories: {
                in: categories,
              },
            },
          }
        : {}),
    })

    return result.docs
  },
  ['archive-posts'],
  {
    tags: ['posts_archive'],
  },
)

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    isModuleStyle,
    enableLink,
    link,
  } = props

  const limit = limitFromProps || 3
  const isModuleStyleBoolean = !!isModuleStyle

  let posts: ArchivePost[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    posts = await getCachedArchivePosts({
      categories: flattenedCategories || [],
      limit,
    })
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="pt-24" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} isModuleStyle={isModuleStyleBoolean} />

      {enableLink && (
        <div className="container text-center mt-10">
          <CMSLink {...link} />
        </div>
      )}
    </div>
  )
}
