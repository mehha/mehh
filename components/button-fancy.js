'use client'

import React from 'react';
import {motion} from "framer-motion";
import {Fancybox} from "@fancyapps/ui";
import {portfolio} from "../data/portfolio";

const ButtonFancy = ({title}) => {

    const runFancybox = () => {
        Fancybox.show(portfolio)
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