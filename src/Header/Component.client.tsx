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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className="container relative z-20 py-8 flex justify-between items-center"
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
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`${mobileMenuOpen ? '' : 'hidden'} fixed inset-0 z-10 w-full overflow-y-auto bg-white px-4 py-8 sm:ring-1 sm:ring-gray-900/10`}
      >
        <div className="flex justify-between items-center mb-10">
          <Link href="/">
            <Logo isDark={true}/>
          </Link>
          <button type="button" className="rounded-md text-neutral-950">
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
