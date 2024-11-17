import RichText from "@/components/RichText";
import React from "react";
import {StylizedImage} from "@/blocks/ServicesBlock/StylizedImage";
import { LayersIcon } from "lucide-react";

export const ServicesBlock = (props) => {
  const { serviceItems, richText, media } = props
  return (
    <div id="services-block" className="bg-neutral-50 py-24">
      <div className="container">
        <div className="prose dark:prose-invert mb-10">
          <RichText content={richText} enableGutter={false}/>
        </div>
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center">
            <StylizedImage src={media?.url} width={media?.width} height={media?.height} />
          </div>
          <div className="text-base text-neutral-600 mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            {serviceItems.map((item, index) => (
              <div key={index} className="group mt-10 first:mt-0">
                <div
                  className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                  <RichText content={item?.richText} enableGutter={false}/>
                  {item?.stack && <small className="flex gap-2 items-center mt-1 font-light"><LayersIcon width={16}/>{item?.stack}</small>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
