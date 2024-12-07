import React from 'react'
import { ExternalLink } from 'lucide-react'
import cssVariables from '@/cssVariables'
import Link from 'next/link'

const BeforeLogin: React.FC = () => {
  return (
    <Link className="inline-block mb-8" href="/" target="_self" style={{ marginBottom: '1rem', display: 'block' }}>
      Back to homepage
    </Link>
  )
}

export default BeforeLogin
