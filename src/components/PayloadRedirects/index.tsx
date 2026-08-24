import type React from 'react'

import { getDocumentByID } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const slug = url.startsWith('/') ? url : `${url}`

  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === slug)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    const reference = redirectItem.to?.reference

    if (reference) {
      const document =
        typeof reference.value === 'object'
          ? reference.value
          : await getDocumentByID(reference.relationTo, reference.value)

      if (document?.slug) {
        const collectionPrefix = reference.relationTo === 'pages' ? '' : `/${reference.relationTo}`
        redirect(`${collectionPrefix}/${document.slug}`)
      }
    }
  }

  if (disableNotFound) return null

  notFound()
}
