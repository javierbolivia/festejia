import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://xzkxutllxkdrugjvflco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6a3h1dGxseGtkcnVnanZmbGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTE0MTgsImV4cCI6MjEwMDUyNzQxOH0.s3icP7S33TEWVL77edSFe8svSgC2AqTQe3lB0WYDrXk'
)

export async function generateMetadata({ params }) {
  const { id } = await params
  
  try {
    // Buscar invitado
    const { data: invitado } = await supabase
      .from('invitados')
      .select('*, evento_id')
      .eq('id', id)
      .single()

    if (!invitado) {
      return { title: 'Invitación - Festejia' }
    }

    // Buscar evento
    const { data: evento } = await supabase
      .from('eventos')
      .select('*')
      .eq('id', invitado.evento_id)
      .single()

    const novio1 = evento?.nombre_novio1 || 'Los Novios'
    const novio2 = evento?.nombre_novio2 || ''
    const titulo = novio2 ? `${novio1} & ${novio2} — ¡Nos Casamos!` : `${novio1} — Celebración`
    const descripcion = evento?.mensaje_personalizado || `Te invitamos a ser parte de este día tan especial. ${evento?.fecha_evento ? new Date(evento.fecha_evento).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}`
    
    // Imagen OG dinámica generada por nuestra API
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://festejia.vercel.app'
    const ogImage = `${baseUrl}/api/og?id=${id}`

    return {
      title: titulo,
      description: descripcion,
      openGraph: {
        title: titulo,
        description: descripcion,
        images: [{ url: ogImage, width: 1200, height: 630, alt: titulo }],
        type: 'website',
        siteName: 'Festejia'
      },
      twitter: {
        card: 'summary_large_image',
        title: titulo,
        description: descripcion,
        images: [ogImage]
      }
    }
  } catch (e) {
    return { title: 'Invitación - Festejia' }
  }
}

export default async function InvitacionPage({ params }) {
  const { id } = await params
  
  // Obtener datos del invitado para pasar a la plantilla
  let nombre = ''
  let pases = '1'
  let eventoId = ''
  
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
    }
  } catch(e) {}

  const redirectUrl = `/plantilla1/?m=${encodeURIComponent(nombre)}&n=${encodeURIComponent(pases + ' pases')}&id=${id}&evento=${eventoId}`
  
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${redirectUrl}`} />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'serif',
        color: '#333'
      }}>
        <p>Abriendo tu invitación...</p>
      </div>
    </>
  )
}
