"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Textarea } from "@/InformativePage/components/ui/textarea"
import { Badge } from "@/InformativePage/components/ui/badge"
import {
  Plus,
  Search,
  Globe,
  DollarSign,
  Users,
  Target,
  Edit,
  Trash2,
  MoreHorizontal,
  MapPin,
  Calendar,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/InformativePage/components/ui/dropdown-menu"

export default function MissionsPage() {
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Misión Guatemala 2024",
      description: "Construcción de escuela y evangelismo en comunidades rurales de Guatemala.",
      location: "Guatemala, Centroamérica",
      startDate: "2024-06-15",
      endDate: "2024-06-29",
      budget: 25000,
      raised: 18500,
      participants: 12,
      maxParticipants: 15,
      status: "Activa",
      category: "Internacional",
      leader: "Pastor Arturo Alvarado",
      image: "iglesia/misiones/guatemala-2024",
    },
    {
      id: 2,
      title: "Alimentando Esperanza",
      description: "Programa de alimentación para familias necesitadas en nuestra comunidad local.",
      location: "Ciudad Local",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      budget: 12000,
      raised: 8900,
      participants: 25,
      maxParticipants: 30,
      status: "Activa",
      category: "Local",
      leader: "Pastora Marianela Bolaños",
      image: "iglesia/misiones/alimentando-esperanza",
    },
    {
      id: 3,
      title: "Construcción Templo Rural",
      description: "Apoyo en la construcción de un templo en zona rural del país.",
      location: "Zona Rural Nacional",
      startDate: "2024-04-01",
      endDate: "2024-08-31",
      budget: 35000,
      raised: 12000,
      participants: 8,
      maxParticipants: 20,
      status: "Planificación",
      category: "Nacional",
      leader: "Diácono Juan Pérez",
      image: "iglesia/misiones/templo-rural",
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingMission, setEditingMission] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("Todas")
  const [filterStatus, setFilterStatus] = useState("Todas")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    budget: "",
    category: "Local",
    maxParticipants: "",
    leader: "",
    image: "",
  })

  const categories = ["Local", "Nacional", "Internacional"]
  const statuses = ["Planificación", "Activa", "Completada", "Suspendida"]

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "Todas" || mission.category === filterCategory
    const matchesStatus = filterStatus === "Todas" || mission.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingMission) {
      setMissions(
        missions.map((mission) =>
          mission.id === editingMission.id
            ? {
                ...mission,
                ...formData,
                budget: Number.parseFloat(formData.budget),
                maxParticipants: Number.parseInt(formData.maxParticipants),
                id: editingMission.id,
              }
            : mission,
        ),
      )
      setEditingMission(null)
    } else {
      const newMission = {
        ...formData,
        id: Date.now(),
        budget: Number.parseFloat(formData.budget),
        maxParticipants: Number.parseInt(formData.maxParticipants),
        raised: 0,
        participants: 0,
        status: "Planificación",
      }
      setMissions([...missions, newMission])
    }

    resetForm()
    setShowCreateForm(false)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      budget: "",
      category: "Local",
      maxParticipants: "",
      leader: "",
      image: "",
    })
  }

  const handleEdit = (mission) => {
    setEditingMission(mission)
    setFormData({
      title: mission.title,
      description: mission.description,
      location: mission.location,
      startDate: mission.startDate,
      endDate: mission.endDate,
      budget: mission.budget.toString(),
      category: mission.category,
      maxParticipants: mission.maxParticipants.toString(),
      leader: mission.leader,
      image: mission.image,
    })
    setShowCreateForm(true)
  }

  const handleDelete = (missionId) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta misión?")) {
      setMissions(missions.filter((mission) => mission.id !== missionId))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Activa":
        return "bg-green-100 text-green-800"
      case "Planificación":
        return "bg-yellow-100 text-yellow-800"
      case "Completada":
        return "bg-blue-100 text-blue-800"
      case "Suspendida":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Local":
        return "bg-green-100 text-green-800"
      case "Nacional":
        return "bg-blue-100 text-blue-800"
      case "Internacional":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (raised, budget) => {
    return Math.min((raised / budget) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Misiones</h1>
          <p className="text-gray-600">Administra los proyectos misioneros de la iglesia</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-sapphire-700 hover:bg-sapphire-800">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Misión
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Misiones</p>
                <p className="text-2xl font-bold">{missions.length}</p>
              </div>
              <Globe className="h-8 w-8 text-sapphire-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Misiones Activas</p>
                <p className="text-2xl font-bold">{missions.filter((m) => m.status === "Activa").length}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Recaudado</p>
                <p className="text-2xl font-bold">${missions.reduce((sum, m) => sum + m.raised, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Participantes</p>
                <p className="text-2xl font-bold">{missions.reduce((sum, m) => sum + m.participants, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar misiones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todas">Todos los estados</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingMission ? "Editar Misión" : "Crear Nueva Misión"}</CardTitle>
            <CardDescription>
              {editingMission ? "Modifica los detalles de la misión" : "Completa la información de la nueva misión"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Título de la Misión</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nombre de la misión"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Descripción</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción detallada de la misión"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ubicación</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Lugar de la misión"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Líder Responsable</label>
                  <Input
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    placeholder="Nombre del líder"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Fecha de Inicio</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Fecha de Finalización</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Presupuesto Total ($)</label>
                  <Input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="Presupuesto necesario"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Máximo Participantes</label>
                  <Input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                    placeholder="Número máximo de participantes"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">URL de Imagen</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="URL de la imagen de la misión"
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-sapphire-700 hover:bg-sapphire-800">
                  {editingMission ? "Actualizar Misión" : "Crear Misión"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false)
                    setEditingMission(null)
                    resetForm()
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Missions List */}
      <div className="grid gap-6">
        {filteredMissions.map((mission) => (
          <Card key={mission.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{mission.title}</h3>
                    <Badge className={getCategoryColor(mission.category)}>{mission.category}</Badge>
                    <Badge className={getStatusColor(mission.status)}>{mission.status}</Badge>
                  </div>

                  <p className="text-gray-600 mb-4">{mission.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mission.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      Líder: {mission.leader}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(mission.startDate).toLocaleDateString("es-ES")} -{" "}
                      {new Date(mission.endDate).toLocaleDateString("es-ES")}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {mission.participants}/{mission.maxParticipants} participantes
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progreso de Financiamiento</span>
                      <span className="text-sm text-gray-500">
                        ${mission.raised.toLocaleString()} / ${mission.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sapphire-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${calculateProgress(mission.raised, mission.budget)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {calculateProgress(mission.raised, mission.budget).toFixed(1)}% completado
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-sapphire-700">${mission.raised.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">recaudado</div>
                  </div>

                  <div className="flex space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(mission)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(mission.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron misiones</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterCategory !== "Todas" || filterStatus !== "Todas"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza creando tu primera misión"}
            </p>
            {!searchTerm && filterCategory === "Todas" && filterStatus === "Todas" && (
              <Button onClick={() => setShowCreateForm(true)} className="bg-sapphire-700 hover:bg-sapphire-800">
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Misión
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
