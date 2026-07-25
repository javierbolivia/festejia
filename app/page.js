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
          <li><a href="#coleccion">Coleccion</a></li>
          <li><a href="#planes">Planes</a></li>
          <li><a href="#proceso">Proceso</a></li>
          <li><a href="#contacto" className="nav-cta">Solicitar</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Experiencias digitales para momentos irrepetibles</span>
          <h1>
            El arte de <strong>invitar</strong> reinventado
          </h1>
          <p>
            Diseñamos invitaciones web que cautivan desde el primer instante. 
            Cada detalle pensado para que tu celebración comience mucho antes del gran día.
          </p>
          <div className="hero-buttons">
            <a href="#contacto" className="btn-primary">Solicitar Cotización</a>
            <a href="#coleccion" className="btn-secondary">Explorar Colección</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="servicios">
        <div className="section-title">
          <h2>Una experiencia completa, no solo una invitación</h2>
          <p>Cada pieza digital que creamos integra diseño, tecnología y emoción</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>Portada Cinematográfica</h3>
            <p>Una apertura envolvente con animaciones sutiles que marcan el tono de tu celebración desde el primer segundo.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◈</div>
            <h3>Panel del Anfitrión</h3>
            <p>Tu centro de mando privado. Gestiona invitados, genera enlaces únicos y envía por WhatsApp con un solo clic.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◇</div>
            <h3>Confirmación Inteligente</h3>
            <p>Sin mensajes interminables. Cada invitado confirma desde su propia invitación y tú lo ves en tiempo real.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⬡</div>
            <h3>Acceso con QR</h3>
            <p>Al confirmar, cada invitado recibe un código QR único. Escanea en la puerta para un registro impecable.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❖</div>
            <h3>Diseño a Medida</h3>
            <p>No usamos plantillas genéricas. Cada invitación refleja la esencia de tu historia y el espíritu de tu evento.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◆</div>
            <h3>Cuenta Regresiva</h3>
            <p>Un reloj elegante que alimenta la anticipación. Tus invitados sentirán la emoción crecer día tras día.</p>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="coleccion">
        <div className="section-title">
          <h2>Nuestra Colección</h2>
          <p>Tres líneas de diseño concebidas para distintas sensibilidades</p>
        </div>
        <div className="designs-grid">
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #e8d5b0, #f5efe6)'}}>
              Serenata
            </div>
            <div className="design-info">
              <h3>Serenata</h3>
              <p>Sofisticación atemporal en tonos dorados y marfil</p>
            </div>
          </div>
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #c8d8c0, #eef5eb)'}}>
              Jardín
            </div>
            <div className="design-info">
              <h3>Jardín</h3>
              <p>Frescura natural con la delicadeza de lo orgánico</p>
            </div>
          </div>
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #d4b8c4, #f5eef2)'}}>
              Aurora
            </div>
            <div className="design-info">
              <h3>Aurora</h3>
              <p>Romanticismo contemporáneo en matices cálidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="planes">
        <div className="section-title">
          <h2>Elige tu Experiencia</h2>
          <p>Tres niveles de servicio diseñados para distintas necesidades</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Esencial</h3>
            <div className="pricing-price">$45 <span>USD</span></div>
            <ul className="pricing-features">
              <li>Invitación web con diseño exclusivo</li>
              <li>Portada con animación de apertura</li>
              <li>Reloj de cuenta regresiva</li>
              <li>Ubicación con mapa interactivo</li>
              <li>Ambientación musical</li>
              <li>Confirmación vía WhatsApp</li>
              <li>Enlace compartible universal</li>
              <li>2 rondas de ajustes</li>
            </ul>
            <a href="#contacto" className="btn-pricing">Comenzar</a>
          </div>
          <div className="pricing-card featured">
            <h3>Premium</h3>
            <div className="pricing-price">$90 <span>USD</span></div>
            <ul className="pricing-features">
              <li>Todo lo del plan Esencial</li>
              <li>Panel del Anfitrión completo</li>
              <li>Enlaces personalizados ilimitados</li>
              <li>Sistema de confirmación inteligente</li>
              <li>Paleta de colores personalizada</li>
              <li>Galería fotográfica</li>
              <li>Mensaje de envío editable</li>
              <li>3 rondas de ajustes</li>
            </ul>
            <a href="#contacto" className="btn-pricing">Comenzar</a>
          </div>
          <div className="pricing-card">
            <h3>Exclusive</h3>
            <div className="pricing-price">$150 <span>USD</span></div>
            <ul className="pricing-features">
              <li>Todo lo del plan Premium</li>
              <li>QR de acceso y check-in digital</li>
              <li>Control de ingreso y salida</li>
              <li>Asignación inteligente de mesas</li>
              <li>Diseño creado desde cero</li>
              <li>Dominio propio incluido</li>
              <li>Atención prioritaria</li>
              <li>Ajustes ilimitados</li>
            </ul>
            <a href="#contacto" className="btn-pricing">Comenzar</a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso">
        <div className="section-title">
          <h2>Así de Simple</h2>
          <p>De la idea a la invitación perfecta en cuatro pasos</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">01</div>
            <h3>Conversamos</h3>
            <p>Nos cuentas sobre tu evento, tu estilo y tus necesidades. Sin compromiso, sin presión.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">02</div>
            <h3>Diseñamos</h3>
            <p>Nuestro equipo crea tu invitación con dedicación artesanal. Cada píxel importa.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">03</div>
            <h3>Ajustamos</h3>
            <p>Te presentamos el resultado y refinamos cada detalle hasta que sea exactamente lo que imaginaste.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">04</div>
            <h3>Celebras</h3>
            <p>Tu invitación está lista. Comparte, gestiona confirmaciones y disfruta la anticipación.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="section-title">
          <h2>Preguntas Frecuentes</h2>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>¿Qué diferencia una invitación web de un PDF o Canva?</summary>
            <p>Una invitación web es una experiencia interactiva completa: tiene animaciones, música, cuenta regresiva, mapa, confirmación de asistencia y funciona como un sitio web privado diseñado exclusivamente para tu evento. Un PDF es estático, una invitación web cobra vida.</p>
          </details>
          <details className="faq-item">
            <summary>¿Cómo la envío a mis invitados?</summary>
            <p>Recibes un enlace único que compartes por WhatsApp, correo o redes sociales. En los planes Premium y Exclusive, cada invitado recibe su propio enlace personalizado con su nombre y cantidad de pases.</p>
          </details>
          <details className="faq-item">
            <summary>¿Qué es el Panel del Anfitrión?</summary>
            <p>Es tu centro de control privado. Desde ahí agregas invitados, generas enlaces personalizados, envías invitaciones por WhatsApp, ves quién confirmó en tiempo real, asignas mesas y controlas el ingreso al evento mediante QR.</p>
          </details>
          <details className="faq-item">
            <summary>¿En cuánto tiempo estará lista mi invitación?</summary>
            <p>El tiempo estándar es de 5 a 7 días laborales una vez que recibimos toda tu información. Si necesitas urgencia, ofrecemos entrega express garantizada en 48 horas.</p>
          </details>
          <details className="faq-item">
            <summary>¿Puedo solicitar cambios después de ver el resultado?</summary>
            <p>Por supuesto. Cada plan incluye rondas de revisión para que todo quede perfecto. El plan Exclusive incluye ajustes ilimitados hasta que estés completamente satisfecho.</p>
          </details>
          <details className="faq-item">
            <summary>¿Se ve bien en cualquier teléfono?</summary>
            <p>Absolutamente. Cada invitación está optimizada para verse impecable en iPhone, Android, tablets y computadoras. La experiencia es fluida en cualquier dispositivo.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contacto">
        <h2>Tu celebración merece algo extraordinario</h2>
        <p>Conversemos sobre tu evento. Sin compromiso, con toda la inspiración.</p>
        <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20digital%20para%20mi%20evento.%20¿Podemos%20conversar?" className="btn-primary" target="_blank" rel="noopener noreferrer">
          Escribir por WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Feste<span>jia</span></div>
        <p>Experiencias digitales para momentos irrepetibles</p>
        <div className="footer-links">
          <a href="#coleccion">Colección</a>
          <a href="#planes">Planes</a>
          <a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a>
        </div>
        <p style={{marginTop: '2rem', fontSize: '0.75rem'}}>© 2025 Festejia. Todos los derechos reservados.</p>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20digital." className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  )
}
