'use client'
import { waLink } from '../lib/config'

// Corrección de auditoría (hallazgo 2.1): antes app/bodas, app/quince,
// app/graduaciones y app/bautizos eran 4 archivos de ~110 líneas cada uno,
// copy-paste casi exacto entre sí (mismo <nav>, mismo <footer> completo con
// los mismos 8 enlaces, misma estructura category-hero -> category-designs
// -> category-cta). Solo cambiaban: el array de diseños, el color de acento,
// los textos del hero/CTA, el mensaje de WhatsApp, y (solo en graduaciones)
// la variante visual oscura del teléfono. Cualquier cambio de navegación o
// footer requería editar manualmente 4 archivos idénticos, con riesgo real
// de dejar uno desincronizado (ya había pasado con el año del copyright).
//
// Ahora cada página de categoría es solo datos (~15 líneas) + este único
// componente que define la estructura una sola vez.
export default function CategoryPage({
  accentColor,
  tag,
  titlePlain,
  titleEm,
  subtitle,
  designs,
  demoImage,
  darkPhone = false,
  ctaText,
  waMessage,
}) {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo" aria-label="Festejia"><img src="/isotipo.png" alt="Festejia" className="nav-isotipo" /></a>
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

      <section className="category-hero" style={{ '--hero-accent': accentColor }}>
        <div className="category-hero-content">
          <div className="category-hero-copy">
            <span className="section-tag">{tag}</span>
            <h1 className="category-title">{titlePlain} <em>{titleEm}</em></h1>
            <p className="category-subtitle">{subtitle}</p>
            <a href="#muestras" className="category-hero-link">Ver muestra de diseño <span aria-hidden="true">↓</span></a>
          </div>
          <div className="category-demo-wrap" aria-label={`Muestra visual de invitación para ${titleEm}`}>
            <img src={demoImage} alt="Muestra genérica de invitación digital en un teléfono" className="category-demo-image" />
            <span className="category-demo-note">Vista demostrativa</span>
          </div>
        </div>
      </section>

      <section className="category-designs" id="muestras">
        <div className="category-section-heading">
          <span className="section-tag">Diseños de muestra</span>
          <h2>Una invitación con presencia,<br/><em>hecha para tu momento.</em></h2>
          <p>Esta es una referencia visual. Personalizamos información, estilo y detalles para tu celebración.</p>
        </div>
        <div className="category-grid">
          {designs.map((d, i) => (
            <div className="category-card" key={i}>
              <div
                className={`category-phone ${darkPhone ? 'dark-phone' : ''}`}
                style={{ background: `linear-gradient(135deg, ${d.color}, ${darkPhone ? d.accent : d.color + 'cc'})` }}
              >
                <span className="category-phone-name" style={darkPhone ? { color: 'rgba(255,255,255,0.9)' } : undefined}>
                  {d.name}
                </span>
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
          <p>{ctaText}</p>
          <div className="cta-actions">
            <a href={waLink(waMessage)} className="btn-primary" target="_blank" rel="noopener noreferrer">
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
          <p>&copy; {new Date().getFullYear()} Festejia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
