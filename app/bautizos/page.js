'use client'

const designs = [
  { name: 'Bendición', desc: 'Pureza y ternura en tonos blancos y celestes', color: 'linear-gradient(135deg, #d0e8f0, #eef8fc)' },
  { name: 'Ángel', desc: 'Suavidad celestial con detalles dorados', color: 'linear-gradient(135deg, #e8e0c8, #f8f4ec)' },
  { name: 'Gracia', desc: 'Delicadeza en tonos pastel con toque clásico', color: 'linear-gradient(135deg, #d8e8d0, #f0f8ec)' },
]

export default function Bautizos() {
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
          <h2>Invitaciones para Bautizos</h2>
          <p>Una bendición merece una invitación a la altura</p>
        </div>
        <div className="designs-grid">
          {designs.map((d, i) => (
            <div className="design-card" key={i}>
              <div className="design-preview" style={{background: d.color}}>
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
        <p>Escríbenos y lo personalizamos para el bautizo</p>
        <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20de%20bautizo." className="btn-primary" target="_blank" rel="noopener noreferrer">
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
