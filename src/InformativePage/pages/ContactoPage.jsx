import Contact from "../components/contact"

export default function ContactoPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-sapphire-50 to-blue-50">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nos encantaría conocerte y responder cualquier pregunta que tengas. Estamos aquí para servirte.
          </p>
        </div>
      </section>

      <Contact />
    </main>
  )
}
