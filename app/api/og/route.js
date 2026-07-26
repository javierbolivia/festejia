import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

const supabase = createClient(
  'https://xzkxutllxkdrugjvflco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6a3h1dGxseGtkcnVnanZmbGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTE0MTgsImV4cCI6MjEwMDUyNzQxOH0.s3icP7S33TEWVL77edSFe8svSgC2AqTQe3lB0WYDrXk'
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const invitadoId = searchParams.get('id')

  let novio1 = 'Los Novios'
  let novio2 = ''
  let fecha = ''
  let tipo = 'Boda'
  let mensaje = 'Te invitamos a celebrar con nosotros'

  if (invitadoId) {
    try {
      const { data: invitado } = await supabase
        .from('invitados')
        .select('evento_id')
        .eq('id', invitadoId)
        .single()

      if (invitado?.evento_id) {
        const { data: evento } = await supabase
          .from('eventos')
          .select('nombre_novio1, nombre_novio2, fecha_evento, tipo, mensaje_personalizado')
          .eq('id', invitado.evento_id)
          .single()

        if (evento) {
          novio1 = evento.nombre_novio1 || novio1
          novio2 = evento.nombre_novio2 || ''
          tipo = evento.tipo || 'Boda'
          mensaje = evento.mensaje_personalizado || mensaje
          if (evento.fecha_evento) {
            fecha = new Date(evento.fecha_evento).toLocaleDateString('es', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          }
        }
      }
    } catch (e) {
      // fallback to defaults
    }
  }

  const titulo = novio2 ? `${novio1} & ${novio2}` : novio1
  const subtitulo = tipo === 'Boda' ? '¡Nos Casamos!' : tipo === '15 Años' ? '¡Mis 15 Años!' : '¡Celebración!'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '2px solid rgba(201, 169, 110, 0.4)',
            borderRadius: '20px',
            display: 'flex',
          }}
        />

        {/* Corner decorations */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            borderTop: '3px solid #c9a96e',
            borderLeft: '3px solid #c9a96e',
            borderRadius: '5px 0 0 0',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderTop: '3px solid #c9a96e',
            borderRight: '3px solid #c9a96e',
            borderRadius: '0 5px 0 0',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            borderBottom: '3px solid #c9a96e',
            borderLeft: '3px solid #c9a96e',
            borderRadius: '0 0 0 5px',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderBottom: '3px solid #c9a96e',
            borderRight: '3px solid #c9a96e',
            borderRadius: '0 0 5px 0',
            display: 'flex',
          }}
        />

        {/* Top label */}
        <div
          style={{
            fontSize: '18px',
            color: 'rgba(201, 169, 110, 0.8)',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            display: 'flex',
          }}
        >
          {subtitulo}
        </div>

        {/* Names */}
        <div
          style={{
            fontSize: '72px',
            color: '#ffffff',
            fontWeight: '300',
            letterSpacing: '2px',
            textAlign: 'center',
            lineHeight: '1.1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>{novio1}</span>
          {novio2 && (
            <span
              style={{
                fontSize: '40px',
                color: '#c9a96e',
                fontStyle: 'italic',
                margin: '5px 0',
                display: 'flex',
              }}
            >
              &
            </span>
          )}
          {novio2 && <span>{novio2}</span>}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '120px',
            height: '1px',
            background: '#c9a96e',
            margin: '30px 0',
            display: 'flex',
          }}
        />

        {/* Date */}
        {fecha && (
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.85)',
              letterSpacing: '2px',
              display: 'flex',
            }}
          >
            {fecha}
          </div>
        )}

        {/* Message */}
        <div
          style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '15px',
            maxWidth: '600px',
            textAlign: 'center',
            display: 'flex',
          }}
        >
          {mensaje.length > 80 ? mensaje.substring(0, 80) + '...' : mensaje}
        </div>

        {/* Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '14px',
            color: 'rgba(201, 169, 110, 0.6)',
            letterSpacing: '3px',
            display: 'flex',
          }}
        >
          festejia.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
