import { Card, CardContent, CardHeader, CardTitle } from "@/InformativePage/components/ui/card"
import CloudinaryImage from "../components/cloudinary-image"
import { Link } from "react-router-dom"
import { ministries } from "../data/ministries"

export default function MinisteriosPage() {
  return (
    <main className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Ministerios</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo puedes servir y crecer en tu fe a través de nuestros diversos ministerios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry) => (
            <Link key={ministry.slug} to={`/ministerios/${ministry.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <CloudinaryImage
                    publicId={ministry.image}
                    alt={ministry.name}
                    transformation="card"
                    className="rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{ministry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{ministry.shortDescription}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
