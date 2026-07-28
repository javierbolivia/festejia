'use client'
import { useState } from 'react'
import {
  subirFotoPortada,
  subirFotoGaleria,
  subirMusica,
  subirQrRegalo,
} from '../../../../../lib/express/storage'
import { MAX_FOTOS_GALERIA } from '../../../../../lib/express/validation'

export default function PasoMedia({ invitacion, userId, onGuardar, onInvitacionActualizada }) {
  const [subiendo, setSubiendo] = useState('')
  const [error, setError] = useState('')

  const fotosGaleria = Array.isArray(invitacion.fotos_galeria) ? invitacion.fotos_galeria : []

  async function handlePortada(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo('portada')
    setError('')
    const { url, error: err } = await subirFotoPortada(userId, invitacion.id, file)
    if (err) {
      setError(err.message)
    } else {
      const actualizada = { ...invitacion, foto_portada_url: url }
      onInvitacionActualizada(actualizada)
      onGuardar({ foto_portada_url: url })
    }
    setSubiendo('')
  }

  async function handleGaleria(e, index) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo(`galeria-${index}`)
    setError('')
    const { url, error: err } = await subirFotoGaleria(userId, invitacion.id, file, index)
    if (err) {
      setError(err.message)
    } else {
      const nuevaGaleria = [...fotosGaleria]
      nuevaGaleria[index] = url
      const actualizada = { ...invitacion, fotos_galeria: nuevaGaleria }
      onInvitacionActualizada(actualizada)
      onGuardar({ fotos_galeria: nuevaGaleria })
    }
    setSubiendo('')
  }

  async function handleMusica(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo('musica')
    setError('')
    const { url, error: err } = await subirMusica(userId, invitacion.id, file)
    if (err) {
      setError(err.message)
    } else {
      const actualizada = { ...invitacion, musica_url: url }
      onInvitacionActualizada(actualizada)
      onGuardar({ musica_url: url })
    }
    setSubiendo('')
  }

  async function handleQrRegalo(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo('qr')
    setError('')
    const { url, error: err } = await subirQrRegalo(userId, invitacion.id, file)
    if (err) {
      setError(err.message)
    } else {
      const actualizada = { ...invitacion, regalo_qr_url: url }
      onInvitacionActualizada(actualizada)
      onGuardar({ regalo_qr_url: url })
    }
    setSubiendo('')
  }

  return (
    <div>
      {error && <div className="express-error" style={{ marginBottom: '1rem' }}>{error}</div>}

      <div className="express-media-section">
        <label className="express-mini-label">Foto de portada</label>
        <div className="express-media-uploader">
          {invitacion.foto_portada_url && (
            <img src={invitacion.foto_portada_url} alt="Portada" className="express-media-preview" />
          )}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePortada} disabled={subiendo === 'portada'} />
          {subiendo === 'portada' && <span className="express-media-status">Subiendo...</span>}
        </div>
      </div>

      <div className="express-media-section">
        <label className="express-mini-label">Fotos de galería (máximo {MAX_FOTOS_GALERIA})</label>
        <div className="express-media-galeria-grid">
          {Array.from({ length: MAX_FOTOS_GALERIA }).map((_, index) => (
            <div key={index} className="express-media-uploader">
              {fotosGaleria[index] && (
                <img src={fotosGaleria[index]} alt={`Galería ${index + 1}`} className="express-media-preview" />
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleGaleria(e, index)}
                disabled={subiendo === `galeria-${index}`}
              />
              {subiendo === `galeria-${index}` && <span className="express-media-status">Subiendo...</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="express-media-section">
        <label className="express-mini-label">Música de fondo (MP3)</label>
        <div className="express-media-uploader">
          {invitacion.musica_url && <span className="express-media-status">✓ Música cargada</span>}
          <input type="file" accept="audio/mpeg,.mp3" onChange={handleMusica} disabled={subiendo === 'musica'} />
          {subiendo === 'musica' && <span className="express-media-status">Subiendo...</span>}
        </div>
      </div>

      <div className="express-media-section">
        <label className="express-mini-label">QR de regalo bancario (opcional)</label>
        <div className="express-media-uploader">
          {invitacion.regalo_qr_url && (
            <img src={invitacion.regalo_qr_url} alt="QR de regalo" className="express-media-preview express-media-preview-small" />
          )}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleQrRegalo} disabled={subiendo === 'qr'} />
          {subiendo === 'qr' && <span className="express-media-status">Subiendo...</span>}
        </div>
      </div>

      <style jsx global>{`
        .express-media-section { margin-bottom: 1.8rem; }
        .express-media-uploader { display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-start; }
        .express-media-preview { width: 160px; height: 160px; object-fit: cover; border-radius: 10px; border: 1px solid #e0e0e0; }
        .express-media-preview-small { width: 100px; height: 100px; }
        .express-media-status { font-size: 0.75rem; color: #666; }
        .express-media-galeria-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
      `}</style>
    </div>
  )
}
