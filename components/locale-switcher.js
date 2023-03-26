'use client'

import React from 'react';
import { usePathname } from 'next/navigation'
import {i18n} from "../i18n-config";
import Link from "next/link";

const LocaleSwitcher = () => {
    const pathName = usePathname()
    const redirectedPathName = (locale) => {
      if (!pathName) return '/'
      const segments = pathName.split('/')
      segments[1] = locale
      return segments.join('/')
    }

    return (
        <ul className="absolute right-10 top-6 flex gap-2 text-gray-100">
          {i18n.locales.map((locale) => {
            return (
              <li className={`${pathName === '/'+locale ? 'underline' : ''}`} key={locale}>
                <Link href={redirectedPathName(locale)}>{locale}</Link>
              </li>
            )
          })}
        </ul>
    );
};

export default LocaleSwitcher;