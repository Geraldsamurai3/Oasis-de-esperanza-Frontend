"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Search, Mail, Phone, MessageSquare, User, Calendar, Eye, Archive, Reply, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/InformativePage/components/ui/dropdown-menu"

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+1 (555) 123-4567",
      subject: "Información sobre bautismo",
      message:
        "Hola, me gustaría obtener información sobre el proceso de bautismo para mi hijo de 12 años. ¿Cuáles son los requisitos y cuándo son las próximas fechas disponibles?",
      category: "Información General",
      status: "Nuevo",
      priority: "Media",
      createdAt: "2024-01-15T10:30:00Z",
      respondedAt: null,
      assignedTo: null,
      tags: ["bautismo", "niños"],
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      phone: "+1 (555) 987-6543",
      subject: "Solicitud de oración",
      message:
        "Buenos días, solicito oración por mi esposa que está pasando por un momento difícil de salud. Agradecería mucho sus oraciones y si es posible una visita pastoral.",
      category: "Oración",
      status: "En Proceso",
      priority: "Alta",
      createdAt: "2024-01-14T14:20:00Z",
      respondedAt: "2024-01-14T16:45:00Z",
      assignedTo: "Pastor Arturo",
      tags: ["oración", "salud", "visita pastoral"],
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      phone: "+1 (555) 456-7890",
      subject: "Interés en ministerio de damas",
      message:
        "Hola, soy nueva en la iglesia y me interesa participar en el ministerio de damas. ¿Podrían darme información sobre horarios y actividades?",
      category: "Ministerios",
      status: "Respondido",
      priority: "Media",
      createdAt: "2024-01-13T09:15:00Z",
      respondedAt: "2024-01-13T11:30:00Z",
      assignedTo: "Pastora Marianela",
      tags: ["ministerio", "damas", "nuevo miembro"],
    },
    {
      id: 4,
      name: "Roberto Silva",
      email: "roberto.silva@email.com",
      phone: "+1 (555) 321-0987",
      subject: "Donación para proyecto de construcción",
      message:
        "Estimados hermanos, me gustaría hacer una donación específica para el proyecto de construcción del nuevo salón. ¿Cuál es la mejor forma de hacerlo?",
      category: "Donaciones",
      status: "Nuevo",
      priority: "Media",
      createdAt: "2024-01-12T16:45:00Z",
      respondedAt: null,
      assignedTo: null,
      tags: ["donación", "construcción"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("Todos")
  const [filterCategory, setFilterCategory] = useState("Todas")
  const [filterPriority, setFilterPriority] = useState("Todas")
  const [selectedContact, setSelectedContact] = useState(null)

  const categories = ["Información General", "Oración", "Ministerios", "Eventos", "Donaciones", "Otro"]
  const statuses = ["Nuevo", "En Proceso", "Respondido", "Archivado"]
  const priorities = ["Baja", "Media", "Alta", "Urgente"]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "Todos" || contact.status === filterStatus
    const matchesCategory = filterCategory === "Todas" || contact.category === filterCategory
    const matchesPriority = filterPriority === "Todas" || contact.priority === filterPriority

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const updateContactStatus = (contactId, newStatus) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              status: newStatus,
              respondedAt: newStatus === "Respondido" ? new Date().toISOString() : contact.respondedAt,
            }
          : contact,
      ),
    )
  }

  const assignContact = (contactId, assignee) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? { ...contact, assignedTo: assignee, status: "En Proceso" } : contact,
      ),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Nuevo":
        return "bg-blue-100 text-blue-800"
      case "En Proceso":
        return "bg-yellow-100 text-yellow-800"
      case "Respondido":
        return "bg-green-100 text-green-800"
      case "Archivado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Baja":
        return "bg-gray-100 text-gray-800"
      case "Media":
        return "bg-blue-100 text-blue-800"
      case "Alta":
        return "bg-orange-100 text-orange-800"
      case "Urgente":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Contactos</h1>
          <p className="text-gray-600">Administra los mensajes y solicitudes de contacto</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contactos</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-sapphire-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nuevos</p>
                <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "Nuevo").length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Proceso</p>
                <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "En Proceso").length}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Respondidos</p>
                <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "Respondido").length}</p>
              </div>
              <Reply className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar contactos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todos">Todos los estados</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todas">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todas">Todas las prioridades</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                    <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                    <Badge className={getPriorityColor(contact.priority)}>{contact.priority}</Badge>
                    <Badge variant="outline">{contact.category}</Badge>
                  </div>

                  <h4 className="font-medium text-gray-800 mb-2">{contact.subject}</h4>
                  <p className="text-gray-600 mb-3 line-clamp-2">{contact.message}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {contact.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {contact.phone}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(contact.createdAt)}
                    </div>
                    {contact.assignedTo && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Asignado a: {contact.assignedTo}
                      </div>
                    )}
                  </div>

                  {contact.tags && contact.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedContact(contact)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => updateContactStatus(contact.id, "En Proceso")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Marcar En Proceso
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateContactStatus(contact.id, "Respondido")}>
                        <Reply className="h-4 w-4 mr-2" />
                        Marcar Respondido
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => assignContact(contact.id, "Pastor Arturo")}>
                        <User className="h-4 w-4 mr-2" />
                        Asignar a Pastor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateContactStatus(contact.id, "Archivado")}>
                        <Archive className="h-4 w-4 mr-2" />
                        Archivar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedContact.name}</CardTitle>
                  <CardDescription>{selectedContact.email}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedContact(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(selectedContact.status)}>{selectedContact.status}</Badge>
                <Badge className={getPriorityColor(selectedContact.priority)}>{selectedContact.priority}</Badge>
                <Badge variant="outline">{selectedContact.category}</Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Asunto:</h4>
                <p className="text-gray-700">{selectedContact.subject}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Mensaje:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Información de Contacto:</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Email:</strong> {selectedContact.email}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {selectedContact.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Detalles:</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Recibido:</strong> {formatDate(selectedContact.createdAt)}
                    </p>
                    {selectedContact.respondedAt && (
                      <p>
                        <strong>Respondido:</strong> {formatDate(selectedContact.respondedAt)}
                      </p>
                    )}
                    {selectedContact.assignedTo && (
                      <p>
                        <strong>Asignado a:</strong> {selectedContact.assignedTo}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {selectedContact.tags && selectedContact.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Etiquetas:</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedContact.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                <Button
                  className="bg-sapphire-700 hover:bg-sapphire-800"
                  onClick={() => {
                    updateContactStatus(selectedContact.id, "Respondido")
                    setSelectedContact(null)
                  }}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Marcar como Respondido
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    assignContact(selectedContact.id, "Pastor Arturo")
                    setSelectedContact(null)
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Asignar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron contactos</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "Todos" || filterCategory !== "Todas" || filterPriority !== "Todas"
                ? "Intenta ajustar los filtros de búsqueda"
                : "No hay mensajes de contacto disponibles"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
