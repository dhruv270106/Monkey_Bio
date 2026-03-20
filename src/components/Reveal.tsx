'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  width?: 'fit-content' | '100%'
  delay?: number
}

export const Reveal = ({ children, width = 'fit-content', delay = 0.25 }: RevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView])

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: "100%" },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ 
           duration: 0.8, 
           delay, 
           ease: [0.33, 1, 0.68, 1] // Custom cubic-bezier for refined sliding
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
