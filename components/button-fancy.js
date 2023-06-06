'use client'

import React from 'react';
import {motion} from "framer-motion";
import {Fancybox} from "@fancyapps/ui";
import {portfolio} from "../data/portfolio";

const ButtonFancy = ({title}) => {

    const runFancybox = () => {
        Fancybox.show(portfolio, {
            caption : function( fancybox, slide ) {
                console.log('slide', slide)
                let url = slide?.url || '';
                let title = slide.title || 'Link';
                let caption;

              if ( slide.type === 'image' ) {
                caption = (url.length ? '<span class="font-bold">Link:</span> <a target="_blank" class="my-5 inline-block underline text-blue" href="' + url + '">' + title + '</a>' : '')
              }
    
              return caption;
            },
        })
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{
              scale: {
                type: "spring",
                damping: 15,
                stiffness: 400,
                restDelta: 0.001
              }
            }}
            onClick={runFancybox}
            className="btn cursor-pointer"
        >{title}
        </motion.button>
    );
};

export default ButtonFancy;