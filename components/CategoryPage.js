'use client'
import { useState } from 'react'
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
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo logo-glow" aria-label="Festejia">
            <img src="/isotipo.png" alt="Festejia" className="nav-isotipo" />
          </a>
          <button className="nav-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-links ${mobileMenu ? 'active' : ''}`}>
            <li><a href="/bodas" onClick={() => setMobileMenu(false)}>Bodas</a></li>
            <li><a href="/quince" onClick={() => setMobileMenu(false)}>15 Años</a></li>
            <li><a href="/graduaciones" onClick={() => setMobileMenu(false)}>Graduaciones</a></li>
            <li><a href="/bautizos" onClick={() => setMobileMenu(false)}>Bautizos</a></li>
            <li><a href="/#planes" onClick={() => setMobileMenu(false)}>Planes</a></li>
            <li><a href="/express" className="nav-express-link" onClick={() => setMobileMenu(false)}>Festejia Express</a></li>
            <li><a href="/#contacto" onClick={() => setMobileMenu(false)}>Contacto</a></li>
            <li><a href="/login" className="nav-cta" onClick={() => setMobileMenu(false)}>Iniciar Sesión</a></li>
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
            <div className="footer-social">
              <a href="https://facebook.com/festejiadigital" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="https://instagram.com/festejiadigital" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a href="https://tiktok.com/@festejiadigital" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
            </div>
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

      {/* WHATSAPP */}
      <a href={waLink('Hola Festejia! Me interesa una invitación digital.')} className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  )
}
