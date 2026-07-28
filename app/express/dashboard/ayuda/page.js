'use client'
import ExpressDashboardLayout from '../ExpressDashboardLayout'

const FAQ = [
  {
    q: '¿Qué incluye el Plan Express?',
    a: 'Una invitación digital con plantilla prediseñada, fotos, música, y todos los datos de tu evento. No incluye nombres de invitados individuales ni confirmación por invitado.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Bs. 200 por la publicación de tu invitación, activa hasta el día siguiente de tu evento.',
  },
  {
    q: '¿Cómo pago?',
    a: 'Cuando termines de diseñar tu invitación y presiones "Publicar", te enviaremos a WhatsApp con un mensaje ya listo para coordinar el pago.',
  },
  {
    q: '¿Puedo editar mi invitación después de publicarla?',
    a: 'Sí, tienes 2 correcciones gratis. Si necesitas más, puedes solicitar 2 correcciones adicionales por Bs. 30.',
  },
  {
    q: '¿Hasta cuándo estará activa mi invitación?',
    a: 'Tu invitación permanece visible hasta el día siguiente de la fecha de tu evento. Después se desactiva automáticamente.',
  },
  {
    q: '¿Puedo cambiar de plantilla después de elegirla?',
    a: 'No. Una vez elegida la plantilla no se puede cambiar en la misma invitación. Si deseas otro diseño, puedes crear una invitación nueva.',
  },
]

export default function ExpressAyuda() {
  return (
    <ExpressDashboardLayout activeTab="ayuda">
      <div className="express-page-header">
        <h1>Ayuda</h1>
      </div>

      <div className="express-faq-list">
        {FAQ.map((item, i) => (
          <div key={i} className="express-faq-item">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>

      <div className="express-help-contact">
        <p>¿Tienes otra pregunta?</p>
        <a
          href="https://wa.me/59100000000?text=Hola%20Festejia%20Express!%20Tengo%20una%20duda."
          target="_blank"
          rel="noopener noreferrer"
          className="express-btn-primary"
        >
          Escríbenos por WhatsApp
        </a>
      </div>

      <style jsx global>{`
        .express-faq-list { display: flex; flex-direction: column; gap: 1rem; max-width: 600px; }
        .express-faq-item { background: white; border-radius: 10px; padding: 1.2rem 1.4rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .express-faq-item h3 { font-size: 0.95rem; margin-bottom: 0.4rem; color: #1a1a1a; }
        .express-faq-item p { font-size: 0.85rem; color: #666; line-height: 1.5; }
        .express-help-contact { margin-top: 1.5rem; }
        .express-help-contact p { font-size: 0.85rem; color: #666; margin-bottom: 0.6rem; }
      `}</style>
    </ExpressDashboardLayout>
  )
}
