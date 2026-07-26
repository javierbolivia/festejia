import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

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

  const subtitulo = tipo === 'Boda' ? '¡Nos Casamos!' : tipo === '15 Años' ? '¡Mis 15 Años!' : '¡Celebración!'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          position: 'relative',
        }}
      >
        {/* Border decorativo */}
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

        {/* Subtitulo arriba */}
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(201, 169, 110, 0.9)',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          {subtitulo}
        </div>

        {/* Nombres */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '68px',
              color: '#ffffff',
              fontWeight: 300,
              display: 'flex',
            }}
          >
            {novio1}
          </div>
          {novio2 && (
            <div
              style={{
                fontSize: '42px',
                color: '#c9a96e',
                fontStyle: 'italic',
                margin: '4px 0',
                display: 'flex',
              }}
            >
              &amp;
            </div>
          )}
          {novio2 && (
            <div
              style={{
                fontSize: '68px',
                color: '#ffffff',
                fontWeight: 300,
                display: 'flex',
              }}
            >
              {novio2}
            </div>
          )}
        </div>

        {/* Linea divisoria */}
        <div
          style={{
            width: '120px',
            height: '2px',
            background: '#c9a96e',
            margin: '28px 0',
            display: 'flex',
          }}
        />

        {/* Fecha */}
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

        {/* Mensaje */}
        <div
          style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '16px',
            maxWidth: '550px',
            textAlign: 'center',
            display: 'flex',
          }}
        >
          {mensaje.length > 70 ? mensaje.substring(0, 70) + '...' : mensaje}
        </div>

        {/* Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '35px',
            fontSize: '15px',
            color: 'rgba(201, 169, 110, 0.6)',
            letterSpacing: '4px',
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
