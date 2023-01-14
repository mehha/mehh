export default function Home() {
  return (
      <>
          <div className="grid gap-3">
              <p className="flex flex-wrap gap-3"><span className="font-bold text-5xl">Kodulehed</span><span className="font-semibold text-4xl">E-poed</span></p>
              <p className="flex flex-wrap gap-3"><span className="font-semibold text-sm self-end">Haldusteenus</span><span className="font-bold">Sisu tootmine</span><span className="text-2xl">Liidestamine</span><span className="font-bold">Disain</span></p>
              <p className="flex flex-wrap gap-1 text-sm text-blue-100">Tehnoloogiad: <span>Wordpress/Woocommerce</span><span>PHP/JS</span><span>React/Next.js</span><span>Bootstrap/Tailwind</span></p>
          </div>
          <p className="mt-4 text-red-200 hover:text-red-100 transition-colors">Võta ühendust: <a className="font-semibold" href="mailto:info@mehh.ee">info@mehh.ee</a></p>
      </>
  )
}
