'use client'

const designs = [
  { name: 'Logro', desc: 'Diseño formal con tonos azul marino y dorado', color: '#2c3e5a', accent: '#5a7bad', light: true },
  { name: 'Éxito', desc: 'Moderno y vibrante con energía juvenil', color: '#3a6b5a', accent: '#6bad8a', light: true },
  { name: 'Academia', desc: 'Clásico universitario con elegancia sobria', color: '#4a3a5a', accent: '#8a6bad', light: true },
]

export default function Graduaciones() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo">Feste<span>jia</span></a>
          <ul className="nav-links">
            <li><a href="/bodas">Bodas</a></li>
            <li><a href="/quince">15 Años</a></li>
            <li><a href="/graduaciones">Graduaciones</a></li>
            <li><a href="/bautizos">Bautizos</a></li>
            <li><a href="/#contacto">Contacto</a></li>
            <li><a href="/login" className="nav-cta">Iniciar Sesión</a></li>
          </ul>
        </div>
      </nav>

      <section className="category-hero" style={{'--hero-accent': '#5a7bad'}}>
        <div className="category-hero-content">
          <span className="section-tag">Colección Graduaciones 2026</span>
          <h1 className="category-title">Invitaciones para <em>Graduaciones</em></h1>
          <p className="category-subtitle">Comparte tu logro académico con quienes te acompañaron. Diseños profesionales con toda la información de tu ceremonia.</p>
        </div>
      </section>

      <section className="category-designs">
        <div className="category-grid">
          {designs.map((d, i) => (
            <div className="category-card" key={i}>
              <div className="category-phone dark-phone" style={{background: `linear-gradient(135deg, ${d.color}, ${d.accent})`}}>
                <span className="category-phone-name" style={{color: 'rgba(255,255,255,0.9)'}}>{d.name}</span>
              </div>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="category-cta">
        <div className="cta-box">
          <h2>¿Te gustó algún diseño?</h2>
          <p>Escríbenos y lo personalizamos para tu graduación. Entrega en 5-7 días laborales.</p>
          <div className="cta-actions">
            <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20de%20graduación." className="btn-primary" target="_blank" rel="noopener noreferrer">
              Solicitar por WhatsApp
            </a>
            <a href="/#planes" className="btn-ghost-dark">Ver Planes y Precios</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="footer-logo">Feste<span>jia</span></a>
            <p>Experiencias digitales para momentos irrepetibles</p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <h5>Eventos</h5>
              <a href="/bodas">Bodas</a>
              <a href="/quince">XV Años</a>
              <a href="/graduaciones">Graduaciones</a>
              <a href="/bautizos">Bautizos</a>
            </div>
            <div className="footer-col">
              <h5>Empresa</h5>
              <a href="/#planes">Planes</a>
              <a href="/#galeria">Diseños</a>
              <a href="/#faq">FAQ</a>
              <a href="/#contacto">Contacto</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Festejia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
