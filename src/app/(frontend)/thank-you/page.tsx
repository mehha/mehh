import React, { cache } from 'react'
import PageClient from './page.client'

export default async function Thankyou() {

  return (
    <div className={ "container"}>
      <article className="pt-16 pb-24">
        <PageClient />
        <h1 className="text-2xl md:text-5xl mb-4">Tänud, võtame ühendust!</h1>
        <p>MEHH Meedia OÜ</p>
      </article>
    </div>
  )
}
