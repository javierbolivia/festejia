'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Calcula el desglose de tiempo restante hasta una fecha objetivo.
 * @param {string|Date|number} fecha - Fecha meta del evento
 * @returns {object} { dias, horas, minutos, segundos, finalizado, valido }
 */
function calcularTiempoRestante(fecha) {
  if (!fecha) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, finalizado: false, valido: false }
  }

  const target = new Date(fecha).getTime()
  if (isNaN(target)) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, finalizado: false, valido: false }
  }

  const ahora = Date.now()
  const diferencia = target - ahora

  if (diferencia <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, finalizado: true, valido: true }
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24)
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60)
  const segundos = Math.floor((diferencia / 1000) % 60)

  return { dias, horas, minutos, segundos, finalizado: false, valido: true }
}

/**
 * Agrega un cero a la izquierda si el valor es menor a 10.
 */
function pad(num) {
  return String(num).padStart(2, '0')
}

/**
 * Componente CuentaRegresiva — Sistema de Diseño Editorial Festejia
 *
 * @param {Object} props
 * @param {string|Date} props.fechaObjetivo - Fecha y hora del evento
 * @param {string} [props.titulo='Solo Faltan'] - Titular emotivo superior
 * @param {string} [props.subtitulo] - Texto complementario de apoyo
 * @param {string} [props.mensajeDiaEvento='¡Hoy es el gran día!'] - Mensaje al culminar la cuenta
 * @param {string} [props.subtituloDiaEvento='¡La celebración ha comenzado!'] - Subtítulo del día festivo
 * @param {boolean} [props.mostrarSegundos=true] - Alternar visibilidad de segundos
 * @param {string} [props.variante='marfil'] - 'marfil' (fondo claro editorial) | 'oscuro' (fondo obsidiana)
 * @param {Function} [props.alFinalizar] - Callback ejecutado al expirar el tiempo
 * @param {string} [props.className=''] - Clases CSS adicionales
 */
export default function CuentaRegresiva({
  fechaObjetivo,
  titulo = 'Solo Faltan',
  subtitulo,
  mensajeDiaEvento = '¡Hoy es el gran día! ✨',
  subtituloDiaEvento = 'La celebración más esperada ha comenzado.',
  mostrarSegundos = true,
  variante = 'marfil',
  alFinalizar,
  className = '',
}) {
  const [montado, setMontado] = useState(false)
  const [tiempo, setTiempo] = useState(() => calcularTiempoRestante(fechaObjetivo))

  // Asegura la hidratación segura en el cliente (evita mismatch de SSR)
  useEffect(() => {
    setMontado(true)
    const estadoInicial = calcularTiempoRestante(fechaObjetivo)
    setTiempo(estadoInicial)

    if (estadoInicial.finalizado && alFinalizar) {
      alFinalizar()
    }

    const intervalId = setInterval(() => {
      const nuevo = calcularTiempoRestante(fechaObjetivo)
      setTiempo(nuevo)

      if (nuevo.finalizado) {
        clearInterval(intervalId)
        if (alFinalizar) alFinalizar()
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [fechaObjetivo, alFinalizar])

  const esOscuro = variante === 'oscuro'

  return (
    <section
      className={`festejia-cuenta-regresiva ${esOscuro ? 'variante-oscura' : 'variante-marfil'} ${className}`}
      aria-label="Cuenta regresiva del evento"
    >
      <div className="cr-contenedor">
        {/* Adorno editorial superior */}
        <div className="cr-adorno" aria-hidden="true">
          <span className="cr-linea" />
          <span className="cr-rombo">◆</span>
          <span className="cr-linea" />
        </div>

        {tiempo.finalizado ? (
          /* Estado cuando la fecha del evento ha llegado */
          <div className="cr-evento-activo">
            <h3 className="cr-mensaje-llegada">{mensajeDiaEvento}</h3>
            {subtituloDiaEvento && (
              <p className="cr-subtitulo-llegada">{subtituloDiaEvento}</p>
            )}
          </div>
        ) : (
          /* Estado activo de conteo regresivo */
          <>
            {titulo && <h3 className="cr-titulo">{titulo}</h3>}
            {subtitulo && <p className="cr-subtitulo">{subtitulo}</p>}

            <div className="cr-rejilla" role="timer" aria-live="polite">
              {/* DÍAS */}
              <div className="cr-unidad">
                <div className="cr-caja">
                  <span className="cr-numero">
                    {montado ? pad(tiempo.dias) : '--'}
                  </span>
                </div>
                <span className="cr-etiqueta">
                  {tiempo.dias === 1 ? 'Día' : 'Días'}
                </span>
              </div>

              <span className="cr-separador" aria-hidden="true">:</span>

              {/* HORAS */}
              <div className="cr-unidad">
                <div className="cr-caja">
                  <span className="cr-numero">
                    {montado ? pad(tiempo.horas) : '--'}
                  </span>
                </div>
                <span className="cr-etiqueta">Horas</span>
              </div>

              <span className="cr-separador" aria-hidden="true">:</span>

              {/* MINUTOS */}
              <div className="cr-unidad">
                <div className="cr-caja">
                  <span className="cr-numero">
                    {montado ? pad(tiempo.minutos) : '--'}
                  </span>
                </div>
                <span className="cr-etiqueta">Minutos</span>
              </div>

              {/* SEGUNDOS */}
              {mostrarSegundos && (
                <>
                  <span className="cr-separador" aria-hidden="true">:</span>
                  <div className="cr-unidad">
                    <div className="cr-caja cr-caja-segundos">
                      <span className="cr-numero cr-numero-segundos">
                        {montado ? pad(tiempo.segundos) : '--'}
                      </span>
                    </div>
                    <span className="cr-etiqueta">Segundos</span>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Adorno editorial inferior */}
        <div className="cr-adorno cr-adorno-inferior" aria-hidden="true">
          <span className="cr-linea" />
          <span className="cr-rombo">◆</span>
          <span className="cr-linea" />
        </div>
      </div>

      <style jsx>{`
        /* ===== FESTEJIA SISTEMA EDITORIAL - CUENTA REGRESIVA ===== */
        .festejia-cuenta-regresiva {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2.5rem 1rem;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Variante Marfil (Predeterminada) */
        .variante-marfil .cr-contenedor {
          background-color: #fbfaf7;
          background: linear-gradient(180deg, #fffdf9 0%, #fbfaf7 50%, #f5f1e9 100%);
          border: 1px solid rgba(214, 176, 106, 0.32);
          box-shadow: 
            0 12px 36px -8px rgba(214, 176, 106, 0.12),
            0 2px 8px rgba(17, 16, 15, 0.04);
          color: #181512;
        }

        /* Variante Oscura (Obsidiana Imperial) */
        .variante-oscura .cr-contenedor {
          background: linear-gradient(180deg, #181512 0%, #11100f 100%);
          border: 1px solid rgba(214, 176, 106, 0.35);
          box-shadow: 
            0 16px 40px -10px rgba(0, 0, 0, 0.6),
            0 0 24px rgba(214, 176, 106, 0.08);
          color: #f5f1e9;
        }

        .cr-contenedor {
          width: 100%;
          max-width: 580px;
          border-radius: 20px;
          padding: 2.2rem 1.8rem;
          text-align: center;
          position: relative;
          box-sizing: border-box;
          backdrop-filter: blur(8px);
        }

        /* Adornos de filigrana / Rombo */
        .cr-adorno {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin: 0 auto 1.2rem auto;
          max-width: 180px;
        }
        .cr-adorno-inferior {
          margin: 1.4rem auto 0 auto;
        }
        .cr-linea {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d6b06a, transparent);
        }
        .cr-rombo {
          font-size: 0.55rem;
          color: #d6b06a;
          opacity: 0.85;
        }

        /* Tipografía Editorial */
        .cr-titulo {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 1.65rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          margin: 0 0 0.4rem 0;
          color: inherit;
        }

        .cr-subtitulo {
          font-size: 0.85rem;
          font-weight: 400;
          line-height: 1.4;
          margin: 0 0 1.6rem 0;
          color: #7a7369;
        }
        .variante-oscura .cr-subtitulo {
          color: #a8a095;
        }

        /* Rejilla de Números */
        .cr-rejilla {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin: 0 auto;
        }

        .cr-unidad {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
          flex: 1;
          max-width: 86px;
        }

        /* Caja de cada número */
        .cr-caja {
          width: 100%;
          aspect-ratio: 1 / 1.05;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid rgba(214, 176, 106, 0.28);
          border-radius: 12px;
          box-shadow: 
            0 4px 12px rgba(214, 176, 106, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .variante-oscura .cr-caja {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(214, 176, 106, 0.22);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(214, 176, 106, 0.1);
        }

        /* Números estilizados */
        .cr-numero {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.01em;
          color: #caa052;
          background: linear-gradient(135deg, #d6b06a 0%, #caa052 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .variante-oscura .cr-numero {
          background: linear-gradient(135deg, #ffffff 0%, #f6dfb8 35%, #d6b06a 70%, #caa052 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Separadores sutiles */
        .cr-separador {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 300;
          color: #d6b06a;
          opacity: 0.6;
          margin-bottom: 1.2rem;
          user-select: none;
        }

        /* Etiquetas inferiores */
        .cr-etiqueta {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 0.6rem;
          color: #8c8275;
        }
        .variante-oscura .cr-etiqueta {
          color: #a8a095;
        }

        /* Estado Evento Cumplido */
        .cr-evento-activo {
          padding: 1.5rem 0.5rem;
        }
        .cr-mensaje-llegada {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 1.85rem;
          font-style: italic;
          font-weight: 500;
          color: #caa052;
          margin: 0 0 0.5rem 0;
        }
        .cr-subtitulo-llegada {
          font-size: 0.95rem;
          color: inherit;
          opacity: 0.85;
          margin: 0;
        }

        /* Responsive Móvil */
        @media (max-width: 480px) {
          .cr-contenedor {
            padding: 1.6rem 1rem;
            border-radius: 16px;
          }
          .cr-titulo {
            font-size: 1.4rem;
          }
          .cr-rejilla {
            gap: 0.35rem;
          }
          .cr-unidad {
            min-width: 48px;
            max-width: 68px;
          }
          .cr-caja {
            border-radius: 9px;
          }
          .cr-numero {
            font-size: 1.45rem;
          }
          .cr-separador {
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }
          .cr-etiqueta {
            font-size: 0.55rem;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </section>
  )
}
