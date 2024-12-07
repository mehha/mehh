import React from 'react'

import './index.scss'
import { ExternalLink } from 'lucide-react'
import cssVariables from '@/cssVariables'

const BeforeDashboard: React.FC = () => {
  return (
    <a href="/" target="_blank">
      <ExternalLink width={20} color={cssVariables.colors.base850} />
    </a>
  )
}

export default BeforeDashboard
