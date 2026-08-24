import type { Page, Post } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

type RedirectCollection = 'pages' | 'posts'
type RedirectDocument = Page | Post

export async function getDocumentByID(
  collection: RedirectCollection,
  id: number | string,
  depth = 0,
): Promise<RedirectDocument | null> {
  const payload = await getPayload({ config: configPromise })

  return payload.findByID({
    collection,
    id,
    depth,
    disableErrors: true,
    overrideAccess: false,
  })
}
