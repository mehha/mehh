import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Ads API aruandlustööriist | Mehh Meedia OÜ',
  description:
    'MEHH Meedia OÜ sisemine Google Ads API aruandlustööriist kampaaniate tulemuste turvaliseks analüüsimiseks.',
  alternates: {
    canonical: '/google-ads-api',
  },
}

export default function GoogleAdsAPIPage() {
  return (
    <article className="container my-16 max-w-4xl">
      <div className="prose max-w-none dark:prose-invert">
        <h1>Google Ads API aruandlustööriist</h1>
        <p className="lead">
          MEHH Meedia OÜ kasutab privaatset sisemist tööriista ettevõtte hallatavate Google Adsi
          kontode aruandluseks ja analüüsiks.
        </p>

        <h2>Eesmärk</h2>
        <p>
          Tööriist aitab volitatud sisekasutajatel hinnata kampaaniate tulemusi, kulusid, klikke,
          konversioone ja konto struktuuri. Saadud teavet kasutatakse aruandluseks ning kampaaniate
          käsitsi optimeerimise toetamiseks.
        </p>

        <h2>Funktsioonid ja piirangud</h2>
        <ul>
          <li>Google Adsi kliendikontode ja kampaaniate loendi pärimine.</li>
          <li>Kampaaniate, reklaamirühmade, reklaamide ja märksõnade andmete lugemine.</li>
          <li>Näitamiste, klikkide, kulude ja konversioonide analüüsimine.</li>
          <li>Juurdepääs ainult kasutaja Google Adsi õigustega lubatud kontodele.</li>
        </ul>
        <p>
          Praegune integratsioon on ainult lugemiseks. See ei loo, muuda, peata ega kustuta
          kampaaniaid, reklaame, eelarveid, kasutajaid ega arveldusandmeid.
        </p>

        <h2>Tehniline lahendus</h2>
        <p>
          Integratsioon kasutab Google’i ametlikku avatud lähtekoodiga{' '}
          <a href="https://github.com/googleads/google-ads-mcp">Google Ads MCP serverit</a> ning
          Google OAuthi. Tööriista kasutavad ainult MEHH Meedia OÜ volitatud sisekasutajad.
        </p>

        <h2>Andmete kasutamine ja privaatsus</h2>
        <p>
          Google Ads API kaudu saadud andmeid kasutatakse ainult soovitud aruandluseks ja
          analüüsiks. Andmeid ei müüda, ei avaldata volitamata isikutele ega kasutata
          üldotstarbeliste tehisintellektimudelite treenimiseks.
        </p>
        <p>
          Google’i API-dest saadud teabe kasutamine järgib{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>{' '}
          nõudeid, sealhulgas Limited Use nõudeid. Täpsem teave andmete ligipääsu, kasutamise,
          säilitamise ja jagamise kohta on meie{' '}
          <Link href="/privaatsuspoliitika">privaatsuspoliitikas</Link>.
        </p>

        <h2>Kontakt</h2>
        <p>
          Vastutav töötleja on MEHH Meedia OÜ, registrikood 16677696. Küsimused saab saata
          aadressile <a href="mailto:info@mehh.ee">info@mehh.ee</a>.
        </p>
      </div>
    </article>
  )
}
