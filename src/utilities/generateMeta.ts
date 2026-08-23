import type { Metadata } from 'next'

import type { Page, Post } from '../payload-types'

import { getCanonicalURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

const BRAND_NAME = 'Mehh Meedia OÜ'
const DEFAULT_HOME_META_TITLE = 'Mehh Meedia OÜ | Digilahendused, mis toetavad sinu äri'
const DEFAULT_META_DESCRIPTION = 'Pakume professionaalset WordPress ja WooCommerce arendust'

const descriptionsByPath: Record<string, string> = {
  '/': 'Loome ettevõtetele WordPressi, WooCommerce’i ning Payload CMS-i ja Next.js veebilahendusi. Disainist arenduse, hoolduse ja kasutajatoeni.',
  '/blogi':
    'Praktilised artiklid WordPressist, WooCommerce’ist, Gutenbergist ja kaasaegsest veebiarendusest.',
  '/kontakt':
    'Võta Mehh Meediaga ühendust, et arutada kodulehe, e-poe, veebidisaini või olemasoleva lahenduse hoolduse vajadusi.',
  '/kodulehe-hooldus-ja-tugiteenused':
    'WordPressi kodulehe hooldus, uuendused, varundamine ja kasutajatugi, et veebilahendus püsiks turvaline ja töökindel.',
  '/projektid':
    'Tutvu Mehh Meedia valminud veebilehtede, e-poodide ja teiste digilahenduste projektidega.',
}

const withBrand = (title: string) => {
  const titleWithoutBrand = title.replace(/(?:\s*\|\s*Mehh Meedia(?: OÜ)?)+$/i, '').trim()

  return titleWithoutBrand === BRAND_NAME ? BRAND_NAME : `${titleWithoutBrand} | ${BRAND_NAME}`
}

const getTitle = (doc: Page | Post | null, path: string) => {
  if (path === '/') return `Veebiarendus ja e-poed ettevõtetele | ${BRAND_NAME}`

  const metaTitle = doc?.meta?.title?.trim()
  const title = !metaTitle || metaTitle === DEFAULT_HOME_META_TITLE ? doc?.title : metaTitle

  return withBrand(title || BRAND_NAME)
}

const getDescription = (doc: Page | Post | null, path: string) => {
  const metaDescription = doc?.meta?.description?.trim()

  if (descriptionsByPath[path]) return descriptionsByPath[path]
  if (metaDescription && !metaDescription.startsWith(DEFAULT_META_DESCRIPTION))
    return metaDescription

  if (!doc) return undefined

  if ('content' in doc) {
    const projectDetails = [
      doc.service?.trim() || 'veebilahendus',
      doc.client?.trim() ? `kliendile ${doc.client.trim()}` : undefined,
    ]
      .filter(Boolean)
      .join(' ')

    const isProject = Boolean(doc.client || doc.service || doc.year)

    return isProject
      ? `${doc.title} – Mehh Meedia teostatud ${projectDetails}.`
      : `Loe Mehh Meedia artiklit „${doc.title}” ja saa praktilisi teadmisi kaasaegsest veebiarendusest.`
  }

  return `${doc.title} – Mehh Meedia veebilahendus.`
}

const getOpenGraphImage = (doc: Page | Post | null) => {
  const image =
    typeof doc?.meta?.image === 'object' && doc.meta.image !== null ? doc.meta.image : null
  const imageURL = image?.url?.trim()

  if (!image || !imageURL) return undefined

  const isSVG =
    image.mimeType === 'image/svg+xml' ||
    new URL(imageURL, 'https://mehh.ee').pathname.endsWith('.svg')

  return isSVG ? undefined : getCanonicalURL(imageURL)
}

export const generateMeta = async (args: {
  doc: Page | Post | null
  path: string
}): Promise<Metadata> => {
  const { doc, path } = args
  const canonicalURL = getCanonicalURL(path)

  const ogImage = getOpenGraphImage(doc)

  const description = getDescription(doc, path)
  const title = getTitle(doc, path)
  const isConfirmationPage = path === '/tname-pringu-eest'

  return {
    alternates: {
      canonical: canonicalURL,
    },
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalURL,
    }),
    robots: isConfirmationPage
      ? {
          follow: false,
          index: false,
        }
      : undefined,
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: ogImage ? [ogImage] : [getCanonicalURL('/mehh-og.webp')],
      title,
    },
  }
}
