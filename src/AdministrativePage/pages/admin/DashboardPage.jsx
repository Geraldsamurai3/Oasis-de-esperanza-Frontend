"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Button } from "@/InformativePage/components/ui/button"
import {
  Users,
  Calendar,
  DollarSign,
  Mail,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  Heart,
  Globe,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMembers: 542,
    activeEvents: 8,
    monthlyDonations: 15420,
    emailSubscribers: 1234,
    contactMessages: 23,
    galleryViews: 8945,
    missionProjects: 5,
    weeklyAttendance: 387,
  })

  const [trends, setTrends] = useState({
    members: 12,
    donations: 8.5,
    subscribers: -2.3,
    attendance: 15.2,
  })

  // Datos para gráficos
  const monthlyData = [
    { name: "Ene", miembros: 480, donaciones: 12000, asistencia: 320 },
    { name: "Feb", miembros: 495, donaciones: 13500, asistencia: 340 },
    { name: "Mar", miembros: 510, donaciones: 14200, asistencia: 365 },
    { name: "Abr", miembros: 525, donaciones: 15800, asistencia: 380 },
    { name: "May", miembros: 542, donaciones: 15420, asistencia: 387 },
  ]

  const eventTypeData = [
    { name: "Servicios", value: 45, color: "#1e40af" },
    { name: "Conferencias", value: 20, color: "#3b82f6" },
    { name: "Retiros", value: 15, color: "#60a5fa" },
    { name: "Actividades", value: 20, color: "#93c5fd" },
  ]

  const donationData = [
    { name: "Sem 1", amount: 3200 },
    { name: "Sem 2", amount: 3800 },
    { name: "Sem 3", amount: 4100 },
    { name: "Sem 4", amount: 4320 },
  ]

  const StatCard = ({ title, value, icon: Icon, trend, description, color = "sapphire" }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-600`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</div>
        {trend && (
          <div className="flex items-center space-x-1 mt-1">
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs ${trend > 0 ? "text-green-600" : "text-red-600"}`}>{Math.abs(trend)}%</span>
            <span className="text-xs text-gray-500">vs mes anterior</span>
          </div>
        )}
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumen general de la iglesia</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-green-700 border-green-200">
            Sistema Activo
          </Badge>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Ver Reportes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Miembros Totales"
          value={stats.totalMembers}
          icon={Users}
          trend={trends.members}
          description="Miembros activos registrados"
        />
        <StatCard
          title="Eventos Activos"
          value={stats.activeEvents}
          icon={Calendar}
          description="Eventos programados este mes"
          color="blue"
        />
        <StatCard
          title="Donaciones Mensuales"
          value={stats.monthlyDonations}
          icon={DollarSign}
          trend={trends.donations}
          description="Total recaudado este mes"
          color="green"
        />
        <StatCard
          title="Suscriptores Email"
          value={stats.emailSubscribers}
          icon={Mail}
          trend={trends.subscribers}
          description="Suscritos al boletín"
          color="purple"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Mensajes de Contacto"
          value={stats.contactMessages}
          icon={MessageSquare}
          description="Pendientes de respuesta"
          color="orange"
        />
        <StatCard
          title="Vistas de Galería"
          value={stats.galleryViews}
          icon={Eye}
          description="Visualizaciones este mes"
          color="indigo"
        />
        <StatCard
          title="Proyectos Misionales"
          value={stats.missionProjects}
          icon={Globe}
          description="Proyectos activos"
          color="teal"
        />
        <StatCard
          title="Asistencia Semanal"
          value={stats.weeklyAttendance}
          icon={Heart}
          trend={trends.attendance}
          description="Promedio semanal"
          color="pink"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento Mensual</CardTitle>
            <CardDescription>Evolución de miembros y asistencia</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="miembros" stroke="#1e40af" strokeWidth={2} name="Miembros" />
                <Line type="monotone" dataKey="asistencia" stroke="#3b82f6" strokeWidth={2} name="Asistencia" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Eventos</CardTitle>
            <CardDescription>Distribución de eventos por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Donations and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Donations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Donaciones Semanales</CardTitle>
            <CardDescription>Ingresos por semana del mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Donaciones"]} />
                <Bar dataKey="amount" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nuevo evento creado</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Email enviado a suscriptores</p>
                <p className="text-xs text-gray-500">Hace 4 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nuevo contacto recibido</p>
                <p className="text-xs text-gray-500">Hace 6 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Galería actualizada</p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Donación procesada</p>
                <p className="text-xs text-gray-500">Hace 1 día</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Tareas comunes del panel administrativo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Crear Evento</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Enviar Email</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span className="text-sm">Gestionar Usuarios</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Ver Donaciones</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
