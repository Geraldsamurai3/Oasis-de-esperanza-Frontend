// src/AdministrativePage/components/EventsPage.jsx
"use client"

import React, { useState } from "react"
import { Button } from "@/InformativePage/components/ui/button"
import AddEventForm from "@/AdministrativePage/components/AddEventForm"
import EditEventForm from "@/AdministrativePage/components/EditEventForm"
import { useEvents } from "../../hooks/useEvents"
import { MapPin, Calendar, Clock } from "lucide-react"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"

const ITEMS_PER_PAGE = 6

export default function EventsPage() {
  const {
    events,
    loading,
    error,
    saving,
    fetchEvents,
    removeEvent,
  } = useEvents()

  const [isAdding, setIsAdding] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })
    if (result.isConfirmed) {
      await removeEvent(id)
      await fetchEvents()
      Swal.fire("Eliminado", "El evento ha sido eliminado.", "success")
    }
  }

  // format "YYYY-MM-DD..." → "DD/MM/YYYY"
  const formatDate = (isoString) => {
    const raw = isoString.split("T")[0] // "YYYY-MM-DD"
    const [y, m, d] = raw.split("-")
    return `${d}/${m}/${y}`
  }

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE)
  const paginatedEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (loading) return <p className="p-6 text-lg">Cargando eventos...</p>
  if (error) return <p className="p-6 text-red-600 text-lg">Error: {error.message}</p>

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Eventos</h1>
        <Button
          className="bg-sapphire-600 hover:bg-sapphire-700 text-white"
          onClick={() => setIsAdding(true)}
        >
          + Agregar Evento
        </Button>
      </div>

      {/* Add / Edit */}
      {isAdding && (
        <AddEventForm
          onSuccess={async () => {
            setIsAdding(false)
            await fetchEvents()
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {editingEvent && (
        <EditEventForm
          event={editingEvent}
          onSuccess={async () => {
            setEditingEvent(null)
            await fetchEvents()
          }}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEvents.map((evt) => (
          <div
            key={evt.id}
            className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-full"
          >
            {/* Imagen más alta */}
            <div className="w-full h-64 bg-gray-100 overflow-hidden">
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
              {/* Título */}
              <h2 className="text-2xl font-semibold mb-2">{evt.title}</h2>

              {/* Ubicación, Fecha y Hora */}
              <div className="space-y-2 mb-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="mr-1" size={16} />
                  {evt.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1" size={16} />
                  {formatDate(evt.startDate)}
                  {evt.endDate && ` – ${formatDate(evt.endDate)}`}
                </div>
                {evt.startTime && (
                  <div className="flex items-center">
                    <Clock className="mr-1" size={16} />
                    {evt.startTime.slice(0, 5)}
                    {evt.endTime && ` – ${evt.endTime.slice(0, 5)}`}
                  </div>
                )}
              </div>

              {/* Descripción con scroll si es muy larga */}
              <p className="text-gray-700 mb-4 max-h-32 overflow-auto">
                {evt.description}
              </p>

              {/* Botones */}
              <div className="mt-auto flex justify-end space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-sapphire-600 text-sapphire-600 hover:bg-sapphire-50"
                  onClick={() => setEditingEvent(evt)}
                  disabled={saving}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(evt.id)}
                  disabled={saving}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Anterior
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-sapphire-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  )
}
