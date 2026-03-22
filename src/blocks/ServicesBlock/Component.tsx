import type { ServicesBlock as ServicesBlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import React from 'react'
import { StylizedImage } from '@/blocks/ServicesBlock/StylizedImage'
import { LayersIcon } from 'lucide-react'

export const ServicesBlock: React.FC<ServicesBlockType> = (props) => {
  const { serviceItems, richText, media } = props
  const mediaDoc = typeof media === 'object' ? media : null

  return (
    <div id="services-block" className="bg-neutral-50 py-24">
      <div className="container">
        <div className="prose dark:prose-invert mb-10">
          {richText ? <RichText data={richText} enableGutter={false} /> : null}
        </div>
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center">
            <StylizedImage
              src={mediaDoc?.url || ''}
              width={mediaDoc?.width || 720}
              height={mediaDoc?.height || 680}
            />
          </div>
          <div className="text-base text-neutral-600 mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            {(serviceItems || []).map((item, index) => (
              <div key={index} className="group mt-10 first:mt-0">
                <div
                  className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                  {item?.richText ? <RichText data={item.richText} enableGutter={false} /> : null}
                  {item?.stack && (
                    <small className="flex gap-2 items-center mt-2 font-light text-xs">
                      <LayersIcon width={16} />
                      {item?.stack}
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
