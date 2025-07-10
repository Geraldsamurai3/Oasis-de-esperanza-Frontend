// src/InformativePage/pages/Events.jsx
"use client"

import React, { useState, useEffect } from "react"
import { fetchPublicEvents } from "@/services/publicEventsService"
import { Button } from "@/InformativePage/components/ui/button"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Clock, MapPin, Link as LinkIcon } from "lucide-react"
import { motion } from 'framer-motion'
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function Events() {
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchPublicEvents()
        setEvents(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="p-6 text-lg">Cargando eventos…</p>
  if (error)   return <p className="p-6 text-red-600 text-lg">Error: {error.message}</p>

  const now   = new Date()
  const limit = new Date(now)
  limit.setDate(limit.getDate() + 5)

  // Solo futuros
  const upcoming = events
    .map(evt => ({ ...evt, start: new Date(evt.startDate) }))
    .filter(evt => evt.start >= now)
    .sort((a,b) => a.start - b.start)

  // Destacados: dentro de los próximos 5 días
  const featured = upcoming.filter(evt => evt.start <= limit)

  return (
    <motion.section
      id="eventos"
      className="py-16 bg-gray-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
    >
      <div className="container px-4 mx-auto">

        {/* --- Eventos Destacados --- */}
        {featured.length > 0 && (
          <motion.div variants={fadeIn} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Eventos Destacados (próximos 5 días)
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(evt => (
                <motion.div
                  key={evt.id}
                  variants={fadeIn}
                  className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-full"
                >
                  <div className="w-full h-48 bg-gray-100 overflow-hidden">
                    {evt.imageUrl
                      ? <img src={evt.imageUrl} alt={evt.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                    }
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <Badge className="w-fit bg-sapphire-100 text-sapphire-800 text-xs mb-2">
                      {evt.start.toLocaleDateString("es-ES")}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-2">{evt.title}</h3>
                    <p className="text-gray-600 flex items-center mb-4">
                      <MapPin className="mr-1" size={14} /> {evt.location}
                    </p>
                    <p className="text-gray-700 flex-grow mb-4">{evt.description}</p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="mr-1" size={14} /> {evt.startTime.slice(0,5)}
                      {evt.endTime && ` – ${evt.endTime.slice(0,5)}`}
                    </div>
                    {evt.additionalLink && (
                      <a
                        href={evt.additionalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sapphire-600 hover:underline"
                      >
                        <LinkIcon className="mr-1" size={14} /> Enlace
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Próximos Eventos (todos) --- */}
        <motion.div variants={fadeIn} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantente al día con nuestras actividades especiales y eventos comunitarios.
          </p>
          <div className="flex justify-center mt-6">
            <Badge variant="outline" className="text-sapphire-600 border-sapphire-600">
              {upcoming.length} eventos programados
            </Badge>
          </div>
        </motion.div>

        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={fadeUp}>
          {upcoming.map(evt => (
            <motion.div
              key={evt.id}
              variants={fadeIn}
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-full"
            >
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                {evt.imageUrl
                  ? <img src={evt.imageUrl} alt={evt.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                }
              </div>
              <div className="p-5 flex flex-col flex-1">
                <Badge className="w-fit bg-sapphire-100 text-sapphire-800 text-xs mb-2">
                  {evt.start.toLocaleDateString("es-ES")}
                </Badge>
                <h3 className="text-lg font-semibold mb-2">{evt.title}</h3>
                <p className="text-gray-600 flex items-center mb-4">
                  <MapPin className="mr-1" size={14} /> {evt.location}
                </p>
                <p className="text-gray-700 flex-grow mb-4">{evt.description}</p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="mr-1" size={14} /> {evt.startTime.slice(0,5)}
                  {evt.endTime && ` – ${evt.endTime.slice(0,5)}`}
                </div>
                {evt.additionalLink && (
                  <a
                    href={evt.additionalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sapphire-600 hover:underline"
                  >
                    <LinkIcon className="mr-1" size={14} /> Enlace
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  )
}
