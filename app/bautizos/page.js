'use client'

const designs = [
  { name: 'Bendición', desc: 'Pureza y ternura en tonos blancos y celestes', color: '#d0e8f0', accent: '#7ab8d0' },
  { name: 'Ángel', desc: 'Suavidad celestial con detalles dorados', color: '#e8e0c8', accent: '#c9a96e' },
  { name: 'Gracia', desc: 'Delicadeza en tonos pastel con toque clásico', color: '#d8e8d0', accent: '#8ab880' },
]

export default function Bautizos() {
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

      <section className="category-hero" style={{'--hero-accent': '#7ab8d0'}}>
        <div className="category-hero-content">
          <span className="section-tag">Colección Bautizos 2026</span>
          <h1 className="category-title">Invitaciones para <em>Bautizos</em></h1>
          <p className="category-subtitle">Una bendición merece una invitación a la altura. Diseños delicados con toda la información de la ceremonia.</p>
        </div>
      </section>

      <section className="category-designs">
        <div className="category-grid">
          {designs.map((d, i) => (
            <div className="category-card" key={i}>
              <div className="category-phone" style={{background: `linear-gradient(135deg, ${d.color}, ${d.color}cc)`}}>
                <span className="category-phone-name">{d.name}</span>
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
          <p>Escríbenos y lo personalizamos para el bautizo. Entrega en 5-7 días laborales.</p>
          <div className="cta-actions">
            <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20de%20bautizo." className="btn-primary" target="_blank" rel="noopener noreferrer">
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
