import type { EmailAdapter, SendEmailOptions } from 'payload'

export const DEFAULT_FROM_ADDRESS = 'info@mehh.ee'
export const DEFAULT_FROM_NAME = 'MEHH Meedia OÜ'

type CloudflareEmailAddress = {
  email: string
  name: string
}

type CloudflareEmailMessage = {
  bcc?: string[]
  cc?: string[]
  from: string | CloudflareEmailAddress
  headers?: Record<string, string>
  html?: string
  replyTo?: string | CloudflareEmailAddress
  subject: string
  text?: string
  to: string[]
}

export type CloudflareEmailBinding = {
  send(message: CloudflareEmailMessage): Promise<{ messageId: string }>
}

const splitAddresses = (value: string): string[] => {
  const addresses: string[] = []
  let angleBracketDepth = 0
  let current = ''
  let quoted = false

  for (const character of value) {
    if (character === '"') quoted = !quoted
    if (!quoted && character === '<') angleBracketDepth += 1
    if (!quoted && character === '>') angleBracketDepth = Math.max(0, angleBracketDepth - 1)

    if (character === ',' && !quoted && angleBracketDepth === 0) {
      if (current.trim()) addresses.push(current.trim())
      current = ''
      continue
    }

    current += character
  }

  if (current.trim()) addresses.push(current.trim())

  return addresses
}

const addressToString = (address: { address: string }): string => address.address

const normalizeRecipients = (value: SendEmailOptions['to']): string[] => {
  if (!value) return []

  return (Array.isArray(value) ? value : [value]).flatMap((address) =>
    typeof address === 'string' ? splitAddresses(address) : [addressToString(address)],
  )
}

const normalizeSender = (
  value: SendEmailOptions['from'] | SendEmailOptions['replyTo'],
  fallback?: CloudflareEmailAddress,
): CloudflareEmailAddress | string | undefined => {
  const firstValue = Array.isArray(value) ? value[0] : value

  if (!firstValue) return fallback
  if (typeof firstValue !== 'string') {
    return {
      email: firstValue.address,
      name: firstValue.name || '',
    }
  }

  const match = firstValue.match(/^\s*"?([^"<]*)"?\s*<([^>]+)>\s*$/)
  if (!match) return firstValue.trim()

  return {
    email: match[2].trim(),
    name: match[1].trim(),
  }
}

const normalizeContent = (
  value: SendEmailOptions['html'] | SendEmailOptions['text'],
): string | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'string') return value
  if (Buffer.isBuffer(value)) return value.toString('utf8')

  throw new Error('Cloudflare Email Sending supports string or Buffer email content only.')
}

const normalizeHeaders = (
  headers: SendEmailOptions['headers'],
): Record<string, string> | undefined => {
  if (!headers || Array.isArray(headers)) return undefined

  return Object.fromEntries(
    Object.entries(headers).flatMap(([name, value]) => {
      if (value === undefined) return []
      if (Array.isArray(value)) return [[name, value.map(String).join(', ')]]
      if (typeof value === 'object' && value !== null && 'value' in value) {
        return [[name, String(value.value)]]
      }
      return [[name, String(value)]]
    }),
  )
}

export const cloudflareEmailAdapter = (
  binding: CloudflareEmailBinding | undefined,
): EmailAdapter<{ messageId: string }> => {
  return () => ({
    name: 'cloudflare-email',
    defaultFromAddress: DEFAULT_FROM_ADDRESS,
    defaultFromName: DEFAULT_FROM_NAME,
    sendEmail: async (message) => {
      if (!binding) {
        throw new Error('Cloudflare Email Sending binding EMAIL is unavailable.')
      }

      const to = normalizeRecipients(message.to)
      if (to.length === 0) throw new Error('At least one email recipient is required.')

      const cc = normalizeRecipients(message.cc)
      const bcc = normalizeRecipients(message.bcc)

      return binding.send({
        ...(bcc.length > 0 ? { bcc } : {}),
        ...(cc.length > 0 ? { cc } : {}),
        from: normalizeSender(message.from, {
          email: DEFAULT_FROM_ADDRESS,
          name: DEFAULT_FROM_NAME,
        })!,
        headers: normalizeHeaders(message.headers),
        html: normalizeContent(message.html),
        replyTo: normalizeSender(message.replyTo),
        subject: message.subject || '',
        text: normalizeContent(message.text),
        to,
      })
    },
  })
}
