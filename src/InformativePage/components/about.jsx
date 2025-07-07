'use client'

import { Badge } from "@/InformativePage/components/ui/badge"
import { motion } from 'framer-motion'
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function About() {
  return (
    <motion.section
      id="sobre-nosotros"
      className="py-16 bg-gray-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
    >
      <div className="container px-4 mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={fadeUp}
        >
          <motion.div
            className="order-last lg:order-first"
            variants={fadeIn}
          >
            {/* Imagen o ilustración */}
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={fadeIn}
          >
            <Badge className="bg-sapphire-100 text-sapphire-800">
              <motion.span variants={fadeIn}>
                Nuestra Historia
              </motion.span>
            </Badge>

            <motion.h2
              className="text-3xl font-bold text-gray-900"
              variants={fadeIn}
            >
              Sobre la Iglesia Oasis de Esperanza
            </motion.h2>

            <motion.p
              className="text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Fundada en 1995, la Iglesia Oasis de Esperanza ha sido un faro de luz…
            </motion.p>

            <motion.p
              className="text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Hoy somos una comunidad vibrante de más de 500 miembros…
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              variants={fadeIn}
            >
              <motion.div
                className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm"
                variants={fadeIn}
              >
                <p className="text-xl sm:text-2xl font-bold text-sapphire-700">
                  500+
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Miembros Activos
                </p>
              </motion.div>

              <motion.div
                className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm"
                variants={fadeIn}
              >
                <p className="text-xl sm:text-2xl font-bold text-sapphire-700">
                  25+
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Años de Ministerio
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
