// src/InformativePage/pages/Events.jsx
"use client"

import React, { useState, useEffect } from "react"
import { fetchPublicEvents } from "@/services/publicEventsService"
import { Button } from "@/InformativePage/components/ui/button"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Clock, ChevronLeft, ChevronRight, MapPin, Link as LinkIcon } from "lucide-react"
import { motion } from 'framer-motion'
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function Events() {
  const [events, setEvents]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [showAll, setShowAll]         = useState(false)

  const perPage = 3

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

  const totalPages = Math.ceil(events.length / perPage)
  const slice = showAll
    ? events
    : events.slice(
        currentPage * perPage,
        (currentPage + 1) * perPage
      )

  const prevPage = () =>
    setCurrentPage(p => Math.max(0, p - 1))
  const nextPage = () =>
    setCurrentPage(p => Math.min(totalPages - 1, p + 1))

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
        {/* Header */}
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantente al día con nuestras actividades especiales y eventos comunitarios.
          </p>
          <div className="flex justify-center mt-6">
            <Badge variant="outline" className="text-sapphire-600 border-sapphire-600">
              {events.length} eventos programados
            </Badge>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className={`grid gap-6 mb-8 ${
            showAll
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
          variants={fadeUp}
        >
          {slice.map(evt => (
            <motion.div
              key={evt.id}
              variants={fadeIn}
              className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-full"
            >
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                {evt.imageUrl ? (
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <Badge className="w-fit bg-sapphire-100 text-sapphire-800 text-xs mb-2">
                  {evt.startDate.split("-").reverse().join("/")}
                </Badge>
                <h3 className="text-lg font-semibold mb-2">{evt.title}</h3>
                <p className="text-gray-600 flex items-center mb-4">
                  <MapPin className="mr-1" size={14} />
                  {evt.location}
                </p>
                <p className="text-gray-700 flex-grow mb-4">
                  {evt.description}
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="mr-1" size={14} />
                  {evt.startTime.slice(0,5)}
                  {evt.endTime && ` – ${evt.endTime.slice(0,5)}`}
                </div>

                {evt.additionalLink && (
                  <a
                    href={evt.additionalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sapphire-600 hover:underline mb-4"
                  >
                    <LinkIcon className="mr-1" size={14} />
                    Ir al enlace
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination & Toggle */}
        <motion.div className="flex flex-col items-center gap-4" variants={fadeIn}>
          {!showAll && totalPages > 1 && (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="border-sapphire-700 text-sapphire-700 hover:bg-sapphire-50"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
              </Button>
              <span className="text-sm text-gray-600">
                Página {currentPage + 1} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="border-sapphire-700 text-sapphire-700 hover:bg-sapphire-50"
              >
                Siguiente <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="border-sapphire-700 text-sapphire-700 hover:bg-sapphire-50"
          >
            {showAll
              ? "Ver menos eventos"
              : `Ver todos los eventos (${events.length})`}
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
