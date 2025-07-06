// src/AdministrativePage/components/AdminLayout.jsx
"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/InformativePage/components/ui/button"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Menu, X, Bell } from "lucide-react"
import { useAuth } from "@/AdministrativePage/hooks/useAuth"
// Importa aquí tu Sidebar
import Sidebar from "./Sidebar"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar de escritorio y móvil */}
      {/* Desktop: siempre visible en lg */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64">
        <Sidebar />
      </aside>

      {/* Backdrop y drawer móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform
          transition-transform duration-300 ease-in-out lg:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Reusa el mismo Sidebar, ocultando el header de escritorio */}
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-lg font-bold">Admin Panel</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <Sidebar />
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header móvil */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white shadow-sm border-b lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-700 border-green-200">
              Sistema Activo
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Ver Sitio Web
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
