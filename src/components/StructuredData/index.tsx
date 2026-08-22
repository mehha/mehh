import React from 'react'

type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
      type="application/ld+json"
    />
  )
}
