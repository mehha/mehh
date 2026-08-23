'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { useNavigationSection } from '@/providers/NavigationSection'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const pathname = usePathname()
  const navigationSection = useNavigationSection()

  return (
    <nav className="flex items-start flex-col lg:flex-row gap-3 lg:items-center">
      {navItems.map(({ link }, i) => {
        const reference = link.reference?.value
        const slug = typeof reference === 'object' ? reference.slug : null
        const path = slug === 'home' ? '/' : slug ? `/${slug}` : link.url
        const isActive = navigationSection ? slug === navigationSection : pathname === path

        return (
          <CMSLink
            key={i}
            {...link}
            ariaCurrent={isActive ? 'page' : undefined}
            appearance={isActive ? 'default' : 'outline'}
            className=""
          />
        )
      })}
    </nav>
  )
}
