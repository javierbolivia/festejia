// app/api/express/generate-text/route.js
//
// Route Handler server-only. Genera textos con Kimi K3 para el editor Express.
// La API key de Kimi NUNCA se expone al navegador: solo vive aquí, en el
// servidor, leída desde una variable de entorno de Vercel.
//
// Si KIMI_API_KEY no está configurada (por ejemplo en desarrollo local antes
// de contratar el plan), el endpoint responde con un texto de plantilla
// genérico para que el cliente pueda seguir trabajando sin bloquear el flujo.
//
// SEGURIDAD (corrección de auditoría, hallazgo 5.1):
// Antes, este endpoint aceptaba peticiones de cualquier caller anónimo, sin
// verificar sesión ni que la invitación perteneciera a quien la pedía, y sin
// ningún límite de tasa — exponía el presupuesto de la API de Kimi a abuso
// trivial. Ahora exige un JWT de sesión válido (reenviado desde el navegador
// vía Authorization: Bearer), verifica que la invitación sea del propio
// usuario, y aplica un límite de 40 generaciones por hora por usuario antes
// de gastar ninguna llamada real a Kimi.

import { NextResponse } from 'next/server'
import { obtenerTokenDeRequest, crearClienteComoUsuario } from '../../../../lib/supabase-server'

const LIMITE_GENERACIONES_POR_HORA = 40

// Prompts genéricos: uno por bloque (no por campo), usados por el editor
// de bloques. Cualquier bloque nuevo que se agregue en el futuro y no tenga
// entrada aquí simplemente recibe un prompt genérico de repuesto — nunca
// rompe, nunca requiere tocar este archivo para que "Generar con IA" funcione.
const PROMPTS_POR_BLOQUE = {
  'informacion-principal': (ctx) => `Genera una frase de bienvenida breve, romántica y elegante para la invitación de ${ctx.nombre1 || 'los novios'} y ${ctx.nombre2 || ''}. Máximo 3 oraciones. En español.`,
  historia: (ctx) => `Escribe una historia romántica breve (máximo 5 oraciones) sobre cómo se conocieron ${ctx.nombre1 || 'los novios'} y ${ctx.nombre2 || ''}. En español, tono cálido y elegante.`,
  'dress-code': () => `Genera una frase corta y elegante invitando a los invitados a respetar el código de vestimenta de una boda. Máximo 2 oraciones. En español.`,
  'solo-adultos': (ctx) => `Genera un mensaje breve y amable explicando que la boda de ${ctx.nombre1 || 'los novios'} y ${ctx.nombre2 || ''} es un evento solo para adultos, sin sonar antipático. Máximo 2 oraciones. En español.`,
  regalos: (ctx) => `Genera un mensaje breve y elegante agradeciendo por adelantado cualquier regalo o contribución para la luna de miel de ${ctx.nombre1 || 'los novios'} y ${ctx.nombre2 || ''}, aclarando que su presencia es lo más importante. Máximo 3 oraciones. En español.`,
  padres: (ctx) => `Genera una frase breve y elegante para presentar a los padres de ${ctx.nombre1 || 'los novios'} y ${ctx.nombre2 || ''} en una invitación de boda. Máximo 2 oraciones. En español.`,
}

const FALLBACKS_POR_BLOQUE = {
  'informacion-principal': 'Nuestro gran día se aproxima y nos encantaría que formaras parte de él.',
  historia: 'Nuestra historia comenzó de la manera más inesperada, y desde entonces no hemos dejado de escribir juntos cada página de esta aventura llamada amor.',
  'dress-code': 'Te pedimos vestir de manera formal y elegante para acompañarnos en esta ocasión tan especial.',
  'solo-adultos': 'Amamos a los más pequeños, pero este día tan especial es solo para adultos. Gracias por tu comprensión.',
  regalos: 'Tu presencia es el mejor regalo que podemos recibir. Si deseas hacernos un obsequio, agradeceremos de corazón tu contribución.',
  padres: 'Con la bendición y el amor de nuestros padres, te invitamos a celebrar este día junto a nosotros.',
}

function construirPrompt({ bloque, campo, contexto }) {
  const generador = PROMPTS_POR_BLOQUE[bloque]
  const ctx = contexto || {}
  if (generador) return generador(ctx)
  return `Genera un texto breve, elegante y en español para el campo "${campo || 'texto'}" del bloque "${bloque}" de una invitación de boda entre ${ctx.nombre1 || 'los novios'} y ${ctx.nombre2 || ''}. Máximo 3 oraciones.`
}

async function llamarKimi(prompt) {
  const apiKey = process.env.KIMI_API_KEY
  if (!apiKey) return { texto: null, tokensUsados: null, tieneApiKey: false }

  const res = await fetch('https://api.moonshot.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'kimi-k2.7-code', messages: [{ role: 'user', content: prompt }] }),
  })
  if (!res.ok) return { texto: null, tokensUsados: null, tieneApiKey: true }

  const json = await res.json()
  const texto = json?.choices?.[0]?.message?.content?.trim() || null
  const tokensUsados = json?.usage?.total_tokens || null
  return { texto, tokensUsados, tieneApiKey: true }
}

export async function POST(request) {
  try {
    // 1. Exigir sesión válida — antes cualquier caller anónimo podía llamar.
    const token = obtenerTokenDeRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const supabaseAsUser = crearClienteComoUsuario(token)
    const { data: userData, error: userError } = await supabaseAsUser.auth.getUser()
    if (userError || !userData?.user) {
      return NextResponse.json({ error: 'Sesión inválida o expirada' }, { status: 401 })
    }
    const user = userData.user

    const body = await request.json()
    const { bloque, campo, contexto, invitacionId } = body || {}

    if (!bloque) {
      return NextResponse.json({ error: 'Falta el campo "bloque"' }, { status: 400 })
    }

    // 2. Verificar ownership — antes se aceptaba cualquier invitacionId sin
    // comprobar que perteneciera a quien hace la petición. Al consultar con
    // supabaseAsUser (RLS activo), si la invitación no es del usuario o no
    // existe, `data` viene null sin necesidad de una comparación manual.
    if (invitacionId) {
      const { data: invitacion, error: errInv } = await supabaseAsUser
        .from('express_invitaciones')
        .select('id')
        .eq('id', invitacionId)
        .single()

      if (errInv || !invitacion) {
        return NextResponse.json({ error: 'La invitación no existe o no te pertenece' }, { status: 403 })
      }
    }

    // 3. Rate limiting — antes no existía ningún límite, exponiendo el
    // presupuesto de la API de Kimi a abuso trivial por script.
    const haceUnaHora = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count, error: errCount } = await supabaseAsUser
      .from('express_ia_generaciones')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', haceUnaHora)

    if (!errCount && (count || 0) >= LIMITE_GENERACIONES_POR_HORA) {
      return NextResponse.json(
        { error: 'Alcanzaste el límite de generaciones con IA por esta hora. Intenta más tarde.' },
        { status: 429 }
      )
    }

    // 4. Generar el texto (o fallback si no hay API key configurada / falla Kimi).
    const fallback = FALLBACKS_POR_BLOQUE[bloque] || 'Aquí puedes escribir tu propio mensaje personalizado.'
    const prompt = construirPrompt({ bloque, campo, contexto })
    const { texto, tokensUsados, tieneApiKey } = await llamarKimi(prompt)
    const textoFinal = texto || fallback
    const fuente = texto ? 'kimi' : 'fallback'

    // 5. Auditoría de costo, ahora con user_id (antes fallaba en silencio:
    // la tabla tenía RLS activado sin ninguna policy de INSERT — ver
    // scripts/express-migration-ia-security.sql).
    if (invitacionId && tieneApiKey) {
      supabaseAsUser
        .from('express_ia_generaciones')
        .insert({
          invitacion_id: invitacionId,
          user_id: user.id,
          tipo_texto: `${bloque}.${campo || ''}`,
          prompt_usado: prompt,
          resultado: textoFinal,
          tokens_usados: tokensUsados,
        })
        .then(({ error }) => {
          if (error) console.error('[express_ia_generaciones] insert failed:', error.message)
        })
    }

    return NextResponse.json({ texto: textoFinal, fuente })
  } catch (err) {
    console.error('[api/express/generate-text] error:', err)
    return NextResponse.json({ error: 'No se pudo generar el texto' }, { status: 500 })
  }
}
