"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Search, Images, Upload, Edit, Trash2, MoreHorizontal, Eye, Download, FolderPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/InformativePage/components/ui/dropdown-menu"

export default function GalleryPage() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Servicios Dominicales",
      description: "Momentos especiales de adoración y comunión",
      imageCount: 24,
      coverImage: "iglesia/galeria/servicios/cover",
      createdAt: "2024-01-01",
      status: "Activa",
    },
    {
      id: 2,
      name: "Eventos Especiales",
      description: "Conferencias, retiros y celebraciones",
      imageCount: 18,
      coverImage: "iglesia/galeria/eventos/cover",
      createdAt: "2024-01-15",
      status: "Activa",
    },
    {
      id: 3,
      name: "Ministerios en Acción",
      description: "Nuestros ministerios sirviendo a la comunidad",
      imageCount: 32,
      coverImage: "iglesia/galeria/ministerios/cover",
      createdAt: "2023-12-10",
      status: "Activa",
    },
    {
      id: 4,
      name: "Vida Comunitaria",
      description: "Momentos cotidianos de nuestra familia de fe",
      imageCount: 15,
      coverImage: "iglesia/galeria/comunidad/cover",
      createdAt: "2023-11-20",
      status: "Borrador",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("Todas")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const statuses = ["Activa", "Borrador", "Archivada"]

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "Todas" || category.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const deleteCategory = (categoryId) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      setCategories(categories.filter((category) => category.id !== categoryId))
    }
  }

  const toggleStatus = (categoryId) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, status: category.status === "Activa" ? "Borrador" : "Activa" }
          : category,
      ),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Activa":
        return "bg-green-100 text-green-800"
      case "Borrador":
        return "bg-yellow-100 text-yellow-800"
      case "Archivada":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Galería</h1>
          <p className="text-gray-600">Administra las categorías y fotos de la galería</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowCreateForm(true)} className="bg-sapphire-700 hover:bg-sapphire-800">
            <FolderPlus className="h-4 w-4 mr-2" />
            Nueva Categoría
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Subir Fotos
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Categorías</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <Images className="h-8 w-8 text-sapphire-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categorías Activas</p>
                <p className="text-2xl font-bold">{categories.filter((c) => c.status === "Activa").length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Imágenes</p>
                <p className="text-2xl font-bold">{categories.reduce((sum, c) => sum + c.imageCount, 0)}</p>
              </div>
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio por Categoría</p>
                <p className="text-2xl font-bold">
                  {Math.round(categories.reduce((sum, c) => sum + c.imageCount, 0) / categories.length)}
                </p>
              </div>
              <Images className="h-8 w-8 text-purple-600" />
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
                  placeholder="Buscar categorías..."
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

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative h-48 bg-gray-200">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4">
                <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.imageCount} fotos</p>
              </div>
            </div>

            <CardContent className="p-4">
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Creada: {new Date(category.createdAt).toLocaleDateString("es-ES")}</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Fotos
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Fotos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Categoría
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleStatus(category.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      {category.status === "Activa" ? "Desactivar" : "Activar"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Todas
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteCategory(category.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Category Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Nueva Categoría</CardTitle>
                  <CardDescription>Crea una nueva categoría para organizar las fotos</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowCreateForm(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nombre de la Categoría</label>
                <Input placeholder="Ej: Conferencia 2024" required />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Descripción</label>
                <Input placeholder="Descripción breve de la categoría" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Estado</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="Borrador">Borrador</option>
                  <option value="Activa">Activa</option>
                </select>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="bg-sapphire-700 hover:bg-sapphire-800 flex-1">Crear Categoría</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Images className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron categorías</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== "Todas"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza creando tu primera categoría"}
            </p>
            {!searchTerm && filterStatus === "Todas" && (
              <Button onClick={() => setShowCreateForm(true)} className="bg-sapphire-700 hover:bg-sapphire-800">
                <FolderPlus className="h-4 w-4 mr-2" />
                Crear Primera Categoría
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
