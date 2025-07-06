import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Clock } from "lucide-react"

export default function ServiceSchedule() {
  const servicios = [
    {
      titulo: "Domingo Matutino",
      descripcion: "Servicio Principal",
      hora: "9:00 AM",
      detalle: "Adoración y Predicación",
    },
    {
      titulo: "Domingo Vespertino",
      descripcion: "Servicio de Oración",
      hora: "6:00 PM",
      detalle: "Oración y Testimonios",
    },
    {
      titulo: "Miércoles",
      descripcion: "Estudio Bíblico",
      hora: "7:00 PM",
      detalle: "Enseñanza y Discipulado",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Horarios de Servicio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Te esperamos en nuestros servicios semanales llenos de adoración, enseñanza y comunión.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {servicios.map((servicio, index) => (
            <Card key={index} className="text-center border-sapphire-200 h-full">
              <CardHeader className="pb-4">
                <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-sapphire-700 mx-auto mb-3 sm:mb-4" />
                <CardTitle>{servicio.titulo}</CardTitle>
                <CardDescription>{servicio.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl sm:text-2xl font-bold text-sapphire-700">{servicio.hora}</p>
                <p className="text-gray-600">{servicio.detalle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
