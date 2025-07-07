import { Card, CardContent, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Button } from "@/InformativePage/components/ui/button"
import { Link } from "react-router-dom"
import { Calendar, Clock, MapPin } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Conferencia de Fe 2024",
    description: "Tres días de enseñanza, adoración y comunión con invitados especiales.",
    date: "2024-03-15",
    time: "19:00",
    location: "Santuario Principal",
    image: "iglesia/eventos/conferencia-2024",
    featured: true,
  },
  {
    id: 2,
    title: "Retiro Familiar",
    description: "Un fin de semana especial para fortalecer los lazos familiares en la fe.",
    date: "2024-03-22",
    time: "09:00",
    location: "Centro de Retiros",
    image: "iglesia/eventos/retiro-familiar",
    featured: false,
  },
  {
    id: 3,
    title: "Noche de Oración",
    description: "Una noche especial dedicada a la oración e intercesión.",
    date: "2024-03-28",
    time: "20:00",
    location: "Santuario Principal",
    image: "iglesia/eventos/noche-oracion",
    featured: false,
  },
]

export default function EventosPage() {
  const featuredEvents = events.filter((event) => event.featured)
  const regularEvents = events.filter((event) => !event.featured)

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-sapphire-50 to-blue-50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Próximos Eventos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Únete a nosotros en nuestras actividades especiales y eventos comunitarios.
          </p>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Eventos Destacados</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <CloudinaryImage
                      publicId={event.image}
                      alt={event.title}
                      transformation="hero"
                      className="w-full h-full"
                    />
                    <Badge className="absolute top-4 left-4 bg-sapphire-700">Destacado</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <p className="text-gray-600">{event.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <Link to={`/eventos/${event.id}`}>
                      <Button className="w-full bg-sapphire-700 hover:bg-sapphire-800">Ver Detalles</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Events */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Todos los Eventos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <CloudinaryImage
                    publicId={event.image}
                    alt={event.title}
                    transformation="card"
                    className="w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString("es-ES")}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <Link to={`/eventos/${event.id}`}>
                    <Button className="w-full bg-sapphire-700 hover:bg-sapphire-800 mt-4">Ver Detalles</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
