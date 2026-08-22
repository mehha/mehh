import type { Metadata } from 'next'

import { getCanonicalURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Mehh Meedia aitab organisatsioonidel luua selgeid digilahendusi, veebilehti ja visuaalset identiteeti.',
  images: [
    {
      url: getCanonicalURL('/mehh-og.webp'),
    },
  ],
  siteName: 'Mehh Meedia OÜ',
  title: 'Mehh Meedia OÜ',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
