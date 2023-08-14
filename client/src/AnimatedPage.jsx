import React from 'react'
import { motion } from 'framer-motion'

const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const AnimatedPage = ({children}) => {
    return (
        <div>
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeVariants}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default AnimatedPage
