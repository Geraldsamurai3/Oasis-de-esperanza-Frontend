import { Input } from "@/InformativePage/components/ui/input"
import { Button } from "@/InformativePage/components/ui/button"

export default function Newsletter() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Mantente Conectado</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Suscríbete a nuestro boletín para recibir actualizaciones sobre eventos, enseñanzas y noticias de la iglesia.
        </p>
        <div className="max-w-sm sm:max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Input type="email" placeholder="Tu correo electrónico" className="flex-1 text-sm sm:text-base" />
            <Button className="bg-sapphire-700 hover:bg-sapphire-800 w-full sm:w-auto text-sm sm:text-base">
              Suscribirse
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            No compartimos tu información. Puedes cancelar en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
}
