'use client'

export default function ExpressLanding() {
  return (
    <div className="express-landing">
      <nav className="express-landing-nav">
        <a href="/" className="express-landing-logo">Feste<span>jia</span></a>
        <a href="/express/login" className="express-landing-nav-link">Iniciar sesión</a>
      </nav>

      <section className="express-hero">
        <p className="express-hero-badge">NUEVO</p>
        <h1>Crea tu invitación digital al instante</h1>
        <p className="express-hero-subtitle">
          Elige una plantilla, sube tus fotos y personaliza los datos de tu evento.
          Sin esperas, sin intermediarios.
        </p>
        <a href="/express/registro" className="express-hero-cta">Crear mi invitación</a>
        <p className="express-hero-price">Desde Bs. 200</p>
      </section>

      <section className="express-como-funciona">
        <h2>¿Cómo funciona?</h2>
        <div className="express-pasos-grid">
          <div className="express-paso-card">
            <span className="express-paso-numero">1</span>
            <h3>Regístrate</h3>
            <p>Crea tu cuenta con tu correo en segundos.</p>
          </div>
          <div className="express-paso-card">
            <span className="express-paso-numero">2</span>
            <h3>Elige tu plantilla</h3>
            <p>Selecciona el diseño que más te guste entre nuestra colección.</p>
          </div>
          <div className="express-paso-card">
            <span className="express-paso-numero">3</span>
            <h3>Personaliza</h3>
            <p>Agrega nombres, fecha, lugares, fotos y música. Todo gratis mientras diseñas.</p>
          </div>
          <div className="express-paso-card">
            <span className="express-paso-numero">4</span>
            <h3>Publica</h3>
            <p>Cuando estés listo, confirma tu pago y tu invitación queda activa al instante.</p>
          </div>
        </div>
      </section>

      <section className="express-incluye">
        <h2>¿Qué incluye el Plan Express?</h2>
        <div className="express-incluye-grid">
          <ul className="express-incluye-lista express-incluye-si">
            <li>✓ Plantilla profesional a elegir</li>
            <li>✓ Textos generados con IA (editables)</li>
            <li>✓ Hasta 4 fotos (portada + galería)</li>
            <li>✓ Música de fondo personalizada</li>
            <li>✓ Itinerario, lugares y mapas</li>
            <li>✓ Sección de regalos (QR o link)</li>
            <li>✓ Activa hasta el día de tu evento</li>
            <li>✓ 2 correcciones incluidas</li>
          </ul>
          <ul className="express-incluye-lista express-incluye-no">
            <li>✗ Nombres de invitado individuales</li>
            <li>✗ Confirmación de asistencia por invitado</li>
            <li>✗ QR de acceso al evento</li>
          </ul>
        </div>
        <p className="express-incluye-nota">
          ¿Necesitas nombres de invitado, pases y confirmación inteligente?
          Conoce nuestros <a href="/#planes">planes Clásico, Elegante e Imperial</a>.
        </p>
      </section>

      <section className="express-cta-final">
        <h2>¿Lista para crear tu invitación?</h2>
        <a href="/express/registro" className="express-hero-cta">Comenzar ahora</a>
      </section>

      <footer className="express-landing-footer">
        <p>Feste<span>jia</span> Express © {new Date().getFullYear()}</p>
      </footer>

      <style jsx global>{`
        .express-landing { font-family: 'Raleway', sans-serif; color: #1a1a1a; }
        .express-landing-nav { display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 2rem; }
        .express-landing-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; text-decoration: none; color: #1a1a1a; }
        .express-landing-logo span { color: #c9a96e; }
        .express-landing-nav-link { text-decoration: none; color: #666; font-size: 0.85rem; }
        .express-hero { text-align: center; padding: 4rem 2rem 3rem; background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: white; }
        .express-hero-badge { display: inline-block; background: #c9a96e; color: white; font-size: 0.65rem; letter-spacing: 2px; padding: 0.3rem 0.8rem; border-radius: 12px; margin-bottom: 1rem; }
        .express-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 400; max-width: 700px; margin: 0 auto 1rem; }
        .express-hero-subtitle { color: rgba(255,255,255,0.75); font-size: 1rem; max-width: 500px; margin: 0 auto 1.8rem; }
        .express-hero-cta { display: inline-block; background: #c9a96e; color: white; padding: 1rem 2.2rem; border-radius: 50px; text-decoration: none; font-weight: 500; font-size: 0.95rem; }
        .express-hero-price { margin-top: 1rem; font-size: 0.85rem; color: rgba(255,255,255,0.6); }
        .express-como-funciona, .express-incluye, .express-cta-final { max-width: 1000px; margin: 0 auto; padding: 4rem 2rem; text-align: center; }
        .express-como-funciona h2, .express-incluye h2, .express-cta-final h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 400; margin-bottom: 2.5rem; }
        .express-pasos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
        .express-paso-card { background: #faf9f7; border-radius: 14px; padding: 1.8rem 1.2rem; }
        .express-paso-numero { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #1a1a1a; color: #c9a96e; font-weight: 700; margin-bottom: 0.8rem; }
        .express-paso-card h3 { font-size: 1rem; margin-bottom: 0.4rem; }
        .express-paso-card p { font-size: 0.82rem; color: #666; }
        .express-incluye-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; text-align: left; max-width: 600px; margin: 0 auto; }
        .express-incluye-lista { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.7rem; font-size: 0.9rem; }
        .express-incluye-si li { color: #166534; }
        .express-incluye-no li { color: #991b1b; }
        .express-incluye-nota { margin-top: 2rem; font-size: 0.85rem; color: #666; }
        .express-incluye-nota a { color: #c9a96e; font-weight: 500; }
        .express-landing-footer { text-align: center; padding: 2rem; color: #999; font-size: 0.8rem; border-top: 1px solid #eee; }
        .express-landing-footer span { color: #c9a96e; }
        @media (max-width: 600px) {
          .express-incluye-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
