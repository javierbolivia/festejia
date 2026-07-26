'use client'
import { useState } from 'react'

export default function Home() {
  const [currency, setCurrency] = useState('usd')

  const prices = {
    usd: { clasico: 45, elegante: 75, imperial: 110 },
    bs: { clasico: 450, elegante: 700, imperial: 950 }
  }

  return (
    <>
      {/* NAVIGATION */}
      <nav className="navbar">
        <a href="/" className="nav-logo">Feste<span>jia</span></a>
        <ul className="nav-links">
          <li><a href="/bodas">Bodas</a></li>
          <li><a href="/quince">15 Años</a></li>
          <li><a href="/graduaciones">Graduaciones</a></li>
          <li><a href="/bautizos">Bautizos</a></li>
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
                <p style={{fontSize: '0.65rem', color: '#999', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.8rem'}}>Bienvenidos a nuestra boda</p>
                <h3>José & Victoria</h3>
                <p style={{fontSize: '0.8rem', color: '#c9a96e', fontStyle: 'italic', marginTop: '0.3rem'}}>22 de Agosto, 2026</p>
              </div>
              <span className="hero-mockup-badge">Muestra</span>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGNS SHOWCASE */}
      <section className="designs-showcase">
        <span className="section-label">TU DÍA ESPECIAL</span>
        <div className="section-title">
          <h2>Invitaciones Únicas</h2>
          <p>Descubre diseños únicos creados por nuestro equipo para tus momentos más especiales</p>
        </div>
        <div className="showcase-grid">
          {['Serenata','Aurora','Jardín','Allegria','Napoli','Terra','Rose Gold','Euforia'].map((name, i) => (
            <div className="showcase-item" key={i}>
              <div className="phone-mockup" style={{background: [
                'linear-gradient(135deg, #e8d5b0, #f5efe6)',
                'linear-gradient(135deg, #d4b8c4, #f5eef2)',
                'linear-gradient(135deg, #c8d8c0, #eef5eb)',
                'linear-gradient(135deg, #80958E, #c8d8d0)',
                'linear-gradient(135deg, #d4a574, #f0e0c8)',
                'linear-gradient(135deg, #a08060, #d4c0a8)',
                'linear-gradient(135deg, #b76e79, #e8c4cc)',
                'linear-gradient(135deg, #6b8dad, #b8d4e8)',
              ][i]}}>
                <span>{name}</span>
              </div>
              <p className="showcase-name">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-title">
          <h2>Lo que dicen nuestros clientes</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-avatar">M</div>
            <h4>María González</h4>
            <p className="testimonial-time">hace 2 meses</p>
            <p className="testimonial-badge">⭐ recomienda</p>
            <p className="testimonial-text">"Quedamos encantados con nuestra invitación. El diseño superó nuestras expectativas y el sistema de confirmación nos facilitó todo."</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar">C</div>
            <h4>Carlos Mendoza</h4>
            <p className="testimonial-time">hace 1 mes</p>
            <p className="testimonial-badge">⭐ recomienda</p>
            <p className="testimonial-text">"Excelente servicio. Muy profesionales, atentos a cada detalle. Nuestros invitados quedaron impresionados con la invitación."</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar">A</div>
            <h4>Ana Rodríguez</h4>
            <p className="testimonial-time">hace 3 semanas</p>
            <p className="testimonial-badge">⭐ recomienda</p>
            <p className="testimonial-text">"Súper recomendados. El panel de gestión es increíble, pudimos controlar todo sin estrés. ¡Gracias Festejia!"</p>
          </div>
        </div>
      </section>

      {/* PRIMER DETALLE */}
      <section className="detail-section">
        <div className="detail-content">
          <div className="detail-visual">
            <div className="phone-mockup-large" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
          </div>
          <div className="detail-text">
            <h2><em>primer detalle</em></h2>
            <p>Nuestro equipo de <strong>diseñadores y programadores</strong> sabe que cada invitación es el primer detalle de un momento inolvidable. Para un toque aún más personal, nuestra tecnología permite <strong>personalizar la invitación con el nombre de cada invitado</strong>, haciendo que cada destinatario se sienta parte especial de su historia.</p>
          </div>
        </div>
      </section>

      {/* SISTEMA CONFIRMACION */}
      <section className="confirmation-section">
        <div className="section-title">
          <h2>Sistema de Confirmación <em>inteligente</em></h2>
          <p>Paquete: <span className="badge-exclusive">IMPERIAL</span></p>
        </div>
        <div className="confirmation-cards">
          <div className="conf-card">
            <div className="conf-icon">💌</div>
            <p>Confirmaciones de asistencia únicas e intransferibles</p>
          </div>
          <div className="conf-card">
            <div className="conf-icon">🎫</div>
            <p>Nombres, Tickets y Mesas Personalizados</p>
          </div>
          <div className="conf-card">
            <div className="conf-icon">📱</div>
            <p>QR de Acceso Personal</p>
          </div>
          <div className="conf-card">
            <div className="conf-icon">✅</div>
            <p>Conoce quién confirma, rechaza o queda pendiente</p>
          </div>
        </div>
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <a href="https://www.youtube.com/watch?v=AwtEkh4Kq50" className="btn-outline" target="_blank" rel="noopener noreferrer">▶ VER MÁS</a>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="planes">
        <div className="section-title">
          <h2>3 Paquetes</h2>
        </div>
        <div className="currency-toggle">
          <button className={currency === 'bs' ? 'active' : ''} onClick={() => setCurrency('bs')}>Bolivianos</button>
          <button className={currency === 'usd' ? 'active' : ''} onClick={() => setCurrency('usd')}>Dólares</button>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>CLÁSICO</h3>
            <div className="pricing-price">{currency === 'usd' ? 'USD' : 'Bs.'} {prices[currency].clasico}</div>
          </div>
          <div className="pricing-card featured">
            <h3>ELEGANTE</h3>
            <div className="pricing-price">{currency === 'usd' ? 'USD' : 'Bs.'} {prices[currency].elegante}</div>
          </div>
          <div className="pricing-card">
            <h3>IMPERIAL</h3>
            <div className="pricing-price">{currency === 'usd' ? 'USD' : 'Bs.'} {prices[currency].imperial}</div>
          </div>
        </div>
        <div className="pricing-note">
          <p><strong>RESERVA CON Bs. 100</strong></p>
          <p>Paga el resto cuando tu invitación esté finalizada</p>
          <a href="#contacto" className="btn-outline-light">◎ QUIERO RESERVAR</a>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="comparison">
        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Función</th>
                <th>Imperial</th>
                <th>Elegante</th>
                <th>Clásico</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Sistema de Confirmación Inteligente', true, false, false],
                ['Confirmación por WhatsApp', false, true, true],
                ['Personalización de Color', true, true, false],
                ['Ubicación Maps', true, true, true],
                ['Cuenta Regresiva', true, true, true],
                ['Itinerario', true, true, true],
                ['Dress Code', true, true, true],
                ['Sugerencia de Regalos', true, true, true],
                ['Envíos Ilimitados', true, true, true],
                ['Música de fondo', true, true, true],
                ['Nombres de los Invitados', true, true, false],
                ['Tickets / Pases', true, true, false],
                ['Número de mesa', true, false, false],
                ['Galería de fotos (max 20)', true, false, false],
                ['Galería de fotos (max 8)', false, true, false],
                ['Agendar evento (Google Calendar)', true, true, false],
                ['QR de Acceso al evento', true, false, false],
              ].map(([feature, exc, pre, plu], i) => (
                <tr key={i}>
                  <td>{feature}</td>
                  <td>{exc ? '✓' : '✕'}</td>
                  <td>{pre ? '✓' : '✕'}</td>
                  <td>{plu ? '✓' : '✕'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PERSONALIZATION */}
      <section className="personalization">
        <div className="detail-content reverse">
          <div className="detail-text">
            <h2><em>personalización</em></h2>
            <p>Le ofrecemos un servicio personalizado de creación de invitaciones digitales, diseñadas para ser el comienzo de un momento inolvidable. Con opciones elegantes y cuidadosamente diseñadas, su invitación capturará la esencia y emoción de su gran día.</p>
            <a href="#contacto" className="link-gold">Ver servicios adicionales</a>
          </div>
          <div className="detail-visual">
            <div className="phone-mockup-large" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="additional-services">
        <div className="section-title">
          <h2>Servicios Adicionales</h2>
        </div>
        <div className="services-list">
          {[
            ['Personalización Total', 'Diseñamos su invitación desde cero, asegurando que cada detalle sea un reflejo fiel de su evento.', 100],
            ['Entrega Express', 'Recibe tu invitación web completa en un plazo garantizado de 48 horas.', 30],
            ['Menú de Navegación', 'Organiza tu invitación en secciones claras para que tus invitados encuentren toda la información.', 15],
            ['Save the Date', 'Mini sitio exclusivo con contador regresivo y formulario de pre-confirmación.', 30],
            ['Dominio propio', 'Tu invitación en una dirección web única (ej: www.nombrenovios.com). Incluye registro y hosting.', 120],
            ['Visibilidad Extendida', 'Mantén tu invitación web activa 3 meses adicionales después del evento.', 30],
            ['Ajustes Post-Entrega', 'Cambios menores (textos, fechas o imágenes) después de la aprobación y entrega final.', 10],
          ].map(([name, desc, price], i) => (
            <div className="service-item" key={i}>
              <div className="service-info">
                <h4>{name}</h4>
                <p>{desc}</p>
              </div>
              <div className="service-price">+ ${price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO START */}
      <section className="how-to-start">
        <div className="section-title">
          <h2>¿Cómo Empezar?</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📞</div>
            <p>Elige el estilo de invitación</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">📋</div>
            <p>Completa un formulario con los datos de tu evento</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🎉</div>
            <p>Entrega en 5 - 7 días laborales</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="section-title">
          <h2>Ayuda</h2>
          <p className="section-label">Preguntas frecuentes</p>
        </div>
        <div className="faq-list">
          {[
            ['¿Qué es exactamente una "invitación web"? ¿Es un PDF o un diseño de Canva?', 'Nuestras invitaciones son páginas web reales, completas y privadas. A diferencia de un PDF o Canva, son interactivas con animaciones, música, cuenta regresiva, mapa y confirmación de asistencia.'],
            ['¿Puedo personalizar cada invitación con el nombre de un invitado diferente?', 'Sí. En los planes Premium y Exclusive puedes generar invitaciones personalizadas ilimitadas con nombre y número de pases únicos para cada invitado.'],
            ['¿Cómo funciona el "Sistema de Confirmación Inteligente"?', 'Es un panel completo donde ves en tiempo real quién confirmó, quién está pendiente y quién rechazó. Incluye gestión de pases, mesas y envío directo por WhatsApp.'],
            ['¿Cómo recibo las confirmaciones de asistencia?', 'Plan Clásico: por WhatsApp. Plan Elegante: en tu gestor de invitados online. Plan Imperial: en tu panel de administración privado con base de datos completa.'],
            ['¿Cuánto tiempo tarda la entrega?', '5 a 7 días laborales. Con entrega express: 48 horas garantizadas.'],
            ['¿Mis invitados podrán usar la invitación fácilmente?', 'Absolutamente. Están optimizadas para verse perfectamente en cualquier celular o computadora. La navegación es clara e intuitiva.'],
            ['Formas de Pago', 'Transferencia bancaria, QR, Binance (USDC), tarjeta de crédito/débito, PayPal y más.'],
            ['¿Puedo cambiar de diseño una vez elegido?', 'La elección del diseño se considera definitiva una vez que comenzamos. Las revisiones son para ajustes sobre el diseño elegido. Para un diseño completamente nuevo, se puede contratar Personalización Total.'],
          ].map(([q, a], i) => (
            <details className="faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contacto">
        <div className="contact-content">
          <div className="contact-form-wrap">
            <h2>Escríbenos</h2>
            <p className="contact-sub">Atenderemos tus dudas</p>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); window.open('https://wa.me/59100000000?text=Hola Festejia! Quiero información.', '_blank') }}>
              <input type="text" placeholder="Nombre" required />
              <input type="text" placeholder="País" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Mensaje" rows="4"></textarea>
              <button type="submit" className="btn-submit">ENVIAR</button>
            </form>
          </div>
          <div className="contact-visual">
            <div className="phone-mockup-large" style={{background: 'linear-gradient(135deg, #1a1a3e, #3a2a5e)'}}>
              <span style={{fontSize: '1rem', color: 'white'}}>LORENZO<br/>&<br/>ISABELLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Feste<span>jia</span></div>
        <p>Experiencias digitales para momentos irrepetibles</p>
        <div className="footer-links">
          <a href="/bodas">Bodas</a>
          <a href="/quince">15 Años</a>
          <a href="/graduaciones">Graduaciones</a>
          <a href="/bautizos">Bautizos</a>
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
