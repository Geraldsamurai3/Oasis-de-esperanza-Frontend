import { Cross } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  const enlacesRapidos = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Ministerios", href: "/ministerios" },
    { nombre: "Eventos", href: "/eventos" },
    { nombre: "Pastores", href: "/pastores" },
  ]

  const horarios = ["Domingo 9:00 AM", "Domingo 6:00 PM", "Miércoles 7:00 PM"]

  const contactoInfo = ["Av. Esperanza 123", "+1 (555) 123-4567", "info@oasisesperanza.org"]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cross className="h-8 w-8 text-sapphire-400" />
              <span className="text-xl font-bold">Oasis de Esperanza</span>
            </div>
            <p className="text-gray-400 mb-4">
              Una comunidad de fe comprometida con transformar vidas a través del amor de Cristo.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              {enlacesRapidos.map((enlace, index) => (
                <li key={index}>
                  <Link to={enlace.href} className="hover:text-sapphire-400 transition-colors">
                    {enlace.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-400">
              {horarios.map((horario, index) => (
                <li key={index}>{horario}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              {contactoInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Iglesia Oasis de Esperanza. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
