'use client'

import { Button } from "@/InformativePage/components/ui/button"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { fadeUp, fadeIn } from "@/InformativePage/animations/globalVariants"

export default function Hero() {
  const navigate = useNavigate()

  const scrollToEvents = () => {
    const element = document.getElementById("eventos")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    const element = document.getElementById("contacto")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const heroImageUrl =
    "https://res.cloudinary.com/dss0mxa8r/image/upload/c_crop,ar_1:1/v1751782861/Oasis_pagina_principal_djnbhj.png"

  return (
    <motion.section
      id="inicio"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-sapphire-50 to-blue-50"
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
          <motion.div className="space-y-6" variants={fadeIn}>
            <Badge className="bg-sapphire-100 text-sapphire-800 hover:bg-sapphire-100">
              <motion.span variants={fadeIn}>
                Bienvenidos a nuestra comunidad
              </motion.span>
            </Badge>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
              variants={fadeIn}
            >
              Oasis de <span className="text-sapphire-600">Esperanza</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Un lugar donde encontrarás paz, esperanza y una comunidad que te ama. Únete a nosotros en este viaje de fe
              y crecimiento espiritual.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              variants={fadeIn}
            >
              <Button
                size="lg"
                className="bg-sapphire-700 hover:bg-sapphire-800 w-full sm:w-auto"
                onClick={scrollToEvents}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Ver Próximos Eventos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sapphire-700 text-sapphire-700 hover:bg-sapphire-50 bg-transparent w-full sm:w-auto"
                onClick={scrollToContact}
              >
                <Users className="mr-2 h-5 w-5" />
                Únete a Nosotros
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-first lg:order-last"
            variants={fadeIn}
          >
            <img
              src={heroImageUrl}
              alt="Iglesia Oasis de Esperanza"
              className="w-full h-auto max-w-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
