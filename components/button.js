'use client'

import React from 'react';
import {motion} from "framer-motion";

const Button = ({title, href}) => {

    return (
        <motion.a
            whileHover={{ scale: 1.1 }}
            transition={{
              scale: {
                type: "spring",
                damping: 15,
                stiffness: 400,
                restDelta: 0.001
              }
            }}
            href={href}
            className="btn"
        >{title}
        </motion.a>
    );
};

export default Button;