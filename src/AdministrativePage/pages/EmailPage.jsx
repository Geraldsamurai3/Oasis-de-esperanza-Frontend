"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Textarea } from "@/InformativePage/components/ui/textarea"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Mail, Send, Users, FileText, Eye, Edit, Trash2, MoreHorizontal, Plus, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/InformativePage/components/ui/dropdown-menu"

export default function EmailPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      subject: "Invitación Conferencia de Fe 2024",
      template: "Evento Especial",
      recipients: 1234,
      sent: 1234,
      opened: 892,
      clicked: 156,
      status: "Enviado",
      sentAt: "2024-01-15T10:30:00Z",
      createdAt: "2024-01-14T16:45:00Z",
    },
    {
      id: 2,
      subject: "Boletín Semanal - Enero 2024",
      template: "Newsletter",
      recipients: 1234,
      sent: 1234,
      opened: 1045,
      clicked: 234,
      status: "Enviado",
      sentAt: "2024-01-08T09:00:00Z",
      createdAt: "2024-01-07T14:20:00Z",
    },
    {
      id: 3,
      subject: "Recordatorio: Retiro Familiar",
      template: "Recordatorio",
      recipients: 456,
      sent: 0,
      opened: 0,
      clicked: 0,
      status: "Borrador",
      sentAt: null,
      createdAt: "2024-01-16T11:15:00Z",
    },
    {
      id: 4,
      subject: "Agradecimiento por Donaciones",
      template: "Agradecimiento",
      recipients: 89,
      sent: 89,
      opened: 67,
      clicked: 12,
      status: "Enviado",
      sentAt: "2024-01-10T15:30:00Z",
      createdAt: "2024-01-10T10:00:00Z",
    },
  ])

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Newsletter",
      description: "Plantilla para boletines semanales",
      lastUsed: "2024-01-08",
      usageCount: 12,
    },
    {
      id: 2,
      name: "Evento Especial",
      description: "Plantilla para invitaciones a eventos",
      lastUsed: "2024-01-15",
      usageCount: 8,
    },
    {
      id: 3,
      name: "Recordatorio",
      description: "Plantilla para recordatorios generales",
      lastUsed: "2024-01-16",
      usageCount: 15,
    },
    {
      id: 4,
      name: "Agradecimiento",
      description: "Plantilla para mensajes de agradecimiento",
      lastUsed: "2024-01-10",
      usageCount: 5,
    },
  ])

  const [activeTab, setActiveTab] = useState("campaigns")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("Todos")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const statuses = ["Borrador", "Programado", "Enviando", "Enviado", "Fallido"]

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "Todos" || campaign.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Enviado":
        return "bg-green-100 text-green-800"
      case "Enviando":
        return "bg-blue-100 text-blue-800"
      case "Programado":
        return "bg-yellow-100 text-yellow-800"
      case "Borrador":
        return "bg-gray-100 text-gray-800"
      case "Fallido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateOpenRate = (opened, sent) => {
    return sent > 0 ? ((opened / sent) * 100).toFixed(1) : 0
  }

  const calculateClickRate = (clicked, sent) => {
    return sent > 0 ? ((clicked / sent) * 100).toFixed(1) : 0
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

  const totalSubscribers = 1234
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0)
  const totalOpened = campaigns.reduce((sum, c) => sum + c.opened, 0)
  const avgOpenRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Email</h1>
          <p className="text-gray-600">Administra campañas de email y plantillas</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-sapphire-700 hover:bg-sapphire-800">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Campaña
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Suscriptores</p>
                <p className="text-2xl font-bold">{totalSubscribers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-sapphire-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emails Enviados</p>
                <p className="text-2xl font-bold">{totalSent.toLocaleString()}</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasa de Apertura</p>
                <p className="text-2xl font-bold">{avgOpenRate}%</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Campañas Activas</p>
                <p className="text-2xl font-bold">{campaigns.filter((c) => c.status === "Borrador").length}</p>
              </div>
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "campaigns"
                ? "border-sapphire-500 text-sapphire-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Campañas
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "templates"
                ? "border-sapphire-500 text-sapphire-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Plantillas
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "subscribers"
                ? "border-sapphire-500 text-sapphire-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Suscriptores
          </button>
        </nav>
      </div>

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar campañas..."
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
              </div>
            </CardContent>
          </Card>

          {/* Campaigns List */}
          <div className="grid gap-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.subject}</h3>
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                        <Badge variant="outline">{campaign.template}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Destinatarios:</span>
                          <div className="font-medium">{campaign.recipients.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Tasa de Apertura:</span>
                          <div className="font-medium">{calculateOpenRate(campaign.opened, campaign.sent)}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Tasa de Clics:</span>
                          <div className="font-medium">{calculateClickRate(campaign.clicked, campaign.sent)}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            {campaign.status === "Enviado" ? "Enviado:" : "Creado:"}
                          </span>
                          <div className="font-medium">{formatDate(campaign.sentAt || campaign.createdAt)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {campaign.status === "Borrador" && (
                        <Button size="sm" className="bg-sapphire-700 hover:bg-sapphire-800">
                          <Send className="h-4 w-4 mr-2" />
                          Enviar
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </DropdownMenuItem>
                          {campaign.status === "Borrador" && (
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Plantillas de Email</h2>
            <Button className="bg-sapphire-700 hover:bg-sapphire-800">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Plantilla
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>Último uso: {new Date(template.lastUsed).toLocaleDateString("es-ES")}</div>
                    <div>Usado {template.usageCount} veces</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Vista Previa
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === "subscribers" && (
        <div className="space-y-6">
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Gestión de Suscriptores</h3>
            <p className="text-gray-500">Funcionalidad en desarrollo</p>
          </div>
        </div>
      )}

      {/* Create Campaign Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Nueva Campaña de Email</CardTitle>
                  <CardDescription>Crea una nueva campaña de email para tus suscriptores</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowCreateForm(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Asunto del Email</label>
                <Input placeholder="Ej: Invitación a evento especial" required />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Plantilla</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                  <option value="">Seleccionar plantilla</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Destinatarios</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                  <option value="all">Todos los suscriptores ({totalSubscribers})</option>
                  <option value="active">Solo miembros activos</option>
                  <option value="donors">Solo donantes</option>
                  <option value="volunteers">Solo voluntarios</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Contenido del Email</label>
                <Textarea placeholder="Escribe el contenido de tu email..." rows={6} />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="schedule" className="rounded" />
                <label htmlFor="schedule" className="text-sm font-medium">
                  Programar envío
                </label>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="bg-sapphire-700 hover:bg-sapphire-800">Crear Campaña</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
