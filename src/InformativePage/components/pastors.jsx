'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/InformativePage/components/ui/card"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Heart, BookOpen, Users, Phone } from "lucide-react"
import { pastors } from "@/InformativePage/data/pastors"
import { fadeUp, fadeIn } from "../animations/globalVariants"

export default function Pastors() {
  return (
    <motion.section
      className="py-16 bg-white"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
      id="pastores"
    >
      <div className="container px-4 mx-auto">
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <Badge className="bg-sapphire-100 text-sapphire-800 mb-4">
            Nuestro Liderazgo
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Conoce a Nuestros Pastores
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dios nos ha bendecido con líderes dedicados que pastorean con amor, sabiduría y un corazón genuino por las
            personas.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12"
          variants={fadeUp}
        >
          {pastors.map((pastor, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="relative">
                  {/* Aquí podrías colocar una imagen de fondo si la tuvieras */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {pastor.name} {pastor.lastName}
                    </h3>
                    <p className="text-sapphire-200 font-medium">{pastor.title}</p>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <p className="text-gray-600 leading-relaxed">{pastor.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Heart className="h-4 w-4 text-sapphire-700 mr-2" />
                      Áreas de Ministerio
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {pastor.specialties.map((spec, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-sapphire-200 text-sapphire-700 text-xs sm:text-sm"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-sapphire-50 p-4 rounded-lg border-l-4 border-sapphire-700">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 text-sapphire-700 mr-2" />
                      Versículo Favorito
                    </h4>
                    <p className="text-gray-700 italic text-sm leading-relaxed">
                      {pastor.favoriteVerse}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Phone className="h-4 w-4 text-sapphire-700 mr-2" />
                      Contacto Pastoral
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📞 {pastor.phone}</p>
                      <p>✉️ {pastor.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-sapphire-50 to-blue-50 rounded-2xl p-8 text-center"
          variants={fadeIn}
        >
          <Users className="h-12 w-12 text-sapphire-700 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Un Liderazgo Comprometido
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Los Pastores Arturo y Marianela forman un matrimonio sólido que ha servido fielmente como equipo pastoral a
            nuestra congregación durante más de 15 años. Su unión en el ministerio y su dedicación compartida son un
            testimonio viviente del amor de Cristo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-sapphire-700">15+</div>
              <div className="text-xs sm:text-sm text-gray-600">Años de Ministerio</div>
            </motion.div>
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-sapphire-700">500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Vidas Impactadas</div>
            </motion.div>
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-sapphire-700">25+</div>
              <div className="text-xs sm:text-sm text-gray-600">Líderes Formados</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
