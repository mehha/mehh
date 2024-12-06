import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from "@/components/RichText";

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  console.log('post', post)
  const { categories, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title, intro, client, year, service } = post

  return (
    <div className="relative">
      <div className="container z-10 relative pb-8">
        <div className="text-center">
          <div className="block font-display text-base font-semibold text-neutral-950 mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const {title: categoryTitle} = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1
              className="mb-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl mx-auto">{title}</h1>
          </div>

          <div>
            <RichText
              className="text-center"
              // @ts-ignore
              content={intro}
              enableGutter={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
