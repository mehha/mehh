import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag(`post_${doc.slug}`, 'max')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag(`post_${previousDoc.slug}`, 'max')
    } else if (
      previousDoc._status === 'published' &&
      doc._status === 'published' &&
      previousDoc.slug !== doc.slug
    ) {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag(`post_${previousDoc.slug}`, 'max')
    }

    if (doc._status === 'published' || previousDoc._status === 'published') {
      revalidateTag('posts_archive', 'max')
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/posts/${doc?.slug}`)
    if (doc?.slug) revalidateTag(`post_${doc.slug}`, 'max')
    revalidateTag('posts_archive', 'max')
  }

  return doc
}
