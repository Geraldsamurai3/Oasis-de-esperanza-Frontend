// src/AdministrativePage/components/ContactsPage.jsx
"use client"

import React, { useState, useMemo } from "react"
import Swal from "sweetalert2"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Badge } from "@/InformativePage/components/ui/badge"
import {
  Search, Mail, Phone, MessageSquare, User, Calendar,
  Eye, Archive, Reply, MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem
} from "@/InformativePage/components/ui/dropdown-menu"
import { useContacts } from "../../hooks/useContacts"

const ITEMS_PER_PAGE = 10

export default function ContactsPage() {
  const {
    contacts,
    loading,
    error,
    updateStatus,
    assign,
  } = useContacts()

  const [searchTerm, setSearchTerm]           = useState("")
  const [filterStatus, setFilterStatus]       = useState("Todos")
  const [filterReason, setFilterReason]       = useState("Todos")
  const [selectedContact, setSelectedContact] = useState(null)
  const [currentPage, setCurrentPage]         = useState(1)

  const statuses = ["Todos","Nuevo","En Proceso","Respondido","Archivado"]
  const reasons  = ["Todos", ...new Set(contacts.map(c => c.reason))]

  // Definimos las transiciones válidas
  const transitions = {
    "Nuevo":       [],
    "En Proceso":  ["Respondido", "Archivado"],
    "Respondido":  ["Archivado"],
    "Archivado":   []
  }

  const getStatusColor = status => {
    switch (status) {
      case "Nuevo":
        return "bg-blue-100 text-blue-800"
      case "En Proceso":
        return "bg-yellow-100 text-yellow-800"       // <-- amarillo
      case "Respondido":
        return "bg-green-100 text-green-800"
      case "Archivado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = iso =>
    new Date(iso).toLocaleDateString("es-ES", {
      year:   "numeric",
      month:  "short",
      day:    "numeric",
      hour:   "2-digit",
      minute: "2-digit",
    })

  // Filtrado memoizado
  const filtered = useMemo(() => {
    return contacts.filter(c => {
      const text = `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase()
      if (searchTerm && !text.includes(searchTerm.toLowerCase())) return false
      if (filterStatus !== "Todos" && c.status !== filterStatus)       return false
      if (filterReason !== "Todos" && c.reason !== filterReason)       return false
      return true
    })
  }, [contacts, searchTerm, filterStatus, filterReason])

  // Paginación
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pageSlice  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleAssign = async (id) => {
    await assign(id, "Administrador")
    Swal.fire({
      icon: "success",
      title: "Asignado y pasó a En Proceso",
      timer: 1500,
      showConfirmButton: false,
    })
  }

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus(id, newStatus)
    Swal.fire({
      icon: "success",
      title: `Estado cambiado a "${newStatus}"`,
      timer: 1500,
      showConfirmButton: false,
    })
  }

  if (loading) return <p className="p-6 text-lg">Cargando contactos…</p>
  if (error)   return <p className="p-6 text-red-600 text-lg">Error: {error.message}</p>

  return (
    <div className="space-y-6">
      {/* Header + filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión Contacto</h1>
          <p className="text-gray-600">Administra los mensajes recibidos</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border rounded-md"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            className="px-3 py-2 border rounded-md"
            value={filterReason}
            onChange={e => setFilterReason(e.target.value)}
          >
            {reasons.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid gap-4">
        {pageSlice.map(contact => {
          const allowed = transitions[contact.status] || []
          return (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                      <Badge variant="outline">{contact.reason}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <Eye className="mr-1 h-4 w-4" /> Ver
                    </Button>
                    {contact.status !== "Nuevo" && allowed.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {allowed.includes("Respondido") && (
                            <DropdownMenuItem onClick={() => handleStatusChange(contact.id, "Respondido")}>
                              <Reply className="mr-1 h-4 w-4" /> Marcar Respondido
                            </DropdownMenuItem>
                          )}
                          {allowed.includes("Archivado") && (
                            <DropdownMenuItem onClick={() => handleStatusChange(contact.id, "Archivado")}>
                              <Archive className="mr-1 h-4 w-4" /> Archivar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-gray-700 line-clamp-2">{contact.message}</p>
              </CardContent>
            </Card>
          )
        })}

        {pageSlice.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No hay resultados</h3>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Anterior
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i+1}
              className={`px-3 py-1 rounded ${currentPage === i+1 ? "bg-sapphire-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setCurrentPage(i+1)}
            >
              {i+1}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}

      {/* Modal de detalle */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {selectedContact.firstName} {selectedContact.lastName}
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setSelectedContact(null)}>
                  ✕
                </Button>
              </div>
              <CardDescription>{selectedContact.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div><strong>Teléfono:</strong> {selectedContact.phone}</div>
              <div><strong>Motivo:</strong> {selectedContact.reason}</div>
              <div>
                <strong>Mensaje:</strong>
                <p className="mt-1 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(selectedContact.status)}>
                  {selectedContact.status}
                </Badge>
                <Badge variant="outline">{selectedContact.reason}</Badge>
              </div>
              <div><strong>Recibido:</strong> {formatDate(selectedContact.createdAt)}</div>
              {selectedContact.respondedAt && (
                <div><strong>Respondido:</strong> {formatDate(selectedContact.respondedAt)}</div>
              )}
              {selectedContact.assignedTo && (
                <div><strong>Asignado a:</strong> {selectedContact.assignedTo}</div>
              )}

              <div className="flex space-x-2 pt-4">
                {selectedContact.status === "Nuevo" && !selectedContact.assignedTo && (
                  <Button
                    className="bg-sapphire-600 hover:bg-sapphire-700 text-white"
                    onClick={() => { handleAssign(selectedContact.id); setSelectedContact(null) }}
                  >
                    <User className="mr-1 h-4 w-4" /> Asignar a Admin
                  </Button>
                )}
                {selectedContact.status === "En Proceso" && (
                  <>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => { handleStatusChange(selectedContact.id, "Respondido"); setSelectedContact(null) }}
                    >
                      <Reply className="mr-1 h-4 w-4" /> Marcar Respondido
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => { handleStatusChange(selectedContact.id, "Archivado"); setSelectedContact(null) }}
                    >
                      <Archive className="mr-1 h-4 w-4" /> Archivar
                    </Button>
                  </>
                )}
                {selectedContact.status === "Respondido" && (
                  <Button
                    variant="outline"
                    onClick={() => { handleStatusChange(selectedContact.id, "Archivado"); setSelectedContact(null) }}
                  >
                    <Archive className="mr-1 h-4 w-4" /> Archivar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
