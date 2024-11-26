import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Header } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import {Logo} from "@/components/Logo/Logo";
import RichText from '@/components/RichText'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()
  const header: Header = await getCachedGlobal('header')()

  console.log('header', header)

  const navItems = header?.navItems || []

  return (
    <footer className="border-t border-border bg-black dark:bg-card">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center" href="/">
            <Logo isDark={false} />
          </Link>
          <div className="d-flex flex-col gap-4 text-white">
            {footer?.richText && (
              <RichText
                content={footer?.richText}
                className="flex flex-col gap-1"
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
