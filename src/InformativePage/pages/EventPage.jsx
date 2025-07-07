"use client"

import { useParams } from "react-router-dom"
import { Button } from "@/InformativePage/components/ui/button"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Phone, Mail } from "lucide-react"
import { Navigate } from "react-router-dom"

const events = [
  {
    id: 1,
    title: "Conferencia de Fe 2024",
    description: "Tres días de enseñanza, adoración y comunión con invitados especiales.",
    fullDescription: `
      Únete a nosotros en esta conferencia especial donde tendremos invitados internacionales,
      talleres de crecimiento espiritual, y momentos de adoración profunda. 
      
      La conferencia incluye:
      - Sesiones de enseñanza bíblica
      - Talleres prácticos
      - Momentos de oración y ministración
      - Comunión y refrigerio
    `,
    date: "2024-03-15",
    endDate: "2024-03-17",
    time: "19:00",
    location: "Santuario Principal",
    address: "Av. Esperanza 123, Ciudad",
    image: "iglesia/eventos/conferencia-2024",
    speakers: ["Dr. Juan Pérez", "Pastora María González"],
    cost: "Entrada libre",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "eventos@oasisesperanza.org",
    },
  },
]

export default function EventPage() {
  const { id } = useParams()
  const event = events.find((e) => e.id.toString() === id)

  if (!event) {
    return <Navigate to="/eventos" replace />
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <CloudinaryImage
            publicId={event.image}
            alt={event.title}
            transformation="hero"
            className="w-full h-full opacity-20"
          />
        </div>
        <div className="relative container px-4 mx-auto text-center">
          <Badge className="bg-sapphire-700 mb-4">Evento Especial</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{event.description}</p>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative h-96 mb-8">
                <CloudinaryImage
                  publicId={event.image}
                  alt={event.title}
                  transformation="hero"
                  className="rounded-xl shadow-lg"
                />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre el Evento</h2>
              <div className="prose prose-lg text-gray-600">
                {event.fullDescription.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {event.speakers && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Oradores</h3>
                  <ul className="space-y-2">
                    {event.speakers.map((speaker, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-sapphire-700" />
                        {speaker}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Información del Evento</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-sapphire-700 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Fecha</p>
                      <p className="text-gray-600">
                        {new Date(event.date).toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {event.endDate && (
                          <>
                            {" - "}
                            {new Date(event.endDate).toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-sapphire-700 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Hora</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-sapphire-700 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">{event.location}</p>
                      {event.address && <p className="text-gray-500 text-sm">{event.address}</p>}
                    </div>
                  </div>

                  {event.cost && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-sapphire-700 mr-3 mt-0.5 text-center">$</div>
                      <div>
                        <p className="font-medium">Costo</p>
                        <p className="text-gray-600">{event.cost}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-sapphire-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-sapphire-700 mr-3" />
                    <a href={`tel:${event.contact.phone}`} className="text-gray-600 hover:text-sapphire-700">
                      {event.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-sapphire-700 mr-3" />
                    <a href={`mailto:${event.contact.email}`} className="text-gray-600 hover:text-sapphire-700">
                      {event.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full bg-sapphire-700 hover:bg-sapphire-800 py-3">Confirmar Asistencia</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
