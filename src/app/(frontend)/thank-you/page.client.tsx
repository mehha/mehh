'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'

const PageClient: React.FC = () => {
  useEffect(() => {
    sendGTMEvent({ event: 'conversion', value: { 'send_to': 'AW-835198629/akcmCLfwsvgZEKW9oI4D' }})
  }, [])
  /* Force the header to be dark mode while we have an image behind it */
  return <React.Fragment />
}

export default PageClient
