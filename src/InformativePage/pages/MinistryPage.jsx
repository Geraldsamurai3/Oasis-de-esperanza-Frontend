"use client"

import { useParams, Navigate } from "react-router-dom"
import { Button } from "@/InformativePage/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import { ministries } from "../data/ministries"

export default function MinistryPage() {
  const { slug } = useParams()
  const ministry = ministries.find((m) => m.slug === slug)

  if (!ministry) {
    return <Navigate to="/ministerios" replace />
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sapphire-50 to-blue-50">
        <div className="container px-4 mx-auto text-center">
          <div className="mb-6">
            {ministry.icon && <ministry.icon className="h-16 w-16 text-sapphire-700 mx-auto" />}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{ministry.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{ministry.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
              <p className="text-gray-600 mb-6">{ministry.mission}</p>
              <Button className="bg-sapphire-700 hover:bg-sapphire-800">Únete al Ministerio</Button>
            </div>
            <div className="relative h-96">
              <CloudinaryImage
                publicId={ministry.image}
                alt={ministry.name}
                transformation="hero"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Activities */}
          {ministry.activities && (
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {ministry.activities.map((activity, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <activity.icon className="h-12 w-12 text-sapphire-700 mx-auto mb-4" />
                    <CardTitle>{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Requirements */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">¿Cómo Participar?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Requisitos:</h4>
                <ul className="space-y-2 text-gray-600">
                  {ministry.requirements?.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Horarios:</h4>
                <ul className="space-y-2 text-gray-600">
                  {ministry.schedule?.map((schedule, index) => (
                    <li key={index}>• {schedule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
