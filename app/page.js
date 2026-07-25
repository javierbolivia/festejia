'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled')
      } else {
        navbar?.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* NAVIGATION */}
      <nav className="navbar">
        <a href="#" className="nav-logo">Feste<span>jia</span></a>
        <ul className="nav-links">
          <li><a href="#disenos">Diseños</a></li>
          <li><a href="#planes">Planes</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contacto" className="nav-cta">Contactar</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Invitaciones Digitales Premium</span>
          <h1>
            Tu evento merece una <strong>invitación única</strong>
          </h1>
          <p>
            Creamos experiencias web interactivas para bodas y eventos especiales.
            Portada animada, confirmación de asistencia, QR de acceso y panel de gestión completo.
          </p>
          <div className="hero-buttons">
            <a href="#planes" className="btn-primary">Ver Planes</a>
            <a href="#disenos" className="btn-secondary">Ver Diseños</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="servicios">
        <div className="section-title">
          <h2>Todo lo que necesitas para tu evento</h2>
          <p>Una invitación web completa con herramientas de gestión profesional</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💌</div>
            <h3>Invitación Interactiva</h3>
            <p>Página web exclusiva con portada animada, cuenta regresiva, galería de fotos, mapa y música de fondo.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Panel del Anfitrión</h3>
            <p>Gestiona tu lista de invitados, genera links personalizados y envía por WhatsApp desde un solo lugar.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Confirmación Inteligente</h3>
            <p>Cada invitado confirma desde su invitación. Tú ves el estado en tiempo real sin recibir cientos de mensajes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>QR y Check-in</h3>
            <p>Se genera un QR único al confirmar. Escanea en la puerta del evento para control de ingreso.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Diseño Personalizado</h3>
            <p>Elige entre nuestros modelos y personalízalo con tus colores, fotos y textos. O solicita un diseño único.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Estadísticas en Vivo</h3>
            <p>Pases enviados, confirmados, pendientes y rechazados. Todo en un dashboard claro y exportable a Excel.</p>
          </div>
        </div>
      </section>

      {/* DESIGNS */}
      <section id="disenos">
        <div className="section-title">
          <h2>Nuestros Diseños</h2>
          <p>Modelos elegantes listos para personalizar con la información de tu evento</p>
        </div>
        <div className="designs-grid">
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #e8d5b0, #f5efe6)'}}>
              Serenata
            </div>
            <div className="design-info">
              <h3>Serenata</h3>
              <p>Elegante y clásico — tonos dorados</p>
            </div>
          </div>
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #c8d8c0, #eef5eb)'}}>
              Jardín
            </div>
            <div className="design-info">
              <h3>Jardín</h3>
              <p>Natural y fresco — tonos verdes</p>
            </div>
          </div>
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #d4b8c4, #f5eef2)'}}>
              Aurora
            </div>
            <div className="design-info">
              <h3>Aurora</h3>
              <p>Romántico y suave — tonos rosados</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="planes">
        <div className="section-title">
          <h2>Planes y Precios</h2>
          <p>Elige el plan perfecto para tu celebración</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Esencial</h3>
            <div className="pricing-price">$45 <span>USD</span></div>
            <ul className="pricing-features">
              <li>Invitación web completa</li>
              <li>Portada animada</li>
              <li>Cuenta regresiva</li>
              <li>Mapa de ubicación</li>
              <li>Música de fondo</li>
              <li>Confirmación por WhatsApp</li>
              <li>1 link genérico</li>
              <li>2 revisiones</li>
            </ul>
            <a href="#contacto" className="btn-pricing">Elegir Plan</a>
          </div>
          <div className="pricing-card featured">
            <h3>Premium</h3>
            <div className="pricing-price">$90 <span>USD</span></div>
            <ul className="pricing-features">
              <li>Todo lo del plan Esencial</li>
              <li>Panel del Anfitrión</li>
              <li>Links personalizados ilimitados</li>
              <li>Confirmación inteligente</li>
              <li>Personalización de colores</li>
              <li>Galería de fotos</li>
              <li>Mensaje personalizable</li>
              <li>3 revisiones</li>
            </ul>
            <a href="#contacto" className="btn-pricing">Elegir Plan</a>
          </div>
          <div className="pricing-card">
            <h3>Exclusive</h3>
            <div className="pricing-price">$150 <span>USD</span></div>
            <ul className="pricing-features">
              <li>Todo lo del plan Premium</li>
              <li>QR de acceso + Check-in</li>
              <li>Control de ingreso/salida</li>
              <li>Asignación de mesas</li>
              <li>Diseño 100% personalizado</li>
              <li>Dominio propio incluido</li>
              <li>Soporte prioritario</li>
              <li>Revisiones ilimitadas</li>
            </ul>
            <a href="#contacto" className="btn-pricing">Elegir Plan</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="section-title">
          <h2>Preguntas Frecuentes</h2>
          <p>Todo lo que necesitas saber antes de empezar</p>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>¿Qué es una invitación web?</summary>
            <p>Es una página web real diseñada exclusivamente para tu evento. A diferencia de un PDF o un diseño de Canva, es interactiva: tiene animaciones, cuenta regresiva, mapa, música, y tus invitados pueden confirmar asistencia directamente.</p>
          </details>
          <details className="faq-item">
            <summary>¿Cómo envío la invitación a mis invitados?</summary>
            <p>Te entregamos un link único que puedes compartir por WhatsApp, correo o redes sociales. En los planes Premium y Exclusive, cada invitado recibe un link personalizado con su nombre y número de pases.</p>
          </details>
          <details className="faq-item">
            <summary>¿Cómo funciona el Panel del Anfitrión?</summary>
            <p>Es tu centro de control. Desde ahí agregas invitados, generas links personalizados, envías por WhatsApp, ves quién confirmó, asignas mesas y controlas el ingreso al evento con QR.</p>
          </details>
          <details className="faq-item">
            <summary>¿Cuánto tiempo tarda la entrega?</summary>
            <p>El tiempo estándar es de 5 a 7 días después de recibir toda tu información. Si tienes urgencia, ofrecemos entrega express en 48 horas.</p>
          </details>
          <details className="faq-item">
            <summary>¿Puedo hacer cambios después?</summary>
            <p>Sí, tu plan incluye rondas de revisión. El plan Esencial y Premium incluyen 2-3 revisiones. El plan Exclusive incluye revisiones ilimitadas.</p>
          </details>
          <details className="faq-item">
            <summary>¿Funciona en cualquier celular?</summary>
            <p>Absolutamente. Nuestras invitaciones están optimizadas para verse perfectamente en iPhone, Android, tablets y computadoras.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contacto">
        <h2>¿Listo para crear tu invitación?</h2>
        <p>Escríbenos por WhatsApp y te asesoramos sin compromiso</p>
        <a href="https://wa.me/59100000000?text=Hola!%20Me%20interesa%20una%20invitación%20digital%20para%20mi%20evento" className="btn-primary" target="_blank" rel="noopener noreferrer">
          Escribir por WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Feste<span>jia</span></div>
        <p>Invitaciones digitales premium para eventos especiales</p>
        <div className="footer-links">
          <a href="#disenos">Diseños</a>
          <a href="#planes">Planes</a>
          <a href="#faq">FAQ</a>
          <a href="#contacto">Contacto</a>
        </div>
        <p style={{marginTop: '2rem', fontSize: '0.75rem'}}>© 2025 Festejia. Todos los derechos reservados.</p>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/59100000000?text=Hola!%20Me%20interesa%20una%20invitación%20digital" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  )
}
