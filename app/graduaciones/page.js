'use client'
import CategoryPage from '../../components/CategoryPage'

const designs = [
  { name: 'Logro', desc: 'Diseño formal con tonos azul marino y dorado', color: '#2c3e5a', accent: '#5a7bad', light: true },
  { name: 'Éxito', desc: 'Moderno y vibrante con energía juvenil', color: '#3a6b5a', accent: '#6bad8a', light: true },
  { name: 'Academia', desc: 'Clásico universitario con elegancia sobria', color: '#4a3a5a', accent: '#8a6bad', light: true },
]

export default function Graduaciones() {
  return (
    <CategoryPage
      accentColor="#5a7bad"
      tag="Colección Graduaciones 2026"
      titlePlain="Invitaciones para"
      titleEm="Graduaciones"
      subtitle="Comparte tu logro académico con quienes te acompañaron. Diseños profesionales con toda la información de tu ceremonia."
      designs={designs}
      demoImage="/demo-graduaciones-v1.png"
      darkPhone
      ctaText="Escríbenos y lo personalizamos para tu graduación. Entrega en 5-7 días laborales."
      waMessage="Hola Festejia! Me interesa una invitación de graduación."
    />
  )
}
