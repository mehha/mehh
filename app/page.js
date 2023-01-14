export default function Home() {
  return (
      <>
          <div className="grid gap-3">
              <p className="font-bold text-3xl md:text-5xl mb-8 uppercase">Mehh Meedia OÜ</p>
              <p className="flex flex-wrap gap-3">
                  <span className="font-bold text-2xl md:text-4xl">Kodulehed</span>
                  <span className="font-semibold text-2xl md:text-4xl">E-poed</span>
              </p>
              <p className="flex flex-wrap gap-3">
                  <span className="font-semibold text-sm self-end">Haldusteenus</span>
                  <span className="font-bold">Disain</span>
                  <span className="font-bold">Sisu tootmine</span>
              </p>
              <p className="flex flex-wrap gap-1 text-xs mt-4">
                  <span className="bg-yellow-50 px-2 py-1 text-gray-600 rounded-2xl">Wordpress/Woocommerce</span>
                  <span className="bg-yellow-50 px-2 py-1 text-gray-600 rounded-2xl">PHP/JS</span>
                  <span className="bg-yellow-50 px-2 py-1 text-gray-600 rounded-2xl">React/Next.js</span>
                  <span className="bg-yellow-50 px-2 py-1 text-gray-600 rounded-2xl">Bootstrap/Tailwind</span>
              </p>
          </div>
          <p className="my-6 text-red-100 hover:text-blue-100 transition-colors">Võta ühendust: <a className="font-semibold" href="mailto:info@mehh.ee">info@mehh.ee</a></p>
          <p>
              <button className="px-6 py-2 bg-blue-900 hover:bg-red-800 transition-colors text-white text-sm font-semibold">Tehtud tööd</button>
          </p>
      </>
  )
}
