import {stack} from "../../data/stack";
import {lowerServices} from "../../data/lower-services";
import {getDictionary} from "./dictionaries";
import Button from "../../components/button";
import ButtonFancy from "../../components/button-fancy";
import LocaleSwitcher from "../../components/locale-switcher";

export default async function Home({ params: { lang } }) {

    const dict = await getDictionary(lang); // en

  return (
      <>
          <div className="grid gap-3">
              <LocaleSwitcher />
              <h1 className="text-4xl md:text-7xl mb-8 uppercase font-sans-serif tracking-wider text-transparent">{dict.general.mehh_meedia_ou}</h1>
              <div className="flex flex-wrap gap-3">
                  <span className="text-2xl md:text-4xl uppercase font-sans-serif">{dict.general.websites}</span>
                  <span className="text-2xl md:text-4xl uppercase font-sans-serif">{dict.general.e_stores}</span>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                  {lowerServices.map((singleService, id) => {
                      let title = singleService.title
                      return (
                        <span key={id} className="font-bold">{dict.general.title}</span>
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
              <div className="flex flex-wrap gap-3">
                  <Button title={dict.general.contact} href="mailto:info@mehh.ee"/>
                  <ButtonFancy title={dict.general.completed_work}/>
              </div>
          </div>
      </>
  )
}
