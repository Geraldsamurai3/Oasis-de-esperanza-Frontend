import { Badge } from "@/InformativePage/components/ui/badge"
import CloudinaryImage from "./cloudinary-image"

export default function About() {
  return (
    <section id="sobre-nosotros" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-last lg:order-first">
            <CloudinaryImage
              publicId="iglesia/about/church-history"
              alt="Nuestra Historia"
              transformation="hero"
              className="w-full h-auto max-w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <Badge className="bg-sapphire-100 text-sapphire-800">Nuestra Historia</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Sobre la Iglesia Oasis de Esperanza</h2>
            <p className="text-gray-600 leading-relaxed">
              Fundada en 1995, la Iglesia Oasis de Esperanza ha sido un faro de luz en nuestra comunidad durante más de
              25 años. Comenzamos como un pequeño grupo de familias con el sueño de crear un lugar donde las personas
              pudieran encontrar esperanza, sanidad y propósito.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hoy somos una comunidad vibrante de más de 500 miembros comprometidos con transformar vidas a través del
              amor de Cristo. Nuestra misión es ser un oasis de esperanza para todos los que buscan paz y propósito en
              sus vidas.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <p className="text-xl sm:text-2xl font-bold text-sapphire-700">500+</p>
                <p className="text-xs sm:text-sm text-gray-600">Miembros Activos</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <p className="text-xl sm:text-2xl font-bold text-sapphire-700">25+</p>
                <p className="text-xs sm:text-sm text-gray-600">Años de Ministerio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
