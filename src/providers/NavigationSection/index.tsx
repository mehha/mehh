'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type NavigationSection = 'blogi' | 'projektid' | null

const NavigationSectionContext = createContext<{
  section: NavigationSection
  setSection: React.Dispatch<React.SetStateAction<NavigationSection>>
} | null>(null)

export const NavigationSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [section, setSection] = useState<NavigationSection>(null)

  return (
    <NavigationSectionContext.Provider value={{ section, setSection }}>
      {children}
    </NavigationSectionContext.Provider>
  )
}

export const NavigationSectionSetter: React.FC<{
  section: Exclude<NavigationSection, null>
}> = ({ section }) => {
  const setSection = useContext(NavigationSectionContext)?.setSection

  useEffect(() => {
    setSection?.(section)

    return () => setSection?.(null)
  }, [section, setSection])

  return null
}

export const useNavigationSection = (): NavigationSection =>
  useContext(NavigationSectionContext)?.section ?? null
