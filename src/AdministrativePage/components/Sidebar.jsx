// src/AdministrativePage/components/Sidebar.jsx
"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Home,
  Calendar as EventIcon,
  MapPin,
  Users,
  Mail,
  ImageIcon,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react"
import { Badge } from "@/InformativePage/components/ui/badge"
import { useAuth } from "@/AdministrativePage/hooks/useAuth"

export default function Sidebar() {
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const navigation = [
    { name: "Dashboard",     href: "/admin/dashboard", icon: Home },
    { name: "Eventos",       href: "/admin/events",    icon: EventIcon },
    { name: "Misiones",      href: "/admin/missions",  icon: MapPin },
    { name: "Usuarios",      href: "/admin/users",     icon: Users },
    { name: "Contactos",     href: "/admin/contacts",  icon: Mail },
    { name: "Galería",       href: "/admin/gallery",   icon: ImageIcon },
    { name: "Donaciones",    href: "/admin/donations", icon: DollarSign },
    { name: "Email",         href: "/admin/email",     icon: Mail },
    { name: "Configuración", href: "/admin/settings",  icon: Settings },
  ]

  const isActive = (href) => location.pathname === href

  const handleLogout = () => {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo / Title (móvil) */}
      <div className="px-6 py-4 flex items-center justify-between lg:hidden">
        <span className="text-xl font-bold">Admin Panel</span>
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar container */}
      <nav
        className={`
          bg-white border-r border-gray-200
          ${open ? "block" : "hidden"} lg:block
        `}
      >
        <div className="px-6 py-4 hidden lg:block">
          <span className="text-2xl font-bold">Admin Panel</span>
        </div>

        <ul className="space-y-1 px-2">
          {navigation.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                to={href}
                className={`
                  flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(href)
                    ? "bg-sapphire-100 text-sapphire-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer con datos de usuario y logout */}
        <div className="mt-auto border-t border-gray-200 px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-sapphire-200 flex items-center justify-center text-white">
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="flex-1 space-y-1">
              <div className="font-medium text-gray-900 flex items-center space-x-2">
                <span>{user?.name}</span>
                {user?.role && (
                  <Badge variant="outline" className="text-xs uppercase">
                    {user.role}
                  </Badge>
                )}
              </div>
              <div className="text-gray-500 truncate text-xs">{user?.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 rounded hover:bg-gray-100"
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
