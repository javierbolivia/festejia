'use client'
import CategoryPage from '../../components/CategoryPage'

const designs = [
  { name: 'Serenata', desc: 'Elegancia atemporal en tonos dorados y marfil', color: '#e8d5b0', accent: '#c9a96e' },
  { name: 'Aurora', desc: 'Romanticismo contemporáneo en matices cálidos', color: '#d4b8c4', accent: '#a07090' },
  { name: 'Jardín', desc: 'Frescura natural con delicadeza orgánica', color: '#c8d8c0', accent: '#6a8a60' },
  { name: 'Allegria', desc: 'Sofisticación moderna con detalles florales', color: '#80958E', accent: '#4a6a60' },
  { name: 'Napoli', desc: 'Estilo mediterráneo con calidez dorada', color: '#d4a574', accent: '#a07040' },
  { name: 'Terra', desc: 'Tonos tierra con elegancia rústica', color: '#a08060', accent: '#705030' },
]

export default function Bodas() {
  return (
    <CategoryPage
      accentColor="#c9a96e"
      tag="Colección Bodas 2026"
      titlePlain="Invitaciones para"
      titleEm="Bodas"
      subtitle="Diseños exclusivos que reflejan la magia de tu unión. Cada invitación es una experiencia digital interactiva con música, animaciones y confirmación de asistencia."
      designs={designs}
      demoImage="/demo-bodas-v1.png"
      ctaText="Escríbenos y lo personalizamos con la información de tu boda. Entrega en 5-7 días laborales."
      waMessage="Hola Festejia! Me interesa una invitación de boda."
    />
  )
}
