'use client'
import CategoryPage from '../../components/CategoryPage'

const designs = [
  { name: 'Bendición', desc: 'Pureza y ternura en tonos blancos y celestes', color: '#d0e8f0', accent: '#7ab8d0' },
  { name: 'Ángel', desc: 'Suavidad celestial con detalles dorados', color: '#e8e0c8', accent: '#c9a96e' },
  { name: 'Gracia', desc: 'Delicadeza en tonos pastel con toque clásico', color: '#d8e8d0', accent: '#8ab880' },
]

export default function Bautizos() {
  return (
    <CategoryPage
      accentColor="#7ab8d0"
      tag="Colección Bautizos 2026"
      titlePlain="Invitaciones para"
      titleEm="Bautizos"
      subtitle="Una bendición merece una invitación a la altura. Diseños delicados con toda la información de la ceremonia."
      designs={designs}
      demoImage="/demo-bautizos-v1.png"
      ctaText="Escríbenos y lo personalizamos para el bautizo. Entrega en 5-7 días laborales."
      waMessage="Hola Festejia! Me interesa una invitación de bautizo."
    />
  )
}
