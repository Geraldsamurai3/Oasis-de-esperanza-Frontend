"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Badge } from "@/InformativePage/components/ui/badge"
import {
  Plus,
  Search,
  Users,
  Shield,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/InformativePage/components/ui/dropdown-menu"

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Pastor Arturo Alvarado",
      email: "pastor.arturo@oasisesperanza.org",
      phone: "+1 (555) 123-4567",
      role: "Pastor",
      status: "Activo",
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2023-01-01T00:00:00Z",
      permissions: ["admin", "events", "contacts", "users"],
    },
    {
      id: 2,
      name: "Pastora Marianela Bolaños",
      email: "pastora.marianela@oasisesperanza.org",
      phone: "+1 (555) 123-4568",
      role: "Pastora",
      status: "Activo",
      lastLogin: "2024-01-14T16:45:00Z",
      createdAt: "2023-01-01T00:00:00Z",
      permissions: ["events", "contacts", "email"],
    },
    {
      id: 3,
      name: "Juan Pérez",
      email: "juan.perez@oasisesperanza.org",
      phone: "+1 (555) 987-6543",
      role: "Diácono",
      status: "Activo",
      lastLogin: "2024-01-13T09:15:00Z",
      createdAt: "2023-06-15T00:00:00Z",
      permissions: ["events", "gallery"],
    },
    {
      id: 4,
      name: "María González",
      email: "maria.gonzalez@oasisesperanza.org",
      phone: "+1 (555) 456-7890",
      role: "Secretaria",
      status: "Activo",
      lastLogin: "2024-01-12T14:20:00Z",
      createdAt: "2023-03-10T00:00:00Z",
      permissions: ["contacts", "email"],
    },
    {
      id: 5,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@oasisesperanza.org",
      phone: "+1 (555) 321-0987",
      role: "Tesorero",
      status: "Suspendido",
      lastLogin: "2024-01-05T11:30:00Z",
      createdAt: "2023-02-20T00:00:00Z",
      permissions: ["donations"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("Todos")
  const [filterStatus, setFilterStatus] = useState("Todos")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const roles = ["Pastor", "Pastora", "Diácono", "Secretaria", "Tesorero", "Voluntario"]
  const statuses = ["Activo", "Inactivo", "Suspendido"]
  const allPermissions = [
    "admin",
    "events",
    "missions",
    "users",
    "contacts",
    "gallery",
    "donations",
    "email",
    "settings",
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "Todos" || user.role === filterRole
    const matchesStatus = filterStatus === "Todos" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Activo" ? "Suspendido" : "Activo" } : user,
      ),
    )
  }

  const deleteUser = (userId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800"
      case "Inactivo":
        return "bg-gray-100 text-gray-800"
      case "Suspendido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Pastor":
      case "Pastora":
        return "bg-purple-100 text-purple-800"
      case "Diácono":
        return "bg-blue-100 text-blue-800"
      case "Secretaria":
        return "bg-green-100 text-green-800"
      case "Tesorero":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Hace 1 día"
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`
    return formatDate(dateString)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios del sistema</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-sapphire-700 hover:bg-sapphire-800">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-sapphire-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuarios Activos</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "Activo").length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Administradores</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.permissions.includes("admin")).length}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspendidos</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "Suspendido").length}</p>
              </div>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todos">Todos los roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todos">Todos los estados</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-sapphire-100 rounded-full flex items-center justify-center">
                      <span className="text-sapphire-700 font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {user.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Último acceso: {formatLastLogin(user.lastLogin)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      Miembro desde: {formatDate(user.createdAt)}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Permisos:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleUserStatus(user.id)}
                    className={
                      user.status === "Activo"
                        ? "text-red-600 hover:text-red-700"
                        : "text-green-600 hover:text-green-700"
                    }
                  >
                    {user.status === "Activo" ? "Suspender" : "Activar"}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Usuario
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Gestionar Permisos
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteUser(user.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create User Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Crear Nuevo Usuario</CardTitle>
                  <CardDescription>Completa la información del nuevo usuario del sistema</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowCreateForm(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
                  <Input placeholder="Nombre del usuario" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="usuario@oasisesperanza.org" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Teléfono</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Rol</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    <option value="">Seleccionar rol</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Permisos</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {allPermissions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="bg-sapphire-700 hover:bg-sapphire-800">Crear Usuario</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
            <p className="text-gray-500">
              {searchTerm || filterRole !== "Todos" || filterStatus !== "Todos"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza creando tu primer usuario"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
