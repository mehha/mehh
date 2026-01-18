import React from 'react'

import './index.scss'
import { ExternalLink } from 'lucide-react'
import cssVariables from '@/cssVariables'
import Link from 'next/link'

const BeforeDashboard: React.FC = () => {
  return (
    <Link href="/" aria-label="Go to home">
      <ExternalLink width={20} color={cssVariables.colors.base850} />
    </Link>
  )
}

export default BeforeDashboard
