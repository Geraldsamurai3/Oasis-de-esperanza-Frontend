"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Button } from "@/InformativePage/components/ui/button"
import { Input } from "@/InformativePage/components/ui/input"
import { Badge } from "@/InformativePage/components/ui/badge"
import { DollarSign, Search, TrendingUp, CreditCard, Calendar, Download, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/InformativePage/components/ui/dropdown-menu"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function DonationsPage() {
  const [donations, setDonations] = useState([
    {
      id: 1,
      donorName: "María González",
      email: "maria.gonzalez@email.com",
      amount: 500,
      type: "Diezmo",
      method: "Tarjeta de Crédito",
      date: "2024-01-15T10:30:00Z",
      status: "Completado",
      reference: "TXN-001234",
      recurring: true,
    },
    {
      id: 2,
      donorName: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      amount: 1200,
      type: "Ofrenda Especial",
      method: "Transferencia Bancaria",
      date: "2024-01-14T16:45:00Z",
      status: "Completado",
      reference: "TXN-001235",
      recurring: false,
    },
    {
      id: 3,
      donorName: "Ana Martínez",
      email: "ana.martinez@email.com",
      amount: 250,
      type: "Misiones",
      method: "PayPal",
      date: "2024-01-13T09:15:00Z",
      status: "Completado",
      reference: "TXN-001236",
      recurring: true,
    },
    {
      id: 4,
      donorName: "Roberto Silva",
      email: "roberto.silva@email.com",
      amount: 2000,
      type: "Construcción",
      method: "Efectivo",
      date: "2024-01-12T14:20:00Z",
      status: "Pendiente",
      reference: "TXN-001237",
      recurring: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("Todos")
  const [filterStatus, setFilterStatus] = useState("Todos")
  const [filterMethod, setFilterMethod] = useState("Todos")

  const donationTypes = ["Diezmo", "Ofrenda Especial", "Misiones", "Construcción", "Ayuda Social"]
  const statuses = ["Completado", "Pendiente", "Fallido", "Reembolsado"]
  const methods = ["Tarjeta de Crédito", "Transferencia Bancaria", "PayPal", "Efectivo", "Cheque"]

  // Datos para gráficos
  const monthlyData = [
    { name: "Ene", amount: 12000 },
    { name: "Feb", amount: 15000 },
    { name: "Mar", amount: 18000 },
    { name: "Abr", amount: 16000 },
    { name: "May", amount: 20000 },
  ]

  const typeData = [
    { name: "Diezmos", value: 45, color: "#1e40af" },
    { name: "Ofrendas", value: 25, color: "#3b82f6" },
    { name: "Misiones", value: 15, color: "#60a5fa" },
    { name: "Construcción", value: 15, color: "#93c5fd" },
  ]

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "Todos" || donation.type === filterType
    const matchesStatus = filterStatus === "Todos" || donation.status === filterStatus
    const matchesMethod = filterMethod === "Todos" || donation.method === filterMethod

    return matchesSearch && matchesType && matchesStatus && matchesMethod
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Fallido":
        return "bg-red-100 text-red-800"
      case "Reembolsado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "Diezmo":
        return "bg-blue-100 text-blue-800"
      case "Ofrenda Especial":
        return "bg-purple-100 text-purple-800"
      case "Misiones":
        return "bg-green-100 text-green-800"
      case "Construcción":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)
  const completedDonations = donations.filter((d) => d.status === "Completado")
  const recurringDonations = donations.filter((d) => d.recurring)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Donaciones</h1>
          <p className="text-gray-600">Administra las donaciones y ofrendas de la iglesia</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-sapphire-700 hover:bg-sapphire-800">
            <DollarSign className="h-4 w-4 mr-2" />
            Nueva Donación
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Recaudado</p>
                <p className="text-2xl font-bold">${totalDonations.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-sapphire-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Donaciones Completadas</p>
                <p className="text-2xl font-bold">{completedDonations.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Donaciones Recurrentes</p>
                <p className="text-2xl font-bold">{recurringDonations.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio por Donación</p>
                <p className="text-2xl font-bold">${Math.round(totalDonations / donations.length).toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Donations Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Donaciones Mensuales</CardTitle>
            <CardDescription>Evolución de las donaciones por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Donaciones"]} />
                <Bar dataKey="amount" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donation Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Donaciones</CardTitle>
            <CardDescription>Distribución por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar donaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todos">Todos los tipos</option>
              {donationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Todos">Todos los métodos</option>
              {methods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Donations List */}
      <div className="grid gap-4">
        {filteredDonations.map((donation) => (
          <Card key={donation.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{donation.donorName}</h3>
                    <Badge className={getTypeColor(donation.type)}>{donation.type}</Badge>
                    <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                    {donation.recurring && <Badge variant="outline">Recurrente</Badge>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Email:</span> {donation.email}
                    </div>
                    <div>
                      <span className="font-medium">Método:</span> {donation.method}
                    </div>
                    <div>
                      <span className="font-medium">Fecha:</span> {formatDate(donation.date)}
                    </div>
                    <div>
                      <span className="font-medium">Referencia:</span> {donation.reference}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-sapphire-700">${donation.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{donation.type}</div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Descargar Recibo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Procesar Reembolso
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron donaciones</h3>
            <p className="text-gray-500">
              {searchTerm || filterType !== "Todos" || filterStatus !== "Todos" || filterMethod !== "Todos"
                ? "Intenta ajustar los filtros de búsqueda"
                : "No hay donaciones registradas"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
