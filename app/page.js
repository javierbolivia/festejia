'use client'
import { useState, useEffect, useRef } from 'react'
import LiveDashboard from './LiveDashboard'
import { ResponsiveVisual, PersonalizationVisual, ConfirmationVisual, AnimationsVisual, MapVisual, CountdownVisual } from './FeatureVisuals'

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else { setCount(Math.floor(start)) }
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null)
  const faqs = [
    ['¿Qué es una invitación web?', 'Nuestras invitaciones son páginas web reales, interactivas con animaciones, música, cuenta regresiva, mapa y confirmación de asistencia. No es un PDF ni un diseño estático.'],
    ['¿Qué incluye una invitación digital?', 'Cada invitación incluye un sitio web interactivo personalizado con música, cuenta regresiva, galería de fotos, ubicación con Google Maps, sistema de confirmación RSVP, compartir por WhatsApp y un diseño responsivo que funciona perfectamente en cualquier dispositivo.'],
    ['¿Puedo personalizar la invitación con mi información?', 'Sí. Cada invitación se personaliza con tus nombres, fecha, hora, salón, fotos, colores, música y toda la información de tu evento. Nos aseguramos de que cada invitación refleje tu celebración.'],
    ['¿Puedo personalizar cada invitación con nombre diferente?', 'Sí. En los planes Elegante e Imperial puedes generar invitaciones personalizadas ilimitadas con nombre y número de pases únicos para cada invitado.'],
    ['¿Puedo elegir la música?', 'Sí. Puedes elegir la canción que desees para acompañar tu invitación y crear una experiencia única para tus invitados.'],
    ['¿Puedo agregar más fotos?', 'Sí. Dependiendo del diseño y paquete seleccionado, puedes incluir múltiples fotos para crear una hermosa galería personalizada.'],
    ['¿Cómo comparto mi invitación?', 'Una vez completada tu invitación, recibirás un enlace privado que puedes compartir fácilmente por WhatsApp, Facebook, Instagram, Telegram, email o cualquier otra plataforma.'],
    ['¿Mis invitados necesitan instalar una app?', 'No. Los invitados simplemente abren la invitación desde cualquier navegador web. No se requiere ninguna aplicación ni registro.'],
    ['¿Los invitados pueden confirmar asistencia desde cualquier dispositivo?', 'Sí. El sistema RSVP funciona en teléfonos Android, iPhones, tablets y computadoras, permitiendo a los invitados confirmar su asistencia desde cualquier lugar.'],
    ['¿Cómo funciona el Sistema de Confirmación?', 'Es un panel donde ves en tiempo real quién confirmó, quién está pendiente y quién rechazó. Incluye gestión de pases, mesas y envío directo por WhatsApp.'],
    ['¿Los invitados pueden confirmar acompañantes adicionales?', 'Sí. Dependiendo de tu paquete, los invitados pueden confirmar acompañantes, facilitando la planificación del evento de manera más precisa.'],
    ['¿Qué pasa si un invitado cambia su confirmación?', 'El sistema RSVP se actualiza automáticamente para que siempre tengas la información de asistencia más reciente.'],
    ['¿Cómo recibo las confirmaciones?', 'Plan Clásico: por WhatsApp. Plan Elegante: en tu gestor de invitados online. Plan Imperial: en tu panel de administración privado.'],
    ['¿Puedo editar mi invitación después de la entrega?', 'Sí. Cambios menores como textos, horarios, ubicación o información de contacto pueden solicitarse según el paquete seleccionado.'],
    ['¿Mi invitación es privada?', 'Sí. Cada invitación tiene su propio enlace privado. Algunos paquetes también permiten protección con contraseña para mayor privacidad.'],
    ['¿Cuánto tiempo estará disponible mi invitación?', 'Tu invitación permanece activa según el paquete seleccionado. Si necesitas tiempo adicional, puedes solicitar una extensión.'],
    ['¿Cuánto tiempo tarda la entrega?', '5 a 7 días laborales. Con entrega express: 48 horas garantizadas.'],
    ['¿Puedo pedir una invitación con urgencia?', 'Sí. Ofrecemos entrega express para clientes que necesitan su invitación en menor tiempo, sujeto a disponibilidad.'],
    ['¿Funciona bien en celulares?', 'Absolutamente. Están optimizadas para verse perfectamente en cualquier celular o computadora, iPhone, Android, tablets y escritorio.'],
    ['¿Por qué elegir una invitación digital en vez de una impresa?', 'Las invitaciones digitales son más rápidas de compartir, interactivas, ecológicas y permiten seguimiento de RSVP en tiempo real, música, cuentas regresivas, mapas, galerías y actualizaciones instantáneas. Ofrecen una experiencia moderna, elegante y práctica.'],
    ['¿Qué formas de pago aceptan?', 'Transferencia bancaria, QR, tarjeta de crédito/débito, PayPal, Binance (USDC) y otros métodos de pago dependiendo de tu país.'],
    ['¿Puedo cambiar de diseño una vez elegido?', 'Si la producción no ha comenzado, podemos ayudarte a seleccionar otro diseño. Una vez iniciada la personalización, los cambios dependerán del avance del proyecto.'],
    ['¿Qué pasa si necesito ayuda?', 'Nuestro equipo te asistirá durante todo el proceso por WhatsApp, respondiendo cualquier duda antes y después de la entrega.'],
  ]

  return (
    <div className="faq-list" role="region" aria-label="Preguntas frecuentes">
      {faqs.map(([q, a], i) => (
        <div className={`faq-item stagger-child ${openIndex === i ? 'open' : ''}`} key={i}>
          <button
            className="faq-trigger"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
          >
            <span>{q}</span>
            <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-hidden={openIndex !== i}>
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TestimonialCarousel() {
  const testimonials = [
    { text: 'Quedamos encantados con nuestra invitación. El diseño superó nuestras expectativas y el sistema de confirmación nos facilitó todo.', name: 'María González', event: 'Boda - Agosto 2025', initials: 'MG' },
    { text: 'Excelente servicio. Muy profesionales, atentos a cada detalle. Nuestros invitados quedaron impresionados con la invitación digital.', name: 'Carlos Mendoza', event: 'Boda - Junio 2025', initials: 'CM' },
    { text: 'Súper recomendados. El panel de gestión es increíble, pudimos controlar todo sin estrés. ¡Gracias Festejia!', name: 'Ana Rodríguez', event: 'XV Años - Mayo 2025', initials: 'AR' },
    { text: 'El diseño de nuestra invitación fue impecable. Cada invitado nos felicitó por la originalidad. Totalmente premium.', name: 'Laura Fernández', event: 'Boda - Marzo 2025', initials: 'LF' },
    { text: 'Desde el primer contacto hasta la entrega, todo fue perfecto. El QR de acceso y las mesas fueron un éxito.', name: 'Roberto Silva', event: 'Boda - Abril 2025', initials: 'RS' },
  ]

  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const intervalRef = useRef(null)

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length)
  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(next, 4000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isHovered])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = touchStart - e.changedTouches[0].clientX
        if (diff > 50) next()
        if (diff < -50) prev()
      }}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Testimonios de clientes"
      aria-roledescription="carousel"
    >
      <div className="carousel-track">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === current ? 'active' : ''} ${i === (current - 1 + testimonials.length) % testimonials.length ? 'prev' : ''} ${i === (current + 1) % testimonials.length ? 'next' : ''}`}
            aria-hidden={i !== current}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonio ${i + 1} de ${testimonials.length}`}
          >
            <div className="carousel-card">
              <svg className="carousel-quote-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z"/></svg>
              <p className="carousel-text">{t.text}</p>
              <div className="carousel-author">
                <div className="carousel-avatar">{t.initials}</div>
                <div className="carousel-author-info">
                  <h5>{t.name}</h5>
                  <span>{t.event}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Testimonio anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Siguiente testimonio">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="carousel-dots" role="tablist" aria-label="Indicadores de testimonio">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir al testimonio ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [currency, setCurrency] = useState('usd')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)

  const stat1 = useCounter(500, 2000)
  const stat2 = useCounter(98, 1500)
  const stat3 = useCounter(8, 800)

  const prices = {
    usd: { clasico: 45, elegante: 75, imperial: 110 },
    bs: { clasico: 450, elegante: 700, imperial: 950 }
  }

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          const children = entry.target.querySelectorAll('.stagger-child')
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 100)
          })
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* NAV */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo" aria-label="Festejia">
            <img src="/isotipo.png" alt="Festejia" className="nav-isotipo" />
          </a>
          <button className="nav-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-links ${mobileMenu ? 'active' : ''}`}>
            <li><a href="/bodas">Bodas</a></li>
            <li><a href="/quince">15 Años</a></li>
            <li><a href="/graduaciones">Graduaciones</a></li>
            <li><a href="/bautizos">Bautizos</a></li>
            <li><a href="#planes">Planes</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="/login" className="nav-cta">Iniciar Sesión</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <video className="hero-video-bg" autoPlay muted loop playsInline poster="/hero-poster.jpg">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className={`hero-content ${heroVisible ? 'hero-animate' : ''}`}>
          <div className="hero-text">
            <img src="/logotipo.png" alt="Festejia" className="hero-logotipo hero-fade hero-delay-1" />
            <h1 className="hero-headline hero-fade hero-delay-2">
              Imagina el <em>recuerdo</em>,<br/>nosotros lo <em>creamos</em>
            </h1>
            <p className="hero-description hero-fade hero-delay-3">
              Invitaciones digitales exclusivas que transforman tu evento en una experiencia inolvidable desde el primer click.
            </p>
            <div className="hero-actions hero-fade hero-delay-4">
              <a href="#planes" className="btn-primary">Ver Planes</a>
              <a href="#galeria" className="btn-ghost">Explorar Diseños</a>
            </div>
            <div className="hero-stats hero-fade hero-delay-5">
              <div className="stat" ref={stat1.ref}><span className="stat-number">{stat1.count}+</span><span className="stat-label">EVENTOS</span></div>
              <div className="stat" ref={stat2.ref}><span className="stat-number">{stat2.count}%</span><span className="stat-label">SATISFACCIÓN</span></div>
              <div className="stat" ref={stat3.ref}><span className="stat-number">{stat3.count}</span><span className="stat-label">DISEÑOS</span></div>
            </div>
          </div>
          <div className="hero-visual hero-fade hero-delay-3">
            <div className="hero-phone">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="phone-content">
                  <p className="phone-label">BIENVENIDOS A NUESTRA BODA</p>
                  <h3 className="phone-names">José & Victoria</h3>
                  <p className="phone-date">22 de Agosto, 2026</p>
                  <div className="phone-divider"></div>
                  <p className="phone-venue">Jardín Las Palmas</p>
                </div>
              </div>
              <span className="phone-badge">DEMO</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust-bar reveal-section">
        <div className="trust-content">
          <p>Más de <strong>500 parejas</strong> han confiado en nosotros para su día especial</p>
          <div className="trust-stars">★★★★★ <span>4.9/5 en satisfacción</span></div>
        </div>
      </section>

      {/* DESIGNS */}
      <section className="designs-section reveal-section" id="galeria">
        <div className="section-header">
          <span className="section-tag stagger-child">Colección 2026</span>
          <h2 className="section-title stagger-child">Diseños Exclusivos</h2>
          <p className="section-subtitle stagger-child">Cada invitación es una obra de arte digital, creada para impresionar</p>
        </div>
        <div className="designs-grid">
          {[
            { name: 'Serenata', color: '#e8d5b0', desc: 'Clásica y romántica' },
            { name: 'Aurora', color: '#d4b8c4', desc: 'Suave y delicada' },
            { name: 'Jardín', color: '#c8d8c0', desc: 'Natural y fresca' },
            { name: 'Allegria', color: '#80958E', desc: 'Moderna y vibrante' },
            { name: 'Napoli', color: '#d4a574', desc: 'Cálida y mediterránea' },
            { name: 'Terra', color: '#a08060', desc: 'Orgánica y terrenal' },
            { name: 'Rose Gold', color: '#b76e79', desc: 'Lujosa y femenina' },
            { name: 'Euforia', color: '#6b8dad', desc: 'Elegante y serena' },
          ].map((design, i) => (
            <div className="design-card stagger-child" key={i}>
              <div className="design-preview">
                <div className="design-phone" style={{background: `linear-gradient(135deg, ${design.color}, ${design.color}dd)`}}>
                  <span className="design-phone-name">{design.name}</span>
                </div>
              </div>
              <div className="design-info">
                <h4>{design.name}</h4>
                <p>{design.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section reveal-section">
        <div className="section-header">
          <span className="section-tag stagger-child">¿Por qué Festejia?</span>
          <h2 className="section-title stagger-child">Más que una Invitación</h2>
          <p className="section-subtitle stagger-child">Tecnología y diseño unidos para crear experiencias memorables</p>
        </div>
        <div className="features-grid">
          {[
            { title: 'Diseño Responsivo', desc: 'Se ve perfecto en cualquier dispositivo. Optimizada para la mejor experiencia móvil.', Visual: ResponsiveVisual },
            { title: 'Personalización por Invitado', desc: 'Cada invitado recibe su invitación con nombre, pases y mesa asignada.', Visual: PersonalizationVisual },
            { title: 'Confirmación Inteligente', desc: 'Panel de control con confirmaciones en tiempo real, gestión de mesas y QR de acceso.', Visual: ConfirmationVisual },
            { title: 'Animaciones Premium', desc: 'Transiciones elegantes, música de fondo y efectos visuales que cautivan.', Visual: AnimationsVisual },
            { title: 'Mapa Interactivo', desc: 'Ubicación integrada con Google Maps para que nadie se pierda.', Visual: MapVisual },
            { title: 'Cuenta Regresiva', desc: 'Un contador elegante que genera anticipación para el gran día.', Visual: CountdownVisual },
          ].map((f, i) => (
            <div className="feature-card stagger-child" key={i} style={{transitionDelay: `${i * 120}ms`}}>
              <div className="feature-icon feature-icon-visual">
                <f.Visual />
              </div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section reveal-section">
        <div className="section-header">
          <span className="section-tag stagger-child">Testimonios</span>
          <h2 className="section-title stagger-child">Lo que Dicen Nuestros Clientes</h2>
        </div>
        <TestimonialCarousel />
      </section>

      {/* SYSTEM */}
      <section className="system-section reveal-section">
        <div className="system-content">
          <div className="system-text">
            <span className="section-tag stagger-child">Exclusivo Plan Imperial</span>
            <h2 className="section-title left stagger-child">Sistema de Confirmación <em>Inteligente</em></h2>
            <p className="system-desc stagger-child">Un panel de administración completo que te da control total sobre tu evento.</p>
            <div className="system-features">
              {[
                { title: 'Confirmaciones Únicas', desc: 'Cada invitado tiene un enlace personal e intransferible', icon: '<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>' },
                { title: 'Tickets Personalizados', desc: 'Nombres, número de pases y mesas asignadas', icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/>' },
                { title: 'QR de Acceso', desc: 'Código QR único para control de entrada al evento', icon: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/><path d="M9 6h6M9 9h6M9 12h6"/>' },
                { title: 'Dashboard en Tiempo Real', desc: 'Visualiza quién confirma, rechaza o está pendiente', icon: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>' },
              ].map((item, i) => (
                <div className="sys-feature stagger-child" key={i}>
                  <div className="sys-icon-wrap" style={{animationDelay: `${i * 0.7}s`}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sys-svg" style={{animationDelay: `${i * 0.7}s`}} dangerouslySetInnerHTML={{__html: item.icon}} />
                  </div>
                  <div><h5>{item.title}</h5><p>{item.desc}</p></div>
                </div>
              ))}
            </div>
            <a href="https://www.youtube.com/watch?v=AwtEkh4Kq50" className="btn-outline-dark stagger-child" target="_blank" rel="noopener noreferrer">&#9654; Ver Demostración</a>
          </div>
          <div className="system-visual stagger-child">
            <LiveDashboard />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section reveal-section" id="planes">
        <div className="section-header">
          <span className="section-tag stagger-child">Planes</span>
          <h2 className="section-title stagger-child">Elige tu Paquete Ideal</h2>
          <p className="section-subtitle stagger-child">Todos incluyen diseño profesional, soporte personalizado y envíos ilimitados</p>
        </div>
        <div className="currency-toggle">
          <button className={currency === 'bs' ? 'active' : ''} onClick={() => setCurrency('bs')}>Bs. Bolivianos</button>
          <button className={currency === 'usd' ? 'active' : ''} onClick={() => setCurrency('usd')}>USD Dólares</button>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card stagger-child">
            <div className="pricing-level-indicator"><span className="level-dot"></span><span className="level-dot"></span><span className="level-dot faded"></span></div>
            <div className="pricing-header">
              <h3>Clásico</h3>
              <p className="pricing-tagline">Listo, elegante y simple</p>
              <p className="pricing-desc">Elige un diseño de nuestra colección y personaliza la información de tu evento.</p>
            </div>
            <div className="pricing-price"><span className="price-currency">{currency === 'usd' ? 'USD' : 'Bs.'}</span><span className="price-amount">{prices[currency].clasico}</span></div>
            <ul className="pricing-features">
              <li className="included">Diseño profesional de colección</li>
              <li className="included">Información de tu evento</li>
              <li className="included">Ubicación con Google Maps</li>
              <li className="included">Cuenta regresiva</li>
              <li className="included">Itinerario del evento</li>
              <li className="included">Dress code y sugerencias</li>
              <li className="included">Música de fondo</li>
              <li className="included">Envíos ilimitados</li>
              <li className="included">Confirmación por WhatsApp</li>
            </ul>
            <a href="#contacto" className="btn-plan">Reservar</a>
          </div>
          <div className="pricing-card featured stagger-child">
            <div className="pricing-badge">Más Popular</div>
            <div className="pricing-level-indicator"><span className="level-dot"></span><span className="level-dot"></span><span className="level-dot"></span></div>
            <div className="pricing-header">
              <h3>Elegante</h3>
              <p className="pricing-tagline">Adaptado a tu estilo</p>
              <p className="pricing-desc">Perfecta si quieres un toque personal sin renunciar a la rapidez. Ajustamos el diseño a tu paleta y estilo.</p>
            </div>
            <div className="elegante-swatches" aria-hidden="true">
              <span className="swatch" style={{background: '#c4a265'}}></span>
              <span className="swatch" style={{background: '#8a4050'}}></span>
              <span className="swatch" style={{background: '#4a6a60'}}></span>
              <span className="swatch" style={{background: '#3a5a7a'}}></span>
              <span className="swatch-label">Tu paleta, tu estilo</span>
            </div>
            <div className="pricing-price"><span className="price-currency">{currency === 'usd' ? 'USD' : 'Bs.'}</span><span className="price-amount">{prices[currency].elegante}</span></div>
            <ul className="pricing-features">
              <li className="included highlight">Todo lo del plan Clásico</li>
              <li className="included">Personalización de colores</li>
              <li className="included">Ajustes de estilo visual</li>
              <li className="included">Nombres de invitados</li>
              <li className="included">Tickets / Pases personalizados</li>
              <li className="included">Galería de fotos (max 8)</li>
              <li className="included">Agendar en Google Calendar</li>
              <li className="included">Gestor de invitados online</li>
            </ul>
            <a href="#contacto" className="btn-plan featured">Reservar</a>
          </div>
          <div className="pricing-card imperial stagger-child">
            <div className="pricing-badge imperial-badge">Experiencia Exclusiva</div>
            <div className="imperial-exclusive-label">Un proyecto, no un paquete.</div>
            <div className="pricing-level-indicator"><span className="level-dot gold"></span><span className="level-dot gold"></span><span className="level-dot gold"></span></div>
            <div className="pricing-header">
              <h3>Imperial</h3>
              <p className="pricing-tagline">No es otra invitación. Es tu historia hecha arte digital.</p>
              <p className="pricing-desc">Creamos una experiencia única desde cero según tu visión. Sin plantillas. Sin límites.</p>
            </div>
            <div className="pricing-price"><span className="price-currency">{currency === 'usd' ? 'USD' : 'Bs.'}</span><span className="price-amount">{prices[currency].imperial}</span></div>
            <div className="imperial-benefits">
              <div className="imperial-benefit crown">👑 Diseño creado 100% desde cero</div>
              <div className="imperial-benefit">⭐ Animaciones únicas para tu evento</div>
              <div className="imperial-benefit">⭐ Interacciones personalizadas</div>
              <div className="imperial-benefit">⭐ Experiencia digital exclusiva</div>
            </div>
            <div className="imperial-spotlight">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
              <div><h5>Sistema de Confirmación Inteligente</h5><p>Panel de administración en tiempo real para gestionar cada invitado</p></div>
            </div>
            <ul className="pricing-features imperial-features-secondary">
              <li className="included">QR de acceso personal</li>
              <li className="included">Número de mesa asignado</li>
              <li className="included">Galería de fotos (max 20)</li>
              <li className="included">Soporte prioritario dedicado</li>
            </ul>
            <a href="#contacto" className="btn-plan imperial">Crear mi Invitación Exclusiva</a>
            <p className="imperial-footer-note">Cada proyecto es único. Plazas limitadas por mes.</p>
          </div>
        </div>
        <div className="pricing-note"><p className="note-highlight">Reserva con Bs. 100 &mdash; Paga el resto cuando tu invitación esté lista</p></div>
      </section>

      {/* COMPARISON */}
      <section className="comparison-section reveal-section">
        <div className="section-header">
          <span className="section-tag stagger-child">Comparativa</span>
          <h2 className="section-title stagger-child">Detalle de Funciones</h2>
          <p className="section-subtitle stagger-child">Compara los planes y elige el que mejor se adapte a tu evento</p>
        </div>
        <div className="comparison-grid stagger-child">
          {/* Legend at top */}
          <div className="comp-legend comp-legend-top">
            <span><span className="comp-check">✓</span> Incluido</span>
            <span><span className="comp-check gold">⭐</span> Exclusivo</span>
            <span><span className="comp-check crown">👑</span> Premium</span>
          </div>
          {/* Column headers */}
          <div className="comp-column-labels">
            <span></span>
            <span>Imperial</span>
            <span>Elegante</span>
            <span>Clásico</span>
          </div>
          <div className="comp-category">
            <div className="comp-category-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <h4>Diseño</h4>
            </div>
            <div className="comp-items">
              <div className="comp-row"><span className="comp-feature">Selección de plantilla</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-check">✓</span></div>
              <div className="comp-row"><span className="comp-feature">Colores personalizados</span><span className="comp-check gold">⭐</span><span className="comp-check">✓</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Tipografía personalizada</span><span className="comp-check gold">⭐</span><span className="comp-check">✓</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Diseño exclusivo desde cero</span><span className="comp-check crown">👑</span><span className="comp-cross">—</span><span className="comp-cross">—</span></div>
            </div>
          </div>
          {/* EXPERIENCE */}
          <div className="comp-category">
            <div className="comp-category-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <h4>Experiencia</h4>
            </div>
            <div className="comp-items">
              <div className="comp-row"><span className="comp-feature">Animaciones elegantes</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-check">✓</span></div>
              <div className="comp-row"><span className="comp-feature">Música de fondo</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-check">✓</span></div>
              <div className="comp-row"><span className="comp-feature">Galería de fotos (8)</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Galería de fotos (20)</span><span className="comp-check crown">👑</span><span className="comp-cross">—</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Cuenta regresiva</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-check">✓</span></div>
              <div className="comp-row"><span className="comp-feature">Ubicación Google Maps</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-check">✓</span></div>
            </div>
          </div>
          {/* GUEST MANAGEMENT */}
          <div className="comp-category">
            <div className="comp-category-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <h4>Gestión de Invitados</h4>
            </div>
            <div className="comp-items">
              <div className="comp-row"><span className="comp-feature">Confirmación por WhatsApp</span><span className="comp-cross">—</span><span className="comp-check">✓</span><span className="comp-check">✓</span></div>
              <div className="comp-row"><span className="comp-feature">Nombres personalizados</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Tickets / Pases</span><span className="comp-check gold">⭐</span><span className="comp-check">✓</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Número de mesa</span><span className="comp-check crown">👑</span><span className="comp-cross">—</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">QR de acceso personal</span><span className="comp-check crown">👑</span><span className="comp-cross">—</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Agendar Google Calendar</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-cross">—</span></div>
            </div>
          </div>
          {/* ADMINISTRATION */}
          <div className="comp-category">
            <div className="comp-category-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h4>Administración</h4>
            </div>
            <div className="comp-items">
              <div className="comp-row"><span className="comp-feature">Gestor de invitados online</span><span className="comp-check">✓</span><span className="comp-check">✓</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Sistema Confirmación Inteligente</span><span className="comp-check crown">👑</span><span className="comp-cross">—</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Panel de administración</span><span className="comp-check crown">👑</span><span className="comp-cross">—</span><span className="comp-cross">—</span></div>
              <div className="comp-row"><span className="comp-feature">Soporte prioritario</span><span className="comp-check crown">👑</span><span className="comp-cross">—</span><span className="comp-cross">—</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ADDONS */}
      <section className="addons-section reveal-section">
        <div className="section-header">
          <span className="section-tag stagger-child">Extras</span>
          <h2 className="section-title stagger-child">Servicios Adicionales</h2>
        </div>
        <div className="addons-grid">
          {[
            { name: 'Personalización Total', desc: 'Diseño desde cero, reflejo fiel de tu evento.', price: 100, icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>' },
            { name: 'Entrega Express', desc: 'Tu invitación completa en 48 horas garantizadas.', price: 30, icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' },
            { name: 'Menú de Navegación', desc: 'Secciones claras para mejor experiencia.', price: 15, icon: '<path d="M4 6h16M4 12h16M4 18h10"/>' },
            { name: 'Save the Date', desc: 'Mini sitio con contador y pre-confirmación.', price: 30, icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
            { name: 'Dominio Propio', desc: 'Tu web en www.nombrenovios.com', price: 120, icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>' },
            { name: 'Visibilidad Extendida', desc: '3 meses adicionales activa post-evento.', price: 30, icon: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' },
            { name: 'Ajustes Post-Entrega', desc: 'Cambios menores después de la aprobación.', price: 10, icon: '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>' },
          ].map((service, i) => (
            <div className="addon-card stagger-child" key={i}>
              <div className="addon-icon-wrap" style={{animationDelay: `${i * 0.4}s`}}>
                <span className="addon-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" dangerouslySetInnerHTML={{__html: service.icon}} /></span>
              </div>
              <div className="addon-info"><h4>{service.name}</h4><p>{service.desc}</p></div>
              <span className="addon-price">+${service.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section reveal-section">
        <div className="section-header">
          <span className="section-tag stagger-child">Simple y Rápido</span>
          <h2 className="section-title stagger-child">¿Cómo Funciona?</h2>
        </div>
        <div className="process-grid">
          <div className="process-step stagger-child"><div className="process-number">01</div><h4>Elige tu Diseño</h4><p>Selecciona entre nuestra colección exclusiva o solicita uno personalizado.</p></div>
          <div className="process-connector"></div>
          <div className="process-step stagger-child"><div className="process-number">02</div><h4>Envía tus Datos</h4><p>Completa un formulario con la información de tu evento.</p></div>
          <div className="process-connector"></div>
          <div className="process-step stagger-child"><div className="process-number">03</div><h4>Recibe tu Invitación</h4><p>En 5-7 días laborales tu invitación estará lista.</p></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section reveal-section" id="faq">
        <div className="section-header">
          <span className="section-tag stagger-child">Ayuda</span>
          <h2 className="section-title stagger-child">Preguntas Frecuentes</h2>
          <p className="section-subtitle stagger-child">Todo lo que necesitas saber sobre nuestras invitaciones digitales</p>
        </div>
        <FaqAccordion />
      </section>

      {/* CONTACT */}
      <section className="contact-section reveal-section" id="contacto">
        <div className="contact-container">
          <div className="contact-info">
            <span className="section-tag stagger-child">Contáctanos</span>
            <h2 className="section-title left stagger-child">Hagamos realidad<br/>tu invitación</h2>
            <p className="contact-desc stagger-child">Nuestro equipo está listo para ayudarte a diseñar una experiencia única para tu celebración.</p>
            <div className="contact-methods">
              <a href="https://wa.me/59100000000" className="contact-method stagger-child" target="_blank" rel="noopener noreferrer">
                <div className="method-icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
                <div><h5>WhatsApp</h5><p>Respuesta inmediata</p></div>
              </a>
              <a href="mailto:info@festejia.com" className="contact-method stagger-child">
                <div className="method-icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
                <div><h5>Email</h5><p>info@festejia.com</p></div>
              </a>
              <div className="contact-method stagger-child">
                <div className="method-icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div>
                <div><h5>Ubicación</h5><p>Bolivia</p></div>
              </div>
            </div>
            <div className="contact-trust stagger-child">
              <div className="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Atención personalizada</span></div>
              <div className="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg><span>Respuesta rápida</span></div>
              <div className="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg><span>Pagos seguros</span></div>
              <div className="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg><span>Soporte profesional</span></div>
            </div>
          </div>
          <div className="contact-form-wrap stagger-child">
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); window.open('https://wa.me/59100000000?text=Hola Festejia! Quiero información sobre invitaciones digitales.', '_blank') }}>
              <div className="form-group"><input type="text" placeholder="Tu nombre" required /></div>
              <div className="form-row"><input type="text" placeholder="País" /><input type="email" placeholder="Email" /></div>
              <div className="form-group">
                <select defaultValue=""><option value="" disabled>Tipo de evento</option><option>Boda</option><option>XV Años</option><option>Graduación</option><option>Bautizo</option><option>Otro</option></select>
              </div>
              <div className="form-group"><textarea placeholder="Cuéntanos sobre tu evento..." rows="4"></textarea></div>
              <button type="submit" className="btn-submit">Enviar Mensaje</button>
            </form>
          </div>
        </div>
        <div className="contact-cta reveal-section">
          <h3>¿Listo para crear una invitación inolvidable?</h3>
          <p>Nuestro equipo está listo para diseñar una experiencia única para tu celebración.</p>
          <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Quiero%20una%20invitación%20digital." className="btn-primary btn-cta-large" target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="footer-logo">Feste<span>jia</span></a>
            <p>Experiencias digitales para momentos irrepetibles</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
            </div>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col"><h5>Eventos</h5><a href="/bodas">Bodas</a><a href="/quince">XV Años</a><a href="/graduaciones">Graduaciones</a><a href="/bautizos">Bautizos</a></div>
            <div className="footer-col"><h5>Empresa</h5><a href="#planes">Planes</a><a href="#galeria">Diseños</a><a href="#faq">FAQ</a><a href="#contacto">Contacto</a></div>
          </div>
        </div>
        <div className="footer-bottom"><p>&copy; 2025 Festejia. Todos los derechos reservados.</p></div>
      </footer>

      {/* WHATSAPP */}
      <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20digital." className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  )
}
