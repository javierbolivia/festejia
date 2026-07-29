'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../../../lib/supabase'
import {
  obtenerInvitacionPorId,
  fijarSlugSiDisponible,
  marcarPendientePago,
} from '../../../../../lib/express/queries'
import { iniciarPagoPublicacion, iniciarPagoCorreccionExtra } from '../../../../../lib/express/payments'
import { generarSlug, tieneCorreccionesDisponibles } from '../../../../../lib/express/validation'
import ExpressDashboardLayout from '../../ExpressDashboardLayout'
import EditorEngine from '../../../../../lib/express/blocks/EditorEngine'

export default function ExpressEditor() {
  const params = useParams()
  const invitacionId = params.invitacionId

  const [user, setUser] = useState(null)
  const [invitacion, setInvitacion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [publicando, setPublicando] = useState(false)

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

  async function handleSolicitarPublicar() {
    setPublicando(true)

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

    setPublicando(false)
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

      {publicando && <div className="express-banner">Procesando publicación...</div>}

      <EditorEngine
        invitacion={invitacion}
        userId={user.id}
        onInvitacionActualizada={(actualizada) => setInvitacion((prev) => ({ ...prev, ...actualizada }))}
        onSolicitarPublicar={handleSolicitarPublicar}
        puedeEditar={invitacion.estado === 'borrador'}
      />

      <style jsx global>{`
        .express-editor-codigo { font-size: 0.75rem; color: #999; background: #f0f0f0; padding: 0.3rem 0.7rem; border-radius: 6px; white-space: nowrap; }
        .express-banner { padding: 1rem 1.2rem; border-radius: 10px; margin-bottom: 1.2rem; font-size: 0.85rem; }
        .express-banner-warning { background: #fef9c3; color: #854d0e; }
        .express-banner-success { background: #dcfce7; color: #166534; }
      `}</style>
    </ExpressDashboardLayout>
  )
}
