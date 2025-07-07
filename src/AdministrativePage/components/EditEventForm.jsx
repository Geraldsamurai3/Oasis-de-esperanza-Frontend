// src/AdministrativePage/components/EditEventForm.jsx
"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/InformativePage/components/ui/input"
import { Textarea } from "@/InformativePage/components/ui/textarea"
import { Button } from "@/InformativePage/components/ui/button"
import { updateEventRequest } from "../Services/eventsService"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"

export default function EditEventForm({ event, onSuccess, onCancel }) {
  const today = new Date().toISOString().split("T")[0]  // YYYY-MM-DD

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title:          event.title,
      location:       event.location,
      startDate:      event.startDate?.split("T")[0] || today,
      endDate:        event.endDate  ? event.endDate.split("T")[0] : "",
      // recorta segundos para matchear HH:MM
      startTime:      event.startTime?.slice(0,5) || "",
      endTime:        event.endTime?.slice(0,5)   || "",
      description:    event.description,
      additionalLink: event.additionalLink || "",
      image:          null,
    },
  })

  // watchers para validación cruzada
  const watchStartDate = watch("startDate")
  const watchEndDate   = watch("endDate")
  const watchStartTime = watch("startTime")
  const watchEndTime   = watch("endTime")

  const [serverError, setServerError] = useState("")

  const onSubmit = async (data) => {
    setServerError("")
    try {
      const form = new FormData()
      form.append("title",          data.title)
      form.append("location",       data.location)
      form.append("startDate",      data.startDate)
      if (data.endDate)            form.append("endDate",   data.endDate)
      if (data.startTime)          form.append("startTime", data.startTime)
      if (data.endTime)            form.append("endTime",   data.endTime)
      form.append("description",    data.description)
      if (data.additionalLink)     form.append("additionalLink", data.additionalLink)
      if (data.image?.[0])         form.append("image", data.image[0])

      await updateEventRequest(event.id, form)

      await Swal.fire({
        title: "Evento actualizado",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      })

      onSuccess()
    } catch (err) {
      const msg = err.message || "Error desconocido"
      if (msg.toLowerCase().includes("startdate")) {
        setError("startDate", { type: "server", message: msg })
      } else if (msg.toLowerCase().includes("title")) {
        setError("title", { type: "server", message: msg })
      } else {
        setServerError(msg)
      }
    }
  }

  const inputClasses =
    "mt-1 block w-full rounded-md border-gray-300 " +
    "focus:outline-none focus:ring-0 focus:border-sapphire-600"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg shadow">
      {serverError && (
        <p className="text-base text-red-700 bg-red-50 p-3 rounded">
          {serverError}
        </p>
      )}

      {/* Título */}
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <Input
          className={inputClasses}
          {...register("title", { required: "El título es obligatorio" })}
        />
        {errors.title && (
          <p className="text-base text-red-600 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Ubicación */}
      <div>
        <label className="block text-sm font-medium mb-1">Ubicación</label>
        <Input
          className={inputClasses}
          {...register("location", { required: "La ubicación es obligatoria" })}
        />
        {errors.location && (
          <p className="text-base text-red-600 mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Inicio */}
        <div>
          <label className="block text-sm font-medium mb-1">Fecha inicio</label>
          <Input
            type="date"
            min={today}
            className={inputClasses}
            {...register("startDate", {
              required: "La fecha de inicio es obligatoria",
              validate: value =>
                !watchEndDate || value <= watchEndDate ||
                "La fecha inicio no puede ser posterior a la fecha fin"
            })}
          />
          {errors.startDate && (
            <p className="text-base text-red-600 mt-1">{errors.startDate.message}</p>
          )}
        </div>
        {/* Fin (opcional) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Fecha fin <span className="text-xs text-gray-500">(opcional)</span>
          </label>
          <Input
            type="date"
            min={watchStartDate}
            className={inputClasses}
            {...register("endDate", {
              validate: value =>
                !value || value >= watchStartDate ||
                "La fecha fin no puede ser anterior a la fecha inicio"
            })}
          />
          {errors.endDate && (
            <p className="text-base text-red-600 mt-1">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Horas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Inicio */}
        <div>
          <label className="block text-sm font-medium mb-1">Hora inicio</label>
          <Input
            type="time"
            className={inputClasses}
            {...register("startTime", {
              validate: value =>
                !watchEndTime || value <= watchEndTime ||
                "La hora inicio no puede ser posterior a la hora fin"
            })}
          />
          {errors.startTime && (
            <p className="text-base text-red-600 mt-1">{errors.startTime.message}</p>
          )}
        </div>
        {/* Fin */}
        <div>
          <label className="block text-sm font-medium mb-1">Hora fin</label>
          <Input
            type="time"
            className={inputClasses}
            {...register("endTime", {
              validate: value =>
                !watchStartTime || value >= watchStartTime ||
                "La hora fin no puede ser anterior a la hora inicio"
            })}
          />
          {errors.endTime && (
            <p className="text-base text-red-600 mt-1">{errors.endTime.message}</p>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <Textarea
          rows={4}
          className={inputClasses}
          {...register("description", { required: "La descripción es obligatoria" })}
        />
        {errors.description && (
          <p className="text-base text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Enlace adicional (opcional) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Enlace adicional <span className="text-xs text-gray-500">(opcional)</span>
        </label>
        <Input
          type="url"
          className={inputClasses}
          placeholder="https://"
          {...register("additionalLink")}
        />
      </div>

      {/* Cambiar imagen */}
      <div>
        <label className="block text-sm font-medium mb-1">Cambiar imagen</label>
        <Input
          type="file"
          accept="image/*"
          className={inputClasses}
          {...register("image")}
        />
        <p className="text-xs text-gray-500 mt-1">
          Selecciona una nueva imagen (opcional)
        </p>
      </div>

      {/* Controles */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button
          variant="outline"
          className="border-sapphire-600 text-sapphire-600 hover:bg-sapphire-50"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-sapphire-600 hover:bg-sapphire-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Actualizando..." : "Actualizar Evento"}
        </Button>
      </div>
    </form>
  )
}
