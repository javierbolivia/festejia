// lib/express/blocks/EditorEngine.js
//
// EL MOTOR GENÉRICO DEL EDITOR. Este componente NUNCA importa un bloque
// ni una plantilla por su nombre. Todo lo que necesita lo obtiene en
// tiempo de ejecución de:
//   - obtenerConfigPlantilla(invitacion.plantilla)  -> qué bloques usar
//   - obtenerBloque(tipo)                            -> schema/Editor/Preview
//
// Por eso agregar una plantilla nueva o un bloque nuevo en el futuro no
// requiere ningún cambio aquí: este archivo sigue funcionando igual.
'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'

import { obtenerConfigPlantilla } from '../templates/registry'
import { obtenerBloque } from './registry'
import { validarBloques } from './validator'
import { guardarBloque, guardarOrdenBloques } from '../queries'
import Accordion from './Accordion'
import SortableBlockItem from './SortableBlockItem'

const DEBOUNCE_MS = 900

export default function EditorEngine({ invitacion, userId, onInvitacionActualizada, onSolicitarPublicar, puedeEditar = true }) {
  const config = obtenerConfigPlantilla(invitacion.plantilla)

  // Orden efectivo: el guardado por el usuario (invitacion.orden) si existe,
  // si no, el orden por defecto que declara la plantilla.
  const ordenInicial = Array.isArray(invitacion.orden) && invitacion.orden.length > 0
    ? invitacion.orden
    : config.bloques.map((b) => b.tipo)

  const [orden, setOrden] = useState(ordenInicial)
  const [bloqueActivo, setBloqueActivo] = useState(null)
  const [contenido, setContenido] = useState(invitacion.contenido || {})
  const [estadoGuardado, setEstadoGuardado] = useState('guardado') // 'guardado' | 'guardando' | 'error'
  const [generandoCampo, setGenerandoCampo] = useState({}) // { [tipo]: campoKey }
  const [errores, setErrores] = useState([])

  const timersRef = useRef({})

  useEffect(() => {
    // Si cambia la invitación cargada (navegación entre invitaciones), resincroniza.
    setContenido(invitacion.contenido || {})
    setOrden(Array.isArray(invitacion.orden) && invitacion.orden.length > 0 ? invitacion.orden : config.bloques.map((b) => b.tipo))
  }, [invitacion.id])

  const bloquesPorTipo = Object.fromEntries(config.bloques.map((b) => [b.tipo, b]))
  const bloquesOrdenados = orden.map((tipo) => bloquesPorTipo[tipo]).filter(Boolean)
  // Por si `orden` quedó desincronizado (bloque nuevo agregado a la plantilla
  // después de que el usuario ya guardó su propio orden), se agregan al final.
  const tiposFaltantes = config.bloques.filter((b) => !orden.includes(b.tipo))
  const listaFinal = [...bloquesOrdenados, ...tiposFaltantes]

  function guardarBloqueConDebounce(tipo, datos) {
    setEstadoGuardado('guardando')
    clearTimeout(timersRef.current[tipo])
    timersRef.current[tipo] = setTimeout(async () => {
      const { data, error } = await guardarBloque(invitacion.id, userId, tipo, datos)
      if (error) {
        setEstadoGuardado('error')
      } else {
        setEstadoGuardado('guardado')
        if (data) onInvitacionActualizada?.(data)
      }
    }, DEBOUNCE_MS)
  }

  function handleChangeBloque(tipo, nuevosDatos) {
    setContenido((prev) => ({ ...prev, [tipo]: nuevosDatos }))
    guardarBloqueConDebounce(tipo, nuevosDatos)
  }

  async function handleGenerarIA(tipo, campoKey) {
    setGenerandoCampo({ tipo, campo: campoKey })
    try {
      const info = contenido['informacion-principal'] || {}
      const res = await fetch('/api/express/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bloque: tipo,
          campo: campoKey,
          invitacionId: invitacion.id,
          contexto: { nombre1: info.nombre1, nombre2: info.nombre2 },
        }),
      })
      const json = await res.json()
      if (json?.texto) {
        setContenido((prev) => {
          const nuevosDatos = { ...(prev[tipo] || {}), [campoKey]: json.texto }
          guardarBloqueConDebounce(tipo, nuevosDatos)
          return { ...prev, [tipo]: nuevosDatos }
        })
      }
    } catch {
      // Si la IA falla, el usuario simplemente escribe el texto a mano.
    }
    setGenerandoCampo({})
  }

  function toggleAcordeon(tipo) {
    setBloqueActivo((actual) => (actual === tipo ? null : tipo))
  }

  function abrirDesdePreview(tipo) {
    setBloqueActivo(tipo)
    document.getElementById(`bloque-panel-${tipo}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // --------------------------------------------------------------
  // Drag & drop de reordenamiento (solo sobre config.ordenReordenable)
  // --------------------------------------------------------------
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = listaFinal.findIndex((b) => b.tipo === active.id)
    const newIndex = listaFinal.findIndex((b) => b.tipo === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const nuevoOrden = arrayMove(listaFinal.map((b) => b.tipo), oldIndex, newIndex)
    setOrden(nuevoOrden)
    guardarOrdenBloques(invitacion.id, userId, nuevoOrden)
  }

  // --------------------------------------------------------------
  // Validación genérica antes de publicar
  // --------------------------------------------------------------
  function handleClickPublicar() {
    const { valido, errores: errs } = validarBloques(config, contenido)
    setErrores(errs)
    if (valido) onSolicitarPublicar?.()
  }

  return (
    <div className="ee-layout">
      <div className="ee-panel">
        <div className="ee-panel-status">
          {estadoGuardado === 'guardando' && <span className="ee-status ee-status-guardando">● Guardando...</span>}
          {estadoGuardado === 'guardado' && <span className="ee-status ee-status-ok">✓ Todos los cambios guardados</span>}
          {estadoGuardado === 'error' && <span className="ee-status ee-status-error">⚠ Error al guardar</span>}
        </div>

        {errores.length > 0 && (
          <div className="ee-errores">
            <strong>Antes de publicar, completa lo siguiente:</strong>
            <ul>{errores.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={listaFinal.map((b) => b.tipo)} strategy={verticalListSortingStrategy}>
            <div className="ee-acordeon-list">
              {listaFinal.map((entradaBloque) => {
                const definicion = obtenerBloque(entradaBloque.tipo)
                if (!definicion) return null
                const arrastrable = !entradaBloque.fijo && config.ordenReordenable.includes(entradaBloque.tipo)
                return (
                  <div key={entradaBloque.tipo} id={`bloque-panel-${entradaBloque.tipo}`}>
                    <SortableBlockItem id={entradaBloque.tipo} arrastrable={arrastrable}>
                      <Accordion
                        schema={definicion.schema}
                        Editor={definicion.Editor}
                        abierto={bloqueActivo === entradaBloque.tipo}
                        onToggle={() => toggleAcordeon(entradaBloque.tipo)}
                        datos={contenido[entradaBloque.tipo]}
                        onChange={(nuevosDatos) => handleChangeBloque(entradaBloque.tipo, nuevosDatos)}
                        onGenerarIA={(campoKey) => handleGenerarIA(entradaBloque.tipo, campoKey)}
                        generandoCampo={generandoCampo.tipo === entradaBloque.tipo ? generandoCampo.campo : null}
                        userId={userId}
                        invitacionId={invitacion.id}
                      />
                    </SortableBlockItem>
                  </div>
                )
              })}
            </div>
          </SortableContext>
        </DndContext>

        {puedeEditar && (
          <button type="button" className="ee-btn-publicar" onClick={handleClickPublicar}>
            Publicar mi invitación
          </button>
        )}
      </div>

      <div className="ee-preview">
        <div className="ee-preview-scroll">
          {listaFinal.map((entradaBloque) => {
            const definicion = obtenerBloque(entradaBloque.tipo)
            if (!definicion || !definicion.Preview) return null
            const Preview = definicion.Preview
            return (
              <Preview
                key={entradaBloque.tipo}
                datos={contenido[entradaBloque.tipo]}
                estilo={entradaBloque.estilo}
                activo={bloqueActivo === entradaBloque.tipo}
                onClick={() => abrirDesdePreview(entradaBloque.tipo)}
                invitacionCompleta={{ ...invitacion, contenido }}
              />
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .ee-layout { display: grid; grid-template-columns: 400px 1fr; gap: 1.5rem; align-items: flex-start; }
        .ee-panel { display: flex; flex-direction: column; gap: 0.7rem; position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow-y: auto; padding-right: 0.4rem; }
        .ee-panel-status { padding: 0.2rem 0 0.3rem; }
        .ee-status { font-size: 0.75rem; }
        .ee-status-guardando { color: #b8860b; }
        .ee-status-ok { color: #22c55e; }
        .ee-status-error { color: #ef4444; }
        .ee-errores { background: #fee2e2; color: #991b1b; padding: 0.9rem 1rem; border-radius: 10px; font-size: 0.8rem; }
        .ee-errores ul { margin: 0.4rem 0 0 1.1rem; }
        .ee-acordeon-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .ee-btn-publicar {
          background: #1a1a1a; color: white; border: none; padding: 0.9rem; border-radius: 10px;
          font-size: 0.9rem; font-weight: 500; cursor: pointer; margin-top: 0.5rem;
        }
        .ee-btn-publicar:hover { background: #c9a96e; color: #1a1a1a; }
        .ee-preview { background: #f0efec; border-radius: 16px; padding: 1.2rem; }
        .ee-preview-scroll { display: flex; flex-direction: column; gap: 1rem; max-width: 480px; margin: 0 auto; }
        @media (max-width: 1024px) {
          .ee-layout { grid-template-columns: 1fr; }
          .ee-panel { position: static; max-height: none; }
        }
      `}</style>
    </div>
  )
}
