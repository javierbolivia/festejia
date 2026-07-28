'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../../../lib/supabase'
import {
  obtenerInvitacionPorId,
  actualizarInvitacion,
  fijarSlugSiDisponible,
  marcarPendientePago,
  registrarCorreccion,
} from '../../../../../lib/express/queries'
import { iniciarPagoPublicacion, iniciarPagoCorreccionExtra } from '../../../../../lib/express/payments'
import {
  generarSlug,
  validarParaPublicar,
  tieneCorreccionesDisponibles,
} from '../../../../../lib/express/validation'
import ExpressDashboardLayout from '../../ExpressDashboardLayout'
import PasoDatosPareja from './PasoDatosPareja'
import PasoLugares from './PasoLugares'
import PasoItinerario from './PasoItinerario'
import PasoDetalles from './PasoDetalles'
import PasoMedia from './PasoMedia'

const PASOS = ['pareja', 'lugares', 'itinerario', 'detalles', 'media']
const PASOS_LABEL = {
  pareja: 'Pareja y Familia',
  lugares: 'Lugares del Evento',
  itinerario: 'Itinerario',
  detalles: 'Detalles',
  media: 'Fotos y Música',
}

export default function ExpressEditor() {
  const params = useParams()
  const invitacionId = params.invitacionId

  const [user, setUser] = useState(null)
  const [invitacion, setInvitacion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pasoActual, setPasoActual] = useState('pareja')
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [errores, setErrores] = useState([])

  useEffect(() => { cargar() }, [invitacionId])

  async function cargar() {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) { window.location.href = '/express/login'; return }
    setUser(userData.user)

    const { data, error } = await obtenerInvitacionPorId(invitacionId, userData.user.id)
    if (error || !data) {
      setMensaje('No se encontró esta invitación.')
      setLoading(false)
      return
    }
    setInvitacion(data)
    setLoading(false)
  }

  /**
   * Guarda uno o más campos. Si la invitación ya está publicada, primero
   * verifica y descuenta una corrección disponible antes de guardar.
   */
  async function guardarCampos(campos) {
    if (!user || !invitacion) return
    setGuardando(true)
    setMensaje('')

    if (invitacion.estado === 'publicada') {
      if (!tieneCorreccionesDisponibles(invitacion)) {
        setMensaje('Ya usaste tus correcciones disponibles.')
        setGuardando(false)
        return
      }
      const primerCampo = Object.keys(campos)[0]
      const { error: errCorr } = await registrarCorreccion(
        invitacion.id,
        user.id,
        primerCampo,
        invitacion[primerCampo],
        campos[primerCampo]
      )
      if (errCorr) {
        setMensaje('No se pudo registrar la corrección.')
        setGuardando(false)
        return
      }
    }

    const { data, error } = await actualizarInvitacion(invitacion.id, user.id, campos)
    if (error) {
      setMensaje('Ocurrió un error al guardar.')
    } else {
      setInvitacion({ ...invitacion, ...data })
      setMensaje('Guardado.')
    }
    setGuardando(false)
    setTimeout(() => setMensaje(''), 2000)
  }

  async function handlePublicar() {
    const { valido, errores: errs } = validarParaPublicar(invitacion)
    if (!valido) {
      setErrores(errs)
      return
    }
    setErrores([])
    setGuardando(true)

    const slugBase = generarSlug(invitacion.nombre1, invitacion.nombre2)
    const { data: conSlug } = await fijarSlugSiDisponible(invitacion.id, user.id, slugBase)
    const { data: pendiente } = await marcarPendientePago(invitacion.id, user.id)

    const invitacionActualizada = { ...invitacion, ...conSlug, ...pendiente }
    setInvitacion(invitacionActualizada)

    await iniciarPagoPublicacion({
      invitacionId: invitacion.id,
      nombreCliente: user.user_metadata?.nombre || user.email,
      email: user.email,
      plantilla: invitacion.plantilla,
      codigoInterno: invitacion.codigo_interno,
    })

    setGuardando(false)
  }

  async function handleSolicitarCorreccionesExtra() {
    await iniciarPagoCorreccionExtra({
      invitacionId: invitacion.id,
      nombreCliente: user.user_metadata?.nombre || user.email,
      email: user.email,
      plantilla: invitacion.plantilla,
      codigoInterno: invitacion.codigo_interno,
    })
  }

  if (loading) return <ExpressDashboardLayout activeTab="invitaciones"><p className="express-empty">Cargando...</p></ExpressDashboardLayout>
  if (!invitacion) return <ExpressDashboardLayout activeTab="invitaciones"><p className="express-empty">{mensaje}</p></ExpressDashboardLayout>

  const esBorrador = invitacion.estado === 'borrador'
  const esPublicada = invitacion.estado === 'publicada'
  const esPendiente = invitacion.estado === 'pendiente_pago'

  return (
    <ExpressDashboardLayout activeTab="invitaciones">
      <div className="express-page-header">
        <h1>{[invitacion.nombre1, invitacion.nombre2].filter(Boolean).join(' & ') || 'Nueva invitación'}</h1>
        <span className="express-editor-codigo">{invitacion.codigo_interno}</span>
      </div>

      {esPendiente && (
        <div className="express-banner express-banner-warning">
          Tu invitación está a la espera de confirmación de pago. Te contactaremos
          por WhatsApp para coordinarlo. Código: <strong>{invitacion.codigo_interno}</strong>
        </div>
      )}

      {esPublicada && (
        <div className="express-banner express-banner-success">
          Tu invitación está publicada. Correcciones disponibles: <strong>{invitacion.correcciones_disponibles}</strong>.
          {!tieneCorreccionesDisponibles(invitacion) && (
            <button className="express-btn-secondary" style={{ marginLeft: '1rem' }} onClick={handleSolicitarCorreccionesExtra}>
              Solicitar 2 correcciones más (Bs. 30)
            </button>
          )}
        </div>
      )}

      <div className="express-editor-tabs">
        {PASOS.map((p) => (
          <button
            key={p}
            className={pasoActual === p ? 'active' : ''}
            onClick={() => setPasoActual(p)}
          >
            {PASOS_LABEL[p]}
          </button>
        ))}
      </div>

      {errores.length > 0 && (
        <div className="express-banner express-banner-error">
          <strong>Antes de publicar, completa lo siguiente:</strong>
          <ul>{errores.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}

      <div className="express-editor-body">
        {pasoActual === 'pareja' && <PasoDatosPareja invitacion={invitacion} onGuardar={guardarCampos} />}
        {pasoActual === 'lugares' && <PasoLugares invitacion={invitacion} onGuardar={guardarCampos} />}
        {pasoActual === 'itinerario' && <PasoItinerario invitacion={invitacion} onGuardar={guardarCampos} />}
        {pasoActual === 'detalles' && <PasoDetalles invitacion={invitacion} onGuardar={guardarCampos} />}
        {pasoActual === 'media' && (
          <PasoMedia
            invitacion={invitacion}
            userId={user.id}
            onGuardar={guardarCampos}
            onInvitacionActualizada={setInvitacion}
          />
        )}
      </div>

      {mensaje && <div className="express-toast">{mensaje}</div>}

      {esBorrador && (
        <div className="express-editor-publicar">
          <button className="express-btn-primary" disabled={guardando} onClick={handlePublicar}>
            {guardando ? 'Procesando...' : 'Publicar mi invitación (Bs. 200)'}
          </button>
          <p className="express-editor-publicar-nota">
            Al publicar te contactaremos por WhatsApp para coordinar el pago.
          </p>
        </div>
      )}

      <style jsx global>{`
        .express-editor-codigo { font-size: 0.75rem; color: #999; background: #f0f0f0; padding: 0.3rem 0.7rem; border-radius: 6px; white-space: nowrap; }
        .express-banner { padding: 1rem 1.2rem; border-radius: 10px; margin-bottom: 1.2rem; font-size: 0.85rem; }
        .express-banner-warning { background: #fef9c3; color: #854d0e; }
        .express-banner-success { background: #dcfce7; color: #166534; }
        .express-banner-error { background: #fee2e2; color: #991b1b; }
        .express-banner-error ul { margin: 0.5rem 0 0 1.2rem; }
        .express-editor-tabs { display: flex; gap: 0.4rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .express-editor-tabs button { background: white; border: 1.5px solid #e0e0e0; padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; }
        .express-editor-tabs button.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }
        .express-editor-body { background: white; border-radius: 12px; padding: 1.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 1.5rem; }
        .express-toast { position: fixed; bottom: 1.5rem; right: 1.5rem; background: #1a1a1a; color: white; padding: 0.7rem 1.2rem; border-radius: 8px; font-size: 0.8rem; }
        .express-editor-publicar { text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .express-editor-publicar-nota { font-size: 0.75rem; color: #999; margin-top: 0.6rem; }
      `}</style>
    </ExpressDashboardLayout>
  )
}
