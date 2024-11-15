import RichText from "@/components/RichText";
import React from "react";
import {StylizedImage} from "@/blocks/ServicesBlock/StylizedImage";

export const ServicesBlock = (props) => {
  console.log('props', props)
  const { serviceItems, richText, media } = props
  return (
    <div>
      <div className="container">
        <div className="prose dark:prose-invert mb-10">
          <RichText content={richText} enableGutter={false}/>
        </div>
        <div className="grid lg:grid-cols-2">
          <div className="">
            <StylizedImage src={media?.url} width={media?.width} height={media?.height} />
          </div>
          <div className="text-base text-neutral-600 mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            {serviceItems.map((item, index) => (
              <div key={index} className="group mt-10">
                <div
                  className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                  <RichText content={item?.richText} enableGutter={false}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
