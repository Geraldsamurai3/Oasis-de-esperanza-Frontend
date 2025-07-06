// src/AdministrativePage/pages/SettingsPage.jsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { Input } from "@/InformativePage/components/ui/input"
import { Textarea } from "@/InformativePage/components/ui/textarea"
import { Settings, Globe, Mail, Shield, Database, Bell } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    general: {
      churchName: "Iglesia Oasis de Esperanza",
      description: "Una comunidad de fe comprometida con transformar vidas a través del amor de Cristo.",
      address: "Av. Esperanza 123, Ciudad, País",
      phone: "+1 (555) 123-4567",
      email: "info@oasisesperanza.org",
      website: "https://oasisesperanza.org",
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUser: "noreply@oasisesperanza.org",
      smtpPassword: "••••••••",
      fromName: "Iglesia Oasis de Esperanza",
      fromEmail: "noreply@oasisesperanza.org",
    },
    notifications: {
      emailNotifications: true,
      newContactNotifications: true,
      donationNotifications: true,
      eventReminders: true,
      weeklyReports: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
      loginAttempts: "5",
    },
    integrations: {
      cloudinaryEnabled: true,
      cloudinaryCloudName: "oasis-esperanza",
      paypalEnabled: true,
      paypalClientId: "••••••••",
      googleAnalytics: "G-XXXXXXXXXX",
    },
    backup: {
      frequency: "daily",
      lastBackup: "2025-06-29",
    },
  })

  const handleSave = (section) => {
    console.log(`Saving ${section} settings:`, settings[section])
    alert(`Configuración de ${section} guardada exitosamente`)
  }

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "email", name: "Email", icon: Mail },
    { id: "notifications", name: "Notificaciones", icon: Bell },
    { id: "security", name: "Seguridad", icon: Shield },
    { id: "integrations", name: "Integraciones", icon: Globe },
    { id: "backup", name: "Respaldo", icon: Database },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
        <p className="text-gray-600">Administra la configuración general del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-sapphire-100 text-sapphire-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
                <CardDescription>Información básica de la iglesia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre de la Iglesia</label>
                    <Input
                      value={settings.general.churchName}
                      onChange={(e) =>
                        handleInputChange("general", "churchName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sitio Web</label>
                    <Input
                      value={settings.general.website}
                      onChange={(e) =>
                        handleInputChange("general", "website", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Descripción</label>
                  <Textarea
                    value={settings.general.description}
                    onChange={(e) =>
                      handleInputChange("general", "description", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Teléfono</label>
                    <Input
                      value={settings.general.phone}
                      onChange={(e) =>
                        handleInputChange("general", "phone", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      value={settings.general.email}
                      onChange={(e) =>
                        handleInputChange("general", "email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave("general")}
                  className="mt-4 px-4 py-2 bg-sapphire-600 text-white rounded hover:bg-sapphire-700"
                >
                  Guardar General
                </button>
              </CardContent>
            </Card>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Email</CardTitle>
                <CardDescription>Datos SMTP para envío de correos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Host SMTP</label>
                    <Input
                      value={settings.email.smtpHost}
                      onChange={(e) =>
                        handleInputChange("email", "smtpHost", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Puerto SMTP</label>
                    <Input
                      value={settings.email.smtpPort}
                      onChange={(e) =>
                        handleInputChange("email", "smtpPort", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Usuario SMTP</label>
                    <Input
                      value={settings.email.smtpUser}
                      onChange={(e) =>
                        handleInputChange("email", "smtpUser", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contraseña SMTP</label>
                    <Input
                      type="password"
                      value={settings.email.smtpPassword}
                      onChange={(e) =>
                        handleInputChange("email", "smtpPassword", e.target.value)
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave("email")}
                  className="mt-4 px-4 py-2 bg-sapphire-600 text-white rounded hover:bg-sapphire-700"
                >
                  Guardar Email
                </button>
              </CardContent>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Preferencias de notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        handleInputChange("notifications", key, e.target.checked)
                      }
                      id={key}
                      className="h-4 w-4"
                    />
                    <label htmlFor={key} className="text-sm">
                      {key}
                    </label>
                  </div>
                ))}

                <button
                  onClick={() => handleSave("notifications")}
                  className="mt-4 px-4 py-2 bg-sapphire-600 text-white rounded hover:bg-sapphire-700"
                >
                  Guardar Notificaciones
                </button>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>Opciones de seguridad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">2FA</label>
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) =>
                      handleInputChange("security", "twoFactorAuth", e.target.checked)
                    }
                    className="h-4 w-4"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Timeout (min)</label>
                    <Input
                      value={settings.security.sessionTimeout}
                      onChange={(e) =>
                        handleInputChange("security", "sessionTimeout", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Expiración pwd (días)</label>
                    <Input
                      value={settings.security.passwordExpiry}
                      onChange={(e) =>
                        handleInputChange("security", "passwordExpiry", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Intentos login</label>
                    <Input
                      value={settings.security.loginAttempts}
                      onChange={(e) =>
                        handleInputChange("security", "loginAttempts", e.target.value)
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave("security")}
                  className="mt-4 px-4 py-2 bg-sapphire-600 text-white rounded hover:bg-sapphire-700"
                >
                  Guardar Seguridad
                </button>
              </CardContent>
            </Card>
          )}

          {/* Integrations Settings */}
          {activeTab === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle>Integraciones</CardTitle>
                <CardDescription>Configuraciones externas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.integrations.cloudinaryEnabled}
                    onChange={(e) =>
                      handleInputChange("integrations", "cloudinaryEnabled", e.target.checked)
                    }
                    className="h-4 w-4"
                  />
                  <label className="text-sm">Cloudinary habilitado</label>
                </div>
                {settings.integrations.cloudinaryEnabled && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cloud Name</label>
                    <Input
                      value={settings.integrations.cloudinaryCloudName}
                      onChange={(e) =>
                        handleInputChange(
                          "integrations",
                          "cloudinaryCloudName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.integrations.paypalEnabled}
                    onChange={(e) =>
                      handleInputChange("integrations", "paypalEnabled", e.target.checked)
                    }
                    className="h-4 w-4"
                  />
                  <label className="text-sm">PayPal habilitado</label>
                </div>
                {settings.integrations.paypalEnabled && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">PayPal Client ID</label>  
                    <Input
                      value={settings.integrations.paypalClientId}
                      onChange={(e) =>
                        handleInputChange("integrations", "paypalClientId", e.target.value)
                      }
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Google Analytics ID</label>
                  <Input
                    value={settings.integrations.googleAnalytics}
                    onChange={(e) =>
                      handleInputChange("integrations", "googleAnalytics", e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={() => handleSave("integrations")}
                  className="mt-4 px-4 py-2 bg-sapphire-600 text-white rounded hover:bg-sapphire-700"
                >
                  Guardar Integraciones
                </button>
              </CardContent>
            </Card>
          )}

          {/* Backup Settings */}
          {activeTab === "backup" && (
            <Card>
              <CardHeader>
                <CardTitle>Respaldo</CardTitle>
                <CardDescription>Opciones de respaldo automático</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Frecuencia</label>
                  <Input
                    value={settings.backup.frequency}
                    onChange={(e) =>
                      handleInputChange("backup", "frequency", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Último respaldo</label>
                  <Input
                    value={settings.backup.lastBackup}
                    onChange={(e) =>
                      handleInputChange("backup", "lastBackup", e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={() => handleSave("backup")}
                  className="mt-4 px-4 py-2 bg-sapphire-600 text-white rounded hover:bg-sapphire-700"
                >
                  Guardar Respaldo
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
