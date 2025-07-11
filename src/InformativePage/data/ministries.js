import { Music, Baby, GraduationCap, Heart, Users2 } from "lucide-react"

export const ministries = [
  {
    slug: "alabanza",
    name: "Ministerio de Alabanza",
    description: "Únete a nuestro equipo de adoración y usa tus talentos musicales para glorificar a Dios.",
    shortDescription: "Únete a nuestro equipo de adoración y usa tus talentos musicales para glorificar a Dios.",
    image: "iglesia/ministerios/alabanza",
    icon: Music,
    mission:
      "Guiar a la congregación en adoración genuina y crear un ambiente donde las personas puedan conectarse con Dios a través de la música.",
    requirements: [
      "Ser miembro activo de la iglesia",
      "Tener conocimientos básicos de música",
      "Compromiso con los ensayos semanales",
      "Corazón de adoración y servicio",
    ],
    schedule: [
      "Ensayos: Jueves 7:00 PM",
      "Servicios: Domingos 9:00 AM y 6:00 PM",
      "Eventos especiales según calendario",
    ],
  },
  {
    slug: "infantil",
    name: "Ministerio Infantil",
    description: "Programas especiales para niños donde aprenden sobre el amor de Jesús de manera divertida.",
    shortDescription: "Programas especiales para niños donde aprenden sobre el amor de Jesús de manera divertida.",
    image: "iglesia/ministerios/infantil",
    icon: Baby,
    mission:
      "Enseñar a los niños sobre el amor de Dios de manera creativa y divertida, ayudándoles a desarrollar una relación personal con Jesús.",
    requirements: [
      "Amor por los niños",
      "Paciencia y creatividad",
      "Disponibilidad los domingos",
      "Certificado de antecedentes penales",
    ],
    schedule: ["Domingos: 9:00 AM - 12:00 PM", "Eventos especiales para niños", "Campamentos de verano"],
  },
  {
    slug: "juvenil",
    name: "Ministerio Juvenil",
    description: "Actividades y enseñanzas diseñadas especialmente para adolescentes y jóvenes adultos.",
    shortDescription: "Actividades y enseñanzas diseñadas especialmente para adolescentes y jóvenes adultos.",
    image: "iglesia/ministerios/juvenil",
    icon: GraduationCap,
    mission: "Discipular a los jóvenes para que crezcan en su fe y se conviertan en líderes comprometidos con Cristo.",
    requirements: [
      "Edades entre 13-25 años",
      "Deseo de crecer espiritualmente",
      "Participación en actividades grupales",
      "Compromiso con los valores cristianos",
    ],
    schedule: ["Viernes: 7:00 PM - 9:00 PM", "Retiros mensuales", "Actividades recreativas"],
  },
  {
    slug: "ayuda",
    name: "Ministerio de Ayuda",
    description: "Servimos a nuestra comunidad a través de programas de asistencia y apoyo social.",
    shortDescription: "Servimos a nuestra comunidad a través de programas de asistencia y apoyo social.",
    image: "iglesia/ministerios/ayuda",
    icon: Heart,
    mission: "Demostrar el amor de Cristo sirviendo a los necesitados en nuestra comunidad y más allá.",
    requirements: [
      "Corazón de servicio",
      "Disponibilidad para actividades comunitarias",
      "Trabajo en equipo",
      "Compromiso con la misión social",
    ],
    schedule: ["Sábados: 8:00 AM - 12:00 PM", "Programas de alimentación", "Visitas a hogares de ancianos"],
  },
  {
    slug: "damas",
    name: "Ministerio de Damas",
    description: "Un espacio para que las mujeres crezcan en fe, amistad y propósito juntas.",
    shortDescription: "Un espacio para que las mujeres crezcan en fe, amistad y propósito juntas.",
    image: "iglesia/ministerios/damas",
    icon: Heart,
    mission: "Fortalecer a las mujeres en su caminar con Dios y crear vínculos de hermandad y apoyo mutuo.",
    requirements: [
      "Ser mujer cristiana",
      "Deseo de crecimiento espiritual",
      "Participación en actividades grupales",
      "Apoyo a otras mujeres",
    ],
    schedule: ["Martes: 7:00 PM - 9:00 PM", "Retiros trimestrales", "Conferencias especiales"],
  },
  {
    slug: "varones",
    name: "Ministerio de Varones",
    description: "Fortaleciendo a los hombres para ser líderes piadosos en sus hogares y comunidad.",
    shortDescription: "Fortaleciendo a los hombres para ser líderes piadosos en sus hogares y comunidad.",
    image: "iglesia/ministerios/varones",
    icon: Users2,
    mission: "Equipar a los hombres para ser líderes según el corazón de Dios en sus familias y comunidad.",
    requirements: [
      "Ser hombre cristiano",
      "Compromiso con el liderazgo bíblico",
      "Participación en estudios bíblicos",
      "Mentoreo de otros hombres",
    ],
    schedule: ["Sábados: 6:00 AM - 8:00 AM", "Retiros anuales", "Actividades deportivas"],
  },
]
