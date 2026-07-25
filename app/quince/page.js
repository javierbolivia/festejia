'use client'

const designs = [
  { name: 'Princesa', desc: 'Tonos rosados con detalles de corona dorada', color: 'linear-gradient(135deg, #f0c4d4, #fce8f0)' },
  { name: 'Mariposa', desc: 'Ligereza y fantasía en violetas suaves', color: 'linear-gradient(135deg, #c8b4e0, #ede4f5)' },
  { name: 'Encanto', desc: 'Elegancia juvenil con toques brillantes', color: 'linear-gradient(135deg, #e8c8d8, #f8eef4)' },
  { name: 'Celestial', desc: 'Azules y plateados con aires de ensueño', color: 'linear-gradient(135deg, #b8c8e8, #e8f0f8)' },
]

export default function Quince() {
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
          <h2>Invitaciones para 15 Años</h2>
          <p>Celebra tu presentación en sociedad con un diseño único</p>
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
        <p>Escríbenos y lo personalizamos para tu quinceañera</p>
        <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20de%2015%20años." className="btn-primary" target="_blank" rel="noopener noreferrer">
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
