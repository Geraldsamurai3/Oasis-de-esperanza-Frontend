'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Music, Baby, GraduationCap, Heart, Users2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function Ministries() {
  const navigate = useNavigate()

  const ministerios = [
    {
      id: "alabanza",
      titulo: "Ministerio de Alabanza",
      descripcion: "Únete a nuestro equipo de adoración y usa tus talentos musicales para glorificar a Dios.",
      icono: Music,
      ruta: "/ministerios/alabanza",
    },
    {
      id: "infantil",
      titulo: "Ministerio Infantil",
      descripcion: "Programas especiales para niños donde aprenden sobre el amor de Jesús de manera divertida.",
      icono: Baby,
      ruta: "/ministerios/infantil",
    },
    {
      id: "juvenil",
      titulo: "Ministerio Juvenil",
      descripcion: "Actividades y enseñanzas diseñadas especialmente para adolescentes y jóvenes adultos.",
      icono: GraduationCap,
      ruta: "/ministerios/juvenil",
    },
    {
      id: "ayuda",
      titulo: "Ministerio de Ayuda",
      descripcion: "Servimos a nuestra comunidad a través de programas de asistencia y apoyo social.",
      icono: Heart,
      ruta: "/ministerios/ayuda",
    },
    {
      id: "damas",
      titulo: "Ministerio de Damas",
      descripcion: "Un espacio para que las mujeres crezcan en fe, amistad y propósito juntas.",
      icono: Heart,
      ruta: "/ministerios/damas",
    },
    {
      id: "varones",
      titulo: "Ministerio de Varones",
      descripcion: "Fortaleciendo a los hombres para ser líderes piadosos en sus hogares y comunidad.",
      icono: Users2,
      ruta: "/ministerios/varones",
    },
  ]

  const handleMinisterioClick = (ruta) => {
    navigate(ruta)
  }

  return (
    <motion.section
      id="ministerios"
      className="py-16 bg-white"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
    >
      <div className="container px-4 mx-auto">
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Ministerios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tenemos ministerios para todas las edades y etapas de la vida. Encuentra tu lugar en nuestra familia.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={fadeUp}
        >
          {ministerios.map((ministerio) => {
            const IconComponent = ministerio.icono
            return (
              <motion.div
                key={ministerio.id}
                variants={fadeIn}
              >
                <Card
                  className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 h-full"
                  onClick={() => handleMinisterioClick(ministerio.ruta)}
                >
                  <CardHeader className="pb-3 sm:pb-4">
                    <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-sapphire-700 mx-auto mb-3 sm:mb-4" />
                    <CardTitle className="hover:text-sapphire-700 transition-colors text-lg sm:text-xl">
                      {ministerio.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <p className="text-gray-600 text-sm sm:text-base">
                      {ministerio.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
