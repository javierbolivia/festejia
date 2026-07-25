'use client'

const designs = [
  { name: 'Serenata', desc: 'Elegancia atemporal en tonos dorados y marfil', color: 'linear-gradient(135deg, #e8d5b0, #f5efe6)' },
  { name: 'Aurora', desc: 'Romanticismo contemporáneo en matices cálidos', color: 'linear-gradient(135deg, #d4b8c4, #f5eef2)' },
  { name: 'Jardín', desc: 'Frescura natural con delicadeza orgánica', color: 'linear-gradient(135deg, #c8d8c0, #eef5eb)' },
  { name: 'Allegria', desc: 'Sofisticación moderna con detalles florales', color: 'linear-gradient(135deg, #80958E, #c8d8d0)' },
  { name: 'Napoli', desc: 'Estilo mediterráneo con calidez dorada', color: 'linear-gradient(135deg, #d4a574, #f0e0c8)' },
  { name: 'Terra', desc: 'Tonos tierra con elegancia rústica', color: 'linear-gradient(135deg, #a08060, #d4c0a8)' },
]

export default function Bodas() {
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
          <h2>Invitaciones para Bodas</h2>
          <p>Diseños exclusivos que reflejan la magia de tu unión</p>
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
        <p>Escríbenos y lo personalizamos con tu información</p>
        <a href="https://wa.me/59100000000?text=Hola%20Festejia!%20Me%20interesa%20una%20invitación%20de%20boda." className="btn-primary" target="_blank" rel="noopener noreferrer">
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
