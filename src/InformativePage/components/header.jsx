// src/InformativePage/components/Header.jsx
"use client"

import { useState } from "react"
import { Button } from "@/InformativePage/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/InformativePage/components/ui/dropdown-menu"
import { ChevronDown, Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const logoUrl =
    "https://res.cloudinary.com/dss0mxa8r/image/upload/v1751781205/Oasis_azul_sin_fondo_ltywwf.png"

  // Navega al home y forza el scroll al top
  const goHomeTop = (e) => {
    e.preventDefault()
    navigate("/")       // Ir a la ruta "/"
    window.scrollTo(0, 0) // Scroll al inicio
    setIsMenuOpen(false)
  }

  const ministerios = [
    { name: "Ministerio de Alabanza", href: "/ministerios/alabanza" },
    { name: "Ministerio Infantil", href: "/ministerios/infantil" },
    { name: "Ministerio Juvenil", href: "/ministerios/juvenil" },
    { name: "Ministerio de Ayuda", href: "/ministerios/ayuda" },
    { name: "Ministerio de Damas", href: "/ministerios/damas" },
    { name: "Ministerio de Varones", href: "/ministerios/varones" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        {/* Logo como <a> para capturar el onClick */}
        <a
          href="/"
          onClick={goHomeTop}
          className="flex items-center space-x-2"
        >
          <img
            src={logoUrl}
            alt="Logo Oasis de Esperanza"
            className="h-9 w-9 sm:h-12 sm:w-12 object-contain"
          />
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            Oasis de Esperanza
          </span>
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => {
              navigate("/")
              window.scrollTo(0, 0)
            }}
            className="text-sm font-medium hover:text-sapphire-700 transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              navigate("/galeria")
              window.scrollTo(0, 0)
            }}
            className="text-sm font-medium hover:text-sapphire-700 transition-colors"
          >
            Galeria
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-sapphire-700 transition-colors">
              Ministerios
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {ministerios.map((m) => (
                <DropdownMenuItem key={m.name} asChild>
                  <a href={m.href} className="w-full block">
                    {m.name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="/eventos"
            className="text-sm font-medium hover:text-sapphire-700 transition-colors"
          >
            Eventos
          </a>
          <a
            href="/donaciones"
            className="text-sm font-medium hover:text-sapphire-700 transition-colors"
          >
            Donaciones
          </a>
          <a
            href="/contacto"
            className="text-sm font-medium hover:text-sapphire-700 transition-colors"
          >
            Contacto
          </a>
          <Button
            className="bg-sapphire-700 hover:bg-sapphire-800"
            onClick={() => {
              navigate("/admin/login")
              window.scrollTo(0, 0)
            }}
          >
            Iniciar Sesión
          </Button>
        </nav>

        {/* Botón móvil */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container px-3 sm:px-4 py-3 sm:py-4 space-y-3">
            <button
              onClick={goHomeTop}
              className="block w-full text-left text-sm font-medium hover:text-sapphire-700 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                navigate("/")
                window.scrollTo(0, 0)
              }}
              className="block w-full text-left text-sm font-medium hover:text-sapphire-700 transition-colors"
            >
              Sobre Nosotros
            </button>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Ministerios
              </p>
              {ministerios.map((m) => (
                <a
                  key={m.name}
                  href={m.href}
                  className="block pl-4 text-sm text-gray-600 hover:text-sapphire-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {m.name}
                </a>
              ))}
            </div>

            <a
              href="/eventos"
              className="block text-sm font-medium hover:text-sapphire-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </a>
            <a
              href="/donaciones"
              className="block text-sm font-medium hover:text-sapphire-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Donaciones
            </a>
            <a
              href="/contacto"
              className="block text-sm font-medium hover:text-sapphire-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>

            <Button
              className="w-full bg-sapphire-700 hover:bg-sapphire-800 text-white"
              onClick={() => {
                navigate("/admin/login")
                window.scrollTo(0, 0)
                setIsMenuOpen(false)
              }}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
