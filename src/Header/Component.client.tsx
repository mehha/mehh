'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Hamburger } from '@/Header/Hamburger'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="container relative z-20 py-8 flex justify-between items-center"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <Link href="/">
        <Logo isDark={true} />
      </Link>
      <div className="hidden lg:block">
        <HeaderNav header={header} />
      </div>
      <button
        type="button"
        className="lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Hamburger />
      </button>
      <div
        className={`${mobileMenuOpen ? '' : 'hidden'} fixed inset-0 z-10 w-full overflow-y-auto bg-white px-4 py-8 sm:ring-1 sm:ring-gray-900/10`}
      >
        <div className="flex justify-between items-center mb-10">
          <Logo isDark={true}/>
          <button type="button" className="rounded-md text-neutral-950"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Close menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className={``}>
          <HeaderNav header={header} />
        </div>
      </div>
    </header>
  )
}
