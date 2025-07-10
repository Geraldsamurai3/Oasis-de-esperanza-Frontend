// src/AdministrativePage/components/GalleryPage.jsx
"use client"

import React, { useState, useEffect } from "react"
import Swal from "sweetalert2"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import {
  Search,
  Images,
  Upload,
  Trash2,
  MoreHorizontal,
  Eye,
  FolderPlus,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/InformativePage/components/ui/dropdown-menu"

import { useCategories } from "../hooks/useCategories"
import { useGalleryItems } from "../hooks/useGalleryItems"
import { getGalleryItemsByCategoryRequest } from "../Services/galleryService"

const ITEMS_PER_PAGE = 12

export default function GalleryPage() {
  // --- Categorías ---
  const {
    categories,
    loading: loadingCats,
    error: errorCats,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories()

  // --- Fotos ---
  const {
    items,
    loading: loadingItems,
    error: errorItems,
    fetchItemsByCategory,
    uploadItem,
    deleteItem,
  } = useGalleryItems()

  // UI state
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)

  // modal "Nueva"
  const [showNewCat, setShowNewCat] = useState(false)
  const [newCatName, setNewCatName] = useState("")
  const [creatingCat, setCreatingCat] = useState(false)

  // modal "Editar"
  const [showEditCat, setShowEditCat] = useState(false)
  const [editCatName, setEditCatName] = useState("")
  const [editCatId, setEditCatId] = useState(null)
  const [updatingCat, setUpdatingCat] = useState(false)

  // galería y uploads
  const [viewCatId, setViewCatId] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadFiles, setUploadFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  // portada
  const [coverUrls, setCoverUrls] = useState({})

  // carga inicial
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // actualizar portadas
  useEffect(() => {
    categories.forEach(cat => {
      getGalleryItemsByCategoryRequest(cat.id)
        .then(data => {
          if (data.length) {
            setCoverUrls(prev => ({
              ...prev,
              [cat.id]: data[data.length - 1].mediaUrl
            }))
          }
        })
        .catch(() => {})
    })
  }, [categories])

  if (loadingCats) return <p className="p-6 text-lg">Cargando categorías…</p>
  if (errorCats)   return <p className="p-6 text-red-600">{errorCats.message}</p>

  // Filtrado + Paginación
  const filteredCats = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filteredCats.length / ITEMS_PER_PAGE)
  const slice = filteredCats.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // Crear categoría
  const handleCreateCat = async e => {
    e.preventDefault()
    if (!newCatName.trim()) return
    try {
      setCreatingCat(true)
      await createCategory({ name: newCatName.trim() })
      Swal.fire({ icon: "success", title: "Categoría creada", timer: 1200, showConfirmButton: false })
      setNewCatName("")
      setShowNewCat(false)
    } finally {
      setCreatingCat(false)
    }
  }

  // Abrir modal editar
  const openEditModal = cat => {
    setEditCatId(cat.id)
    setEditCatName(cat.name)
    setShowEditCat(true)
  }

  // Guardar edición
  const handleEditCat = async e => {
    e.preventDefault()
    if (!editCatName.trim()) return
    try {
      setUpdatingCat(true)
      await updateCategory(editCatId, { name: editCatName.trim() })
      Swal.fire({ icon: "success", title: "Categoría renombrada", timer: 1200, showConfirmButton: false })
      setShowEditCat(false)
    } finally {
      setUpdatingCat(false)
    }
  }

  // Toggle ver/ocultar álbum
  const toggleGallery = catId => {
    if (viewCatId === catId) {
      setViewCatId(null)
    } else {
      setViewCatId(catId)
      fetchItemsByCategory(catId)
    }
    setShowUpload(false)
  }

  // Abrir modal subida
  const openUploadModal = catId => {
    setViewCatId(catId)
    setShowUpload(true)
  }

  // Subir varias imágenes
  const handleUpload = async () => {
    if (!uploadFiles.length || !viewCatId) return
    try {
      setUploading(true)
      await Promise.all(
        uploadFiles.map(f => {
          const form = new FormData()
          form.append("media", f)
          form.append("categoryId", String(viewCatId))
          return uploadItem(form)
        })
      )
      Swal.fire({ icon: "success", title: "Imágenes subidas", timer: 1200, showConfirmButton: false })
      fetchItemsByCategory(viewCatId)
      // refrescar portada
      const data = await getGalleryItemsByCategoryRequest(viewCatId)
      if (data.length) {
        setCoverUrls(prev => ({ ...prev, [viewCatId]: data[data.length - 1].mediaUrl }))
      }
      setShowUpload(false)
      setUploadFiles([])
    } catch (err) {
      Swal.fire("Error", err.message, "error")
    } finally {
      setUploading(false)
    }
  }

  // estadísticas
  const totalImages = categories.reduce((sum, c) => sum + (c.imageCount ?? 0), 0)
  const avgPerCat = categories.length ? Math.round(totalImages / categories.length) : 0

  // categoría activa
  const currentCategory = categories.find(c => c.id === viewCatId)

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Galería</h1>
          <p className="text-gray-600">Administra categorías y álbumes</p>
        </div>
        <Button onClick={() => setShowNewCat(true)} className="bg-sapphire-700">
          <FolderPlus className="h-4 w-4 mr-2" /> Nueva Categoría
        </Button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categorías</p>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
            <Images className="h-8 w-8 text-sapphire-600" />
          </CardContent>
        </Card>
      </div>

      {/* filtros */}
      <Card>
        <CardContent className="p-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slice.map(cat => (
          <Card key={cat.id} className="overflow-visible hover:shadow-lg transition-shadow">
            {/* portada */}
            <div
              className="relative h-48 bg-center bg-cover"
              style={{
                backgroundImage: coverUrls[cat.id]
                  ? `url(${coverUrls[cat.id]})`
                  : undefined
              }}
            />
            <CardContent className="p-4">
              {/* nombre */}
              <div className="text-lg font-bold text-gray-900 mb-4">
                {cat.name}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleGallery(cat.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {viewCatId === cat.id ? "Ocultar Fotos" : "Ver Fotos"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openUploadModal(cat.id)}
                >
                  <Upload className="h-4 w-4 mr-1" /> Subir Fotos
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-10" align="end">
                    <DropdownMenuItem onClick={() => openEditModal(cat)}>
                      Editar
                    </DropdownMenuItem>
                    {!coverUrls[cat.id] && (
                      <DropdownMenuItem
                        onClick={async () => {
                          await deleteCategory(cat.id)
                          if (viewCatId === cat.id) setViewCatId(null)
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
        {!slice.length && (
          <Card>
            <CardContent className="p-12 text-center">
              <Images className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No hay categorías</h3>
            </CardContent>
          </Card>
        )}
      </div>

      {/* modal nueva */}
      {showNewCat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Nueva Categoría</CardTitle>
              <CardDescription>Solo nombre</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateCat}>
              <CardContent className="space-y-4">
                <Input
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  placeholder="Nombre de la categoría"
                  required
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewCat(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={creatingCat}>
                    {creatingCat ? "Creando…" : "Crear"}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}

      {/* modal editar */}
      {showEditCat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Editar Categoría</CardTitle>
              <CardDescription>Modifica el nombre</CardDescription>
            </CardHeader>
            <form onSubmit={handleEditCat}>
              <CardContent className="space-y-4">
                <Input
                  value={editCatName}
                  onChange={e => setEditCatName(e.target.value)}
                  placeholder="Nuevo nombre"
                  required
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowEditCat(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={updatingCat}>
                    {updatingCat ? "Guardando…" : "Guardar"}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}

      {/* modal subir */}
      {showUpload && viewCatId != null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Subir Fotos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => setUploadFiles(Array.from(e.target.files || []))}
              />
              {uploadFiles.length > 0 && (
                <ul className="max-h-32 overflow-auto space-y-1 text-sm text-gray-700">
                  {uploadFiles.map((f,i) => <li key={i}>• {f.name}</li>)}
                </ul>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUpload(false)
                    setUploadFiles([])
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleUpload} disabled={uploading || !uploadFiles.length}>
                  {uploading ? "Subiendo…" : `Subir (${uploadFiles.length})`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gallery Items */}
      {viewCatId != null && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Fotos de la categoría{" "}
            <span className="capitalize">{currentCategory?.name}</span>
          </h2>
          {loadingItems ? (
            <p>Cargando fotos…</p>
          ) : errorItems ? (
            <p className="text-red-600">{errorItems.message}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map(it => (
                <Card key={it.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-32 bg-gray-100 overflow-hidden">
                    <img src={it.mediaUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <CardContent>
                    <div className="flex justify-between items-center mt-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          await deleteItem(it.id)
                          fetchItemsByCategory(viewCatId)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <a
                        href={it.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-sapphire-600 flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" /> Ver
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
