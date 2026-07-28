'use client'

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

      <section className="category-hero" style={{'--hero-accent': '#c9a96e'}}>
        <div className="category-hero-content">
          <span className="section-tag">Colección Bodas 2026</span>
          <h1 className="category-title">Invitaciones para <em>Bodas</em></h1>
          <p className="category-subtitle">Diseños exclusivos que reflejan la magia de tu unión. Cada invitación es una experiencia digital interactiva con música, animaciones y confirmación de asistencia.</p>
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
          <p>Escríbenos y lo personalizamos con la información de tu boda. Entrega en 5-7 días laborales.</p>
          <div className="cta-actions">
            <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20de%20boda." className="btn-primary" target="_blank" rel="noopener noreferrer">
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
