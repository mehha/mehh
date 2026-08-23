import { getCanonicalURL } from '@/utilities/getURL'

export const dynamic = 'force-static'

export function GET(): Response {
  const body = [
    '# Mehh Meedia OÜ',
    '',
    '> Eesti veebiarendusettevõte, mis loob ja hooldab WordPressi, WooCommerce’i, Payload CMS-i ning Next.js-i veebilahendusi.',
    '',
    '## Olulisemad lehed',
    '',
    `- [Avaleht](${getCanonicalURL('/')})`,
    `- [Projektid](${getCanonicalURL('/projektid')})`,
    `- [Teenused](${getCanonicalURL('/teenused')})`,
    `- [Blogi](${getCanonicalURL('/blogi')})`,
    `- [Kontakt](${getCanonicalURL('/kontakt')})`,
    '',
    '## Teemad',
    '',
    '- WordPressi ja WooCommerce’i arendus',
    '- Payload CMS-i ja Next.js-i arendus',
    '- Veebidisain, hooldus ja kasutajatugi',
    '',
    '## Kontakt',
    '',
    '- E-post: info@mehh.ee',
    '- Telefon: +372 5657 7769',
    '',
    '## Masinloetav info',
    '',
    `- [Sitemap](${getCanonicalURL('/sitemap.xml')})`,
    `- [Robots](${getCanonicalURL('/robots.txt')})`,
    '- Sisu võib kasutada otsinguks ja viitamiseks. Tehisintellekti mudelite treenimine ei ole lubatud.',
    '',
  ]

  return new Response(body.join('\n'), {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
