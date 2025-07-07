// src/InformativePage/components/ServiceSchedule.jsx
'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Clock } from "lucide-react"
import { motion } from 'framer-motion'
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function ServiceSchedule() {
  const servicios = [
    {
      titulo:     "Viernes",
      descripcion: "Santa Cruz, Guanacaste",
      hora:       "7:00 PM",
      detalle:    "Culto de adoración y predicación",
    },
    {
      titulo:     "Sábado",
      descripcion: "Jicaral, Puntarenas",
      hora:       "6:00 PM",
      detalle:    "Culto de adoración y predicación",
    },
    {
      titulo:     "Domingo",
      descripcion: "Nandayure, Guanacaste",
      hora:       "8:00 AM",
      detalle:    "Culto de adoración y predicación",
    },
  ]

  return (
    <motion.section
      className="py-16 bg-white"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
      id="service-schedule"
    >
      <div className="container px-4 mx-auto">
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Horarios de Servicio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Te esperamos en nuestros servicios semanales llenos de adoración, enseñanza y comunión.
          </p>
        </motion.div>
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" variants={fadeUp}>
          {servicios.map((servicio, idx) => (
            <motion.div key={idx} variants={fadeIn}>
              <Card className="text-center border-sapphire-200 h-full">
                <CardHeader className="pb-4">
                  <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-sapphire-700 mx-auto mb-4" />
                  <CardTitle>{servicio.titulo}</CardTitle>
                  <CardDescription>{servicio.descripcion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl sm:text-2xl font-bold text-sapphire-700">{servicio.hora}</p>
                  <p className="text-gray-600">{servicio.detalle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
