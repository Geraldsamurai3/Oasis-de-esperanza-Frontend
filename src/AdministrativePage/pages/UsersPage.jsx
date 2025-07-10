// src/AdministrativePage/components/UsersPage.jsx
"use client"

import React, { useState, useMemo } from "react"
import Swal from "sweetalert2"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Badge } from "@/InformativePage/components/ui/badge"
import {
  Plus,
  Search,
  Users as UsersIcon,
  Shield,
  UserCheck,
  UserX,
  Trash2,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/InformativePage/components/ui/dropdown-menu"
import { useUsers } from "../hooks/useUsers"
import CreateUserForm from "../components/CreateUserForm"

const ITEMS_PER_PAGE = 10

export default function UsersPage() {
  const {
    users,
    loading,
    error,
    toggleBlockUser,
    deleteUser,
  } = useUsers()

  const [searchTerm, setSearchTerm]         = useState("")
  const [filterRole, setFilterRole]         = useState("Todos")
  const [filterStatus, setFilterStatus]     = useState("Todos")
  const [currentPage, setCurrentPage]       = useState(1)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Roles y estados dinámicos
  const roles = useMemo(
    () => ["Todos", ...new Set(users.map((u) => u.role))],
    [users]
  )
  const statuses = ["Todos", "Activo", "Suspendido"]

  // Estadísticas
  const totalUsers     = users.length
  const activeUsers    = users.filter((u) => !u.isBlocked).length
  const suspendedUsers = users.filter((u) => u.isBlocked).length
  const adminCount     = users.filter((u) => u.role === "Admin").length

  // Formatea fechas DD/MM/YYYY
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("es-ES", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    })

  // Filtrado memoizado
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const text = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase()
      if (searchTerm && !text.includes(searchTerm.toLowerCase())) return false
      if (filterRole !== "Todos" && u.role !== filterRole) return false
      if (
        filterStatus !== "Todos" &&
        ((filterStatus === "Activo" && u.isBlocked) ||
         (filterStatus === "Suspendido" && !u.isBlocked))
      ) return false
      return true
    })
  }, [users, searchTerm, filterRole, filterStatus])

  // Paginación
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pageSlice  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getStatusColor = (blocked) =>
    blocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "bg-purple-100 text-purple-800"
      default:      return "bg-gray-100 text-gray-800"
    }
  }

  // Acción de bloqueo/desbloqueo
  const handleToggleStatus = async (u) => {
    await toggleBlockUser(u.id)
    Swal.fire({
      icon:    u.isBlocked ? "success" : "success",
      title:   u.isBlocked ? "Usuario activado" : "Usuario suspendido",
      timer:   1500,
      showConfirmButton: false,
    })
  }

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title:             "¿Eliminar usuario?",
      icon:              "warning",
      showCancelButton:  true,
      confirmButtonText: "Sí, eliminar",
    })
    if (res.isConfirmed) {
      await deleteUser(id)
      Swal.fire({
        icon:              "success",
        title:             "Usuario eliminado",
        timer:             1500,
        showConfirmButton: false,
      })
    }
  }

  if (loading) return <p className="p-6 text-lg">Cargando usuarios…</p>
  if (error)   return <p className="p-6 text-red-600 text-lg">Error: {error.message}</p>

  return (
    <div className="space-y-6">
      {/* Título y descripción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios del sistema</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-sapphire-700 hover:bg-sapphire-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Nuevo Usuario
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-sapphire-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Administradores</p>
              <p className="text-2xl font-bold">{adminCount}</p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspendidos</p>
              <p className="text-2xl font-bold">{suspendedUsers}</p>
            </div>
            <UserX className="h-8 w-8 text-red-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border rounded-md"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Lista de usuarios */}
      <div className="grid gap-4">
        {pageSlice.map((u) => (
          <Card key={u.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-sapphire-100 rounded-full flex items-center justify-center">
                      <span className="text-sapphire-700 font-medium">
                        {u.firstName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {u.firstName} {u.lastName}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(u.role)}>{u.role}</Badge>
                        <Badge className={getStatusColor(u.isBlocked)}>
                          {u.isBlocked ? "Suspendido" : "Activo"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" /> {u.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" /> {u.phone || "—"}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" /> Registrado: {formatDate(u.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(u)}
                    className={
                      u.isBlocked
                        ? "text-green-600 hover:text-green-700"
                        : "text-red-600 hover:text-red-700"
                    }
                  >
                    {u.isBlocked ? "Activar" : "Suspender"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleDelete(u.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay usuarios</h3>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Anterior
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-sapphire-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}

      {/* Modal Crear Usuario */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <CreateUserForm
            onSuccess={() => setShowCreateForm(false)}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}
    </div>
  )
}
