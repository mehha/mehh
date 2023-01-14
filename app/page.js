export default function Home() {
  return (
      <>
          <div className="grid gap-3">
              <p className="font-bold text-5xl mb-8 uppercase">Mehh Meedia OÜ</p>
              <p className="flex flex-wrap gap-3"><span className="font-bold text-4xl">Kodulehed</span><span className="font-semibold text-4xl">E-poed</span></p>
              <p className="flex flex-wrap gap-3"><span className="font-semibold text-sm self-end">Haldusteenus</span><span className="font-bold">Sisu tootmine</span><span className="text-2xl">Liidestamine</span><span className="font-bold">Disain</span></p>
              <p className="flex flex-wrap gap-1 text-sm text-blue-100 w-1/3">Tehnoloogiad: <span>Wordpress/Woocommerce</span><span>PHP/JS</span><span>React/Next.js</span><span>Bootstrap/Tailwind</span></p>
          </div>
          <p className="my-6 text-red-200 hover:text-blue-100 transition-colors">Võta ühendust: <a className="font-semibold" href="mailto:info@mehh.ee">info@mehh.ee</a></p>
          <p><button className="px-6 py-2 bg-blue-900 hover:bg-red-800 transition-colors text-white text-sm font-semibold">Tehtud tööd</button></p>
      </>
  )
}
