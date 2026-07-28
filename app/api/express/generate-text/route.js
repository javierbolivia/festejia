// app/api/express/generate-text/route.js
//
// Route Handler server-only. Genera textos con Kimi K3 para el editor Express.
// La API key de Kimi NUNCA se expone al navegador: solo vive aquí, en el
// servidor, leída desde una variable de entorno de Vercel.
//
// Si KIMI_API_KEY no está configurada (por ejemplo en desarrollo local antes
// de contratar el plan), el endpoint responde con un texto de plantilla
// genérico para que el cliente pueda seguir trabajando sin bloquear el flujo.

import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

const PROMPTS = {
  bienvenida: (n1, n2) =>
    `Genera un texto de bienvenida breve, romántico y elegante para una invitación de boda. ` +
    `Nombres de la pareja: ${n1 || 'los novios'} y ${n2 || ''}. Máximo 3 oraciones. En español. ` +
    `No incluyas saludos genéricos como "Hola", ve directo al mensaje.`,
  dresscode: (n1, n2) =>
    `Genera una frase corta y elegante invitando a los invitados a respetar el código de vestimenta ` +
    `de una boda. Máximo 2 oraciones. En español.`,
  solo_adultos: (n1, n2) =>
    `Genera un mensaje breve y amable explicando que la boda de ${n1 || 'los novios'} y ${n2 || ''} ` +
    `es un evento solo para adultos, sin sonar antipático. Máximo 2 oraciones. En español.`,
  regalos: (n1, n2) =>
    `Genera un mensaje breve y elegante agradeciendo por adelantado cualquier regalo o contribución ` +
    `para la luna de miel de ${n1 || 'los novios'} y ${n2 || ''}, aclarando que su presencia es lo más ` +
    `importante. Máximo 3 oraciones. En español.`,
}

const FALLBACKS = {
  bienvenida: 'Nuestro gran día se aproxima y nos encantaría que formaras parte de él. Nos hace mucha ilusión invitarte a celebrar con nosotros.',
  dresscode: 'Te pedimos vestir de manera formal y elegante para acompañarnos en esta ocasión tan especial.',
  solo_adultos: 'Amamos a los más pequeños, pero este día tan especial es solo para adultos. Gracias por tu comprensión.',
  regalos: 'Tu presencia es el mejor regalo que podemos recibir. Si deseas hacernos un obsequio, agradeceremos de corazón tu contribución para nuestra luna de miel.',
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { tipo, invitacionId, nombre1, nombre2 } = body || {}

    if (!tipo || !PROMPTS[tipo]) {
      return NextResponse.json({ error: 'Tipo de texto no válido' }, { status: 400 })
    }

    const apiKey = process.env.KIMI_API_KEY

    // Sin API key configurada: devolvemos un texto de fallback razonable
    // para no bloquear al cliente mientras se activa la integración real.
    if (!apiKey) {
      return NextResponse.json({ texto: FALLBACKS[tipo], fuente: 'fallback' })
    }

    const prompt = PROMPTS[tipo](nombre1, nombre2)

    const kimiRes = await fetch('https://api.moonshot.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'kimi-k2.7-code',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!kimiRes.ok) {
      return NextResponse.json({ texto: FALLBACKS[tipo], fuente: 'fallback' })
    }

    const kimiJson = await kimiRes.json()
    const texto = kimiJson?.choices?.[0]?.message?.content?.trim() || FALLBACKS[tipo]
    const tokensUsados = kimiJson?.usage?.total_tokens || null

    // Registro de auditoría de costo (no bloqueante: si falla, no afecta al usuario)
    if (invitacionId) {
      supabase
        .from('express_ia_generaciones')
        .insert({
          invitacion_id: invitacionId,
          tipo_texto: tipo,
          prompt_usado: prompt,
          resultado: texto,
          tokens_usados: tokensUsados,
        })
        .then(() => {})
    }

    return NextResponse.json({ texto, fuente: 'kimi' })
  } catch (err) {
    return NextResponse.json({ error: 'No se pudo generar el texto' }, { status: 500 })
  }
}
