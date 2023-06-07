import './globals.css'
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React from "react";
import {Background} from "../../components/svg/svgComponents";
import Script from "next/script";

async function RootLayout({children}) {
    return (
        <html lang="en" className="h-full">
        <head>
            <title>MEHH Meedia OÜ</title>
            <meta name="description" content="Mehh Meedia OÜ - Kodulehtede valmistamine"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-4M4MNV3S4F"/>
        <Script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4M4MNV3S4F', {
                page_path: window.location.pathname,
              });
            `,
            }}
        />
        <body className="h-full flex">
            <main className="flex xl:items-center flex-1 relative">
                <div className='max-w-7xl px-4 py-10 xl:px-32 flex-1 z-10'>
                    {children}
                </div>
                <Background className="left-0 bottom-0 absolute w-full h-full" preserveAspectRatio="xMinYMin slice" />
            </main>
        </body>
        </html>
    )
}

export default RootLayout