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

// Prompts "legacy": los 4 tipos fijos que usaba el wizard multi-paso anterior
// (ya reemplazado por el editor de bloques). Se mantienen únicamente por
// retrocompatibilidad de la forma del request; nada del código actual los llama.
const PROMPTS_LEGACY = {
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

const FALLBACKS_LEGACY = {
  bienvenida: 'Nuestro gran día se aproxima y nos encantaría que formaras parte de él. Nos hace mucha ilusión invitarte a celebrar con nosotros.',
  dresscode: 'Te pedimos vestir de manera formal y elegante para acompañarnos en esta ocasión tan especial.',
  solo_adultos: 'Amamos a los más pequeños, pero este día tan especial es solo para adultos. Gracias por tu comprensión.',
  regalos: 'Tu presencia es el mejor regalo que podemos recibir. Si deseas hacernos un obsequio, agradeceremos de corazón tu contribución para nuestra luna de miel.',
}

// Prompts GENÉRICOS: uno por bloque (no por campo), usados por el editor
// de bloques nuevo. Cualquier bloque nuevo que se agregue en el futuro y
// no tenga entrada aquí simplemente recibe un prompt genérico de repuesto
// (verGenerico más abajo) — nunca rompe, nunca requiere tocar este archivo
// para que el botón "Generar con IA" funcione.
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

function construirPromptGenerico({ bloque, campo, contexto }) {
  const generador = PROMPTS_POR_BLOQUE[bloque]
  const ctx = contexto || {}
  if (generador) return generador(ctx)
  return `Genera un texto breve, elegante y en español para el campo "${campo || 'texto'}" del bloque "${bloque}" de una invitación de boda entre ${ctx.nombre1 || 'los novios'} y ${ctx.nombre2 || ''}. Máximo 3 oraciones.`
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { tipo, invitacionId, nombre1, nombre2, bloque, campo, contexto } = body || {}

    // Modo NUEVO (editor de bloques): { bloque, campo, contexto, invitacionId }
    if (bloque) {
      const apiKey = process.env.KIMI_API_KEY
      const fallback = FALLBACKS_POR_BLOQUE[bloque] || 'Aquí puedes escribir tu propio mensaje personalizado.'

      if (!apiKey) {
        return NextResponse.json({ texto: fallback, fuente: 'fallback' })
      }

      const prompt = construirPromptGenerico({ bloque, campo, contexto })

      const kimiRes = await fetch('https://api.moonshot.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'kimi-k2.7-code', messages: [{ role: 'user', content: prompt }] }),
      })

      if (!kimiRes.ok) {
        return NextResponse.json({ texto: fallback, fuente: 'fallback' })
      }

      const kimiJson = await kimiRes.json()
      const texto = kimiJson?.choices?.[0]?.message?.content?.trim() || fallback
      const tokensUsados = kimiJson?.usage?.total_tokens || null

      if (invitacionId) {
        supabase
          .from('express_ia_generaciones')
          .insert({ invitacion_id: invitacionId, tipo_texto: `${bloque}.${campo || ''}`, prompt_usado: prompt, resultado: texto, tokens_usados: tokensUsados })
          .then(() => {})
      }

      return NextResponse.json({ texto, fuente: 'kimi' })
    }

    // Modo LEGACY (wizard anterior): { tipo, invitacionId, nombre1, nombre2 }
    if (!tipo || !PROMPTS_LEGACY[tipo]) {
      return NextResponse.json({ error: 'Tipo de texto no válido' }, { status: 400 })
    }

    const apiKey = process.env.KIMI_API_KEY

    // Sin API key configurada: devolvemos un texto de fallback razonable
    // para no bloquear al cliente mientras se activa la integración real.
    if (!apiKey) {
      return NextResponse.json({ texto: FALLBACKS_LEGACY[tipo], fuente: 'fallback' })
    }

    const prompt = PROMPTS_LEGACY[tipo](nombre1, nombre2)

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
      return NextResponse.json({ texto: FALLBACKS_LEGACY[tipo], fuente: 'fallback' })
    }

    const kimiJson = await kimiRes.json()
    const texto = kimiJson?.choices?.[0]?.message?.content?.trim() || FALLBACKS_LEGACY[tipo]
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
