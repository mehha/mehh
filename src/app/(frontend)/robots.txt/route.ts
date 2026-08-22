import { getCanonicalURL } from '@/utilities/getURL'

export const dynamic = 'force-static'

export function GET(): Response {
  const body = ['User-agent: *', 'Allow: /', `Sitemap: ${getCanonicalURL('/sitemap.xml')}`, '']

  return new Response(body.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
