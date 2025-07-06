import Hero from "../components/hero"
import ServiceSchedule from "../components/service-schedule"
import About from "../components/about"
import Pastors from "../components/pastors"
import Ministries from "../components/ministries"
import Events from "../components/events"
import Donations from "../components/donations"
import Contact from "../components/contact"
import Newsletter from "../components/newsletter"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServiceSchedule />
      <About />
      <Pastors />
      <Ministries />
      <Events />
      <Donations />
      <Contact />
      <Newsletter />
    </main>
  )
}
