'use client'

import {stack} from "../data/stack";
import {lowerServices} from "../data/lower-services";

export default function Home() {
  return (
      <>
          <div className="grid gap-3">
              <h1 className="text-4xl md:text-7xl mb-8 uppercase font-sans-serif tracking-wider text-transparent">Mehh Meedia OÜ</h1>
              <div className="flex flex-wrap gap-3">
                  <span className="text-2xl md:text-4xl uppercase font-sans-serif">Kodulehed</span>
                  <span className="text-2xl md:text-4xl uppercase font-sans-serif">E-poed</span>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                  {lowerServices.map((singleService, id) => {
                      return (
                        <span key={id} className="font-bold">{singleService.title}</span>
                      )
                  })}
              </div>
              <div className="flex flex-wrap gap-1 text-xs mb-6">
                  {stack.map((singleStack, id) => {
                      return (
                        <span key={id} className="bg-white rounded-3xl px-2 py-1 text-black transition-all hover:bg-blue-100">{singleStack.title}</span>
                      )
                  })}
              </div>
              <div className="flex flex-wrap gap-2">
                  <a href="mailto:info@mehh.ee" className="btn">Kontakt</a>
                  <button className="btn">Tehtud tööd</button>
              </div>
          </div>
      </>
  )
}
