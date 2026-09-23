import { NextResponse } from 'next/server'
import { BOB_MARKET_RATE, CURRENCIES } from '../../../lib/currency'

export const dynamic = 'force-dynamic'

export async function GET() {
  const fallbackRates = Object.fromEntries(
    Object.entries(CURRENCIES).map(([code, config]) => [code, config.defaultRate])
  )

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    // Revalidación continua cada 1 hora (3600 segundos) para reflejar fluctuaciones del mercado
    const response = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: controller.signal,
      next: { revalidate: 3600 },
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Currency API responded with status ${response.status}`)
    }

    const data = await response.json()
    const apiRates = data.rates || {}

    // Garantizar que TODAS las más de 160 monedas del mundo estén disponibles
    const rates = {
      ...fallbackRates,
      ...apiRates,
      USD: 1,
      // Para Bolivia se fija siempre la tasa de mercado real solicitada (11.5 Bs/USD mínimo)
      BOB: Math.max(BOB_MARKET_RATE, apiRates.BOB || BOB_MARKET_RATE),
    }

    return NextResponse.json(
      {
        success: true,
        base: 'USD',
        rates,
        lastUpdated: data.time_last_update_utc || new Date().toISOString(),
        nextUpdate: data.time_next_update_utc || null,
        isMarketRateBolivia: true,
        updateFrequency: '1 hora',
      },
      {
        headers: {
          // Permite caché en CDN/Edge de 1 hora, actualizando en segundo plano
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    )
  } catch (error) {
    console.warn('[Currency API] Usando tasas de respaldo locales:', error.message)
    return NextResponse.json({
      success: true,
      base: 'USD',
      rates: fallbackRates,
      lastUpdated: new Date().toISOString(),
      fallback: true,
      isMarketRateBolivia: true,
      updateFrequency: '1 hora',
    })
  }
}
