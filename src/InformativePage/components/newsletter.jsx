'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/InformativePage/components/ui/input"
import { Button } from "@/InformativePage/components/ui/button"
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function Newsletter() {
  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
      id="newsletter"
    >
      <div className="container px-4 mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-4"
          variants={fadeIn}
        >
          Mantente Conectado
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-8 max-w-2xl mx-auto"
          variants={fadeIn}
        >
          Suscríbete a nuestro boletín para recibir actualizaciones sobre eventos, enseñanzas y noticias de la iglesia.
        </motion.p>
        <motion.div
          className="max-w-sm sm:max-w-md mx-auto"
          variants={fadeIn}
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 text-sm sm:text-base"
            />
            <Button className="bg-sapphire-700 hover:bg-sapphire-800 w-full sm:w-auto text-sm sm:text-base">
              Suscribirse
            </Button>
          </div>
          <motion.p
            className="text-xs text-gray-500 mt-2"
            variants={fadeIn}
          >
            No compartimos tu información. Puedes cancelar en cualquier momento.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
}
