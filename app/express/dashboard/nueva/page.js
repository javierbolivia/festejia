'use client'
import { useState } from 'react'
import { supabase } from '../../../../lib/supabase'
import { crearInvitacionBorrador } from '../../../../lib/express/queries'
import { generarCodigoInterno, PLANTILLAS_EXPRESS } from '../../../../lib/express/validation'
import ExpressDashboardLayout from '../ExpressDashboardLayout'

// Metadatos visuales de la plantilla disponible para el plan Express.
// Por ahora solo se ofrece "Mármol" (plantilla-a), inspirada en la
// Plantilla 2 real del catálogo Premium, como ejemplo funcionando
// completo con el editor de bloques. Más plantillas se irán habilitando
// en lib/express/validation.js (PLANTILLAS_EXPRESS) sin tocar el editor.
const PLANTILLAS_INFO = [
  { id: 'plantilla-a', nombre: 'Mármol', descripcion: 'Verde salvia y dorado, elegante y atemporal', imagen: '/plantilla-a-marmol.png' },
]

export default function ExpressNuevaInvitacion() {
  const [creando, setCreando] = useState(false)
  const [error, setError] = useState('')

  async function elegirPlantilla(plantillaId) {
    setError('')
    setCreando(true)

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      window.location.href = '/express/login'
      return
    }

    const codigo = generarCodigoInterno()
    const { data, error: errCrear } = await crearInvitacionBorrador(userData.user.id, plantillaId, codigo)

    if (errCrear || !data) {
      setError('No se pudo crear la invitación. Intenta de nuevo.')
      setCreando(false)
      return
    }

    window.location.href = `/express/dashboard/editor/${data.id}`
  }

  return (
    <ExpressDashboardLayout activeTab="nueva">
      <div className="express-page-header">
        <h1>Elige tu plantilla</h1>
      </div>
      <p className="express-nueva-subtitle">
        Selecciona el diseño que más te guste. Podrás personalizar los textos,
        fotos y datos de tu evento, pero el diseño no se puede modificar.
      </p>

      {error && <div className="express-error" style={{ marginBottom: '1rem' }}>{error}</div>}

      <div className="express-plantillas-grid">
        {PLANTILLAS_INFO.filter((p) => PLANTILLAS_EXPRESS.includes(p.id)).map((p) => (
          <button
            key={p.id}
            className="express-plantilla-card"
            onClick={() => elegirPlantilla(p.id)}
            disabled={creando}
          >
            <div className="express-plantilla-preview" style={p.imagen ? { backgroundImage: `url(${p.imagen})` } : {}}>
              {!p.imagen && <span>{p.nombre}</span>}
            </div>
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
          </button>
        ))}
      </div>

      <style jsx global>{`
        .express-nueva-subtitle { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; max-width: 600px; }
        .express-plantillas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.2rem; }
        .express-plantilla-card { background: white; border: 2px solid transparent; border-radius: 12px; padding: 0; overflow: hidden; cursor: pointer; text-align: left; transition: border-color 0.2s, transform 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .express-plantilla-card:hover { border-color: #c9a96e; transform: translateY(-2px); }
        .express-plantilla-card:disabled { opacity: 0.6; cursor: not-allowed; }
        .express-plantilla-preview { height: 220px; background: linear-gradient(135deg, #5F6754, #876E44); background-size: cover; background-position: top center; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; }
        .express-plantilla-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; padding: 0.9rem 1rem 0.2rem; }
        .express-plantilla-card p { font-size: 0.78rem; color: #888; padding: 0 1rem 1rem; }
      `}</style>
    </ExpressDashboardLayout>
  )
}
