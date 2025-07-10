// src/AdministrativePage/components/CreateUserForm.jsx
"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/InformativePage/components/ui/card"
import { Input } from "@/InformativePage/components/ui/input"
import { Button } from "@/InformativePage/components/ui/button"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import { useUsers } from "../hooks/useUsers"

export default function CreateUserForm({ onSuccess, onCancel }) {
  const { createUser } = useUsers()
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      secondLastName: "",
      phone: "",
    },
  })

  const onSubmit = async (data) => {
    setServerError("")
    try {
      await createUser(data)
      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        timer: 2000,
        showConfirmButton: false,
      })
      onSuccess()
    } catch (err) {
      setServerError(err.message || "Error al crear usuario")
    }
  }

  const inputCls =
    "mt-1 block w-full rounded-md border-gray-300 focus:border-sapphire-600"

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Crear Nuevo Usuario</CardTitle>
            <CardDescription>
              Rellena todos los campos obligatorios
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onCancel}>
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {serverError && (
          <p className="text-red-600 bg-red-50 p-2 rounded mb-4">
            {serverError}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <Input
                type="email"
                className={inputCls}
                {...register("email", {
                  required: "Email obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contraseña * (mín. 12 chars y 1 especial)
              </label>
              <Input
                type="password"
                className={inputCls}
                {...register("password", {
                  required: "Contraseña obligatoria",
                  minLength: {
                    value: 12,
                    message: "Al menos 12 caracteres",
                  },
                  pattern: {
                    value: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+/,
                    message: "Debe contener un carácter especial",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <Input
                className={inputCls}
                {...register("firstName", {
                  required: "Nombre obligatorio",
                })}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Primer Apellido *
              </label>
              <Input
                className={inputCls}
                {...register("lastName", {
                  required: "Apellido obligatorio",
                })}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Optional fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Segundo Apellido (opcional)
              </label>
              <Input
                className={inputCls}
                {...register("secondLastName")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Teléfono (opcional)
              </label>
              <Input
                type="tel"
                className={inputCls}
                {...register("phone")}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-sapphire-600 text-sapphire-600 hover:bg-sapphire-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-sapphire-600 hover:bg-sapphire-700 text-white"
            >
              {isSubmitting ? "Creando..." : "Crear Usuario"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
