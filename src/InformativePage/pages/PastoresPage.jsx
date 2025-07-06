import { pastors } from "../data/pastors"
import CloudinaryImage from "../components/cloudinary-image"
import { Card, CardContent } from "@/InformativePage/components/ui/card"
import { Badge } from "@/InformativePage/components/ui/badge"
import { Heart, BookOpen, Phone, Mail, Users } from "lucide-react"

export default function PastoresPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-sapphire-50 to-blue-50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Pastores</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conoce a los líderes que Dios ha puesto para pastorear nuestra congregación con amor y sabiduría.
          </p>
        </div>
      </section>

      {/* Pastors */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {pastors.map((pastor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-80">
                  <CloudinaryImage
                    publicId={pastor.image}
                    alt={`${pastor.name} ${pastor.lastName}`}
                    transformation="pastor"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {pastor.name} {pastor.lastName}
                    </h3>
                    <p className="text-sapphire-200 font-medium">{pastor.title}</p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-600 leading-relaxed">{pastor.description}</p>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Heart className="h-4 w-4 text-sapphire-700 mr-2" />
                      Áreas de Ministerio
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pastor.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="border-sapphire-200 text-sapphire-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Verse */}
                  <div className="bg-sapphire-50 p-4 rounded-lg border-l-4 border-sapphire-700">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 text-sapphire-700 mr-2" />
                      Versículo Favorito
                    </h4>
                    <p className="text-gray-700 italic text-sm leading-relaxed">{pastor.favoriteVerse}</p>
                  </div>

                  {/* Contact */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Phone className="h-4 w-4 text-sapphire-700 mr-2" />
                      Contacto Pastoral
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center">
                        <Phone className="h-3 w-3 mr-2" />
                        <a href={`tel:${pastor.phone}`} className="hover:text-sapphire-700">
                          {pastor.phone}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <Mail className="h-3 w-3 mr-2" />
                        <a href={`mailto:${pastor.email}`} className="hover:text-sapphire-700">
                          {pastor.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leadership Section */}
          <div className="bg-gradient-to-r from-sapphire-50 to-blue-50 rounded-2xl p-8 mt-12 text-center">
            <Users className="h-12 w-12 text-sapphire-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Un Liderazgo Comprometido</h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Los Pastores Arturo y Marianela forman un matrimonio sólido que ha servido fielmente como equipo pastoral
              a nuestra congregación durante más de 15 años. Su unión en el ministerio y su dedicación compartida son un
              testimonio viviente del amor de Cristo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-sapphire-700">15+</div>
                <div className="text-sm text-gray-600">Años de Ministerio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sapphire-700">500+</div>
                <div className="text-sm text-gray-600">Vidas Impactadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sapphire-700">25+</div>
                <div className="text-sm text-gray-600">Líderes Formados</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
