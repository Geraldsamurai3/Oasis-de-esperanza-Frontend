// src/pages/GaleriaPage.jsx
"use client"

import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
} from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import {
  Search,
  Eye,
  X,
} from "lucide-react"

import { useCategories } from "../../AdministrativePage/hooks/useCategories"
import { useGalleryItems } from "../../AdministrativePage/hooks/useGalleryItems"
import { getGalleryItemsByCategoryRequest } from "../../AdministrativePage/Services/galleryService"

const ITEMS_PER_PAGE = 12

export default function GaleriaPage() {
  // Categorías
  const {
    categories,
    loading: loadingCats,
    error:   errorCats,
    fetchCategories,
  } = useCategories()

  // Fotos para el modal de álbum
  const {
    items: modalImgs,
    loading: loadingImgs,
    error:   errorImgs,
    fetchByCategory: fetchItemsByCategory,
  } = useGalleryItems()

  // Estado UI
  const [searchTerm, setSearchTerm] = useState("")
  const [page,       setPage]       = useState(1)

  // Portadas: última foto de cada álbum
  const [coverUrls, setCoverUrls]   = useState({})

  // Modal de listado
  const [modalOpen, setModalOpen]   = useState(false)
  const [modalCat,  setModalCat]    = useState(null)

  // Lightbox (imagen grande)
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

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

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const slice      = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  function openModal(cat) {
    setModalCat(cat)
    setModalOpen(true)
    fetchItemsByCategory(cat.id)
  }
  function closeModal() {
    setModalOpen(false)
    setModalCat(null)
  }
  function openLightbox(img) {
    closeModal()
    setLightboxImg(img)
  }
  function closeLightbox() {
    setLightboxImg(null)
  }

  return (
    <main className="space-y-6">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-sapphire-50 to-blue-50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galería</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Revive los momentos especiales de nuestra comunidad de fe.
          </p>
        </div>
      </section>

      {/* Filtro */}
      <div className="container px-4 mx-auto">
        <div className="relative w-full max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" />
          <Input
            className="pl-10"
            placeholder="Buscar álbum..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid álbumes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slice.map(cat => (
            <Card
              key={cat.id}
              className="group hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div
                className="relative h-80 bg-center bg-cover"
                style={{
                  backgroundImage: coverUrls[cat.id]
                    ? `url(${coverUrls[cat.id]})`
                    : undefined
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                  <p className="text-sm opacity-90">{cat.imageCount} fotos</p>
                </div>
              </div>

              <CardContent className="p-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => openModal(cat)}
                >
                  <Eye className="h-4 w-4 mr-2" /> Ver Fotos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button disabled={page === 1} size="sm" onClick={() => setPage(p => p - 1)}>
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  page === i+1 ? "bg-sapphire-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => setPage(i+1)}
              >
                {i+1}
              </button>
            ))}
            <Button disabled={page === totalPages} size="sm" onClick={() => setPage(p => p + 1)}>
              Siguiente
            </Button>
          </div>
        )}
      </div>

      {/* Modal de Fotos (lista) */}
      {modalOpen && modalCat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[85vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Fotos de “{modalCat.name}”</h2>
              <Button variant="outline" size="sm" onClick={closeModal}>
                <X />
              </Button>
            </div>
            {loadingImgs ? (
              <p>Cargando fotos…</p>
            ) : errorImgs ? (
              <p className="text-red-600">{errorImgs.message}</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {modalImgs.map(img => (
                  <div
                    key={img.id}
                    className="h-48 bg-gray-100 overflow-hidden rounded cursor-pointer"
                    onClick={() => openLightbox(img)}
                  >
                    <img
                      src={img.mediaUrl}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox (imagen grande + solo cerrar) */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-200"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            <img
              src={lightboxImg.mediaUrl}
              alt={lightboxImg.title}
              className="block max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </main>
  )
}
