'use client'
import CategoryPage from '../../components/CategoryPage'

const designs = [
  { name: 'Princesa', desc: 'Tonos rosados con detalles de corona dorada', color: '#f0c4d4', accent: '#d4708a' },
  { name: 'Mariposa', desc: 'Ligereza y fantasía en violetas suaves', color: '#c8b4e0', accent: '#8a60b0' },
  { name: 'Encanto', desc: 'Elegancia juvenil con toques brillantes', color: '#e8c8d8', accent: '#c070a0' },
  { name: 'Celestial', desc: 'Azules y plateados con aires de ensueño', color: '#b8c8e8', accent: '#5070a0' },
]

export default function Quince() {
  return (
    <CategoryPage
      accentColor="#d4708a"
      tag="Colección XV Años 2026"
      titlePlain="Invitaciones para"
      titleEm="15 Años"
      subtitle="Celebra tu presentación en sociedad con un diseño único. Invitaciones interactivas con cuenta regresiva, música y confirmación de asistencia."
      designs={designs}
      demoImage="/demo-quince-v1.png"
      ctaText="Escríbenos y lo personalizamos para tu quinceañera. Entrega en 5-7 días laborales."
      waMessage="Hola Festejia! Me interesa una invitación de 15 años."
    />
  )
}
