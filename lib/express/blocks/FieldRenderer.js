// lib/express/blocks/FieldRenderer.js
//
// Renderiza UN campo de formulario según su "tipo" declarado en el schema
// de un bloque. Este es el único lugar del proyecto que sabe cómo dibujar
// un campo de texto, una fecha, un selector de color, un subidor de foto, etc.
//
// Los 17 bloques (Portada, Ceremonia, Galería, Dress Code...) NUNCA
// implementan su propio <input>. Solo declaran en su schema.js qué campos
// tienen y de qué tipo son. Esto es lo que evita duplicar código de
// formularios en cada bloque nuevo.
'use client'
import { useState } from 'react'
import { subirArchivoBloque } from '../storage'

const PALETA_COLORES = ['#2d4a3e', '#b8860b', '#8b6f47', '#c9a96e', '#4a6e5c', '#f5e6d0', '#354A68', '#876E44']

export default function FieldRenderer({
  campo,
  valor,
  onChange,
  conIA,
  generando,
  onGenerarIA,
  userId,
  invitacionId,
  bloqueTipo,
}) {
  switch (campo.tipo) {
    case 'texto':
      return (
        <div className="fr-row">
          <input
            type="text"
            value={valor || ''}
            placeholder={campo.placeholder || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )

    case 'textarea':
      return (
        <div className="fr-row">
          <textarea
            rows={campo.filas || 3}
            value={valor || ''}
            placeholder={campo.placeholder || ''}
            onChange={(e) => onChange(e.target.value)}
          />
          {conIA && (
            <button type="button" className="fr-btn-ia" disabled={generando} onClick={onGenerarIA}>
              {generando ? 'Generando...' : '✨ Generar con IA'}
            </button>
          )}
        </div>
      )

    case 'fecha':
      return <input type="date" value={valor || ''} onChange={(e) => onChange(e.target.value)} />

    case 'hora':
      return <input type="time" value={valor || ''} onChange={(e) => onChange(e.target.value)} />

    case 'url':
      return (
        <input
          type="url"
          value={valor || ''}
          placeholder={campo.placeholder || 'https://...'}
          onChange={(e) => onChange(e.target.value)}
        />
      )

    case 'checkbox':
      return (
        <label className="fr-checkbox">
          <input type="checkbox" checked={!!valor} onChange={(e) => onChange(e.target.checked)} />
          {campo.label}
        </label>
      )

    case 'select':
      return (
        <select value={valor || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Selecciona...</option>
          {(campo.opciones || []).map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      )

    case 'color':
      return (
        <div className="fr-swatches">
          {PALETA_COLORES.map((color) => (
            <button
              key={color}
              type="button"
              className={`fr-swatch ${valor === color ? 'selected' : ''}`}
              style={{ background: color }}
              onClick={() => onChange(color)}
              aria-label={color}
            />
          ))}
        </div>
      )

    case 'icono':
      return (
        <div className="fr-icon-options">
          {(campo.opciones || []).map((op) => (
            <button
              key={op.value}
              type="button"
              className={`fr-icon-option ${valor === op.value ? 'selected' : ''}`}
              onClick={() => onChange(op.value)}
            >
              <span className="fr-icon-emoji">{op.emoji}</span>
              <span>{op.label}</span>
            </button>
          ))}
        </div>
      )

    case 'imagen':
      return (
        <ImagenField
          valor={valor}
          onChange={onChange}
          userId={userId}
          invitacionId={invitacionId}
          bloqueTipo={bloqueTipo}
          campoKey={campo.key}
        />
      )

    case 'musica':
      return (
        <MusicaField
          valor={valor}
          onChange={onChange}
          userId={userId}
          invitacionId={invitacionId}
          bloqueTipo={bloqueTipo}
          campoKey={campo.key}
        />
      )

    case 'galeria':
      return (
        <GaleriaField
          valor={Array.isArray(valor) ? valor : []}
          onChange={onChange}
          userId={userId}
          invitacionId={invitacionId}
          bloqueTipo={bloqueTipo}
          campoKey={campo.key}
          max={campo.max || 6}
        />
      )

    case 'lista-simple':
      return <ListaSimpleField valor={Array.isArray(valor) ? valor : []} onChange={onChange} placeholder={campo.placeholder} />

    case 'lista-items':
      return <ListaItemsField valor={Array.isArray(valor) ? valor : []} onChange={onChange} itemCampos={campo.itemCampos || []} />

    default:
      return null
  }
}

// ---------------------------------------------------------------
// Sub-campos con estado propio (subida de archivos, listas dinámicas)
// ---------------------------------------------------------------

function ImagenField({ valor, onChange, userId, invitacionId, bloqueTipo, campoKey }) {
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo(true)
    setError('')
    const { url, error: err } = await subirArchivoBloque(userId, invitacionId, bloqueTipo, campoKey, file)
    if (err) setError(err.message)
    else onChange(url)
    setSubiendo(false)
  }

  return (
    <div className="fr-media">
      {valor && <img src={valor} alt="" className="fr-media-preview" />}
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} disabled={subiendo} />
      {subiendo && <span className="fr-media-status">Subiendo...</span>}
      {error && <span className="fr-media-error">{error}</span>}
    </div>
  )
}

function MusicaField({ valor, onChange, userId, invitacionId, bloqueTipo, campoKey }) {
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo(true)
    setError('')
    const { url, error: err } = await subirArchivoBloque(userId, invitacionId, bloqueTipo, campoKey, file, { audio: true })
    if (err) setError(err.message)
    else onChange(url)
    setSubiendo(false)
  }

  return (
    <div className="fr-media">
      {valor && <span className="fr-media-status">✓ Archivo cargado</span>}
      <input type="file" accept="audio/mpeg,.mp3" onChange={handleFile} disabled={subiendo} />
      {subiendo && <span className="fr-media-status">Subiendo...</span>}
      {error && <span className="fr-media-error">{error}</span>}
    </div>
  )
}

function GaleriaField({ valor, onChange, userId, invitacionId, bloqueTipo, campoKey, max }) {
  const [subiendoIndice, setSubiendoIndice] = useState(null)
  const [error, setError] = useState('')

  async function handleFile(e, indice) {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendoIndice(indice)
    setError('')
    const { url, error: err } = await subirArchivoBloque(userId, invitacionId, bloqueTipo, campoKey, file, { indice })
    if (err) {
      setError(err.message)
    } else {
      const nuevas = [...valor]
      nuevas[indice] = url
      onChange(nuevas)
    }
    setSubiendoIndice(null)
  }

  function quitar(indice) {
    onChange(valor.filter((_, i) => i !== indice))
  }

  const slots = Math.min(max, valor.length + 1)

  return (
    <div className="fr-galeria-grid">
      {error && <span className="fr-media-error">{error}</span>}
      {Array.from({ length: slots }).map((_, indice) => (
        <div key={indice} className="fr-media">
          {valor[indice] && (
            <>
              <img src={valor[indice]} alt="" className="fr-media-preview fr-media-preview-sm" />
              <button type="button" className="fr-remove" onClick={() => quitar(indice)}>Quitar</button>
            </>
          )}
          {!valor[indice] && (
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFile(e, indice)} disabled={subiendoIndice === indice} />
          )}
          {subiendoIndice === indice && <span className="fr-media-status">Subiendo...</span>}
        </div>
      ))}
    </div>
  )
}

function ListaSimpleField({ valor, onChange, placeholder }) {
  function set(i, v) {
    const nuevos = [...valor]
    nuevos[i] = v
    onChange(nuevos)
  }
  function agregar() { onChange([...valor, '']) }
  function quitar(i) { onChange(valor.filter((_, idx) => idx !== i)) }

  return (
    <div className="fr-lista">
      {valor.map((v, i) => (
        <div key={i} className="fr-lista-row">
          <input type="text" value={v} placeholder={placeholder || ''} onChange={(e) => set(i, e.target.value)} />
          <button type="button" className="fr-remove" onClick={() => quitar(i)}>✕</button>
        </div>
      ))}
      <button type="button" className="fr-add" onClick={agregar}>+ Agregar</button>
    </div>
  )
}

function ListaItemsField({ valor, onChange, itemCampos }) {
  function setCampo(i, key, v) {
    const nuevos = [...valor]
    nuevos[i] = { ...nuevos[i], [key]: v }
    onChange(nuevos)
  }
  function agregar() {
    const vacio = {}
    itemCampos.forEach((c) => { vacio[c.key] = '' })
    onChange([...valor, vacio])
  }
  function quitar(i) { onChange(valor.filter((_, idx) => idx !== i)) }

  return (
    <div className="fr-lista">
      {valor.map((item, i) => (
        <div key={i} className="fr-lista-items-row">
          {itemCampos.map((c) => (
            <div key={c.key} className="fr-lista-items-campo">
              {c.tipo === 'select' ? (
                <select value={item[c.key] || ''} onChange={(e) => setCampo(i, c.key, e.target.value)}>
                  <option value="">{c.label}</option>
                  {(c.opciones || []).map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
                </select>
              ) : (
                <input
                  type={c.tipo === 'hora' ? 'time' : c.tipo === 'url' ? 'url' : 'text'}
                  value={item[c.key] || ''}
                  placeholder={c.label}
                  onChange={(e) => setCampo(i, c.key, e.target.value)}
                />
              )}
            </div>
          ))}
          <button type="button" className="fr-remove" onClick={() => quitar(i)}>✕</button>
        </div>
      ))}
      <button type="button" className="fr-add" onClick={agregar}>+ Agregar</button>
    </div>
  )
}
