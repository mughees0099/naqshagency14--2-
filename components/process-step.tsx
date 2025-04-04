"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface ProcessStepProps {
  number: number
  title: string
  description: string
  delay?: number
}

export default function ProcessStep({ number, title, description, delay = 0 }: ProcessStepProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.175, 0.885, 0.32, 1.275],
      },
    },
  }

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.1 + 0.2,
        ease: [0.175, 0.885, 0.32, 1.275],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="w-full lg:w-1/5 mb-12 lg:mb-0 bg-white p-8 rounded-lg shadow-md relative z-10 group hover:-translate-y-2 transition-all duration-500"
      whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div
        variants={numberVariants}
        className="w-16 h-16 bg-[#e5792c] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
      >
        {number}
      </motion.div>
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  )
}

