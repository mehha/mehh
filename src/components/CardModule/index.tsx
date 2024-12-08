'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from "@/components/RichText";
import Image from 'next/image'

export const CardModule: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Post
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, client, homepage, service, year, content, intro } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'relative flex w-full flex-col rounded-3xl bg-neutral-50/20 p-6 ring-1 ring-neutral-950/10 transition hover:bg-neutral-50 sm:p-8',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <div className="h-[48px] w-auto relative"><Image className="object-contain object-left" src={metaImage?.url || ''} alt={metaImage?.alt || ''} fill /></div>}
      </div>
      <div className=" mt-8 flex flex-wrap gap-x-2 text-sm">
        {year && <time className="font-semibold text-neutral-600">{year}</time>}
        {service && <><span className="" aria-hidden="true">/</span><span className="text-neutral-600">{service}</span></>}
      </div>
      <div className="mt-auto">
        {titleToUse && (
          <div className="">
            <h3 className="mt-6 font-display text-2xl font-semibold">
              <Link className="" href={href} ref={link.ref}>
                <span className="absolute inset-0 rounded-3xl"></span>
                {titleToUse}
              </Link>
            </h3>
            {/*{intro && <RichText className="mt-4 text-neutral-600" content={intro} enableGutter={false}/>}*/}
          </div>
        )}
        {description && <div className="mt-4 text-neutral-600">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
