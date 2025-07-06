"use client"

import { Button } from "@/InformativePage/components/ui/button"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

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

  // Pon aquí la URL de tu imagen
  const heroImageUrl = "https://res.cloudinary.com/dss0mxa8r/image/upload/c_crop,ar_1:1/v1751782861/Oasis_pagina_principal_djnbhj.png"

  return (
    <section
      id="inicio"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-sapphire-50 to-blue-50"
    >
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-sapphire-100 text-sapphire-800 hover:bg-sapphire-100">
              Bienvenidos a nuestra comunidad
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Oasis de <span className="text-sapphire-600">Esperanza</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Un lugar donde encontrarás paz, esperanza y una comunidad que te ama. Únete a nosotros en este viaje de fe
              y crecimiento espiritual.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
            </div>
          </div>
          <div className="relative order-first lg:order-last">
            <img
              src={heroImageUrl}
              alt="Iglesia Oasis de Esperanza"
              className="w-full h-auto max-w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
