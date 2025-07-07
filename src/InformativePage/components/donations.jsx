'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Heart } from "lucide-react"
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function Donations() {
  const tiposDonacion = [
    {
      titulo: "Diezmos y Ofrendas",
      descripcion: "Apoya el ministerio general de la iglesia",
      accion: "Donar Ahora",
    },
    {
      titulo: "Proyectos Especiales",
      descripcion: "Contribuye a proyectos específicos de construcción y equipamiento",
      accion: "Ver Proyectos",
    },
    {
      titulo: "Misiones",
      descripcion: "Apoya nuestros esfuerzos misioneros locales e internacionales",
      accion: "Apoyar Misiones",
    },
  ]

  return (
    <motion.section
      className="py-16 bg-sapphire-700 text-white"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
    >
      <div className="container px-4 mx-auto text-center">
        <motion.div variants={fadeIn}>
          <Heart className="h-16 w-16 mx-auto mb-6 text-sapphire-200" />
          <h2 className="text-3xl font-bold mb-4">Apoya Nuestro Ministerio</h2>
          <p className="text-xl text-sapphire-100 mb-8 max-w-2xl mx-auto">
            Tu generosidad nos permite continuar impactando vidas y sirviendo a nuestra comunidad. Cada donación, sin
            importar el monto, hace la diferencia.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
          variants={fadeUp}
        >
          {tiposDonacion.map((tipo, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="bg-white/10 border-sapphire-400 text-white h-full">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl">
                    {tipo.titulo}
                  </CardTitle>
                  <CardDescription className="text-sapphire-100 text-sm sm:text-base">
                    {tipo.descripcion}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-white text-sapphire-700 hover:bg-sapphire-50 text-sm sm:text-base">
                    {tipo.accion}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-sapphire-100 text-sm"
          variants={fadeIn}
        >
          Todas las donaciones son deducibles de impuestos. Recibirás un recibo por correo electrónico.
        </motion.p>
      </div>
    </motion.section>
  )
}
