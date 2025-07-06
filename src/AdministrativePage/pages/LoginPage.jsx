// src/AdministrativePage/pages/LoginPage.jsx
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@/InformativePage/components/ui/card"
import { Input } from "@/InformativePage/components/ui/input"
import { Button } from "@/InformativePage/components/ui/button"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Cross, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await login(formData.email, formData.password)
      console.log("✅ login() resolvió:", res)
      navigate("/admin/dashboard", { replace: true })
    } catch (err) {
      console.error("❌ login() fallo:", err)
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const illustrationUrl = import.meta.env.VITE_ILLUSTRATION_URL

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl lg:flex rounded-lg shadow-xl border border-gray-200 bg-white overflow-hidden">
        {/* IZQUIERDA: Formulario */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-2">
              <Cross className="h-8 w-8 text-slate-700" />
              <span className="text-2xl font-bold text-slate-900">Oasis de Esperanza</span>
            </div>
            <Badge className="bg-gray-200 text-slate-700">Panel Administrativo</Badge>
          </div>

          <CardHeader className="p-0 text-center">
            <CardTitle className="text-2xl text-slate-900">Iniciar Sesión</CardTitle>
            <CardDescription className="text-slate-600">
              Accede al panel administrativo de la iglesia
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 mt-4">
            {/* form no tiene action, y noValidate quita la validación HTML */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {error && (
                <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-md p-3">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@oasisesperanza.org"
                  className="bg-white border-gray-300 text-slate-900 placeholder-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-white border-gray-300 text-slate-900 placeholder-slate-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Botón con asChild para que sea un auténtico <button> HTML */}
              <Button asChild>
                <button
                  type="submit"
                  className="w-full bg-sapphire-700 hover:bg-sapphire-800 text-white py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
              </Button>
            </form>

          </CardContent>
        </div>

        {/* DERECHA: Ilustración */}
        {illustrationUrl && (
          <div className="hidden lg:block lg:w-1/2">
            <img
              src={illustrationUrl}
              alt="Illustración Oasis"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </Card>
    </div>
  )
}
