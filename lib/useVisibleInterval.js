// lib/useVisibleInterval.js
//
// Hook compartido que corre un setInterval SOLO mientras el elemento
// observado está visible en el viewport, y lo pausa (clearInterval real,
// no solo "deja de importar") en cuanto sale de vista.
//
// Corrección de auditoría (hallazgos 4.3 y 4.4): las 5 micro-animaciones de
// app/FeatureVisuals.js y el LiveDashboard de la landing corrían su
// setInterval indefinidamente durante toda la sesión del usuario, incluso
// horas después de que hubiera scrolleado más allá de esa sección —
// consumo de CPU/batería innecesario, especialmente en móvil. El propio
// hook useCounter() en app/page.js ya usaba IntersectionObserver
// correctamente para este mismo problema; este hook generaliza ese patrón
// para reutilizarlo en el resto de animaciones del proyecto.
'use client'
import { useEffect, useRef } from 'react'

/**
 * @param {() => void} callback - función a ejecutar en cada tick.
 * @param {number} delay - milisegundos entre ticks.
 * @param {object} [options]
 * @param {boolean} [options.immediate] - si true, ejecuta el callback una
 *   vez de inmediato al volverse visible, además de en cada tick posterior.
 * @returns {import('react').RefObject} ref a asignar al elemento a observar.
 */
export function useVisibleInterval(callback, delay, options = {}) {
  const elementRef = useRef(null)
  // El callback se guarda en un ref para que el useEffect de abajo no
  // necesite reinstalar el IntersectionObserver cada vez que el componente
  // que usa este hook define una función nueva en cada render.
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    let intervalId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (intervalId) return // ya corriendo
          if (options.immediate) callbackRef.current()
          intervalId = setInterval(() => callbackRef.current(), delay)
        } else if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (intervalId) clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, options.immediate])

  return elementRef
}
