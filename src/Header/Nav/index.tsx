'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {usePathname} from "next/navigation";

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const pathname = usePathname()

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        // @ts-ignore
        return <CMSLink key={i} {...link} className="" appearance={pathname.replace(/\//g, "") === link?.reference?.value?.slug ? 'default' : 'outline'} />
      })}
    </nav>
  )
}
