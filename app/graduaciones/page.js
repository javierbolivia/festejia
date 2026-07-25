'use client'

const designs = [
  { name: 'Logro', desc: 'Diseño formal con tonos azul marino y dorado', color: 'linear-gradient(135deg, #2c3e5a, #5a7bad)' },
  { name: 'Éxito', desc: 'Moderno y vibrante con energía juvenil', color: 'linear-gradient(135deg, #3a6b5a, #6bad8a)' },
  { name: 'Academia', desc: 'Clásico universitario con elegancia sobria', color: 'linear-gradient(135deg, #4a3a5a, #8a6bad)' },
]

export default function Graduaciones() {
  return (
    <>
      <nav className="navbar">
        <a href="/" className="nav-logo">Feste<span>jia</span></a>
        <ul className="nav-links">
          <li><a href="/bodas">Bodas</a></li>
          <li><a href="/quince">15 Años</a></li>
          <li><a href="/graduaciones">Graduaciones</a></li>
          <li><a href="/bautizos">Bautizos</a></li>
          <li><a href="/#contacto">Contacto</a></li>
          <li><a href="/login" className="nav-cta">Iniciar Sesión</a></li>
        </ul>
      </nav>

      <section style={{paddingTop: '8rem'}}>
        <div className="section-title">
          <h2>Invitaciones para Graduaciones</h2>
          <p>Comparte tu logro académico con quienes te acompañaron</p>
        </div>
        <div className="designs-grid">
          {designs.map((d, i) => (
            <div className="design-card" key={i}>
              <div className="design-preview" style={{background: d.color, color: 'rgba(255,255,255,0.9)'}}>
                {d.name}
              </div>
              <div className="design-info">
                <h3>{d.name}</h3>
                <p>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>¿Te gustó algún diseño?</h2>
        <p>Escríbenos y lo personalizamos para tu graduación</p>
        <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20de%20graduación." className="btn-primary" target="_blank" rel="noopener noreferrer">
          Solicitar este diseño
        </a>
      </section>

      <footer className="footer">
        <div className="footer-logo">Feste<span>jia</span></div>
        <p>Experiencias digitales para momentos irrepetibles</p>
        <p style={{marginTop: '1rem', fontSize: '0.75rem'}}>© 2025 Festejia</p>
      </footer>
    </>
  )
}
