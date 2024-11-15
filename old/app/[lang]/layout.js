import './globals.css'
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React from "react";
import {Background} from "../../components/svg/svgComponents";
import Script from "next/script";

async function RootLayout({children}) {
    const GTM_ID = 'GTM-NX86J53';

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
        <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
            `}
        </Script>
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