// Corrección de auditoría (hallazgo 2.2): antes este archivo creaba su propio
// cliente Supabase con URL y anon key duplicadas como literales, en vez de
// reutilizar el cliente centralizado de lib/supabase.js. Mismo cliente, sin
// segunda fuente de verdad de las credenciales.
import { supabase } from '../../../lib/supabase'

export async function generateMetadata({ params }) {
  const { id } = await params
  
  try {
    const { data: invitado } = await supabase
      .from('invitados')
      .select('*, evento_id')
      .eq('id', id)
      .single()

    if (!invitado) {
      return { title: 'Invitación - Festejia' }
    }

    const { data: evento } = await supabase
      .from('eventos')
      .select('*')
      .eq('id', invitado.evento_id)
      .single()

    const novio1 = evento?.nombre_novio1 || 'Los Novios'
    const novio2 = evento?.nombre_novio2 || ''
    const plantilla = evento?.plantilla || 'plantilla1'
    const titulo = novio2 ? `${novio1} & ${novio2} — ¡Nos Casamos!` : `${novio1} — Celebración`
    const descripcion = evento?.mensaje_personalizado || `Te invitamos a ser parte de este día tan especial. ${evento?.fecha_evento ? new Date(evento.fecha_evento).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}`
    
    // Imagen OG: usa la primera foto de los novios de la plantilla asignada
    const ogImage = `https://www.festejia.com/${plantilla}/images/foto-modelo-sobre-boda-1.jpg`

    return {
      title: titulo,
      description: descripcion,
      openGraph: {
        title: titulo,
        description: descripcion,
        url: `https://www.festejia.com/invitacion/${id}`,
        images: [
          {
            url: ogImage,
            width: 1024,
            height: 1024,
            alt: titulo,
            type: 'image/jpeg',
          }
        ],
        type: 'website',
        siteName: 'Festejia',
        locale: 'es_ES',
      },
      twitter: {
        card: 'summary_large_image',
        title: titulo,
        description: descripcion,
        images: [ogImage],
      },
    }
  } catch (e) {
    return { title: 'Invitación - Festejia' }
  }
}

export default async function InvitacionPage({ params }) {
  const { id } = await params
  
  let nombre = ''
  let pases = '1'
  let eventoId = ''
  let plantilla = 'plantilla1'
  
  try {
    const { data: invitado } = await supabase
      .from('invitados')
      .select('nombre_completo, num_pases, evento_id')
      .eq('id', id)
      .single()
    
    if (invitado) {
      nombre = invitado.nombre_completo || ''
      pases = String(invitado.num_pases || 1)
      eventoId = invitado.evento_id || ''

      // Obtener la plantilla del evento
      const { data: evento } = await supabase
        .from('eventos')
        .select('plantilla')
        .eq('id', invitado.evento_id)
        .single()
      
      if (evento?.plantilla) {
        plantilla = evento.plantilla
      }
    }
  } catch(e) {}

  const redirectUrl = `/${plantilla}/?m=${encodeURIComponent(nombre)}&n=${encodeURIComponent(pases + ' pases')}&id=${id}&evento=${eventoId}`
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'serif',
      color: '#333',
      background: '#f5f5f5'
    }}>
      <p>Abriendo tu invitación...</p>
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace("${redirectUrl}")` }} />
    </div>
  )
}
