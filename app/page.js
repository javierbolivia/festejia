'use client'

export default function Home() {
  return (
    <>
      {/* NAVIGATION */}
      <nav className="navbar">
        <a href="#" className="nav-logo">Feste<span>jia</span></a>
        <ul className="nav-links">
          <li><a href="#bodas">Bodas</a></li>
          <li><a href="#quince">15 Años</a></li>
          <li><a href="#graduaciones">Graduaciones</a></li>
          <li><a href="#bautizos">Bautizos</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="/login" className="nav-cta">Iniciar Sesión</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-social">
              <a href="#">f Facebook</a>
              <a href="#">◎ Instagram</a>
              <a href="#">♪ TikTok</a>
            </div>
            <div className="hero-brand">
              <h2>Festejia</h2>
            </div>
            <p className="hero-tagline">Celebra con elegancia</p>
            <h1 className="hero-headline">invita con estilo</h1>
            <div className="hero-year">2026</div>
          </div>
          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="hero-mockup-content">
                <h3>José & Victoria</h3>
                <p>Nuestra Boda</p>
              </div>
              <span className="hero-mockup-badge">Muestra</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories" id="bodas">
        <div className="section-title">
          <h2>Invitaciones para cada momento</h2>
          <p>Diseños exclusivos para cada tipo de celebración</p>
        </div>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-image" style={{background: 'linear-gradient(135deg, #f5efe6, #e8d5b0)'}}>💍</div>
            <h3>Bodas</h3>
            <p>Invitaciones que reflejan la magia de tu unión</p>
          </div>
          <div className="category-card" id="quince">
            <div className="category-image" style={{background: 'linear-gradient(135deg, #f5eef2, #e8c4d4)'}}>👑</div>
            <h3>15 Años</h3>
            <p>Celebra tu presentación en sociedad con estilo</p>
          </div>
          <div className="category-card" id="graduaciones">
            <div className="category-image" style={{background: 'linear-gradient(135deg, #e6eef5, #b8d4e8)'}}>🎓</div>
            <h3>Graduaciones</h3>
            <p>Comparte tu logro con quienes te acompañaron</p>
          </div>
          <div className="category-card" id="bautizos">
            <div className="category-image" style={{background: 'linear-gradient(135deg, #eef5eb, #c8d8c0)'}}>✝</div>
            <h3>Bautizos</h3>
            <p>Una bendición merece una invitación especial</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="servicios">
        <div className="section-title">
          <h2>Una experiencia completa</h2>
          <p>Más que una invitación: una plataforma de gestión para tu evento</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>Portada Cinematográfica</h3>
            <p>Apertura envolvente con animaciones que marcan el tono de tu celebración.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◈</div>
            <h3>Panel del Anfitrión</h3>
            <p>Gestiona invitados, genera enlaces únicos y envía por WhatsApp desde un solo lugar.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◇</div>
            <h3>Confirmación Inteligente</h3>
            <p>Cada invitado confirma desde su invitación. Tú lo ves en tiempo real.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⬡</div>
            <h3>Acceso con QR</h3>
            <p>Código QR único al confirmar. Escanea en la puerta para un registro impecable.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❖</div>
            <h3>Diseño a Medida</h3>
            <p>Cada invitación refleja la esencia de tu historia y el espíritu de tu evento.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◆</div>
            <h3>Cuenta Regresiva</h3>
            <p>Un reloj elegante que alimenta la anticipación día tras día.</p>
          </div>
        </div>
      </section>

      {/* DESIGNS */}
      <section id="coleccion">
        <div className="section-title">
          <h2>Nuestra Colección</h2>
          <p>Diseños concebidos para distintas sensibilidades</p>
        </div>
        <div className="designs-grid">
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #e8d5b0, #f5efe6)'}}>
              Serenata
            </div>
            <div className="design-info">
              <h3>Serenata</h3>
              <p>Sofisticación atemporal en tonos dorados</p>
            </div>
          </div>
          <div className="design-card">
            <div className="design-preview" style={{background: 'linear-gradient(135deg, #c8d8c0, #eef5eb)'}}>
              Jardín
            </div>
            <div className="design-info">
              <h3>Jardín</h3>
              <p>Frescura natural con delicadeza orgánica</p>
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
          <p>Tres niveles de servicio para distintas necesidades</p>
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
              <li>Confirmación inteligente</li>
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

      {/* FAQ */}
      <section id="faq">
        <div className="section-title">
          <h2>Preguntas Frecuentes</h2>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>¿Qué diferencia una invitación web de un PDF o Canva?</summary>
            <p>Una invitación web es una experiencia interactiva completa: animaciones, música, cuenta regresiva, mapa, confirmación de asistencia. Un PDF es estático, una invitación web cobra vida.</p>
          </details>
          <details className="faq-item">
            <summary>¿Cómo la envío a mis invitados?</summary>
            <p>Recibes un enlace que compartes por WhatsApp, correo o redes sociales. En los planes Premium y Exclusive, cada invitado recibe su propio enlace personalizado.</p>
          </details>
          <details className="faq-item">
            <summary>¿Qué es el Panel del Anfitrión?</summary>
            <p>Tu centro de control privado. Agregas invitados, generas enlaces, envías por WhatsApp, ves confirmaciones en tiempo real y controlas el ingreso con QR.</p>
          </details>
          <details className="faq-item">
            <summary>¿En cuánto tiempo estará lista?</summary>
            <p>5 a 7 días laborales. Con entrega express: 48 horas garantizadas.</p>
          </details>
          <details className="faq-item">
            <summary>¿Se ve bien en cualquier teléfono?</summary>
            <p>Sí. Optimizada para iPhone, Android, tablets y computadoras.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contacto">
        <h2>Tu celebración merece algo extraordinario</h2>
        <p>Conversemos sobre tu evento. Sin compromiso.</p>
        <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20digital%20para%20mi%20evento." className="btn-primary" target="_blank" rel="noopener noreferrer">
          Escribir por WhatsApp
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Feste<span>jia</span></div>
        <p>Experiencias digitales para momentos irrepetibles</p>
        <div className="footer-links">
          <a href="#bodas">Bodas</a>
          <a href="#quince">15 Años</a>
          <a href="#graduaciones">Graduaciones</a>
          <a href="#bautizos">Bautizos</a>
          <a href="#planes">Planes</a>
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
