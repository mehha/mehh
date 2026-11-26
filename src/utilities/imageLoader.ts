import type { ImageLoaderProps } from 'next/image'

// next/image's loader (next.config.js): each size is asked for from Cloudflare Images through
// /cdn-cgi/image/<options>/<source>. Cloudflare resizes and converts it and caches the result at the
// edge, so the Worker doesn't run for pictures. The Worker allows sources only from the hosts in
// wrangler.jsonc (images.url_transformations.allowed_origins); a picture from any other host fails.
// next dev has no /cdn-cgi/image, so next.config.js shows pictures as they are there instead.
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const options = [`width=${width}`, `quality=${quality || 75}`, 'fit=scale-down', 'format=auto']
  return `/cdn-cgi/image/${options.join(',')}/${imageLoaderSource(src)}`
}

// The source as the URL's tail: encoded where a URL can't hold it as it is (media file names have
// spaces, which would split a srcset), and kept where it is encoded already. A relative source is a
// path on this site, written without its leading slash.
export function imageLoaderSource(src: string): string {
  if (/^https?:\/\//i.test(src)) return new URL(src).href
  const url = new URL(src, 'https://relative.invalid')
  return `${url.pathname}${url.search}`.replace(/^\//, '')
}
