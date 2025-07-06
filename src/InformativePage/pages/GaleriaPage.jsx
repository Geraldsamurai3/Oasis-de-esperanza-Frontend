import CloudinaryImage from "../components/cloudinary-image"
import { Card } from "@/InformativePage/components/ui/card"

const galleryAlbums = [
  {
    id: 1,
    title: "Servicios Dominicales",
    description: "Momentos especiales de adoración y comunión",
    coverImage: "iglesia/galeria/servicios/cover",
    imageCount: 24,
  },
  {
    id: 2,
    title: "Eventos Especiales",
    description: "Conferencias, retiros y celebraciones",
    coverImage: "iglesia/galeria/eventos/cover",
    imageCount: 18,
  },
  {
    id: 3,
    title: "Ministerios en Acción",
    description: "Nuestros ministerios sirviendo a la comunidad",
    coverImage: "iglesia/galeria/ministerios/cover",
    imageCount: 32,
  },
  {
    id: 4,
    title: "Vida Comunitaria",
    description: "Momentos cotidianos de nuestra familia de fe",
    coverImage: "iglesia/galeria/comunidad/cover",
    imageCount: 15,
  },
]

export default function GaleriaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-sapphire-50 to-blue-50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galería</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Revive los momentos especiales de nuestra comunidad de fe a través de estas imágenes.
          </p>
        </div>
      </section>

      {/* Gallery Albums */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryAlbums.map((album) => (
              <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative h-64">
                  <CloudinaryImage
                    publicId={album.coverImage}
                    alt={album.title}
                    transformation="card"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                    <p className="text-sm opacity-90">{album.description}</p>
                    <p className="text-xs opacity-75 mt-2">{album.imageCount} fotos</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
