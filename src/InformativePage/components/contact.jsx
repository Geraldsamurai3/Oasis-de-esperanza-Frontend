// src/InformativePage/pages/Contact.jsx
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/InformativePage/components/ui/card";
import { Input } from "@/InformativePage/components/ui/input";
import { Textarea } from "@/InformativePage/components/ui/textarea";
import { Button } from "@/InformativePage/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { useContact } from '../hook/useContact';

const motivosContacto = [
  'Información General',
  'Oración',
  'Ministerios',
  'Eventos',
  'Donaciones',
  'Otro',
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();
  const { send, error: sendError } = useContact();

  const onSubmit = async (data) => {
    try {
      await send(data);
      Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Gracias por escribirnos. Te responderemos pronto.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
    } catch {
      Swal.fire({
        title: 'Error al enviar',
        text: sendError?.message || 'Intenta de nuevo más tarde.',
        icon: 'error',
      });
    }
  };

  const inputCls = `
    mt-1 block w-full rounded-lg border border-gray-300
    px-3 py-2 placeholder-gray-400 focus:outline-none
    focus:ring-2 focus:ring-sapphire-500 focus:border-transparent
  `;

  return (
    <section id="contacto" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Lado informativo */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Ponte en Contacto</h2>
            <p className="text-lg text-gray-600">
              Nos encantaría conocerte y responder cualquier pregunta que tengas.
            </p>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-sapphire-600 mr-3" />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p>Av. Esperanza 123, Ciudad, País</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-sapphire-600 mr-3" />
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-sapphire-600 mr-3" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>info@oasisesperanza.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <Card className="shadow-lg">
            <CardHeader className="bg-white rounded-t-lg px-6 py-4">
              <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
              <CardDescription className="text-gray-600">
                Completa el formulario y nos pondremos en contacto contigo pronto.
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white px-6 py-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <Input
                      className={inputCls}
                      placeholder="Tu nombre"
                      {...register('firstName', { required: 'Nombre obligatorio' })}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Apellido</label>
                    <Input
                      className={inputCls}
                      placeholder="Tu apellido"
                      {...register('lastName', { required: 'Apellido obligatorio' })}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    className={inputCls}
                    placeholder="tu@correo.com"
                    {...register('email', {
                      required: 'Email obligatorio',
                      pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono</label>
                  <Input
                    type="tel"
                    className={inputCls}
                    placeholder="+506 8888-0000"
                    {...register('phone', { required: 'Teléfono obligatorio' })}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Motivo de Contacto</label>
                  <select
                    className={inputCls}
                    defaultValue=""
                    {...register('reason', { required: 'Selecciona un motivo' })}
                  >
                    <option value="" disabled>-- Selecciona --</option>
                    {motivosContacto.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {errors.reason && (
                    <p className="text-red-600 text-sm mt-1">{errors.reason.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Mensaje</label>
                  <Textarea
                    rows={4}
                    className={inputCls}
                    placeholder="Escribe tu mensaje aquí..."
                    {...register('message', { required: 'Mensaje obligatorio' })}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="text-right">
                  <Button
                    type="submit"
                    className="bg-sapphire-600 hover:bg-sapphire-700 text-white px-6 py-2 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
