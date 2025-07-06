import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Input } from "@/InformativePage/components/ui/input"
import { Textarea } from "@/InformativePage/components/ui/textarea"
import { Button } from "@/InformativePage/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Contact() {
  const motivosContacto = ["Información General", "Oración", "Ministerios", "Eventos", "Donaciones", "Otro"]

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ponte en Contacto</h2>
            <p className="text-gray-600 mb-8">
              Nos encantaría conocerte y responder cualquier pregunta que tengas. No dudes en contactarnos o visitarnos.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-sapphire-700 mr-3" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-gray-600">Av. Esperanza 123, Ciudad, País</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-sapphire-700 mr-3" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-sapphire-700 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@oasisesperanza.org</p>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>Completa el formulario y nos pondremos en contacto contigo pronto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre</label>
                  <Input placeholder="Tu nombre" className="text-sm sm:text-base" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Apellido</label>
                  <Input placeholder="Tu apellido" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Teléfono</label>
                <Input type="tel" placeholder="Tu número de teléfono" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Motivo de Contacto</label>
                <select className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base">
                  {motivosContacto.map((motivo, index) => (
                    <option key={index} value={motivo}>
                      {motivo}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Mensaje</label>
                <Textarea placeholder="Escribe tu mensaje aquí..." rows={4} />
              </div>
              <Button className="w-full bg-sapphire-700 hover:bg-sapphire-800">Enviar Mensaje</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
