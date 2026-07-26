import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const supabase = createClient(
  'https://xzkxutllxkdrugjvflco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6a3h1dGxseGtkcnVnanZmbGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTE0MTgsImV4cCI6MjEwMDUyNzQxOH0.s3icP7S33TEWVL77edSFe8svSgC2AqTQe3lB0WYDrXk'
)

export default async function Image({ params }) {
  const { id } = await params

  let novio1 = 'Los Novios'
  let novio2 = ''
  let fecha = ''
  let tipo = 'Celebración'

  try {
    const { data: invitado } = await supabase
      .from('invitados')
      .select('evento_id')
      .eq('id', id)
      .single()

    if (invitado) {
      const { data: evento } = await supabase
        .from('eventos')
        .select('*')
        .eq('id', invitado.evento_id)
        .single()

      if (evento) {
        novio1 = evento.nombre_novio1 || 'Los Novios'
        novio2 = evento.nombre_novio2 || ''
        tipo = evento.tipo === 'boda' ? '¡Nos Casamos!' : evento.tipo === 'quince' ? '¡Mis 15 Años!' : '¡Celebración!'
        if (evento.fecha_evento) {
          fecha = new Date(evento.fecha_evento).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
        }
      }
    }
  } catch (e) {}

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        fontFamily: 'serif',
        position: 'relative'
      }}>
        {/* Decoración */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          color: '#c9a96e',
          fontSize: '18px',
          display: 'flex'
        }}>Festejia</div>

        {/* Contenido */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px'
        }}>
          <div style={{
            color: '#c9a96e',
            fontSize: '24px',
            letterSpacing: '4px',
            marginBottom: '20px',
            display: 'flex'
          }}>{tipo}</div>

          <div style={{
            color: 'white',
            fontSize: '72px',
            fontWeight: 'bold',
            marginBottom: '10px',
            display: 'flex'
          }}>{novio1}</div>

          {novio2 && (
            <>
              <div style={{ color: '#c9a96e', fontSize: '36px', margin: '5px 0', display: 'flex' }}>&</div>
              <div style={{ color: 'white', fontSize: '72px', fontWeight: 'bold', display: 'flex' }}>{novio2}</div>
            </>
          )}

          {fecha && (
            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '24px',
              marginTop: '30px',
              display: 'flex'
            }}>{fecha}</div>
          )}

          <div style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            marginTop: '20px',
            display: 'flex'
          }}>Te invitamos a ser parte de este día tan especial</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
